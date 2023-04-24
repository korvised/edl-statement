import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { AuthBody, AuthState, IAuthUser, LoginPayload } from "@/types/auth.type"
import { APIData, APIError, APIStatus } from "@/types/api.type"
import { api, authApi, getExceptionPayload } from "@/common/api"
import { AlertService, TokenService } from "@/common/services"
import { IChangePasswordBody, IProfileForm } from "@/types/setting.type"
import { hideLoading, showLoading } from "@/state/slices/layoutSlice"

const alertService = new AlertService()
const tokenService = new TokenService()

export const login = createAsyncThunk<
  LoginPayload,
  AuthBody,
  { rejectValue: APIError }
>("Auth/login", async (body, { dispatch, rejectWithValue }) => {
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
>("Auth/getMe", async (_, { rejectWithValue }) => {
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

export const updateProfile = createAsyncThunk<
  APIData<null>,
  IProfileForm,
  { rejectValue: APIError }
>("Auth/updateProfile", async (body, { rejectWithValue, dispatch }) => {
  try {
    dispatch(showLoading("ກຳລັງແກ້ໄຂຂໍ້ມູນ..."))
    const { data } = await api.post<APIData<null>>("/modify", body)

    dispatch(hideLoading())

    if (data.status === 200) {
      await dispatch(getMe())
      await alertService.success("ກຳລັງແກ້ໄຂຂໍ້ມູນສຳເລັດ")
    }

    return data
  } catch (ex) {
    dispatch(hideLoading())
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const changePassword = createAsyncThunk<
  APIData<null>,
  IChangePasswordBody,
  { rejectValue: APIError }
>("Auth/changePassword", async (body, { rejectWithValue, dispatch }) => {
  try {
    dispatch(showLoading("ກຳລັງແກ້ໄຂຂໍ້ມູນ..."))
    const { data } = await api.post<APIData<null>>("/reset-pass", body)

    dispatch(hideLoading())

    if (data.status === 200) {
      await dispatch(signOut())
      await alertService.success("ເພື່ອຄວາມປອດໄພກະລຸນາເຂົ້າສູ່ລະບົບໃໝ່ຄັ້ງ")
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
    signOut: state => {
      state.isAuthenticated = false
      state.accessToken = null
      state.refreshToken = null
      state.user = undefined
      // todo: Remove JWT Tokens
      tokenService.removeTokens()
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

export const { signOut } = authSlice.actions

export default authSlice.reducer
