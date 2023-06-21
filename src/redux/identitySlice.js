import { createSlice } from "@reduxjs/toolkit";
import { FS, BASE_API_URL } from "src/constants";
import { generatePublicKeyPair } from "src/service/utils";
import { extractPlaceInformation } from "src/service/utils";
import Axios from "axios";
const BigInt = require("big-integer");

var FileSaver = require("file-saver");
const { eddsa, mimc7 } = require("circomlib");

const initialState = {
  fetchingStatus: FS.IDLE,
  requestingIdentityStatus: FS.IDLE,
  fetchingIdentityStatus: FS.IDLE,
  fetchingUserProofStatus: FS.IDLE,
  identityStatus: 0,
  proof: undefined,
};

export const fetchUserProof = (publicKey) => async (dispatch) => {
  dispatch(startFetchUserProof());
  const publicKeyPair = generatePublicKeyPair(publicKey);
  try {
    const res = await Axios.get(
      `${BASE_API_URL}/users/proof?publicKeyX=${publicKeyPair[0]}&publicKeyY=${publicKeyPair[1]}`
    );
    const data = res.data;
    dispatch(fetchUserProofSuccess(data));
  } catch (err) {
    dispatch(fetchUserProofFailed());
  }
};

export const createNewIdentity =
  (publicKey, CCCD, name, sex, dob, birthPlace, save = false) =>
  (dispatch) => {
    dispatch(
      createNewIdentitySuccess({
        publicKey: publicKey,
        CCCD: CCCD,
        name: name,
        sex: sex,
        sexID: sex === "Nam" ? 1 : 0,
        dob: dob,
        birthPlace: birthPlace,
        birthPlaceID: extractPlaceInformation(birthPlace),
        save: save,
      })
    );
  };

export const clearIdentity = () => (dispatch) => {
  dispatch(clearIdentitySuccess());
};

export const requestIdentity =
  (
    publicKey,
    privateKey,
    name,
    CCCD,
    sex,
    sexID,
    dob,
    birthPlace,
    birthPlaceID
  ) =>
  async (dispatch) => {
    dispatch(startRequestIdentity());
    console.log(publicKey);
    const publicKeyPair = generatePublicKeyPair(publicKey?.toString());
    const hashValue = mimc7.multiHash([
      BigInt(publicKeyPair[0]).value,
      BigInt(publicKeyPair[1]).value,
      BigInt(CCCD).value,
      BigInt(sexID).value,
      BigInt(dob).value,
      BigInt(birthPlaceID).value,
    ]);
    const privateKeyArray = Buffer.from(privateKey.toString(), "hex");
    const signature = eddsa.signMiMC(privateKeyArray, hashValue);
    const R8x = signature.R8[0].toString();
    const R8y = signature.R8[1].toString();
    const S = signature.S.toString();

    const requestBody = {
      requester: publicKeyPair,
      CCCD: CCCD,
      name: name,
      sexDetail: sex,
      sex: sexID,
      DoBdate: dob,
      BirthPlaceDetail: birthPlace,
      BirthPlace: birthPlaceID,
      signature: {
        R8x: R8x,
        R8y: R8y,
        S: S,
      },
    };

    try {
      await Axios.post(`${BASE_API_URL}/request`, requestBody);
      dispatch(fetchIdentity());
      dispatch(requestIdentitySuccess());
      setTimeout(() => {
        dispatch(resetRequestingIdentityStatus());
      }, 1000);
    } catch (err) {
      dispatch(requestIdentityFailed());
      setTimeout(() => {
        dispatch(resetRequestingIdentityStatus());
      }, 1000);
    }
  };

export const fetchIdentity = (publicKey) => async (dispatch) => {
  dispatch(startFetchIdentity());
  const publicKeyPair = generatePublicKeyPair(publicKey);
  try {
    const res = await Axios.get(
      `${BASE_API_URL}/users/?publicKeyX=${publicKeyPair[0]}&publicKeyY=${publicKeyPair[1]}`
    );
    const data = res.data;
    dispatch(
      fetchIdentitySuccess({
        identity: {
          requester: publicKey,
          CCCD: data.CCCD,
          name: data.name,
          sex: data.sexDetail,
          sexID: data.sex,
          dob: data.DoBdate,
          birthPlace: data.BirthPlaceDetail,
          birthPlaceID: data.BirthPlace,
          requestAt: data.requestAt,
          status: data.status,
        },
      })
    );
    dispatch(updateIdentityStatusSuccess(data.status));
  } catch (err) {
    dispatch(fetchIdentityFailed());
  }
};

const identitySlice = createSlice({
  name: "identitySlice",
  initialState: initialState,
  reducers: {
    createNewIdentitySuccess: (state, action) => {
      const newIdentity = {
        publicKey: action.payload.publicKey,
        CCCD: action.payload.CCCD,
        name: action.payload.name,
        sex: action.payload.sex,
        sexID: action.payload.sexID,
        dob: action.payload.dob,
        birthPlace: action.payload.birthPlace,
        birthPlaceID: action.payload.birthPlaceID,
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
    startRequestIdentity: (state) => {
      state.requestingIdentityStatus = FS.FETCHING;
    },
    requestIdentityFailed: (state) => {
      state.requestingIdentityStatus = FS.FAILED;
    },
    requestIdentitySuccess: (state) => {
      state.requestingIdentityStatus = FS.SUCCESS;
    },
    startFetchIdentity: (state) => {
      state.fetchingIdentityStatus = FS.FETCHING;
    },
    fetchIdentityFailed: (state) => {
      state.identityStatus = 0;
      state.fetchingIdentityStatus = FS.FAILED;
    },
    fetchIdentitySuccess: (state, action) => {
      state.identity = action.payload.identity;
      state.fetchingIdentityStatus = FS.SUCCESS;
    },
    updateIdentityStatusSuccess: (state, action) => {
      state.identityStatus = action.payload;
    },
    startFetchUserProof: (state) => {
      state.fetchingUserProofStatus = FS.FETCHING;
    },
    fetchUserProofSuccess: (state, action) => {
      state.proof = action.payload;
      state.fetchingUserProofStatus = FS.SUCCESS;
    },
    fetchUserProofFailed: (state) => {
      state.fetchingUserProofStatus = FS.FAILED;
    },
    resetRequestingIdentityStatus: (state) => {
      state.requestingIdentityStatus = FS.IDLE;
    },
  },
});

export default identitySlice.reducer;
export const {
  createNewIdentitySuccess,
  clearIdentitySuccess,
  startRequestIdentity,
  requestIdentityFailed,
  requestIdentitySuccess,
  startFetchIdentity,
  fetchIdentityFailed,
  fetchIdentitySuccess,
  updateIdentityStatusSuccess,
  startFetchUserProof,
  fetchUserProofSuccess,
  fetchUserProofFailed,
  resetRequestingIdentityStatus,
} = identitySlice.actions;
