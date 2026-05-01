import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Admin from './pages/Admin';
import AIChat from './pages/AIChat';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isChatPage = location.pathname === '/ai-demo';

  return (
    <div className="App">
      {!isChatPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ai-demo" element={<AIChat />} />
      </Routes>
      {!isChatPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
