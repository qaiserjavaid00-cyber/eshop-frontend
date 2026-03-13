import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

export const UnauthorizedRoute = ({ children, redirectTo = '/profile', }) => {
     const status = useSelector((state) => state.user.status)
    const auth = status === "authenticated"

    if (auth) {
        return <Navigate to={redirectTo} replace={true} />;
    }

    return children;
};
