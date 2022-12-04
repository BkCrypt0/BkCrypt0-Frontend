import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { BASE_API_URL, FS } from "../constants";
import { updateRootClaim, updateRootRevoke } from "src/contract";

const initialState = {
  issueList: [],
  fetchingStatus: FS.IDLE,
  publishingDataStatus: FS.IDLE,
  revokingDataStatus: FS.IDLE,
  unRevokingDataStatus: FS.IDLE,
  revokeLimit: 3,
  selectedList: [],
  checkedList: [],
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

export const handleResetPublishDataStatus = () => (dispatch) => {
  dispatch(resetPublishDataStatus());
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
          dispatch(publishDataSuccess());
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

export const handleRevokeData = (account, identityList) => async (dispatch) => {
  dispatch(startRevokeData());
  try {
    const res = await Axios.post(`${BASE_API_URL}/revoke/data`, {
      CCCDs: identityList,
    });
    const data = res.data;
    await updateRootRevoke(
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
          await Axios.post(`${BASE_API_URL}/revoke`, {
            root: data.publicSignals[0],
            CCCDs: identityList,
          });
          dispatch(revokeDataSuccess());
          dispatch(clearSelectedListAndCheckedListSuccess());
        } catch (err) {
          dispatch(revokeDataFailed());
          dispatch(clearSelectedListAndCheckedListSuccess());
        }
      } else if (res === -1) {
        dispatch(revokeDataFailed());
        dispatch(clearSelectedListAndCheckedListSuccess());

        return;
      }
    });
  } catch (err) {
    dispatch(revokeDataFailed());
    dispatch(clearSelectedListAndCheckedListSuccess());
  }
};

export const handleUnRevokeData = (account, identity) => async (dispatch) => {
  dispatch(startUnRevokeData());
  try {
    const res = await Axios.post(`${BASE_API_URL}/unrevoke/data`, {
      CCCDs: identity,
    });
    const data = res.data;
    await updateRootRevoke(
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
          await Axios.post(`${BASE_API_URL}/unrevoke`, {
            root: data.publicSignals[0],
            CCCDs: identity,
          });
          dispatch(unRevokeDataSuccess());
          dispatch(clearSelectedListAndCheckedListSuccess());
        } catch (err) {
          dispatch(unRevokeDataFailed());
          dispatch(clearSelectedListAndCheckedListSuccess());
        }
      } else if (res === -1) {
        dispatch(unRevokeDataFailed());
        dispatch(clearSelectedListAndCheckedListSuccess());
        return;
      }
    });
  } catch (err) {
    dispatch(unRevokeDataFailed());
    dispatch(clearSelectedListAndCheckedListSuccess());
  }
};

export const handleResetRevokeDataStatus = () => (dispatch) => {
  dispatch(resetRevokeDataStatus());
};

export const handleResetUnRevokeDataStatus = () => (dispatch) => {
  dispatch(resetUnRevokeDataStatus());
};

export const addToSelectedList = (id) => (dispatch) => {
  dispatch(addToSelectedListSuccess(id));
};

export const addToCheckedList = (id) => (dispatch) => {
  dispatch(addToCheckedListSuccess(id));
};

export const removeFromSelectedList = (id) => (dispatch) => {
  dispatch(removeFromSelectedListSuccess(id));
};

export const removeFromCheckedList = (id) => (dispatch) => {
  dispatch(removeFromCheckedListSuccess(id));
};

export const clearSelectedListAndCheckedList = () => (dispatch) => {
  dispatch(clearSelectedListAndCheckedListSuccess());
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
    publishDataSuccess: (state) => {
      state.publishingDataStatus = FS.SUCCESS;
    },
    publishDataFailed: (state) => {
      state.publishingDataStatus = FS.FAILED;
    },
    resetPublishDataStatus: (state) => {
      state.publishingDataStatus = FS.IDLE;
    },
    startRevokeData: (state) => {
      state.revokingDataStatus = FS.FETCHING;
    },
    revokeDataSuccess: (state) => {
      state.revokingDataStatus = FS.SUCCESS;
    },
    revokeDataFailed: (state) => {
      state.revokingDataStatus = FS.FAILED;
    },
    startUnRevokeData: (state) => {
      state.unRevokingDataStatus = FS.FETCHING;
    },
    unRevokeDataSuccess: (state) => {
      state.unRevokingDataStatus = FS.SUCCESS;
    },
    unRevokeDataFailed: (state) => {
      state.unRevokingDataStatus = FS.FAILED;
    },
    resetRevokeDataStatus: (state) => {
      state.revokingDataStatus = FS.IDLE;
    },
    resetUnRevokeDataStatus: (state) => {
      state.unRevokingDataStatus = FS.IDLE;
    },
    addToSelectedListSuccess: (state, action) => {
      state.selectedList = [action.payload, ...state.selectedList];
    },
    addToCheckedListSuccess: (state, action) => {
      state.checkedList = [action.payload, ...state.checkedList];
    },
    removeFromSelectedListSuccess: (state, action) => {
      var temp = [];
      for (let i = 0; i < state.selectedList.length; i++) {
        if (state.selectedList[i] !== action.payload)
          temp = [state.selectedList[i], ...temp];
      }
      state.selectedList = temp;
    },
    removeFromCheckedListSuccess: (state, action) => {
      var temp = [];
      for (let i = 0; i < state.checkedList.length; i++) {
        if (state.checkedList[i] !== action.payload)
          temp = [state.checkedList[i], ...temp];
      }
      state.checkedList = temp;
    },
    clearSelectedListAndCheckedListSuccess: (state) => {
      state.selectedList = [];
      state.checkedList = [];
    },
  },
});

export default adminSlice.reducer;
export const {
  startGetIssueList,
  getIssueListSuccess,
  getIssueListFail,
  startPublishData,
  publishDataSuccess,
  publishDataFailed,
  resetPublishDataStatus,
  startRevokeData,
  revokeDataSuccess,
  revokeDataFailed,
  startUnRevokeData,
  unRevokeDataSuccess,
  unRevokeDataFailed,
  resetRevokeDataStatus,
  resetUnRevokeDataStatus,
  addToCheckedListSuccess,
  addToSelectedListSuccess,
  removeFromCheckedListSuccess,
  removeFromSelectedListSuccess,
  clearSelectedListAndCheckedListSuccess,
} = adminSlice.actions;
