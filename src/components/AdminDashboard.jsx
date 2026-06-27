import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const AdminDashboard = () => {
    const queryClient = useQueryClient();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tech_stack: '', 
        live_link: '',
        github_link: ''
    });

    const token = localStorage.getItem('token');
    const API_URL = import.meta.env.VITE_API_URL; 
    const getAuthHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },});

    useEffect(() => { fetchProjects(); }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${API_URL}/projects`);
            setProjects(res.data);
        } catch (err) { console.error("Error fetching projects"); }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            tech_stack: formData.tech_stack.split(',').map(item => item.trim())
        };

        try {
            if (editId) {
                await axios.put(`${API_URL}/projects/${editId}`, payload, getAuthHeader());
                alert("Project Updated!");
            } else {
                await axios.post(`${API_URL}/projects`, payload, getAuthHeader());
                alert("Project Added!");
            }

            queryClient.invalidateQueries({ queryKey: ['projects'] });

            setFormData({ title: '', description: '', tech_stack: '', live_link: '', github_link: '' });
            setEditId(null);
            fetchProjects();
            alert("Success!");
        } catch (err) {
            alert("Error saving project. Check if your token is expired.");
        } finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete(`${API_URL}/projects/${id}`, getAuthHeader());
                queryClient.invalidateQueries({ queryKey: ['projects'] });
                fetchProjects();
            } catch (err) { alert("Delete failed"); }
        }
    };

    const startEdit = (p) => {
        setEditId(p.id);
        setFormData({
            title: p.title,
            description: p.description,
            tech_stack: p.tech_stack.join(', '),
            live_link: p.live_link,
            github_link: p.github_link
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-4 md:p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        Portfolio Manager
                    </h1>
                    <button onClick={handleLogout} className="bg-red-500/10 text-red-500 border border-red-500/50 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition">
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* FORM SECTION */}
                    <div className="lg:col-span-1">
                        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 sticky top-10">
                            <h2 className="text-xl font-semibold mb-4">{editId ? "Edit Project" : "Add New Project"}</h2>
                            
                            <div className="space-y-4">
                                <input type="text" placeholder="Project Title" className="w-full bg-slate-900 border border-slate-600 p-3 rounded-lg" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                                <textarea placeholder="Description" className="w-full bg-slate-900 border border-slate-600 p-3 rounded-lg h-24" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
                                <input type="text" placeholder="Tech Stack (React, Node, etc.)" className="w-full bg-slate-900 border border-slate-600 p-3 rounded-lg" value={formData.tech_stack} onChange={e => setFormData({...formData, tech_stack: e.target.value})} required />
                                <input type="url" placeholder="Live Demo Link" className="w-full bg-slate-900 border border-slate-600 p-3 rounded-lg" value={formData.live_link} onChange={e => setFormData({...formData, live_link: e.target.value})} />
                                <input type="url" placeholder="GitHub Link" className="w-full bg-slate-900 border border-slate-600 p-3 rounded-lg" value={formData.github_link} onChange={e => setFormData({...formData, github_link: e.target.value})} />
                                
                                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition">
                                    {loading ? "Saving..." : editId ? "Update Project" : "Create Project"}
                                </button>
                                {editId && (
                                    <button type="button" onClick={() => {setEditId(null); setFormData({title:'', description:'', tech_stack:'', live_link:'', github_link:''})}} className="w-full text-slate-400 mt-2">Cancel</button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* LIST SECTION */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map(project => (
                                <div key={project.id} className="bg-slate-800 border border-slate-700 p-5 rounded-2xl hover:border-blue-500 transition">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech_stack.map(tech => (
                                            <span key={tech} className="bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded-md border border-blue-500/20">{tech}</span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 border-t border-slate-700 pt-4 mt-auto">
                                        <button onClick={() => startEdit(project)} className="text-emerald-400 hover:underline text-sm font-medium">Edit</button>
                                        <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:underline text-sm font-medium">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;