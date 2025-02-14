// // import { useState } from "react";

// // const InvestmentForm = ({ onSubmit }) => {
// //   const [formData, setFormData] = useState({
// //     amount: "",
// //     time: "",
// //     marketType: "small",
// //     riskTolerance: "low",
// //     sector: "automobile",
// //   });
  
// //   const [apiData, setApiData] = useState(null);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     if (name === "amount" && (value < 1 || value > 100000000)) return;
// //     if (name === "time" && (value < 1 || value > 15)) return;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const requestData = {
// //       investment_amount: parseInt(formData.amount),
// //       investment_duration: parseInt(formData.time),
// //       market_cap: formData.marketType + " cap",
// //       sector: formData.sector,
// //       risk_tolerance: formData.riskTolerance,
// //     };

// //     try {
// //       const response = await fetch("http://localhost:8000/api/get-recommendations/", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(requestData),
// //       });
// //       const data = await response.json();
// //       setApiData(data);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   return (
// //     <div className="bg-[#0a192f] text-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto border border-gray-700">
// //       <h2 className="text-2xl font-bold mb-6 text-center">Investment Details</h2>
// //       <form onSubmit={handleSubmit} className="flex flex-col gap-5">
// //         <input
// //           type="number"
// //           name="amount"
// //           placeholder="Investment Amount (Max: 1 Cr)"
// //           value={formData.amount}
// //           onChange={handleChange}
// //           className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
// //           required
// //           min="1"
// //           max="100000000"
// //         />
// //         <input
// //           type="number"
// //           name="time"
// //           placeholder="Investment Time (Max: 15 Years)"
// //           value={formData.time}
// //           onChange={handleChange}
// //           className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
// //           required
// //           min="1"
// //           max="15"
// //         />
// //         <select
// //           name="marketType"
// //           value={formData.marketType}
// //           onChange={handleChange}
// //           className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
// //         >
// //           <option value="small">Small</option>
// //           <option value="mid">Mid</option>
// //           <option value="large">Large</option>
// //         </select>
// //         <select
// //           name="riskTolerance"
// //           value={formData.riskTolerance}
// //           onChange={handleChange}
// //           className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
// //         >
// //           <option value="low">Low</option>
// //           <option value="medium">Medium</option>
// //           <option value="high">High</option>
// //         </select>
// //         <select
// //           name="sector"
// //           value={formData.sector}
// //           onChange={handleChange}
// //           className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
// //         >
// //           <option value="automobile">Automobile</option>
// //           <option value="it">IT</option>
// //           <option value="banking">Banking</option>
// //           <option value="finance">Finance</option>
// //           <option value="agriculture">Agriculture</option>
// //           <option value="psu">PSU</option>
// //           <option value="energy">Energy</option>
// //           <option value="fmcg">FMCG</option>
// //         </select>
// //         <button
// //           type="submit"
// //           className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-bold transition shadow-md"
// //         >
// //           Submit
// //         </button>
// //       </form>
// //       {apiData && (
// //         <div className="grid grid-cols-1 gap-6 mt-8">
// //           {apiData.stocks.slice(0, 6).map((stock, index) => (
// //             <div key={index} className="p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
// //               <h3 className="font-bold text-lg text-blue-400">{stock.company_name} ({stock.stock_symbol})</h3>
// //               <p className="text-gray-300 mt-2">{stock.reason}</p>
// //               <p className="text-gray-400 mt-2"><span className="font-semibold">Market Cap:</span> {stock.market_cap_category}</p>
// //               <p className="text-gray-400"><span className="font-semibold">Sector:</span> {stock.primary_sector}</p>
// //             </div>
// //           ))}
// //           <p className="text-gray-500 text-sm mt-6 text-center">{apiData.disclaimer}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default InvestmentForm;
// import { useState } from "react";

// const InvestmentForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     amount: "",
//     time: "",
//     marketType: "small",
//     riskTolerance: "low",
//     sector: "automobile",
//   });
  
