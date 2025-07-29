import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Divider,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';

const HomePage = () => {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLoginSuccess = (role) => {
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'registered') {
      navigate('/dashboard');
    }
  };

  const services = [
    {
      title: 'Primary Care',
      description: 'Comprehensive healthcare services for patients of all ages.',
      image: '/images/primary-care.png',
    },
    {
      title: 'Specialized Treatment',
      description: 'Expert care from our team of medical specialists.',
      image: '/images/specialized-treatment.jpg',
    },
    {
      title: 'Emergency Services',
      description: '24/7 emergency care when you need it most.',
      image: '/images/emergency-services.jpg',
    },
    {
      title: 'Mental Health Support',
      description: 'Counseling and therapy services for emotional well-being.',
      image: '/images/mental-health.jpg',
    },
    {
      title: 'Home Nursing',
      description: 'Professional nursing care at the comfort of your home.',
      image: '/images/home-nursing.jpg',
    },
    {
      title: 'Elderly Care',
      description: 'Compassionate support and medical care for senior citizens.',
      image: '/images/elderly-care.jpg',
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HHPC Healthcare
          </Typography>
          <Button color="inherit" onClick={() => setLoginOpen(true)}>
            Login
          </Button>
          <Button color="inherit" onClick={() => setRegisterOpen(true)}>
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            backgroundColor: '#1976d2',
            color: '#fff',
            borderRadius: 2,
            mb: 4,
            px: 2,
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Welcome to HHPC Healthcare
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            Providing compassionate, quality healthcare services to our community
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Services Section */}
        <Box
          sx={{
            mt: 6,
            py: 6,
            backgroundColor: '#f0f4ff',
            px: 2,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
          >
            Our Services
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 4, fontSize: { xs: '0.875rem', md: '1rem' } }}
          >
            We offer comprehensive healthcare services designed to meet your needs.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              flexWrap: 'wrap',
              mt: 4,
            }}
          >
            {services.map((service, index) => (
              <Box
                key={index}
                sx={{
                  width: { xs: '100%', sm: '300px' },
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '16px',
                  }}
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', md: '1rem' } }}
                >
                  {service.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Modals */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </Box>
  );
};

export default HomePage;
