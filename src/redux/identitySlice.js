import { createSlice } from "@reduxjs/toolkit";
import { FS, BASE_API_URL } from "src/constants";
import { generatePublicKeyPair } from "src/service/utils";
import Axios from "axios";
const BigInt = require("big-integer");

var FileSaver = require("file-saver");
const { eddsa, mimc7 } = require("circomlib");

const initialState = {
  fetchingStatus: FS.IDLE,
  claimingIdentityStatus: FS.IDLE,
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
  (
    publicKey,
    CCCD,
    firstName,
    lastName,
    sex,
    DoBdate,
    BirthPlace,
    save = false
  ) =>
  (dispatch) => {
    dispatch(
      createNewIdentitySuccess({
        publicKey: publicKey,
        CCCD: CCCD,
        firstName: firstName,
        lastName: lastName,
        sex: sex,
        DoBdate: DoBdate,
        BirthPlace: BirthPlace,
        save: save,
      })
    );
  };

export const clearIdentity = () => (dispatch) => {
  dispatch(clearIdentitySuccess());
};

export const claimIdentity =
  ({
    publicKey,
    privateKey,
    CCCD,
    sex,
    DoBdate,
    BirthPlace,
    firstName,
    lastName,
  }) =>
  async (dispatch) => {
    dispatch(startClaimIdentity());
    const publicKeyPair = generatePublicKeyPair(publicKey);
    const hashValue = mimc7.multiHash([
      BigInt(publicKeyPair[0]).value,
      BigInt(publicKeyPair[1]).value,
      BigInt(CCCD).value,
      BigInt(sex).value,
      BigInt(DoBdate).value,
      BigInt(BirthPlace).value,
    ]);
    const privateKeyArray = Buffer.from(privateKey.toString(), "hex");
    const signature = eddsa.signMiMC(privateKeyArray, hashValue);
    const R8x = signature.R8[0].toString();
    const R8y = signature.R8[1].toString();
    const S = signature.S.toString();

    const requestBody = {
      publicKey: publicKeyPair,
      CCCD: CCCD,
      firstName: firstName,
      lastName: lastName,
      sex: sex,
      DoBdate: DoBdate,
      BirthPlace: BirthPlace,
      signature: {
        R8x: R8x,
        R8y: R8y,
        S: S,
      },
    };

    try {
      await Axios.post(`${BASE_API_URL}/claimed`, requestBody);
      dispatch(fetchIdentity());
      dispatch(claimIdentitySuccess());
    } catch (err) {
      dispatch(claimIdentityFailed());
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
          publicKey: publicKey,
          CCCD: data.CCCD,
          firstName: data.firstName,
          lastName: data.lastName,
          sex: data.sex,
          DoBdate: data.DoBdate,
          BirthPlace: data.BirthPlace,
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
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        sex: action.payload.sex,
        DoBdate: action.payload.DoBdate,
        BirthPlace: action.payload.BirthPlace,
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
    startClaimIdentity: (state) => {
      state.claimingIdentityStatus = FS.FETCHING;
    },
    claimIdentityFailed: (state) => {
      state.claimingIdentityStatus = FS.FAILED;
    },
    claimIdentitySuccess: (state) => {
      state.claimingIdentityStatus = FS.SUCCESS;
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
  },
});

export default identitySlice.reducer;
export const {
  createNewIdentitySuccess,
  clearIdentitySuccess,
  startClaimIdentity,
  claimIdentityFailed,
  claimIdentitySuccess,
  startFetchIdentity,
  fetchIdentityFailed,
  fetchIdentitySuccess,
  updateIdentityStatusSuccess,
  startFetchUserProof,
  fetchUserProofSuccess,
  fetchUserProofFailed,
} = identitySlice.actions;
