import { APIStatus } from "./api.type"

export interface AuthBody {
  username: string
  password: string
}

export interface LoginPayload {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  scope: string
  code: string
  roles: UserRole[]
  message: string
  status: string
  jti: string
}

export enum UserRole {
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
}

export interface AuthState {
  isAuthenticated: boolean
  // authorities?: UserRole[];
  accessToken?: string | null
  refreshToken?: string | null
  user?: IAuthUser
  status: APIStatus
}

export interface IToken {
  accessToken: string
  refreshToken: string
}

export interface IAuthUser {
  fullName: string
  username: string
  accountLocked: boolean
  tel: string
  roles: UserRole[]
  nameLa?: string
  accountNumber?: string
}
