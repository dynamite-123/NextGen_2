import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useStock } from '../context/AppContext';
import AuthModal from '../components/LoginPopup';
import StockOverview from '../components/Stock/StockOverview';
import StockChart from '../components/Stock/ChartArea';
import BalanceSheet from '../components/Stock/BalanceSheet';
import CashFlows from '../components/Stock/CashFlow';
import MarketOverview from '../components/market/marketOverview';
import StockAnalysis from '../components/Stock/StockAnalysis';
import StockNews from '../components/Stock/StockNews';

const Dashboard = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { selectedStock,setSelectedStock } = useStock();

  // Check localStorage on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth !== 'true') {
      setIsAuthOpen(true);
    }
  }, []);

  return (
    <>
      {!isAuthenticated && (
        <AuthModal  
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onAuthSuccess={(userData) => {
            console.log("User authenticated successfully!", userData);
            setIsAuthOpen(false);
          }}
        />
      )}

      <div className="container mx-auto mt-8 px-4">
        <div className="space-y-6">
          {selectedStock ? (
            <>
              <StockOverview stock={selectedStock} />
              <StockNews symbol={selectedStock.symbol}/>
              <StockChart stock={selectedStock} />
              <BalanceSheet stock={selectedStock} />
              <CashFlows stock={selectedStock} />
            </>
          ) : (
            <>
              <MarketOverview />
              <StockAnalysis />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;