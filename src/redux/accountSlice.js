import { createSlice } from "@reduxjs/toolkit";
import { LS } from "src/constants";
import store from "./store";
import {
  generatePublicAndPrivateKeyStringFromMnemonic,
  generatePublicKeyStringFromPrivateKeyString,
} from "src/service/utils";
import { BASE_API_URL } from "src/constants";
import Axios from "axios";

const bip39 = require("bip39");
const { generate } = require("password-hash");
const { eddsa, babyJub } = require("circomlib");

const initialLogin = localStorage.getItem(LS.LOGIN);
const initialActiveAccount = localStorage.getItem(LS.ACTIVE_ACCOUNT);

export const constructInitialAccounts = () => {
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
    let name = localStorage.getItem(`${LS.NAME} ${count}`);
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

  return arr;
};

const initialState = {
  isLogin: initialLogin === null ? undefined : initialLogin,
  activeAccount:
    initialActiveAccount === null ? undefined : initialActiveAccount,
  mnemonic: undefined,
  cachedPublicKeyBuffer: localStorage.getItem(LS.PUBLIC_KEY),
  cachedPrivateKeyBuffer: localStorage.getItem(LS.PRIVATE_KEY),
  cachedPasswordBuffer: localStorage.getItem(LS.PASSWORD),
  cachedNameBuffer: undefined,
  accounts: constructInitialAccounts(),
};

export const login = (publicKey) => (dispatch) => {
  dispatch(loginSuccess({ publicKey: publicKey }));
};

export const logout = () => (dispatch) => {
  dispatch(logoutSuccess());
};

export const generateSignature = (privateKeyString, msg) => {
  const privateKeyBuffer = Buffer.from(privateKeyString, "hex");
  const message = babyJub.F.e(msg);
  return eddsa.signPoseidon(privateKeyBuffer, message);
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
    let name = localStorage.getItem(`${LS.NAME} ${count}`);
    let role = localStorage.getItem(`${LS.ROLE} ${count}`);
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
        role: role,
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
export const generateAccount = () => async (dispatch) => {
  const publicKey = store.getState().accountSlice.cachedPublicKeyBuffer;
  const publicKeyBuffer = Buffer.from(publicKey, "hex");
  var publicKeyPair = babyJub
    .unpackPoint(publicKeyBuffer)
    .map((e) => e.toString(16));
  const request = await Axios.get(
    `${BASE_API_URL}/authen?publicKeyX=${publicKeyPair[0]}&publicKeyY=${publicKeyPair[1]}`
  );
  const data = request.data;
  const role = data.roles === 1 ? "admin" : "user";
  dispatch(generateAccountSuccess({ role: role }));
};

export const changeName = (index, newName) => (dispatch) => {
  dispatch(changeNameSuccess({ index: index, newName: newName }));
  localStorage.setItem(`${LS.NAME} ${index + 1}`, newName);
};

export const validateMnemonic12Phrases = async (
  testMnemonic,
  mnemonic,
  offset
) => {
  const identical = testMnemonic === mnemonic;
  const result = bip39.validateMnemonic(testMnemonic) && identical;
  const publicKey = store.getState().accountSlice.cachedPublicKeyBuffer;
  const publicKeyBuffer = Buffer.from(publicKey, "hex");
  var publicKeyPair = babyJub
    .unpackPoint(publicKeyBuffer)
    .map((e) => e.toString(16));
  const request = await Axios.get(
    `${BASE_API_URL}/authen?publicKeyX=${publicKeyPair[0]}&publicKeyY=${publicKeyPair[1]}`
  );
  const data = request.data;
  const role = data.roles === 1 ? "admin" : "user";

  if (result === true) {
    localStorage.setItem(
      `${LS.PUBLIC_KEY} ${
        store.getState().accountSlice.accounts.length + offset
      }`,
      store.getState().accountSlice.cachedPublicKeyBuffer
    );
    localStorage.setItem(
      `${LS.PRIVATE_KEY} ${
        store.getState().accountSlice.accounts.length + offset
      }`,
      store.getState().accountSlice.cachedPrivateKeyBuffer
    );

    localStorage.setItem(
      `${LS.PASSWORD} ${
        store.getState().accountSlice.accounts.length + offset
      }`,
      store.getState().accountSlice.cachedPasswordBuffer
    );

    localStorage.setItem(
      `${LS.ROLE} ${store.getState().accountSlice.accounts.length + offset}`,
      role
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

export const generatePublicKeyFromPrivateKey = (privateKey) => (dispatch) => {
  const publicKey = generatePublicKeyStringFromPrivateKeyString(privateKey);
  dispatch(generatePublicKeySuccess({ cachedPublicKeyBuffer: publicKey }));
  dispatch(generatePrivateKeySuccess({ cachedPrivateKeyBuffer: privateKey }));
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
    generateMnemonic12PhrasesSuccess: (state, action) => {
      state.mnemonic = action.payload.mnemonic;
    },
    generateAccountSuccess: (state, action) => {
      state.accounts.push({
        name: `Account ${state.accounts.length + 1}`,
        role: action.payload.role,
        publicKey: state.cachedPublicKeyBuffer,
        privateKey: state.cachedPrivateKeyBuffer,
        password: state.cachedPasswordBuffer,
      });
      localStorage.setItem(
        `${LS.NAME} ${state.accounts.length}`,
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
      localStorage.setItem(`${LS.ACTIVE_ACCOUNT}`, state.activeAccount);
    },
    loginSuccess: (state, action) => {
      state.isLogin = action.payload.publicKey;
      localStorage.setItem(`${LS.LOGIN}`, state.isLogin);
    },
    logoutSuccess: (state) => {
      state.isLogin = undefined;
      localStorage.setItem(LS.LOGIN, undefined);
    },
  },
});

export default accountSlice.reducer;
export const {
  generateMnemonic12PhrasesSuccess,
  generatePublicKeySuccess,
  generatePrivateKeySuccess,
  generateAccountSuccess,
  generatePasswordSuccess,
  constructAccountsArrayFromLocalStorageSuccess,
  changeNameSuccess,
  changeActiveAccountSuccess,
  loginSuccess,
  logoutSuccess,
} = accountSlice.actions;
