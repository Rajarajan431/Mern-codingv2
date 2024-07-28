import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#2ca02c'];

const TransactionPieChart = ({ pieChart }) => {
  const data = pieChart

  // Check if data exists and has elements
  if (!data || data.length === 0) {
    return <div className="flex justify-center items-center h-100 bg-gray-100 mt-5">No data available</div>;
  }

  return (
    <div className="flex justify-center items-center h-100 
      border-x-2 border-y-2 mt-5 rounded-xl">
      <PieChart width={600} height={310}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="_id"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default TransactionPieChart;
