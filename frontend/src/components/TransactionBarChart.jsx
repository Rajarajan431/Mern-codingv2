import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TransactionBarChart = ({ barChart }) => {

  const Data = barChart.map(item => ({
    range: item.priceRange,
    count: item.count,
  }));

  return (
    <div className="flex justify-center items-center h-100 border-x-2 border-y-2 mt-5 rounded-xl p-2">
      <BarChart
        width={600}
        height={300}
        data={Data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
        barSize={50}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" name="Number of Items" />
      </BarChart>
    </div>
  );
};

export default TransactionBarChart;
