import { APIError, APIStatus } from "@/types/api.type"

export interface IStatementState {
  status: APIStatus
  dateText?: string
  filter?: IStatementFilter
  data: IStatement[]
  error?: APIError
}

export interface IStatementFilter {
  startDate?: string
  endDate?: string
}

export interface IStatement {
  createdDate: string
  lastModifiedDate: string
  id: number
  billNumber: string
  billName: string
  orgAmount: number
  amount: number
  fee: number
  teller: string
  fromAcctNumber: string
  fromAcctName: string
  toAcctNumber: string
  channel: string
  transType: string
  resultCode: string
  resultMsg: string
  transId: string
  statusWs: boolean
  statusTrans: string
  branchId: string
  statusRefund: boolean
  createAt: string
}
