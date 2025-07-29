
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

// Sample data for charts
const serviceUsageData = [
  { name: 'Family Care', usage: 820 },
  { name: 'Pet Sitting', usage: 540 },
  { name: 'Elderly Assistance', usage: 670 },
  { name: 'Childcare Support', usage: 410 },
  { name: 'Dog Walking', usage: 920 },
];

const appointmentTrendsData = [
  { month: 'Jan', appointments: 120 },
  { month: 'Feb', appointments: 150 },
  { month: 'Mar', appointments: 180 },
  { month: 'Apr', appointments: 200 },
  { month: 'May', appointments: 170 },
  { month: 'Jun', appointments: 190 },
];

const reports = Array.from({ length: 10 }, (_, i) => ({
  id: `R${i + 1}`,
  title: `Report ${i + 1}`,
  date: `2023-0${(i % 9) + 1}-28`,
  type: ['Engagement', 'Usage', 'Performance'][i % 3],
  status: ['Completed', 'In Progress'][i % 2],
}));

const Reports = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Reports & Analytics
    </Typography>

    {/* Charts Section */}
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 4 }}>
      {/* Service Usage Bar Chart */}
      <Paper sx={{ p: 2, flex: 1, minWidth: 300, backgroundColor: '#e3f2fd' }}>
        <Typography variant="h6" gutterBottom>
          Service Usage
        </Typography>
        {serviceUsageData && serviceUsageData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={serviceUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No data available for Service Usage.
          </Typography>
        )}
      </Paper>

      {/* Appointment Trends Line Chart */}
      <Paper sx={{ p: 2, flex: 1, minWidth: 300, backgroundColor: '#e3f2fd' }}>
        <Typography variant="h6" gutterBottom>
          Appointment Trends
        </Typography>
        {appointmentTrendsData && appointmentTrendsData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={appointmentTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="appointments" stroke="#1976d2" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No data available for Appointment Trends.
          </Typography>
        )}
      </Paper>
    </Box>

    {/* Reports Table */}
    <Paper sx={{ overflowX: 'auto', maxHeight: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#bbdefb' }}>
            <TableCell><strong>Report ID</strong></TableCell>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Generated Date</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={report.id} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Box>
);

export default Reports;
