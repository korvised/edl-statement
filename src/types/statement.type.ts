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
  numcli: string
  nomsoc: string
  amount: number
  tellerId: string
  datePayment: string
  kcbTx: string
}