//   const [apiData, setApiData] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "amount" && (value < 1 || value > 100000000)) return;
//     if (name === "time" && (value < 1 || value > 15)) return;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const requestData = {
//       investment_amount: parseInt(formData.amount),
//       investment_duration: parseInt(formData.time),
//       market_cap: formData.marketType + " cap",
//       sector: formData.sector,
//       risk_tolerance: formData.riskTolerance,
//     };

//     try {
//       const response = await fetch("http://localhost:8000/api/get-recommendations/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData),
//       });
//       const data = await response.json();
//       setApiData(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div className="bg-[#0a192f] text-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto border border-gray-700 min-h-[500px] flex flex-col justify-between">
//       <div>
//         <h2 className="text-2xl font-bold mb-6 text-center">Investment Details</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           <input
//             type="number"
//             name="amount"
//             placeholder="Investment Amount (Max: 1 Cr)"
//             value={formData.amount}
//             onChange={handleChange}
//             className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
//             required
//             min="1"
//             max="100000000"
//           />
//           <input
//             type="number"
//             name="time"
//             placeholder="Investment Time (Max: 15 Years)"
//             value={formData.time}
//             onChange={handleChange}
//             className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
//             required
//             min="1"
//             max="15"
//           />
//           <select
//             name="marketType"
//             value={formData.marketType}
//             onChange={handleChange}
//             className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
//           >
//             <option value="small">Small</option>
//             <option value="mid">Mid</option>
//             <option value="large">Large</option>
//           </select>
//           <select
//             name="riskTolerance"
//             value={formData.riskTolerance}
//             onChange={handleChange}
//             className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//           <select
//             name="sector"
//             value={formData.sector}
//             onChange={handleChange}
//             className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
//           >
//             <option value="automobile">Automobile</option>
//             <option value="it">IT</option>
//             <option value="banking">Banking</option>
//             <option value="finance">Finance</option>
//             <option value="agriculture">Agriculture</option>
//             <option value="psu">PSU</option>
//             <option value="energy">Energy</option>
//             <option value="fmcg">FMCG</option>
//           </select>
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-bold transition shadow-md"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//       {apiData && (
//         <div className="grid grid-cols-1 gap-6 mt-8">
//           {apiData.stocks.slice(0, 6).map((stock, index) => (
//             <div key={index} className="p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
//               <h3 className="font-bold text-lg text-blue-400">{stock.company_name} ({stock.stock_symbol})</h3>
//               <p className="text-gray-300 mt-2">{stock.reason}</p>
//               <p className="text-gray-400 mt-2"><span className="font-semibold">Market Cap:</span> {stock.market_cap_category}</p>
//               <p className="text-gray-400"><span className="font-semibold">Sector:</span> {stock.primary_sector}</p>
//             </div>
//           ))}
//           <p className="text-gray-500 text-sm mt-6 text-center">{apiData.disclaimer}</p>
//         </div>
//       )}
//     </div>
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
  
//   const [apiData, setApiData] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "amount" && (value < 1 || value > 100000000)) return;
//     if (name === "time" && (value < 1 || value > 15)) return;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const requestData = {
//       investment_amount: parseInt(formData.amount),
//       investment_duration: parseInt(formData.time),
//       market_cap: formData.marketType + " cap",
//       sector: formData.sector,
//       risk_tolerance: formData.riskTolerance,
//     };

