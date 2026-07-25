import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Globe, Zap } from 'lucide-react';

const About = () => {
  const skills = [
    { icon: <Globe size={20} />, title: "Web Dev", desc: "HTML, CSS, JavaScript, React" },
    { icon: <Cpu size={20} />, title: "Software & AI", desc: "Python, C++, C#, Dart" },
    { icon: <Zap size={20} />, title: "Frameworks", desc: "Flutter, Node.js, Firebase, BepInEx" },
    { icon: <User size={20} />, title: "Other Skills", desc: "SQL, Git, Figma, Web Design" },
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
              I'm Matty — a developer who got my start building tools inside tight-knit online communities, from mods and utilities for the Among Us modding scene to full platforms for competitive teams.
            </p>
            <p className="about-description">
              My most recent build, GRiD UP Sim Racing, is a full community platform for a competitive sim racing team — live telemetry dashboards, real-time event countdowns, member accounts, and an integrated shop, all built from the ground up. It's the same kind of work I now offer to businesses: sites that don't just look good, but actually do things — track data, manage members, handle bookings, sell products.
            </p>
            <p className="about-description font-bold text-gradient mt-6" style={{ fontSize: '1.15rem', fontWeight: '700' }}>
              I'm currently taking on a limited number of new clients at founding-client rates while I grow my portfolio. If you work with me now, you lock in these prices for future projects even as my rates rise.
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
