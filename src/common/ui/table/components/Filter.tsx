import { FC, ReactNode, useMemo, useState } from "react"
import { Column } from "@tanstack/react-table"
import clsx from "clsx"

import { Combobox } from "@/common/ui/dropdowns"
import { DEFAULT_OPTION } from "@/config/const"

interface Props {
  column: Column<any, any>
  label: ReactNode | string
  minWidth?: string
}

export const ColumnFilter: FC<Props> = ({ column, label, minWidth }) => {
  const [option, setOption] = useState<string>(DEFAULT_OPTION)

  const options: string[] = useMemo(
    () => [
      DEFAULT_OPTION,
      ...Array.from(column.getFacetedUniqueValues().keys()).sort(),
    ],
    [column]
  )

  const handleChange = (inputOption: string) => {
    setOption(inputOption)
    column.setFilterValue(inputOption === DEFAULT_OPTION ? "" : inputOption)
  }

  return (
    <div className="relative flex items-center gap-x-2">
      <label
        htmlFor={column.id}
        className="block min-w-fit text-sm font-semibold text-gray-700"
      >
        {label}
      </label>
      <div className={clsx("relative w-full", minWidth)}>
        <Combobox option={option} options={options} setOption={handleChange} />
      </div>
    </div>
  )
}

export const PageOption = ({
  pageSize,
  setPageSize,
}: {
  pageSize: number
  setPageSize: (pageSize: number) => void
}) => {
  return (
    <div className="mt-2 flex flex-col gap-x-2 sm:mt-0 sm:flex-row sm:items-center">
      <label
        htmlFor="page-size"
        className="text-sm font-semibold text-gray-700"
      >
        ຈຳນວນ
      </label>
      <div className="w-20">
        <Combobox
          option={pageSize}
          options={[10, 25, 50, 100]}
          setOption={setPageSize}
        />
      </div>
    </div>
  )
}
