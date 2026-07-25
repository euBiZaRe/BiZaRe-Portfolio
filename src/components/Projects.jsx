import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Check } from 'lucide-react';
import { projects } from '../data/projects';

import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="project-card glass"
    >
      <Link to={`/project/${project.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
        <div className="project-image-container">
          <img src={project.image} alt={project.title} className="project-image" />
          <div className="project-overlay">
            <span className="btn btn-primary" style={{ pointerEvents: 'none' }}>View Details</span>
          </div>
        </div>
        <div className="project-info">
          <span className="project-type">{project.type}</span>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          <div className="project-tags">
            {project.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const FeaturedProjectShowcase = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card" 
      style={{
        padding: '36px',
        marginBottom: '56px',
        background: 'rgba(24, 24, 27, 0.4)',
        borderColor: 'rgba(124, 58, 237, 0.25)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative gradient corner */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}></div>

      <div className="featured-showcase-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Left Side: Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%)',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'inline-block',
              marginBottom: '12px'
            }}>
              Featured Case Study
            </span>
            <h3 style={{ fontSize: '1.8rem', color: 'white', fontWeight: 800, lineHeight: 1.2 }}>
              GRiD UP Sim Racing
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '6px' }}>
              Community platform for a competitive sim racing team — <a href="https://gridup.online" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}>gridup.online</a>
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', fontWeight: 700 }}>
              What it does:
            </h4>
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', listStyle: 'none', padding: 0 }}>
              {[
                "Live event system with countdown timers and live-stream selection",
                "Dynamic results & league standings",
                "Real-time telemetry dashboard",
                "Public roster + member application system",
                "News & race reports section",
                "Authenticated member login",
                "Integrated shop",
                "Discord/YouTube community integration"
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <Check size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'rgba(124, 58, 237, 0.04)',
            border: '1px solid rgba(124, 58, 237, 0.15)',
            borderRadius: '12px',
            padding: '16px 20px'
          }}>
            <h4 style={{ fontSize: '0.8rem', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', fontWeight: 700 }}>
              What this proves I can build:
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Multi-page architecture, live/dynamic data, user authentication, e-commerce, and content management.
            </p>
          </div>
        </div>

        {/* Right Side: Placeholders Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: "Telemetry Dashboard Screenshot", desc: "Live telemetry streams mapping" },
            { label: "Events Page Screenshot", desc: "Countdown timers and dynamic overlays" },
            { label: "Roster Page Screenshot", desc: "Member application status grid" }
          ].map((ph, idx) => (
            <div 
              key={idx} 
              style={{
                border: '1px dashed rgba(255, 255, 255, 0.15)',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '8px',
                padding: '18px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '84px',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'white', letterSpacing: '0.02em' }}>
                [ {ph.label} Placeholder ]
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {ph.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Website', 'Application'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.type === filter);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header" style={{ marginBottom: '32px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
            style={{ marginBottom: 0 }}
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
        </div>

        {/* Featured Case Study Hero Showcase */}
        <FeaturedProjectShowcase />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }} className="filter-header">
          <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: 600 }}>Other Creations</h4>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="filter-container"
            style={{ margin: 0 }}
          >
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
