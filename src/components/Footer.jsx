import React from 'react';
import { Code, MessageSquare, Share2, Mail } from 'lucide-react';

const Footer = () => {
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
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
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
