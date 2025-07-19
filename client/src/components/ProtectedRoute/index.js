import { Navigate } from 'react-router-dom';
import { getToken, isTokenExpired } from '../../utils/auth';

export default function ProtectedRoute({ children }) {
  const token = getToken();
  return token && !isTokenExpired(token) ? children : <Navigate to="/" replace />;
}
