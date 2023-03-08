import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Profile } from '../components/Profile';
import { RetrieveUser, UpdateUser } from '../state/slices/auth.slice';
import { AppDispatch, RootState } from '../state/store';

const TOKEN_LIFE_CRITICAL_POINT: number = 10000;

export const ProtectedRoute = () => {
    const userData = useSelector((store: RootState) => store.authReducer.user);
    const isLoading = useSelector((store: RootState) => store.authReducer.isLoading)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (!userData && !isLoading) {
            dispatch(RetrieveUser())
                .then(response => {
                    if (response.meta.requestStatus === 'rejected') {
                        navigate('/auth');
                    } else {
                        navigate('/profile')
                    }
                })
        } else {
            // if(userData.)
        }
    }, [])

    // React.useEffect(() => {
    //     if (userData !== null && userData.exp) {
    //         let tokenLife = (userData.exp * 1000) - (Date.now());
    //         if (tokenLife <= TOKEN_LIFE_CRITICAL_POINT) {

    //         }
    //     }
    // }, [userData])

    return userData === null && location.pathname !== '/auth'
        ? <Navigate
            to='/auth'
            replace
        />
        : <Outlet />
}