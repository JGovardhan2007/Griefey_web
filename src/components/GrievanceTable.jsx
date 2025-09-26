
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material';

const GrievanceTable = ({ grievances }) => {
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Get unique, valid categories and statuses for filters
  const categories = [...new Set(grievances.map(g => g.category).filter(Boolean))];
  const statuses = [...new Set(grievances.map(g => g.status).filter(Boolean))];


  const filteredGrievances = grievances.filter(grievance => {
    return (
      (filterCategory ? grievance.category === filterCategory : true) &&
      (filterStatus ? grievance.status === filterStatus : true)
    );
  });

  return (
    <Paper>
        <Box sx={{ p: 2, display: 'flex', gap: 2}}>
        <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
            value={filterCategory}
            label="Category"
            onChange={(e) => setFilterCategory(e.target.value)}
            >
            <MenuItem value=""><em>All Categories</em></MenuItem>
            {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
            </Select>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
            >
            <MenuItem value=""><em>All Statuses</em></MenuItem>
            {statuses.map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
            </Select>
        </FormControl>
        </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Submitted At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGrievances.length > 0 ? (
              filteredGrievances.map((grievance) => (
                <TableRow key={grievance.id} component={Link} to={`/grievance/${grievance.id}`} hover sx={{ textDecoration: 'none' }}>
                  <TableCell>{grievance.category || 'N/A'}</TableCell>
                  <TableCell>
                    {grievance.description 
                      ? (grievance.description.length > 50 ? grievance.description.substring(0, 50) + '...' : grievance.description)
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{grievance.status || 'N/A'}</TableCell>
                  <TableCell>
                    {grievance.submittedAt && grievance.submittedAt.seconds
                      ? new Date(grievance.submittedAt.seconds * 1000).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography>No grievances found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default GrievanceTable;
