import { configureStore } from "@reduxjs/toolkit"

import LayoutSlice from "./slices/layoutSlice"
import authSlice from "./slices/authSlice"
import uploadSlice from "./slices/uploadSlice"
import statementSlice from "./slices/statementSlice"
import userSlice from "./slices/userSlice"

import userApiSlice from "./queries/userApiSlice"
import uploadApiSlice from "./queries/uploadApiSlice"
import provinceApiSlice from "./queries/provinceApiSlice"

export const store = configureStore({
  reducer: {
    layout: LayoutSlice,
    auth: authSlice,
    upload: uploadSlice,
    statement: statementSlice,
    user: userSlice,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [uploadApiSlice.reducerPath]: uploadApiSlice.reducer,
    [provinceApiSlice.reducerPath]: provinceApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(userApiSlice.middleware)
      .concat(uploadApiSlice.middleware)
      .concat(provinceApiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
