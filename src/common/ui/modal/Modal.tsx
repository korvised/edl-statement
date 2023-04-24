import React, { FC, Fragment, HTMLProps, ReactNode } from "react"
import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"

import { ModalTitle } from "./components"

type Props = {
  title: string
  open: boolean
  children: ReactNode
} & HTMLProps<HTMLDivElement>

const Modal: FC<Props> = ({ title, open, children, className, ...props }) => {
  className = clsx(
    "relative mx-auto rounded-lg bg-white px-4 pt-5 pb-4 shadow-xl transition-all sm:my-8 sm:p-6",
    className
  )

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => null}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block w-full transform sm:align-middle">
              <div className={className} {...props}>
                <ModalTitle title={title} />
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
