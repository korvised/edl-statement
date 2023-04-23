import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { api, getExceptionPayload } from "@/common/api"
import { APIData, APIError, APIStatus } from "@/types/api.type"
import { ICustomer, IUploadHistory, IUploadState } from "@/types/upload.type"
import { AlertService } from "@/common/services"
import { hideLoading, showLoading } from "@/state/slices/layoutSlice"
import { RootState } from "@/state/store"

const alertService = new AlertService()

export const getUploadHistories = createAsyncThunk<
  IUploadHistory[],
  void,
  { rejectValue: APIError }
>("Upload/getUploadHistories", async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(showLoading())
    const { data } = await api.get<APIData<IUploadHistory[]>>("/upload-history")
    dispatch(hideLoading())

    return data.data
  } catch (ex) {
    dispatch(hideLoading())
    return rejectWithValue(getExceptionPayload(ex))
  }
})

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

export const getCustomersData = createAsyncThunk<
  ICustomer[],
  void,
  { rejectValue: APIError }
>(
  "Upload/getCustomersData",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const customers = (getState() as RootState).upload.customers
      if (customers.data.length === 0) dispatch(showLoading())

      const { data } = await api.get<APIData<ICustomer[]>>("/rp-data")
      dispatch(hideLoading())

      return data.data
    } catch (ex) {
      dispatch(hideLoading())
      return rejectWithValue(getExceptionPayload(ex))
    }
  }
)

const initialState: IUploadState = {
  histories: {
    status: APIStatus.IDLE,
    data: [],
  },
  customers: {
    status: APIStatus.IDLE,
    data: [],
  },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUploadHistories.pending, state => {
      state.histories.status = APIStatus.PENDING
    })
    builder.addCase(getUploadHistories.fulfilled, (state, { payload }) => {
      state.histories.status = APIStatus.FULFILLED
      state.histories.data = payload
    })
    builder.addCase(getUploadHistories.rejected, (state, { payload }) => {
      state.histories.status = APIStatus.REJECTED
      state.histories.error = payload
    })
    builder.addCase(getCustomersData.pending, state => {
      state.customers.status = APIStatus.PENDING
    })
    builder.addCase(getCustomersData.fulfilled, (state, { payload }) => {
      state.customers.status = APIStatus.FULFILLED
      state.customers.data = payload
    })
    builder.addCase(getCustomersData.rejected, (state, { payload }) => {
      state.customers.status = APIStatus.REJECTED
      state.customers.error = payload
    })
  },
})

export default authSlice.reducer
