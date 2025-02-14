import { useStock } from "../../context/AppContext";

const StockOverview = ({ stock }) => {
  // Format large numbers with commas and appropriate suffixes
  const formatNumber = (num) => {
    if (!num) return 'N/A';
    if (num >= 1e9) {
      return `${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `${(num / 1e6).toFixed(2)}M`;
    } else if (num >= 1e3) {
      return `${(num / 1e3).toFixed(2)}K`;
    }
    return num.toFixed(2);
  };

  // Safe number formatting helper
  const formatDecimal = (num) => {
    return num ? num.toFixed(2) : 'N/A';
  };

  // Early return if stock is undefined
  if (!stock) {
    return <div className="bg-gray-700 p-6 rounded-lg">Loading...</div>;
  }

  return (
    <div className="bg-gray-700 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-white mb-6">
        {stock.overview.longName || 'Unknown Company'}
      </h3>
      
      {/* Main Price Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <p className="text-gray-400">Current Price ({stock.overview.currency || 'INR'})</p>
          <p className={`text-3xl font-bold ${(stock.overview.regularMarketChangePercent || 0) < 0 ? "text-red-500" : "text-green-500"}`}>
            {formatDecimal(stock.overview.regularMarketPreviousClose)}
          </p>
          <p className={`text-lg ${(stock.overview.regularMarketChangePercent || 0) < 0 ? "text-red-400" : "text-green-400"}`}>
            {formatDecimal(stock.overview.regularMarketChangePercent)}%
          </p>
        </div>

        {/* Moving Averages */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">50 Day Average</span>
            <span className="text-white">{formatDecimal(stock.overview.fiftyDayAverage)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">200 Day Average</span>
            <span className="text-white">{formatDecimal(stock.overview.twoHundredDayAverage)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">52 Week Range</span>
            <span className="text-white">
              {formatDecimal(stock.overview.fiftyTwoWeekLow)} - {formatDecimal(stock.overview.fiftyTwoWeekHigh)}
            </span>
          </div>
        </div>
      </div>

      {/* Financial Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-600">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Market Cap</span>
            <span className="text-white">{formatNumber(stock.overview.marketCap)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">P/E Ratio</span>
            <span className="text-white">{formatDecimal(stock.overview.trailingPE)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">P/B Ratio</span>
            <span className="text-white">{formatDecimal(stock.overview.priceToBook)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Book Value</span>
            <span className="text-white">{formatDecimal(stock.overview.bookValue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Dividend Rate</span>
            <span className="text-white">{formatDecimal(stock.overview.dividendRate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Previous Close</span>
            <span className="text-white">{formatDecimal(stock.overview.regularMarketPreviousClose)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockOverview;