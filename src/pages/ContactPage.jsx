import React, { useState } from 'react'
import { Box, Typography, Grid, TextField, Button, Card, CardContent } from '@mui/material'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    // Here you would typically call a service to submit the form
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' })
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="page">
        <Card title="Thank You!">
          <p>Your message has been submitted successfully.</p>
          <Button onClick={handleReset}>Send Another Message</Button>
        </Card>
      </div>
    )
  }

  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        We'd love to hear from you! Reach out to us using the form below.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card elevation={3} sx={{ backgroundColor: '#e3f2fd', p: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Get in Touch
              </Typography>
              <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  sx={{ mb: 3 }}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Your Email"
                  variant="outlined"
                  sx={{ mb: 3 }}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Your Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{ mb: 3 }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                  type="submit"
                >
                  Send Message
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ContactPage
