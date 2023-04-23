import { APIError, APIStatus } from "@/types/api.type"

export interface IUploadState {
  histories: IUploadHistoryState
  customers: IUploadCustomerState
}

export interface IUploadHistoryState {
  status: APIStatus
  data: IUploadHistory[]
  error?: APIError
}

export interface IUploadCustomerState {
  status: APIStatus
  data: ICustomer[]
  error?: APIError
}

export interface IUploadHistory {
  id: number
  fileName: string
  username: string
  status: boolean
  createAt: string
  lastModifiedDate: string
  createdDate: string
}

export interface ICustomer {
  numcli: string
  nomsoc: string
  debt: number
  billdate: string
}
