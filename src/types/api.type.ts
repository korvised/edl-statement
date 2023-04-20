export enum APIStatus {
  IDLE = "IDLE",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  FULFILLED = "FULFILLED",
}

export interface APIError {
  message: string
  code: number
  error?: string
  error_description?: string
}

export interface APIData<T> {
  success?: boolean
  message: string
  code: number
  data: T
}

export interface APIResponse<T> {
  timestamp?: string
  status: APIStatus
  message?: string
  reason?: string
  data?: T
  error?: APIError
}

export interface IToken {
  accessToken: string
  refreshToken: string
}

export interface IResponse {
  session: Partial<IToken>
}
