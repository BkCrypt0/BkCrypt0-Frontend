import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageIDBase64: undefined,
};

export const uploadImageID = (imageIDBase64) => (dispatch) => {
  dispatch(uploadImageIDSuccess({ imageIDBase64: imageIDBase64 }));
};

const imageIDSlice = createSlice({
  name: "imageIDSlice",
  initialState: initialState,
  reducers: {
    uploadImageIDSuccess: (state, action) => {
      state.imageIDBase64 = action.payload.imageIDBase64;
    },
  },
});

export default imageIDSlice.reducer;
export const { uploadImageIDSuccess } = imageIDSlice.actions;
