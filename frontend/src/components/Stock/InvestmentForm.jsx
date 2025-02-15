import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../context/AppContext";

const InvestmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: "",
    time: "",
    marketType: "small",
    riskTolerance: "low",
    sector: "automobile",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setApiData(null);
      setFormData({
        amount: "",
        time: "",
        marketType: "small",
        riskTolerance: "low",
        sector: "automobile",
      });
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" && (value < 1 || value > 100000000)) return;
    if (name === "time" && (value < 1 || value > 15)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login', { 
        state: { from: location.pathname }
      });
      return;
    }

    setIsLoading(true);
    const requestData = {
      investment_amount: parseInt(formData.amount),
      investment_duration: parseInt(formData.time),
      market_cap: formData.marketType + " cap",
      sector: formData.sector,
      risk_tolerance: formData.riskTolerance,
    };

    try {
      const response = await fetch("http://localhost:8000/api/get-recommendations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0a192f] text-white p-4 md:p-8 rounded-3xl shadow-2xl w-full border border-gray-700">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-blue-400">Investment Details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-gray-300 text-lg font-semibold">Investment Amount (Max: 1 Cr)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition text-lg shadow-md"
            required
            min="1"
            max="100000000"
          />
          <label className="text-gray-300 text-lg font-semibold">Investment Time (Max: 15 Years)</label>
          <input
            type="number"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition text-lg shadow-md"
            required
            min="1"
            max="15"
          />
          <label className="text-gray-300 text-lg font-semibold">Market Type</label>
          <select
            name="marketType"
            value={formData.marketType}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition text-lg shadow-md"
          >
            <option value="small">Small</option>
            <option value="mid">Mid</option>
            <option value="large">Large</option>
          </select>
          <label className="text-gray-300 text-lg font-semibold">Risk Tolerance</label>
          <select
            name="riskTolerance"
            value={formData.riskTolerance}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition text-lg shadow-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <label className="text-gray-300 text-lg font-semibold">Sector</label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition text-lg shadow-md"
          >
            <option value="automobile">Automobile</option>
            <option value="it">IT</option>
            <option value="banking">Banking</option>
            <option value="finance">Finance</option>
            <option value="agriculture">Agriculture</option>
            <option value="psu">PSU</option>
            <option value="energy">Energy</option>
            <option value="fmcg">FMCG</option>
          </select>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed p-4 rounded-xl text-white font-bold transition shadow-lg text-lg mt-4 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
      
      {isAuthenticated && (
        <div className="mt-8 w-full max-w-6xl mx-auto border-t border-gray-700 pt-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400 mb-4"></div>
              <p className="text-blue-400 font-semibold">Analyzing investment options...</p>
            </div>
          ) : apiData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {apiData.slice(0, 6).map((stock, index) => (
                <div key={index} className="p-4 bg-gray-800 rounded-2xl shadow-xl border border-gray-600">
                  <h3 className="font-bold text-xl text-blue-400">{stock.company_name} ({stock.stock_symbol})</h3>
                  <p className="text-gray-300 mt-2 text-base leading-relaxed">{stock.reason_for_recommendation}</p>
                  <p className="text-gray-400 mt-2 text-sm font-semibold"><span className="text-white">Market Cap:</span> {stock.current_market_cap_category}</p>
                  <p className="text-gray-400 text-sm font-semibold"><span className="text-white">Sector:</span> {stock.primary_sector}</p>
                </div>
              ))}
              <p className="text-gray-500 text-base mt-4 text-center italic col-span-full">
                Disclaimer: The stock market data provided is for informational purposes only. 
                We do not guarantee the accuracy, completeness, or reliability of the information. 
                Please conduct your own research before making any investment decisions.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InvestmentForm;