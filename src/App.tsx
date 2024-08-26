
import React, { FC, useEffect } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages";
import ForgotPasswordPage from "./pages/authentication/forgot-password";
import ProfileLockPage from "./pages/authentication/profile-lock";
import ResetPasswordPage from "./pages/authentication/reset-password";
import SignInPage from "./pages/authentication/sign-in";
import SignUpPage from "./pages/authentication/sign-up";
import FlowbiteWrapper from "./components/flowbite-wrapper";
import CoursesPage from "./pages/courses/CoursesPage";
import SessionsPage from "./pages/sessions/SessionsPage";
import ReportsPage from "./pages/reports/ReportsPage";
import ParticipantsPage from "./pages/participants/ParticipantsPage";
import FacilitatorsPage from "./pages/facilitators/FacilitatorsPage";

const queryClient = new QueryClient()

const ProtectedRoute: FC<{ element: React.ReactElement }> = ({ element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('userRole');

    if (!accessToken || userRole === 'owner') {
      // Redirect to sign-in page if accessToken is not available
      navigate('/authentication/sign-in', { state: { from: location }, replace: true });
    }
  }, [navigate, location]);

  return element;
};

const App: FC = function () {
  return (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<FlowbiteWrapper />}>
          <Route path="/" element={<ProtectedRoute element={<DashboardPage />} />} index />
          <Route path="/authentication/sign-in" element={<SignInPage />} />
          <Route path="/authentication/sign-up" element={<SignUpPage />} />
          <Route
            path="/authentication/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            path="/authentication/reset-password"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/authentication/profile-lock"
            element={<ProfileLockPage />}
          />
          <Route
                path="/courses/courses"
                element={<ProtectedRoute element={<CoursesPage />} />}
            />
<Route
                path="/sessions/sessions"
                element={<ProtectedRoute element={<SessionsPage />} />}
            />
<Route
                path="/reports/reports"
                element={<ProtectedRoute element={<ReportsPage />} />}
            />
<Route
                path="/participants/participants"
                element={<ProtectedRoute element={<ParticipantsPage />} />}
            />
<Route
                path="/facilitators/facilitators"
                element={<ProtectedRoute element={<FacilitatorsPage />} />}
            />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
  );
};

export default App;
    