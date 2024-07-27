import React from 'react';

import { TableContainer, Table, TableHead, TableRow, TableCell, Button, Paper, TableBody } from '@mui/material';


const TransactionTable = ({ transactions }) => {
 

  // render the table with transactions data
  return (
    <div className="">
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
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.products?.map((item) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionTable;