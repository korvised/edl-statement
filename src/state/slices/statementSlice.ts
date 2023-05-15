import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { api, getExceptionPayload } from "@/common/api"
import { APIData, APIError, APIStatus } from "@/types/api.type"
import { hideLoading, showLoading } from "@/state/slices/layoutSlice"
import {
  IStatement,
  IStatementFilter,
  IStatementState,
} from "@/types/statement.type"
import { DateService } from "@/common/services"

const dataService = new DateService()

export const getStatement = createAsyncThunk<
  IStatement[],
  IStatementFilter,
  { rejectValue: APIError }
>("statement/getStatement", async (body, { dispatch, rejectWithValue }) => {
  try {
    dispatch(showLoading())

    const dateText = dataService.getTwoDateText(
      body.startDate as string,
      body.endDate as string
    )
    dispatch(updateDateText(dateText))

    const { data } = await api.post<APIData<IStatement[]>>("/rp-payment", body)
    dispatch(hideLoading())

    return data.data
  } catch (ex) {
    dispatch(hideLoading())
    return rejectWithValue(getExceptionPayload(ex))
  }
})

const initialState: IStatementState = {
  status: APIStatus.IDLE,
  data: [],
}

const statementSlice = createSlice({
  name: "statement",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<IStatementFilter>) => {
      state.filter = action.payload
    },
    updateDateText: (state, action: PayloadAction<string>) => {
      state.dateText = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getStatement.pending, state => {
      state.status = APIStatus.PENDING
    })
    builder.addCase(getStatement.fulfilled, (state, { payload }) => {
      state.status = APIStatus.FULFILLED
      state.data = payload
    })
    builder.addCase(getStatement.rejected, (state, { payload }) => {
      state.status = APIStatus.REJECTED
      state.error = payload
    })
  },
})

export const { updateFilter, updateDateText } = statementSlice.actions

export default statementSlice.reducer
