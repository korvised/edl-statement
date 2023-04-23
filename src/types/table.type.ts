import { Column, FilterMeta } from "@tanstack/react-table"

export interface FilterComponentProps {
  column: Column<any, any>
}

export interface CustomFilterMeta extends FilterMeta {
  filterComponent: (props: FilterComponentProps) => JSX.Element
}

export interface FilterProps {
  column: Column<any, any>
}
