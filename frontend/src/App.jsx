import React, { useState, useEffect } from 'react';

//components
import TransactionTable from './components/TransactionTable';
import TransactionStatistics from './components/TransactionStatistics';
import TransactionBarChart from './components/TransactionBarChart';
import TransactionPieChart from './components/TransactionPieChart';

function App() {
  const [month, setMonth] = useState('March');
  const [searchText, setSearchText] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    fetchTransactions();
    
  }, [month]);

  const fetchTransactions = async () => {
    const response = await fetch(`http://localhost:3000/api/listings/getCombinedData/${month}`);
    const data = await response.json();
    
    setTransactions(data);
    setStatistics(data);
    setBarChartData(data);
    setPieChartData(data);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">

      <h1 className='font-bold text-3xl mb-10 flex justify-center'>Transaction Board</h1>

      <div className="flex justify-between mb-4">
        <select value={month} onChange={handleMonthChange} className="bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded">
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <input 
          type="search" 
          value={searchText} 
          onChange={handleSearch} 
          placeholder="Search transactions" 
          className="bg-white border border-gray-400 hover:border-gray-500 
            px-4 py-2 pr-8 rounded" />
      </div>


      
     <div className="grid grid-cols-1 md:grid-cols-2 
        lg:grid-cols-3 xl:grid-cols-3 gap-4 items-center">    

        <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3">
          <TransactionTable transactions={transactions} />
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 w-full h-full mt-10">
          <TransactionStatistics statistics={statistics} />
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 w-full h-full">
          <div className="h-full w-full" style={{height: "100%", width: "100%"}}>
            <TransactionBarChart barChart={barChartData} />
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 w-full h-full">
          <div className="h-full w-full" style={{height: "100%", width: "100%"}}>
            <TransactionPieChart pieChart={pieChartData} />
          </div>
        </div>
    
      </div>
      
    </div>
  );
}

export default App;