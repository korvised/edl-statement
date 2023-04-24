import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { IUser, IUserState } from "@/types/user.type"
import { RootState } from "@/state/store"
import { hideLoading, showLoading } from "@/state/slices/layoutSlice"
import { api, getExceptionPayload } from "@/common/api"
import { APIData, APIError, APIStatus } from "@/types/api.type"

export const getUsers = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: APIError }
>("User/getUsers", async (_, { dispatch, rejectWithValue, getState }) => {
  try {
    const user = (getState() as RootState).user
    if (user.data.length === 0) dispatch(showLoading())

    dispatch(showLoading())
    const { data } = await api.get<APIData<IUser[]>>("/user")
    dispatch(hideLoading())

    return data.data
  } catch (ex) {
    dispatch(hideLoading())
    return rejectWithValue(getExceptionPayload(ex))
  }
})

const initialState: IUserState = {
  status: APIStatus.IDLE,
  data: [],
}

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsers.pending, state => {
      state.status = APIStatus.PENDING
    })
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.status = APIStatus.FULFILLED
      state.data = payload
    })
    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.status = APIStatus.REJECTED
      state.error = payload
    })
  },
})

export default userSlice.reducer
