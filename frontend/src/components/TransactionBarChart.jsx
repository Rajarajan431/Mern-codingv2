import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const TransactionBarChart = ({ barChartData }) => {
  const chartData = barChartData;

  return (
    <BarChart width={1000} height={400} data={chartData} >
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="priceRange" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default TransactionBarChart;