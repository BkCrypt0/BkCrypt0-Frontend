import { createSlice } from "@reduxjs/toolkit";
import { FS } from "src/constants";

var FileSaver = require("file-saver");

const initialState = {
  identity: undefined,
  fetchingStatus: FS.IDLE,
};

export const createNewIdentity =
  (
    publicKey,
    id,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    birthPlace,
    save = false
  ) =>
  (dispatch) => {
    dispatch(
      createNewIdentitySuccess({
        publicKey: publicKey,
        id: id,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dateOfBirth: dateOfBirth,
        birthPlace: birthPlace,
        save: save,
      })
    );
  };

export const clearIdentity = () => (dispatch) => {
  dispatch(clearIdentitySuccess());
};

const identitySlice = createSlice({
  name: "identitySlice",
  initialState: initialState,
  reducers: {
    createNewIdentitySuccess: (state, action) => {
      const newIdentity = {
        publicKey: action.payload.publicKey,
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        sex: action.payload.gender,
        doB: action.payload.dateOfBirth,
        poB: action.payload.birthPlace,
      };
      state.identity = newIdentity;
      if (action.payload.save === true) {
        const identityJSON = JSON.stringify(newIdentity);
        var blob = new Blob([identityJSON], {
          type: "text/plain;charset=utf-8",
        });
        FileSaver.saveAs(blob, "identity.json");
      }
    },
    clearIdentitySuccess: (state) => {
      state.identity = undefined;
    },
  },
});

export default identitySlice.reducer;
export const { createNewIdentitySuccess, clearIdentitySuccess } =
  identitySlice.actions;
