import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  // Animation variants for staggered entrance
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section 
      id="home" 
      className="relative z-10 min-h-screen flex flex-col justify-center items-start pt-20"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          variants={item}
          className="text-secondary font-mono mb-5 text-lg"
        >
          Hi, my name is
        </motion.p>

        <motion.h1 
          variants={item}
          className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
        >
          Zahoor Ahmad.
        </motion.h1>

        <motion.h2 
          variants={item}
          className="text-4xl md:text-6xl font-bold text-darkSlate mb-8 leading-tight"
        >
          I build{' '}
          <span className="text-secondary">
            <Typewriter
              words={['Scalable Web Apps', 'Robust Backends', 'Modern UI/UX', 'Cloud Solutions']}
              loop={0}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </motion.h2>

        <motion.p 
          variants={item}
          className="max-w-xl text-lg md:text-xl text-darkSlate mb-12 leading-relaxed"
        >
          I’m a <span className="text-white">Full Stack Web Developer</span> with 5 years of experience. 
          Currently, I specialize in building high-performance applications with the MERN stack and Next.js as a freelancer.
        </motion.p>

        <motion.div variants={item}>
          <a
            href="#projects"
            className="border-2 border-secondary text-secondary px-8 py-4 rounded-sm font-mono hover:bg-secondary/10 transition-all duration-300 inline-block"
          >
            Check out my work!
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;