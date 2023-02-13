import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './slices/auth.slice'

export const store = configureStore({
    reducer: {
        authReducer: AuthSlice
    },
    devTools: import.meta.env.NODE_ENV !== 'production'
})

export type AppDispatch = typeof store.dispatch