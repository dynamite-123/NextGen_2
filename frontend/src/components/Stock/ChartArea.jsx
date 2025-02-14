import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Bar, 
  ComposedChart 
} from 'recharts';
import { Bell, ChevronDown, Check } from 'lucide-react';

// ... (previous code for generateSampleData, timeRanges, and metrics remains the same)
const generateSampleData = () => {
  const data = [];
  const startPrice = 1500;
  const startDate = new Date('2023-08-01');
  let currentPrice = startPrice;
  let dma50 = startPrice;
  let dma200 = startPrice;
  
  for (let i = 0; i < 180; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const priceChange = (Math.random() - 0.48) * 30;
    currentPrice = currentPrice + priceChange;
    
    const baseVolume = 500000;
    const volumeSpike = Math.random() > 0.9 ? Math.random() * 1000000 : 0;
    const volume = baseVolume + Math.random() * 200000 + volumeSpike;
    
    const price = Number(currentPrice.toFixed(2));
    dma50 = i < 50 ? price : (dma50 * 49 + price) / 50;
    dma200 = i < 200 ? price : (dma200 * 199 + price) / 200;
    
    const pe = (price / (price * 0.05 + Math.random() * 5)).toFixed(2);
    const eps = ((price * 0.05 + Math.random() * 5)).toFixed(2);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price,
      volume: Math.round(volume),
      dma50: Number(dma50.toFixed(2)),
      dma200: Number(dma200.toFixed(2)),
      pe: Number(pe),
      eps: Number(eps)
    });
  }
  return data;
};

const sampleData = generateSampleData();

const timeRanges = [
  { label: '1M', value: '30' },
  { label: '6M', value: '180' },
  { label: '1Yr', value: '365' },
  { label: '3Yr', value: '1095' },
  { label: '5Yr', value: '1825' },
  { label: '10Yr', value: '3652' },
  { label: 'Max', value: '10000' }
];

const metrics = [
  { label: 'Price', value: 'price' },
  { label: 'PE Ratio', value: 'pe' },
  { label: 'Sales & Margin', value: 'sales' },
  { label: 'EV / EBITDA', value: 'ev-ebitda' },
  { label: 'Price to Book', value: 'pb' }
];

// Define all available series
const allSeries = [
  { dataKey: 'price', name: 'Price', color: '#645df9' },
  { dataKey: 'dma50', name: '50 DMA', color: '#f2ba5a' },
  { dataKey: 'dma200', name: '200 DMA', color: '#70818f' },
  { dataKey: 'volume', name: 'Volume', color: '#bed3fd' }
];

// Custom Legend component
const CustomLegend = ({ visibleSeries, onSeriesToggle }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-2">
      {allSeries.map((series) => (
        <div
          key={series.dataKey}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onSeriesToggle(series.dataKey)}
        >
          <div className="w-4 h-4 border rounded flex items-center justify-center border-gray-400">
            {visibleSeries[series.dataKey] && (
              <Check className="w-3 h-3 text-blue-500" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: series.color }}
            />
            <span className="text-sm text-gray-300">{series.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const StockChart = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [metric, setMetric] = useState('price');
  const [showMetricsDropdown, setShowMetricsDropdown] = useState(false);
  const [visibleSeries, setVisibleSeries] = useState({
    price: true,
    dma50: true,
    dma200: true,
    volume: true
  });

  const handleSeriesToggle = (dataKey) => {
    setVisibleSeries(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100">
      <div className="h-screen p-4 flex flex-col">
        {/* Header section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Stock Price Chart</h2>
          <button className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alerts
          </button>
        </div>
        
        {/* Controls section */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-3 py-1 rounded ${
                  timeRange === range.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {metrics.slice(0, 2).map((m) => (
              <button
                key={m.value}
                onClick={() => setMetric(m.value)}
                className={`px-3 py-1 rounded ${
                  metric === m.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {m.label}
              </button>
            ))}
            <div className="relative">
              <button
                onClick={() => setShowMetricsDropdown(!showMetricsDropdown)}
                className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center gap-1"
              >
                More <ChevronDown className="w-4 h-4" />
              </button>
              {showMetricsDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10 border border-gray-700">
                  {metrics.slice(2).map((m) => (
                    <button
                      key={m.value}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-300"
                      onClick={() => {
                        setMetric(m.value);
                        setShowMetricsDropdown(false);
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chart section */}
        <div className="flex-grow w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sampleData.slice(-parseInt(timeRange))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#888" tick={{ fill: '#888' }} />
              <YAxis 
                yAxisId="left" 
                stroke="#888"
                tick={{ fill: '#888' }}
                domain={['auto', 'auto']}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#888"
                tick={{ fill: '#888' }}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-gray-900 border border-gray-700 p-4 rounded shadow-lg">
                        <p className="text-gray-400 text-sm">{label}</p>
                        {payload.map((entry, index) => (
                          <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value.toLocaleString()}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                content={<CustomLegend visibleSeries={visibleSeries} onSeriesToggle={handleSeriesToggle} />}
              />
              {visibleSeries.price && (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="price"
                  stroke="#645df9"
                  dot={false}
                  name="Price"
                />
              )}
              {visibleSeries.dma50 && (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="dma50"
                  stroke="#f2ba5a"
                  dot={false}
                  name="50 DMA"
                />
              )}
              {visibleSeries.dma200 && (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="dma200"
                  stroke="#70818f"
                  dot={false}
                  name="200 DMA"
                />
              )}
              {visibleSeries.volume && (
                <Bar
                  yAxisId="right"
                  dataKey="volume"
                  fill="#bed3fd"
                  opacity={0.5}
                  name="Volume"
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-gray-800 p-4 rounded">
            <div className="text-gray-400 text-sm">Current Price</div>
            <div className="text-xl font-semibold">
              ₹{sampleData[sampleData.length - 1].price.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <div className="text-gray-400 text-sm">Volume</div>
            <div className="text-xl font-semibold">
              {(sampleData[sampleData.length - 1].volume / 1000).toFixed(1)}K
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <div className="text-gray-400 text-sm">P/E Ratio</div>
            <div className="text-xl font-semibold">
              {sampleData[sampleData.length - 1].pe}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <div className="text-gray-400 text-sm">EPS</div>
            <div className="text-xl font-semibold">
              ₹{sampleData[sampleData.length - 1].eps}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;