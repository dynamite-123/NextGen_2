import {motion} from "framer-motion";
import { useNavigate } from "react-router";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className={`min-h-screen bg-gradient-to-r from-black to-blue-900 text-gray-100 flex flex-col justify-between overflow-auto`}>
      {/* Navbar */}
      <nav className="p-4 bg-blue-800 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">SmartStock</h1>
        <ul className="flex items-center space-x-6">
          <li><a href="#features" className="hover:text-blue-300">Features</a></li>
          <li><button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">Sign Up </button></li>
        </ul>
      </nav>
      
      <main className="flex-grow flex flex-col justify-center items-center space-y-12 text-center px-8 py-12">
        {/* Hero and Picture Section */}
        <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left space-y-8 md:space-y-0 md:space-x-16 max-w-6xl">
          <motion.div className="max-w-lg"
          initial={{ opacity: 0, x: 50 }} // Starts invisible and slightly to the right
          animate={{ opacity: 1, x: 0 }} // Moves to its position smoothly
          transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
          >
            <h2 className="text-5xl font-bold text-white">Smart Stock Analysis & Recommendations</h2>
            <p className="mt-6 text-lg text-gray-300">Make informed investment decisions with real-time market data, advanced analytics, and smart recommendations.</p>
            <div className="mt-6 flex justify-center gap-4">
              <button onClick = {() => navigate('/dashboard')}className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700">Get Started</button>
              <button className="px-6 py-3 bg-gray-800 text-white rounded-full font-semibold shadow-md hover:bg-gray-700">Learn More</button>
            </div>
          </motion.div>
          <motion.div className="max-w-lg" 
          initial={{ opacity: 0, x: 50 }} // Starts invisible and slightly to the right
          animate={{ opacity: 1, x: 0 }} // Moves to its position smoothly
          transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
          >
            <img src="/landingShot.png" alt="Stock Analysis" className="rounded-lg shadow-md w-full" />
          </motion.div>
        </section>
        
        {/* Features Section (Large Single Component) */}
        <motion.section
      id="features"
      className="max-w-6xl p-12 bg-blue-950 shadow-lg rounded-lg text-center"
      initial={{ opacity: 0, y: 50 }} // Start hidden and move up
      animate={{ opacity: 1, y: 0 }} // Fade in and slide up
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
    >
      <h3 className="text-4xl font-bold mb-8">Why Choose Smart Stock</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="p-8 bg-blue-900 shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4 className="text-2xl font-semibold">Real-Time Analytics</h4>
          <p className="mt-2 text-gray-300">
            Get instant access to market trends and real-time stock data analysis.
          </p>
        </motion.div>
        <motion.div
          className="p-8 bg-blue-900 shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h4 className="text-2xl font-semibold">Smart Search</h4>
          <p className="mt-2 text-gray-300">
            Find stocks easily with our intelligent search and filtering system.
          </p>
        </motion.div>
        <motion.div
          className="p-8 bg-blue-900 shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className="text-2xl font-semibold">Custom Alerts</h4>
          <p className="mt-2 text-gray-300">
            Stay updated with personalized notifications on your watched stocks.
          </p>
        </motion.div>
      </div>
    </motion.section>

        {/* Stats Section */}
        <motion.section className="container mx-auto px-4 py-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
        
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold text-blue-500 mb-2">10K+</h4>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-blue-500 mb-2">5000+</h4>
              <p className="text-gray-400">Stocks Tracked</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-blue-500 mb-2">98%</h4>
              <p className="text-gray-400">Accuracy Rate</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-blue-500 mb-2">24/7</h4>
              <p className="text-gray-400">Market Monitoring</p>
            </div>
          </div>
        </motion.section>
      </main>
      
      {/* Footer */}
      <footer className="text-center py-4 bg-black text-gray-300">
        <p>&copy; 2025 Smart Stock. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
