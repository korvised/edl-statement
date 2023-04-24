import { useState } from "react"
import { Column } from "@tanstack/react-table"
import { DEFAULT_OPTION } from "@/config/const"

import { userStatusOptions } from "@/config/status"
import { IOption } from "@/types/layout.type"
import { Dropdown } from "@/common/ui/dropdowns"

const options: IOption<boolean | number>[] = [
  { value: 99, name: DEFAULT_OPTION },
  ...userStatusOptions,
]

const StatusFilter = ({ column }: { column: Column<any, any> }) => {
  const [option, setOption] = useState<IOption<boolean | number>>(options[0])

  const handleChange = (inputOption: IOption<number>) => {
    setOption(inputOption)
    column.setFilterValue(inputOption.value === 99 ? "" : inputOption.value)
  }

  return (
    <div key={column.id} className="flex items-center gap-x-2 text-sm">
      <label className="block text-sm font-semibold text-gray-700">
        ສະຖານະ
      </label>
      <div className="min-w-[7rem]">
        <Dropdown option={option} options={options} setOption={handleChange} />
      </div>
    </div>
  )
}

export default StatusFilter
