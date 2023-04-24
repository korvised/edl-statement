import { configureStore } from "@reduxjs/toolkit"

import LayoutSlice from "./slices/layoutSlice"
import authSlice from "./slices/authSlice"
import uploadSlice from "./slices/uploadSlice"
import statementSlice from "./slices/statementSlice"
import userSlice from "./slices/userSlice"

import provinceApiSlice from "./queries/provinceApiSlice"
import userApiSlice from "./queries/userApiSlice"

export const store = configureStore({
  reducer: {
    layout: LayoutSlice,
    auth: authSlice,
    upload: uploadSlice,
    statement: statementSlice,
    user: userSlice,
    [provinceApiSlice.reducerPath]: provinceApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(provinceApiSlice.middleware)
      .concat(userApiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
