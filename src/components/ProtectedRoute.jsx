import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    // If no token exists, send user to login page
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;