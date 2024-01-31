import axios, { AxiosInstance } from "axios"

import { setupInterceptors } from "./setupInterceptors"

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const api = setupInterceptors(instance)
