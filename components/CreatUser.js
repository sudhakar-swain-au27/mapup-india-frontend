import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const UserCreationModal = ({ open, onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://fallback-url.com';

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.fullName.trim()) formErrors.fullName = 'Full Name is required';
    if (!formData.username.trim()) formErrors.username = 'Username is required';
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) formErrors.email = 'Invalid email';
    if (formData.password.length < 8) formErrors.password = 'Password must be at least 8 characters';
    return formErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await axios.post(
        `${apiUrl}/api/auth/createUser`,
        { ...formData },
        { headers: { 'Content-Type': 'application/json' } }
      );
      onUserCreated();
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('User creation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle className="text-center font-bold text-2xl text-purple-700">Create User</DialogTitle>
      <DialogContent className="flex flex-col items-center space-y-4 p-4">
        <TextField
          label="Full Name"
          fullWidth
          value={formData.fullName}
          onChange={handleChange('fullName')}
          error={!!errors.fullName}
          helperText={errors.fullName}
          variant="outlined"
          margin="dense"
        />
        <TextField
          label="Username"
          fullWidth
          value={formData.username}
          onChange={handleChange('username')}
          error={!!errors.username}
          helperText={errors.username}
          variant="outlined"
          margin="dense"
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange('email')}
          error={!!errors.email}
          helperText={errors.email}
          variant="outlined"
          margin="dense"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleChange('password')}
          error={!!errors.password}
          helperText={errors.password}
          variant="outlined"
          margin="dense"
        />
        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel>Role</InputLabel>
          <Select value={formData.role} onChange={handleChange('role')} label="Role">
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions className="flex justify-center space-x-4 p-4">
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserCreationModal;
