import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  Container,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // New state for "Keep me logged in"
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        username,
        password,
      });

      // Store token based on "Keep me logged in" checkbox
      const storage = keepLoggedIn ? localStorage : sessionStorage;
      storage.setItem('token', response.data.token);

      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.response?.data.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <img src="/mapup.png" alt="MapUp" width={50} />
        </Box>

        <Typography component="h1" variant="h5" align="center" color="primary" fontWeight="bold">
          Hi, Welcome Back
        </Typography>
        <Typography align="center" color="textSecondary" variant="body2" mb={4}>
          Enter your credentials to continue
        </Typography>

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email Address / Username"
            variant="outlined"
            margin="normal"
            autoComplete="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center">
              <Checkbox
                color="primary"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              <Typography variant="body2">Keep me logged in</Typography>
            </Box>
            <Link href="#" variant="body2" sx={{ color: 'purple' }}>
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading} // Disable button while loading
            sx={{
              backgroundColor: 'purple',
              color: 'white',
              borderRadius: '24px',
              paddingY: 1,
              '&:hover': {
                backgroundColor: 'darkviolet',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
          </Button>

          {error && (
            <Typography color="error" align="center" mt={2}>
              {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
