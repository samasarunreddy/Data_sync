import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviewCount: 0,
};

const feedSlice = createSlice({
  initialState: initialState,
  name: 'feed',
  reducers: {
    setReviewCount(state, action) {
      state.reviewCount = action.payload;
    },
  },
});

export const { setReviewCount } = feedSlice.actions;
export default feedSlice.reducer;
