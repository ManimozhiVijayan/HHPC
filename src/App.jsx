
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardLayout from './pages/Admin/DashboardLayout';
import UserManagement from './pages/Admin/UserManagement';
import ServiceManagement from './pages/Admin/ServiceManagement';
import Reports from './pages/Admin/Reports';
import DashboardHome from './pages/Admin/DashboardHome';
import { RoleProvider } from './context/RoleContext';

import './App.css';

function App() {
  return (
    <RoleProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="services" element={<ServiceManagement />} />
              <Route path="reports" element={<Reports />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </RoleProvider>
  );
}

export default App;
