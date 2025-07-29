
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register a new user
export const registerUser = (userData) => 
  api.post('/register', userData);
// userData = { name: 'John Doe', email: 'john@example.com', password: 'secure123' }

// Get all family members for a user
export const getFamilyMembers = (userId) => 
  api.get(`/family/${userId}/all`);

// Add a family member
export const addFamilyMember = (userId, memberData) => 
  api.post(`/family/add/${userId}`, memberData);
// memberData = { name: 'Jane Doe', relationship: 'Spouse', age: 30 }

// Update a family member
export const updateFamilyMember = (userId, memberId, memberData) => 
  api.put(`/family/update/${memberId}/${userId}`, memberData);

// Delete a family member
export const deleteFamilyMember = (userId, memberId) => 
  api.delete(`/family/delete/${memberId}/${userId}`);

// Add a pet
export const addPet = (userId, petData) => 
  api.post(`/users/${userId}/pets`, petData);
// petData = { name: 'Buddy', type: 'Dog', age: 3 }

// Update a pet
export const updatePet = (userId, petId, petData) => 
  api.put(`/users/${userId}/pets/${petId}`, petData);

// Delete a pet
export const deletePet = (userId, petId) => 
  api.delete(`/users/${userId}/pets/${petId}`);

// Send email notification
export const sendEmailNotification = (emailData) => 
  api.post('/notifications/email', emailData);
// emailData = { to: 'user@example.com', subject: 'Welcome', body: 'Thanks for registering!' }

// Schedule pick-up/drop-off for family members
export const scheduleFamilyPickupDrop = (userId, scheduleData) => 
  api.post(`/users/${userId}/schedule/family`, scheduleData);
// scheduleData = { memberId: 1, pickupTime: '2024-05-01T09:00', dropoffTime: '2024-05-01T17:00' }

// Schedule pick-up/drop-off for pets
export const schedulePetPickupDrop = (userId, scheduleData) => 
  api.post(`/users/${userId}/schedule/pets`, scheduleData);
// scheduleData = { petId: 2, pickupTime: '2024-05-01T10:00', dropoffTime: '2024-05-01T16:00' }

// Make a payment
export const makePayment = (userId, paymentData) => 
  api.post(`/users/${userId}/payment`, paymentData);
// paymentData = { amount: 49.99, method: 'credit_card', transactionId: 'abc123' }

export default api;
