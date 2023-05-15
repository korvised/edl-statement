import axios, { AxiosInstance } from "axios"

import { AUTH_PASSWORD, AUTH_USERNAME, BASE_URL } from "@/config/const"
import { setupInterceptors } from "./setupInterceptors"

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  auth: {
    username: AUTH_USERNAME,
    password: AUTH_PASSWORD,
  },
})

export const authApi = setupInterceptors(instance)
