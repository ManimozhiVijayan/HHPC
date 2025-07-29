
import React, { useState } from 'react';
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem,
  ListItemIcon, ListItemText, Toolbar, Typography, useTheme, useMediaQuery,
  GlobalStyles
} from '@mui/material';
import {
  Menu as MenuIcon, Home as HomeIcon, People as PeopleIcon,
  Settings as ServicesIcon, BarChart as ReportsIcon, Logout as LogoutIcon
} from '@mui/icons-material';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    navigate('/');
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#1976d2' }}>
        Admin Dashboard
      </Typography>
      <List>
        {[
          { text: 'Dashboard Overview', icon: <HomeIcon />, path: '/admin' },
          { text: 'User Management', icon: <PeopleIcon />, path: '/admin/users' },
          { text: 'Service Management', icon: <ServicesIcon />, path: '/admin/services' },
          { text: 'Reports & Analytics', icon: <ReportsIcon />, path: '/admin/reports' },
        ].map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <NavLink
              to={path}
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? '#1976d2' : '#333',
                backgroundColor: isActive ? '#e3f2fd' : 'transparent',
                padding: '10px 16px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              })}
            >
              <ListItemIcon sx={{ color: '#1976d2' }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </NavLink>
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <GlobalStyles
        styles={{
          html: { height: '100%' },
          body: {
            height: '100%',
            margin: 0,
            backgroundColor: '#f0f4f8',
            backgroundImage: 'none',
            overflow: 'hidden',
          },
          '#root': { height: '100%' },
        }}
      />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: '#1976d2' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {isMobile && (
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap>
              Welcome, Admin
            </Typography>
          </Toolbar>
        </AppBar>

        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(6px)',
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            overflow: 'hidden',
            height: '100vh',
            bgcolor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(4px)',
            borderRadius: 2,
            m: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
