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
