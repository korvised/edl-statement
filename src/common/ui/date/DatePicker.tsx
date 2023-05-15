import clsx from "clsx"
import { FC, Fragment, useMemo } from "react"
import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import { Calendar } from "react-date-range"

import { DateFormat } from "@/common/ui/components"
import { datepickerStyle } from "@/styles/input.style"

import "react-date-range/dist/styles.css"

interface Props {
  date?: string
  onChange: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  invalid?: boolean
  minWidth?: number
}

const DatePicker: FC<Props> = ({
  date,
  onChange,
  minDate,
  maxDate,
  disabled,
  invalid,
  minWidth = 9,
}) => {
  const selected = useMemo(() => (date ? new Date(date) : undefined), [date])

  const className = useMemo(
    () =>
      clsx(
        datepickerStyle.base,
        disabled
          ? datepickerStyle.status.disabled
          : datepickerStyle.status.enabled,
        invalid && datepickerStyle.status.invalid,
        minWidth ? `w-full min-w-[${minWidth}rem]` : "w-full"
      ),
    [minWidth, disabled, invalid]
  )

  return (
    <Popover as={"div"} className="relative w-fit">
      {({ open }) => (
        <Fragment>
          <Popover.Button
            className={clsx(open && "text-opacity-90", className)}
            disabled={disabled}
          >
            <p className="flex w-full justify-between gap-x-2 text-sm text-gray-500">
              <span className="">
                {date ? <DateFormat date={date} /> : "ເລືອກວັນທີ"}
              </span>
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
            </p>
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
              <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <Calendar
                  color="#14b8a6"
                  onChange={onChange}
                  date={selected}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </Fragment>
      )}
    </Popover>
  )
}

export default DatePicker
