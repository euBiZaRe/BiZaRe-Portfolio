import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Globe, Zap } from 'lucide-react';

const About = () => {
  const skills = [
    { icon: <Globe size={20} />, title: "Web Dev", desc: "React, Next.js, Vue" },
    { icon: <Cpu size={20} />, title: "Backend", desc: "Node.js, Python, SQL" },
    { icon: <Zap size={20} />, title: "Performance", desc: "Optimization, SEO" },
    { icon: <User size={20} />, title: "UI/UX", desc: "Figma, Canvas" },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-text"
          >
            <h2 className="section-title">About <span className="text-gradient">Me</span></h2>
            <p className="about-description">
              I am a passionate developer with a knack for creating elegant solutions 
              to complex problems. With over 5 years of experience in the industry, 
              I've worked on everything from simple landing pages to complex 
              enterprise-level applications.
            </p>
            <p className="about-description">
              My approach combines technical excellence with a deep understanding 
              of user needs, ensuring that every project I touch is not only 
              functional but also delightful to use.
            </p>
          </motion.div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="skill-card glass"
              >
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.title}</h3>
                <p>{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
