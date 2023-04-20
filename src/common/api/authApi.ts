import axios from "axios"

import { AUTH_PASSWORD, AUTH_USERNAME, BASE_URL } from "@/config/const"
import { getExceptionPayload } from "@/common/api/axiosException"
import { APIData } from "@/types/api.type"
import { AlertService } from "@/common/services/alert.service"
import { TokenService } from "@/common/services/token.service"

const alertService = new AlertService()
const tokenService = new TokenService()

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    // Authorization: `Basic ${btoa(`${AUTH_USERNAME}:${AUTH_PASSWORD}`)}`,
  },
  auth: {
    username: AUTH_USERNAME, // This is the client_id
    password: AUTH_PASSWORD, // This is the client_secret
  },
})

instance.interceptors.response.use(
  async response => {
    // console.log("fulfilled", response)
    // todo: if error response
    const ex: APIData<null> = response.data

    if (ex.code === 401) {
      console.log("Remove Token")
      tokenService.removeTokens()
      await alertService.error(ex.message)
    }

    return response
  },
  async error => {
    // console.log(error)
    // todo: show error message
    const ex = getExceptionPayload(error)
    // console.log(ex)
    await alertService.error(ex.message)

    return Promise.reject(error)
  }
)

export const authApi = instance
