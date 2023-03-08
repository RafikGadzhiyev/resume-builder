import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
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

interface ISignup extends IAuth {
    fullname: string
}

export const AuthUser = createAsyncThunk(
    "user/auth",
    async (payload: IAuth, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_BASE_URL}/auth/login`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("Incorrect credentials!")
            }
            const data = await response.json();
            return data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }

            return rejectWithValue(err.response.data);
        }
    }
)

export const SignupUser = createAsyncThunk(
    "user/sign_up",
    async (payload: ISignup, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_BASE_URL}/auth/sign_up`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error("Incorrect credentials!")
            }
            const data = await response.json();
            return data;
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }

    }
)

export const RetrieveUser = createAsyncThunk(
    "user/retrieve",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${SERVER_BASE_URL}/token/retrieve`,
                {
                    credentials: "include"
                }
            );
            if (!response.ok) {
                throw new Error("Token does not exist!")
            }
            const data = await response.json();
            return data.data;
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)


const AuthSlice = createSlice({
    name: "auth-slice",
    initialState,
    reducers: {
        ResetUser: (state) => {
            state.user = null;
        },
        UpdateUser: (state, action: PayloadAction<ILogin>) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            AuthUser.pending,
            (state) => {
                state.isLoading = true;
                state.error = null;
                state.user = null;
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
                state.error = "Incorrect credentials!";
                state.isLoading = false;
            }
        ).addCase(
            SignupUser.pending,
            (state) => {
                state.isLoading = true;
                state.error = null;
                state.user = null;
            }
        ).addCase(
            SignupUser.fulfilled,
            (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            }
        ).addCase(
            SignupUser.rejected,
            (state) => {
                state.isLoading = false;
                state.error = "Error ocured!"
            }
        ).addCase(
            RetrieveUser.pending,
            (state) => {
                state.isLoading = true
                state.error = null;
                state.user = null;
            }
        ).addCase(
            RetrieveUser.fulfilled,
            (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            }
        ).addCase(
            RetrieveUser.rejected,
            (state) => {
                state.isLoading = false;
                state.error = "Error ocured!"
            }
        )
    }
})


export const { ResetUser, UpdateUser } = AuthSlice.actions

export default AuthSlice.reducer