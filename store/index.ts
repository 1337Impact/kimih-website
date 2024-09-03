import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import selectedMarkerSlice from "./selectedMarkerSlice";
import checkoutSlice from "./checkoutSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    selectedMarkerSlice,
    checkoutSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
