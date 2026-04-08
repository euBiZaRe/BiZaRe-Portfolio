import React from 'react';
import { Code, MessageSquare, Share2, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, href) => {
    e.preventDefault();
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
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-text">BiZaRe</span>
            <p>Creating digital experiences that matter.</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
              <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Social</h4>
            <div className="social-icons">
              <a href="#" className="social-link"><Code size={20} /></a>
              <a href="#" className="social-link"><MessageSquare size={20} /></a>
              <a href="#" className="social-link"><Share2 size={20} /></a>
              <a href="#" className="social-link"><Mail size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BiZaRe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
