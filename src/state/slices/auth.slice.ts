import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ILogin } from '../../interfaces/auth.interface'

const SERVER_BASE_URL: string = import.meta.env.VITE_SERVER_BASE_URL;

interface IState {
    user: ILogin | null
    error: string | null
    isLoading: boolean
}

const initialState: IState = {
    user: null,
    error: null,
    isLoading: false
}

interface IAuth {
    email: string
    password: string
}

export const AuthUser = createAsyncThunk(
    "user/auth",
    async (payload: IAuth) => {
        const response = await fetch(`${SERVER_BASE_URL}/auth/login`, { method: "POST" });
        const data = await response.json();
        return data;
    }
)

const AuthSlice = createSlice({
    name: "auth-slice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(
            AuthUser.pending,
            (state) => {
                state.isLoading = true;
            }
        ).addCase(
            AuthUser.fulfilled,
            (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            }
        ).addCase(
            AuthUser.rejected,
            (state) => {
                state.error = "Error ocured!";
            }
        )
    }
})


export default AuthSlice.reducer