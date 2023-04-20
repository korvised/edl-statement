import { APIStatus } from "./api.type"

export interface AuthBody {
  teller: string
  password: string
}

export interface SignUpBody {
  username: string
  password: string
  tel: string
  roleId: number
}

export interface LoginPayload {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  scope: string
  appV: string
  appVId: number
  userId: number
  username: string
  jti: string
}

export enum UserRole {
  ROOT = "ROOT",
  TELLER = "TELLER",
  MAKER = "MAKER",
  CHECKER = "CHECKER",
  ADMIN = "ADMIN",
}

export interface AuthState {
  isAuthenticated: boolean
  // authorities?: UserRole[];
  accessToken?: string | null
  refreshToken?: string | null
  user?: IAuthUser
  status: APIStatus
}

export interface IJWTDecode {
  authorities: UserRole[]
  client_id: string
  exp: number
  jti: string
  message: string
  scope: string[]
  status: number
  user_name: string
}

export interface IToken {
  accessToken: string
  refreshToken: string
}

export interface IAuthUser {
  userId: number
  userName: string
  gender: string
  fullName: string
  branch: string
  branchCode: string
  branchName: string | null
  profile: string | null
  tel: string
  status: number
  roles: UserRole[]
}
