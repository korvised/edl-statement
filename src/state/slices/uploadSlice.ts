import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { api, getExceptionPayload } from "@/common/api"
import { AuthState, IToken } from "@/types/auth.type"
import { APIData, APIError, APIStatus } from "@/types/api.type"
import { hideLoading, showLoading } from "@/state/slices/layoutSlice"
import { AlertService } from "@/common/services"

const alertService = new AlertService()

export const uploadFile = createAsyncThunk<
  APIData<null>,
  FormData,
  { rejectValue: APIError }
>("Upload/uploadFile", async (body, { dispatch, rejectWithValue }) => {
  try {
    dispatch(showLoading("ກໍາລັງອັບໂຫຼດຂໍ້ມູນເຂົ້າລະບົບ..."))
    const { data } = await api.post<APIData<null>>("/upload-xml", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    dispatch(hideLoading())

    if (data.status === 200) {
      await alertService.success(data.reason)
    } else {
      await alertService.error(data.reason)
    }

    return data
  } catch (ex) {
    dispatch(hideLoading())
    return rejectWithValue(getExceptionPayload(ex))
  }
})

const initialState: AuthState = {
  isAuthenticated: false,
  status: APIStatus.IDLE,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeToken: (state, action: PayloadAction<IToken>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
  },
  extraReducers: builder => {
    builder.addCase(uploadFile.pending, state => {
      state.status = APIStatus.PENDING
    })
    builder.addCase(uploadFile.fulfilled, (state, { payload }) => {})
    builder.addCase(uploadFile.rejected, state => {
      state.status = APIStatus.REJECTED
    })
  },
})

export const { storeToken } = authSlice.actions

export default authSlice.reducer
