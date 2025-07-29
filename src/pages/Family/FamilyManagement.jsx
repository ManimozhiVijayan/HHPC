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
  Chip,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import { getFamilyMembers, addFamilyMember, updateFamilyMember, deleteFamilyMember } from '../../services/apiService';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FamilyRestroom as FamilyIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const FamilyManagement = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    relationship: '',
  });

  // State for family members list
  const [familyMembers, setFamilyMembers] = useState([]);

  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State for delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState({ open: false, memberId: null });

  // State for form validation
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // For demo purposes - in a real app, this would come from authentication context
  const userId = 1; // This should be retrieved from your auth context/state

  // Helper function to get member ID consistently
  const getMemberId = (member) => {
    return member.id || member.familyMemberId || member.memberId;
  };

  // Function to map backend response to UI format
  const mapBackendResponseToUI = (backendMembers) => {
    if (!Array.isArray(backendMembers)) {
      console.warn('Backend response is not an array:', backendMembers);
      return [];
    }

    const mappedMembers = backendMembers.map((member, index) => {
      // Get the member ID using our helper function
      const memberId = getMemberId(member);
      
      // Map backend fields to UI format
      const mappedMember = {
        id: memberId || `temp-${Date.now()}-${index}`, // Ensure every member has an ID
        name: member.name || member.fullName || member.memberName || '',
        age: member.age || member.memberAge || 0,
        relationship: member.relationship || member.relation || member.memberRelation || '',
        // Keep original backend fields for reference
        originalData: member
      };

      // Validate the mapped member
      const validation = validateMemberData(mappedMember);
      if (!validation.isValid) {
        console.warn(`Member validation issues for member ${index}:`, validation.issues, member);
        
        // Try to fix common issues
        if (!mappedMember.name && member.firstName && member.lastName) {
          mappedMember.name = `${member.firstName} ${member.lastName}`.trim();
        }
        if (!mappedMember.relationship && member.type) {
          mappedMember.relationship = member.type;
        }
      }

      return mappedMember;
    });

    // Filter out invalid members and log them
    const validMembers = mappedMembers.filter(member => {
      const validation = validateMemberData(member);
      if (!validation.isValid) {
        console.error('Skipping invalid member:', validation.issues, member);
        return false;
      }
      return true;
    });

    console.log(`Mapped ${validMembers.length} valid members out of ${backendMembers.length} total`);
    return validMembers;
  };

  // Function to handle different backend response structures
  const extractMembersFromResponse = (responseData) => {
    // Handle different possible response structures
    if (Array.isArray(responseData)) {
      return responseData;
    }
    
    // Handle wrapped responses
    if (responseData && Array.isArray(responseData.members)) {
      return responseData.members;
    }
    
    if (responseData && Array.isArray(responseData.familyMembers)) {
      return responseData.familyMembers;
    }
    
    if (responseData && Array.isArray(responseData.data)) {
      return responseData.data;
    }
    
    // Handle single member response
    if (responseData && typeof responseData === 'object' && responseData.name) {
      return [responseData];
    }
    
    console.warn('Unknown response structure:', responseData);
    return [];
  };

  // Function to map UI data to backend format for API calls
  const mapUIToBackendFormat = (uiData) => {
    return {
      name: uiData.name,
      relationship: uiData.relationship,
      age: parseInt(uiData.age) || 0
    };
  };

  // Function to validate mapped member data
  const validateMemberData = (member) => {
    const issues = [];
    
    if (!member.id) {
      issues.push('Missing member ID');
    }
    if (!member.name || member.name.trim() === '') {
      issues.push('Missing member name');
    }
    if (!member.relationship || member.relationship.trim() === '') {
      issues.push('Missing relationship');
    }
    if (member.age === undefined || member.age === null || member.age < 0) {
      issues.push('Invalid age');
    }
    
    return {
      isValid: issues.length === 0,
      issues
    };
  };

  // Load family members on component mount
  useEffect(() => {
    loadFamilyMembers();
  }, []);

  // Function to load family members from backend
  const loadFamilyMembers = async () => {
    setLoading(true);
    setApiError('');

    try {
      const response = await getFamilyMembers(userId);
      console.log('Raw API Response:', response.data); // Debug log
      
      // Extract members from potentially nested response structure
      const extractedMembers = extractMembersFromResponse(response.data);
      console.log('Extracted Members:', extractedMembers); // Debug log
      
      // Map backend response to UI format
      const mappedFamilyMembers = mapBackendResponseToUI(extractedMembers);
      console.log('Mapped Family Members:', mappedFamilyMembers); // Debug log
      
      setFamilyMembers(mappedFamilyMembers);
      
      // Show info message if some members were filtered out
      if (extractedMembers.length > mappedFamilyMembers.length) {
        const filteredCount = extractedMembers.length - mappedFamilyMembers.length;
        console.warn(`${filteredCount} family members were filtered out due to invalid data`);
        setApiError(`Note: ${filteredCount} family members have incomplete data and are not displayed`);
        // Clear this warning after 5 seconds
        setTimeout(() => setApiError(''), 5000);
      }
    } catch (error) {
      console.error('Error loading family members:', error);
      setApiError(
        error.response?.data?.message || 
        error.message || 
        'Failed to load family members'
      );
    } finally {
      setLoading(false);
    }
  };

  // Relationship options
  const relationships = [
    'Parent',
    'Spouse',
    'Child',
    'Sibling',
    'Grandparent',
    'Grandchild',
    'Other',
  ];

  // Static images for relationships
  const relationshipImages = {
    Parent: '/images/parent.png',
    Spouse: '/images/spouse.png',
    Child: '/images/child.png',
    Sibling: '/images/sibling.png',
    Grandparent: '/images/grandparent.png',
    Grandchild: '/images/grandchild.png',
    Other: '/images/other.png',
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    // Clear API error when user starts typing
    if (apiError) {
      setApiError('');
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.age || formData.age < 0 || formData.age > 150) {
      newErrors.age = 'Please enter a valid age (0-150)';
    }

    if (!formData.relationship) {
      newErrors.relationship = 'Relationship is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      if (isEditing) {
        // Validate editing ID
        if (!editingId || editingId === 'undefined') {
          setApiError('Cannot update member: Invalid member ID');
          return;
        }
        
        console.log('Updating member ID:', editingId); // Debug log
        
        // Update existing member - map UI data to backend format
        const updatedMemberData = mapUIToBackendFormat(formData);
        console.log('Sending update data:', updatedMemberData); // Debug log
        
        await updateFamilyMember(userId, editingId, updatedMemberData);
        
        // Reload family members to get updated data from server
        await loadFamilyMembers();
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Add new member - map UI data to backend format
        const memberData = mapUIToBackendFormat(formData);
        console.log('Sending new member data:', memberData); // Debug log
        
        await addFamilyMember(userId, memberData);
        
        // Reload family members to get updated list from server
        await loadFamilyMembers();
      }

      // Reset form and show success
      setFormData({ name: '', age: '', relationship: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error managing family member:', error);
      setApiError(
        error.response?.data?.message || 
        error.message || 
        'An error occurred while managing family member'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (member) => {
    console.log('Editing member:', member); // Debug log
    
    const memberId = getMemberId(member);
    if (!memberId) {
      setApiError('Cannot edit member: Invalid member ID');
      return;
    }
    
    setFormData({
      name: member.name,
      age: member.age,
      relationship: member.relationship,
    });
    setIsEditing(true);
    setEditingId(memberId);
  };

  // Handle delete confirmation
  const handleDeleteClick = (memberId) => {
    console.log('Deleting member ID:', memberId); // Debug log
    
    if (!memberId || memberId === 'undefined') {
      setApiError('Cannot delete member: Invalid member ID');
      return;
    }
    
    setDeleteDialog({ open: true, memberId });
  };

  // Confirm delete
  const confirmDelete = async () => {
    // Validate member ID before deletion
    if (!deleteDialog.memberId || deleteDialog.memberId === 'undefined') {
      setApiError('Cannot delete member: Invalid member ID');
      setDeleteDialog({ open: false, memberId: null });
      return;
    }
    
    console.log('Confirming delete for member ID:', deleteDialog.memberId); // Debug log
    
    setLoading(true);
    setApiError('');

    try {
      await deleteFamilyMember(userId, deleteDialog.memberId);
      // Reload family members to get updated list from server
      await loadFamilyMembers();
      setDeleteDialog({ open: false, memberId: null });
    } catch (error) {
      console.error('Error deleting family member:', error);
      setApiError(
        error.response?.data?.message || 
        error.message || 
        'An error occurred while deleting family member'
      );
    } finally {
      setLoading(false);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setFormData({ name: '', age: '', relationship: '' });
    setIsEditing(false);
    setEditingId(null);
    setErrors({});
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center', flexShrink: 0 }}>
        <FamilyIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Family Management
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your family members and their information
        </Typography>
      </Box>

      {/* Success Alert */}
      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Family member {isEditing ? 'updated' : 'added'} successfully!
        </Alert>
      )}

      {/* Error Alert */}
      {apiError && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setApiError('')}>
          {apiError}
        </Alert>
      )}

      {/* Main Content */}
      <Grid
        container
        spacing={4}
        sx={{
        }}
      >
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                {isEditing ? 'Edit Family Member' : 'Add Family Member'}
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  {/* Name Field */}
                  <Grid item xs={12}>
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

                  {/* Age Field */}
                  <Grid item xs={12} md={6}>
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
                      inputProps={{ min: 0, max: 150 }}
                      required
                    />
                  </Grid>

                  {/* Relationship Field */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={!!errors.relationship} required>
                      <InputLabel id="relationship-label">Relationship</InputLabel>
                      <Select
                        labelId="relationship-label"
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleInputChange}
                        label="Relationship"
                        sx={{
                          textAlign: 'left',
                          minWidth: 200,
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxHeight: 200,
                              overflowY: 'auto',
                            },
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Relationship
                        </MenuItem>
                        {relationships.map((relationship) => (
                          <MenuItem
                            key={relationship}
                            value={relationship}
                            sx={{
                              padding: '8px 16px',
                              fontSize: '1rem',
                            }}
                          >
                            {relationship}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.relationship && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                          {errors.relationship}
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
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : (isEditing ? <SaveIcon /> : <AddIcon />)}
                        sx={{ minWidth: 120 }}
                      >
                        {loading ? 'Processing...' : (isEditing ? 'Update' : 'Add')} Member
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Family Members List */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2">
                  Family Members ({familyMembers.length})
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={loadFamilyMembers}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={16} /> : null}
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
              </Box>

              {loading && familyMembers.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CircularProgress sx={{ mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Loading family members...
                  </Typography>
                </Box>
              ) : familyMembers.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <FamilyIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No family members added yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Use the form to add your first family member
                  </Typography>
                </Box>
              ) : (
                <List>
                  {familyMembers.map((member, index) => {
                    const memberId = getMemberId(member);
                    return (
                    <React.Fragment key={memberId || `member-${index}`}>
                      <ListItem
                        sx={{
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          mb: 1,
                          border: '1px solid',
                          borderColor: 'divider',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <img
                          src={relationshipImages[member.relationship] || '/images/default.png'}
                          alt={member.relationship}
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="h6" component="span">
                                {member.name}
                              </Typography>
                              <Chip
                                label={member.relationship}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              Age: {member.age} years old
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => handleEdit(member)}
                            sx={{ mr: 1 }}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteClick(memberId)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < familyMembers.length - 1 && <Divider />}
                    </React.Fragment>
                    );
                  })}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, memberId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this family member? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, memberId: null })}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box
        sx={{
          mt: 4,
          py: 2,
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #ddd',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 HHPC Healthcare. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default FamilyManagement;