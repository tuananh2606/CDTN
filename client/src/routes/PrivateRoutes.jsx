import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoutes() {
    let location = useLocation();
    const user = useSelector((state) => state.auth.login.currentUser);
    return user !== null && user.accessToken && user.admin ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ prevUrl: location.pathname }} />
    );
}
