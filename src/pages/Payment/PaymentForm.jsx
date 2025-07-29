import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  CreditCard as CreditCardIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    service: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    amount: '',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // List of available services
  const services = [
    { id: 1, name: 'Family Management', price: 50 },
    { id: 2, name: 'Pet Management', price: 30 },
    { id: 3, name: 'Elderly Management', price: 70 },
    { id: 4, name: 'Scheduling', price: 20 },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{1,2})/, '$1/$2').slice(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    // Format name on card (letters and spaces only)
    if (name === 'nameOnCard') {
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    // Card number validation
    const cardNumberDigits = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberDigits) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardNumberDigits.length < 13 || cardNumberDigits.length > 19) {
      newErrors.cardNumber = 'Please enter a valid card number (13-19 digits)';
    }

    // Expiry date validation
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (!month || !year) {
        newErrors.expiryDate = 'Please enter expiry date in MM/YY format';
      } else if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Invalid month';
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    // CVV validation
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3 || formData.cvv.length > 4) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    // Name on card validation
    if (!formData.nameOnCard.trim()) {
      newErrors.nameOnCard = 'Name on card is required';
    } else if (formData.nameOnCard.trim().length < 2) {
      newErrors.nameOnCard = 'Please enter a valid name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message using alert()
      alert(`Payment for ${formData.service} processed successfully! 🎉`);

      // Reset form
      setFormData({
        service: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
        amount: '',
      });

      // Clear any existing errors
      setErrors({});
    } catch (error) {
      // Show error message using alert()
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ overflowY: 'hidden',  py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <PaymentIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Payment Form
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Secure payment processing
        </Typography>
      </Box>

      <Card elevation={3} sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Service Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.service} required sx={{ minWidth: 300 }}>
                  <InputLabel>Select Service</InputLabel>
                  <Select
                    name="service"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        service: e.target.value,
                        amount: services.find((s) => s.name === e.target.value)?.price || '',
                      }))
                    }
                    sx={{ py: 1.5 }} // Adjust padding for a larger dropdown
                  >
                    {services.map((service) => (
                      <MenuItem key={service.id} value={service.name}>
                        {service.name} - ${service.price}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.service && (
                    <Typography variant="caption" color="error">
                      {errors.service}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Amount */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  inputProps={{ min: 0, step: 0.01 }}
                  disabled
                  required
                />
              </Grid>

              {/* Card Number */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCardIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>

              {/* Expiry Date and CVV */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate}
                  placeholder="MM/YY"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                  placeholder="123"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SecurityIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>

              {/* Name on Card */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name on Card"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  error={!!errors.nameOnCard}
                  helperText={errors.nameOnCard}
                  placeholder="JOHN DOE"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>

              {/* Security Notice */}
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 2 }}>
                  🔒 Your payment information is encrypted and secure. We do not store your card details.
                </Alert>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isProcessing}
                  sx={{ mt: 2, py: 1.5 }}
                >
                  {isProcessing ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 2 }} />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <PaymentIcon sx={{ mr: 1 }} />
                      Process Payment
                    </>
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Back to Home Button */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="outlined" sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Link>
    </Container>
  );
};

export default PaymentForm;