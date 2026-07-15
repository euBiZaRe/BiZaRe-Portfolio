import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import InProgressProjects from '../components/InProgressProjects';
import Services from '../components/Services';
import Configurator from '../components/Configurator';

const Home = ({ 
  billingModel, 
  onBillingModelChange, 
  currency, 
  scope, 
  onSaveScope, 
  formatPrice, 
  onSelectPackage 
}) => {
  return (
    <main>
      <Hero />
      
      <Projects />
      
      <InProgressProjects />

      {/* Services Packages Pricing Section */}
      <Services 
        onSelectPackage={onSelectPackage}
        billingModel={billingModel}
        onBillingModelChange={onBillingModelChange}
        currency={currency}
        formatPrice={formatPrice}
      />

      {/* Interactive Scope Configurator Section */}
      <Configurator 
        initialScope={scope}
        onSaveScope={onSaveScope}
        billingModel={billingModel}
        currency={currency}
        formatPrice={formatPrice}
      />
      
      <About />
      
      <Contact />
    </main>
  );
};

export default Home;
