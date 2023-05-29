import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogin } from "../../interfaces/auth.interface";
import {
  AuthUser,
  CheckVerificationCode,
  RetrieveUser,
  SignupUser,
} from "../reducers/auth.reducer";
interface IState {
  user: ILogin | null;
  error: string | null;
  isLoading: boolean;
  isTokenExist: "exists" | "loading" | "not_exists";
}

const initialState: IState = {
  user: null,
  error: null,
  isTokenExist: "exists",
  isLoading: false,
};

const AuthSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    ResetUser: (state) => {
      state.user = null;
    },
    UpdateUser: (state, action: PayloadAction<ILogin>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(AuthUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(AuthUser.rejected, (state) => {
        state.error = "Incorrect credentials!";
        state.isLoading = false;
      })
      .addCase(SignupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(SignupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(SignupUser.rejected, (state) => {
        state.isLoading = false;
        state.error = "Error occurred!";
      })
      .addCase(RetrieveUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isTokenExist = "loading";
        state.user = null;
      })
      .addCase(RetrieveUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isTokenExist = "exists";
      })
      .addCase(RetrieveUser.rejected, (state) => {
        state.isLoading = false;
        state.isTokenExist = "not_exists";
        state.error = "Error occurred!";
      })
      .addCase(CheckVerificationCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(CheckVerificationCode.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(CheckVerificationCode.rejected, (state) => {
        state.isLoading = false;
        state.error =
          "Validation code is not correct! check mail and try again!";
      });
  },
});

export const { ResetUser, UpdateUser } = AuthSlice.actions;

export default AuthSlice.reducer;
