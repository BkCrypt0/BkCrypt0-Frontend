import { configureStore } from "@reduxjs/toolkit";
import identitySlice from "./identitySlice";
import accountSlice from "./accountSlice";
import adminSlice from "./adminSlice";
import walletSlice from "./walletSlice";
import proofSlice from "./proofSlice";

export default configureStore({
  reducer: {
    identitySlice: identitySlice,
    accountSlice: accountSlice,
    adminSlice: adminSlice,
    walletSlice: walletSlice,
    proofSlice: proofSlice,
  },
});
