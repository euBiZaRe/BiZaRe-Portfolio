import React, { useEffect, useState, useRef } from 'react';
import Hls from 'hls.js';
import './StreamPage.css';

// Dynamic resolver for Clean Sky Sports stream
const dynamicResolvers = [
  {
    id: 69,
    title: "[Clean] Sky Sports F1 HD",
    isEmbed: false,
    provider: "skySports",
    blockable: false,
    resolveUrl: async () => {
      try {
        const fetchUrl = window.location.origin.includes("localhost")
          ? "/api-delta/embed/racing/skyf1?server=origin&quality=1080p&category=racing"
          : "https://delta.f1live.dpdns.org/embed/racing/skyf1?server=origin&quality=1080p&category=racing";

        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error("Failed to fetch stream token");
        const text = await res.text();
        const match = text.match(/const _0x = ({[^;]+});/);
        if (!match) throw new Error("Token payload match failed");
        
        const data = JSON.parse(match[1]);
        const quality = "1080p";
        const r = data[quality];
        if (!r) throw new Error("Quality token not found");
        
        return `https://delta.f1live.dpdns.org/live-cdn/skyf1${quality}/index.m3u8?_t=${encodeURIComponent(r._t)}&_e=${encodeURIComponent(r._e)}&_n=${encodeURIComponent(r._n)}`;
      } catch (err) {
        console.error("Error resolving Clean Sky Sports stream:", err);
        return null;
      }
    }
  }
];

const categoryLabels = {
  all: "All Sports",
  football: "Football",
  basketball: "Basketball",
  hockey: "Hockey",
  baseball: "Baseball",
  cricket: "Cricket",
  rugby: "Rugby",
  tennis: "Tennis",
  fight: "Fight",
  "motor-sports": "Motorsport",
  "american-football": "American Football",
  other: "Other"
};

const sportIcons = {
  football: "⚽",
  basketball: "🏀",
  hockey: "🏒",
  baseball: "⚾",
  cricket: "🏏",
  rugby: "🏉",
  tennis: "🎾",
  fight: "🥊",
  "motor-sports": "🏎️",
  "american-football": "🏈",
  other: "📺"
};

