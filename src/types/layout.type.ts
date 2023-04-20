import { ForwardRefExoticComponent, SVGProps } from "react"
import { IconType } from "react-icons"

import { UserRole } from "./auth.type"

export interface IRout {
  name: string
  description: string
  path: string
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>> | IconType
  isOnline: boolean
  authorizes: UserRole[]
}

export interface IPage {
  name: string
  route: string
  current?: boolean
}

export interface ILayoutState {
  showLoading: boolean
  loadingMsg: string
}

export interface IOption<T> {
  value: T
  name: string
}

export interface IAuthRout {
  path: string
  Component: () => JSX.Element
}

export type IPrivateRout = { authorities: UserRole[] } & IAuthRout

export interface IFilterPage {
  pageIndex: number
  pageSize: number
}

export interface IReportBranch {
  branchCode: string
  branchName: string
  qty: string
}

export type IReportLayout = "SUMMARY" | "LIST"

export type IReportFilterChanel = "MOBILE" | "COUNTER"
