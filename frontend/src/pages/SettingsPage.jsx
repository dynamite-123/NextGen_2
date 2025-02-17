import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SettingsPage = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [notification, setNotification] = useState({ type: '', message: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Debug log to check user data
  useEffect(() => {
    console.log("Current user data:", user.user);
  }, [user.user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Get user data from localStorage if not available in context
    const userData = user.user || JSON.parse(localStorage.getItem('userData'));
    
    if (userData) {
      setFormData(prevData => ({
        ...prevData,
        username: userData.username || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        phone_number: userData.phone_number || '',
        email: userData.email || ''
      }));
    }
  }, [user, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.new_password && formData.new_password !== formData.confirm_password) {
      setNotification({ type: 'error', message: 'New passwords do not match!' });
      return;
    }

    try {
      // Get user ID from localStorage if not available in context
      const userData = user.user || JSON.parse(localStorage.getItem('userData'));
      const userId = userData?.id || '4'; // Fallback to '4' if no ID found

      const response = await axios.post(
        `http://127.0.0.1:8000/api/change-password/`,
        {
          old_password : formData.current_password,
          new_password : formData.new_password
        },
        {
          headers: {
            'Authorization': `Bearer ${user.access}`
          }
        }
      );

      if (response.status === 200) {
        login(response.data); // Update user context with new data
        setNotification({ type: 'success', message: 'Profile updated successfully!' });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Update error:', error);
      setNotification({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to update profile'
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const userData = user.user || JSON.parse(localStorage.getItem('userData'));
        console.log("to be deleted user : ",user);
        const userId = userData.id && '4';
        const userToken = user.access;
        await axios.delete(
          `http://127.0.0.1:8000/api/user/${userId}/`,
          {
            headers: {
              'Authorization': `Bearer ${userToken}`
            }
          }
        );
        logout();
        navigate('/');
      } catch (error) {
        setNotification({ 
          type: 'error', 
          message: 'Failed to delete account'
        });
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

        {notification.message && (
          <div className={`mb-4 p-4 rounded ${
            notification.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
          }`}>
            {notification.message}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                />
              </div>

              {isEditing && (
  <>
    <div>
      <label className="block text-gray-300 mb-2">Old Password</label>
      <input
        type="password"
        name="current_password"
        value={formData.current_password}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-gray-300 mb-2">New Password</label>
      <input
        type="password"
        name="new_password"
        value={formData.new_password}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-gray-300 mb-2">Confirm New Password</label>
      <input
        type="password"
        name="confirm_password"
        value={formData.confirm_password}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
      />
    </div>
  </>
)}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;