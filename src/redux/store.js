import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import identitySlice from "./identitySlice";
import accountSlice from "./accountSlice";

export default configureStore({
  reducer: {
    themeSlice: themeSlice,
    identitySlice: identitySlice,
    accountSlice: accountSlice,
  },
});
