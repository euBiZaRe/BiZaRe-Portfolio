import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Hammer, Rocket } from 'lucide-react';
import { inProgressProjects } from '../data/projects';

const InProgressCard = ({ project }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="in-progress-card glass"
    >
      <div className="card-header">
        <div className="status-badge">
          <Clock size={14} className="animate-spin-slow" />
          <span>{project.status}</span>
        </div>
        <div className="progress-container">
          <div className="progress-bar-bg">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="progress-bar-fill"
            />
          </div>
          <span className="progress-text">{project.progress}%</span>
        </div>
      </div>
      
      <div className="card-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const InProgressProjects = () => {
  return (
    <section id="in-progress" className="in-progress">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Building the <span className="text-gradient">Future</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle-text"
          >
            A glimpse into projects currently under development and active refinement.
          </motion.p>
        </div>

        <div className="in-progress-grid">
          {inProgressProjects.map((project) => (
            <InProgressCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InProgressProjects;
