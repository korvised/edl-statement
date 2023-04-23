import { FC } from "react"
import { Listbox } from "@headlessui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"

interface Props {
  id?: string
  open: boolean
  value: string
  placeholder?: string
  isError?: boolean | string | false | undefined
}

const inputStyles =
  "block w-full appearance-none rounded-lg border bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-left text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-white text-sm"

const DropdownInput: FC<Props> = ({
  id,
  open,
  value,
  placeholder,
  isError,
}) => {
  return (
    <Listbox.Button
      id={id}
      className={clsx(
        inputStyles,
        isError ? "border-red-300" : "border-gray-300"
      )}
    >
      <span className={clsx(!value && "text-zinc-400", "block truncate")}>
        {value || placeholder}
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        {open ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        ) : (
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        )}
      </span>
    </Listbox.Button>
  )
}

export default DropdownInput
