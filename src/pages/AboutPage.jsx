import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const AboutPage = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Learn more about our mission and services.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Providing compassionate, quality healthcare services to our community.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body2" color="text.secondary">
                To be the leading healthcare provider in the region.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Our Values
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Compassion, Excellence, Integrity, and Innovation.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutPage;