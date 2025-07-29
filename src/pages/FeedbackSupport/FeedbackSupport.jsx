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
  Rating,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import {
  Chat as ChatIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Feedback as FeedbackIcon
} from '@mui/icons-material';

const FeedbackSupport = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [supportOption, setSupportOption] = useState('chat');

  // Handle support option change
  const handleSupportOptionChange = (event, newOption) => {
    if (newOption !== null) {
      setSupportOption(newOption);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback submitted!\nRating: ${rating} stars\nComments: ${comments}\nPreferred Support: ${supportOption}`);
    setRating(0);
    setComments('');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <FeedbackIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Feedback & Support
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We value your feedback! Let us know how we can improve.
        </Typography>
      </Box>

      {/* Feedback Form */}
      <Card elevation={3}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Star Rating */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Rate Your Experience
                </Typography>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  size="large"
                />
              </Grid>

              {/* Comments */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Comments"
                  name="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="Share your feedback or suggestions..."
                  variant="outlined"
                />
              </Grid>

              {/* Support Options */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Preferred Support Option
                </Typography>
                <ToggleButtonGroup
                  value={supportOption}
                  exclusive
                  onChange={handleSupportOptionChange}
                  fullWidth
                  color="primary"
                >
                  <ToggleButton
                    value="chat"
                    sx={{
                      bgcolor: supportOption === 'chat' ? 'primary.light' : 'inherit',
                      '&:hover': { bgcolor: 'primary.main', color: 'white' }
                    }}
                  >
                    <ChatIcon sx={{ mr: 1 }} />
                    Chat
                  </ToggleButton>
                  <ToggleButton
                    value="email"
                    sx={{
                      bgcolor: supportOption === 'email' ? 'primary.light' : 'inherit',
                      '&:hover': { bgcolor: 'primary.main', color: 'white' }
                    }}
                  >
                    <EmailIcon sx={{ mr: 1 }} />
                    Email
                  </ToggleButton>
                  <ToggleButton
                    value="phone"
                    sx={{
                      bgcolor: supportOption === 'phone' ? 'primary.light' : 'inherit',
                      '&:hover': { bgcolor: 'primary.main', color: 'white' }
                    }}
                  >
                    <PhoneIcon sx={{ mr: 1 }} />
                    Phone
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ py: 1.5 }}
                >
                  Submit Feedback
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FeedbackSupport;