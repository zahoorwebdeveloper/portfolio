import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["About", "Skills", "Experience", "Projects", "Contact"];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/90 backdrop-blur-md py-4 shadow-xl"
          : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-secondary font-bold text-2xl tracking-tighter"
        >
          ZA.
        </motion.div>

        <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
          {navLinks.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-tertiary hover:text-secondary transition-colors cursor-pointer"
            >
              {item}
            </motion.a>
          ))}
          <motion.a
            href="/Resume.pdf" // Direct path to public folder
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer"
            download="Zahoor_Ahmad_Resume.pdf" // FORCES the download
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-secondary text-secondary px-5 py-2 rounded-sm hover:bg-secondary/10 transition-all font-mono text-xs"
          >
            Resume
          </motion.a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
