import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const Card = ({ children, title, sx = {}, ...props }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, ...sx }} {...props}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Box>
        {children}
      </Box>
    </Paper>
  );
};

export default Card;
