import { createSlice } from "@reduxjs/toolkit";
import { THEME_MODE, LS } from "../constants";

const initialThemeMode = localStorage.getItem(LS.THEME);

const initialState = {
  themeMode: initialThemeMode === null ? THEME_MODE.LIGHT : initialThemeMode,
};

export const toggleThemeMode = () => (dispatch) => {
  dispatch(toggleThemeModeSuccess());
};

const proofSlice = createSlice({
  name: "themeSlice",
  initialState: initialState,
  reducers: {
    toggleThemeModeSuccess: (state) => {
      const themeMode =
        state.themeMode === THEME_MODE.DARK
          ? THEME_MODE.LIGHT
          : THEME_MODE.DARK;
      state.themeMode = themeMode;
      localStorage.setItem(LS.THEME, themeMode);
    },
  },
});

export default proofSlice.reducer;
export const { toggleThemeModeSuccess } = proofSlice.actions;
