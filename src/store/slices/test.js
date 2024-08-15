import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  test: 0,
  imagePopup: { status: false, helperData: null },
};

const testSlice = createSlice({
  initialState: initialState,
  name: "test",
  reducers: {
    setTest(state, action) {
      state.test = action.payload;
    },
    openImagePopup(state, action) {
      state.imagePopup.status = true;
      state.imagePopup.helperData = action.payload;
    },
    closeImagePopup(state) {
      state.imagePopup.status = false;
      state.imagePopup.helperData = null;
    },
  },
});

export const { setTest, openImagePopup, closeImagePopup } = testSlice.actions;
export default testSlice.reducer;
