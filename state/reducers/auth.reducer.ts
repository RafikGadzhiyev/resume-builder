import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuth, ISignup } from "../../interfaces/auth.interface";

const SERVER_BASE_URL: string = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "";

export const AuthUser = createAsyncThunk(
  "user/auth",
  async (payload: IAuth, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Incorrect credentials!");
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
);

export const SignupUser = createAsyncThunk(
  "user/sign_up",
  async (payload: ISignup, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/auth/sign_up`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Incorrect credentials!");
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
);

export const RetrieveUser = createAsyncThunk(
  "user/retrieve",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/token/retrieve`, {
        credentials: "include",
      });
      if (!response.ok) {
        return rejectWithValue("Token wasn't found");
      }
      const data = await response.json();
      return data.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const CheckVerificationCode = createAsyncThunk(
  "user/check_verification_code",
  async (payload: { user_id: string; code: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/verification/check_code?user_id=${payload.user_id}&code=${payload.code}`
      );
      if (!response.ok) {
        throw new Error("Token does not exist!");
      }
      return true;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
