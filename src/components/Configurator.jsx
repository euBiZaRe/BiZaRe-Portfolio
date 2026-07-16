import React, { useState, useEffect } from 'react';
import { Sparkles, Building, Layers, Check, RefreshCw, Shield, UserCheck, Zap, Clock } from 'lucide-react';

export default function Configurator({ initialScope, onSaveScope, billingModel, currency, formatPrice }) {
  
  // Available base packages (Fixed-Price)
  const projectPackages = [
    { id: 'landing-page', name: 'Launch Landing Page', basePrice: 199, minPages: 1, maxPages: 2 },
    { id: 'business-platform', name: 'Business Website', basePrice: 599, minPages: 3, maxPages: 8 },
    { id: 'custom-application', name: 'Custom Web App / Startup MVP', basePrice: 1200, minPages: 5, maxPages: 20 }
  ];

  // Available base packages (Subscriptions)
  const subscriptionPackages = [
    { id: 'starter-retainer', name: 'Essentials', basePrice: 79 },
    { id: 'dev-on-demand', name: 'Growth', basePrice: 249 },
    { id: 'engineering-team', name: 'Scale', basePrice: 499 }
  ];

  // Configurator states
  const [selectedPkgId, setSelectedPkgId] = useState('business-platform');
  const [pages, setPages] = useState(5);
  const [timeline, setTimeline] = useState('standard'); // flexible, standard, express (for projects)
  const [sla, setSla] = useState('standard'); // standard, pro, instant (for subscriptions)
  
  // Feature add-ons (Fixed-Price)
  const projectAddOns = [
    { id: 'auth', name: 'User Authentication', price: 150, desc: 'Secure login, profile pages, and roles' },
    { id: 'database', name: 'Secure Database Integration', price: 200, desc: 'Store app data, products, or portfolios' },
    { id: 'stripe', name: 'E-Commerce / Payment Setup', price: 250, desc: 'Stripe payments, invoicing, and subscriptions' },
    { id: 'cms', name: 'CMS & Admin Dashboard', price: 250, desc: 'Admin panel to manage website content' },
    { id: 'seo', name: 'Advanced SEO & Schema', price: 100, desc: 'Structured markup and high ranking preparation' },
    { id: 'motion', name: 'Premium UI Motion Graphics', price: 150, desc: 'Smooth, custom animations & transitions' }
  ];

  // Feature add-ons (Subscriptions)
  const subscriptionAddOns = [
    { id: 'seo-retainer', name: 'SEO & Search Retainer', price: 100, desc: 'Ongoing keyword tracking & meta optimizations' },
    { id: 'qa-testing', name: 'Continuous QA & Unit Testing', price: 150, desc: 'Automated test suites & browser validation checks' },
    { id: 'analytics', name: 'Monthly Analytics Report', price: 75, desc: 'Conversion analysis and performance reviews' },
    { id: 'databases', name: 'Database Maintenance', price: 125, desc: 'DB indexing, cleanup, and speed tuning checks' }
  ];

  const [selectedFeatures, setSelectedFeatures] = useState(['seo']);

  // Sync state when model or initialScope changes
  useEffect(() => {
    if (billingModel === 'project') {
      setSelectedPkgId(initialScope?.packageId && projectPackages.find(p => p.id === initialScope.packageId) ? initialScope.packageId : 'business-platform');
      setPages(initialScope?.pages || 5);
      setTimeline(initialScope?.timeline || 'standard');
      setSelectedFeatures(initialScope?.features || ['seo']);
    } else {
      setSelectedPkgId(initialScope?.packageId && subscriptionPackages.find(p => p.id === initialScope.packageId) ? initialScope.packageId : 'dev-on-demand');
      setSla(initialScope?.sla || 'standard');
      // If project features are active, clear them and load subscription defaults
      const subFeatureIds = subscriptionAddOns.map(a => a.id);
      const activeSubFeatures = initialScope?.features?.filter(f => subFeatureIds.includes(f)) || ['seo-retainer'];
      setSelectedFeatures(activeSubFeatures.length > 0 ? activeSubFeatures : ['seo-retainer']);
    }
  }, [billingModel, initialScope]);

  const packages = billingModel === 'project' ? projectPackages : subscriptionPackages;
  const addOns = billingModel === 'project' ? projectAddOns : subscriptionAddOns;

  const handlePackageChange = (pkgId) => {
    setSelectedPkgId(pkgId);
    if (billingModel === 'project') {
      const pkg = projectPackages.find(p => p.id === pkgId);
      if (pkg) {
        if (pages < pkg.minPages) setPages(pkg.minPages);
        if (pages > pkg.maxPages) setPages(pkg.maxPages);
      }
    }
  };

  const toggleFeature = (featureId) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  const getActivePackage = () => packages.find(p => p.id === selectedPkgId) || packages[1];

  // Estimate calculation
  const calculateTotal = () => {
    const activePkg = getActivePackage();
    let total = activePkg.basePrice;

    if (billingModel === 'project') {
      // Extra pages fee ($50 per page beyond baseline)
      const baselinePages = activePkg.minPages;
      if (pages > baselinePages) {
        total += (pages - baselinePages) * 50;
      }

      // Add features pricing
      selectedFeatures.forEach(featureId => {
        const feature = projectAddOns.find(f => f.id === featureId);
        if (feature) total += feature.price;
      });

      // Timeline modifier
      if (timeline === 'express') {
        total *= 1.25; // 25% rush charge
      } else if (timeline === 'flexible') {
        total *= 0.95; // 5% flexible discount
      }
    } else {
      // Add features pricing
      selectedFeatures.forEach(featureId => {
        const feature = subscriptionAddOns.find(f => f.id === featureId);
        if (feature) total += feature.price;
      });

      // SLA support modifier
      if (sla === 'pro') {
        total += 99; // Slack + 24hr response
      } else if (sla === 'instant') {
        total += 299; // Instant hotlines + 4hr response
      }
    }

    return Math.round(total);
  };

  const handleUpdateScope = () => {
    const activePkg = getActivePackage();
    const finalPrice = calculateTotal();
    
    // Resolve full feature details
    const featuresList = selectedFeatures.map(fId => {
      const addOn = addOns.find(a => a.id === fId);
      return addOn ? addOn.name : '';
    }).filter(Boolean);

    onSaveScope({
      packageId: selectedPkgId,
      packageName: activePkg.name,
      billingModel,
      pages: billingModel === 'project' ? pages : null,
      timeline: billingModel === 'project' ? timeline : null,
      sla: billingModel === 'subscription' ? sla : null,
      features: selectedFeatures,
      featuresText: featuresList,
      price: finalPrice
    });
  };

  const activePkg = getActivePackage();
  const totalPrice = calculateTotal();

  return (
    <section id="configurator" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="glow-spot" style={{ bottom: '10%', left: '5%' }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title">Interactive Project Planner</h2>
        <p className="section-subtitle">
          Configure your service requirements. Estimate timelines, features, and pricing live before submitting your onboarding details.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', marginTop: '30px' }} className="configurator-grid">
          
          {/* Controls Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Step 1: Base Tier */}
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--secondary)', border: '1px solid var(--secondary)', padding: '2px 8px', borderRadius: '4px' }}>1</span>
                Select Core Application Tier ({billingModel === 'project' ? 'Project' : 'Subscription'})
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="package-selectors">
                {packages.map(p => {
                  const isActive = selectedPkgId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handlePackageChange(p.id)}
                      style={{
                        background: isActive ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                        border: isActive ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '20px 16px',
                        borderRadius: '12px',
                        color: 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => { if(!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                      onMouseLeave={(e) => { if(!isActive) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
                    >
                      <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '4px' }}>{p.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Base: {formatPrice(p.basePrice, currency)}{billingModel === 'subscription' && '/mo'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale (Pages for Projects, Information Panel for Subscriptions) */}
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--secondary)', border: '1px solid var(--secondary)', padding: '2px 8px', borderRadius: '4px' }}>2</span>
                {billingModel === 'project' ? 'Define Project Scale' : 'Queue Mechanism details'}
              </h3>
              
              {billingModel === 'project' ? (
                <div className="glass-card" style={{ padding: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Estimated Pages / Views:</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--secondary)' }}>{pages} Pages</span>
                  </div>
                  
                  <input
                    type="range"
                    min={activePkg.minPages}
                    max={activePkg.maxPages}
                    value={pages}
                    onChange={(e) => setPages(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      outline: 'none',
                      cursor: 'pointer',
                      margin: '12px 0 8px'
                    }}
                  />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>Min: {activePkg.minPages} page</span>
                    <span>Max for this tier: {activePkg.maxPages} pages</span>
                  </div>
                </div>
              ) : (
                <div className="glass-card" style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '10px', borderRadius: '8px', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: 'white', marginBottom: '4px', fontWeight: 600 }}>Active Backlog Workflow</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                      Subscriptions function via a task backlog. You can queue unlimited tasks. We compile, test, and ship tasks sequentially (one-by-one, or two-by-two for team tier), averaging 48hr delivery.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Add-ons */}
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--secondary)', border: '1px solid var(--secondary)', padding: '2px 8px', borderRadius: '4px' }}>3</span>
                Select Custom {billingModel === 'project' ? 'Integrations & Features' : 'Monthly Retainers'}
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="addons-grid">
                {addOns.map(add => {
                  const isChecked = selectedFeatures.includes(add.id);
                  return (
                    <div
                      key={add.id}
                      onClick={() => toggleFeature(add.id)}
                      style={{
                        background: isChecked ? 'rgba(6, 182, 212, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                        border: isChecked ? '1px solid var(--secondary)' : '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '16px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '12px',
                        transition: 'var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => { if(!isChecked) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                      onMouseLeave={(e) => { if(!isChecked) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isChecked ? 'none' : '1.5px solid rgba(255, 255, 255, 0.3)',
                        backgroundColor: isChecked ? 'var(--secondary)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '2px',
                        flexShrink: 0
                      }}>
                        {isChecked && <Check size={14} color="black" strokeWidth={3} />}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                          <span>{add.name}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            +{formatPrice(add.price, currency)}{billingModel === 'subscription' && '/mo'}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{add.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Urgency/SLA */}
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--secondary)', border: '1px solid var(--secondary)', padding: '2px 8px', borderRadius: '4px' }}>4</span>
                {billingModel === 'project' ? 'Select Target Delivery' : 'Select SLA Support Response'}
              </h3>
              
              {billingModel === 'project' ? (
                <div style={{ display: 'flex', gap: '16px' }} className="timeline-selectors">
                  {[
                    { id: 'flexible', name: 'Flexible Delivery', time: '6+ Weeks', label: '5% Discount' },
                    { id: 'standard', name: 'Standard Delivery', time: '3-4 Weeks', label: 'Recommended' },
                    { id: 'express', name: 'Express Rush', time: '1-2 Weeks', label: '+25% Surcharge' }
                  ].map(t => {
                    const isActive = timeline === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTimeline(t.id)}
                        style={{
                          flex: 1,
                          background: isActive ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                          border: isActive ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                          padding: '16px',
                          borderRadius: '12px',
                          color: 'white',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{t.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 4px' }}>{t.time}</div>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          color: t.id === 'express' ? 'var(--accent)' : t.id === 'flexible' ? 'var(--secondary)' : 'var(--primary-glow)',
                          fontWeight: '600'
                        }}>
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '16px' }} className="timeline-selectors">
                  {[
                    { id: 'standard', name: 'Standard Email Support', time: '48hr Response SLA', label: 'Included' },
                    { id: 'pro', name: 'Pro Slack Hotlines', time: '24hr Response SLA', label: `+${formatPrice(99, currency)}/mo` },
                    { id: 'instant', name: 'Enterprise Instant SLA', time: '4hr Response SLA', label: `+${formatPrice(299, currency)}/mo` }
                  ].map(s => {
                    const isActive = sla === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSla(s.id)}
                        style={{
                          flex: 1,
                          background: isActive ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                          border: isActive ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                          padding: '16px',
                          borderRadius: '12px',
                          color: 'white',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{s.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 4px' }}>{s.time}</div>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          color: s.id === 'instant' ? 'var(--accent)' : s.id === 'pro' ? 'var(--secondary)' : 'var(--primary-glow)',
                          fontWeight: '600'
                        }}>
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Estimates Card Sidebar */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div className="glass-card" style={{ padding: '36px 30px', borderColor: 'rgba(99, 102, 241, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <RefreshCw size={18} color="var(--primary)" />
                <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Live {billingModel === 'project' ? 'Project' : 'Subscription'} Summary
                </span>
              </div>

              {/* Scope Tiers Display */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Core Tier Selection</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>{activePkg.name}</div>
                </div>
                
                {billingModel === 'project' ? (
                  <>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Project Scale</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white' }}>{pages} Views / Pages</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Urgency</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white' }}>
                        {timeline.charAt(0).toUpperCase() + timeline.slice(1)} Delivery
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SLA Support Grade</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white' }}>
                      {sla.charAt(0).toUpperCase() + sla.slice(1)} Response
                    </div>
                  </div>
                )}
              </div>

              {/* Add-ons list */}
              <div style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  {billingModel === 'project' ? 'Custom Integrations' : 'Monthly Retainer Add-Ons'}
                </div>
                {selectedFeatures.length === 0 ? (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No additions selected.</div>
                ) : (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', listStyle: 'none' }}>
                    {selectedFeatures.map(fId => {
                      const addOn = addOns.find(a => a.id === fId);
                      return addOn ? (
                        <li key={fId} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--secondary)' }}></div>
                          <span>{addOn.name}</span>
                        </li>
                      ) : null;
                    })}
                  </ul>
                )}
              </div>

              {/* Total Estimate pricing */}
              <div style={{ padding: '24px 0 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {billingModel === 'project' ? 'Estimated Total' : 'Monthly Payment'}
                  </span>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-heading)' }}>
                    {formatPrice(totalPrice, currency)}
                    {billingModel === 'subscription' && <span style={{ fontSize: '1rem', fontWeight: '500' }}>/mo</span>}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  *Prices represent custom development and design estimates. Final rates are locked during consultation.
                </div>
              </div>

              {/* Save Scope & Begin Inquiry */}
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '14px 24px' }}
                onClick={handleUpdateScope}
              >
                <span>Save Scope & Get Started</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 960px) {
          .configurator-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .addons-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </section>
  );
}
