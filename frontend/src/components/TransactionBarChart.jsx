import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TransactionBarChart = ({ barChart }) => {
  const data = barChart?.barChartData;

  return (
    <div className="flex justify-center items-center h-100 
      border-x-2 border-y-2 mt-5 rounded-xl p-2">
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TransactionBarChart;