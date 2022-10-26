import { configureStore } from "@reduxjs/toolkit";
import {createWrapper} from 'next-redux-wrapper';
import {cartSlice} from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    [cartSlice.name]: cartSlice.reducer
  },
  devTools: true
});

export const wrapper = createWrapper(() => store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
