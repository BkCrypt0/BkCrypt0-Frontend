import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import identitySlice from "./identitySlice";
import accountSlice from "./accountSlice";
import adminSlice from "./adminSlice";

export default configureStore({
  reducer: {
    themeSlice: themeSlice,
    identitySlice: identitySlice,
    accountSlice: accountSlice,
    adminSlice: adminSlice,
  },
});
