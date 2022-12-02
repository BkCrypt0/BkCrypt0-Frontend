import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { BASE_API_URL, FS } from "../constants";
import { updateRootClaim } from "src/contract";

const initialState = {
  issueList: [],
  fetchingStatus: FS.IDLE,
  publishingDataStatus: FS.IDLE,
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

export const handlePublishData = (account) => async (dispatch) => {
  dispatch(startPublishData());
  try {
    const res = await Axios.get(`${BASE_API_URL}/published/data`);
    const data = res.data;
    await updateRootClaim(
      account,
      data.optionName,
      data.proof.pi_a,
      data.proof.pi_b,
      data.proof.pi_c,
      data.publicSignals,
      data.currentRoot
    ).then(async (res) => {
      if (res === 1) {
        try {
          await Axios.post(`${BASE_API_URL}/published`, {
            root: data.publicSignals[0],
          });
          dispatch(publishDataSucess());
        } catch (err) {
          dispatch(publishDataFailed());
        }
      } else if (res === -1) {
        dispatch(publishDataFailed());
        return;
      }
    });
  } catch (err) {
    dispatch(publishDataFailed());
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
    startPublishData: (state) => {
      state.publishingDataStatus = FS.FETCHING;
    },
    publishDataSucess: (state) => {
      state.publishingDataStatus = FS.SUCCESS;
    },
    publishDataFailed: (state) => {
      state.publishingDataStatus = FS.FAILED;
    },
  },
});

export default adminSlice.reducer;
export const {
  startGetIssueList,
  getIssueListSuccess,
  getIssueListFail,
  startPublishData,
  publishDataSucess,
  publishDataFailed,
} = adminSlice.actions;
