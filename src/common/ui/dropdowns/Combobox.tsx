import { FC, Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"

import { DropdownInput } from "./components"
import { MODAL_STYLES } from "@/styles/modal.style"

interface Props<T> {
  disabled?: boolean
  option: T
  options: T[]
  setOption: (value: T) => void
}

const Combobox: FC<Props<any>> = ({
  disabled = false,
  option,
  options,
  setOption,
}) => {
  return (
    <Listbox disabled={disabled} value={option} onChange={setOption}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Label text</Listbox.Label>

          <div className="relative w-full min-w-fit">
            <DropdownInput open={open} value={option} />

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className={MODAL_STYLES}>
                {options.map(option => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      clsx(
                        active ? "bg-teal-500 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option}
                        </span>

                        {selected ? (
                          <span
                            className={clsx(
                              active ? "text-white" : "text-black",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default Combobox
