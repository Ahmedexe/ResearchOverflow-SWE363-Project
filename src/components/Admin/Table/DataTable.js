import React, { useState } from 'react';
import './DataTable.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, email, role, status, joinDate) {
  return { name, email, role, status, joinDate };
}

const rows = [
  createData('Faisal Alabbas', 'Faisal@gmail.com', 'Researcher', 'Active', '16 August 2024'),
  createData('Faisal Alenezi', 'FMJ@gmail.com', 'Researcher', 'Active', '17 August 2024'),
  createData('Majed Asiri', 'mjd@gmail.com', 'Reader', 'InActive', '4 August 2024'),
];

function DataTable() {
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedRows = [...rows].sort((a, b) => {
    const factor = sortDirection === 'asc' ? 1 : -1;
    return a[sortColumn] > b[sortColumn] ? factor : -factor;
  });

  return (
    <div className="admin-data-table">
      <div className="admin-table-header">
        <h3>Recent Users</h3>
      </div>
      <TableContainer component={Paper} className="admin-table-container-mui">
        <Table sx={{ minWidth: 650 }} aria-label="user data table">
          <TableHead>
            <TableRow>
              <TableCell 
                className="admin-table-header-cell"
                onClick={() => handleSort('name')}
              >
                Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell 
                className="admin-table-header-cell"
                onClick={() => handleSort('email')}
              >
                Email {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell 
                className="admin-table-header-cell"
                onClick={() => handleSort('role')}
              >
                Role {sortColumn === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell 
                className="admin-table-header-cell"
                onClick={() => handleSort('status')}
              >
                Status {sortColumn === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell 
                className="admin-table-header-cell"
                onClick={() => handleSort('joinDate')}
              >
                Join Date {sortColumn === 'joinDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" className="admin-table-cell">
                  {row.name}
                </TableCell>
                <TableCell className="admin-table-cell">{row.email}</TableCell>
                <TableCell className="admin-table-cell">{row.role}</TableCell>
                <TableCell className="admin-table-cell">
                  <span className={`admin-status-badge ${row.status === 'Active' ? 'admin-active' : 'admin-inactive'}`}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell className="admin-table-cell">{row.joinDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DataTable;
