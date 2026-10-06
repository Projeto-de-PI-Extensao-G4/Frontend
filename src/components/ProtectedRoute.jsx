import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute() {
  const { user } = useAuth();
  
  // If no user is logged in, redirect to the login page
  if (!user && !localStorage.getItem('token')) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
