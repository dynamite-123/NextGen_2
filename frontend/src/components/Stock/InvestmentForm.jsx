// import { useState } from "react";

// const InvestmentForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     amount: "",
//     time: "",
//     marketType: "small",
//     riskTolerance: "low",
//     sector: "automobile",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-gray-900 text-white rounded-lg shadow-md space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-300">Investment Amount</label>
//         <input
//           type="number"
//           name="amount"
//           value={formData.amount}
//           onChange={handleChange}
//           className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Investment Time (in years)</label>
//         <input
//           type="number"
//           name="time"
//           value={formData.time}
//           onChange={handleChange}
//           className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Market Type</label>
//         <select name="marketType" value={formData.marketType} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
//           <option value="small">Small</option>
//           <option value="mid">Mid</option>
//           <option value="large">Large</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Risk Tolerance</label>
//         <select name="riskTolerance" value={formData.riskTolerance} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Sector</label>
//         <select name="sector" value={formData.sector} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
//           <option value="automobile">Automobile</option>
//           <option value="it">IT</option>
//           <option value="banking">Banking</option>
//           <option value="finance">Finance</option>
//           <option value="agriculture">Agriculture</option>
//           <option value="psu">PSU</option>
//           <option value="energy">Energy</option>
//           <option value="fmcg">FMCG</option>
//         </select>
//       </div>

//       <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default InvestmentForm;
// import { useState } from "react";

// const InvestmentForm = ({ onResponse }) => {
//   const [formData, setFormData] = useState({
//     amount: "",
//     time: "",
//     marketType: "small",
//     riskTolerance: "low",
//     sector: "automobile",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "amount" && (value < 1 || value > 100000000)) return;
//     if (name === "time" && (value < 1 || value > 15)) return;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("localhost:8000/api/get-recommendations/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       onResponse(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-gray-900 text-white rounded-lg shadow-md space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-300">Investment Amount (Max: 1 Crore)</label>
//         <input
//           type="number"
//           name="amount"
//           value={formData.amount}
//           onChange={handleChange}
//           className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white"
//           required
//           min="1"
//           max="100000000"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Investment Time (Max: 15 Years)</label>
//         <input
//           type="number"
//           name="time"
//           value={formData.time}
//           onChange={handleChange}
//           className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white"
//           required
//           min="1"
//           max="15"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Market Type</label>
//         <select name="marketType" value={formData.marketType} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
//           <option value="small">Small</option>
//           <option value="mid">Mid</option>
//           <option value="large">Large</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Risk Tolerance</label>
//         <select name="riskTolerance" value={formData.riskTolerance} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Sector</label>
//         <select name="sector" value={formData.sector} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
//           <option value="automobile">Automobile</option>
//           <option value="it">IT</option>
//           <option value="banking">Banking</option>
//           <option value="finance">Finance</option>
//           <option value="agriculture">Agriculture</option>
//           <option value="psu">PSU</option>
//           <option value="energy">Energy</option>
//           <option value="fmcg">FMCG</option>
//         </select>
//       </div>

//       <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800">
//         Submit
//       </button>
//     </form>
//   );
// };
// import { useState } from "react";

// const InvestmentForm = ({ onResponse }) => {
//   const [formData, setFormData] = useState({
//     investment_amount: "",
//     investment_duration: "",
//     market_cap: "large cap",
//     sector: "IT",
//     risk_tolerance: "low",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "investment_amount" && (value < 1 || value > 100000000)) return;
//     if (name === "investment_duration" && (value < 1 || value > 15)) return;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:8000/api/investment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       onResponse(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-gray-900 text-white rounded-lg shadow-md space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-300">Investment Amount (Max: 1 Crore)</label>
//         <input
//           type="number"
//           name="investment_amount"
//           value={formData.investment_amount}
//           onChange={handleChange}
//           className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white"
//           required
//           min="1"
//           max="100000000"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Investment Duration (Max: 15 Years)</label>
//         <input
//           type="number"
//           name="investment_duration"
//           value={formData.investment_duration}
//           onChange={handleChange}
//           className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white"
//           required
//           min="1"
//           max="15"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Market Cap</label>
//         <select name="market_cap" value={formData.market_cap} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
//           <option value="small cap">Small Cap</option>
//           <option value="mid cap">Mid Cap</option>
//           <option value="large cap">Large Cap</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Risk Tolerance</label>
//         <select name="risk_tolerance" value={formData.risk_tolerance} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Sector</label>
//         <select name="sector" value={formData.sector} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
//           <option value="automobile">Automobile</option>
//           <option value="IT">IT</option>
//           <option value="banking">Banking</option>
//           <option value="finance">Finance</option>
//           <option value="agriculture">Agriculture</option>
//           <option value="PSU">PSU</option>
//           <option value="energy">Energy</option>
//           <option value="fmcg">FMCG</option>
//         </select>
//       </div>

