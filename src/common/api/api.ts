import axios, { AxiosInstance } from "axios"

import { BASE_URL } from "@/config/const"
import { setupInterceptors } from "./setupInterceptors"

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const api = setupInterceptors(instance)
