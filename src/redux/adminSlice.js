import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { BASE_API_URL, FS } from "../constants";
import { updateRootClaim } from "src/contract";

const initialState = {
  issueList: [],
  fetchingStatus: FS.IDLE,
  fetchingPublishedDataStatus: FS.IDLE,
  publishedData: undefined,
  updatingRootClaimStatus: FS.IDLE,
};

export const fetchData = () => async (dispatch) => {
  dispatch(startGetIssueList());
  try {
    const res = await Axios.get(`${BASE_API_URL}/issue`);
    const data = res.data;
    dispatch(getIssueListSuccess(data));
  } catch (err) {
    dispatch(getIssueListFail());
  }
};

export const fetchPublishedData = () => async (dispatch) => {
  dispatch(startFetchPublishedData());
  try {
    const res = await Axios.get(`${BASE_API_URL}/published/data`);
    const data = res.data;
    dispatch(fetchPublishedDataSuccess(data));
  } catch (err) {
    dispatch(fetchPublishedDataFailed());
  }
};

export const handleUpdateRootClaim =
  (account, pi_a, pi_b, pi_c, input) => async (dispatch) => {
    dispatch(startUpdateRootClaim());
    try {
      updateRootClaim(account, pi_a, pi_b, pi_c, input)
        .then((res) => {
          if (res === 1) dispatch(updateRootClaimSuccess());
          else if (res === -1) dispatch(updateRootClaimFailed());
        })
        .catch(() => updateRootClaimFailed());
    } catch (err) {
      dispatch(updateRootClaimFailed());
    }
  };

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: initialState,
  reducers: {
    startGetIssueList: (state) => {
      state.fetchingStatus = FS.FETCHING;
    },
    getIssueListSuccess: (state, action) => {
      state.issueList = action.payload;
      state.fetchingStatus = FS.SUCCESS;
    },
    getIssueListFail: (state) => {
      state.fetchingStatus = FS.FAILED;
    },
    startFetchPublishedData: (state) => {
      state.fetchingPublishedDataStatus = FS.FETCHING;
    },
    fetchPublishedDataSuccess: (state, action) => {
      state.publishedData = action.payload;
      state.fetchingPublishedDataStatus = FS.SUCCESS;
    },
    fetchPublishedDataFailed: (state) => {
      state.fetchingPublishedDataStatus = FS.FAILED;
    },
    startUpdateRootClaim: (state) => {
      state.updatingRootClaimStatus = FS.FETCHING;
    },
    updateRootClaimSuccess: (state) => {
      state.updatingRootClaimStatus = FS.SUCCESS;
    },
    updateRootClaimFailed: (state) => {
      state.updatingRootClaimStatus = FS.FAILED;
    },
  },
});

export default adminSlice.reducer;
export const {
  startGetIssueList,
  getIssueListSuccess,
  getIssueListFail,
  startFetchPublishedData,
  fetchPublishedDataSuccess,
  fetchPublishedDataFailed,
  startUpdateRootClaim,
  updateRootClaimSuccess,
  updateRootClaimFailed,
} = adminSlice.actions;
