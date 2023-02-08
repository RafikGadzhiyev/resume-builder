import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    // !just for now
    return true
        ? <Navigate
            to='/auth'
            replace
        />
        : <Outlet />
}