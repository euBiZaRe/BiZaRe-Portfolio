import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import { projects } from '../data/projects';

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
      <div className="project-image-container">
        <img src={project.image} alt={project.title} className="project-image" />
        <div className="project-overlay">
          <div className="project-links">
            <a href={project.link} className="icon-link"><ExternalLink size={20} /></a>
            <a href={project.repo} className="icon-link"><Code size={20} /></a>
          </div>
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
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="filter-container"
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
