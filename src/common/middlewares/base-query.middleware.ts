import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react"
import { AxiosError, AxiosRequestConfig, Method } from "axios"
import { api } from "@/common/api"

interface IAxiosParams {
  url: string
  method: AxiosRequestConfig["method"] | Method
  data?: AxiosRequestConfig["data"]
  params?: AxiosRequestConfig["params"]
}

export const baseQuery: BaseQueryFn<
  IAxiosParams | string,
  unknown,
  unknown
> = async args => {
  try {
    const type = typeof args

    switch (type) {
      case "object": {
        const { url, method, data, params } = args as IAxiosParams
        const result = await api({ url, method, data, params })
        return { data: result.data }
      }
      default: {
        const result = await api.get(args as string)
        return { data: result.data }
      }
    }
  } catch (axiosError) {
    let err = axiosError as AxiosError
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    }
  }
}
