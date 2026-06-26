import React from 'react';
import { motion } from 'framer-motion';
import zahoor from '../assets/janu.jpeg'

const About = () => {
  const technologies = [
    'JavaScript (ES6+)', 'React.js / Next.js', 'Node.js', 
    'PostgreSQL', 'Tailwind CSS', 'Docker'
  ];

  return (
    <section id="about" className="py-24 max-w-5xl mx-auto px-4">
      {/* Section Heading */}
      <div className="flex items-center mb-12">
        <h3 className="text-3xl font-bold text-white whitespace-nowrap">
          About Me
        </h3>
        <div className="h-[1px] bg-darkSlate/30 ml-6 w-full max-w-md"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-16 items-start">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-3 text-darkSlate text-lg leading-relaxed space-y-6"
        >
          <p>
            Hello! I'm <span className="text-secondary font-medium">Zahoor Ahmad</span>, a Full Stack Developer with 5 years of experience. I enjoy creating robust, scalable applications that solve real-world problems.
          </p>
          
          <p>
            My journey has led me through 30+ production-grade projects as a <span className="text-white">Freelancer</span>. I focus on the MERN stack, ensuring high performance and security in every line of code.
          </p>

          <p>Technologies I work with:</p>
          
          <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
            {technologies.map((tech) => (
              <li key={tech} className="flex items-center space-x-2">
                <span className="text-secondary">▹</span>
                <span className="text-tertiary">{tech}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Improved Image Frame */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 relative flex justify-center"
        >
          {/* Container for both Image and Border */}
          <div className="relative w-64 h-64 md:w-72 md:h-72 group">
            
            {/* 1. Decorative Border (Bottom Layer) */}
            <div className="absolute inset-0 border-2 border-secondary rounded-lg translate-x-5 translate-y-5 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300 ease-out"></div>
            
            {/* 2. Image Wrapper (Top Layer) */}
            <div className="relative w-full h-full bg-secondary/30 rounded-lg overflow-hidden group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] transition-transform duration-300 ease-out">
              <img
                src={zahoor}
                alt="Zahoor Ahmad"
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
              />
              {/* Green Overlay Tint */}
              <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;