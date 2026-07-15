import React from 'react';
import { Check, ArrowRight, Sparkles, Building, Layers, Zap, Shield, UserCheck } from 'lucide-react';

export default function Services({ onSelectPackage, billingModel, onBillingModelChange, currency, formatPrice }) {
  
  const projectPackages = [
    {
      id: 'landing-page',
      name: 'Conversion Landing Page',
      icon: <Sparkles size={24} color="var(--secondary)" />,
      tagline: 'Ideal for product launches, marketing, & validation.',
      basePrice: 250,
      description: 'A single, high-converting, lightning-fast landing page designed to turn visitors into leads.',
      features: [
        'Custom High-Fidelity UI/UX',
        '100% Mobile & Responsive Design',
        'Contact Form & Mailer Integrations',
        'High-Speed Edge CDN Deployment',
        'Core Technical SEO Audit',
        '3 Rounds of Design Revisions',
        'Vite + React Setup (Production Ready)'
      ],
      color: 'var(--secondary)'
    },
    {
      id: 'business-platform',
      name: 'Growth Web Platform',
      icon: <Building size={24} color="var(--primary)" />,
      tagline: 'Best for services, local businesses, & blogs.',
      basePrice: 750,
      description: 'A multi-page corporate website with modular structure and Content Management System integration.',
      features: [
        'Up to 5 Custom Pages / Views',
        'Headless Content Management System',
        'Professional Blog / News Hub',
        'Advanced Technical SEO & Schema',
        'Google Analytics & Marketing Pixels',
        'Smooth CSS Interactive Animations',
        '1 Month Post-Launch Support & Auditing'
      ],
      color: 'var(--primary)',
      popular: true
    },
    {
      id: 'custom-application',
      name: 'Custom SaaS Engine',
      icon: <Layers size={24} color="var(--accent)" />,
      tagline: 'Perfect for startups, SaaS, & complex tools.',
      basePrice: 2500,
      description: 'A full-stack, database-driven digital application customized entirely to your workflow.',
      features: [
        'Custom Dashboard & App Architecture',
        'Database Modeling & Secure Storage',
        'User Authentication (Login, Socials, Roles)',
        'Third-Party Integrations (Stripe, APIs)',
        'Serverless Backend Functions',
        'Real-time Data Fetching & Sync',
        '3 Months Priority Support & Documentation'
      ],
      color: 'var(--accent)'
    }
  ];

  const subscriptionPackages = [
    {
      id: 'starter-retainer',
      name: 'Starter Retainer',
      icon: <Shield size={24} color="var(--secondary)" />,
      tagline: 'Best for simple updates & site security.',
      basePrice: 149,
      description: 'Ongoing technical upkeep, cloud backups, and security patching for existing websites.',
      features: [
        'Monthly CMS & Plugin Upgrades',
        'Automated Secure DB Backups',
        'Web Security Auditing & Firewalling',
        'Core Web Vitals Performance Auditing',
        'Up to 4 Hours Support/Styling Tasks',
        'Email Support (24hr Response)',
        'Cancel Anytime'
      ],
      color: 'var(--secondary)'
    },
    {
      id: 'dev-on-demand',
      name: 'Developer-on-Demand',
      icon: <UserCheck size={24} color="var(--primary)" />,
      tagline: 'Best for active startups needing continuous dev.',
      basePrice: 799,
      description: 'Your dedicated senior frontend engineer. Add unlimited tasks and build out feature by feature.',
      features: [
        '1 Active Development Task at a Time',
        'Unlimited Tasks Backlog/Queue',
        'Average 48-Hour Task Delivery',
        'Direct Slack Channel Communication',
        'Vite, React, Node.js Expert Access',
        'Comprehensive Code Reviews & Handoffs',
        'Pause or Cancel Anytime'
      ],
      color: 'var(--primary)',
      popular: true
    },
    {
      id: 'engineering-team',
      name: 'Engineering Team',
      icon: <Zap size={24} color="var(--accent)" />,
      tagline: 'Perfect for fast-scaling startups and apps.',
      basePrice: 1499,
      description: 'Double the output. Two senior engineers working parallel in your codebase for rapid shipping.',
      features: [
        '2 Active Development Tasks at a Time',
        'Unlimited Tasks Backlog/Queue',
        'Dedicated Project Lead Oversight',
        'Dedicated Shared Slack Channel',
        'Full Stack Architecture Consulting',
        'Premium QA & Unit Testing Audits',
        'Pause or Cancel Anytime'
      ],
      color: 'var(--accent)'
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
