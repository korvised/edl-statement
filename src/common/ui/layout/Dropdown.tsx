import clsx from "clsx"
import { FC, Fragment } from "react"
import { NavLink } from "react-router-dom"
import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"

import { IRout } from "@/types/layout.type"

const linkStyle =
  "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"

interface DropdownProps {
  name: string
  routes: IRout[]
}

const Dropdown: FC<DropdownProps> = ({ name, routes }) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              open ? "text-zinc-900" : "text-zinc-600",
              linkStyle
            )}
          >
            <span>{name}</span>
            <ChevronDownIcon
              className={clsx(
                open ? "text-zinc-600" : "text-zinc-400",
                "ml-2 h-5 w-5 group-hover:text-zinc-500"
              )}
              aria-hidden="true"
            />
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
              className="
                absolute 
                z-10 
                -ml-4 
                mt-3 
                w-screen 
                max-w-md 
                transform 
                lg:left-1/2 
                lg:ml-0 
                lg:max-w-2xl 
                lg:-translate-x-1/2
              "
            >
              <div
                className="
                  overflow-hidden 
                  rounded-lg 
                  shadow-lg 
                  ring-1 
                  ring-black 
                  ring-opacity-5
                "
              >
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                  {routes.map((item, idx) => (
                    <NavLink
                      key={idx}
                      to={item.path}
                      className={({ isActive }) =>
                        clsx(
                          isActive ? "bg-zinc-100" : "hover:bg-zinc-50",
                          "-m-3 flex items-start rounded-lg p-3"
                        )
                      }
                    >
                      <div
                        className="
                          flex h-10
                          w-10
                          flex-shrink-0
                          items-center
                          justify-center
                          rounded-md
                          bg-black
                          text-white
                          sm:h-12
                          sm:w-12
                        "
                      >
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-medium text-zinc-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-zinc-500">
                          {item.description}
                        </p>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default Dropdown
