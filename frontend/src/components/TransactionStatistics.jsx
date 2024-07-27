import React from 'react';


const TransactionStatistics = ({ statistics }) => {

  const data = statistics;

  return (
    <div className="">

    <div className="flex flex-wrap md:flex-nowrap justify-center mb-4">
      <div className="mt-10 bg-white rounded shadow-md p-4 w-full md:w-1/3 xl:w-1/4 mr-4 mb-4 md:mb-0">
        <h2 className="text-lg font-bold">Total Sale Amount</h2>
        <p className="text-gray-600">{data?.statistics?.totalSaleAmount}</p>
      </div>
      <div className="mt-10 bg-white rounded shadow-md p-4 w-full md:w-1/3 xl:w-1/4 mr-4 mb-4 md:mb-0">
        <h2 className="text-lg font-bold">Total Sale Amount</h2>
        <p className="text-gray-600">{data?.statistics?.totalSaleAmount}</p>
      </div>
      <div className="mt-10 bg-white rounded shadow-md p-4 w-full md:w-1/3 xl:w-1/4 mb-4 md:mb-0">
        <h2 className="text-lg font-bold">Total Sale Amount</h2>
        <p className="text-gray-600">{data?.statistics?.totalSaleAmount}</p>
      </div>
    </div>

    </div>
  );
};

export default TransactionStatistics;