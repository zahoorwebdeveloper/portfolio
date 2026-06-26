import React from 'react';
import About from '../components/About';
import VantaBackground from '../components/VantaBackground';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Projects from '../components/Projects';
import Skills from '../components/Skills';

function Dashboard() {
  return (
    // Use 'relative' and 'min-h-screen'. Do NOT put bg-primary here.
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-secondary/20 selection:text-secondary">
      
      {/* 1. The Background (Fixed, sits at -z-10) */}
      <VantaBackground />
      {/* 2. The Content (Sits on top) */}
      <div className="relative z-10">
        <Navbar />
        <main className="container mx-auto px-6 md:px-12 lg:px-24">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
      
    </div>
  );
}

export default Dashboard;