//       <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800">
//         Submit
//       </button>
//     </form>
//   );
// };

// const InvestmentResult = ({ data }) => {
//   if (!data || !data.stocks) return null;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//       {data.stocks.map((stock, index) => (
//         <div key={index} className="bg-gray-700 text-white p-4 rounded-lg shadow-md">
//           <h3 className="text-xl font-bold">{stock.company_name} ({stock.stock_symbol})</h3>
//           <p className="text-sm text-gray-300">{stock.market_cap_category} - {stock.primary_sector}</p>
//           <p className="mt-2 text-gray-200">{stock.reason}</p>
//         </div>
//       ))}
//       <div className="col-span-full text-center text-gray-400 text-sm mt-4">
//         {data.disclaimer}
//       </div>
//     </div>
//   );
// };

// export default InvestmentForm;
// import { useState } from "react";

// const InvestmentForm = ({ onResponse }) => {
//   const [formData, setFormData] = useState({
//     investment_amount: "",
//     timeinvestment_duration: "",
//     market_cap: "small",
//     sector: "low",
//     risk_tolerance: "automobile",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "amount" && (value < 1 || value > 100000000)) return;
//     if (name === "time" && (value < 1 || value > 15)) return;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("localhost:8000/api/get-recommendations/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       onResponse(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-gray-900 text-white rounded-lg shadow-md space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-300">Investment Amount (Max: 1 Crore)</label>
//         <input
//           type="number"
//           name="amount"
//           value={formData.amount}
//           onChange={handleChange}
//           className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white"
//           required
//           min="1"
//           max="100000000"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Investment Time (Max: 15 Years)</label>
//         <input
//           type="number"
//           name="time"
//           value={formData.time}
//           onChange={handleChange}
//           className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white"
//           required
//           min="1"
//           max="15"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Market Type</label>
//         <select name="marketType" value={formData.marketType} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
//           <option value="small">Small</option>
//           <option value="mid">Mid</option>
//           <option value="large">Large</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Risk Tolerance</label>
//         <select name="riskTolerance" value={formData.riskTolerance} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300">Sector</label>
//         <select name="sector" value={formData.sector} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
//           <option value="automobile">Automobile</option>
//           <option value="it">IT</option>
//           <option value="banking">Banking</option>
//           <option value="finance">Finance</option>
//           <option value="agriculture">Agriculture</option>
//           <option value="psu">PSU</option>
//           <option value="energy">Energy</option>
//           <option value="fmcg">FMCG</option>
//         </select>
//       </div>

//       <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800">
//         Submit
//       </button>
//     </form>
//   );
// }
// 
// ;

import { useState } from "react";

const InvestmentForm = ({ onResponse }) => {
  const [formData, setFormData] = useState({
    investment_amount: "",
    investment_duration: "",
    market_cap: "large cap",
    sector: "IT",
    risk_tolerance: "low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "investment_amount" && (value < 1 || value > 100000000)) return;
    if (name === "investment_duration" && (value < 1 || value > 15)) return;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("localhost:8000/api/get-recommendations/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      onResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 text-white rounded-lg shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Investment Amount (Max: 1 Crore)</label>
        <input
          type="number"
          name="investment_amount"
          value={formData.investment_amount}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white"
          required
          min="1"
          max="100000000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Investment Duration (Max: 15 Years)</label>
        <input
          type="number"
          name="investment_duration"
          value={formData.investment_duration}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white"
          required
          min="1"
          max="15"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Market Cap</label>
        <select name="market_cap" value={formData.market_cap} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
          <option value="small cap">Small Cap</option>
          <option value="mid cap">Mid Cap</option>
          <option value="large cap">Large Cap</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Risk Tolerance</label>
        <select name="risk_tolerance" value={formData.risk_tolerance} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Sector</label>
        <select name="sector" value={formData.sector} onChange={handleChange} className="mt-1 p-2 w-full border rounded-lg bg-gray-800 text-white">
          <option value="automobile">Automobile</option>
          <option value="IT">IT</option>
          <option value="banking">Banking</option>
          <option value="finance">Finance</option>
          <option value="agriculture">Agriculture</option>
          <option value="PSU">PSU</option>
          <option value="energy">Energy</option>
          <option value="fmcg">FMCG</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800">
        Submit
      </button>
    </form>
  );
};

export default InvestmentForm;
