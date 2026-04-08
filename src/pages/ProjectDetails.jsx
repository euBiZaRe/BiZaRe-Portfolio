import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="container" style={{ padding: '150px 0', textAlign: 'center' }}>
        <h2>Project not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Return Home</Link>
      </div>
    );
  }

  return (
    <div className="project-details-page">
      <div className="container">
        <div style={{ padding: '120px 0 40px' }}>
          <Link to="/" className="back-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '30px', width: 'fit-content', transition: 'color 0.3s' }}>
            <ArrowLeft size={20} /> Back to Portfolio
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="project-details-header"
            style={{ marginBottom: '40px' }}
          >
            <div className="project-details-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
              <div className="project-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <span className="project-type" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{project.type}</span>
                <span style={{ color: 'var(--text-secondary)' }}>|</span>
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            
            <h1 className="project-details-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>
              <span className="text-gradient">{project.title}</span>
            </h1>
            <p className="project-details-desc" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '30px', maxWidth: '800px' }}>
              {project.longDescription}
            </p>
            
            <div className="project-details-actions" style={{ display: 'flex', gap: '15px' }}>
              {project.link !== '#' && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ExternalLink size={20} /> View Project / Get It Here
                </a>
              )}
              {project.repo !== '#' && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Code size={20} /> View Source Code
                </a>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="project-details-media"
          style={{ width: '100%', marginBottom: '80px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
        >
          <img src={project.image} alt={project.title} className="details-hero-image" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="project-details-features"
          style={{ paddingBottom: '100px' }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>Key <span className="text-gradient">Features</span></h2>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {project.features && project.features.map((feature, index) => (
              <div key={index} className="feature-card glass" style={{ padding: '25px', display: 'flex', alignItems: 'flex-start', gap: '15px', borderRadius: '15px' }}>
                <CheckCircle2 className="feature-icon" size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <p style={{ margin: 0, lineHeight: '1.6' }}>{feature}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
