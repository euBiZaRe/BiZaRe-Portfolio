import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="#home" className="logo">
          <Rocket size={24} color="#7c3aed" />
          <span className="logo-text">BiZaRe</span>
        </a>

        <ul className="nav-links desktop">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn-primary">Hire Me</a>
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
              <a href={link.href} onClick={() => setIsOpen(false)}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