//     try {
//       const response = await fetch("http://localhost:8000/api/get-recommendations/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData),
//       });
//       const data = await response.json();
//       setApiData(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div className="bg-[#0a192f] text-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto border border-gray-700 min-h-[600px] flex flex-col justify-between">
//       <div>
//         <h2 className="text-2xl font-bold mb-6 text-center">Investment Details</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           <label className="text-gray-300">Investment Amount (Max: 1 Cr)</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
//             required
//             min="1"
//             max="100000000"
//           />
//           <label className="text-gray-300">Investment Time (Max: 15 Years)</label>
//           <input
//             type="number"
//             name="time"
//             value={formData.time}
//             onChange={handleChange}
//             className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
//             required
//             min="1"
//             max="15"
//           />
//           <label className="text-gray-300">Market Type</label>
//           <select
//             name="marketType"
//             value={formData.marketType}
//             onChange={handleChange}
//             className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
//           >
//             <option value="small">Small</option>
//             <option value="mid">Mid</option>
//             <option value="large">Large</option>
//           </select>
//           <label className="text-gray-300">Risk Tolerance</label>
//           <select
//             name="riskTolerance"
//             value={formData.riskTolerance}
//             onChange={handleChange}
//             className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//           <label className="text-gray-300">Sector</label>
//           <select
//             name="sector"
//             value={formData.sector}
//             onChange={handleChange}
//             className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
//           >
//             <option value="automobile">Automobile</option>
//             <option value="it">IT</option>
//             <option value="banking">Banking</option>
//             <option value="finance">Finance</option>
//             <option value="agriculture">Agriculture</option>
//             <option value="psu">PSU</option>
//             <option value="energy">Energy</option>
//             <option value="fmcg">FMCG</option>
//           </select>
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-bold transition shadow-md"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//       <div className="mt-8 min-h-[300px]">
//         {apiData && (
//           <div className="grid grid-cols-1 gap-6">
//             {apiData.stocks.slice(0, 6).map((stock, index) => (
//               <div key={index} className="p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
//                 <h3 className="font-bold text-lg text-blue-400">{stock.company_name} ({stock.stock_symbol})</h3>
//                 <p className="text-gray-300 mt-2">{stock.reason}</p>
//                 <p className="text-gray-400 mt-2"><span className="font-semibold">Market Cap:</span> {stock.market_cap_category}</p>
//                 <p className="text-gray-400"><span className="font-semibold">Sector:</span> {stock.primary_sector}</p>
//               </div>
//             ))}
//             <p className="text-gray-500 text-sm mt-6 text-center">{apiData.disclaimer}</p>
//           </div>
//         )}
//       </div>
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
    <div className="bg-[#0a192f] text-white p-12 rounded-3xl shadow-2xl max-w-3xl mx-auto border border-gray-700 min-h-[750px] flex flex-col justify-between">
      <div>
        <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-400">Investment Details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <label className="text-gray-300 text-lg font-semibold">Investment Amount (Max: 1 Cr)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="p-4 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition text-lg shadow-md"
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
            className="p-4 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition text-lg shadow-md"
            required
            min="1"
            max="15"
          />
          <label className="text-gray-300 text-lg font-semibold">Market Type</label>
          <select
            name="marketType"
            value={formData.marketType}
            onChange={handleChange}
            className="p-4 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition text-lg shadow-md"
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
            className="p-4 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition text-lg shadow-md"
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
            className="p-4 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition text-lg shadow-md"
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
            className="bg-blue-600 hover:bg-blue-700 p-5 rounded-xl text-white font-bold transition shadow-lg text-lg"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="mt-12 min-h-[450px]">
        {apiData && (
          <div className="grid grid-cols-1 gap-8">
            {apiData.stocks.slice(0, 6).map((stock, index) => (
              <div key={index} className="p-10 bg-gray-800 rounded-2xl shadow-xl border border-gray-600 text-lg">
                <h3 className="font-bold text-2xl text-blue-400">{stock.company_name} ({stock.stock_symbol})</h3>
                <p className="text-gray-300 mt-4 leading-relaxed">{stock.reason}</p>
                <p className="text-gray-400 mt-4 font-semibold"><span className="text-white">Market Cap:</span> {stock.market_cap_category}</p>
                <p className="text-gray-400 font-semibold"><span className="text-white">Sector:</span> {stock.primary_sector}</p>
              </div>
            ))}
            <p className="text-gray-500 text-lg mt-8 text-center italic">{apiData.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentForm;
