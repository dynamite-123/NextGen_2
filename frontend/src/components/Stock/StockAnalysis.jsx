import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


// const ParentComponent = () => {
//   const handleFormSubmit = (data) => {
//     console.log("Received Data:", data);
//   };

//   return (
//     <div className="bg-gray-700 p-6 rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Investment Details</h2>
//       <InvestmentForm onSubmit={handleFormSubmit} />
//     </div>        
//   );
// };

import { useState } from "react";
import InvestmentForm from "./InvestmentForm";

const ParentComponent = () => {
  const [investmentData, setInvestmentData] = useState(null);

  const handleFormSubmit = (data) => {
    setInvestmentData(data);
  };

  return (
    <div className="min-h-screen bg-[#020c1b] text-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Stock Investment Recommendations</h1>
      <InvestmentForm onSubmit={handleFormSubmit} />
      {investmentData && (
        <div className="mt-6 max-w-4xl w-full">
          <h2 className="text-xl font-semibold mb-4">Recommended Stocks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {investmentData.stocks.slice(0, 6).map((stock, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg">
                  {stock.company_name} ({stock.stock_symbol})
                </h3>
                <p className="text-blue-400">{stock.reason}</p>
                <p className="text-gray-400">Market Cap: {stock.market_cap_category}</p>
                <p className="text-gray-400">Sector: {stock.primary_sector}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-4">{investmentData.disclaimer}</p>
        </div>
      )}
    </div>
  );
};

export default ParentComponent;



const StockInfo = () => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">AAPL - Apple Inc.</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400">Current Price</p>
          <p className="text-2xl font-bold text-green-500">$178.32</p>
          <p className="text-green-400">+2.45 (1.38%)</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Open</span>
            <span className="text-white">$176.15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">High</span>
            <span className="text-white">$179.43</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Low</span>
            <span className="text-white">$175.82</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Volume</span>
            <span className="text-white">52.3M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechnicalIndicators = () => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Technical Indicators</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">RSI (14)</span>
          <span className="text-yellow-500">62.5</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">MACD</span>
          <span className="text-green-500">Bullish</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">50 Day MA</span>
          <span className="text-green-500">$172.45</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">200 Day MA</span>
          <span className="text-red-500">$165.78</span>
        </div>
      </div>
    </div>
  );
};

const PriceChart = () => {
  const data = [
    { date: '2024-01', price: 165 },
    { date: '2024-02', price: 168 },
    { date: '2024-03', price: 172 },
    { date: '2024-04', price: 175 },
    { date: '2024-05', price: 178 }
  ];

  return (
    <div className="h-64 my-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            fill="#3b82f620"
          />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af"
          />
          <YAxis 
            stroke="#9ca3af"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '0.375rem',
              color: '#fff'
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const AIRecommendation = () => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-3">AI Analysis</h3>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-bold text-green-500">Strong Buy</span>
        <div className="flex items-center">
          <span className="text-gray-400 mr-2">Confidence:</span>
          <span className="text-white">85%</span>
        </div>
      </div> 
      <p className="text-gray-300">
        Based on strong technical indicators, positive market sentiment, and upcoming product launches,
        AAPL shows promising growth potential in the short to medium term.
      </p>
    </div>
  );
};

export const StockAnalysis = () => {
  return (
  <ParentComponent/> 
  );
}; 