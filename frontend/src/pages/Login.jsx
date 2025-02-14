import { useState} from "react";
import { useAuth } from "../context/AppContext";
import { useNavigate,useLocation } from "react-router";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      await login({ email: formData.email });
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isSignIn ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignIn && (
            <>
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white" required = {!isSignIn} />
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white" required />
              <select name="experience" value={formData.experience} onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white" required>
                <option value="">Investment Experience</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </>
          )}
          
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white" required />

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            {isSignIn ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          {isSignIn ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignIn(!isSignIn)} className="text-blue-500 hover:underline">
            {isSignIn ? "Login" : "Register"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
