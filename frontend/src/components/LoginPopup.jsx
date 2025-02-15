import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    experience: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual API endpoint
      const endpoint = isSignIn ? '/api/register' : '/api/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        onClose();
        // Handle successful auth
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50
">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 relative"
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isSignIn ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignIn && (
            <>
              <input 
                type="text" 
                name="fullName" 
                placeholder="Full Name" 
                value={formData.fullName} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white" 
                required={!isSignIn} 
              />
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                value={formData.phone} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white" 
                required 
              />
              <select 
                name="experience" 
                value={formData.experience} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white" 
                required
              >
                <option value="">Investment Experience</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </>
          )}
          
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white" 
            required 
          />

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {isSignIn ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          {isSignIn ? "Already have an account?" : "Don't have an account?"}{" "}
          <button 
            onClick={() => setIsSignIn(!isSignIn)} 
            className="text-blue-500 hover:underline"
          >
            {isSignIn ? "Login" : "Register"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthModal;