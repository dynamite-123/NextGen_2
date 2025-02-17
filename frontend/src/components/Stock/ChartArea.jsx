import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';

const transformStockData = (stockData) => {
  const { overview, balanceSheet, cashFlow } = stockData;
  
  if (!balanceSheet || !cashFlow || !overview) {
    console.error('Missing required data in stockData');
    return { financialMetrics: [] };
  }

  // Sort balance sheet and cash flow data by date
  const sortedBalanceSheet = [...balanceSheet].sort((a, b) => 
    new Date(a.asOfDate) - new Date(b.asOfDate)
  );

  const sortedCashFlow = [...cashFlow].sort((a, b) => 
    new Date(a.asOfDate) - new Date(b.asOfDate)
  );

  // Transform and combine the data
  const financialMetrics = sortedBalanceSheet.map((sheet, index) => {
    const matchingCashFlow = sortedCashFlow.find(flow => 
      flow.asOfDate.split(' ')[0] === sheet.asOfDate.split(' ')[0]
    );

    return {
      date: sheet.asOfDate.split(' ')[0],
      totalAssets: sheet.TotalAssets,
      totalDebt: sheet.TotalDebt,
      equity: sheet.StockholdersEquity,
      operatingCashFlow: matchingCashFlow?.OperatingCashFlow || null,
      netIncome: matchingCashFlow?.NetIncome || null
    };
  });

  return { financialMetrics };
};

const formatCrores = (value) => {
  if (value === null || value === undefined) return '-';
  return `₹${value.toFixed(2)} Cr`;
};

const StockChart = ({ stock }) => {
  const { financialMetrics } = transformStockData(stock);
  
  if (financialMetrics.length === 0) {
    return <div className="text-center p-4 text-gray-500">No data available for chart</div>;
  }

  return (
<div className="w-full h-64 md:h-96 lg:h-[32rem]">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      data={financialMetrics}
      margin={{ top: 20, right: 40, left: 50, bottom: 40 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="date" 
        tick={{ fill: '#9CA3AF', fontSize: 12 }} 
        angle={-45}
        textAnchor="end" 
        interval="preserveStartEnd"
        tickLine={false}
      />
      <YAxis 
        tick={{ fill: '#9CA3AF', fontSize: 12 }}
        label={{ 
          value: 'Amount (Crores)', 
          angle: -90, 
          position: 'insideLeft', 
          dy: -10,
          fill: '#9CA3AF' 
        }}
        tickFormatter={value => {
          const formatted = value.toFixed(7);
          return `₹${formatted.slice(0, -5)}`;
        }}
        padding={{ top: 10, bottom: 10 }}
        tickLine={false} 
      />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: '#1F2937',
          border: '1px solid #374151',
          borderRadius: '0.375rem',
          color: '#E5E7EB',
        }}
        labelStyle={{ color: '#9CA3AF' }}
        itemStyle={{ color: '#9CA3AF' }}
        formatter={formatCrores}
      />
      <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: 12 }} />
      <Line type="monotone" dataKey="totalAssets" stroke="#60A5FA" name="Total Assets" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="totalDebt" stroke="#F87171" name="Total Debt" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="equity" stroke="#34D399" name="Equity" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="operatingCashFlow" stroke="#A78BFA" name="Operating Cash Flow" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="netIncome" stroke="#FBBF24" name="Net Income" dot={false} strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
</div>
  );
};

export default StockChart;