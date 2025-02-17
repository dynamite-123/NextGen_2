import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ExternalLink, AlertCircle } from 'lucide-react';

// Mock Data
const MOCK_WATCHLIST = [
  {
    symbol: "RELIANCE",
    company_name: "Reliance Industries Ltd.",
    current_price: 2456.75,
    price_change_percentage: 1.25
  },
  {
    symbol: "TCS",
    company_name: "Tata Consultancy Services Ltd.",
    current_price: 3567.80,
    price_change_percentage: -0.75
  },
  {
    symbol: "INFY",
    company_name: "Infosys Ltd.",
    current_price: 1478.90,
    price_change_percentage: 2.15
  },
  {
    symbol: "HDFCBANK",
    company_name: "HDFC Bank Ltd.",
    current_price: 1589.45,
    price_change_percentage: 0.85
  },
  {
    symbol: "WIPRO",
    company_name: "Wipro Ltd.",
    current_price: 456.30,
    price_change_percentage: -1.45
  }
];

const WatchlistPage = () => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState(MOCK_WATCHLIST);
  const [isLoading, setIsLoading] = useState(false);

  const removeFromWatchlist = (symbol) => {
    setWatchlist(prev => prev.filter(stock => stock.symbol !== symbol));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatPercentage = (value) => {
    if (!value) return 'N/A';
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="animate-pulse text-white">Loading watchlist...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">My Watchlist</h1>
          <span className="text-gray-400 text-sm">
            {watchlist.length} {watchlist.length === 1 ? 'Stock' : 'Stocks'}
          </span>
        </div>
        
        {watchlist.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-400 text-lg mb-4">Your watchlist is empty</p>
            <button 
              onClick={() => navigate('/stocks')}
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Browse stocks to add some
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {/* Header */}
            <div className="hidden md:grid grid-cols-5 gap-4 text-sm text-gray-400 px-4 py-2 border-b border-gray-800">
              <div>Symbol</div>
              <div>Company</div>
              <div>Price</div>
              <div>24h Change</div>
              <div></div>
            </div>

            {/* Stock List */}
            {watchlist.map((stock) => (
              <div 
                key={stock.symbol}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  {/* Symbol */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{stock.symbol}</span>
                  </div>

                  {/* Company Name */}
                  <div className="text-gray-300 truncate">
                    {stock.company_name}
                  </div>

                  {/* Current Price */}
                  <div className="text-white font-medium">
                    {formatPrice(stock.current_price)}
                  </div>

                  {/* Price Change */}
                  <div className={`font-medium ${
                    stock.price_change_percentage >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {formatPercentage(stock.price_change_percentage)}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => navigate(`/stocks/${stock.symbol}`)}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                      title="View Details"
                    >
                      <ExternalLink size={18} />
                    </button>
                    <button
                      onClick={() => removeFromWatchlist(stock.symbol)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-700"
                      title="Remove from Watchlist"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Mobile View Additional Info */}
                <div className="md:hidden mt-2 pt-2 border-t border-gray-700 text-sm text-gray-400">
                  <div className="flex justify-between items-center">
                    <span>24h Change:</span>
                    <span className={stock.price_change_percentage >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {formatPercentage(stock.price_change_percentage)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;