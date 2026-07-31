import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, ShoppingCart, Lock, Unlock, Eye, Edit3, Save, 
  Trash2, Plus, Check, CheckCircle2, ChevronRight, BarChart2, 
  Users, Settings, ArrowRight, CheckCircle, Mail, MessageSquare, AlertCircle,
  Heart, Play, Layers, Globe, Kanban, Sparkles, Send, BookOpen, Award
} from 'lucide-react';

export default function InteractivePreview({ packageId, features, pagesCount, billingModel }) {
  // Mockup theme and color state
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [accent, setAccent] = useState('#7c3aed'); // Violet (default), Cyan, Emerald, Rose
  
  // Custom Preset Styles
  const [templateStyle, setTemplateStyle] = useState(''); // SaaS, Minimalist, Portfolio, etc.
  const [activeTab, setActiveTab] = useState('home');
  
  // Interactive feature states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('idle'); // idle, checking-out, completed

  const [cmsMode, setCmsMode] = useState(false);
  const [editableHeroTitle, setEditableHeroTitle] = useState('');
  const [editableSubtext, setEditableSubtext] = useState('');
  
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

  // Preset 2 (Kanban Board) states
  const [kanbanTasks, setKanbanTasks] = useState([
    { id: 'k1', title: 'Design landing page mockup', column: 'todo' },
    { id: 'k2', title: 'Integrate Stripe gateway checkout', column: 'todo' },
    { id: 'k3', title: 'Connect user database schema', column: 'progress' },
    { id: 'k4', title: 'Setup Google analytics tracking', column: 'completed' }
  ]);
  const [newKanbanInput, setNewKanbanInput] = useState('');

  // Preset 3 (Social Community Feed) states
  const [feedPosts, setFeedPosts] = useState([
    { id: 'f1', author: 'Matty Roberts', avatar: 'MR', content: 'Just deployed the new telemetry dashboard for GRiD UP Sim Racing! The speed dials are rendering at 60fps.', likes: 12, liked: false },
    { id: 'f2', author: 'Alex Cortez', avatar: 'AC', content: 'Loving the custom ecommerce checkout template. Smooth Stripe transitions.', likes: 7, liked: false }
  ]);
  const [newPostInput, setNewPostInput] = useState('');

  // Auto-set preset options when package changes
  useEffect(() => {
    if (billingModel === 'subscription') {
      setTemplateStyle('retainer-portal');
      setActiveTab('home');
    } else {
      if (packageId === 'landing-page') {
        setTemplateStyle('tech-saas');
        setActiveTab('home');
      } else if (packageId === 'business-platform') {
        setTemplateStyle('corporate');
        setActiveTab('home');
      } else {
        setTemplateStyle('dashboard');
        setActiveTab('dashboard');
      }
    }
  }, [packageId, billingModel]);

  // Sync default texts when templateStyle changes
  useEffect(() => {
    setCmsMode(false);
    setContactSubmitted(false);
    
    if (templateStyle === 'tech-saas') {
      setEditableHeroTitle('Launch Your Tech Startup');
      setEditableSubtext('A beautiful, conversion-optimized landing page for your brand.');
    } else if (templateStyle === 'minimal-product') {
      setEditableHeroTitle('The Creative Notebook');
      setEditableSubtext('A premium, hand-crafted space for designers, writers, and developer thoughts.');
    } else if (templateStyle === 'creative-portfolio') {
      setEditableHeroTitle('Matty Roberts — Interactive Engineer');
      setEditableSubtext('Building high-performance frontend interfaces and sim racing portals.');
    } else if (templateStyle === 'corporate') {
      setEditableHeroTitle('Grow Your Business Online');
      setEditableSubtext('Professional multi-page platform with full CMS integration.');
    } else if (templateStyle === 'storefront') {
      setEditableHeroTitle('Apex Shop Products');
      setEditableSubtext('Secure payment integrations and smooth transaction carts.');
    } else if (templateStyle === 'blog-hub') {
      setEditableHeroTitle('Apex Content Hub');
      setEditableSubtext('Dynamic database feeds indexing corporate technical insights.');
    } else if (templateStyle === 'dashboard') {
      setEditableHeroTitle('SaaS Portal Dashboard');
      setEditableSubtext('Overview of your application event metrics and revenue stats.');
    } else if (templateStyle === 'task-board') {
      setEditableHeroTitle('SaaS Project Roadmap');
      setEditableSubtext('Manage development queues in real-time.');
    } else if (templateStyle === 'community-feed') {
      setEditableHeroTitle('SaaS Community Feed');
      setEditableSubtext('Interactive forum for community platform users.');
    }
  }, [templateStyle]);

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

  // E-commerce cart logic
  const handleAddToCart = (item) => {
    if (cart.some(i => i.id === item.id)) {
      setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
    setShowCart(true);
  };

  const triggerMockCheckout = () => {
    setCheckoutStep('checking-out');
    setTimeout(() => {
      setCheckoutStep('completed');
      setCart([]);
    }, 1500);
  };

  // Contact form logic
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

  // Kanban task movement logic
  const moveKanbanTask = (taskId, targetColumn) => {
    setKanbanTasks(kanbanTasks.map(t => t.id === taskId ? { ...t, column: targetColumn } : t));
  };

  const handleAddKanbanTask = (e) => {
    e.preventDefault();
    if (newKanbanInput.trim()) {
      setKanbanTasks([
        ...kanbanTasks,
        { id: `k-${Date.now()}`, title: newKanbanInput.trim(), column: 'todo' }
      ]);
      setNewKanbanInput('');
    }
  };

  // Social feed logic
  const handleLikePost = (postId) => {
    setFeedPosts(feedPosts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: p.liked ? p.likes - 1 : p.likes + 1,
          liked: !p.liked
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newPostInput.trim()) {
      setFeedPosts([
        ...feedPosts,
        {
          id: `f-${Date.now()}`,
          author: isLoggedIn ? 'matty_dev' : 'Guest User',
          avatar: isLoggedIn ? 'MD' : 'GU',
          content: newPostInput.trim(),
          likes: 0,
          liked: false
        }
      ]);
      setNewPostInput('');
    }
  };

  // Retainer portal backlog logic
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
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setPasswordInput('');
  };

  // Preset options based on active package selection
  const getPresetOptions = () => {
    if (billingModel === 'subscription') {
      return [{ id: 'retainer-portal', name: 'Retainer Backlog' }];
    }
    if (packageId === 'landing-page') {
      return [
        { id: 'tech-saas', name: 'Modern SaaS App' },
        { id: 'minimal-product', name: 'Minimalist E-Book' },
        { id: 'creative-portfolio', name: 'Creative Portfolio' }
      ];
    }
    if (packageId === 'business-platform') {
      return [
        { id: 'corporate', name: 'Clean Corporate' },
        { id: 'storefront', name: 'E-Commerce Store' },
        { id: 'blog-hub', name: 'Tech Blog Hub' }
      ];
    }
    // Custom applications
    return [
      { id: 'dashboard', name: 'Metrics Dashboard' },
      { id: 'task-board', name: 'Kanban Roadmaps' },
      { id: 'community-feed', name: 'Community Forum' }
    ];
  };

  return (
    <div className="glass-card" style={{ padding: '24px', borderColor: 'rgba(255, 255, 255, 0.06)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Interactive Controls Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)', fontWeight: 700 }}>
            Live Mockup Preview
          </span>
          {/* Template Preset Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Template Style:</span>
            <select
              value={templateStyle}
              onChange={(e) => setTemplateStyle(e.target.value)}
              style={{
                fontSize: '0.7rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                padding: '2px 8px',
                cursor: 'pointer',
                fontWeight: 600,
                outline: 'none'
              }}
            >
              {getPresetOptions().map(opt => (
                <option key={opt.id} value={opt.id} style={{ backgroundColor: '#18181b', color: 'white' }}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Theme and Color Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
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
        
        {/* Browser URL Bar */}
        <div style={{
          backgroundColor: theme === 'dark' ? '#18181b' : '#e5e7eb',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: `1px solid ${s.border}`
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#eab308', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }}></span>
          </div>

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
            <span>preview.bizare.shop/{templateStyle || 'custom-app'}</span>
          </div>
          
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

          {/* ==================================================== */}
          {/* PACKAGE 1: LANDING PAGE PRESETS                      */}
          {/* ==================================================== */}
          {packageId === 'landing-page' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* 1A. PRESET: MODERN SAAS / TECH */}
              {templateStyle === 'tech-saas' && (
                <div style={{ fontFamily: 'monospace', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* SaaS Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${s.border}`, alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: s.text, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: accent }}>&lt;</span>SaaSify<span style={{ color: accent }}>/&gt;</span>
                    </div>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', fontSize: '0.65rem' }}>
                      <span style={{ color: s.textMuted }}>features.json</span>
                      <span style={{ color: s.textMuted }}>api_docs</span>
                    </div>
                  </div>

                  {/* SaaS Hero */}
                  <div style={{ padding: '24px 16px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: s.text, lineHeight: 1.2 }}>
                      {cmsMode ? (
                        <input 
                          type="text" 
                          value={editableHeroTitle} 
                          onChange={(e) => setEditableHeroTitle(e.target.value)}
                          style={{ padding: '2px 6px', fontSize: '1.1rem', borderRadius: '4px', border: `1px solid ${accent}`, background: s.bg, color: s.text, textAlign: 'center', width: '90%' }}
                        />
                      ) : editableHeroTitle}
                    </h1>
                    <p style={{ fontSize: '0.7rem', color: s.textMuted, marginTop: '8px', maxWidth: '340px', marginLeft: 'auto', marginRight: 'auto' }}>
                      {cmsMode ? (
                        <textarea 
                          value={editableSubtext} 
                          onChange={(e) => setEditableSubtext(e.target.value)}
                          rows={2}
                          style={{ padding: '2px 6px', fontSize: '0.65rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.bg, color: s.textMuted, textAlign: 'center', width: '90%', resize: 'none' }}
                        />
                      ) : editableSubtext}
                    </p>

                    {/* Interactive mini analytics card embedded in landing page hero */}
                    <div style={{ margin: '16px auto 0', maxWidth: '320px', padding: '12px', borderRadius: '8px', border: `1px solid ${accent}`, background: s.card, textAlign: 'left', boxShadow: `0 0 15px rgba(${accent === '#7c3aed' ? '124,58,237' : '6,182,212'}, 0.15)` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.6rem', color: s.textMuted, fontWeight: 700 }}>DATABASE telemetry.db</span>
                        <span style={{ fontSize: '0.55rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '1px 4px', borderRadius: '3px' }}>60FPS LIVE</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '30px' }}>
                        {[40, 70, 50, 90, 60, 95, 80].map((h, idx) => (
                          <div key={idx} style={{ flex: 1, height: `${h}%`, backgroundColor: idx === 5 ? accent : 'rgba(255,255,255,0.08)', borderRadius: '2px' }}></div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
                      <button 
                        onClick={() => handleAddToCart({ id: 'lp-saas', name: 'SaaS License', price: 49 })}
                        style={{ backgroundColor: accent, color: 'white', padding: '6px 12px', borderRadius: '4px', fontWeight: 600, fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <ShoppingCart size={10} /> Buy Plan — $49
                      </button>
                      <button style={{ border: `1px solid ${s.border}`, color: s.text, padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem' }}>
                        API Console
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 1B. PRESET: MINIMALIST E-BOOK */}
              {templateStyle === 'minimal-product' && (
                <div style={{ fontFamily: 'Georgia, serif', display: 'flex', flexDirection: 'column', height: '100%', padding: '20px' }}>
                  {/* Split layout: cover on left, details on right */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px', flex: 1, alignItems: 'center' }}>
                    {/* Mock Book Cover */}
                    <div style={{ 
                      aspectRatio: '3/4', 
                      background: `linear-gradient(135deg, ${accent} 0%, #1e1b4b 100%)`, 
                      borderRadius: '6px', 
                      boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '16px',
                      color: 'white',
                      textAlign: 'left'
                    }}>
                      <div style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>Special Edition</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 'bold', lineHeight: 1.2 }}>THE CREATIVE LAB</div>
                      <div style={{ fontSize: '0.5rem', opacity: 0.7 }}>Matty Roberts</div>
                    </div>

                    {/* Book Pitch details */}
                    <div style={{ textAlign: 'left' }}>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: s.text, lineHeight: 1.2 }}>
                        {cmsMode ? (
                          <input 
                            type="text" 
                            value={editableHeroTitle} 
                            onChange={(e) => setEditableHeroTitle(e.target.value)}
                            style={{ padding: '2px 4px', fontSize: '1rem', borderRadius: '4px', border: `1px solid ${accent}`, background: s.bg, color: s.text, width: '100%' }}
                          />
                        ) : editableHeroTitle}
                      </h2>
                      <p style={{ fontSize: '0.65rem', color: s.textMuted, marginTop: '6px', fontStyle: 'italic' }}>
                        {cmsMode ? (
                          <textarea 
                            value={editableSubtext} 
                            onChange={(e) => setEditableSubtext(e.target.value)}
                            rows={2}
                            style={{ padding: '2px 4px', fontSize: '0.6rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.bg, color: s.textMuted, width: '100%', resize: 'none' }}
                          />
                        ) : editableSubtext}
                      </p>

                      <div style={{ marginTop: '12px' }}>
                        <div style={{ fontSize: '0.65rem', color: s.textMuted }}>Format: Interactive PDF & EPUB</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: accent, margin: '4px 0' }}>Price: $19.00</div>
                        
                        <button 
                          onClick={() => handleAddToCart({ id: 'lp-book', name: 'Minimal E-Book PDF', price: 19 })}
                          style={{ backgroundColor: accent, color: 'white', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '0.65rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <BookOpen size={10} /> Buy E-Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 1C. PRESET: CREATIVE PORTFOLIO */}
              {templateStyle === 'creative-portfolio' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' }}>
                  {/* Asymmetric Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px' }}>MATTY ROBERTS</span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: accent }}></span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px', flex: 1, alignItems: 'center' }}>
                    {/* Bio intro */}
                    <div style={{ textAlign: 'left' }}>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: s.text, textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
                        {cmsMode ? (
                          <input 
                            type="text" 
                            value={editableHeroTitle} 
                            onChange={(e) => setEditableHeroTitle(e.target.value)}
                            style={{ padding: '2px 4px', fontSize: '0.95rem', borderRadius: '4px', border: `1px solid ${accent}`, background: s.bg, color: s.text, width: '100%' }}
                          />
                        ) : editableHeroTitle}
                      </h2>
                      <p style={{ fontSize: '0.7rem', color: s.textMuted, marginTop: '6px' }}>
                        {cmsMode ? (
                          <textarea 
                            value={editableSubtext} 
                            onChange={(e) => setEditableSubtext(e.target.value)}
                            rows={2}
                            style={{ padding: '2px 4px', fontSize: '0.6rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.bg, color: s.textMuted, width: '100%', resize: 'none' }}
                          />
                        ) : editableSubtext}
                      </p>

                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                        <button style={{ backgroundColor: accent, color: 'white', padding: '5px 10px', borderRadius: '2px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>
                          View Works
                        </button>
                        <button style={{ border: `1px solid ${s.border}`, color: s.text, padding: '5px 10px', borderRadius: '2px', fontSize: '0.65rem', textTransform: 'uppercase' }}>
                          Contact
                        </button>
                      </div>
                    </div>

                    {/* Creative Card grid mockups */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {[
                        { title: 'GRiD UP telemetry', type: 'Community App' },
                        { title: 'Esports Roster Portal', type: 'Database app' }
                      ].map((item, idx) => (
                        <div key={idx} style={{ padding: '8px', border: `1px solid ${s.border}`, borderRadius: '4px', background: s.card, textAlign: 'left', cursor: 'pointer' }}>
                          <span style={{ fontSize: '0.5rem', color: accent, fontWeight: 700, textTransform: 'uppercase' }}>{item.type}</span>
                          <div style={{ fontSize: '0.65rem', fontWeight: 700, marginTop: '1px' }}>{item.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ==================================================== */}
          {/* PACKAGE 2: BUSINESS WEBSITE PRESETS                 */}
          {/* ==================================================== */}
          {packageId === 'business-platform' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Business Header Navbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${s.border}`, alignItems: 'center', backgroundColor: s.card }}>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: s.text, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: accent }}></div>
                  <span>{templateStyle === 'storefront' ? 'ApexShop' : templateStyle === 'blog-hub' ? 'TechFlow' : 'ApexCorp'}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ color: activeTab === 'home' ? accent : s.textMuted, fontWeight: activeTab === 'home' ? 700 : 500, fontSize: '0.7rem', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
                    Home
                  </span>
                  <span style={{ color: activeTab === 'shop' ? accent : s.textMuted, fontWeight: activeTab === 'shop' ? 700 : 500, fontSize: '0.7rem', cursor: 'pointer' }} onClick={() => setActiveTab('shop')}>
                    {templateStyle === 'storefront' ? 'Catalog' : templateStyle === 'blog-hub' ? 'Articles' : 'Services'}
                  </span>
                  <span style={{ color: activeTab === 'contact' ? accent : s.textMuted, fontWeight: activeTab === 'contact' ? 700 : 500, fontSize: '0.7rem', cursor: 'pointer' }} onClick={() => setActiveTab('contact')}>
                    Contact
                  </span>
                  
                  {features.includes('stripe') && (
                    <button onClick={() => setShowCart(!showCart)} style={{ position: 'relative', background: 'none', border: 'none', color: s.text, cursor: 'pointer' }}>
                      <ShoppingCart size={12} />
                      {cart.length > 0 && (
                        <span style={{ position: 'absolute', top: '-6px', right: '-8px', backgroundColor: accent, color: 'white', borderRadius: '50%', width: '12px', height: '12px', fontSize: '0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {cart.reduce((a, b) => a + b.qty, 0)}
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Sub-Pages based on Template Style (Bypassing home tab so they look completely unique!) */}
              <div style={{ flex: 1, padding: '16px' }}>

                {/* 2A. PRESET: CORPORATE SOLUTIONS */}
                {templateStyle === 'corporate' && (
                  <div>
                    {activeTab === 'home' ? (
                      <div>
                        <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '10px', marginBottom: '14px', textAlign: 'left' }}>
                          <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: s.text }}>{editableHeroTitle}</h2>
                          <p style={{ fontSize: '0.65rem', color: s.textMuted }}>{editableSubtext}</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
                          {[
                            { name: 'Corporate Consulting', icon: <Layers size={12} /> },
                            { name: 'API System Integrations', icon: <Globe size={12} /> }
                          ].map((srv, idx) => (
                            <div key={idx} style={{ padding: '8px', border: `1px solid ${s.border}`, borderRadius: '6px', background: s.card, textAlign: 'left', display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <span style={{ color: accent }}>{srv.icon}</span>
                              <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>{srv.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : activeTab === 'shop' ? (
                      <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Our Services</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{ padding: '8px', border: `1px solid ${s.border}`, borderRadius: '6px', background: s.card }}>
                            <div style={{ fontWeight: 700, fontSize: '0.7rem' }}>Consulting Retainer Package</div>
                            <p style={{ fontSize: '0.6rem', color: s.textMuted, marginTop: '2px' }}>Weekly strategic roadmaps and technology optimization planning.</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Schedule Consultation</h3>
                        <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <input type="text" placeholder="Full Name" required style={{ padding: '4px 6px', fontSize: '0.65rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.card, color: s.text }} />
                          <button type="submit" style={{ backgroundColor: accent, color: 'white', padding: '4px', borderRadius: '4px', fontSize: '0.65rem' }}>Submit Inquiry</button>
                        </form>
                      </div>
                    )}
                  </div>
                )}

                {/* 2B. PRESET: E-COMMERCE STOREFRONT (Straight to product catalog) */}
                {templateStyle === 'storefront' && (
                  <div>
                    {activeTab === 'contact' ? (
                      <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Support Center</h3>
                        <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <input type="email" placeholder="Billing Email" required style={{ padding: '4px 6px', fontSize: '0.65rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.card, color: s.text }} />
                          <button type="submit" style={{ backgroundColor: accent, color: 'white', padding: '4px', borderRadius: '4px', fontSize: '0.65rem' }}>Send Support Ticket</button>
                        </form>
                      </div>
                    ) : (
                      // Home and Shop tabs both render the storefront grid directly!
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', textAlign: 'left' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: s.text }}>Store Catalog</span>
                          <span style={{ fontSize: '0.6rem', color: s.textMuted }}>Filters: Accessories</span>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                          {[
                            { id: 'p1', name: 'Desk Hub Dock', price: 89, grad: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' },
                            { id: 'p2', name: 'Mech Keyboard', price: 120, grad: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' },
                            { id: 'p3', name: 'Office Chair', price: 299, grad: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)' }
                          ].map(prod => (
                            <div key={prod.id} style={{ padding: '8px', border: `1px solid ${s.border}`, borderRadius: '6px', background: s.card, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              {/* Color mock thumbnail */}
                              <div style={{ width: '100%', height: '36px', borderRadius: '4px', background: prod.grad, marginBottom: '6px' }}></div>
                              <div style={{ fontWeight: 700, fontSize: '0.6rem', color: s.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.name}</div>
                              <div style={{ fontSize: '0.65rem', color: accent, fontWeight: 700, margin: '2px 0 4px' }}>${prod.price}</div>
                              
                              {features.includes('stripe') ? (
                                <button 
                                  onClick={() => handleAddToCart(prod)}
                                  style={{ backgroundColor: accent, color: 'white', fontSize: '0.55rem', padding: '2px 0', border: 'none', borderRadius: '3px', width: '100%', fontWeight: 600, cursor: 'pointer' }}
                                >
                                  Buy Now
                                </button>
                              ) : (
                                <button style={{ border: `1px solid ${s.border}`, color: s.textMuted, fontSize: '0.55rem', padding: '2px 0', borderRadius: '3px', width: '100%' }} disabled>
                                  Sold Out
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2C. PRESET: TECHNICAL BLOG HUB (Straight to blog posts feed) */}
                {templateStyle === 'blog-hub' && (
                  <div>
                    {activeTab === 'contact' ? (
                      <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Subscribe to TechFlow</h3>
                        <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <input type="email" placeholder="Your Email Address" required style={{ padding: '4px 6px', fontSize: '0.65rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.card, color: s.text }} />
                          <button type="submit" style={{ backgroundColor: accent, color: 'white', padding: '4px', borderRadius: '4px', fontSize: '0.65rem' }}>Join Newsletter</button>
                        </form>
                      </div>
                    ) : (
                      // Home and Shop tabs both render the dynamic blog hub articles grid directly!
                      <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '8px', borderBottom: `1px solid ${s.border}`, paddingBottom: '4px' }}>Editorial Articles</h3>
                        {features.includes('database') || features.includes('cms') ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {/* Featured main cover article */}
                            <div style={{ padding: '10px', borderRadius: '8px', border: `1px solid ${accent}`, background: s.card }}>
                              <span style={{ fontSize: '0.5rem', color: accent, fontWeight: 700, textTransform: 'uppercase' }}>Featured Article</span>
                              <div style={{ fontWeight: 800, fontSize: '0.75rem', marginTop: '2px', color: s.text }}>Scaling Cloud APIs in 2026</div>
                              <p style={{ fontSize: '0.6rem', color: s.textMuted, marginTop: '4px' }}>A deep dive into serverless data queries, db caching, and varnish edge nodes...</p>
                            </div>
                            
                            {/* Minor article */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', border: `1px solid ${s.border}`, borderRadius: '6px', background: s.card, alignItems: 'center' }}>
                              <span style={{ fontWeight: 700, fontSize: '0.65rem' }}>CSS Grid vs Flexbox Layouts</span>
                              <span style={{ fontSize: '0.55rem', color: accent }}>July 15</span>
                            </div>
                          </div>
                        ) : (
                          <div style={{ padding: '24px', textAlign: 'center', border: `1px dashed ${s.border}`, borderRadius: '8px' }}>
                            <AlertCircle size={14} color={accent} style={{ margin: '0 auto 4px' }} />
                            <div style={{ fontSize: '0.65rem', color: s.textMuted }}>Database and CMS features are required to render dynamic article posts.</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* PACKAGE 3: CUSTOM WEB APP PRESETS (Dashboard, Kanban, Forum) */}
          {/* ==================================================== */}
          {packageId === 'custom-application' && (
            <div style={{ display: 'flex', height: '100%' }}>
              
              {/* SaaS Sidebar */}
              <div style={{ width: '80px', backgroundColor: s.card, borderRight: `1px solid ${s.border}`, display: 'flex', flexDirection: 'column', padding: '8px', gap: '12px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.75rem', color: s.text, textAlign: 'center', marginBottom: '8px', paddingBottom: '8px', borderBottom: `1px solid ${s.border}` }}>
                  SaaS.io
                </div>
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={12} /> },
                  { id: 'users', label: 'Accounts', icon: <Users size={12} /> },
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
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none'
                    }}
                  >
                    {item.icon}
                    <span style={{ fontSize: '0.55rem', fontWeight: activeTab === item.id ? 700 : 500 }}>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Viewport content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                
                {/* Header navbar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: `1px solid ${s.border}`, alignItems: 'center', backgroundColor: s.bg }}>
                  <div style={{ fontWeight: 700, fontSize: '0.75rem' }}>
                    {templateStyle === 'dashboard' && 'Analytics Overview'}
                    {templateStyle === 'task-board' && 'SaaS Project Board'}
                    {templateStyle === 'community-feed' && 'SaaS Feed Board'}
                  </div>
                  
                  {/* Auth Indicator */}
                  <div>
                    {features.includes('auth') ? (
                      isLoggedIn ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
                          <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>matty_dev</span>
                          <button onClick={() => setIsLoggedIn(false)} style={{ color: '#ef4444', fontSize: '0.6rem', padding: '0', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setShowAuthModal(true)} 
                          style={{ border: `1px solid ${accent}`, color: accent, fontSize: '0.65rem', padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600, cursor: 'pointer', background: 'none' }}
                        >
                          <Lock size={10} /> Unlock Portal
                        </button>
                      )
                    ) : (
                      <span style={{ fontSize: '0.65rem', color: s.textMuted }}>No-Auth Console</span>
                    )}
                  </div>
                </div>

                {/* Dashboard Tab Contents */}
                <div style={{ flex: 1, padding: '12px', overflowY: 'auto' }}>
                  
                  {/* Lock Screen overlay */}
                  {features.includes('auth') && !isLoggedIn ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%', textAlign: 'center', gap: '10px' }}>
                      <Lock size={20} color={accent} style={{ opacity: 0.8 }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.75rem' }}>Secure Portal Access</div>
                        <p style={{ fontSize: '0.6rem', color: s.textMuted, maxWidth: '180px' }}>Use the authentication button to log in and unlock this dashboard.</p>
                      </div>
                      <button 
                        onClick={() => { setIsLoggedIn(true) }}
                        style={{ backgroundColor: accent, color: 'white', fontSize: '0.65rem', padding: '4px 10px', borderRadius: '4px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                      >
                        Bypass Log In
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* 3A. PRESET: METRICS DASHBOARD */}
                      {templateStyle === 'dashboard' && activeTab === 'dashboard' && (
                        <div>
                          {/* Mini stats widgets */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                            {[
                              { label: 'Revenue', val: '$14.2k' },
                              { label: 'Signups', val: '1,849' },
                              { label: 'SLA Speed', val: '24ms' }
                            ].map((w, idx) => (
                              <div key={idx} style={{ padding: '6px 8px', borderRadius: '6px', border: `1px solid ${s.border}`, background: s.card }}>
                                <div style={{ fontSize: '0.55rem', color: s.textMuted }}>{w.label}</div>
                                <div style={{ fontWeight: 800, fontSize: '0.75rem', color: idx === 0 ? accent : s.text }}>{w.val}</div>
                              </div>
                            ))}
                          </div>

                          {/* CSS graph */}
                          <div style={{ border: `1px solid ${s.border}`, borderRadius: '6px', padding: '10px', background: s.card }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>Conversion Rates (2026)</span>
                              <span style={{ fontSize: '0.55rem', color: s.textMuted }}>Live DB Graph</span>
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
                                    borderRadius: '3px 3px 0 0'
                                  }}
                                />
                              ))}
                            </div>
                            {features.includes('stripe') && (
                              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.55rem', color: s.textMuted }}>Stripe API Hook Connected</span>
                                <button 
                                  onClick={() => handleAddToCart({ id: 'app-upgrade', name: 'Pro SaaS Upgrade', price: 99 })}
                                  style={{ backgroundColor: accent, color: 'white', fontSize: '0.55rem', padding: '2px 6px', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
                                >
                                  Test Stripe Pay ($99)
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* 3B. PRESET: CRM KANBAN BOARD */}
                      {templateStyle === 'task-board' && activeTab === 'dashboard' && (
                        <div>
                          {/* Kanban Columns */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                            {['todo', 'progress', 'completed'].map(colName => (
                              <div key={colName} style={{ background: s.card, border: `1px solid ${s.border}`, borderRadius: '6px', padding: '6px', minHeight: '120px' }}>
                                <div style={{ fontSize: '0.55rem', fontWeight: 800, color: accent, textTransform: 'uppercase', marginBottom: '6px', borderBottom: `1px solid ${s.border}`, paddingBottom: '3px', textAlign: 'left' }}>
                                  {colName}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  {kanbanTasks.filter(t => t.column === colName).map(task => (
                                    <div key={task.id} style={{ background: s.bg, border: `1px solid ${s.border}`, padding: '6px', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                                      <div style={{ fontSize: '0.55rem', color: s.text, fontWeight: 500 }}>{task.title}</div>
                                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '3px' }}>
                                        {colName === 'todo' && (
                                          <button 
                                            onClick={() => moveKanbanTask(task.id, 'progress')} 
                                            style={{ backgroundColor: accent, color: 'white', padding: '1px 4px', borderRadius: '2px', fontSize: '0.45rem', border: 'none', cursor: 'pointer' }}
                                          >
                                            Start
                                          </button>
                                        )}
                                        {colName === 'progress' && (
                                          <button 
                                            onClick={() => moveKanbanTask(task.id, 'completed')} 
                                            style={{ backgroundColor: '#10b981', color: 'white', padding: '1px 4px', borderRadius: '2px', fontSize: '0.45rem', border: 'none', cursor: 'pointer' }}
                                          >
                                            Done
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Add Kanban Task Form */}
                          <form onSubmit={handleAddKanbanTask} style={{ display: 'flex', gap: '4px', marginTop: '10px' }}>
                            <input 
                              type="text" 
                              placeholder="New roadmap task..." 
                              value={newKanbanInput}
                              onChange={(e) => setNewKanbanInput(e.target.value)}
                              style={{ flex: 1, padding: '3px 6px', fontSize: '0.6rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.card, color: s.text }}
                            />
                            <button type="submit" style={{ backgroundColor: accent, color: 'white', padding: '3px 8px', border: 'none', borderRadius: '4px', fontSize: '0.6rem', cursor: 'pointer' }}>
                              Add Task
                            </button>
                          </form>
                        </div>
                      )}

                      {/* 3C. PRESET: COMMUNITY SOCIAL FEED */}
                      {templateStyle === 'community-feed' && activeTab === 'dashboard' && (
                        <div>
                          {/* Feed Posts */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '130px', overflowY: 'auto', marginBottom: '8px' }}>
                            {feedPosts.map(post => (
                              <div key={post.id} style={{ padding: '8px', border: `1px solid ${s.border}`, borderRadius: '6px', background: s.card, display: 'flex', gap: '8px', textAlign: 'left' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: accent, color: 'white', fontSize: '0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                                  {post.avatar}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.6rem' }}>{post.author}</span>
                                    <button 
                                      onClick={() => handleLikePost(post.id)}
                                      style={{ display: 'flex', alignItems: 'center', gap: '2px', color: post.liked ? '#f43f5e' : s.textMuted, fontSize: '0.55rem', background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                      <Heart size={10} fill={post.liked ? '#f43f5e' : 'none'} /> {post.likes}
                                    </button>
                                  </div>
                                  <p style={{ fontSize: '0.55rem', color: s.textMuted, marginTop: '2px', lineHeight: 1.3 }}>{post.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Write Post Form */}
                          <form onSubmit={handleCreatePost} style={{ display: 'flex', gap: '6px' }}>
                            <input 
                              type="text" 
                              placeholder="Write a message to feed..." 
                              value={newPostInput}
                              onChange={(e) => setNewPostInput(e.target.value)}
                              style={{ flex: 1, padding: '4px 8px', fontSize: '0.6rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.card, color: s.text }}
                            />
                            <button type="submit" style={{ backgroundColor: accent, color: 'white', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
                              <Send size={10} /> Send
                            </button>
                          </form>
                        </div>
                      )}

                      {/* Admin Users Management Tab */}
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
                              <div style={{ fontSize: '0.65rem', color: s.textMuted }}>Database integration is required to list users here.</div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Settings Config Tab */}
                      {activeTab === 'settings' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

          {/* ==================================================== */}
          {/* MOCKUP CONTENT 4: RETAINER PORTAL (SUBSCRIPTIONS)    */}
          {/* ==================================================== */}
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

              {/* Retainer contents */}
              <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '10px' }}>
                  <div style={{ padding: '8px', border: `1px solid ${s.border}`, borderRadius: '6px', background: s.card, textAlign: 'left' }}>
                    <div style={{ fontSize: '0.55rem', color: s.textMuted }}>Retainer Subscription Plan</div>
                    <div style={{ fontWeight: 800, fontSize: '0.75rem' }}>{packageId === 'starter-retainer' ? 'Care Support Plan' : 'Growth Developer Plan'}</div>
                  </div>
                  <div style={{ padding: '8px', border: `1px solid ${s.border}`, borderRadius: '6px', background: s.card, textAlign: 'left' }}>
                    <div style={{ fontSize: '0.55rem', color: s.textMuted }}>Support Response SLA</div>
                    <div style={{ fontWeight: 800, fontSize: '0.75rem', color: accent }}>
                      {features.includes('seo-retainer') ? 'Advanced SLA Active' : 'Standard SLA'}
                    </div>
                  </div>
                </div>

                {/* Backlog List */}
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

                  {/* Add Task Form */}
                  <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                    <input 
                      type="text" 
                      placeholder="Add another development request..."
                      required
                      value={newTaskInput}
                      onChange={(e) => setNewTaskInput(e.target.value)}
                      style={{ flex: 1, padding: '4px 8px', fontSize: '0.65rem', borderRadius: '4px', border: `1px solid ${s.border}`, background: s.card, color: s.text }}
                    />
                    <button type="submit" style={{ backgroundColor: accent, color: 'white', padding: '4px 8px', border: 'none', borderRadius: '4px', fontWeight: 600, fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
                      <Plus size={10} /> Add Task
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* CHECKOUT STRIPE SUCCESS SCREEN OVERLAY */}
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
                      style={{ backgroundColor: accent, color: 'white', padding: '4px 12px', borderRadius: '4px', marginTop: '12px', fontSize: '0.65rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
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
                <button onClick={() => setShowCart(false)} style={{ fontSize: '0.6rem', color: s.textMuted, background: 'none', border: 'none', cursor: 'pointer' }}>Close</button>
              </div>
              
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {cart.length === 0 ? (
                  <div style={{ fontSize: '0.65rem', color: s.textMuted, fontStyle: 'italic', padding: '10px 0' }}>Cart is empty.</div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} style={{ borderBottom: `1px solid ${s.border}`, paddingBottom: '4px', textAlign: 'left' }}>
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
                    style={{ backgroundColor: '#10b981', color: 'white', padding: '6px 0', border: 'none', borderRadius: '4px', width: '100%', fontSize: '0.65rem', fontWeight: 600, cursor: 'pointer' }}
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
                  <button onClick={() => { setShowAuthModal(false); setLoginError(false); }} style={{ fontSize: '0.6rem', color: s.textMuted, background: 'none', border: 'none', cursor: 'pointer' }}>Close</button>
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
                  
                  <button type="submit" style={{ backgroundColor: accent, color: 'white', padding: '5px 0', border: 'none', borderRadius: '4px', fontWeight: 600, fontSize: '0.65rem', cursor: 'pointer' }}>
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>

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
