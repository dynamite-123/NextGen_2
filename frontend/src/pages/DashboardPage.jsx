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

const Dashboard = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { selectedStock } = useStock();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
    }
  }, [isAuthenticated]);

  return (
    <>
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => {
          if (isAuthOpen) {
            setIsAuthOpen(false);
          }
        }}
      />

      <div className="container mx-auto mt-8 px-4">
        <div className="space-y-6">
          {isAuthenticated ? (
            selectedStock ? (
              <>
                <StockOverview stock={selectedStock} />
                <StockChart stock={selectedStock} />
                <BalanceSheet stock={selectedStock} />
                <CashFlows stock={selectedStock} />
              </>
            ) : (
              <>
                <MarketOverview />
                <StockAnalysis />
              </>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="container mx-auto mt-8 px-4"
            >
              <>
                <MarketOverview />
                <StockAnalysis />
              </>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;