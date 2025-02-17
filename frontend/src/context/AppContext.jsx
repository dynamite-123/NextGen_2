import React, { createContext, useContext, useState, useEffect,useCallback } from 'react';

const AuthContext = createContext(null);
const StockContext = createContext(null);
const MarketContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Auth state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Check authentication status on initial load
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('userData');
    
    if (storedAuth === 'true' && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    // Clear auth states
    setUser(null);
    setIsAuthenticated(false);

    // Clear local storage
    localStorage.clear(); // Clear all storage instead of individual items

    // Clear all search and stock related states
    setSearchQuery('');
    setSearchResults([]);
    setSelectedStock(null);
    setIsLoading(false);

    // Force a page reload to clear any remaining state
    window.location.href = '/dashboard';
  }, []);

// ... existing code ...

  // Stock search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedStock(null);
  }, []);

  // Market overview state
  const [niftyData, setNiftyData] = useState([]);
  const [marketLoading, setMarketLoading] = useState(true);
  const [marketError, setMarketError] = useState(null);

  // ✅ Fetch & Parse NIFTY50 Data from Yahoo Finance API
  useEffect(() => {
    const fetchNiftyData = async () => {
      try {
        setMarketLoading(true);
        const response = await fetch('http://localhost:5000/nifty50');

        if (!response.ok) {
          throw new Error('Failed to fetch NIFTY50 data');
        }

        const data = await response.json();

        // Validate the Yahoo Finance API response structure
        if (!data.chart?.result?.[0]) {
          throw new Error("Invalid API response structure: Missing chart data");
        }

        const result = data.chart.result[0];
        const timestamps = result.timestamp || [];
        const quotes = result.indicators?.quote?.[0] || {};
        
        // Transform the data into the required format
        const transformedData = timestamps.map((timestamp, index) => ({
          date: new Date(timestamp * 1000).toLocaleDateString(),
          open: quotes.open?.[index] ?? null,
          high: quotes.high?.[index] ?? null,
          low: quotes.low?.[index] ?? null,
          close: quotes.close?.[index] ?? null,
          volume: quotes.volume?.[index] ?? null,
        })).filter(item => 
          item.open !== null && 
          item.high !== null && 
          item.low !== null && 
          item.close !== null
        );
        setNiftyData(transformedData);
        
      } catch (err) {
        console.error("Error fetching Nifty 50 data:", err);
        setMarketError(err.message);
        setNiftyData([]); // Set empty array on error
      } finally {
        setMarketLoading(false);
      }
    };

    fetchNiftyData();
    const interval = setInterval(fetchNiftyData, 60000); // Refresh every 60 sec

    return () => clearInterval(interval);
  }, []);

  

  // Debounce function for search
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Stock search function
const searchStocks = async (query) => {
  if (!query?.trim()) {
    setSearchResults([]);
    return;
  }

  if (!isAuthenticated) {
    return false;
  }

  try {
    setIsLoading(true);
    const API_ENDPOINT = 'http://localhost:8000/api/stock/';
    const response = await fetch(`${API_ENDPOINT}?symbol=${encodeURIComponent(query.trim())}.NS`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
    
    if (data?.overview && data?.balanceSheet && data?.cashFlow) {
      setSelectedStock({
        overview: data.overview,
        balanceSheet: data.balanceSheet,
        cashFlow: data.cashFlow
      });
      setSearchResults([data]); // Update search results with the full data
    } else {
      console.warn("API response does not contain expected fields.");
      setSelectedStock(null);
      setSearchResults([]);
    }
  } catch (error) {
    console.error('Error fetching stocks:', error);
    setSearchResults([]);
    setSelectedStock(null);
  } finally {
    setIsLoading(false);
  }
};

// Debounced search function
const debouncedSearch = debounce(searchStocks, 300);

const handleSearchChange = useCallback((e) => {
  const query = e.target.value;
  setSearchQuery(query);
  
  if (!query.trim()) {
    clearSearch();
    return;
  }

  debouncedSearch(query);
}, [clearSearch, debouncedSearch]);


  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    clearSearch();
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated,setIsAuthenticated }}>
      <StockContext.Provider 
        value={{
          searchQuery,
          searchResults,
          isLoading,
          handleSearchChange,
          clearSearch,
          selectedStock,
          setSelectedStock,
          
        }}
      >
        <MarketContext.Provider
          value={{
            niftyData,
            marketLoading,
            marketError
          }}
        >
          {children}
        </MarketContext.Provider>
      </StockContext.Provider>
    </AuthContext.Provider>
  );
};

// Custom hooks for using context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AppProvider');
  }
  return context;
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within an AppProvider');
  }
  return context;
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within an AppProvider');
  }
  return context;
};