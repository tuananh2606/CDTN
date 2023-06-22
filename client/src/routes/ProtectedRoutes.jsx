import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function ProtectedRoutes() {
    let location = useLocation();
    const user = useSelector((state) => state.auth.login.currentUser);
    return user !== null && user.accessToken ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ prevUrl: location.pathname }} />
    );
}
