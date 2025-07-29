import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const initialServices = [
  {
    id: 'S001',
    name: 'Family Care',
    category: 'Family',
    description: 'Support services for families including childcare and counseling.',
    status: 'Running',
    usage: 820,
  },
  {
    id: 'S002',
    name: 'Pet Sitting',
    category: 'Pet',
    description: 'Pet care services including sitting, grooming, and walking.',
    status: 'Paused',
    usage: 540,
  },
  {
    id: 'S003',
    name: 'Elderly Assistance',
    category: 'Elderly',
    description: 'Help for elderly individuals including home visits and medical support.',
    status: 'Running',
    usage: 670,
  },
  {
    id: 'S004',
    name: 'Childcare Support',
    category: 'Family',
    description: 'Daycare and educational support for children.',
    status: 'Maintenance',
    usage: 410,
  },
  {
    id: 'S005',
    name: 'Dog Walking',
    category: 'Pet',
    description: 'Daily walking and exercise services for dogs.',
    status: 'Running',
    usage: 920,
  },
];

const statusColor = {
  Running: 'success',
  Paused: 'warning',
  Maintenance: 'error',
};

const ServiceManagement = () => {
  const [services, setServices] = useState(initialServices);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  // Handle Delete
  const handleDelete = (id) => {
    setServices((prevServices) => prevServices.filter((service) => service.id !== id));
  };

  // Handle Edit
  const handleEdit = (service) => {
    setCurrentService(service);
    setEditDialogOpen(true);
  };

  // Handle Save Changes
  const handleSave = () => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === currentService.id ? currentService : service
      )
    );
    setEditDialogOpen(false);
    setCurrentService(null);
  };

  // Handle Input Change in Edit Dialog
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentService((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Service Management
      </Typography>
      <Typography variant="body1" gutterBottom>
        Manage available services such as family care, pet sitting, and elderly assistance. You can view service details, monitor usage, and update service status.
      </Typography>
      <Paper sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Service ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Usage Count</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <Chip label={service.status} color={statusColor[service.status]} />
                </TableCell>
                <TableCell>{service.usage}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          {currentService && (
            <>
              <TextField
                fullWidth
                margin="dense"
                label="Name"
                name="name"
                value={currentService.name}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Category"
                name="category"
                value={currentService.category}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Description"
                name="description"
                value={currentService.description}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Status"
                name="status"
                value={currentService.status}
                onChange={handleInputChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServiceManagement;
