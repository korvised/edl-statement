import axios from "axios"

import { AUTH_PASSWORD, AUTH_USERNAME, BASE_URL } from "@/config/const"
import { setupInterceptors } from "./setupInterceptors"

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    // Authorization: `Basic ${btoa(`${AUTH_USERNAME}:${AUTH_PASSWORD}`)}`,
  },
  auth: {
    username: AUTH_USERNAME,
    password: AUTH_PASSWORD,
  },
})

export const authApi = setupInterceptors(instance)
