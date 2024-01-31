import axios, { AxiosInstance } from "axios"
import { setupInterceptors } from "./setupInterceptors"

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  auth: {
    username: import.meta.env.VITE_AUTH_USERNAME!,
    password: import.meta.env.VITE_AUTH_PASSWORD!,
  },
})

export const authApi = setupInterceptors(instance)
