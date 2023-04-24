import React, { FC, Fragment, useMemo } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"

import { IProvince } from "@/types/province.type"
import { DropdownInput } from "@/common/ui/dropdowns/components"
import { MODAL_STYLES } from "@/styles/modal.style"

interface Props {
  provinces: IProvince[]
  province: string
  isError?: boolean | string | false | undefined
  setProvince: (province: IProvince) => void
}

export const ProvinceOption: FC<Props> = ({
  provinces,
  province,
  isError,
  setProvince,
}) => {
  const selectedProvince = useMemo(
    () => provinces.find(pro => pro.id === province),
    [provinces, province]
  )

  return (
    <Listbox value={selectedProvince} onChange={setProvince}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Label text</Listbox.Label>

          <div className="relative w-full">
            <DropdownInput
              id="province"
              open={open}
              value={selectedProvince?.nameLa || "ເລືອກແຂວງ"}
              placeholder="ເລືອກແຂວງ"
              isError={isError}
            />

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className={MODAL_STYLES}>
                {provinces.map(option => (
                  <Listbox.Option
                    key={option.id}
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
                            "block truncate text-sm"
                          )}
                        >
                          {option.nameLa}
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
