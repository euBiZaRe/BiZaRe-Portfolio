import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
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
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
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
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
          <Rocket size={24} color="#7c3aed" />
          <span className="logo-text">BiZaRe</span>
        </Link>

        <ul className="nav-links desktop">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.name}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn-primary" onClick={(e) => handleNavClick(e, '#contact')}>Hire Me</a>
          </li>
        </ul>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
