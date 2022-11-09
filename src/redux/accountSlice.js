import { createSlice } from "@reduxjs/toolkit";
import { LS } from "src/constants";
import store from "./store";

const bip39 = require("bip39");
const HDKey = require("hdkey");

const initialState = {
  account: undefined,
  role: "user",
  mnemonic: undefined,
  publicKey: localStorage.getItem(LS.PUBLIC_KEY),
  privateKey: localStorage.getItem(LS.PRIVATE_KEY),
  password: localStorage.getItem(LS.PASSWORD),
};

export const toggleRole = () => (dispatch) => {
  dispatch(toggleRoleSuccess());
};

export const validateMnemonic12Phrases = (testMnemonic, mnemonic) => {
  const identical = testMnemonic === mnemonic;
  const result = bip39.validateMnemonic(testMnemonic) && identical;
  if (result === true) {
    localStorage.setItem(
      LS.PUBLIC_KEY,
      store.getState().accountSlice.publicKey
    );
    localStorage.setItem(
      LS.PRIVATE_KEY,
      store.getState().accountSlice.privateKey
    );
    localStorage.setItem(LS.PASSWORD, store.getState().accountSlice.password);
  }
  return result;
};
export const generatePairKeys = () => (dispatch) => {
  const mnemonic = bip39.generateMnemonic();
  const hdkey = HDKey.fromMasterSeed(Buffer.from(mnemonic, "hex"));
  dispatch(generateMnemonic12PhrasesSuccess({ mnemonic: mnemonic }));
  dispatch(generatePublicKeySuccess({ publicKey: hdkey.publicExtendedKey }));
  dispatch(generatePrivateKeySuccess({ privateKey: hdkey.privateExtendedKey }));
};

export const createNewPassword = (password) => (dispatch) => {
  dispatch(createNewPasswordSuccess({ password: password }));
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: initialState,
  reducers: {
    toggleRoleSuccess: (state) => {
      if (state.role === "user") state.role = "admin";
      else if (state.role === "admin") state.role = "user";
    },
    generateMnemonic12PhrasesSuccess: (state, action) => {
      state.mnemonic = action.payload.mnemonic;
    },
    generatePublicKeySuccess: (state, action) => {
      state.publicKey = action.payload.publicKey;
    },
    generatePrivateKeySuccess: (state, action) => {
      state.privateKey = action.payload.privateKey;
    },
    createNewPasswordSuccess: (state, action) => {
      state.password = action.payload.password;
    },
  },
});

export default accountSlice.reducer;
export const {
  toggleRoleSuccess,
  generateMnemonic12PhrasesSuccess,
  generatePublicKeySuccess,
  generatePrivateKeySuccess,
  createNewPasswordSuccess,
} = accountSlice.actions;
