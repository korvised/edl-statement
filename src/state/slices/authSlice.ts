import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  AuthBody,
  AuthState,
  IAuthUser,
  IToken,
  LoginPayload,
} from "@/types/auth.type"
import { APIData, APIError, APIStatus } from "@/types/api.type"
import { api, authApi, getExceptionPayload } from "@/common/api"
import { TokenService } from "@/common/services"

const tokenService = new TokenService()

export const login = createAsyncThunk<
  LoginPayload,
  AuthBody,
  { rejectValue: APIError }
>("SignIn/login", async (body, { dispatch, rejectWithValue }) => {
  try {
    // console.log(body)
    // todo: Create authenticate form data
    const formData = new FormData()
    formData.append("username", body.username)
    formData.append("password", body.password)
    formData.append("grant_type", "password")

    const response = await authApi.post<LoginPayload>("/oauth/token", formData)

    const { access_token, refresh_token } = response.data
    tokenService.storeTokens({
      accessToken: access_token,
      refreshToken: refresh_token,
    })

    // todo: Get current user
    dispatch(getMe())

    return response.data
  } catch (ex) {
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const getMe = createAsyncThunk<
  IAuthUser | undefined,
  void,
  { rejectValue: APIError }
>("SignIn/getMe", async (_, { rejectWithValue }) => {
  try {
    const accessToken = tokenService.getAccessToken()

    if (accessToken) {
      const res = await api
        .get<APIData<IAuthUser>>("/get-info")
        .catch(error => {
          return error
        })

      return res.data.data
    }

    return undefined
  } catch (ex) {
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
    signOut: state => {
      state.isAuthenticated = false
      state.accessToken = null
      state.refreshToken = null
      state.user = undefined
      // todo: Remove JWT Tokens
      tokenService.removeTokens()
    },
    storeToken: (state, action: PayloadAction<IToken>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.status = APIStatus.PENDING
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true
      state.accessToken = payload.access_token
      state.refreshToken = payload.refresh_token
    })
    builder.addCase(login.rejected, state => {
      state.status = APIStatus.REJECTED
    })
    builder.addCase(getMe.pending, state => {
      state.status = APIStatus.PENDING
    })
    builder.addCase(getMe.fulfilled, (state, { payload }) => {
      state.user = payload
      state.accessToken = tokenService.getAccessToken()
      state.refreshToken = tokenService.getRefreshToken()
      state.isAuthenticated = !!payload
      state.status = payload ? APIStatus.FULFILLED : APIStatus.REJECTED
    })
    builder.addCase(getMe.rejected, state => {
      state.status = APIStatus.REJECTED
    })
  },
})

export const { signOut, storeToken } = authSlice.actions

export default authSlice.reducer
