import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

import { IStatementFilter } from "@/types/statement.type"
import { DateRangePicker } from "@/common/ui/date"
import { AlertService, DateService } from "@/common/services"
import { Button } from "@/common/ui/button"
import { useAppDispatch, useAppSelector } from "@/state/hooks"
import { getStatement, updateFilter } from "@/state/slices/statementSlice"
import { APIStatus } from "@/types/api.type"

const alertService = new AlertService()
const dateService = new DateService()

export default function StatementFilter() {
  const { filter, status } = useAppSelector(state => state.statement)

  const dispatch = useAppDispatch()

  const handleUpdateFilter = (values: IStatementFilter) => {
    dispatch(updateFilter(values))
  }

  const handleSearchReport = async () => {
    if (filter && filter.startDate && filter.endDate) {
      dispatch(getStatement(filter))
    } else {
      await alertService.warning("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນກ່ອນ!")
    }
  }

  const handleFilterChange = (startDate?: Date, endDate?: Date) => {
    const formattedStartDate = startDate
      ? dateService.formatIOSDate(startDate)
      : undefined
    const formattedEndDate = endDate
      ? dateService.formatIOSDate(endDate)
      : undefined

    handleUpdateFilter({
      ...filter,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    })
  }

  return (
    <div className="space-y-1.5">
      <div className="mt-2 flex flex-col gap-x-4 gap-y-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-x-4">
          <AdjustmentsHorizontalIcon className="-mr-2 h-6 w-6 text-zinc-500" />

          <DateRangePicker
            startDate={filter?.startDate}
            endDate={filter?.endDate}
            onChange={handleFilterChange}
            maxDate={dateService.getCurrentDate()}
            minWidth={22}
          />

          <Button
            variant="solid"
            color="primary"
            value="ຄົ້ນຫາ"
            className="gap-x-1.5"
            onClick={handleSearchReport}
            disabled={!filter}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {status === APIStatus.IDLE && !filter && (
        <p className="ml-8 text-sm text-yellow-500">
          ກະລຸນາເລືອກວັນທີ່ທີ່ຕ້ອງການເບິ່ງ statement ດ້ານເທີງກ່ອນ.
        </p>
      )}
    </div>
  )
}
