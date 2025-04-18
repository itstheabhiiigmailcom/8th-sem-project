import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    // Show a loading spinner or just null until auth check finishes
    return <div>Loading...</div>;
  }

  // console.log('user in protected route:', user);
  return user ? children : <Navigate to="/" />;
}
