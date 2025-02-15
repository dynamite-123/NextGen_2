import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from "../context/AppContext";

const LoginPopup = ({ isOpen, onClose, onAuthSuccess, defaultIsRegister = false }) => {
  const [isRegister, setIsRegister] = useState(defaultIsRegister);
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    username: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    password: '',
    general: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const clearErrors = () => {
    setErrors({
      username: '',
      phone_number: '',
      first_name: '',
      last_name: '',
      password: '',
      general: ''
    });
    setSubmitStatus({ type: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: '',
      general: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isRegister) {
      if (!formData.phone_number) {
        newErrors.phone_number = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone_number)) {
        newErrors.phone_number = 'Invalid phone number format';
      }

      if (!formData.first_name.trim()) {
        newErrors.first_name = 'First name is required';
      }

      if (!formData.last_name.trim()) {
        newErrors.last_name = 'Last name is required';
      }
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    
    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fix the errors in the form'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const endpoint = isRegister 
        ? 'http://127.0.0.1:8000/api/user/register/' 
        : 'http://127.0.0.1:8000/api/user/login/';
        
      const response = await axios.post(endpoint, formData);
      const data = response.data;
      
      if (data.token) {
        // First update the context
        console.log("Login Successful, setting success message...");
        const url = "http://127.0.0.1:8000/api/user/1/";
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
        
        setSubmitStatus({
          type: 'success',
          message: isRegister ? 'Registration successful!' : 'Login successful!'
        });
        
        // Short delay to show success message
        setTimeout(() => {
          if (onAuthSuccess) {
            onAuthSuccess(data);
          }
          //onClose();
        }, 1000);
      
    } catch (error) {
      console.error('Auth error:', error);
      
      if (error.response) {
        const { data, status } = error.response;
        
        if (status === 400) {
          if (typeof data === 'object') {
            Object.keys(data).forEach(key => {
              setErrors(prev => ({
                ...prev,
                [key]: Array.isArray(data[key]) ? data[key][0] : data[key]
              }));
            });
          }
        } else if (status === 401) {
          setErrors(prev => ({
            ...prev,
            general: 'Invalid credentials'
          }));
        } else if (status === 409) {
          setErrors(prev => ({
            ...prev,
            username: 'Username already exists'
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            general: 'An unexpected error occurred. Please try again.'
          }));
        }
      } else if (error.request) {
        setErrors(prev => ({
          ...prev,
          general: 'Network error. Please check your connection.'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'An error occurred. Please try again.'
        }));
      }
      
      setSubmitStatus({
        type: 'error',
        message: 'Failed to authenticate'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (name, type, placeholder, required = true) => (
    <div className="space-y-1">
      <input 
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full px-4 py-2 rounded bg-gray-700 text-white border transition-colors
          ${errors[name] ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-blue-500'}`}
        required={required}
      />
      {errors[name] && (
        <p className="text-red-400 text-sm flex items-center gap-1">
          <AlertCircle size={14} />
          {errors[name]}
        </p>
      )}
    </div>
  );

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

        {(errors.general || submitStatus.message) && (
          <div className={`mb-4 p-3 rounded flex items-center gap-2 ${
            submitStatus.type === 'success' 
              ? 'bg-green-500/20 border border-green-500 text-green-300'
              : 'bg-red-500/20 border border-red-500 text-red-300'
          }`}>
            <AlertCircle size={16} />
            <span className="text-sm">{errors.general || submitStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderInput('username', 'text', 'Username')}
          
          {isRegister && (
            <>
              {renderInput('phone_number', 'tel', 'Phone Number')}
              {renderInput('first_name', 'text', 'First Name')}
              {renderInput('last_name', 'text', 'Last Name')}
            </>
          )}
          
          {renderInput('password', 'password', 'Password')}

          <button 
            type="submit" 
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition 
              ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
            onClick={() => {
              setIsRegister(!isRegister);
              clearErrors();
              setFormData({
                username: '',
                phone_number: '',
                first_name: '',
                last_name: '',
                password: ''
              });
            }} 
            className="text-blue-500 hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPopup;