import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Chip,
  Alert,
  Divider,
  Avatar
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Pets as PetsIcon,
  Elderly as ElderlyIcon
} from '@mui/icons-material';
import Notification from '../../components/Notification';
import { Link } from 'react-router-dom';

const Scheduling = () => {
  // State for form data
  const [formData, setFormData] = useState({
    appointmentType: '', // 'Family', 'Pet', 'Elderly'
    selectedPerson: '',
    date: '',
    time: '',
    serviceType: '',
    notes: ''
  });

  // State for appointments list
  const [appointments, setAppointments] = useState([]);

  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State for delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState({ open: false, appointmentId: null });

  // State for form validation
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });

  // Mock data for demonstration (in real app, these would come from your management components)
  const [familyMembers] = useState([
    { id: 1, name: 'John Doe', relationship: 'Parent' },
    { id: 2, name: 'Jane Doe', relationship: 'Spouse' },
    { id: 3, name: 'Tommy Doe', relationship: 'Child' }
  ]);

  const [pets] = useState([
    { id: 1, name: 'Buddy', type: 'Dog', breed: 'Golden Retriever' },
    { id: 2, name: 'Whiskers', type: 'Cat', breed: 'Persian' },
    { id: 3, name: 'Charlie', type: 'Bird', breed: 'Parrot' }
  ]);

  const [elderlyPersons] = useState([
    { id: 1, name: 'Robert Smith', age: 78 },
    { id: 2, name: 'Mary Johnson', age: 82 },
    { id: 3, name: 'William Brown', age: 75 }
  ]);

  // Service types based on appointment type
  const serviceTypes = {
    Family: [
      'General Checkup',
      'Consultation',
      'Vaccination',
      'Physical Therapy',
      'Dental Care',
      'Eye Exam',
      'Blood Test',
      'Follow-up'
    ],
    Pet: [
      'Veterinary Checkup',
      'Vaccination',
      'Grooming',
      'Surgery Consultation',
      'Emergency Care',
      'Dental Cleaning',
      'Spay/Neuter',
      'Microchipping'
    ],
    Elderly: [
      'Geriatric Assessment',
      'Medication Review',
      'Physical Therapy',
      'Memory Assessment',
      'Home Care Consultation',
      'Mobility Assessment',
      'Nutrition Counseling',
      'Health Monitoring'
    ]
  };

  // Get available persons based on appointment type
  const getAvailablePersons = () => {
    switch (formData.appointmentType) {
      case 'Family':
        return familyMembers;
      case 'Pet':
        return pets;
      case 'Elderly':
        return elderlyPersons;
      default:
        return [];
    }
  };

  // Get service types for current appointment type
  const getServiceTypes = () => {
    return serviceTypes[formData.appointmentType] || [];
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Reset selected person when appointment type changes
    if (name === 'appointmentType') {
      setFormData(prev => ({
        ...prev,
        selectedPerson: '',
        serviceType: ''
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.appointmentType) {
      newErrors.appointmentType = 'Appointment type is required';
    }

    if (!formData.selectedPerson) {
      newErrors.selectedPerson = 'Please select a person';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Service type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const selectedPersonData = getAvailablePersons().find(p => p.id.toString() === formData.selectedPerson);

    if (isEditing) {
      // Update existing appointment
      setAppointments(prev =>
        prev.map(appointment =>
          appointment.id === editingId
            ? { 
                ...formData, 
                id: editingId,
                personData: selectedPersonData,
                createdAt: new Date().toISOString()
              }
            : appointment
        )
      );
      setIsEditing(false);
      setEditingId(null);
      setNotification({ open: true, message: 'Appointment updated successfully!', type: 'success' });
    } else {
      // Add new appointment
      const newAppointment = {
        ...formData,
        id: Date.now(),
        personData: selectedPersonData,
        createdAt: new Date().toISOString()
      };
      setAppointments(prev => [...prev, newAppointment]);
      setNotification({ open: true, message: 'Appointment scheduled successfully!', type: 'success' });
    }

    // Reset form
    setFormData({
      appointmentType: '',
      selectedPerson: '',
      date: '',
      time: '',
      serviceType: '',
      notes: ''
    });
  };

  // Handle edit
  const handleEdit = (appointment) => {
    setFormData({
      appointmentType: appointment.appointmentType,
      selectedPerson: appointment.selectedPerson,
      date: appointment.date,
      time: appointment.time,
      serviceType: appointment.serviceType,
      notes: appointment.notes || ''
    });
    setIsEditing(true);
    setEditingId(appointment.id);
  };

  // Handle delete
  const handleDeleteClick = (appointmentId) => {
    setDeleteDialog({ open: true, appointmentId });
  };

  const confirmDelete = () => {
    setAppointments(prev =>
      prev.filter(appointment => appointment.id !== deleteDialog.appointmentId)
    );
    setDeleteDialog({ open: false, appointmentId: null });
    setNotification({ open: true, message: 'Appointment cancelled successfully!', type: 'info' });
  };

  // Cancel edit
  const cancelEdit = () => {
    setFormData({
      appointmentType: '',
      selectedPerson: '',
      date: '',
      time: '',
      serviceType: '',
      notes: ''
    });
    setIsEditing(false);
    setEditingId(null);
    setErrors({});
  };

  // Get appointment type icon
  const getAppointmentIcon = (type) => {
    switch (type) {
      case 'Family': return <PersonIcon />;
      case 'Pet': return <PetsIcon />;
      case 'Elderly': return <ElderlyIcon />;
      default: return <ScheduleIcon />;
    }
  };

  // Get appointment type color
  const getAppointmentColor = (type) => {
    switch (type) {
      case 'Family': return 'primary';
      case 'Pet': return 'secondary';
      case 'Elderly': return 'warning';
      default: return 'default';
    }
  };

  // Get today's date for min date input
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <ScheduleIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Appointment Scheduling
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Schedule appointments for family members, pets, or elderly persons
        </Typography>
        {/* Back to Home Button */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" sx={{ mt: 2 }}>
            Back to Home
          </Button>
        </Link>
      </Box>

      <Grid container spacing={4}>
        {/* Scheduling Form */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CalendarIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" component="h2">
                  {isEditing ? 'Edit Appointment' : 'Schedule New Appointment'}
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  {/* Appointment Type */}
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.appointmentType} required>
                      <InputLabel>Appointment Type</InputLabel>
                      <Select
                        name="appointmentType"
                        value={formData.appointmentType}
                        onChange={handleInputChange}
                        label="Appointment Type"
                        sx={{
                          minWidth: 250, // Ensure the dropdown is wide enough
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Appointment Type
                        </MenuItem>
                        <MenuItem value="Family">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon /> Family Member
                          </Box>
                        </MenuItem>
                        <MenuItem value="Pet">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PetsIcon /> Pet
                          </Box>
                        </MenuItem>
                        <MenuItem value="Elderly">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ElderlyIcon /> Elderly Person
                          </Box>
                        </MenuItem>
                      </Select>
                      {errors.appointmentType && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                          {errors.appointmentType}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Select Person */}
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.selectedPerson} required disabled={!formData.appointmentType}>
                      <InputLabel>
                        Select {formData.appointmentType === 'Pet' ? 'Pet' : 'Person'}
                      </InputLabel>
                      <Select
                        name="selectedPerson"
                        value={formData.selectedPerson || ''} // Ensure a default value
                        onChange={handleInputChange}
                        label={`Select ${formData.appointmentType === 'Pet' ? 'Pet' : 'Person'}`}
                        sx={{
                          minWidth: 250, // Ensure the dropdown is wide enough
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select {formData.appointmentType === 'Pet' ? 'Pet' : 'Person'}
                        </MenuItem>
                        {getAvailablePersons().map((person) => (
                          <MenuItem key={person.id} value={person.id.toString()}>
                            {person.name}
                            {person.relationship && ` (${person.relationship})`}
                            {person.type && ` (${person.type})`}
                            {person.age && ` (Age: ${person.age})`}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.selectedPerson && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                          {errors.selectedPerson}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Date */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Appointment Date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      error={!!errors.date}
                      helperText={errors.date}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: getTodayDate() }}
                      required
                    />
                  </Grid>

                  {/* Time */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Appointment Time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      error={!!errors.time}
                      helperText={errors.time}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>

                  {/* Service Type */}
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.serviceType} required disabled={!formData.appointmentType}>
                      <InputLabel>Service Type</InputLabel>
                      <Select
                        name="serviceType"
                        value={formData.serviceType || ''} // Ensure a default value
                        onChange={handleInputChange}
                        label="Service Type"
                        sx={{
                          minWidth: 250, // Ensure the dropdown is wide enough
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Service Type
                        </MenuItem>
                        {getServiceTypes().map((service) => (
                          <MenuItem key={service} value={service}>
                            {service}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.serviceType && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                          {errors.serviceType}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Action Buttons */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      {isEditing && (
                        <Button
                          variant="outlined"
                          onClick={cancelEdit}
                          startIcon={<CancelIcon />}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={isEditing ? <SaveIcon /> : <AddIcon />}
                        sx={{ minWidth: 140 }}
                      >
                        {isEditing ? 'Update' : 'Schedule'} Appointment
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Appointments List */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                Scheduled Appointments ({appointments.length})
              </Typography>

              {appointments.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <ScheduleIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No appointments scheduled
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Use the form to schedule your first appointment
                  </Typography>
                </Box>
              ) : (
                <List sx={{ maxHeight: '600px', overflow: 'auto' }}>
                  {appointments
                    .sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`))
                    .map((appointment, index) => (
                    <React.Fragment key={appointment.id}>
                      <ListItem
                        sx={{
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          mb: 1,
                          border: '1px solid',
                          borderColor: 'divider'
                        }}
                      >
                        <Avatar sx={{ mr: 2, bgcolor: `${getAppointmentColor(appointment.appointmentType)}.light` }}>
                          {getAppointmentIcon(appointment.appointmentType)}
                        </Avatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="h6" component="span">
                                {appointment.personData?.name}
                              </Typography>
                              <Chip
                                label={appointment.appointmentType}
                                size="small"
                                color={getAppointmentColor(appointment.appointmentType)}
                                variant="outlined"
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                📅 {appointment.date} at {appointment.time}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                🏥 {appointment.serviceType}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => handleEdit(appointment)}
                            sx={{ mr: 1 }}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteClick(appointment.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < appointments.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, appointmentId: null })}
      >
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this appointment? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, appointmentId: null })}
            color="primary"
          >
            Keep Appointment
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Cancel Appointment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Component */}
      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Container>
  );
};

export default Scheduling;