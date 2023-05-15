import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { api, getExceptionPayload } from "@/common/api"
import { APIData, APIError, APIStatus } from "@/types/api.type"
import {
  IDebitHistory,
  IDebitState,
  IDebitTransFilter,
  ITransaction,
} from "@/types/debit.type"
import { hideLoading, showLoading } from "@/state/slices/layoutSlice"
import { saveAs } from "file-saver"

export const getDebitTransactions = createAsyncThunk<
  ITransaction[],
  IDebitTransFilter,
  { rejectValue: APIError }
>("Debit/getTransactions", async (body, { dispatch, rejectWithValue }) => {
  try {
    dispatch(showLoading())
    dispatch(updateDebitTranFilteredDate(body.curDate))
    const { data } = await api.post<APIData<ITransaction[]>>(
      "/trans-debit",
      body
    )
    dispatch(hideLoading())

    return data.data
  } catch (ex) {
    dispatch(hideLoading())
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const getDebitHistories = createAsyncThunk<
  IDebitHistory[],
  void,
  { rejectValue: APIError }
>("Debit/getDebitHistories", async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(showLoading())

    const { data } = await api.get<APIData<IDebitHistory[]>>(
      "/history/download"
    )
    dispatch(hideLoading())

    return data.data
  } catch (ex) {
    dispatch(hideLoading())
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const downloadDebitXML = createAsyncThunk<void, IDebitTransFilter>(
  "Debit/getDebitHistories",
  async (filter, { dispatch }) => {
    try {
      dispatch(showLoading())
      const { data, status } = await api.post("/download", filter, {
        responseType: "blob",
      })

      if (status === 200) dispatch(getDebitTransactions(filter))

      dispatch(hideLoading())

      saveAs(data, `apb-trans-${filter.curDate}.xml`)
    } catch (ex) {
      dispatch(hideLoading())
    }
  }
)

const initialState: IDebitState = {
  transactions: {
    status: APIStatus.IDLE,
    data: [],
  },
  histories: {
    status: APIStatus.IDLE,
    data: [],
  },
}

const debitSlice = createSlice({
  name: "debit",
  initialState,
  reducers: {
    updateDebitTranFilter: (
      state,
      action: PayloadAction<IDebitTransFilter>
    ) => {
      state.transactions.filter = action.payload
    },
    updateDebitTranFilteredDate: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.transactions.filteredText = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getDebitTransactions.pending, state => {
      state.transactions.status = APIStatus.PENDING
    })
    builder.addCase(getDebitTransactions.fulfilled, (state, { payload }) => {
      state.transactions.status = APIStatus.FULFILLED
      state.transactions.data = payload
    })
    builder.addCase(getDebitTransactions.rejected, (state, { payload }) => {
      state.transactions.status = APIStatus.REJECTED
      state.transactions.error = payload
    })
    builder.addCase(getDebitHistories.pending, state => {
      state.histories.status = APIStatus.PENDING
    })
    builder.addCase(getDebitHistories.fulfilled, (state, { payload }) => {
      state.histories.status = APIStatus.FULFILLED
      state.histories.data = payload
    })
    builder.addCase(getDebitHistories.rejected, (state, { payload }) => {
      state.histories.status = APIStatus.REJECTED
      state.histories.error = payload
    })
  },
})

export const { updateDebitTranFilter, updateDebitTranFilteredDate } =
  debitSlice.actions

export default debitSlice.reducer
