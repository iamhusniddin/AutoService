import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // If no token, redirect to sign-in page
    return <Navigate to="/sign-in" />;
  }

  // If token exists, render the children components (protected pages)
  return children;
};

export default ProtectedRoute;
