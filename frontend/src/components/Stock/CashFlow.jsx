export default function CashFlows({stock}) {
  const data = [
    { category: "Cash from Operating Activity", values: stock.cashFlow.map(item => item.OperatingCashFlow) },
    { category: "Cash from Investing Activity", values: stock.cashFlow.map(item => item.InvestingCashFlow) },
    { category: "Cash from Financing Activity", values: stock.cashFlow.map(item => item.FinancingCashFlow) },
    { category: "Net Income", values: stock.cashFlow.map(item => item.NetIncome) }
  ];

  const years = stock.cashFlow.map(item => {
    const year = item.asOfDate.split("-")[0]; // Extract the year
    return item.asOfDate.includes("12-31") ? `Dec ${year}` : `Mar ${year}`;
  });

  return (
    <section id="cash-flow" className="bg-gray-800 text-white rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Cash Flows</h2>
          <p className="text-gray-400 text-sm">
            Consolidated Figures in Rs. Crores 
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-2 text-left">Category</th>
              {years.map((year, index) => (
                <th key={index} className="border border-gray-700 px-4 py-2">{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}>
                <td className="border border-gray-600 px-4 py-2 font-medium">{row.category}</td>
                {row.values.map((value, colIndex) => (
                  <td key={colIndex} className="border border-gray-600 px-4 py-2 text-center">
                    {value !== null ? value.toLocaleString() : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
