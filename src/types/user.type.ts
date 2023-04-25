import { APIError, APIStatus } from "@/types/api.type"

export interface IUserState {
  status: APIStatus
  data: IUser[]
  error?: APIError
}

export interface IUser {
  createdDate: string
  lastModifiedDate: string
  id: number
  fullName: string
  username: string
  password: string
  enabled: boolean
  accountExpired: boolean
  credentialExpired: boolean
  accountLocked: boolean
  tel: string
  tryLog: number
  roleEntities: RoleEntity[]
  provinceId: string
  provinceName: string
  createAt: string
}

export interface RoleEntity {
  id: number
  name: string
}

export interface IEditUserBody {
  fullName: string
  tel: string
  provinceId: string
}

export interface IUserBody extends IEditUserBody {
  username: string
  password: string
}

export interface IEditUserParams {
  id: number
  body: IEditUserBody
}

export interface IResetUserPasswordParams {
  id: number
  newPassword: string
}
