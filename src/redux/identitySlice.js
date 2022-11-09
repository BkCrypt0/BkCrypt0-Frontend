import { createSlice } from "@reduxjs/toolkit";
import { FS } from "src/constants";

const initialState = {
  identity: undefined,
  fetchingStatus: FS.IDLE,
};

export const saveIdentityToRedux =
  (name, gender, dateOfBirth, birthPlace) => (dispatch) => {
    dispatch(
      saveIdentityToReduxSuccess({
        name: name,
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
    saveIdentityToReduxSuccess: (state, action) => {
      const newIdentity = {
        name: action.payload.name,
        gender: action.payload.gender,
        dateOfBirth: action.payload.dateOfBirth,
        birthPlace: action.payload.birthPlace,
      };
      state.identity = newIdentity;
    },
  },
});

export default identitySlice.reducer;
export const { saveIdentityToReduxSuccess } = identitySlice.actions;
