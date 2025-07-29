import React from 'react';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const StyledButton = styled(MuiButton)(({ theme, colorvariant }) => {
  const baseStyles = {
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: 8,
    padding: '8px 16px',
  };

  const variants = {
    outline: {
      backgroundColor: '#ffffff',
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
    primary: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  };

  return {
    ...baseStyles,
    ...(variants[colorvariant] || variants.primary),
  };
});

const Button = ({ children, colorvariant = 'primary', ...props }) => {
  return (
    <StyledButton variant="contained" colorvariant={colorvariant} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
