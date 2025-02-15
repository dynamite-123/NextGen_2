import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useStock } from '../../context/AppContext';

const DialogModal = ({ isOpen, onClose, title, message, primaryAction, primaryLabel, secondaryLabel = "Cancel" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">
          {message}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {secondaryLabel}
          </button>
          <button
            onClick={primaryAction}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { searchQuery, searchResults, isLoading, handleSearchChange, clearSearch, setSelectedStock } = useStock();
  const { isAuthenticated, logout } = useAuth();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const navigate = useNavigate();

  const clearSearchState = () => {
    setLocalSearchQuery('');
    setSuggestions([]);
    clearSearch();
  };

  const fetchSuggestions = async (query) => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/stock-suggestions/?symbol=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch suggestions');
      const data = await response.json();
      setSuggestions(data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleSearchChangeInput = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    debouncedFetchSuggestions(value);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      clearSearchState();
    }
  }, [isAuthenticated]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && localSearchQuery.trim()) {
      if (!isAuthenticated) {
        setSelectedSymbol(localSearchQuery);
        setIsLoginPromptOpen(true);
        return;
      }
      handleSearchChange(e);
      
      setSuggestions([]);
    }
  };

  const handleSymbolSelect = (symbol) => {
    if (!isAuthenticated) {
      setSelectedSymbol(symbol);
      setIsLoginPromptOpen(true);
      return;
    }
    setLocalSearchQuery(symbol);
    setSuggestions([]);
    handleSearchChange({ target: { value: symbol } });
  };

  const handleStockSelect = (stock) => {
    if (!isAuthenticated) {
      setSelectedSymbol(stock.symbol);
      setIsLoginPromptOpen(true);
      return;
    }
    setSelectedStock(stock);
    clearSearch();
  };

  const handleLoginPromptConfirm = () => {
    setIsLoginPromptOpen(false);
    clearSearchState();
    navigate('/login', { 
      state: { 
        from: location.pathname,
        searchQuery: selectedSymbol 
      }
    });
  };

  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      clearSearchState();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
      setIsLogoutDialogOpen(false);
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
              
              {suggestions.length > 0 && (
                <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg overflow-auto z-50">
                  {suggestions.map((symbol) => (
                    <div
                      key={symbol}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
                      onClick={() => handleSymbolSelect(symbol)}
                    >
                      {symbol}
                    </div>
                  ))}
                </div>
              )}

              {searchResults.length > 0 && searchQuery && !suggestions.length && (
                <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto z-50">
                  {searchResults.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
                      onClick={() => handleStockSelect(stock)}
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
                onClick={handleLogoutClick}
                disabled={isLoggingOut}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
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

      <DialogModal
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        title="Confirm Logout"
        message="Are you sure you want to log out? You'll need to sign in again to access your account."
        primaryAction={handleLogoutConfirm}
        primaryLabel={isLoggingOut ? "Logging out..." : "Logout"}
        secondaryLabel="Cancel"
      />

      <DialogModal
        isOpen={isLoginPromptOpen}
        onClose={() => {
          setIsLoginPromptOpen(false);
          clearSearchState();
        }}
        title="Login Required"
        message="Please log in to view detailed stock information and add stocks to your watchlist."
        primaryAction={handleLoginPromptConfirm}
        primaryLabel="Log In"
        secondaryLabel="Cancel"
      />
    </div>
  );
};

export default Navbar;