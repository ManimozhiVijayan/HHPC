
import React, { useState } from 'react';
import { Box, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import FamilyManagement from './Family/FamilyManagement';
import PetManagement from './Pets/PetManagement';
import ElderlyManagement from './Elderly/ElderlyManagement';
import Scheduling from './Schedule/Scheduling';
import PaymentForm from './Payment/PaymentForm';
import FeedbackSupport from './FeedbackSupport/FeedbackSupport';
import FamilyIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import ElderlyIcon from '@mui/icons-material/Elderly';
import ScheduleIcon from '@mui/icons-material/Event';
import PaymentsIcon from '@mui/icons-material/Payment';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { GlobalStyles } from '@mui/material';

const UserDashboard = () => {
  const [activePage, setActivePage] = useState('Family Management');

  const renderContent = () => {
    switch (activePage) {
      case 'Family Management':
        return <FamilyManagement />;
      case 'Pet Management':
        return <PetManagement />;
      case 'Elderly Management':
        return <ElderlyManagement />;
      case 'Scheduling':
        return <Scheduling />;
      case 'Payments':
        return <PaymentForm />;
      case 'Feedback & Support':
        return <FeedbackSupport />;
      default:
        return <Typography>Select a page from the navigation bar.</Typography>;
    }
  };

  return (
    <>
      <GlobalStyles
        styles={{
          html: { height: '100%', overflow: 'hidden' },
          body: {
            height: '100%',
            margin: 0,
            overflow: 'hidden',
            backgroundImage: 'url("/images/family-background.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          },
          '#root': { height: '100%' },
        }}
      />
      <Box sx={{ display: 'flex', height: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
        <Drawer
          variant="permanent"
          sx={{
            width: { sm: 240 },
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: { sm: 240 },
              boxSizing: 'border-box',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
            },
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', py: 2 }}>
            Dashboard
          </Typography>
          <List>
            {[
              { label: 'Family Management', icon: <FamilyIcon /> },
              { label: 'Pet Management', icon: <PetsIcon /> },
              { label: 'Elderly Management', icon: <ElderlyIcon /> },
              { label: 'Scheduling', icon: <ScheduleIcon /> },
              { label: 'Payments', icon: <PaymentsIcon /> },
              { label: 'Feedback & Support', icon: <FeedbackIcon /> },
            ].map((item) => (
              <ListItem button key={item.label} onClick={() => setActivePage(item.label)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(4px)',
            borderRadius: 2,
            m: 2,
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
};

export default UserDashboard;
