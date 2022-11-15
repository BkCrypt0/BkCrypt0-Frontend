import { createSlice } from "@reduxjs/toolkit";
import { LS } from "src/constants";
import store from "./store";
import { generatePublicAndPrivateKeyStringFromMnemonic } from "src/service/utils";

const bip39 = require("bip39");
const { generate } = require("password-hash");

const initialState = {
  cachedRoleBuffer: "user",
  activeAccount: 0,
  mnemonic: undefined,
  cachedPublicKeyBuffer: localStorage.getItem(LS.PUBLIC_KEY),
  cachedPrivateKeyBuffer: localStorage.getItem(LS.PRIVATE_KEY),
  cachedPasswordBuffer: localStorage.getItem(LS.PASSWORD),
  cachedNameBuffer: undefined,
  accounts: [],
};

export const toggleRole = () => (dispatch) => {
  dispatch(toggleRoleSuccess());
};

export const constructAccountsArrayFromLocalStorage = () => (dispatch) => {
  var arr = [];
  var count = 1;
  while (true) {
    if (
      localStorage.getItem(`${LS.PUBLIC_KEY} ${count}`) === undefined ||
      localStorage.getItem(`${LS.PUBLIC_KEY} ${count}`) === null
    )
      break;
    let publicKey = localStorage.getItem(`${LS.PUBLIC_KEY} ${count}`);
    let privateKey = localStorage.getItem(`${LS.PRIVATE_KEY} ${count}`);
    let password = localStorage.getItem(`${LS.PASSWORD} ${count}`);
    let name = localStorage.getItem(`name ${count}`);
    if (
      publicKey !== undefined &&
      publicKey !== null &&
      privateKey !== undefined &&
      privateKey !== null &&
      password !== undefined &&
      password !== null
    ) {
      arr.push({
        name: name,
        publicKey: publicKey,
        privateKey: privateKey,
        password: password,
      });
    }
    count++;
  }
  dispatch(
    constructAccountsArrayFromLocalStorageSuccess({ accountArray: arr })
  );
};
export const generateAccount = () => (dispatch) => {
  dispatch(generateAccountSuccess());
};
export const changeName = (index, newName) => (dispatch) => {
  dispatch(changeNameSuccess({ index: index, newName: newName }));
  localStorage.setItem(`name ${index + 1}`, newName);
};

export const validateMnemonic12Phrases = (testMnemonic, mnemonic) => {
  const identical = testMnemonic === mnemonic;
  const result = bip39.validateMnemonic(testMnemonic) && identical;
  if (result === true) {
    localStorage.setItem(
      `${LS.PUBLIC_KEY} ${store.getState().accountSlice.accounts.length + 1}`,
      store.getState().accountSlice.cachedPublicKeyBuffer
    );
    localStorage.setItem(
      `${LS.PRIVATE_KEY} ${store.getState().accountSlice.accounts.length + 1}`,
      store.getState().accountSlice.cachedPrivateKeyBuffer
    );
    localStorage.setItem(
      `${LS.PASSWORD} ${store.getState().accountSlice.accounts.length + 1}`,
      store.getState().accountSlice.cachedPasswordBuffer
    );
  }
  return result;
};
export const generatePairKeys =
  (input = undefined) =>
  (dispatch) => {
    const mnemonic = input === undefined ? bip39.generateMnemonic() : input;
    const { publicKeyString, privateKeyString } =
      generatePublicAndPrivateKeyStringFromMnemonic(mnemonic);
    dispatch(generateMnemonic12PhrasesSuccess({ mnemonic: mnemonic }));
    dispatch(
      generatePublicKeySuccess({ cachedPublicKeyBuffer: publicKeyString })
    );
    dispatch(
      generatePrivateKeySuccess({ cachedPrivateKeyBuffer: privateKeyString })
    );
  };

export const createNewPassword = (password) => (dispatch) => {
  dispatch(
    generatePasswordSuccess({ cachedPasswordBuffer: generate(password) })
  );
};

export const changeActiveAccount = (index) => (dispatch) => {
  dispatch(changeActiveAccountSuccess({ index: index }));
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
    generateAccountSuccess: (state) => {
      state.accounts.push({
        name: `Account ${state.accounts.length + 1}`,
        role: state.cachedRoleBuffer,
        publicKey: state.cachedPublicKeyBuffer,
        privateKey: state.cachedPrivateKeyBuffer,
        password: state.cachedPasswordBuffer,
      });
      localStorage.setItem(
        `name ${state.accounts.length}`,
        state.accounts[state.accounts.length - 1].name
      );
    },
    generatePublicKeySuccess: (state, action) => {
      state.cachedPublicKeyBuffer = action.payload.cachedPublicKeyBuffer;
    },
    generatePrivateKeySuccess: (state, action) => {
      state.cachedPrivateKeyBuffer = action.payload.cachedPrivateKeyBuffer;
    },
    generatePasswordSuccess: (state, action) => {
      state.cachedPasswordBuffer = action.payload.cachedPasswordBuffer;
    },
    constructAccountsArrayFromLocalStorageSuccess: (state, action) => {
      state.accounts = action.payload.accountArray;
    },
    changeNameSuccess: (state, action) => {
      state.accounts[action.payload.index].name = action.payload.newName;
    },
    changeActiveAccountSuccess: (state, action) => {
      state.activeAccount = action.payload.index;
    },
  },
});

export default accountSlice.reducer;
export const {
  toggleRoleSuccess,
  generateMnemonic12PhrasesSuccess,
  generatePublicKeySuccess,
  generatePrivateKeySuccess,
  generateAccountSuccess,
  generatePasswordSuccess,
  constructAccountsArrayFromLocalStorageSuccess,
  changeNameSuccess,
  changeActiveAccountSuccess,
} = accountSlice.actions;
