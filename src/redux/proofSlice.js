import { createSlice } from "@reduxjs/toolkit";
import { FS } from "../constants";
import { calculateAgeProof, calculateProvinceProof } from "src/service/utils";

const initialState = {
  generateAgeProofStatus: FS.IDLE,
  ageProof: undefined,
  provinceProof: undefined,
  generateProvinceProofStatus: FS.IDLE,
};

export const handleCaculateAgeProof = (input) => async (dispatch) => {
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
    dispatch(generateAgeProofFailed());
  }
};

export const handleCaculateProvinceProof = (input) => async (dispatch) => {
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

const proofSlice = createSlice({
  name: "proofSlice",
  initialState: initialState,
  reducers: {
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
  },
});

export default proofSlice.reducer;
export const {
  startGenerateAgeProof,
  generateAgeProofSuccess,
  generateAgeProofFailed,
  startGenerateProvinceProof,
  generateProvinceProofSuccess,
  generateProvinceProofFailed,
} = proofSlice.actions;
