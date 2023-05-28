import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/auth.slice";
import ResumeSlice from "./slices/resume.slice";
import ThemeSlice from "./slices/theme.slice";

export const store = configureStore({
  reducer: {
    authReducer: AuthSlice,
    resumeReducer: ResumeSlice,
    themeReducer: ThemeSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
