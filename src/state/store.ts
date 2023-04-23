import { configureStore } from "@reduxjs/toolkit"

import LayoutSlice from "./slices/layoutSlice"
import authSlice from "./slices/authSlice"
import uploadSlice from "./slices/uploadSlice"

export const store = configureStore({
  reducer: {
    layout: LayoutSlice,
    auth: authSlice,
    upload: uploadSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
