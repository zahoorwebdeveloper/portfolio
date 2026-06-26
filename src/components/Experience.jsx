import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  const jobs = [
    {
      company: "Freelance",
      role: "Full Stack Developer",
      duration: "2023 - Present",
      location: "Remote",
      points: [
        "Delivered 30+ production-grade applications for global clients using MERN and Next.js.",
        "Architected scalable backends with Node.js and Fastify, implementing RBAC and secure JWT authentication.",
        "Integrated complex payment gateways (Stripe, PayPal) and real-time features using Socket.IO.",
        "Managed end-to-end project lifecycles, from requirement gathering to AWS/Docker deployment."
      ]
    },
    {
      company: "Tech Solutions", // Placeholder - Replace with your actual previous company
      role: "Senior Web Developer",
      duration: "2021 - 2023",
      location: "Lahore, PK",
      points: [
        "Led a team of 4 developers to build a high-traffic SaaS dashboard.",
        "Optimized database queries in PostgreSQL, reducing API response times by 40%.",
        "Implemented microservices architecture to handle 10k+ concurrent users.",
        "Mentored junior developers on best practices for React and Clean Code."
      ]
    },
    {
      company: "Digital Agency", // Placeholder - Replace with your actual previous company
      role: "Junior Web Developer",
      duration: "2019 - 2021",
      location: "Faisalabad, PK",
      points: [
        "Developed responsive frontends using React.js and Tailwind CSS.",
        "Integrated RESTful APIs and managed state using Redux Toolkit.",
        "Collaborated with UI/UX designers to translate Figma designs into pixel-perfect code.",
        "Maintained and updated legacy PHP/Node.js codebases for various clients."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 max-w-4xl mx-auto">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center mb-10"
      >
        <h3 className="text-3xl font-bold text-white flex items-center">
          <span className="text-secondary font-mono mr-2 text-xl">03.</span> 
          Where I’ve Worked
        </h3>
        <div className="h-[1px] bg-darkSlate ml-4 w-64 opacity-30"></div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Tab Buttons */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l border-darkSlate/30">
          {jobs.map((job, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-3 text-left font-mono text-sm transition-all duration-300 whitespace-nowrap border-b-2 md:border-b-0 md:border-l-2 ${
                activeTab === index 
                ? 'text-secondary border-secondary bg-secondary/5' 
                : 'text-darkSlate border-transparent hover:text-secondary hover:bg-secondary/5'
              }`}
            >
              {job.company}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-bold text-white">
                {jobs[activeTab].role}{' '}
                <span className="text-secondary">@ {jobs[activeTab].company}</span>
              </h4>
              <p className="font-mono text-sm text-darkSlate mt-1 mb-6">
                {jobs[activeTab].duration} | {jobs[activeTab].location}
              </p>

              <ul className="space-y-4">
                {jobs[activeTab].points.map((point, i) => (
                  <li key={i} className="flex items-start space-x-3 text-darkSlate leading-relaxed">
                    <span className="text-secondary mt-1.5 text-xs">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;