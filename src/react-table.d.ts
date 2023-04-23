import { FilterFn } from "@tanstack/react-table"
import { RankingInfo } from "@tanstack/match-sorter-utils"
import { FilterComponentProps } from "@/types/table.type"

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }

  interface ColumnMeta<TData extends unknown, TValue> {
    filterComponent?: (props: FilterComponentProps) => JSX.Element
    isCustomFilterComponent?: boolean
    isOptionFilter?: boolean
    minWidth?: string
  }
}
