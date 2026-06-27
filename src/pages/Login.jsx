import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const API_URL = import.meta.env.VITE_API_URL; 
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password
            });

            // Store the JWT Token strictly in localStorage
            localStorage.setItem('token', response.data.token);
            
            // Redirect to the Admin Dashboard
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
            {/* Decorative background blur */}
            <div className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -top-10 -left-10"></div>
            <div className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -bottom-10 -right-10"></div>

            <div className="bg-[#1e293b] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h1>
                    <p className="text-slate-400 mt-2">Sign in to manage your portfolio</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-[#0f172a] border border-slate-600 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-[#0f172a] border border-slate-600 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 
                        ${loading ? 'bg-slate-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:scale-95'}`}
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="text-slate-500 hover:text-slate-300 text-sm transition"
                    >
                        ← Back to Website
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;