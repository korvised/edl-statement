import { FC, Fragment } from "react"
import { NavLink } from "react-router-dom"
import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"

import { IRout } from "@/types/layout.type"
import classes from "./Dropdown.module.scss"

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
            <Popover.Panel className={classes.dropdown}>
              <div className={classes.dropdown__group}>
                <div className={classes.dropdown__container}>
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
                      <div className={classes.dropdown__icon}>
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
