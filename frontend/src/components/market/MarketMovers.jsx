import { useEffect, useState } from "react";
import axios from "axios";

const MarketMovers = ({ type }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketMovers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/market-movers");
        const data = type === "gainers" ? response.data.gainers : response.data.losers;
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketMovers();
  }, [type]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {type === "gainers" ? "Top Gainers" : "Top Losers"}
      </h2>

      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        <div className="space-y-4">
          {stocks.map((stock, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-300">{stock.name}</span>
              <span className={`${type === "gainers" ? "text-green-500" : "text-red-500"}`}>
                {stock.percentChange}
              </span>
              <span className="text-gray-400">{stock.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketMovers;
