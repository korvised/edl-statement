import { FC, Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import { Calendar } from "react-date-range"
import clsx from "clsx"

import { DateFormat } from "@/common/ui/components"

import "react-date-range/dist/styles.css"

interface Props {
  date: string
  onChange: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  invalid?: boolean
  width?: number
}

const DatePicker: FC<Props> = ({
  date,
  onChange,
  minDate,
  maxDate,
  disabled,
  invalid,
  width = 8,
}) => {
  return (
    <Popover as={"div"} className="relative w-fit">
      {({ open }) => (
        <Fragment>
          <Popover.Button
            disabled={disabled}
            className={clsx(
              open ? "" : "text-opacity-90",
              disabled
                ? "datepicker-disabled"
                : invalid
                ? "datepicker-input-invalid"
                : "datepicker-input",
              "group",
              `w-52 md:w-[${width}rem]`
            )}
          >
            <p className="flex w-full justify-between gap-x-2 text-sm text-gray-500">
              <span className="">
                {date ? <DateFormat date={date} /> : "ເລືອກວັນທີ"}
              </span>

              {open ? (
                <ChevronUpIcon
                  className="ml-2 h-5 w-5 text-green-600 transition duration-150 ease-in-out group-hover:text-opacity-80"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-opacity-80"
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
            <Popover.Panel
              className="absolute left-0 z-10 mt-2 w-fit origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black
              ring-opacity-5 focus:outline-none md:right-0 md:left-auto md:origin-top-right"
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <Calendar
                  color="#14b8a6"
                  onChange={onChange}
                  date={new Date(date)}
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
