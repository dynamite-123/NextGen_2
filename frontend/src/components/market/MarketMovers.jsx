import React, { useEffect, useState } from "react";

const MarketMovers = ({ type }) => {
  const [stocks, setStocks] = useState(() => {
    // Try to get cached data from sessionStorage
    const cachedData = sessionStorage.getItem('marketMoversData');
    return cachedData ? JSON.parse(cachedData) : { top_gainers: [], top_losers: [] };
  });
  const [loading, setLoading] = useState(!stocks.top_gainers || !stocks.top_losers);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/gainers-and-losers/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setStocks(data);
        // Cache the data in sessionStorage
        sessionStorage.setItem('marketMoversData', JSON.stringify(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (!stocks.top_gainers || !stocks.top_losers || 
        stocks.top_gainers.length === 0 || stocks.top_losers.length === 0) {
      fetchData();
    }
  }, [stocks.top_gainers, stocks.top_losers]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const displayedStocks = type === "gainers" ? stocks.top_gainers || [] : stocks.top_losers || [];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white text-center">
        {type === "gainers" ? "Top Gainers" : "Top Losers"}
      </h2>
      <div className="grid grid-cols-3 gap-4 text-white text-sm font-mono">
        <span className="font-semibold">Symbol</span>
        <span className="font-semibold text-center">Change (%)</span>
        <span className="font-semibold text-right">Close Price (₹)</span>
        {displayedStocks.map((stock, index) => (
          <React.Fragment key={`stock-${index}`}>
            <span className="text-gray-300">{stock.symbol}</span>
            <span className={`${stock.change > 0 ? "text-green-500" : "text-red-500"} text-center`}>
              {stock.change.toFixed(2)}%
            </span>
            <span className="text-gray-400 text-right">₹{stock.close.toFixed(2)}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MarketMovers;
// import { useEffect, useState } from "react";

// const MarketMovers = ({ type }) => {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/gainers-and-losers/");
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         setStocks(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (stocks.length === 0) {
//       fetchData();
//     }
//   }, []);

//   if (loading) return <p className="text-white">Loading...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   const displayedStocks = type === "gainers" ? stocks.top_gainers : stocks.top_losers;

//   return (
//     <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4 text-white text-center">
//         {type === "gainers" ? "Top Gainers" : "Top Losers"}
//       </h2>
//       <div className="grid grid-cols-3 gap-4 text-white text-sm font-mono">
//         <span className="font-semibold">Symbol</span>
//         <span className="font-semibold text-center">Change (%)</span>
//         <span className="font-semibold text-right">Close Price (₹)</span>
//         {displayedStocks.map((stock, index) => (
//           <>
//             <span key={`symbol-${index}`} className="text-gray-300">{stock.symbol}</span>
//             <span key={`change-${index}`} className={`${stock.change > 0 ? "text-green-500" : "text-red-500"} text-center`}>
//               {stock.change.toFixed(2)}%
//             </span>
//             <span key={`price-${index}`} className="text-gray-400 text-right">₹{stock.close.toFixed(2)}</span>
//           </>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MarketMovers;
