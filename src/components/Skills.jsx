import { motion } from 'framer-motion';

const skills = [
  { name: 'React.js / Next.js', category: 'Frontend' },
  { name: 'Node.js / Express', category: 'Backend' },
  { name: 'PostgreSQL / MongoDB', category: 'Database' },
  { name: 'Tailwind CSS', category: 'Design' },
  { name: 'Docker / Redis', category: 'DevOps' },
  { name: 'Socket.IO', category: 'Real-time' },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <h3 className="text-3xl font-bold text-white mb-10 flex items-center">
        <span className="text-secondary font-mono mr-2 text-xl">02.</span> Technical Skills
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, borderColor: '#64ffda' }}
            className="p-6 border border-white/10 bg-white/5 rounded-lg text-center backdrop-blur-sm transition-all"
          >
            <p className="text-white font-semibold">{skill.name}</p>
            <span className="text-xs text-secondary/70 uppercase tracking-widest">{skill.category}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default Skills;