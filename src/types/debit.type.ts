import { APIError, APIStatus } from "@/types/api.type"
import { IStatement } from "@/types/statement.type"

export interface IDebitState {
  transactions: ITransactionState
  histories: IDebitHistoryState
}

export interface IDebitHistoryState {
  status: APIStatus
  data: IDebitHistory[]
  error?: APIError
}

export interface ITransactionState {
  status: APIStatus
  filteredText?: string
  filter?: IDebitTransFilter
  data: ITransaction[]
  error?: APIError
}

export interface IDebitTransFilter {
  curDate: string
}

export type ITransaction = IStatement

export interface IDebitHistory {
  createdDate: string
  lastModifiedDate: string
  id: number
  fileName: string
  fileDate: string
  totalAmt: number
  totalItem: number
  username: string
  provinceId: string
  createAt: string
}
