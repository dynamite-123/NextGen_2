import React, { useState } from 'react';
import { useAuth } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp, Briefcase, DollarSign, PieChart as PieChartIcon } from 'lucide-react';

const PortfolioPage = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Sample data - replace with actual data from your backend
  const portfolioData = {
    totalValue: 250000,
    totalGain: 25000,
    gainPercentage: 11.2,
    dailyGain: 1200,
    dailyPercentage: 0.48,
    holdings: [
      { name: 'RELIANCE', quantity: 100, avgPrice: 2400, currentPrice: 2650, value: 265000, gain: 25000, gainPercentage: 10.41 },
      { name: 'TCS', quantity: 50, avgPrice: 3200, currentPrice: 3450, value: 172500, gain: 12500, gainPercentage: 7.81 },
      { name: 'HDFC', quantity: 75, avgPrice: 1500, currentPrice: 1620, value: 121500, gain: 9000, gainPercentage: 8.00 },
      { name: 'INFY', quantity: 60, avgPrice: 1600, currentPrice: 1580, value: 94800, gain: -1200, gainPercentage: -1.25 },
    ],
    performanceData: [
      { date: '2024-01', value: 230000 },
      { date: '2024-02', value: 235000 },
      { date: '2024-03', value: 242000 },
      { date: '2024-04', value: 238000 },
      { date: '2024-05', value: 245000 },
      { date: '2024-06', value: 250000 },
    ]
  };

  const COLORS = ['#60A5FA', '#34D399', '#F87171', '#A78BFA', '#FBBF24'];

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Portfolio Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Portfolio</h1>
          <p className="text-gray-400">Track your investments and performance</p>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-500" />
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-sm ${portfolioData.gainPercentage >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {portfolioData.gainPercentage >= 0 ? '+' : ''}{portfolioData.gainPercentage}%
              </span>
            </div>
            <h3 className="text-gray-400 text-sm">Total Portfolio Value</h3>
            <p className="text-2xl font-bold text-white">₹{portfolioData.totalValue.toLocaleString()}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-sm ${portfolioData.dailyPercentage >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {portfolioData.dailyPercentage >= 0 ? '+' : ''}{portfolioData.dailyPercentage}%
              </span>
            </div>
            <h3 className="text-gray-400 text-sm">Today's Gain/Loss</h3>
            <p className="text-2xl font-bold text-white">₹{portfolioData.dailyGain.toLocaleString()}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm">Total Investment</h3>
            <p className="text-2xl font-bold text-white">₹{(portfolioData.totalValue - portfolioData.totalGain).toLocaleString()}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <PieChartIcon className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm">Total Gain/Loss</h3>
            <p className="text-2xl font-bold text-white">₹{portfolioData.totalGain.toLocaleString()}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Portfolio Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData.performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.375rem'
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#60A5FA" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Portfolio Distribution */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Portfolio Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData.holdings}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {portfolioData.holdings.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.375rem'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <h3 className="text-xl font-bold text-white p-6 border-b border-gray-700">Holdings</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Avg. Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Current Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {portfolioData.holdings.map((holding, index) => (
                  <tr key={index} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{holding.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">{holding.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">₹{holding.avgPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">₹{holding.currentPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">₹{holding.value.toLocaleString()}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${holding.gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <span className="flex items-center justify-end gap-1">
                        {holding.gain >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        ₹{Math.abs(holding.gain).toLocaleString()} ({Math.abs(holding.gainPercentage)}%)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;