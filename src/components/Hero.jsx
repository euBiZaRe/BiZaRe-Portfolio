import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Layout, AppWindow } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Available for new projects
          </motion.span>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Crafting <span className="text-gradient">Premium</span> Digital <br /> 
            Experiences for the Modern Web
          </motion.h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            I'm a full-stack developer specialized in building high-performance 
            web applications and beautiful websites that convert.
          </motion.p>

          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a href="#projects" className="btn-primary">
              View My Work <ArrowRight size={18} />
            </a>
            <a href="#about" className="btn-secondary">
              About Me
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="visual-card glass purple-shadow">
             <div className="visual-icons">
                <Code className="icon" size={40} />
                <Layout className="icon" size={40} />
                <AppWindow className="icon" size={40} />
             </div>
             <div className="visual-stats">
                <div className="stat">
                  <span>50+</span>
                  <label>Projects Done</label>
                </div>
                <div className="stat">
                  <span>100%</span>
                  <label>Satisfaction</label>
                </div>
             </div>
          </div>
          <div className="hero-glow"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
