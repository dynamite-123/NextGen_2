const MarketMovers = ({ type }) => {
  const stocks = [
    { name: "Nestle", percentChange: "+0.89%", price: "₹2,196.85" },
    { name: "HCL Tech", percentChange: "+0.48%", price: "₹1,711.25" },
    { name: "TCS", percentChange: "+0.35%", price: "₹3,923.75" },
    { name: "Britannia", percentChange: "+0.30%", price: "₹4,903.55" },
    { name: "Bharat Elec", percentChange: "-4.11%", price: "₹250.80" },
    { name: "Adani Ports", percentChange: "-4.03%", price: "₹1,066.80" },
    { name: "Adani Enterpris", percentChange: "-3.61%", price: "₹2,163.60" },
    { name: "Shriram Finance", percentChange: "-3.15%", price: "₹531.35" }
  ];

  const filteredStocks = type === "gainers"
    ? stocks.filter(stock => stock.percentChange.includes("+"))
    : stocks.filter(stock => stock.percentChange.includes("-"));

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {type === "gainers" ? "Top Gainers" : "Top Losers"}
      </h2>

      <div className="space-y-4">
        {filteredStocks.map((stock, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-300">{stock.name}</span>
            <span className={`${stock.percentChange.includes("+") ? "text-green-500" : "text-red-500"}`}>
              {stock.percentChange}
            </span>
            <span className="text-gray-400">{stock.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketMovers;