import React, { useState } from 'react';
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
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  FormGroup
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Elderly as ElderlyIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ExpandMore as ExpandMoreIcon,
  Phone as PhoneIcon,
  LocalHospital as MedicalIcon,
  Person as PersonIcon,
  Emergency as EmergencyIcon
} from '@mui/icons-material';

const ElderlyManagement = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    medicalConditions: [],
    customCondition: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    },
    additionalNotes: ''
  });

  // State for elderly persons list
  const [elderlyPersons, setElderlyPersons] = useState([]);

  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State for delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState({ open: false, personId: null });

  // State for form validation
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Common medical conditions
  const commonMedicalConditions = [
    'Diabetes',
    'Hypertension',
    'Heart Disease',
    'Arthritis',
    'Osteoporosis',
    'Dementia/Alzheimer\'s',
    'COPD',
    'Stroke History',
    'Cancer History',
    'Kidney Disease',
    'Depression',
    'Anxiety',
    'Vision Problems',
    'Hearing Problems',
    'Mobility Issues'
  ];

  // Emergency contact relationships
  const relationships = [
    'Spouse',
    'Adult Child',
    'Sibling',
    'Parent',
    'Grandchild',
    'Friend',
    'Neighbor',
    'Caregiver',
    'Other'
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('emergencyContact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
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

  // Handle medical condition checkbox changes
  const handleConditionChange = (condition, checked) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: checked
        ? [...prev.medicalConditions, condition]
        : prev.medicalConditions.filter(c => c !== condition)
    }));
  };

  // Add custom medical condition
  const addCustomCondition = () => {
    if (formData.customCondition.trim() && !formData.medicalConditions.includes(formData.customCondition.trim())) {
      setFormData(prev => ({
        ...prev,
        medicalConditions: [...prev.medicalConditions, prev.customCondition.trim()],
        customCondition: ''
      }));
    }
  };

  // Remove medical condition
  const removeCondition = (conditionToRemove) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: prev.medicalConditions.filter(c => c !== conditionToRemove)
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.age || formData.age < 50 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age (50-120 years)';
    }

    if (!formData.emergencyContact.name.trim()) {
      newErrors['emergencyContact.name'] = 'Emergency contact name is required';
    }

    if (!formData.emergencyContact.phone.trim()) {
      newErrors['emergencyContact.phone'] = 'Emergency contact phone is required';
    } else if (!/^\d{10,}$/.test(formData.emergencyContact.phone.replace(/\D/g, ''))) {
      newErrors['emergencyContact.phone'] = 'Please enter a valid phone number';
    }

    if (!formData.emergencyContact.relationship) {
      newErrors['emergencyContact.relationship'] = 'Relationship is required';
    }

    if (formData.emergencyContact.email && !/\S+@\S+\.\S+/.test(formData.emergencyContact.email)) {
      newErrors['emergencyContact.email'] = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (isEditing) {
      // Update existing person
      setElderlyPersons(prev =>
        prev.map(person =>
          person.id === editingId
            ? { ...formData, id: editingId }
            : person
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Add new person
      const newPerson = {
        ...formData,
        id: Date.now(), // Simple ID generation
      };
      setElderlyPersons(prev => [...prev, newPerson]);
    }

    // Reset form
    setFormData({
      name: '',
      age: '',
      medicalConditions: [],
      customCondition: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: '',
        email: ''
      },
      additionalNotes: ''
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Handle edit
  const handleEdit = (person) => {
    setFormData({
      name: person.name,
      age: person.age,
      medicalConditions: person.medicalConditions,
      customCondition: '',
      emergencyContact: person.emergencyContact,
      additionalNotes: person.additionalNotes || ''
    });
    setIsEditing(true);
    setEditingId(person.id);
  };

  // Handle delete confirmation
  const handleDeleteClick = (personId) => {
    setDeleteDialog({ open: true, personId });
  };

  // Confirm delete
  const confirmDelete = () => {
    setElderlyPersons(prev =>
      prev.filter(person => person.id !== deleteDialog.personId)
    );
    setDeleteDialog({ open: false, personId: null });
  };

  // Cancel edit
  const cancelEdit = () => {
    setFormData({
      name: '',
      age: '',
      medicalConditions: [],
      customCondition: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: '',
        email: ''
      },
      additionalNotes: ''
    });
    setIsEditing(false);
    setEditingId(null);
    setErrors({});
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <ElderlyIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Elderly Care Management
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage elderly persons' information, medical conditions, and emergency contacts
        </Typography>
      </Box>

      {/* Success Alert */}
      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Elderly person information {isEditing ? 'updated' : 'added'} successfully!
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Form Section */}
        <Grid item xs={12} lg={8}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" component="h2">
                  {isEditing ? 'Edit Elderly Person Information' : 'Add Elderly Person'}
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  {/* Basic Information */}
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <PersonIcon sx={{ mr: 1 }} /> Basic Information
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      variant="outlined"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      error={!!errors.age}
                      helperText={errors.age}
                      variant="outlined"
                      inputProps={{ min: 50, max: 120 }}
                      required
                    />
                  </Grid>

                  {/* Medical Conditions */}
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <MedicalIcon sx={{ mr: 1 }} /> Medical Conditions
                    </Typography>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Common Medical Conditions</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup row>
                          {commonMedicalConditions.map((condition) => (
                            <FormControlLabel
                              key={condition}
                              control={
                                <Checkbox
                                  checked={formData.medicalConditions.includes(condition)}
                                  onChange={(e) => handleConditionChange(condition, e.target.checked)}
                                />
                              }
                              label={condition}
                              sx={{ minWidth: '300px', mb: 1 }}
                            />
                          ))}
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>

                    {/* Custom Condition Input */}
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <TextField
                        label="Add Custom Condition"
                        value={formData.customCondition}
                        onChange={(e) => setFormData(prev => ({ ...prev, customCondition: e.target.value }))}
                        size="small"
                        sx={{ flexGrow: 1 }}
                      />
                      <Button
                        variant="outlined"
                        onClick={addCustomCondition}
                        disabled={!formData.customCondition.trim()}
                      >
                        Add
                      </Button>
                    </Box>

                    {/* Selected Conditions */}
                    {formData.medicalConditions.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          Selected Medical Conditions:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {formData.medicalConditions.map((condition) => (
                            <Chip
                              key={condition}
                              label={condition}
                              onDelete={() => removeCondition(condition)}
                              color="primary"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Grid>

                  {/* Emergency Contact */}
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <EmergencyIcon sx={{ mr: 1 }} /> Emergency Contact
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Emergency Contact Name"
                      name="emergencyContact.name"
                      value={formData.emergencyContact.name}
                      onChange={handleInputChange}
                      error={!!errors['emergencyContact.name']}
                      helperText={errors['emergencyContact.name']}
                      variant="outlined"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors['emergencyContact.relationship']} required>
                      <InputLabel>Relationship</InputLabel>
                      <Select
                        name="emergencyContact.relationship"
                        value={formData.emergencyContact.relationship || ''} // Ensure a default value
                        onChange={handleInputChange}
                        label="Relationship"
                        sx={{
                          minWidth: 200, // Ensure the dropdown is wide enough
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Relationship
                        </MenuItem>
                        {relationships.map((relationship) => (
                          <MenuItem key={relationship} value={relationship}>
                            {relationship}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors['emergencyContact.relationship'] && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                          {errors['emergencyContact.relationship']}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="emergencyContact.phone"
                      value={formData.emergencyContact.phone}
                      onChange={handleInputChange}
                      error={!!errors['emergencyContact.phone']}
                      helperText={errors['emergencyContact.phone']}
                      variant="outlined"
                      required
                    />
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
                        {isEditing ? 'Update' : 'Add'} Person
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Elderly Persons List */}
        <Grid item xs={12} lg={4}>
          <Card elevation={3} sx={{ height: 'fit-content', position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                Elderly Persons ({elderlyPersons.length})
              </Typography>

              {elderlyPersons.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <ElderlyIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No elderly persons added yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Use the form to add the first elderly person
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ maxHeight: '600px', overflow: 'auto' }}>
                  {elderlyPersons.map((person, index) => (
                    <Card 
                      key={person.id} 
                      elevation={2} 
                      sx={{ 
                        mb: 2, 
                        border: '1px solid #e0e0e0',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        {/* Profile Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar 
                            sx={{ 
                              mr: 2, 
                              bgcolor: 'primary.light',
                              width: 50,
                              height: 50,
                              fontSize: '1.5rem'
                            }}
                          >
                            👴
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {person.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Age: {person.age} years old
                            </Typography>
                          </Box>
                          
                          {/* Action Buttons */}
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              onClick={() => handleEdit(person)}
                              color="primary"
                              size="small"
                              sx={{
                                bgcolor: 'primary.light',
                                color: 'primary.main',
                                '&:hover': {
                                  bgcolor: 'primary.main',
                                  color: 'white'
                                }
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteClick(person.id)}
                              color="error"
                              size="small"
                              sx={{
                                bgcolor: 'error.light',
                                color: 'error.main',
                                '&:hover': {
                                  bgcolor: 'error.main',
                                  color: 'white'
                                }
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Divider sx={{ my: 1.5 }} />
                        
                        {/* Medical Conditions Section */}
                        {person.medicalConditions.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <MedicalIcon sx={{ fontSize: 16, mr: 1, color: 'secondary.main' }} />
                              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Medical Conditions
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {person.medicalConditions.slice(0, 2).map((condition) => (
                                <Chip
                                  key={condition}
                                  label={condition}
                                  size="small"
                                  variant="outlined"
                                  color="secondary"
                                  sx={{ 
                                    fontSize: '0.75rem',
                                    height: '24px'
                                  }}
                                />
                              ))}
                              {person.medicalConditions.length > 2 && (
                                <Chip
                                  label={`+${person.medicalConditions.length - 2} more`}
                                  size="small"
                                  variant="filled"
                                  color="default"
                                  sx={{ 
                                    fontSize: '0.7rem',
                                    height: '24px',
                                    bgcolor: 'grey.200'
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        )}
                        
                        {/* Emergency Contact Section */}
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <EmergencyIcon sx={{ fontSize: 16, mr: 1, color: 'warning.main' }} />
                            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                              Emergency Contact
                            </Typography>
                          </Box>
                          <Box sx={{ 
                            bgcolor: 'grey.50', 
                            p: 1.5, 
                            borderRadius: '8px',
                            border: '1px solid #f0f0f0'
                          }}>
                            <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                              {person.emergencyContact.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                              {person.emergencyContact.relationship}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <PhoneIcon sx={{ fontSize: 12, mr: 0.5 }} />
                              {person.emergencyContact.phone}
                            </Typography>
                          </Box>
                        </Box>
                        
                        {/* Additional Notes */}
                        {person.additionalNotes && (
                          <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid #f0f0f0' }}>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                              Notes:
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              fontStyle: 'italic',
                              color: 'text.secondary',
                              fontSize: '0.85rem',
                              lineHeight: 1.4
                            }}>
                              {person.additionalNotes}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, personId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this elderly person's information? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, personId: null })}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ElderlyManagement;