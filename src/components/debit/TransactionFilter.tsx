import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

import { DatePicker } from "@/common/ui/date"
import { Button } from "@/common/ui/button"
import { useAppDispatch, useAppSelector } from "@/state/hooks"
import { getDebitTransactions, updateDebitTranFilter } from "@/state/slices"
import { APIStatus } from "@/types/api.type"
import { AlertService, DateService } from "@/common/services"
import { IDebitTransFilter } from "@/types/debit.type"
import { Link } from "react-router-dom"
import { BsClockHistory } from "react-icons/all"

const alertService = new AlertService()
const dateService = new DateService()

function TransactionFilter() {
  const { transaction } = useAppSelector(state => state.debit)
  const { filter, status } = transaction

  const dispatch = useAppDispatch()

  const handleSearchReport = async () => {
    if (filter) {
      dispatch(getDebitTransactions(filter))
    } else {
      await alertService.warning("ກະລຸນາເລືອກວັນທີກ່ອນ!")
    }
  }

  const handleFilterChange = (date: Date) => {
    const filter: IDebitTransFilter = {
      curDate: dateService.formatIOSDate(date),
    }

    dispatch(updateDebitTranFilter(filter))
  }

  return (
    <div className="space-y-1.5">
      <div className="mt-2 flex flex-col gap-x-4 gap-y-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-x-4">
          <AdjustmentsHorizontalIcon className="-mr-2 h-6 w-6 text-zinc-500" />

          <DatePicker
            date={filter?.curDate}
            onChange={handleFilterChange}
            minWidth={9}
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

        <Link to="/debit-histories">
          <Button
            variant="outline"
            color="white"
            value="ປະຫວັດການສ້າງໄຟລ໌ຕັດໜີ້"
            className="gap-x-2"
          >
            <BsClockHistory className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {status === APIStatus.IDLE && !filter && (
        <p className="z-10 ml-8 block pt-2 text-sm text-yellow-500">
          ກະລຸນາເລືອກວັນທີ່ທີ່ຕ້ອງການເບິ່ງດ້ານເທີງກ່ອນ.
        </p>
      )}
    </div>
  )
}

export default TransactionFilter
