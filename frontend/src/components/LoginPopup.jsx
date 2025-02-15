import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import axios from 'axios';
import{useAuth} from "../context/AppContext";
const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const {login} =useAuth();
  const [formData, setFormData] = useState({
    username: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Correct the endpoint logic - isRegister true means we use register endpoint
      const endpoint = isRegister ? 'http://127.0.0.1:8000/api/user/register/' : 'http://127.0.0.1:8000/api/user/login/';
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data?.message || "Authentication failed");
      }
      
      
      const data =  response.data;
      
      // Store token in localStorage
      if (data.token) {
        const url = "http://127.0.0.1:8000/api/user/4/";
        const headers = {"Authorization": `Bearer ${data.token}`};
        axios.put(url, data, { headers })
        .then(data => console.log("Response:", data))
        .catch(error => console.error("Error:", error));
      }
      
      console.log(data);
      // Call the success callback if provided
      if (onAuthSuccess) {
        console.log("before  it goes to login function : ",data);
        login(data);
        onAuthSuccess(data);
      }
      
      // Close the modal
      onClose();
      
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || 'Failed to authenticate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
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
          {isRegister ? "Register" : "Login"}
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="username" 
            placeholder="User Name" 
            value={formData.username} 
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white" 
            required 
          />
          {isRegister && (
            <>
              <input 
                type="tel" 
                name="phone_number" 
                placeholder="Phone Number" 
                value={formData.phone_number} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white" 
                required 
              />
              <input 
                type="text"
                name="first_name" 
                placeholder='enter first name'
                value={formData.first_name} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white" 
                required
              />
              <input 
                type="text"
                name="last_name" 
                placeholder='enter last name'
                value={formData.last_name} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white" 
                required
              />
            </>
          )}
          
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
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 
              (isRegister ? "Registering..." : "Logging in...") : 
              (isRegister ? "Register" : "Login")
            }
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button 
            onClick={() => setIsRegister(!isRegister)} 
            className="text-blue-500 hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthModal;