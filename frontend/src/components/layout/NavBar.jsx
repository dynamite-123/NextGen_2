import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useStock } from '../../context/AppContext';

const Navbar = () => {
  const { searchQuery, searchResults, isLoading, handleSearchChange, clearSearch, setSelectedStock } = useStock();
  const { isAuthenticated,logout } = useAuth();
  const [localSearchQuery, setLocalSearchQuery] = useState(""); // Local input state
  const navigate = useNavigate();
  const handleSearchChangeInput = (e) => {
    setLocalSearchQuery(e.target.value); // Only update the local input value
  };
  
   useEffect(() => {
    if (!isAuthenticated) {
      setLocalSearchQuery('');
      // Only clear search if there are results or a query
      if (searchResults.length > 0 || searchQuery) {
        clearSearch();
      }
    }
  }, [isAuthenticated, clearSearch, searchResults.length, searchQuery]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && localSearchQuery.trim()) {
      if (!isAuthenticated) {
        navigate('/login', { 
          state: { from: location.pathname }
        });
        return;
      }
      handleSearchChange(e);
    }
  };

  return (
    <div className="relative">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SmartStock</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={localSearchQuery}
                onChange={handleSearchChangeInput}
                onKeyDown={handleKeyDown}
                placeholder="Enter stock symbol..."
                className="px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {isLoading && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  Loading...
                </span>
              )}
              
              {searchResults.length > 0 && searchQuery && (
                <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto z-50">
                  {searchResults.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
                      onClick={() => {
                        setSelectedStock(stock);
                        clearSearch();
                      }}
                    >
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-sm text-gray-600">{stock.overview.longName}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/dashboard" className="hover:text-blue-400" onClick={() => setSelectedStock(null)}>
              Dashboard
            </Link>
            <Link to="/watchlist" className="hover:text-blue-400">Watchlist</Link>
            <Link to="/portfolio" className="hover:text-blue-400">Portfolio</Link>
            <Link to="/settings" className="hover:text-blue-400">Settings</Link>

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

