import { FC, Fragment, useMemo } from "react"
import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import { DateRange, Range, RangeKeyDict } from "react-date-range"
import clsx from "clsx"

import { DateFormat } from "@/common/ui/components"

import "@/styles/sass/date_range.scss"

const rangeColors = ["#14b8a6", "#0d9488", "#0f766e"]

const styles = {
  base: "relative inline-flex items-center justify-between rounded-md border bg-white py-2 pl-3 pr-2 text-base",
  status: {
    enabled:
      "hover:text-opacity-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 text-gray-600",
    disabled: "bg-zinc-100 text-gray-500",
    invalid: "border-red-300 focus:border-gray-200",
  },
}

interface Props {
  startDate?: string
  endDate?: string
  onChange: (startDate?: Date, endDate?: Date) => void
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  invalid?: boolean
  minWidth?: number
}

const DateRangePicker: FC<Props> = ({
  startDate,
  endDate,
  onChange,
  minDate,
  maxDate,
  disabled,
  invalid,
  minWidth,
}) => {
  const handleChange = ({ range1: range }: RangeKeyDict) => {
    onChange(range.startDate, range.endDate)
  }

  const className = useMemo(
    () =>
      clsx(
        styles.base,
        disabled ? styles.status.disabled : styles.status.enabled,
        invalid && styles.status.invalid,
        minWidth ? `w-[${minWidth}rem]` : "w-full"
      ),
    [minWidth, disabled]
  )

  const dateRange: Range = useMemo(
    () => ({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    }),
    [startDate, endDate]
  )

  return (
    <Popover as={"div"} className="relative w-fit">
      {({ open }) => (
        <Fragment>
          <Popover.Button
            className={clsx(open && "text-opacity-90", className)}
            disabled={disabled}
          >
            <p className="flex gap-x-2 text-sm text-gray-500">
              {startDate ? <DateFormat date={startDate} /> : "Start Date"}
              <span>&rarr;</span>
              {endDate ? <DateFormat date={endDate} /> : "End Date"}
            </p>
            {open ? (
              <ChevronUpIcon
                className="ml-2 h-5 w-5 text-zinc-800 transition duration-150 ease-in-out group-hover:text-opacity-80"
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className="ml-2 h-5 w-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-opacity-80"
                aria-hidden="true"
              />
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-20 mt-2">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <DateRange
                  key="range"
                  dateDisplayFormat="dd/MM/yyyy"
                  showDateDisplay={false}
                  rangeColors={rangeColors}
                  onChange={handleChange}
                  minDate={minDate}
                  maxDate={maxDate}
                  ranges={[dateRange]}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </Fragment>
      )}
    </Popover>
  )
}

export default DateRangePicker
