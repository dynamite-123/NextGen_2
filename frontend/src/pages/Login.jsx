import { useState } from "react";
import { useAuth } from "../context/AppContext";
import { useNavigate, useLocation } from "react-router";
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    phone_number: '',
    first_name: '',
    last_name: '',
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
    setError('');
    setIsLoading(true);
    
    try {
      const endpoint = isRegister ? 'http://127.0.0.1:8000/api/user/register/' : 'http://127.0.0.1:8000/api/user/login/';
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data?.message || "Authentication failed");
      }
      
      const data = response.data;
      
      if (data.token) {
        const url = "http://127.0.0.1:8000/api/user/4/";
        const headers = {"Authorization": `Bearer ${data.token}`};
        await axios.put(url, data, { headers });
      }
      
      login(data);
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
      
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || 'Failed to authenticate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isRegister ? "Create Account" : "Welcome Back"}
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
            placeholder="Username" 
            value={formData.username} 
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none" 
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
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none" 
                required 
              />
              <input 
                type="text"
                name="first_name" 
                placeholder="First Name"
                value={formData.first_name} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none" 
                required
              />
              <input 
                type="text"
                name="last_name" 
                placeholder="Last Name"
                value={formData.last_name} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none" 
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
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none" 
            required 
          />

          <button 
            type="submit" 
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 
              (isRegister ? "Creating Account..." : "Signing In...") : 
              (isRegister ? "Create Account" : "Sign In")
            }
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button 
            onClick={() => setIsRegister(!isRegister)} 
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            {isRegister ? "Sign In" : "Create Account"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;