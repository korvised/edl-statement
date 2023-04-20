import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { ILayoutState } from "@/types/layout.type"

// Define the initial state using that type
const initialState: ILayoutState = {
  showLoading: false,
  loadingMsg: "Loading...",
}

export const layoutSlice = createSlice({
  name: "layout",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showLoading: (state, action: PayloadAction<string>) => {
      state.showLoading = true
      state.loadingMsg = action.payload
    },
    hideLoading: state => {
      state.showLoading = false
    },
  },
})

export const { showLoading, hideLoading } = layoutSlice.actions

export default layoutSlice.reducer
