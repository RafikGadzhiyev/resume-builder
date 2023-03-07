import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../state/store';

export const ProtectedRoute = () => {
    const userData = useSelector((store: RootState) => store.authReducer.user);

    return userData === null
        ? <Navigate
            to='/auth'
            replace
        />
        : <Outlet />
}