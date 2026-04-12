import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Plus, Trash2, Edit2, Save, X, ExternalLink, Code as CodeIcon, LogOut } from 'lucide-react';
import { inProgressProjects as initialProjects } from '../data/projects';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState(initialProjects);
  const [editingId, setEditingId] = useState(null);
  const [showCode, setShowCode] = useState(false);

  // New Project State
  const [newProject, setNewProject] = useState({
    title: '',
    status: '',
    progress: 0,
    description: '',
    tags: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '2rck5i3e') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const id = `ip${Date.now()}`;
    const projectToAdd = {
      ...newProject,
      id,
      progress: parseInt(newProject.progress),
      tags: newProject.tags.split(',').map(tag => tag.trim())
    };
    setProjects([...projects, projectToAdd]);
    setNewProject({ title: '', status: '', progress: 0, description: '', tags: '' });
  };

  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleUpdateProgress = (id, newProgress) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, progress: parseInt(newProgress) } : p
    ));
  };

  const generateCode = () => {
    const code = `export const inProgressProjects = ${JSON.stringify(projects, null, 2)};`;
    return code;
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="admin-login-card glass"
        >
          <div className="login-header">
            <Lock className="text-gradient" size={40} />
            <h2>Admin Login</h2>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Enter Admin Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="btn btn-primary form-submit">Login</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="section-title">Admin <span className="text-gradient">Dashboard</span></h1>
          <button onClick={() => setIsLoggedIn(false)} className="btn-secondary logout-btn">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="admin-grid">
          {/* Add New Project */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="admin-card glass"
          >
            <h3>Add New Project</h3>
            <form onSubmit={handleAddProject} className="admin-form">
              <input 
                type="text" 
                placeholder="Project Title" 
                value={newProject.title} 
                onChange={e => setNewProject({...newProject, title: e.target.value})}
                required
              />
              <input 
                type="text" 
                placeholder="Status (e.g. Designing UI)" 
                value={newProject.status} 
                onChange={e => setNewProject({...newProject, status: e.target.value})}
                required
              />
              <div className="range-group">
                <label>Progress: {newProject.progress}%</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={newProject.progress} 
                  onChange={e => setNewProject({...newProject, progress: e.target.value})}
                />
              </div>
              <textarea 
                placeholder="Description" 
                value={newProject.description} 
                onChange={e => setNewProject({...newProject, description: e.target.value})}
                required
              />
              <input 
                type="text" 
                placeholder="Tags (comma separated)" 
                value={newProject.tags} 
                onChange={e => setNewProject({...newProject, tags: e.target.value})}
                required
              />
              <button type="submit" className="btn btn-primary add-btn">
                <Plus size={18} /> Add Project
              </button>
            </form>
          </motion.div>

          {/* Manage Current Projects */}
          <div className="manage-projects">
            <div className="manage-header">
              <h3>Manage In-Progress Projects</h3>
              <button 
                className="btn-secondary sync-btn"
                onClick={() => setShowCode(!showCode)}
              >
                <CodeIcon size={16} /> {showCode ? 'Close Source' : 'Generate Source'}
              </button>
            </div>

            {showCode && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="code-preview glass"
              >
                <div className="code-header">
                  <span>projects.js code snippet</span>
                  <button onClick={() => navigator.clipboard.writeText(generateCode())} className="copy-btn">Copy</button>
                </div>
                <pre>{generateCode()}</pre>
                <p className="code-tip">Copy this and paste it at the end of your projects.js data file.</p>
              </motion.div>
            )}

            <div className="projects-list-admin">
              {projects.map(project => (
                <motion.div 
                  layout
                  key={project.id} 
                  className="admin-project-item glass"
                >
                  <div className="item-content">
                    <h4>{project.title}</h4>
                    <p className="item-status">{project.status} • {project.progress}%</p>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={project.progress} 
                      onChange={(e) => handleUpdateProgress(project.id, e.target.value)}
                    />
                  </div>
                  <div className="item-actions">
                    <button 
                      onClick={() => handleDelete(project.id)} 
                      className="delete-btn"
                      title="Delete Project"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
