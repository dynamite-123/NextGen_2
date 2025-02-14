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

// export default InvestmentForm;
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
//     if (name === "amount" && (value < 1 || value > 100000000)) return;
//     if (name === "time" && (value < 1 || value > 15)) return;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="bg-[#0a192f] text-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="number"
//           name="amount"
//           placeholder="Investment Amount (Max: 1 Cr)"
//           value={formData.amount}
//           onChange={handleChange}
//           className="p-2 rounded bg-gray-800 text-white outline-none"
//           required
//           min="1"
//           max="100000000"
//         />
//         <input
//           type="number"
//           name="time"
//           placeholder="Investment Time (Max: 15 Years)"
//           value={formData.time}
//           onChange={handleChange}
//           className="p-2 rounded bg-gray-800 text-white outline-none"
//           required
//           min="1"
//           max="15"
//         />
//         <select
//           name="marketType"
//           value={formData.marketType}
//           onChange={handleChange}
//           className="p-2 rounded bg-gray-800 text-white outline-none"
//         >
//           <option value="small">Small</option>
//           <option value="mid">Mid</option>
//           <option value="large">Large</option>
//         </select>
//         <select
//           name="riskTolerance"
//           value={formData.riskTolerance}
//           onChange={handleChange}
//           className="p-2 rounded bg-gray-800 text-white outline-none"
//         >
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//         <select
//           name="sector"
//           value={formData.sector}
//           onChange={handleChange}
//           className="p-2 rounded bg-gray-800 text-white outline-none"
//         >
//           <option value="automobile">Automobile</option>
//           <option value="it">IT</option>
//           <option value="banking">Banking</option>
//           <option value="finance">Finance</option>
//           <option value="agriculture">Agriculture</option>
//           <option value="psu">PSU</option>
//           <option value="energy">Energy</option>
//           <option value="fmcg">FMCG</option>
//         </select>
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-bold transition"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InvestmentForm;
import { useState } from "react";

const InvestmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: "",
    time: "",
    marketType: "small",
    riskTolerance: "low",
    sector: "automobile",
  });
  
  const [apiData, setApiData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" && (value < 1 || value > 100000000)) return;
    if (name === "time" && (value < 1 || value > 15)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="bg-[#0a192f] text-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          name="amount"
          placeholder="Investment Amount (Max: 1 Cr)"
          value={formData.amount}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white outline-none"
          required
          min="1"
          max="100000000"
        />
        <input
          type="number"
          name="time"
          placeholder="Investment Time (Max: 15 Years)"
          value={formData.time}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white outline-none"
          required
          min="1"
          max="15"
        />
        <select
          name="marketType"
          value={formData.marketType}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white outline-none"
        >
          <option value="small">Small</option>
          <option value="mid">Mid</option>
          <option value="large">Large</option>
        </select>
        <select
          name="riskTolerance"
          value={formData.riskTolerance}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white outline-none"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white outline-none"
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
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-bold transition"
        >
          Submit
        </button>
      </form>
      {apiData && (
        <div className="grid grid-cols-1 gap-4 mt-6">
          {apiData.stocks.slice(0, 6).map((stock, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg">{stock.company_name} ({stock.stock_symbol})</h3>
              <p className="text-blue-400">{stock.reason}</p>
              <p className="text-gray-400">Market Cap: {stock.market_cap_category}</p>
              <p className="text-gray-400">Sector: {stock.primary_sector}</p>
            </div>
          ))}
          <p className="text-gray-500 text-sm mt-4">{apiData.disclaimer}</p>
        </div>
      )}
    </div>
  );
};

export default InvestmentForm;
