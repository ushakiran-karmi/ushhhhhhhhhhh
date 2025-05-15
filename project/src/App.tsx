import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { UserRole } from './types';

// Layout components
import ClientLayout from './layouts/ClientLayout';
import WriterLayout from './layouts/WriterLayout';
import SupervisorLayout from './layouts/SupervisorLayout';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Client pages
import ClientDashboard from './pages/client/Dashboard';
import NewResumeRequest from './pages/client/NewResumeRequest';
import ResumeRequestDetail from './pages/client/ResumeRequestDetail';
import ResumeFormPage from './pages/client/ResumeFormPage';
import ClientProfilePage from './pages/client/ProfilePage';

// Writer pages
import WriterDashboard from './pages/writer/Dashboard';
import AssignedRequests from './pages/writer/AssignedRequests';
import WriterResumeDetail from './pages/writer/ResumeDetail';
import WalletPage from './pages/writer/WalletPage';
import WriterProfilePage from './pages/writer/ProfilePage';

// Supervisor pages
import SupervisorDashboard from './pages/supervisor/Dashboard';
import PendingAssignments from './pages/supervisor/PendingAssignments';
import WriterManagement from './pages/supervisor/WriterManagement';
import FeedbackManagement from './pages/supervisor/FeedbackManagement';
import PayoutManagement from './pages/supervisor/PayoutManagement';

// Shared pages
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import PageLoader from './components/common/PageLoader';

function App() {
  const { authUser, loading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <PageLoader />;
  }

  // Routes that don't require authentication
  const publicRoutes = (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  // Routes for authenticated clients
  const clientRoutes = (
    <Routes>
      <Route element={<ClientLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/request/new" element={<NewResumeRequest />} />
        <Route path="/client/request/:id" element={<ResumeRequestDetail />} />
        <Route path="/client/resume-form/:category" element={<ResumeFormPage />} />
        <Route path="/client/profile" element={<ClientProfilePage />} />
      </Route>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

  // Routes for authenticated writers
  const writerRoutes = (
    <Routes>
      <Route element={<WriterLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/writer/dashboard" element={<WriterDashboard />} />
        <Route path="/writer/requests" element={<AssignedRequests />} />
        <Route path="/writer/request/:id" element={<WriterResumeDetail />} />
        <Route path="/writer/wallet" element={<WalletPage />} />
        <Route path="/writer/profile" element={<WriterProfilePage />} />
      </Route>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

  // Routes for authenticated supervisors
  const supervisorRoutes = (
    <Routes>
      <Route element={<SupervisorLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
        <Route path="/supervisor/pending-assignments" element={<PendingAssignments />} />
        <Route path="/supervisor/writers" element={<WriterManagement />} />
        <Route path="/supervisor/feedback" element={<FeedbackManagement />} />
        <Route path="/supervisor/payouts" element={<PayoutManagement />} />
      </Route>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

  // Return the appropriate routes based on user role
  if (!authUser) {
    return publicRoutes;
  }

  switch (authUser.role) {
    case UserRole.CLIENT:
      return clientRoutes;
    case UserRole.WRITER:
      return writerRoutes;
    case UserRole.SUPERVISOR:
      return supervisorRoutes;
    default:
      return publicRoutes;
  }
}

export default App;