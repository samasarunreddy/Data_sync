import { setupListeners } from '@reduxjs/toolkit/query/react';
import { configureStore } from '@reduxjs/toolkit';
import testReducer from './slices/test';
import feedReducer from './slices/feed';

const store = configureStore({
  reducer: {
    test: testReducer,
    feed: feedReducer,
  },
});

setupListeners(store.dispatch);

export default store;
