import React from 'react';
import { Container, Typography } from '@mui/material';

const AdminLogin = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Login
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Secure login for administrators.
      </Typography>
    </Container>
  );
};

export default AdminLogin;