import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, Button, Paper, TableBody } from '@mui/material';

const TransactionTable = ({ transactions }) => {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const monthsArray = [];
    transactions?.products?.forEach((product) => {
      const date = new Date(product.dateOfSale);
      if (!isNaN(date.getTime())) {
        const month = date.toLocaleString('default', { month: 'long' });
        if (!monthsArray.includes(month)) {
          monthsArray.push(month);
        }
      }
    });
    setMonths(monthsArray);
  }, [transactions]);

  useEffect(() => {
    if (selectedMonth === '') {
      setFilteredTransactions(transactions?.products);
    } else {
      const filteredTransactions = transactions?.products?.filter((product) => {
        const date = new Date(product.dateOfSale);
        if (!isNaN(date.getTime())) {
          const month = date.toLocaleString('default', { month: 'long' });
          return month === selectedMonth;
        }
        return false;
      });
      console.log('Filtered transactions:', filteredTransactions);
      setFilteredTransactions(filteredTransactions);
    }
  }, [selectedMonth, transactions]);

  const handleMonthChange = (month) => {
    console.log('Selected month:', month);
    setSelectedMonth(month);
  };

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        {months?.map((month) => (
          <Button key={month} onClick={() => handleMonthChange(month)}>
            {month}
          </Button>
        ))}
        <Button onClick={() => handleMonthChange('')}>All</Button>
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
              <TableCell>Image URLs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions?.map((item) => (
              <TableRow key={item._id}>
                <TableCell style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item?.title}
                </TableCell>
                <TableCell style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item?.description}
                </TableCell>
                <TableCell>{item?.price}</TableCell>
                <TableCell>{item?.category}</TableCell>
                <TableCell>{item?.sold.toString()}</TableCell>
                <TableCell>
                  {item?.imageUrls?.length > 0 ? (
                    item.imageUrls.join(', ')
                  ) : (
                    'No Image'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionTable;
