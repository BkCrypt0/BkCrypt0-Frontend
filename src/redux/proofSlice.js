import { createSlice } from "@reduxjs/toolkit";
import { FS } from "../constants";
import {
  calculateAgeProof,
  calculateProvinceProof,
  decryptQRData,
} from "src/service/utils";

const initialState = {
  generateAgeProofStatus: FS.IDLE,
  ageProof: undefined,
  provinceProof: undefined,
  generateProvinceProofStatus: FS.IDLE,
  challenge: undefined,
};

export const getChallenge = (encryptedQrData) => (dispatch) => {
  var qrData = decryptQRData(encryptedQrData);
  dispatch(getChallengeSuccess(JSON.parse(qrData)));
};

export const handleCalculateAgeProof = (input) => async (dispatch) => {
  dispatch(startGenerateAgeProof());
  try {
    calculateAgeProof(input).then((res) => {
      if (res === -1) {
        dispatch(generateAgeProofFailed());
      } else
        dispatch(
          generateAgeProofSuccess({
            maxAge: input.maxAge,
            minAge: input.minAge,
            proof: res.proof,
            input: res.input,
          })
        );
    });
  } catch (err) {
    console.log(err);
    dispatch(generateAgeProofFailed());
  }
};

export const handleCalculateProvinceProof = (input) => async (dispatch) => {
  dispatch(startGenerateProvinceProof());
  try {
    calculateProvinceProof(input).then((res) => {
      if (res === -1) {
        dispatch(generateProvinceProofFailed());
      } else
        dispatch(
          generateProvinceProofSuccess({
            proof: res.proof,
            input: res.input,
          })
        );
    });
  } catch (err) {
    dispatch(generateProvinceProofFailed());
  }
};

export const handleImportAgeProof = (input) => async (dispatch) => {
  dispatch(
    generateAgeProofSuccess({
      maxAge: input.maxAge,
      minAge: input.minAge,
      proof: input.proof,
      input: input.input,
    })
  );
};

export const handleImportProvinceProof = (input) => async (dispatch) => {
  dispatch(
    generateProvinceProofSuccess({
      proof: input.proof,
      input: input.input,
    })
  );
};

export const handleClearProof = () => (dispatch) => {
  dispatch(clearProofSuccess());
};

const proofSlice = createSlice({
  name: "proofSlice",
  initialState: initialState,
  reducers: {
    getChallengeSuccess: (state, action) => {
      state.challenge = action.payload;
    },
    startGenerateAgeProof: (state) => {
      state.generateAgeProofStatus = FS.FETCHING;
    },
    generateAgeProofSuccess: (state, action) => {
      state.ageProof = action.payload;
      state.generateAgeProofStatus = FS.SUCCESS;
    },
    generateAgeProofFailed: (state) => {
      state.generateAgeProofStatus = FS.FAILED;
    },
    startGenerateProvinceProof: (state) => {
      state.generateProvinceProofStatus = FS.FETCHING;
    },
    generateProvinceProofSuccess: (state, action) => {
      state.provinceProof = action.payload;
      state.generateProvinceProofStatus = FS.SUCCESS;
    },
    generateProvinceProofFailed: (state) => {
      state.generateProvinceProofStatus = FS.FAILED;
    },
    clearProofSuccess: (state) => {
      state.ageProof = undefined;
      state.provinceProof = undefined;
      state.generateAgeProofStatus = FS.IDLE;
      state.generateProvinceProofStatus = FS.IDLE;
    },
  },
});

export default proofSlice.reducer;
export const {
  getChallengeSuccess,
  startGenerateAgeProof,
  generateAgeProofSuccess,
  generateAgeProofFailed,
  startGenerateProvinceProof,
  generateProvinceProofSuccess,
  generateProvinceProofFailed,
  clearProofSuccess,
} = proofSlice.actions;
