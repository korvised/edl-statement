import clsx from "clsx"
import { FC, Fragment, useMemo } from "react"
import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import { DateRange, Range, RangeKeyDict } from "react-date-range"

import { DateFormat } from "@/common/ui/components"
import { datepickerStyle } from "@/styles/input.style"

import "@/styles/sass/date_range.scss"

const rangeColors = ["#14b8a6", "#0d9488", "#0f766e"]

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
        datepickerStyle.base,
        disabled
          ? datepickerStyle.status.disabled
          : datepickerStyle.status.enabled,
        invalid && datepickerStyle.status.invalid,
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
                className={clsx(
                  datepickerStyle.arrowIcon.base,
                  datepickerStyle.arrowIcon.up
                )}
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className={clsx(
                  datepickerStyle.arrowIcon.base,
                  datepickerStyle.arrowIcon.down
                )}
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
