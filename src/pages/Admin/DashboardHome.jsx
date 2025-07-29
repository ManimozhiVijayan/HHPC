import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', users: 320, services: 180 },
  { month: 'Feb', users: 410, services: 220 },
  { month: 'Mar', users: 290, services: 150 },
  { month: 'Apr', users: 370, services: 200 },
  { month: 'May', users: 450, services: 260 },
  { month: 'Jun', users: 390, services: 210 },
  { month: 'Jul', users: 430, services: 240 },
  { month: 'Aug', users: 470, services: 280 },
];

const DashboardHome = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: 4, // Adds consistent spacing between elements
      p: 3,
    }}
  >
    <Typography variant="h5" gutterBottom>
      Dashboard Overview
    </Typography>

    <Grid
      container
      spacing={3}
      sx={{
        maxWidth: '1200px', // Limit the width of the grid
        justifyContent: 'center', // Center the grid items horizontally
      }}
    >
      {[
        { title: 'Total Users', value: 3200 },
        { title: 'Active Services', value: 85 },
        { title: 'Monthly Reports', value: 24 },
        { title: 'Pending Requests', value: 12 },
      ].map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              textAlign: 'center',
              backgroundColor: '#e3f2fd',
            }}
          >
            <Typography variant="h6">{card.title}</Typography>
            <Typography variant="h4" color="primary">
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>

    <Box
      mt={5}
      sx={{
        width: '100%',
        maxWidth: '1200px', // Limit the width of the chart
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>
        User Growth & Service Usage
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#1976d2" name="New Users" />
          <Line
            type="monotone"
            dataKey="services"
            stroke="#ff9800"
            name="Service Usage"
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Box>
);

export default DashboardHome;
