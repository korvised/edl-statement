import axios from "axios"

import { BASE_URL } from "@/config/const"
import { setupInterceptors } from "./setupInterceptors"

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const api = setupInterceptors(instance)
