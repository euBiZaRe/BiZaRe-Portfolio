import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Admin from './pages/Admin';
import AIChat from './pages/AIChat';
import ScopeBoard from './components/ScopeBoard';
import OnboardingWizard from './components/OnboardingWizard';
import './App.css';

// Currency Conversion System
const CURRENCY_CONVERSION = {
  USD: { rate: 1.0, symbol: '$' },
  GBP: { rate: 0.78, symbol: '£' },
  EUR: { rate: 0.92, symbol: '€' },
  AUD: { rate: 1.50, symbol: 'A$' },
  CAD: { rate: 1.37, symbol: 'C$' }
};

const formatPrice = (usdAmount, currCode = 'USD') => {
  const config = CURRENCY_CONVERSION[currCode] || CURRENCY_CONVERSION.USD;
  const converted = usdAmount * config.rate;
  return `${config.symbol}${converted.toLocaleString()}`;
};

// Default scopes
const DEFAULT_PROJECT_SCOPE = {
  packageId: 'business-platform',
  packageName: 'Growth Web Platform',
  billingModel: 'project',
  pages: 5,
  timeline: 'standard',
  features: ['seo'],
  featuresText: ['Advanced SEO & Schema'],
  price: 950
};

const DEFAULT_SUBSCRIPTION_SCOPE = {
  packageId: 'dev-on-demand',
  packageName: 'Developer-on-Demand',
  billingModel: 'subscription',
  sla: 'standard',
  features: ['seo-retainer'],
  featuresText: ['SEO & Search Retainer'],
  price: 899
};

function AppContent() {
  const location = useLocation();
  const isChatPage = location.pathname === '/ai-demo';

  // Global States
  const [billingModel, setBillingModel] = useState('project'); 
  const [currency, setCurrency] = useState('USD'); 
  const [scope, setScope] = useState(DEFAULT_PROJECT_SCOPE);
  const [isScopeBoardOpen, setIsScopeBoardOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Toast notifications
  const [toastText, setToastText] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const triggerToast = (text) => {
    setToastText(text);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 4000);
  };

  const handleBillingModelChange = (model) => {
    setBillingModel(model);
    if (model === 'project') {
      setScope(DEFAULT_PROJECT_SCOPE);
      triggerToast('Switched to Fixed Project Packages pricing.');
    } else {
      setScope(DEFAULT_SUBSCRIPTION_SCOPE);
      triggerToast('Switched to Monthly Subscriptions pricing.');
    }
  };

  const handleSelectPackage = (pkgId, model) => {
    setScope(prev => ({
      ...prev,
      packageId: pkgId,
      billingModel: model
    }));
    triggerToast(`Selected package tier inside planner.`);
    
    // Scroll to configurator
    const configuratorEl = document.getElementById('configurator');
    if (configuratorEl) {
      configuratorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {!isChatPage && (
        <Navbar 
          cartCount={scope.packageId ? 1 : 0} 
          onCartOpen={() => setIsScopeBoardOpen(true)}
          currency={currency}
          onCurrencyChange={(curr) => {
            setCurrency(curr);
            triggerToast(`Currency switched to ${curr}`);
          }}
        />
      )}
      
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              billingModel={billingModel}
              onBillingModelChange={handleBillingModelChange}
              currency={currency}
              scope={scope}
              onSaveScope={(newScope) => {
                setScope(newScope);
                triggerToast('Project scope configuration updated.');
              }}
              formatPrice={formatPrice}
              onSelectPackage={handleSelectPackage}
            />
          } 
        />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ai-demo" element={<AIChat />} />
      </Routes>
      
      {!isChatPage && <Footer />}

      {/* Scope Board Panel Drawer */}
      <ScopeBoard
        isOpen={isScopeBoardOpen}
        onClose={() => setIsScopeBoardOpen(false)}
        scope={scope}
        currency={currency}
        formatPrice={formatPrice}
        onCheckout={() => {
          setIsScopeBoardOpen(false);
          setIsOnboardingOpen(true);
        }}
        onReset={() => {
          setScope(billingModel === 'project' ? DEFAULT_PROJECT_SCOPE : DEFAULT_SUBSCRIPTION_SCOPE);
          setIsScopeBoardOpen(false);
          triggerToast('Scope reset to default tier configuration.');
        }}
      />

      {/* Onboarding Wizard Portal */}
      <OnboardingWizard
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        scope={scope}
        currency={currency}
        formatPrice={formatPrice}
        onSubmitSuccess={(clientData) => {
          setIsOnboardingOpen(false);
          triggerToast(`Thank you ${clientData.name}! Your request has been queued.`);
        }}
      />

      {/* Dynamic Toast Alerts */}
      <div className={`toast ${toastVisible ? 'show' : ''}`} style={{ borderLeftColor: 'var(--primary)' }}>
        <div style={{ fontWeight: '600', color: 'white', fontSize: '0.9rem' }}>{toastText}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
