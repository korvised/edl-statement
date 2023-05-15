import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { api, getExceptionPayload } from "@/common/api"
import { APIData, APIError, APIStatus } from "@/types/api.type"
import {
  IDebitHistory,
  IDebitState,
  ITransaction,
  ITransactionFilter,
} from "@/types/debit.type"
import { hideLoading, showLoading } from "@/state/slices/layoutSlice"

export const getTransactions = createAsyncThunk<
  ITransaction[],
  ITransactionFilter,
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

const initialState: IDebitState = {
  transaction: {
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
      action: PayloadAction<ITransactionFilter>
    ) => {
      state.transaction.filter = action.payload
    },
    updateDebitTranFilteredDate: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.transaction.filteredText = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getTransactions.pending, state => {
      state.transaction.status = APIStatus.PENDING
    })
    builder.addCase(getTransactions.fulfilled, (state, { payload }) => {
      state.transaction.status = APIStatus.FULFILLED
      state.transaction.data = payload
    })
    builder.addCase(getTransactions.rejected, (state, { payload }) => {
      state.transaction.status = APIStatus.REJECTED
      state.transaction.error = payload
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
