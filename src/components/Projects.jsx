import React, { useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';


const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-zahoor.vercel.app/api'

const fetchProjects = async () => {
    const { data } = await axios.get(`${API_URL}/projects`);
    return data;
};


const ProjectSkeleton = () => (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 animate-pulse">
        <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6 mb-6"></div>
        <div className="flex gap-2 mb-8">
            <div className="h-6 w-12 bg-slate-700 rounded-full"></div>
            <div className="h-6 w-12 bg-slate-700 rounded-full"></div>
        </div>
        <div className="h-10 bg-slate-700 rounded-xl w-full"></div>
    </div>
);

const Projects = () => {
    const { data: projects, isLoading, isError } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 10, 
    });
    
    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    }), []);

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
    };

    return (
        <section className="py-20 bg-[#0f172a] overflow-hidden" id="projects">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white"
                    >
                        My <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">Projects</span>
                    </motion.h2>
                </header>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => <ProjectSkeleton key={i} />)}
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-400 py-10 bg-red-400/10 rounded-xl border border-red-400/20">
                        ⚠️ Error loading projects. Please try refreshing.
                    </div>
                ) : (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence>
                            {projects?.map((project) => (
                                <motion.div 
                                    key={project.id}
                                    variants={cardVariants}
                                    whileHover={{ y: -8 }}
                                    className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all group flex flex-col h-full shadow-xl shadow-black/20"
                                >
                                    <div className="p-6 flex flex-col h-full">
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                            {project.tech_stack.map((tech) => (
                                                <span 
                                                    key={tech} 
                                                    className="bg-blue-500/5 text-blue-400 text-[10px] uppercase tracking-widest font-black px-2.5 py-1 rounded-md border border-blue-500/10"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-3">
                                            <motion.a 
                                                whileTap={{ scale: 0.95 }}
                                                href={project.live_link}
                                                target="_blank"
                                                rel="noopener noreferrer" // SECURITY: Critical for target="_blank"
                                                className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-blue-900/20"
                                            >
                                                Live Demo
                                            </motion.a>
                                            <motion.a 
                                                whileTap={{ scale: 0.95 }}
                                                href={project.github_link}
                                                target="_blank"
                                                rel="noopener noreferrer" // SECURITY: Critical
                                                aria-label="View Source on GitHub"
                                                className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl transition"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                            </motion.a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;