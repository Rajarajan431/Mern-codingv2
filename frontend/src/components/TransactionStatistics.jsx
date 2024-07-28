import React from 'react';


const TransactionStatistics = ({ statistics }) => {

  const data = statistics;

  return (

    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 
      gap-4 mb-4 pb-3 pt-3 border-x-2 flex-col border-y-2 rounded-xl p-4 ">

    <div className="bg-white rounded-lg border-x-2 border-y-2 p-4 shadow-md">
      <h2 className="text-lg font-bold">Total Sale Amount</h2>
      <p className="text-gray-600">{data?.statistics?.totalSaleAmount}</p>
    </div>

    <div className="bg-white rounded-lg border-x-2 border-y-2 p-4 shadow-md">
      <h2 className="text-lg font-bold">Total Sold Items</h2>
      <p className="text-gray-600">{data?.statistics?.totalSoldItems}</p>
    </div>
    
    <div className="bg-white rounded-lg border-x-2 border-y-2 p-4 shadow-md">
      <h2 className="text-lg font-bold">Total Not Sold Items</h2>
      <p className="text-gray-600">{data?.statistics?.totalNotSoldItems}</p>
    </div>
  </div>

  );
};

export default TransactionStatistics;