export default function StreamPage() {
  // Password Gate
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');

  // Stream & Provider States
  const [viewerId, setViewerId] = useState('');
  const [channels, setChannels] = useState({ skySports: [], f1Tv: [], other: [] });
  const [activeProvider, setActiveProvider] = useState('skySports');
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [polledCounts, setPolledCounts] = useState({});
  const [channelsLoading, setChannelsLoading] = useState(true);
  
  // Weather State
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Other Sports Matches State
  const [matches, setMatches] = useState([]);
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [matchStatusFilter, setMatchStatusFilter] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Player Refs
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const hlsInstanceRef = useRef(null);

  // Check Session Auth
  useEffect(() => {
    const authStatus = sessionStorage.getItem('stream_auth');
    if (authStatus === 'gridup') {
      setIsAuthorized(true);
    }
  }, []);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (password === 'gridup') {
      sessionStorage.setItem('stream_auth', 'gridup');
      setIsAuthorized(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Password. Access Denied.');
    }
  };

  // Main Data Loading
  useEffect(() => {
    if (!isAuthorized) return;

    let id = localStorage.getItem('viewerId');
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('viewerId', id);
    }
    setViewerId(id);

    // Fetch F1 Channels
    async function loadChannels() {
      try {
        const fetchUrl = window.location.origin.includes("localhost")
          ? "/api-channels/channels.json"
          : "https://cdn.f1live.dpdns.org/channels.json";

        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error("Failed to load channels");
        const channelData = await res.json();

        const resolvedDynamic = [];
        await Promise.allSettled(
          dynamicResolvers.map(async (server) => {
            const url = await server.resolveUrl();
            if (url) {
              resolvedDynamic.push({
                id: server.id,
                title: server.title,
                uri: url,
                timeline: 0,
                status: "online",
                isEmbed: server.isEmbed,
                blockable: server.blockable,
                provider: server.provider
              });
            }
          })
        );

        const skySportsList = [...resolvedDynamic];
        const f1TvList = [];
        const otherList = [];

        channelData.forEach(ch => {
          const item = {
            id: ch.id,
            title: ch.title,
            uri: ch.uri,
            timeline: ch.timeline,
            status: ch.status || "online",
            isEmbed: ch.is_embed,
            blockable: ch.blockable,
            provider: ch.provider
          };

          const titleLower = item.title.toLowerCase();

          if (item.provider === 'skySports' || titleLower.includes('sky sports') || titleLower.includes('sky sport')) {
            skySportsList.push(item);
          } else if (item.provider === 'f1Tv' || titleLower.includes('f1 tv') || titleLower.includes('formula 1')) {
            f1TvList.push(item);
          } else {
            otherList.push(item);
          }
        });

        setChannels({
          skySports: skySportsList,
          f1Tv: f1TvList,
          other: otherList
        });

        // Set default selected channel if available
        if (skySportsList.length > 0) {
          setSelectedChannel(skySportsList[0]);
        }

        setChannelsLoading(false);
      } catch (err) {
        console.error("Error loading channels list:", err);
        setChannelsLoading(false);
      }
    }

    // Fetch Weather
    async function loadWeather() {
      try {
        const response = await fetch('https://api.openf1.org/v1/weather?session_key=latest');
        if (!response.ok) throw new Error("Failed weather");
        const weatherData = await response.json();
        if (weatherData && weatherData.length > 0) {
          setWeather(weatherData[weatherData.length - 1]);
        }
        setWeatherLoading(false);
      } catch (err) {
        setWeatherLoading(false);
      }
    }

    // Fetch Other Sports Matches
    async function loadMatches() {
      setMatchesLoading(true);
      try {
        const res = await fetch('https://streamed.pk/api/matches/all');
        if (!res.ok) throw new Error("Failed to load matches");
        const data = await res.json();
        setMatches(data || []);
      } catch (err) {
        console.warn("Matches load error:", err);
      } finally {
        setMatchesLoading(false);
      }
    }

    loadChannels();
    loadWeather();
    loadMatches();

    const timer = setInterval(loadWeather, 30000);
    return () => clearInterval(timer);
  }, [isAuthorized]);

  // Viewer Count Polling
  useEffect(() => {
    if (!isAuthorized || !viewerId) return;

    const pollStats = async () => {
      try {
        let url = `https://stats.f1live.dpdns.org/counts?viewerId=${viewerId}`;
        if (selectedChannel) {
          url += `&channelId=${selectedChannel.id}`;
        }
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        setPolledCounts(data);
      } catch (err) {}
    };

    pollStats();
    const interval = setInterval(pollStats, 5000);
    return () => clearInterval(interval);
  }, [isAuthorized, viewerId, selectedChannel]);

  // Player Video / Embed Attach
  useEffect(() => {
    if (!isAuthorized || !selectedChannel) return;

    const videoEl = videoRef.current;
    if (hlsInstanceRef.current) {
      hlsInstanceRef.current.destroy();
      hlsInstanceRef.current = null;
    }

    if (!selectedChannel.isEmbed && videoEl) {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hlsInstanceRef.current = hls;
        hls.loadSource(selectedChannel.uri);
        hls.attachMedia(videoEl);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoEl.play().catch(e => console.log("Autoplay blocked:", e));
        });
      } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
        videoEl.src = selectedChannel.uri;
        videoEl.addEventListener('loadedmetadata', () => {
          videoEl.play().catch(e => console.log("Autoplay blocked:", e));
        });
      }
    }

    fetch('https://stats.f1live.dpdns.org/watch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ viewerId, channelId: selectedChannel.id })
    }).catch(() => {});

    return () => {
      if (hlsInstanceRef.current) {
        hlsInstanceRef.current.destroy();
        hlsInstanceRef.current = null;
      }
    };
  }, [isAuthorized, selectedChannel, viewerId]);

  if (!isAuthorized) {
    return (
      <div className="stream-container">
        <div className="gate-wrapper">
          <div className="gate-card">
            <div className="gate-icon">🔒</div>
            <h2>F1 LIVE <span>STREAM</span></h2>
            <p>This section is restricted. Please enter the authorized password to access live feeds.</p>
            <form className="gate-form" onSubmit={handleAuthSubmit}>
              <div className="password-input-group">
                <input 
                  type="password" 
                  placeholder="ENTER ACCESS KEY" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
              <button type="submit" className="gate-btn">UNLOCK DASHBOARD</button>
            </form>
            {authError && <div className="gate-error">{authError}</div>}
          </div>
        </div>
      </div>
    );
  }

  const currentList = channels[activeProvider] || [];
  const totalViewers = Object.values(polledCounts).reduce((a, b) => a + b, 0);

  const handleRefresh = () => {
    if (!selectedChannel) return;
    const temp = selectedChannel;
    setSelectedChannel(null);
    setTimeout(() => setSelectedChannel(temp), 50);
  };

  // Filter matches logic
  const now = Date.now();
  const filteredMatches = matches.filter(m => {
    // Status filter
    const matchTime = m.date || 0;
    const isLive = matchTime <= now && matchTime + (3 * 3600 * 1000) >= now;
    const isUpcoming = matchTime > now;
    const isFinished = matchTime + (3 * 3600 * 1000) < now && matchTime > 0;

    if (matchStatusFilter === 'LIVE' && !isLive) return false;
    if (matchStatusFilter === 'UPCOMING' && !isUpcoming) return false;
    if (matchStatusFilter === 'FINISHED' && !isFinished) return false;

    // Category filter
    if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = m.title?.toLowerCase().includes(q);
      const homeMatch = m.teams?.home?.name?.toLowerCase().includes(q);
      const awayMatch = m.teams?.away?.name?.toLowerCase().includes(q);
      if (!titleMatch && !homeMatch && !awayMatch) return false;
    }

    return true;
  });

  const openMatchStream = (match) => {
    window.open("https://zetastream.dpdns.org", "_blank");
  };

  return (
    <div className="stream-container">
      <div className="stream-content">
        
        {/* Provider Tabs Header */}
        <div className="provider-header-section">
          <h2 className="provider-section-title">Choose Your Provider</h2>
          <div className="provider-grid">
            <button 
              className={`provider-btn ${activeProvider === 'skySports' ? 'active' : ''}`}
              onClick={() => setActiveProvider('skySports')}
            >
              <span className="provider-btn-icon">🏎️</span>
              <span className="provider-btn-name">Server 1</span>
            </button>
            <button 
              className={`provider-btn ${activeProvider === 'f1Tv' ? 'active' : ''}`}
              onClick={() => setActiveProvider('f1Tv')}
            >
              <span className="provider-btn-icon">🏁</span>
              <span className="provider-btn-name">Server 2</span>
            </button>
            <button 
              className={`provider-btn ${activeProvider === 'other' ? 'active' : ''}`}
              onClick={() => setActiveProvider('other')}
            >
              <span className="provider-btn-icon">📺</span>
              <span className="provider-btn-name">Other Sports</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display: Server 1 & 2 vs Other Sports */}
        {activeProvider !== 'other' ? (
          <div className="stream-grid">
            {/* Sidebar Section */}
            <div className="stream-sidebar">
              {/* Weather Card */}
              <div className="stream-weather-card">
                <div className="weather-header">
                  <span>F1 TRACK TELEMETRY</span>
                  <span className="live-dot" title="Live"></span>
                </div>
                {weatherLoading ? (
                  <div className="weather-loading-row">
                    <div className="sp-spinner"></div>
                    <span>Loading Weather...</span>
                  </div>
                ) : weather ? (
                  <div className="weather-items-grid">
                    <div className="weather-cell">
                      <span className="weather-cell-label">Track Temp</span>
                      <span className="weather-cell-value" style={{ color: 'var(--sp-f1-red)' }}>
                        {weather.track_temperature !== undefined ? `${weather.track_temperature.toFixed(1)}°C` : 'N/A'}
                      </span>
                    </div>
                    <div className="weather-cell">
                      <span className="weather-cell-label">Air Temp</span>
                      <span className="weather-cell-value" style={{ color: '#f97316' }}>
                        {weather.air_temperature !== undefined ? `${weather.air_temperature.toFixed(1)}°C` : 'N/A'}
                      </span>
                    </div>
                    <div className="weather-cell">
                      <span className="weather-cell-label">Wind</span>
                      <span className="weather-cell-value">
                        {weather.wind_speed !== undefined ? `${weather.wind_speed.toFixed(1)} m/s` : 'N/A'}
                      </span>
                    </div>
                    <div className="weather-cell">
                      <span className="weather-cell-label">Track State</span>
                      <span className="weather-cell-value" style={{ color: weather.rainfall ? '#3b82f6' : '#10b981' }}>
                        {weather.rainfall ? '🌧️ Rain' : '☀️ Dry'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="weather-offline">TELEMETRY OFFLINE</div>
                )}
              </div>

              {/* Channels Panel */}
              <div className="channels-panel">
                <div className="panel-header">
                  <span className="panel-title">Channels</span>
                  <span className="total-viewers">{totalViewers.toLocaleString()} Viewers</span>
                </div>
                <div className="channels-scroll">
                  {channelsLoading ? (
                    <div className="channels-loading-box">
                      <div className="sp-spinner" style={{ width: '20px', height: '20px' }}></div>
                      <span>Loading channels...</span>
                    </div>
                  ) : currentList.length === 0 ? (
                    <div className="no-channels-msg">No channels online</div>
                  ) : (
                    currentList.map(channel => {
                      const active = selectedChannel?.uri === channel.uri;
                      const count = polledCounts[String(channel.id)] || 0;
                      const statusText = channel.status || 'online';

                      return (
                        <button
                          key={channel.uri + channel.id}
                          className={`channel-card-btn ${active ? 'active' : ''}`}
                          onClick={() => setSelectedChannel(channel)}
                        >
                          <div className="channel-info-left">
                            <span className="channel-card-title">{channel.title}</span>
                            <div className="channel-card-status">
                              <span className={`status-indicator ${statusText}`}></span>
                              <span className={`status-label ${statusText}`}>{statusText}</span>
                            </div>
                          </div>
                          {count > 0 && (
                            <span className="channel-viewers-count">👥 {count}</span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Main Player Viewport */}
            <div className="stream-main-content">
              <div className="video-player-box">
                {!selectedChannel ? (
                  <div className="player-welcome">
                    <div className="player-welcome-icon">🏎️</div>
                    <h3>Welcome to GridUp Live</h3>
                    <p>Select a server and channel on the left sidebar to begin streaming live coverage.</p>
                  </div>
                ) : selectedChannel.isEmbed ? (
                  <iframe
                    ref={iframeRef}
                    src={selectedChannel.uri}
                    className="embed-iframe-element"
                    allowFullScreen
                    scrolling="no"
                    referrerPolicy="unsafe-url"
                    {...(selectedChannel.blockable !== false
                      ? { sandbox: "allow-scripts allow-same-origin allow-forms allow-presentation" }
                      : {})}
                  />
                ) : (
                  <video
                    ref={videoRef}
                    className="hls-video-element"
                    controls
                    autoPlay
                    playsInline
                    crossOrigin="anonymous"
                  />
                )}
              </div>

              {selectedChannel && (
                <div className="meta-info-card">
                  <div className="meta-details">
                    <h2>{selectedChannel.title}</h2>
                    <div className="meta-badges-row">
                      <span className="meta-badge live">LIVE</span>
                      <span className="meta-badge viewers">
                        👥 {(polledCounts[String(selectedChannel.id)] || 0).toLocaleString()} Watching
                      </span>
                      <span className="meta-badge type">
                        {selectedChannel.isEmbed ? "Embedded Player" : "HLS Decoder"}
                      </span>
                    </div>
                  </div>
                  <button className="reload-btn" onClick={handleRefresh}>
                    🔄 Reload Feed
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Other Sports Matches Section */
          <div className="other-sports-section">
            <div className="matches-controls-bar">
              <div className="status-filters-group">
                {['ALL', 'LIVE', 'UPCOMING', 'FINISHED'].map(st => (
                  <button
                    key={st}
                    className={`status-filter-btn ${matchStatusFilter === st ? 'active' : ''} ${st === 'LIVE' ? 'live-btn' : ''}`}
                    onClick={() => setMatchStatusFilter(st)}
                  >
                    {st === 'LIVE' && <span className="red-pulse-dot"></span>}
                    {st}
                  </button>
                ))}
              </div>

              <div className="category-select-wrapper">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-dropdown"
                >
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {sportIcons[key] || "📺"} {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="matches-search-wrapper">
                <input
                  type="text"
                  placeholder="Search matches, teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="matches-search-input"
                />
              </div>
            </div>

            <div className="matches-header-info">
              <h3>All Matches</h3>
              <span className="matches-count-tag">{filteredMatches.length} events</span>
            </div>

            {matchesLoading ? (
              <div className="matches-loading-state">
                <div className="sp-spinner" style={{ width: '28px', height: '28px' }}></div>
                <p>Loading sports schedule...</p>
              </div>
            ) : filteredMatches.length === 0 ? (
              <div className="no-matches-state">
                <p>No matches found matching your filters.</p>
              </div>
            ) : (
              <div className="matches-cards-grid">
                {filteredMatches.map(match => {
                  const matchTime = match.date || 0;
                  const isLive = matchTime <= now && matchTime + (3 * 3600 * 1000) >= now;
                  const dateStr = matchTime > 0 
                    ? new Date(matchTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : 'TBD';

                  return (
                    <div 
                      key={match.id} 
                      className={`match-card ${isLive ? 'is-live' : ''}`}
                      onClick={() => openMatchStream(match)}
                    >
                      <div className="match-card-top">
                        <span className="match-sport-badge">
                          {sportIcons[match.category] || "📺"} {categoryLabels[match.category] || match.category}
                        </span>
                        {isLive ? (
                          <span className="match-status-tag live">🔴 LIVE</span>
                        ) : (
                          <span className="match-status-tag time">{dateStr}</span>
                        )}
                      </div>

                      <div className="match-teams-row">
                        <div className="match-team">
                          {match.teams?.home?.badge ? (
                            <img 
                              src={`https://streamed.pk/api/images/badge/${match.teams.home.badge}.webp`} 
                              alt="" 
                              className="team-badge-img"
                            />
                          ) : (
                            <div className="team-badge-placeholder">🛡️</div>
                          )}
                          <span className="team-name">{match.teams?.home?.name || match.title}</span>
                        </div>

                        {match.teams?.away && (
                          <>
                            <div className="match-vs-tag">VS</div>
                            <div className="match-team">
                              {match.teams.away.badge ? (
                                <img 
                                  src={`https://streamed.pk/api/images/badge/${match.teams.away.badge}.webp`} 
                                  alt="" 
                                  className="team-badge-img"
                                />
                              ) : (
                                <div className="team-badge-placeholder">🛡️</div>
                              )}
                              <span className="team-name">{match.teams.away.name}</span>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="match-card-footer">
                        <span className="watch-match-link">Watch Live Stream →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
