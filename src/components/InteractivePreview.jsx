import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, ShoppingCart, Lock, Unlock, Eye, Edit3, Save, 
  Trash2, Plus, Check, CheckCircle2, ChevronRight, BarChart2, 
  Users, Settings, ArrowRight, CheckCircle, Mail, MessageSquare, AlertCircle
} from 'lucide-react';

export default function InteractivePreview({ packageId, features, pagesCount, billingModel }) {
  // Mockup theme and color state
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [accent, setAccent] = useState('#7c3aed'); // Violet (default), Cyan, Emerald, Rose
  
  // Interactive feature states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('idle'); // idle, checking-out, completed

  const [cmsMode, setCmsMode] = useState(false);
  const [editableHeroTitle, setEditableHeroTitle] = useState('We build next-generation software platforms');
  const [editableSubtext, setEditableSubtext] = useState('High-performance, beautiful, conversion-focused websites.');
  
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'services', 'blog', 'contact' for websites; 'dashboard', 'analytics', 'users', 'settings' for web apps
  
  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  
  // Subscription client portal states
  const [subTasks, setSubTasks] = useState([
    { id: 1, name: 'Setup database indexes for landing page', status: 'completed' },
    { id: 2, name: 'Optimize mobile responsiveness on navigation menu', status: 'active' },
    { id: 3, name: 'Add Google Analytics tracking scripts', status: 'pending' }
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');

  // Reset demo states when packageId changes
  useEffect(() => {
    setIsLoggedIn(false);
    setShowAuthModal(false);
    setCart([]);
    setShowCart(false);
    setCheckoutStep('idle');
    setCmsMode(false);
    setActiveTab('home');
    setContactSubmitted(false);
    setNewTaskInput('');
    
    // Set default package hero titles
    if (packageId === 'landing-page') {
      setEditableHeroTitle('Launch Your Startup Instantly');
      setEditableSubtext('A beautiful, conversion-optimized landing page for your brand.');
    } else if (packageId === 'business-platform') {
      setEditableHeroTitle('Grow Your Business Online');
      setEditableSubtext('Professional multi-page platform with full CMS integration.');
    } else {
      setEditableHeroTitle('Interactive Enterprise Portal');
      setEditableSubtext('SaaS dashboard with full database, roles and security integrations.');
    }
  }, [packageId]);

  // Color options
  const colorOptions = [
    { name: 'Violet', value: '#7c3aed' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Rose', value: '#f43f5e' }
  ];

  // Helper styles based on preview theme
  const getThemeStyles = () => {
    if (theme === 'dark') {
      return {
        bg: '#0c0c0e',
        card: '#18181b',
        border: 'rgba(255, 255, 255, 0.08)',
        text: '#f4f4f5',
        textMuted: '#a1a1aa',
        inputBg: '#27272a',
        inputBorder: 'rgba(255, 255, 255, 0.15)'
      };
    } else {
      return {
        bg: '#ffffff',
        card: '#f4f4f5',
        border: 'rgba(0, 0, 0, 0.08)',
        text: '#18181b',
        textMuted: '#71717a',
        inputBg: '#ffffff',
        inputBorder: 'rgba(0, 0, 0, 0.15)'
      };
    }
  };

  const s = getThemeStyles();

  // Handle adding item to e-commerce cart
  const handleAddToCart = (item) => {
    if (cart.some(i => i.id === item.id)) {
      setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
    setShowCart(true);
  };

  // Handle mock checkout
  const triggerMockCheckout = () => {
    setCheckoutStep('checking-out');
    setTimeout(() => {
      setCheckoutStep('completed');
      setCart([]);
    }, 1500);
  };

  // Handle submitting contact form
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactName && contactEmail) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      }, 3000);
    }
  };

  // Handle adding task to subscription backlog
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskInput.trim()) {
      setSubTasks([
        ...subTasks,
        { id: Date.now(), name: newTaskInput.trim(), status: 'pending' }
      ]);
      setNewTaskInput('');
    }
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'demo123' || passwordInput.trim() !== '') {
      setIsLoggedIn(true);
      setShowAuthModal(false);
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '24px', borderColor: 'rgba(255, 255, 255, 0.06)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Interactive Controls Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)', fontWeight: 700 }}>
            Mockup Dashboard
          </span>
          <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: 600 }}>Interactive Template Preview</h4>
        </div>
        
        {/* Customization Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* Accent Color Circle Selector */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {colorOptions.map(col => (
              <button
                key={col.value}
                onClick={() => setAccent(col.value)}
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: col.value,
                  border: accent === col.value ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  boxShadow: accent === col.value ? `0 0 8px ${col.value}` : 'none',
                  transition: 'var(--transition-fast)'
                }}
                title={`Accent: ${col.name}`}
              />
            ))}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              padding: '6px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.03)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} color="#09090b" />}
          </button>
        </div>
      </div>

      {/* Browser Shell */}
      <div style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        background: theme === 'dark' ? '#09090b' : '#f3f4f6',
        transition: 'all 0.3s ease'
      }}>
        
        {/* Browser Top Header */}
        <div style={{
          backgroundColor: theme === 'dark' ? '#18181b' : '#e5e7eb',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: `1px solid ${s.border}`
        }}>
          {/* macOS window controls dots */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#eab308', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }}></span>
          </div>

          {/* Browser Address URL Bar */}
          <div style={{
            flex: 1,
            backgroundColor: theme === 'dark' ? '#27272a' : '#ffffff',
            borderRadius: '6px',
            padding: '4px 12px',
            fontSize: '0.7rem',
            color: theme === 'dark' ? '#d4d4d8' : '#4b5563',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontFamily: 'monospace',
            border: theme === 'dark' ? 'none' : '1px solid #d1d5db'
          }}>
            <span style={{ opacity: 0.5 }}>https://</span>
            <span>preview.bizare.shop/{packageId || 'custom-app'}</span>
          </div>
          
          {/* Indicators */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {features.includes('cms') && (
              <span 
                onClick={() => setCmsMode(!cmsMode)}
                style={{ 
                  backgroundColor: cmsMode ? accent : 'rgba(255,255,255,0.05)', 
                  color: cmsMode ? 'white' : '#a1a1aa',
                  fontSize: '0.65rem', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                title="CMS Editor Mode"
              >
                {cmsMode ? <Save size={10} /> : <Edit3 size={10} />}
                CMS {cmsMode ? 'Active' : 'Edit'}
              </span>
            )}
          </div>
        </div>

        {/* Browser Page Body Canvas */}
        <div style={{
          backgroundColor: s.bg,
          color: s.text,
          minHeight: '340px',
          maxHeight: '340px',
          overflowY: 'auto',
          fontSize: '0.8rem',
          position: 'relative',
          transition: 'all 0.3s ease',
          fontFamily: 'system-ui, sans-serif'
        }}>

          {/* MOCKUP CONTENT 1: FIXED PROJECT LANDING PAGE */}
          {packageId === 'landing-page' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Landing Page Navbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${s.border}`, alignItems: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: s.text, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: accent }}></div>
                  <span>LaunchPad</span>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <span style={{ color: s.textMuted, fontSize: '0.7rem' }}>Features</span>
                  <span style={{ color: s.textMuted, fontSize: '0.7rem' }}>Pricing</span>
                  {features.includes('auth') && (
                    <button 
                      onClick={() => isLoggedIn ? setIsLoggedIn(false) : setShowAuthModal(true)}
                      style={{ 
                        backgroundColor: accent, 
                        color: 'white', 
                        fontSize: '0.65rem', 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        fontWeight: 600
                      }}
                    >
                      {isLoggedIn ? 'Sign Out' : 'Sign In'}
                    </button>
                  )}
                </div>
              </div>

              {/* Landing Page Hero */}
              <div style={{ padding: '32px 16px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                {/* Floating decor particles if Motion is selected */}
                {features.includes('motion') && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: accent, opacity: 0.1, top: '20%', left: '15%', animation: 'float 6s infinite ease-in-out' }}></div>
                    <div style={{ position: 'absolute', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#06b6d4', opacity: 0.1, bottom: '20%', right: '15%', animation: 'float 8s infinite ease-in-out' }}></div>
                  </div>
                )}
                
                <span style={{ 
                  backgroundColor: `rgba(${accent === '#7c3aed' ? '124,58,237' : accent === '#06b6d4' ? '6,182,212' : accent === '#10b981' ? '16,185,129' : '244,63,94'}, 0.1)`, 
                  color: accent, 
                  fontSize: '0.6rem', 
                  padding: '2px 8px', 
                  borderRadius: '20px', 
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Interactive Preview
                </span>

                {cmsMode ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '380px', margin: '12px auto' }}>
                    <input 
                      type="text" 
                      value={editableHeroTitle} 
                      onChange={(e) => setEditableHeroTitle(e.target.value)}
                      style={{ padding: '4px 8px', fontSize: '1.2rem', fontWeight: 800, borderRadius: '4px', border: `1px solid ${accent}`, background: s.bg, color: s.text, textAlign: 'center' }}
                    />
                    <textarea 
                      value={editableSubtext} 
                      onChange={(e) => setEditableSubtext(e.target.value)}
                      rows={2}
                      style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.bg, color: s.textMuted, textAlign: 'center', resize: 'none' }}
                    />
                  </div>
                ) : (
                  <>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: s.text, marginTop: '8px', lineHeight: 1.2 }}>
                      {editableHeroTitle}
                    </h1>
                    <p style={{ fontSize: '0.75rem', color: s.textMuted, marginTop: '8px', maxWidth: '360px', marginLeft: 'auto', marginRight: 'auto' }}>
                      {editableSubtext}
                    </p>
                  </>
                )}

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
                  {features.includes('stripe') ? (
                    <button 
                      onClick={() => handleAddToCart({ id: 'lp-base', name: 'Startup License', price: 29 })}
                      style={{ backgroundColor: accent, color: 'white', padding: '6px 14px', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <ShoppingCart size={12} />
                      Buy Now — $29
                    </button>
                  ) : (
                    <button style={{ backgroundColor: accent, color: 'white', padding: '6px 14px', borderRadius: '6px', fontWeight: 600 }}>
                      Get Started Free
                    </button>
                  )}
                  <button style={{ border: `1px solid ${s.border}`, color: s.text, padding: '6px 12px', borderRadius: '6px' }}>
                    Watch Demo
                  </button>
                </div>
              </div>

              {/* Simple Features Grid */}
              <div style={{ padding: '16px', borderTop: `1px solid ${s.border}`, backgroundColor: s.card }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[
                    { title: 'Lightning Fast', desc: '99+ PageSpeed score guarantees retention.' },
                    { title: 'Responsive', desc: 'Perfect rendering on all mobile viewports.' },
                    { title: 'SEO Ready', desc: 'Pre-indexed layout structures.' }
                  ].map((feat, idx) => (
                    <div key={idx} style={{ padding: '10px', borderRadius: '6px', border: `1px solid ${s.border}`, backgroundColor: s.bg }}>
                      <div style={{ fontWeight: 700, fontSize: '0.75rem', color: s.text, marginBottom: '2px' }}>{feat.title}</div>
                      <div style={{ fontSize: '0.65rem', color: s.textMuted }}>{feat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MOCKUP CONTENT 2: FIXED PROJECT BUSINESS WEBSITE */}
          {packageId === 'business-platform' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Business Navbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${s.border}`, alignItems: 'center', backgroundColor: s.card }}>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: s.text, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: accent }}></div>
                  <span>ApexCorp</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  {[
                    { id: 'home', name: 'Home' },
                    { id: 'services', name: 'Services' },
                    { id: 'blog', name: 'Blog' },
                    { id: 'contact', name: 'Contact' }
                  ].map(tab => (
                    <span 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{ 
                        color: activeTab === tab.id ? accent : s.textMuted, 
                        fontWeight: activeTab === tab.id ? 700 : 500,
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                    >
                      {tab.name}
                    </span>
                  ))}
                  {features.includes('stripe') && (
                    <button 
                      onClick={() => setShowCart(!showCart)}
                      style={{ position: 'relative', background: 'none', border: 'none', color: s.text, cursor: 'pointer' }}
                    >
                      <ShoppingCart size={14} />
                      {cart.length > 0 && (
                        <span style={{ position: 'absolute', top: '-6px', right: '-8px', backgroundColor: accent, color: 'white', borderRadius: '50%', width: '12px', height: '12px', fontSize: '0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {cart.reduce((a, b) => a + b.qty, 0)}
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Sub Pages display */}
              <div style={{ flex: 1, padding: '16px' }}>
                
                {/* 1. Home Tab */}
                {activeTab === 'home' && (
                  <div>
                    <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '10px', marginBottom: '14px' }}>
                      <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: s.text }}>{editableHeroTitle}</h2>
                      <p style={{ fontSize: '0.7rem', color: s.textMuted }}>{editableSubtext}</p>
                    </div>

                    <div style={{ background: s.card, borderRadius: '8px', padding: '12px', border: `1px solid ${s.border}`, marginBottom: '12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.75rem', marginBottom: '4px' }}>Welcome to ApexCorp Digital Platform</div>
                      <p style={{ fontSize: '0.65rem', color: s.textMuted }}>
                        This multi-page platform handles service listings, client inquiries, and custom blog postings. Fully integrated with standard search indexes.
                      </p>
                      <div style={{ marginTop: '8px', fontSize: '0.65rem', color: accent, fontWeight: 700 }}>
                        ⚙️ configured with {pagesCount} core pages.
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Services Tab */}
                {activeTab === 'services' && (
                  <div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px', color: s.text }}>Professional Solutions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {[
                        { name: 'Core Strategy Consulting', desc: 'Corporate roadmap planning and execution.' },
                        { name: 'Full-Stack Development', desc: 'Secure web interfaces and pipelines.' }
                      ].map((srv, idx) => (
                        <div key={idx} style={{ padding: '10px', borderRadius: '6px', border: `1px solid ${s.border}`, backgroundColor: s.card }}>
                          <div style={{ fontWeight: 700, fontSize: '0.7rem', color: s.text }}>{srv.name}</div>
                          <p style={{ fontSize: '0.6rem', color: s.textMuted, marginTop: '2px' }}>{srv.desc}</p>
                          {features.includes('stripe') && (
                            <button 
                              onClick={() => handleAddToCart({ id: `service-${idx}`, name: srv.name, price: 199 })}
                              style={{ border: `1px solid ${accent}`, color: accent, fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', marginTop: '6px', fontWeight: 600 }}
                            >
                              Add to Plan ($199)
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Blog Tab */}
                {activeTab === 'blog' && (
                  <div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px', color: s.text }}>Dynamic Company Insights</h3>
                    {features.includes('database') || features.includes('cms') ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                          { title: 'Scaling Enterprise Cloud Architectures', date: 'July 28, 2026', read: '5 min read' },
                          { title: 'The Future of Conversion Optimization', date: 'July 15, 2026', read: '3 min read' }
                        ].map((post, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', border: `1px solid ${s.border}`, borderRadius: '6px', background: s.card }}>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.7rem', color: s.text }}>{post.title}</div>
                              <span style={{ fontSize: '0.6rem', color: s.textMuted }}>{post.date}</span>
                            </div>
                            <span style={{ fontSize: '0.6rem', color: accent, alignSelf: 'center', fontWeight: 600 }}>{post.read}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ padding: '20px', textAlign: 'center', border: `1px dashed ${s.border}`, borderRadius: '8px' }}>
                        <AlertCircle size={16} color={accent} style={{ marginBottom: '4px' }} />
                        <div style={{ fontSize: '0.7rem', color: s.textMuted }}>Blog feeds require the 'Secure Database Integration' add-on to load dynamic articles.</div>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Contact Tab */}
                {activeTab === 'contact' && (
                  <div>
                    {contactSubmitted ? (
                      <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid #10b981', borderRadius: '8px' }}>
                        <CheckCircle size={20} color="#10b981" style={{ margin: '0 auto 6px' }} />
                        <div style={{ fontWeight: 700, fontSize: '0.75rem', color: '#10b981' }}>Message Sent Successfully!</div>
                        <div style={{ fontSize: '0.65rem', color: s.textMuted, marginTop: '2px' }}>We will contact you shortly at your provided email.</div>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '280px', margin: '0 auto' }}>
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          required
                          value={contactName} 
                          onChange={(e) => setContactName(e.target.value)}
                          style={{ padding: '4px 8px', fontSize: '0.7rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.card, color: s.text }}
                        />
                        <input 
                          type="email" 
                          placeholder="Your Email" 
                          required
                          value={contactEmail} 
                          onChange={(e) => setContactEmail(e.target.value)}
                          style={{ padding: '4px 8px', fontSize: '0.7rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.card, color: s.text }}
                        />
                        <textarea 
                          placeholder="Project Brief Message..." 
                          rows={2} 
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          style={{ padding: '4px 8px', fontSize: '0.7rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.card, color: s.text, resize: 'none' }}
                        />
                        <button type="submit" style={{ backgroundColor: accent, color: 'white', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, fontSize: '0.7rem' }}>
                          Send Message
                        </button>
                      </form>
                    )}
                  </div>
                )}

              </div>
            </div>
          )}

          {/* MOCKUP CONTENT 3: FIXED PROJECT CUSTOM WEB APP (SaaS Dashboard) */}
          {packageId === 'custom-application' && (
            <div style={{ display: 'flex', height: '100%' }}>
              
              {/* SaaS Sidebar */}
              <div style={{ width: '80px', backgroundColor: s.card, borderRight: `1px solid ${s.border}`, display: 'flex', flexDirection: 'column', padding: '8px', gap: '12px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.75rem', color: s.text, textAlign: 'center', marginBottom: '8px', paddingBottom: '8px', borderBottom: `1px solid ${s.border}` }}>
                  SaaS.io
                </div>
                {[
                  { id: 'dashboard', label: 'Overview', icon: <BarChart2 size={12} /> },
                  { id: 'users', label: 'Users', icon: <Users size={12} /> },
                  { id: 'settings', label: 'Settings', icon: <Settings size={12} /> }
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: '3px',
                      color: activeTab === item.id ? accent : s.textMuted,
                      cursor: 'pointer'
                    }}
                  >
                    {item.icon}
                    <span style={{ fontSize: '0.55rem', fontWeight: activeTab === item.id ? 700 : 500 }}>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* SaaS Dashboard Viewport */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Dashboard Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: `1px solid ${s.border}`, alignItems: 'center', backgroundColor: s.bg }}>
                  <div style={{ fontWeight: 700, fontSize: '0.75rem' }}>
                    {activeTab === 'dashboard' && 'Analytics Overview'}
                    {activeTab === 'users' && 'User Management'}
                    {activeTab === 'settings' && 'System Config'}
                  </div>
                  
                  {/* Auth indicator */}
                  <div>
                    {features.includes('auth') ? (
                      isLoggedIn ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
                          <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>matty_dev</span>
                          <button onClick={() => setIsLoggedIn(false)} style={{ color: '#ef4444', fontSize: '0.6rem', padding: '0', background: 'none' }}>Logout</button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setShowAuthModal(true)} 
                          style={{ border: `1px solid ${accent}`, color: accent, fontSize: '0.65rem', padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}
                        >
                          <Lock size={10} />
                          Unlock Portal
                        </button>
                      )
                    ) : (
                      <span style={{ fontSize: '0.65rem', color: s.textMuted }}>No-Auth Access</span>
                    )}
                  </div>
                </div>

                {/* Dashboard Tab Content */}
                <div style={{ flex: 1, padding: '12px', overflowY: 'auto' }}>
                  
                  {/* Lock Screen simulation for Custom Apps with Auth */}
                  {features.includes('auth') && !isLoggedIn ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%', textAlign: 'center', gap: '10px' }}>
                      <Lock size={20} color={accent} style={{ opacity: 0.8 }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.75rem' }}>Secure Portal Access</div>
                        <p style={{ fontSize: '0.6rem', color: s.textMuted, maxWidth: '180px' }}>Use the authentication button to log in and unlock this dashboard.</p>
                      </div>
                      <button 
                        onClick={() => { setIsLoggedIn(true) }}
                        style={{ backgroundColor: accent, color: 'white', fontSize: '0.65rem', padding: '4px 10px', borderRadius: '4px', fontWeight: 600 }}
                      >
                        Bypass Log In
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* 1. Dashboard Overview */}
                      {activeTab === 'dashboard' && (
                        <div>
                          {/* Mini widgets */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                            {[
                              { label: 'Weekly Revenue', val: '$14.2k', change: '+12%' },
                              { label: 'Total Signups', val: '1,849', change: '+24%' },
                              { label: 'DB Speed SLA', val: '24ms', change: '99.9%' }
                            ].map((w, idx) => (
                              <div key={idx} style={{ padding: '6px 8px', borderRadius: '6px', border: `1px solid ${s.border}`, background: s.card }}>
                                <div style={{ fontSize: '0.55rem', color: s.textMuted }}>{w.label}</div>
                                <div style={{ fontWeight: 800, fontSize: '0.75rem', color: idx === 0 ? accent : s.text }}>{w.val}</div>
                                <div style={{ fontSize: '0.5rem', color: '#10b981' }}>{w.change}</div>
                              </div>
                            ))}
                          </div>

                          {/* Interactive Bar Chart using CSS grid */}
                          <div style={{ border: `1px solid ${s.border}`, borderRadius: '6px', padding: '10px', background: s.card }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>Conversion Rates (2026)</span>
                              <span style={{ fontSize: '0.55rem', color: s.textMuted }}>Updated live via DB</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', height: '40px', gap: '14px', paddingLeft: '10px', borderBottom: `1px solid ${s.border}` }}>
                              {[35, 55, 45, 80, 60, 95].map((h, i) => (
                                <div 
                                  key={i} 
                                  style={{ 
                                    flex: 1, 
                                    height: `${h}%`, 
                                    backgroundColor: i === 5 ? accent : 'rgba(255,255,255,0.05)', 
                                    border: `1px solid ${i === 5 ? accent : s.border}`,
                                    borderRadius: '3px 3px 0 0',
                                    position: 'relative'
                                  }}
                                  title={`Month ${i+1}: ${h}%`}
                                />
                              ))}
                            </div>
                            {features.includes('stripe') && (
                              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.55rem', color: s.textMuted }}>Stripe API Hook Connected</span>
                                <button 
                                  onClick={() => handleAddToCart({ id: 'app-upgrade', name: 'Pro SaaS Upgrade', price: 99 })}
                                  style={{ backgroundColor: accent, color: 'white', fontSize: '0.55rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}
                                >
                                  Test Stripe Pay ($99)
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* 2. Users Management Tab */}
                      {activeTab === 'users' && (
                        <div>
                          {features.includes('database') ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6rem', textAlign: 'left' }}>
                              <thead>
                                <tr style={{ borderBottom: `1px solid ${s.border}`, color: s.textMuted }}>
                                  <th style={{ paddingBottom: '4px' }}>Name</th>
                                  <th style={{ paddingBottom: '4px' }}>Role</th>
                                  <th style={{ paddingBottom: '4px' }}>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { name: 'Sarah Connor', role: 'Billing Manager', status: 'Active' },
                                  { name: 'John Doe', role: 'Database Editor', status: 'Suspended' }
                                ].map((usr, idx) => (
                                  <tr key={idx} style={{ borderBottom: `1px solid ${s.border}` }}>
                                    <td style={{ padding: '6px 0', fontWeight: 600 }}>{usr.name}</td>
                                    <td style={{ padding: '6px 0', color: s.textMuted }}>{usr.role}</td>
                                    <td style={{ padding: '6px 0' }}>
                                      <span style={{ backgroundColor: usr.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: usr.status === 'Active' ? '#10b981' : '#ef4444', padding: '1px 4px', borderRadius: '3px', fontSize: '0.5rem' }}>
                                        {usr.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div style={{ padding: '16px', textAlign: 'center', border: `1px dashed ${s.border}`, borderRadius: '8px' }}>
                              <Users size={16} color={accent} style={{ marginBottom: '4px' }} />
                              <div style={{ fontSize: '0.65rem', color: s.textMuted }}>Dynamic user tables require the 'Secure Database Integration' to store accounts list.</div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 3. Settings Config Tab */}
                      {activeTab === 'settings' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem' }}>System Debug Alerts</span>
                            <input type="checkbox" defaultChecked style={{ accentColor: accent }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem' }}>Auto Backups (Weekly)</span>
                            <input type="checkbox" defaultChecked style={{ accentColor: accent }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem' }}>Dynamic SEO Routing</span>
                            <input type="checkbox" defaultChecked={features.includes('seo')} disabled style={{ accentColor: accent }} />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* MOCKUP CONTENT 4: SUBSCRIPTION CARE / GROWTH PLAN CLIENT PORTAL */}
          {billingModel === 'subscription' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Subscription Portal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${s.border}`, alignItems: 'center', backgroundColor: s.card }}>
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: s.text, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: accent }}></div>
                  <span>Matty Dev Retainer</span>
                </div>
                <div style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                  Active Board
                </div>
              </div>

              {/* Portal Content */}
              <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* Retainer Details Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '10px' }}>
                  <div style={{ padding: '8px', border: `1px solid ${s.border}`, borderRadius: '6px', background: s.card }}>
                    <div style={{ fontSize: '0.55rem', color: s.textMuted }}>Retainer Subscription Plan</div>
                    <div style={{ fontWeight: 800, fontSize: '0.75rem' }}>{packageId === 'starter-retainer' ? 'Care Support Plan' : 'Growth Developer Plan'}</div>
                  </div>
                  <div style={{ padding: '8px', border: `1px solid ${s.border}`, borderRadius: '6px', background: s.card }}>
                    <div style={{ fontSize: '0.55rem', color: s.textMuted }}>Support Response SLA</div>
                    <div style={{ fontWeight: 800, fontSize: '0.75rem', color: accent }}>
                      {features.includes('seo-retainer') ? 'Advanced SLA Active' : 'Standard SLA'}
                    </div>
                  </div>
                </div>

                {/* Task Queue Backlog */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: s.text }}>Active Task Board ({subTasks.length})</span>
                    <span style={{ fontSize: '0.55rem', color: s.textMuted }}>SEQUENTIAL COMPILATION</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '120px', overflowY: 'auto' }}>
                    {subTasks.map(t => (
                      <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px', borderRadius: '4px', background: s.card, border: `1px solid ${s.border}`, alignItems: 'center' }}>
                        <span style={{ fontSize: '0.6rem', color: t.status === 'completed' ? s.textMuted : s.text, textDecoration: t.status === 'completed' ? 'line-through' : 'none' }}>
                          {t.name}
                        </span>
                        <span style={{
                          fontSize: '0.5rem',
                          backgroundColor: t.status === 'completed' ? 'rgba(16,185,129,0.1)' : t.status === 'active' ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.05)',
                          color: t.status === 'completed' ? '#10b981' : t.status === 'active' ? '#7c3aed' : s.textMuted,
                          padding: '1px 4px',
                          borderRadius: '3px',
                          fontWeight: 600
                        }}>
                          {t.status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Add Task to Retainer Form */}
                  <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                    <input 
                      type="text" 
                      placeholder="Add another development request..."
                      required
                      value={newTaskInput}
                      onChange={(e) => setNewTaskInput(e.target.value)}
                      style={{ flex: 1, padding: '4px 8px', fontSize: '0.65rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.card, color: s.text }}
                    />
                    <button type="submit" style={{ backgroundColor: accent, color: 'white', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Plus size={10} /> Add
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* CHECKOUT MODAL OVERLAY */}
          {checkoutStep !== 'idle' && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 10 }}>
              <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: '12px', padding: '20px', width: '100%', maxWidth: '280px', textAlign: 'center' }}>
                {checkoutStep === 'checking-out' && (
                  <div>
                    <div style={{ border: `3px solid ${s.border}`, borderTop: `3px solid ${accent}`, borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }}></div>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>Processing Stripe Transaction...</div>
                    <p style={{ fontSize: '0.65rem', color: s.textMuted, marginTop: '4px' }}>Mocking standard Stripe secure payment gateway API call.</p>
                  </div>
                )}
                {checkoutStep === 'completed' && (
                  <div>
                    <CheckCircle2 size={32} color="#10b981" style={{ margin: '0 auto 10px' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#10b981' }}>Stripe Transaction Cleared!</div>
                    <p style={{ fontSize: '0.65rem', color: s.textMuted, marginTop: '4px' }}>Demo order processed. Checkout completed successfully.</p>
                    <button 
                      onClick={() => setCheckoutStep('idle')}
                      style={{ backgroundColor: accent, color: 'white', padding: '4px 12px', borderRadius: '4px', marginTop: '12px', fontSize: '0.65rem', fontWeight: 600 }}
                    >
                      Close Window
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SHOPPING CART DRAWER OVERLAY */}
          {showCart && (
            <div style={{ position: 'absolute', top: 0, right: 0, width: '180px', bottom: 0, backgroundColor: s.bg, borderLeft: `1px solid ${s.border}`, padding: '12px', display: 'flex', flexDirection: 'column', zIndex: 9, boxShadow: '-5px 0 15px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${s.border}`, paddingBottom: '6px', marginBottom: '8px', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.7rem' }}>Shopping Cart</span>
                <button onClick={() => setShowCart(false)} style={{ fontSize: '0.6rem', color: s.textMuted }}>Close</button>
              </div>
              
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {cart.length === 0 ? (
                  <div style={{ fontSize: '0.65rem', color: s.textMuted, fontStyle: 'italic', padding: '10px 0' }}>Cart is empty.</div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} style={{ borderBottom: `1px solid ${s.border}`, paddingBottom: '4px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.65rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: s.textMuted, marginTop: '1px' }}>
                        <span>Qty: {item.qty}</span>
                        <span>${item.price * item.qty}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div style={{ borderTop: `1px solid ${s.border}`, paddingTop: '8px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.7rem', marginBottom: '8px' }}>
                    <span>Total:</span>
                    <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0)}</span>
                  </div>
                  <button 
                    onClick={triggerMockCheckout}
                    style={{ backgroundColor: '#10b981', color: 'white', padding: '6px 0', borderRadius: '4px', width: '100%', fontSize: '0.65rem', fontWeight: 600 }}
                  >
                    Checkout Stripe
                  </button>
                </div>
              )}
            </div>
          )}

          {/* AUTHENTICATION LOGIN MODAL OVERLAY */}
          {showAuthModal && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 10 }}>
              <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: '10px', padding: '16px', width: '100%', maxWidth: '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.75rem' }}>Sign In to Workspace</span>
                  <button onClick={() => { setShowAuthModal(false); setLoginError(false); }} style={{ fontSize: '0.6rem', color: s.textMuted }}>Close</button>
                </div>
                
                <form onSubmit={handleDemoLogin} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Username / Email" 
                    defaultValue="matty_dev"
                    disabled
                    style={{ padding: '4px 8px', fontSize: '0.65rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.card, color: s.text, opacity: 0.7 }}
                  />
                  <input 
                    type="password" 
                    placeholder="Enter password (e.g. demo123)"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    style={{ padding: '4px 8px', fontSize: '0.65rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.card, color: s.text }}
                  />
                  
                  {loginError && (
                    <span style={{ fontSize: '0.55rem', color: '#ef4444' }}>Invalid access credentials.</span>
                  )}
                  
                  <button type="submit" style={{ backgroundColor: accent, color: 'white', padding: '5px 0', borderRadius: '4px', fontWeight: 600, fontSize: '0.65rem' }}>
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Embedded CSS animation for mock loader */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />

    </div>
  );
}
