import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios"

import { APIData } from "@/types/api.type"
import { AlertService, TokenService } from "@/common/services"
import { store } from "@/state/store"
import { signOut } from "@/state/slices"

const alertService = new AlertService()
const tokenService = new TokenService()

// For Make Log on Develop Mode
const logOnDev = (message: string) => {
  if (import.meta.env.MODE === "development") {
    console.log(message)
  }
}

// Request Interceptor
const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { method, url } = config
  // Set Headers Here
  const token = tokenService.getAccessToken()
  config.headers["authorization"] = `Bearer ${token}`
  // Check Authentication Here
  // Set Loading Start Here
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`)

  if (method === "get") {
    config.timeout = 15000
  }

  return config
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config
  const { status } = response
  // Set Loading End Here
  // Handle Response Data Here
  // Error Handling When Return Success with Error Code Here
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`)

  return response
}

const onErrorResponse = async (
  ex: AxiosError<APIData<null>> | Error
): Promise<AxiosError> => {
  if (isAxiosError(ex)) {
    // const { message: statusCode, reason: message } = ex.response?.data
    const statusCode =
      ex.response?.data?.message || ex?.code || ex?.message || "404"
    const message =
      ex.response?.data?.reason || ex?.message || "Something went wrong"

    const { method, url } = ex.config as AxiosRequestConfig
    const { status = -500 } = (ex.response as AxiosResponse) ?? {}

    logOnDev(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} "${statusCode}" ${message}`
    )

    if (ex?.code === "ERR_NETWORK") {
      await alertService.error(
        "ການເຊື່ອມຕໍ່ຂັດຂ້ອງກະລຸນາກວດສອບອິນເຕີເນັດຂອງທ່ານແລ້ວລອງໃໝ່ອີກຄັ້ງ!"
      )
    } else {
      await alertService.error(message)
    }

    switch (status) {
      case 401: {
        // "Login required"
        break
      }
      case 403: {
        // "Permission denied"
        break
      }
      case 404: {
        // "Invalid request"
        break
      }
      case 500: {
        // "Server error"
        break
      }
      default: {
        // "Unknown error occurred"
        break
      }
    }

    if (status === 401) {
      // Delete Token & Go To Login Page if you required.
      store.dispatch(signOut())
      // tokenService.removeTokens()
    }

    if (ex.message) {
    }
  } else {
    if (typeof ex !== "object" || !ex) {
      // console.log("not object");
      return Promise.reject(ex)
    }

    const defaultMsg = ex?.message || "Internal error during request"

    logOnDev(`🚨 [API] | Error ${defaultMsg}`)

    const errorMsg =
      ex?.code === "ERR_NETWORK"
        ? "ການເຊື່ອມຕໍ່ຂັດຂ້ອງກະລຸນາກວດສອບອິນເຕີເນັດຂອງທ່ານແລ້ວລອງໃໝ່ອີກຄັ້ງ"
        : defaultMsg

    await alertService.error(errorMsg)
  }

  return Promise.reject(ex)
}

export const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest, onErrorResponse)
  instance.interceptors.response.use(onResponse, onErrorResponse)

  return instance
}
