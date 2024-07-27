import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const TransactionPieChart = ({ pieChartData }) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={pieChartData}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        dataKey="count"
      >
        {pieChartData.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default TransactionPieChart;