import { ThemeType } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  theme: ThemeType;
}
const initialState: IState = {
  theme: "dark",
};
const ThemeSlice = createSlice({
  name: "theme-slice",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<ThemeType>) {
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
