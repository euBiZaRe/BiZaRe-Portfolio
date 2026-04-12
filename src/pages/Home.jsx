import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';

import InProgressProjects from '../components/InProgressProjects';

const Home = () => {
  return (
    <main>
      <Hero />
      <Projects />
      <InProgressProjects />
      <About />
      <Contact />
    </main>
  );
};

export default Home;
