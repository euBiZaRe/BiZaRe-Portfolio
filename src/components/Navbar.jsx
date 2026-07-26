import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Briefcase } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Navbar = ({ cartCount, onCartOpen, currency, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', isRoute: false },
    { name: 'Projects', href: '#projects', isRoute: false },
    { name: 'Services', href: '/services', isRoute: true },
    { name: 'About', href: '#about', isRoute: false },
    { name: 'Contact', href: '#contact', isRoute: false },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo(0, 0);
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo(0, 0);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Rocket size={24} color="#7c3aed" />
          <span className="logo-text">BiZaRe</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links desktop">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.isRoute ? (
                <Link 
                  to={link.href} 
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: location.pathname === link.href ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: 500
                  }}
                >
                  {link.name}
                </Link>
              ) : (
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.name}</a>
              )}
            </li>
          ))}
        </ul>

        {/* Actions (Currency & Cart Briefcase) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="nav-actions">
          {/* Currency Dropdown Selector */}
          <select 
            value={currency} 
            onChange={(e) => onCurrencyChange(e.target.value)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              outline: 'none',
              height: '36px'
            }}
          >
            <option value="USD" style={{ background: '#09090b' }}>USD ($)</option>
            <option value="GBP" style={{ background: '#09090b' }}>GBP (£)</option>
            <option value="EUR" style={{ background: '#09090b' }}>EUR (€)</option>
            <option value="AUD" style={{ background: '#09090b' }}>AUD (A$)</option>
            <option value="CAD" style={{ background: '#09090b' }}>CAD (C$)</option>
          </select>

          {/* Scope Board Briefcase Trigger */}
          <button 
            onClick={onCartOpen}
            style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              transition: 'var(--transition-fast)'
            }}
            title="View Project Brief"
          >
            <Briefcase size={16} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} style={{ border: 'none', background: 'none', color: 'white' }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.isRoute ? (
                <Link 
                  to={link.href} 
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: location.pathname === link.href ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: 500,
                    fontSize: '1.1rem'
                  }}
                >
                  {link.name}
                </Link>
              ) : (
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.name}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
