import React, { useState, useEffect, useRef } from 'react';
import Services from '../components/Services';
import Configurator from '../components/Configurator';

export default function ServicesPage({ 
  billingModel, 
  onBillingModelChange, 
  currency, 
  scope, 
  onSaveScope, 
  formatPrice, 
  onSelectPackage 
}) {
  const [showPlanner, setShowPlanner] = useState(false);
  const configuratorRef = useRef(null);

  const handleSelectPackage = (pkg) => {
    onSelectPackage(pkg.id, billingModel);
    setShowPlanner(true);
    
    // Smooth scroll down to the configurator
    setTimeout(() => {
      if (configuratorRef.current) {
        configuratorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      {/* Founding-Client Callout Banner */}
      <div className="container" style={{ marginBottom: '32px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(79, 70, 229, 0.04) 100%)',
          border: '1px solid rgba(124, 58, 237, 0.25)',
          borderRadius: '12px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            backgroundColor: 'var(--primary)'
          }}></div>
          <span style={{ fontSize: '1.2rem' }}>🚀</span>
          <span style={{ 
            color: 'white', 
            fontWeight: '600', 
            fontSize: '0.95rem',
            letterSpacing: '0.02em',
            textAlign: 'center'
          }}>
            Founding-client pricing — rates locked in for your future projects.
          </span>
        </div>
      </div>

      {/* Services grid */}
      <Services 
        onSelectPackage={handleSelectPackage}
        billingModel={billingModel}
        onBillingModelChange={onBillingModelChange}
        currency={currency}
        formatPrice={formatPrice}
      />

      {/* Interactive Scope Configurator Section - mounts after click */}
      {showPlanner && (
        <div ref={configuratorRef} id="configurator-wrapper" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '40px' }}>
          <Configurator 
            initialScope={scope}
            onSaveScope={onSaveScope}
            billingModel={billingModel}
            currency={currency}
            formatPrice={formatPrice}
          />
        </div>
      )}
    </div>
  );
}
