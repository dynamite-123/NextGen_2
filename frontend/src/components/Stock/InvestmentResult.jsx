const InvestmentResult = ({ data }) => {
  if (!data || !data.stocks) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {data.stocks.map((stock, index) => (
        <div key={index} className="bg-gray-700 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">{stock.company_name} ({stock.stock_symbol})</h3>
          <p className="text-sm text-gray-300">{stock.market_cap_category} - {stock.primary_sector}</p>
          <p className="mt-2 text-gray-200">{stock.reason}</p>
        </div>
      ))}
      <div className="col-span-full text-center text-gray-400 text-sm mt-4">
        {data.disclaimer}
      </div>
    </div>
  );
};

export default InvestmentResult; 