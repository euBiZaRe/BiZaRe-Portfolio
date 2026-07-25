import React, { useEffect, useState, useRef } from 'react';
import Hls from 'hls.js';
import './StreamPage.css';

// --- Hardcoded Dynamic Resolvers ---
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

export default function StreamPage() {
  // --- Password Gate States ---
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');

  // --- Stream States ---
  const [viewerId, setViewerId] = useState('');
  const [channels, setChannels] = useState({ skySports: [], f1Tv: [], other: [] });
  const [activeProvider, setActiveProvider] = useState('skySports');
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [polledCounts, setPolledCounts] = useState({});
  const [channelsLoading, setChannelsLoading] = useState(true);
  
  // --- Weather State ---
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // --- Player Refs ---
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const hlsInstanceRef = useRef(null);

  // --- Auth Check ---
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

  // --- Stream Logic Initialization ---
  useEffect(() => {
    if (!isAuthorized) return;

    // 1. Get/Create Viewer ID
    let id = localStorage.getItem('viewerId');
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('viewerId', id);
    }
    setViewerId(id);

    // 2. Fetch Channels List
    async function loadChannels() {
      try {
        const fetchUrl = window.location.origin.includes("localhost")
          ? "/api-channels/channels.json"
          : "https://cdn.f1live.dpdns.org/channels.json";

        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error("Failed to load channel details");
        const channelData = await res.json();

        // Resolve dynamic servers
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

        const rawSkySports = [];
        const rawF1Tv = [];
        const rawOthers = [];

        for (const channel of channelData) {
          const processed = {
            id: channel.id,
            title: channel.title,
            uri: channel.uri,
            timeline: channel.timeline,
            status: channel.status || "unknown",
            isEmbed: channel.is_embed,
            blockable: channel.blockable,
            provider: channel.provider
          };

          if (processed.isEmbed === true) {
            rawOthers.push(processed);
          }

          if (processed.provider) {
            switch (processed.provider) {
              case 'skySports':
                rawSkySports.push(processed);
                continue;
              case 'f1Tv':
                rawF1Tv.push(processed);
                continue;
            }
          }

          if (processed.isEmbed) {
            const titleLower = processed.title.toLowerCase();
            if (titleLower.includes('sky sports f1')) {
              rawSkySports.push(processed);
            } else if (titleLower.includes('f1 tv')) {
              rawF1Tv.push(processed);
            } else {
              rawOthers.push(processed);
            }
          } else {
            rawOthers.push(processed);
          }
        }

        const dynamicSkySports = resolvedDynamic.filter(d => d.provider === 'skySports');
        const dynamicF1Tv = resolvedDynamic.filter(d => d.provider === 'f1Tv');

        const uniqueSkyMap = new Map();
        [...rawSkySports, ...rawOthers].forEach(c => {
          uniqueSkyMap.set(c.uri, c);
        });

        const skySportsGroup = [
          ...dynamicSkySports,
          ...Array.from(uniqueSkyMap.values()).map(c => ({
            ...c,
            uri: c.uri.replace("https://a1xs.vip/", "https://xemzi.short.gy/")
          }))
        ];

        const f1TvGroup = [
          ...dynamicF1Tv,
          ...rawF1Tv.map(c => ({
            ...c,
            uri: c.uri.replace("https://a1xs.vip/", "https://xemzi.short.gy/")
          }))
        ];

        setChannels({
          skySports: skySportsGroup,
          f1Tv: f1TvGroup,
          other: rawOthers
        });
        setChannelsLoading(false);
      } catch (err) {
        console.error("Error loading channels list:", err);
        setChannelsLoading(false);
      }
    }

    // 3. Fetch F1 Weather
    async function loadWeather() {
      try {
        const response = await fetch('https://api.openf1.org/v1/weather?session_key=latest');
        if (!response.ok) throw new Error("Failed to load weather");
        const weatherData = await response.json();
        if (weatherData && weatherData.length > 0) {
          setWeather(weatherData[weatherData.length - 1]);
        }
        setWeatherLoading(false);
      } catch (err) {
        console.warn("Weather API unreachable:", err);
        setWeatherLoading(false);
      }
    }

    loadChannels();
    loadWeather();
    
    // Interval for weather updates (30s)
    const weatherTimer = setInterval(loadWeather, 30000);
    return () => clearInterval(weatherTimer);

  }, [isAuthorized]);

  // --- Poll Stats ---
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
      } catch (err) {
        console.warn("Error polling viewer statistics:", err);
      }
    };

    pollStats();
    const interval = setInterval(pollStats, 5000);
    return () => clearInterval(interval);
  }, [isAuthorized, viewerId, selectedChannel]);

  // --- Video Player Orchestrator ---
  useEffect(() => {
    if (!isAuthorized || !selectedChannel) return;

    const videoEl = videoRef.current;
    if (hlsInstanceRef.current) {
      hlsInstanceRef.current.destroy();
      hlsInstanceRef.current = null;
    }

    if (selectedChannel.isEmbed) {
      if (videoEl) {
        videoEl.pause();
        videoEl.src = '';
      }
    } else {
      if (videoEl) {
        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90
          });
          hlsInstanceRef.current = hls;
          hls.loadSource(selectedChannel.uri);
          hls.attachMedia(videoEl);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoEl.play().catch(e => console.log("Autoplay blocked:", e));
          });
          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  hls.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  hls.recoverMediaError();
                  break;
                default:
                  hls.destroy();
                  hlsInstanceRef.current = null;
                  break;
              }
            }
          });
        } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
          videoEl.src = selectedChannel.uri;
          videoEl.addEventListener('loadedmetadata', () => {
            videoEl.play().catch(e => console.log("Autoplay blocked:", e));
          });
        }
      }
    }

    // Post watch Activity
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

  // --- Render Password Gate ---
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

  // --- Render Main Streaming Dashboard ---
  const currentList = channels[activeProvider] || [];
  const totalViewers = Object.values(polledCounts).reduce((a, b) => a + b, 0);

  const handleRefresh = () => {
    if (!selectedChannel) return;
    const temp = selectedChannel;
    setSelectedChannel(null);
    setTimeout(() => {
      setSelectedChannel(temp);
    }, 50);
  };

  // Weather formatting
  const airTemp = weather?.air_temperature !== undefined ? `${weather.air_temperature.toFixed(1)}°C` : 'N/A';
  const trackTemp = weather?.track_temperature !== undefined ? `${weather.track_temperature.toFixed(1)}°C` : 'N/A';
  const humidity = weather?.humidity !== undefined ? `${weather.humidity.toFixed(0)}%` : 'N/A';
  const windSpeed = weather?.wind_speed !== undefined ? `${weather.wind_speed.toFixed(1)} m/s` : 'N/A';
  const windDir = weather?.wind_direction !== undefined ? weather.wind_direction : 0;
  const isRain = weather?.rainfall === 1 || weather?.rainfall === true;
  const rainStatus = isRain ? '🌧️ Rain' : '☀️ Dry';

  return (
    <div className="stream-container">
      <div className="stream-content">
        <div className="stream-grid">
          
          {/* Sidebar Section */}
          <div className="stream-sidebar">
            
            {/* Live Weather Widget */}
            <div className="stream-weather-card">
              <div className="weather-header">
                <span>F1 TRACK TELEMETRY</span>
                <span className="live-dot" title="Live"></span>
              </div>
              {weatherLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--sp-text-muted)' }}>
                  <div className="sp-spinner"></div>
                  <span>Loading Weather...</span>
                </div>
              ) : weather ? (
                <div className="weather-items-grid">
                  <div className="weather-cell">
                    <span className="weather-cell-label">Track Temp</span>
                    <span className="weather-cell-value" style={{ color: 'var(--sp-f1-red)' }}>{trackTemp}</span>
                  </div>
                  <div className="weather-cell">
                    <span className="weather-cell-label">Air Temp</span>
                    <span className="weather-cell-value" style={{ color: '#f97316' }}>{airTemp}</span>
                  </div>
                  <div className="weather-cell">
                    <span className="weather-cell-label">Wind</span>
                    <span className="weather-cell-value">
                      {windSpeed} <span style={{ display: 'inline-block', transform: `rotate(${windDir}deg)`, fontSize: '0.65rem' }}>▲</span>
                    </span>
                  </div>
                  <div className="weather-cell">
                    <span className="weather-cell-label">Track State</span>
                    <span className="weather-cell-value" style={{ color: isRain ? '#3b82f6' : '#10b981' }}>{rainStatus}</span>
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '0.7rem', color: 'var(--sp-text-muted)', fontWeight: 600 }}>TELEMETRY OFFLINE</div>
              )}
            </div>

            {/* Server Tabs */}
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
                <span className="provider-btn-name">Server 3</span>
              </button>
            </div>

            {/* Channels List Panel */}
            <div className="channels-panel">
              <div className="panel-header">
                <span className="panel-title">Channels</span>
                <span className="total-viewers">{totalViewers.toLocaleString()} Viewers</span>
              </div>
              <div className="channels-scroll">
                {channelsLoading ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '2rem 0', color: 'var(--sp-text-muted)' }}>
                    <div className="sp-spinner" style={{ width: '20px', height: '20px' }}></div>
                    <span style={{ fontSize: '0.75rem' }}>Loading channels...</span>
                  </div>
                ) : currentList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0', fontSize: '0.75rem', color: 'var(--sp-text-muted)' }}>No channels online</div>
                ) : (
                  currentList.map(channel => {
                    const active = selectedChannel?.uri === channel.uri;
                    const count = polledCounts[String(channel.id)] || 0;
                    const statusText = channel.status || 'unknown';

                    return (
                      <button
                        key={channel.uri}
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

            {/* Selected Channel Meta Info */}
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.4s ease' }} className="icon-refresh">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M16 3h5v5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 21H3v-5" />
                  </svg>
                  Reload Feed
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
