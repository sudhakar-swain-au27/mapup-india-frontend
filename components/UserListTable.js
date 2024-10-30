import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  CircularProgress,
  TablePagination,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const UserListTable = React.memo(() => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/api/auth/user-lists`);
      setUserData(response.data.users || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  }, []);
  

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleEdit = useCallback((userId) => {
    console.log('Edit user:', userId);
  }, []);

  const handleDelete = useCallback(async (userId) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await axios.delete(`${apiUrl}/api/auth/user-lists/${userId}`);
      setUserData((prevData) => prevData.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }, []);
  

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = useMemo(() => {
    return userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rowsPerPage, userData]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper elevation={4} style={{ padding: '24px', borderRadius: '10px' }}>
      {/* Title Section */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <Typography
          variant="h5"
          style={{
            fontWeight: 'bold',
            color: '#3f51b5',
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          }}
        >
          User Management
        </Typography>
      </div>

      {error ? (
        <Typography color="error" align="center" style={{ marginBottom: '20px' }}>
          {error}
        </Typography>
      ) : (
        <>
          {/* Table Section */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                  {['Full Name', 'Username', 'Email', 'Role', 'Created By', 'Created Date', 'Actions'].map((head) => (
                    <TableCell key={head} style={{ fontWeight: 'bold', color: '#333' }}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((user) => (
                  <TableRow key={user._id} hover style={{ backgroundColor: '#fafafa' }}>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.createdBy}</TableCell>
                    <TableCell>{new Date(user.createdDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleEdit(user._id)}>
                        <Edit fontSize="inherit" />
                      </IconButton>
                      <IconButton color="secondary" aria-label="delete" size="small" onClick={() => handleDelete(user._id)}>
                        <Delete fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Section */}
          <TablePagination
            component="div"
            count={userData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 15]}
          />
        </>
      )}
    </Paper>
  );
});

export default UserListTable;
