import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { BASE_API_URL, FS } from "../constants";

const initialState = {
  issueList: [],
  fetchingStatus: FS.IDLE,
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

const adminSlice = createSlice({
  name: "themeSlice",
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
  },
});

export default adminSlice.reducer;
export const { startGetIssueList, getIssueListSuccess, getIssueListFail } =
  adminSlice.actions;
