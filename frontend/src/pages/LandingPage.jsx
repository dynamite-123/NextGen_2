import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useState } from "react";
import LoginPopup from "../components/LoginPopup";
import { LineChart, TrendingUp, Shield, BookOpen } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleLearnMore = () => {
    document.getElementById('features').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleSignUp = () => {
    setIsRegisterMode(true);
    setShowLoginModal(true);
  };

  const handleAuthSuccess = (userData) => {
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-r from-black to-blue-900 text-gray-100 flex flex-col justify-between overflow-auto`}>
      {/* Navbar */}
      <nav className="p-4 bg-blue-800 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">SmartStock</h1>
        <ul className="flex items-center space-x-6">
          <li><a href="#features" className="hover:text-blue-300">Features</a></li>
          <li>
            <button 
              onClick={handleSignUp}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </li>
        </ul>
      </nav>
      
      <main className="flex-grow flex flex-col justify-center items-center space-y-12 text-center px-8 py-12">
        {/* Hero and Picture Section */}
        <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left space-y-8 md:space-y-0 md:space-x-16 max-w-6xl">
          <motion.div className="max-w-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-5xl font-bold text-white">Smart Stock Analysis & Recommendations</h2>
            <p className="mt-6 text-lg text-gray-300">Make informed investment decisions with real-time market data, advanced analytics, and smart recommendations.</p>
            <div className="mt-6 flex justify-center gap-4">
              <button 
                onClick={() => {
                  navigate('/dashboard');
                  setIsRegisterMode(false);
                  setShowLoginModal(true);

                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700"
              >
                Get Started
              </button>
              <button 
                onClick={handleLearnMore}
                className="px-6 py-3 bg-gray-800 text-white rounded-full font-semibold shadow-md hover:bg-gray-700"
              >
                Learn More
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <img
              src="/landingShot.png"
              alt="Stock Analysis Dashboard"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 w-full max-w-6xl">
          <h3 className="text-3xl font-bold mb-12">Why Choose SmartStock?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Real-time Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-blue-800 bg-opacity-50 p-6 rounded-lg"
            >
              <LineChart className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Real-time Analysis</h4>
              <p className="text-gray-300">Get instant insights with our real-time market analysis and tracking tools.</p>
            </motion.div>

            {/* Smart Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-blue-800 bg-opacity-50 p-6 rounded-lg"
            >
              <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Smart Recommendations</h4>
              <p className="text-gray-300">Receive personalized stock recommendations based on your preferences.</p>
            </motion.div>

            {/* Secure Platform */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-blue-800 bg-opacity-50 p-6 rounded-lg"
            >
              <Shield className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Secure Platform</h4>
              <p className="text-gray-300">Your data is protected with enterprise-grade security measures.</p>
            </motion.div>

            {/* Educational Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-blue-800 bg-opacity-50 p-6 rounded-lg"
            >
              <BookOpen className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Educational Resources</h4>
              <p className="text-gray-300">Learn and grow with our comprehensive educational materials.</p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full max-w-6xl py-16 bg-blue-800 bg-opacity-20 rounded-xl">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
  {[
    { value: "10K+", label: "Active Users" },
    { value: "95%", label: "Accuracy Rate", delay: 0.1 },
    { value: "2500+", label: "Stocks Tracked", delay: 0.1 },
    { value: "24/7", label: "Market Monitoring", delay: 0.2 }
  ].map(({ value, label, delay = 0 }) => (
    <motion.div 
      key={value} 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      transition={{ duration: 0.5, delay }} 
      className="text-center min-w-[120px]"
    >
      <h4 className="text-4xl font-bold text-blue-400">{value}</h4>
      <p className="text-gray-300 mt-2">{label}</p>
    </motion.div>
  ))}
</div>

        </section>
      </main>
      
      {/* Footer */}
      <footer className="text-center py-4 bg-black text-gray-300">
        <p>&copy; 2025 Smart Stock. All rights reserved.</p>
      </footer>

      {/* Login/Signup Modal */}
      <LoginPopup
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onAuthSuccess={handleAuthSuccess}
        defaultIsRegister={isRegisterMode}
      />
    </div>
  );
}

export default LandingPage;