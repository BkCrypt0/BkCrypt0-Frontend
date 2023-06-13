import { configureStore } from "@reduxjs/toolkit";
import identitySlice from "./identitySlice";
import accountSlice from "./accountSlice";
import adminSlice from "./adminSlice";
import walletSlice from "./walletSlice";
import proofSlice from "./proofSlice";
import imageIDSlice from "./imageIDSlice";

export default configureStore({
  reducer: {
    identitySlice: identitySlice,
    accountSlice: accountSlice,
    adminSlice: adminSlice,
    walletSlice: walletSlice,
    proofSlice: proofSlice,
    imageIDSlice: imageIDSlice,
  },
});
