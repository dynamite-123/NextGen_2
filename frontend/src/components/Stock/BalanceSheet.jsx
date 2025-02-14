import React from "react";


const BalanceSheet = ({stock}) => {
  const balanceSheetData = [
    { label: "Stockholders Equity", values: stock.balanceSheet.map(item => item.StockholdersEquity) },
    { label: "Total Assets",values: stock.balanceSheet.map(item => item.TotalAssets) },
    { label: "Total Debt", values: stock.balanceSheet.map(item => item.TotalDebt) },
    { label: "Current Assets", values: stock.balanceSheet.map(item => item.CurrentAssets) },
    { label: "Total Capitalization", values: stock.balanceSheet.map(item => item.TotalCapitalization) }
  ];
  
  const years = stock.balanceSheet.map(item => `Mar ${item.asOfDate.split("-")[0]}`);
  return (
    <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg w-full overflow-auto">
      <h2 className="text-2xl font-bold mb-2">Balance Sheet</h2>
      <p className="text-sm text-gray-400 mb-4">Consolidated Figures in Rs. Crores</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="border border-gray-700 p-2 text-left">Category</th>
              {years.map((year, index) => (
                <th key={index} className="border border-gray-700 p-2 text-center">{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {balanceSheetData.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}>
                <td className="border border-gray-700 p-2 text-left font-medium">{row.label}</td>
                {row.values.map((value, valueIndex) => (
                  <td key={valueIndex} className="border border-gray-700 p-2 text-center">{value !== null ? value.toLocaleString() : '-'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BalanceSheet;  