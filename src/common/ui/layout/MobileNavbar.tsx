import { Fragment } from "react"
import { Link, NavLink } from "react-router-dom"
import { Popover, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { routes } from "@/config/routes"
import Logo from "./Logo"
import clsx from "clsx"

interface MobileNavbarProps {
  logout: () => void
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ logout }) => {
  return (
    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="
          absolute 
          inset-x-0 
          top-0 z-30 
          origin-top-right 
          transform p-2 
          transition 
          md:hidden
        "
      >
        <div
          className="
            divide-y-2
            divide-gray-50
            rounded-lg
            bg-white
            shadow-lg
            ring-1
            ring-black
            ring-opacity-5
            "
        >
          <div className="px-5 pb-6 pt-5">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-x-2 focus:outline-none"
              >
                <img className="h-8 w-auto" src="/apb.png" alt="Your Company" />
                <Logo className="block" />
              </Link>
              <div className="-mr-2">
                <Popover.Button
                  className="
                    inline-flex 
                    items-center 
                    justify-center 
                    rounded-md bg-white 
                    p-2 text-gray-400 
                    hover:bg-gray-100
                    hover:text-gray-500 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-inset 
                    focus:ring-gray-900
                  "
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid grid-cols-1 gap-7">
                {routes.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      clsx(
                        isActive ? "text-black" : "text-gray-500",
                        "-m-3 flex items-center rounded-lg bg-white p-3 hover:bg-gray-50"
                      )
                    }
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-md
                        bg-teal-500
                        text-white
                      "
                    >
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="ml-4 text-base font-medium">
                      {item.name}
                    </div>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
          <div className="px-5 py-6">
            <button
              onClick={logout}
              className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-transparent
                  bg-rose-700
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  hover:opacity-80
                "
            >
              ອອກລະບົບ
            </button>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  )
}

export default MobileNavbar
