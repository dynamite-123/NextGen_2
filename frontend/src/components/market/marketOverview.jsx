import React from 'react';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { useMarket } from '../../context/AppContext';
import MarketMovers from './MarketMovers';
const MarketStats = ({ data }) => {
  // Calculate day's range and 52-week range from the available data
  const today = data[data.length - 1];
  const yearData = data.slice(-365); // Last year's data

  const dayHigh = today.high;
  const dayLow = today.low;
  const fiftyTwoWeekHigh = Math.max(...yearData.map(d => d.high));
  const fiftyTwoWeekLow = Math.min(...yearData.map(d => d.low));

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <div className="text-gray-400 text-sm">Day's Range</div>
        <div className="text-white">
          ₹{dayLow.toLocaleString()} - ₹{dayHigh.toLocaleString()}
        </div>
      </div>
      <div>
        <div className="text-gray-400 text-sm">52 Week Range</div>
        <div className="text-white">
          ₹{fiftyTwoWeekLow.toLocaleString()} - ₹{fiftyTwoWeekHigh.toLocaleString()}
        </div>
      </div>
    </div>
  );
};



export const MarketOverview = () => {
  const { niftyData, marketLoading, marketError } = useMarket();

  if (marketLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (marketError || !niftyData || niftyData.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="text-red-500">Error: {marketError || 'No data available'}</div>
        </div>
      </div>
    );
  }

  // Get current and previous prices from the transformed data
  const currentPrice = niftyData[niftyData.length - 1].close;
  const previousClose = niftyData[niftyData.length - 2]?.close || currentPrice;
  const priceChange = currentPrice - previousClose;
  const percentChange = (priceChange / previousClose) * 100;

  // Transform data for chart (already in the correct format)
  const chartData = niftyData.map(item => ({
    name: new Date(item.date).getTime(),
    value: item.close,
    high: item.high,
    low: item.low,
    volume: item.volume
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">NIFTY 50</h2>
            <div className="text-2xl font-bold text-white mt-2">
              ₹{currentPrice?.toLocaleString()}
            </div>
            <div className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
            </div>
          </div>
        </div>

        <MarketStats data={niftyData} />
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
              <ReferenceLine
                y={previousClose}
                stroke="#9ca3af"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af' }}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short'
                  });
                }}
              />
              <YAxis
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af' }}
                tickFormatter={(value) => {
                  return new Intl.NumberFormat('en-IN', {
                    maximumFractionDigits: 0
                  }).format(value);
                }}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '0.375rem',
                  color: '#fff'
                }}
                formatter={(value) => [
                  new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 2
                  }).format(value),
                  'NIFTY50'
                ]}
                labelFormatter={(label) => {
                  return new Date(label).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  });
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <MarketMovers type="gainers" />
      <MarketMovers type="losers" />
    </div>
  );
};

export default MarketOverview;