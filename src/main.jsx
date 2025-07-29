import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SchedulePage from './pages/Schedule/Scheduling';
import PaymentsPage from './pages/Payment/PaymentForm';
import NotFoundPage from './pages/NotFoundPage';
import AdminLogin from './pages/Admin/AdminLogin';
import DashboardLayout from './pages/Admin/DashboardLayout';
import DashboardHome from './pages/Admin/DashboardHome';
import UserManagement from './pages/Admin/UserManagement';
import ServiceManagement from './pages/Admin/ServiceManagement';
import Reports from './pages/Admin/Reports';
import UserDashboard from './pages/UserDashboard';
import FamilyPage from './pages/Family/FamilyManagement';
import PetsPage from './pages/Pets/PetManagement';
import ElderlyPage from './pages/Elderly/ElderlyManagement';
import FeedbackSupport from './pages/FeedbackSupport/FeedbackSupport';
import { RoleProvider } from './context/RoleContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/family" element={<FamilyPage />} />
            <Route path="/pets" element={<PetsPage />} />
            <Route path="/elderly" element={<ElderlyPage />} />
            <Route path="/feedback" element={<FeedbackSupport />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="services" element={<ServiceManagement />} />
              <Route path="reports" element={<Reports />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  </React.StrictMode>
);