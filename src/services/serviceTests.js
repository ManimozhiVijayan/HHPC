const axios = require('axios');
const {
  registerUser,
  getFamilyMembers,
  addFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
  addPet,
  updatePet,
  deletePet,
  sendEmailNotification,
  scheduleFamilyPickupDrop,
  schedulePetPickupDrop,
  makePayment,
} = require('../api'); // Adjust the path as needed

jest.mock('axios');

describe('API Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('registerUser should post user data', async () => {
    const userData = { name: 'John', email: 'john@example.com', password: '123' };
    axios.post.mockResolvedValue({ data: { success: true } });

    const res = await registerUser(userData);
    expect(axios.post).toHaveBeenCalledWith('/register', userData);
    expect(res.data.success).toBe(true);
  });

  test('getFamilyMembers should fetch members', async () => {
    const userId = 1;
    axios.get.mockResolvedValue({ data: ['member1'] });

    const res = await getFamilyMembers(userId);
    expect(axios.get).toHaveBeenCalledWith(`/family/${userId}/all`);
    expect(res.data).toEqual(['member1']);
  });

  test('addFamilyMember should post member data', async () => {
    const userId = 1;
    const memberData = { name: 'Jane', relationship: 'Spouse', age: 30 };
    axios.post.mockResolvedValue({ data: { id: 101 } });

    const res = await addFamilyMember(userId, memberData);
    expect(axios.post).toHaveBeenCalledWith(`/family/add/${userId}`, memberData);
    expect(res.data.id).toBe(101);
  });

  test('updateFamilyMember should put updated data', async () => {
    const userId = 1, memberId = 2;
    const memberData = { name: 'Jane Updated' };
    axios.put.mockResolvedValue({ data: { updated: true } });

    const res = await updateFamilyMember(userId, memberId, memberData);
    expect(axios.put).toHaveBeenCalledWith(`/family/update/${memberId}/${userId}`, memberData);
    expect(res.data.updated).toBe(true);
  });

  test('deleteFamilyMember should delete member', async () => {
    const userId = 1, memberId = 2;
    axios.delete.mockResolvedValue({ data: { deleted: true } });

    const res = await deleteFamilyMember(userId, memberId);
    expect(axios.delete).toHaveBeenCalledWith(`/family/delete/${memberId}/${userId}`);
    expect(res.data.deleted).toBe(true);
  });

  test('addPet should post pet data', async () => {
    const userId = 1;
    const petData = { name: 'Buddy', type: 'Dog', age: 3 };
    axios.post.mockResolvedValue({ data: { id: 201 } });

    const res = await addPet(userId, petData);
    expect(axios.post).toHaveBeenCalledWith(`/users/${userId}/pets`, petData);
    expect(res.data.id).toBe(201);
  });

  test('updatePet should put pet data', async () => {
    const userId = 1, petId = 2;
    const petData = { name: 'Buddy Updated' };
    axios.put.mockResolvedValue({ data: { updated: true } });

    const res = await updatePet(userId, petId, petData);
    expect(axios.put).toHaveBeenCalledWith(`/users/${userId}/pets/${petId}`, petData);
    expect(res.data.updated).toBe(true);
  });

  test('deletePet should delete pet', async () => {
    const userId = 1, petId = 2;
    axios.delete.mockResolvedValue({ data: { deleted: true } });

    const res = await deletePet(userId, petId);
    expect(axios.delete).toHaveBeenCalledWith(`/users/${userId}/pets/${petId}`);
    expect(res.data.deleted).toBe(true);
  });

  test('sendEmailNotification should post email data', async () => {
    const emailData = { to: 'user@example.com', subject: 'Welcome', body: 'Thanks!' };
    axios.post.mockResolvedValue({ data: { sent: true } });

    const res = await sendEmailNotification(emailData);
    expect(axios.post).toHaveBeenCalledWith('/notifications/email', emailData);
    expect(res.data.sent).toBe(true);
  });

  test('scheduleFamilyPickupDrop should post schedule', async () => {
    const userId = 1;
    const scheduleData = { memberId: 1, pickupTime: '2024-05-01T09:00', dropoffTime: '2024-05-01T17:00' };
    axios.post.mockResolvedValue({ data: { scheduled: true } });

    const res = await scheduleFamilyPickupDrop(userId, scheduleData);
    expect(axios.post).toHaveBeenCalledWith(`/users/${userId}/schedule/family`, scheduleData);
    expect(res.data.scheduled).toBe(true);
  });

  test('schedulePetPickupDrop should post pet schedule', async () => {
    const userId = 1;
    const scheduleData = { petId: 2, pickupTime: '2024-05-01T10:00', dropoffTime: '2024-05-01T16:00' };
    axios.post.mockResolvedValue({ data: { scheduled: true } });

    const res = await schedulePetPickupDrop(userId, scheduleData);
    expect(axios.post).toHaveBeenCalledWith(`/users/${userId}/schedule/pets`, scheduleData);
    expect(res.data.scheduled).toBe(true);
  });

  test('makePayment should post payment data', async () => {
    const userId = 1;
    const paymentData = { amount: 49.99, method: 'credit_card', transactionId: 'abc123' };
    axios.post.mockResolvedValue({ data: { paid: true } });

    const res = await makePayment(userId, paymentData);
    expect(axios.post).toHaveBeenCalledWith(`/users/${userId}/payment`, paymentData);
    expect(res.data.paid).toBe(true);
  });
});
