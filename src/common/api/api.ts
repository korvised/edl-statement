import axios from "axios"

import { BASE_URL } from "@/config/const"
import { APIData } from "@/types/api.type"
import { getExceptionPayload } from "./axiosException"
import { AlertService } from "@/common/services/alert.service"
import { TokenService } from "@/common/services/token.service"

const alertService = new AlertService()
const tokenService = new TokenService()

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

instance.interceptors.request.use(
  config => {
    const token = tokenService.getAccessToken()

    if (token) {
      config.headers["authorization"] = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  async response => {
    // todo: if error response
    const ex: APIData<null> = response.data

    if (ex.code === 401) {
      tokenService.removeTokens()
      await alertService.error("Session ໝົດອາຍຸ, ກະລຸນາເຂົາລະບົບໃໝ່")
    }

    return response
  },
  async error => {
    const ex = getExceptionPayload(error)
    await alertService.error(ex.message)

    return Promise.reject(error)
  }
)

export const api = instance
