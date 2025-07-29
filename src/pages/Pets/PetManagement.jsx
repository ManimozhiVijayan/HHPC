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
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Pets as PetsIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const PetManagement = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    age: ''
  });

  // State for pets list
  const [pets, setPets] = useState([]);

  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State for delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState({ open: false, petId: null });

  // State for form validation
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Pet type options
  const petTypes = [
    'Dog',
    'Cat',
    'Bird',
    'Fish',
    'Rabbit',
    'Hamster',
    'Guinea Pig',
    'Reptile',
    'Other'
  ];

  // Common dog breeds
  const dogBreeds = [
    'Golden Retriever',
    'Labrador Retriever',
    'German Shepherd',
    'Bulldog',
    'Poodle',
    'Beagle',
    'Rottweiler',
    'Yorkshire Terrier',
    'Boxer',
    'Siberian Husky',
    'Mixed Breed',
    'Other'
  ];

  // Common cat breeds
  const catBreeds = [
    'Persian',
    'Maine Coon',
    'British Shorthair',
    'Ragdoll',
    'Bengal',
    'Abyssinian',
    'Russian Blue',
    'Scottish Fold',
    'Siamese',
    'American Shorthair',
    'Mixed Breed',
    'Other'
  ];

  // Get breeds based on pet type
  const getBreedOptions = () => {
    switch (formData.type) {
      case 'Dog':
        return dogBreeds;
      case 'Cat':
        return catBreeds;
      default:
        return ['Mixed', 'Purebred', 'Other', 'Unknown'];
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset breed if pet type changes
    if (name === 'type') {
      setFormData(prev => ({
        ...prev,
        breed: ''
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

    if (!formData.name.trim()) {
      newErrors.name = 'Pet name is required';
    }

    if (!formData.type) {
      newErrors.type = 'Pet type is required';
    }

    if (!formData.breed.trim()) {
      newErrors.breed = 'Breed is required';
    }

    if (!formData.age || formData.age < 0 || formData.age > 50) {
      newErrors.age = 'Please enter a valid age (0-50 years)';
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
      // Update existing pet
      setPets(prev =>
        prev.map(pet =>
          pet.id === editingId
            ? { ...formData, id: editingId }
            : pet
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Add new pet
      const newPet = {
        ...formData,
        id: Date.now(), // Simple ID generation
      };
      setPets(prev => [...prev, newPet]);
    }

    // Reset form
    setFormData({ name: '', type: '', breed: '', age: '' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Handle edit
  const handleEdit = (pet) => {
    setFormData({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age
    });
    setIsEditing(true);
    setEditingId(pet.id);
  };

  // Handle delete confirmation
  const handleDeleteClick = (petId) => {
    setDeleteDialog({ open: true, petId });
  };

  // Confirm delete
  const confirmDelete = () => {
    setPets(prev =>
      prev.filter(pet => pet.id !== deleteDialog.petId)
    );
    setDeleteDialog({ open: false, petId: null });
  };

  // Cancel edit
  const cancelEdit = () => {
    setFormData({ name: '', type: '', breed: '', age: '' });
    setIsEditing(false);
    setEditingId(null);
    setErrors({});
  };

  // Get pet type color
  const getPetTypeColor = (type) => {
    const colors = {
      'Dog': 'primary',
      'Cat': 'secondary',
      'Bird': 'success',
      'Fish': 'info',
      'Rabbit': 'warning',
      'Hamster': 'error',
      'Guinea Pig': 'success',
      'Reptile': 'warning',
      'Other': 'default'
    };
    return colors[type] || 'default';
  };

  // Get pet emoji based on type
  const getPetEmoji = (type) => {
    const emojis = {
      'Dog': '🐕',
      'Cat': '🐱',
      'Bird': '🐦',
      'Fish': '🐠',
      'Rabbit': '🐰',
      'Hamster': '🐹',
      'Guinea Pig': '🐹',
      'Reptile': '🦎',
      'Other': '🐾'
    };
    return emojis[type] || '🐾';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <PetsIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Pet Management
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Keep track of your beloved pets and their information
        </Typography>
      </Box>

      {/* Success Alert */}
      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Pet {isEditing ? 'updated' : 'added'} successfully!
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PetsIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" component="h2">
                  {isEditing ? 'Edit Pet Information' : 'Add New Pet'}
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  {/* Pet Name Field */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Pet Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      variant="outlined"
                      required
                      placeholder="e.g., Buddy, Whiskers, Charlie"
                    />
                  </Grid>

                  {/* Pet Type Field */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.type} required>
                      <InputLabel>Pet Type</InputLabel>
                      <Select
                        name="type"
                        value={formData.type || ''} // Ensure a default value
                        onChange={handleInputChange}
                        label="Pet Type"
                        sx={{
                          minWidth: 200, // Ensure the dropdown is wide enough
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Pet Type
                        </MenuItem>
                        {petTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <span>{getPetEmoji(type)}</span>
                              {type}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.type && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                          {errors.type}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Age Field */}
                  <Grid item xs={12} sm={6}>
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
                      inputProps={{ min: 0, max: 50 }}
                      required
                      placeholder="Years old"
                    />
                  </Grid>

                  {/* Breed Field */}
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.breed} required>
                      <InputLabel>Breed</InputLabel>
                      <Select
                        name="breed"
                        value={formData.breed || ''} // Ensure a default value
                        onChange={handleInputChange}
                        label="Breed"
                        disabled={!formData.type} // Disable if no pet type is selected
                        sx={{
                          minWidth: 200, // Ensure the dropdown is wide enough
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Breed
                        </MenuItem>
                        {getBreedOptions().map((breed) => (
                          <MenuItem key={breed} value={breed}>
                            {breed}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.breed && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                          {errors.breed}
                        </Typography>
                      )}
                      {!formData.type && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1.5 }}>
                          Please select a pet type first
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
                        sx={{ minWidth: 120 }}
                      >
                        {isEditing ? 'Update' : 'Add'} Pet
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pets List */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                My Pets ({pets.length})
              </Typography>

              {pets.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <PetsIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No pets added yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Use the form to add your first furry, feathered, or scaly friend!
                  </Typography>
                </Box>
              ) : (
                <List>
                  {pets.map((pet, index) => (
                    <React.Fragment key={pet.id}>
                      <ListItem
                        sx={{
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          mb: 1,
                          border: '1px solid',
                          borderColor: 'divider'
                        }}
                      >
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.light' }}>
                          {getPetEmoji(pet.type)}
                        </Avatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="h6" component="span">
                                {pet.name}
                              </Typography>
                              <Chip
                                label={pet.type}
                                size="small"
                                color={getPetTypeColor(pet.type)}
                                variant="outlined"
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {pet.breed} • {pet.age} {pet.age === '1' ? 'year' : 'years'} old
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => handleEdit(pet)}
                            sx={{ mr: 1 }}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteClick(pet.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < pets.length - 1 && <Divider />}
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
        onClose={() => setDeleteDialog({ open: false, petId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove this pet from your list? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, petId: null })}
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

export default PetManagement;