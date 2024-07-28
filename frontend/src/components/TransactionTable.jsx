import React, { useState, useEffect } from 'react';

import { TableContainer, Table, TableHead, TableRow, TableCell, Button, Paper, TableBody } from '@mui/material';

const TransactionTable = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [paginatedTransactions, setPaginatedTransactions] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const monthsArray = [];
    transactions?.products?.forEach((product) => {
      const date = new Date(product.createdAt);
      const month = date.toLocaleString('default', { month: 'long' });
      if (!monthsArray.includes(month)) {
        monthsArray.push(month);
      }
    });
    setMonths(monthsArray);
  }, [transactions]);

  useEffect(() => {
    const filteredTransactions = transactions?.products?.filter((product) => {
      const date = new Date(product.createdAt);
      const month = date.toLocaleString('default', { month: 'long' });
      return month === selectedMonth;
    });
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setPaginatedTransactions(filteredTransactions?.slice(startIndex, endIndex));
  }, [currentPage, rowsPerPage, selectedMonth, transactions]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setCurrentPage(1);
  };

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        {months?.map((month) => (
          <Button key={month} onClick={() => handleMonthChange(month)}>
            {month}
          </Button>
        ))}
      
      </div>
      <TableContainer component={Paper} style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sold</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions?.map((item) => (
              <TableRow key={item.id}>
                <TableCell style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item?.title}
                </TableCell>
                <TableCell style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item?.description}
                </TableCell>
                <TableCell>{item?.price}</TableCell>
                <TableCell>{item?.category}</TableCell>
                <TableCell>{item?.sold.toString()}</TableCell>
                <TableCell>{item?.image}</TableCell>
                <TableCell className={isNaN(new Date(item.createdAt).getTime()) ? 'hidden' : 'block'}>
                  {new Date(item.createdAt).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-4">
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button onClick={handleNextPage} disabled={currentPage * rowsPerPage >= transactions?.products?.length}>
            Next
          </Button>
        </div>
      </TableContainer>
    </div>
  );
};

export default TransactionTable;