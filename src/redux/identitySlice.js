import { createSlice } from "@reduxjs/toolkit";
import { FS } from "src/constants";

const initialState = {
  identity: undefined,
  fetchingStatus: FS.IDLE,
};

export const createNewIdentity =
  (publicKey, id, firstName, lastName, gender, dateOfBirth, birthPlace) =>
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
      })
    );
  };

const identitySlice = createSlice({
  name: "identitySlice",
  initialState: initialState,
  reducers: {
    createNewIdentitySuccess: (state, action) => {
      const newIdentity = {
        issuer: action.payload.publicKey,
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        sex: action.payload.gender,
        doB: action.payload.dateOfBirth,
        poB: action.payload.birthPlace,
      };
      state.identity = newIdentity;
    },
  },
});

export default identitySlice.reducer;
export const { createNewIdentitySuccess } = identitySlice.actions;
