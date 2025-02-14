import React from 'react';
import { MarketOverview } from '../components/market/marketOverview';
import { NewsFeed } from '../components/News/NewsFeed';
import { StockAnalysis } from '../components/Stock/StockAnalysis';
import LandingPage from './LandingPage';
import { useStock } from '../context/AppContext';
import StockOverview from '../components/Stock/StockOverview';
import StockChart from '../components/Stock/ChartArea';
import BalanceSheet from '../components/Stock/BalanceSheet';
import CashFlows from '../components/Stock/CashFlow';
//import { SearchBar } from '../components/SearchBar';

const DashboardPage = () => {
   const {selectedStock } = useStock();
  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="space-y-6">
       {/* Render StockOverview only if a stock is selected */}
      {/* Render StockOverview only if a stock is selected */}
{selectedStock ? (
  <>
  <StockOverview stock={selectedStock} />
  <StockChart stock = {selectedStock}/>
  <BalanceSheet stock = {selectedStock}/>
  <CashFlows stock = {selectedStock}/>
  </>
) : (
  <>
    <MarketOverview />
    <StockAnalysis />
  </>
)}

      </div>
    </div>
  );
};

export default DashboardPage;