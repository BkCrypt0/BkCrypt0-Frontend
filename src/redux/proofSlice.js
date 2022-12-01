import { createSlice } from "@reduxjs/toolkit";
import { FS } from "../constants";
import { calculateAgeProof } from "src/service/utils";

const initialState = {
  generateAgeProofStatus: FS.IDLE,
  ageProof: undefined,
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
            result: res.result,
          })
        );
    });
  } catch (err) {
    dispatch(generateAgeProofFailed());
  }
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
  },
});

export default proofSlice.reducer;
export const {
  startGenerateAgeProof,
  generateAgeProofSuccess,
  generateAgeProofFailed,
} = proofSlice.actions;
