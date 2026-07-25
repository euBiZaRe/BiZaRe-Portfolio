import React from 'react';
import { Check, ArrowRight, Sparkles, Building, Layers, Zap, Shield, UserCheck } from 'lucide-react';

export default function Services({ onSelectPackage, billingModel, onBillingModelChange, currency, formatPrice }) {
  
  const projectPackages = [
    {
      id: 'landing-page',
      name: 'Launch Landing Page',
      icon: <Sparkles size={24} color="var(--secondary)" />,
      tagline: 'Perfect for: Creators, local businesses, product launches, events',
      basePrice: 129,
      description: 'A single, high-converting landing page built to turn visitors into leads.',
      features: [
        'Custom responsive design',
        'Contact form',
        'Basic SEO',
        'Analytics setup',
        'Performance optimisation',
        '2 revisions'
      ],
      color: 'var(--secondary)'
    },
    {
      id: 'business-platform',
      name: 'Business Website',
      icon: <Building size={24} color="var(--primary)" />,
      tagline: 'Perfect for: Trades, restaurants, salons, agencies, small businesses',
      basePrice: 399,
      description: 'A professional multi-page website with a content management system.',
      features: [
        'Up to 5 pages',
        'CMS integration',
        'Contact forms',
        'SEO optimisation',
        'Google Analytics',
        'Performance optimisation',
        '1 month support',
        '3 revisions'
      ],
      color: 'var(--primary)',
      popular: true
    },
    {
      id: 'custom-application',
      name: 'Custom Web App / Startup MVP',
      icon: <Layers size={24} color="var(--accent)" />,
      tagline: 'Perfect for: Startup ideas, booking systems, dashboards, membership platforms',
      basePrice: 799,
      description: "A full-stack, database-driven application tailored to your workflow — the same class of build behind GRiD UP's live telemetry and member systems.",
      features: [
        'Authentication',
        'Database',
        'Admin dashboard',
        'API integrations',
        'Documentation',
        '1 month support'
      ],
      color: 'var(--accent)'
    }
  ];

  const subscriptionPackages = [
    {
      id: 'starter-retainer',
      name: 'Care Plan',
      icon: <Shield size={24} color="var(--secondary)" />,
      tagline: 'Keep your website secure and running smoothly.',
      basePrice: 39,
      description: 'Ongoing technical upkeep, backups, and security patching for your website.',
      features: [
        'Security updates',
        'Website maintenance',
        'Weekly backups',
        'CMS updates',
        'Up to 2 support hours',
        'Email support'
      ],
      color: 'var(--secondary)'
    },
    {
      id: 'dev-on-demand',
      name: 'Growth Plan',
      icon: <UserCheck size={24} color="var(--primary)" />,
      tagline: 'For businesses wanting regular improvements, without the big agency price tag.',
      basePrice: 159,
      description: 'Your dedicated senior engineer for continuous updates, optimizations, and small features.',
      features: [
        '1 active task at a time',
        'Up to 5 development hours',
        'Bug fixes',
        'Small feature additions',
        'Monthly check-in',
        'Priority email/Discord support'
      ],
      color: 'var(--primary)',
      popular: true
    }
  ];

  const packages = billingModel === 'project' ? projectPackages : subscriptionPackages;

  return (
    <section id="services" style={{ position: 'relative' }}>
      <div className="glow-spot" style={{ top: '40%', right: '5%' }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title">Flexible Pricing Structures</h2>
        <p className="section-subtitle">
          Choose between fixed project-based packages or monthly development subscriptions. Fully customizable to fit your business scale.
        </p>

        {/* Billing Model Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '6px',
            borderRadius: '12px',
            display: 'flex',
            gap: '8px'
          }}>
            <button
              onClick={() => onBillingModelChange('project')}
              style={{
                background: billingModel === 'project' ? 'linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%)' : 'none',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                fontFamily: 'var(--font-heading)',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                boxShadow: billingModel === 'project' ? '0 4px 12px rgba(99,102,241,0.3)' : 'none'
              }}
            >
              Fixed Project Packages
            </button>
            <button
              onClick={() => onBillingModelChange('subscription')}
              style={{
                background: billingModel === 'subscription' ? 'linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%)' : 'none',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                fontFamily: 'var(--font-heading)',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                boxShadow: billingModel === 'subscription' ? '0 4px 12px rgba(99,102,241,0.3)' : 'none'
              }}
            >
              Monthly Subscriptions
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '30px', 
            alignItems: 'stretch'
          }} 
          className="services-grid"
        >
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '36px 30px',
                borderColor: pkg.popular ? 'rgba(99, 102, 241, 0.35)' : 'rgba(255, 255, 255, 0.05)',
                boxShadow: pkg.popular ? '0 10px 30px rgba(99, 102, 241, 0.1)' : 'none',
                height: '100%'
              }}
            >
              {pkg.popular && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  RECOMMENDED
                </div>
              )}

              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {pkg.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'white' }}>{pkg.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pkg.tagline}</span>
                </div>
              </div>

              {/* Price */}
              <div style={{ margin: '12px 0 20px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {billingModel === 'project' ? 'Starting at' : 'Flat rate'}
                </span>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'white' }}>
                  {formatPrice(pkg.basePrice, currency)}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {billingModel === 'subscription' && '/mo'}
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', flexGrow: 0 }}>
                {pkg.description}
              </p>

              {/* Features List */}
              <div style={{ flexGrow: 1, marginBottom: '32px' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'white', marginBottom: '12px', fontWeight: 600 }}>
                  Deliverables Included:
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none' }}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <Check size={16} color={pkg.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button 
                className="btn btn-outline-glow" 
                style={{ 
                  width: '100%', 
                  borderColor: pkg.color,
                  boxShadow: `0 0 10px ${pkg.color}15`
                }}
                onClick={() => onSelectPackage(pkg)}
              >
                <span>Select & Customize</span>
                <ArrowRight size={16} />
              </button>

            </div>
          ))}
        </div>

        <div style={{ 
          textAlign: 'center', 
          color: 'var(--text-muted)', 
          fontSize: '0.85rem', 
          lineHeight: '1.6',
          maxWidth: '720px',
          margin: '48px auto 0',
          padding: '16px 20px',
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: '8px',
          opacity: 0.9
        }}>
          <p style={{ margin: 0 }}>
            <strong>Fine Print:</strong> Prices represent starting estimates for standard scope. Final pricing is confirmed during a free consultation based on your specific requirements. All plans include clear milestones and revision rounds — no surprise charges.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 960px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}} />
    </section>
  );
}
