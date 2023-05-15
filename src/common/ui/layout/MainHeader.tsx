import { useMemo } from "react"
import { Popover } from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/24/outline"

import { routes } from "@/config/routes"
import { signOut } from "@/state/slices/authSlice"
import { useAppDispatch, useAppSelector } from "@/state/hooks"
import Logo from "./Logo"
import Link from "./Link"
import SettingIcon from "./SettingIcon"
import MobileNavbar from "./MobileNavbar"

export default function MainHeader() {
  const dispatch = useAppDispatch()

  const auth = useAppSelector(state => state.auth)

  const filteredRoutes = useMemo(
    () =>
      routes.filter(
        route =>
          route.isOnline &&
          route.authorizes.some(role => auth.user?.roles.includes(role))
      ),
    [auth.user]
  )

  const handlerSignOut = () => {
    dispatch(signOut())
  }

  return (
    <header className="fixed inset-0 z-50 h-fit opacity-[0.98]">
      <Popover className="relative w-full border-b bg-white">
        <div
          className="
            mx-auto 
            flex h-16 
            max-w-7xl 
            items-center 
            justify-between 
            px-6 
            md:justify-start 
            md:space-x-10 
            lg:px-8
          "
        >
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <div className="flex items-center gap-x-2">
              <img
                src="/apb.png"
                alt="logo"
                className="inline h-8 w-auto sm:h-10"
              />
              <Logo className="block md:hidden lg:block" />
            </div>
          </div>

          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button
              className="
                inline-flex
                items-center
                justify-center
                rounded-md
                bg-white
                p-2
                text-gray-400
                hover:bg-gray-100
                hover:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-teal-500
              "
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <Popover.Group as="nav" className="hidden space-x-4 md:flex">
            <Link path="/dashboard" label="ໜ້າຫຼັກ" />
            {filteredRoutes.map(route => (
              <Link key={route.path} path={route.path} label={route.name} />
            ))}
            {/*<Link path="/about" label="ກ່ຽວກັບພວກເຮົາ" />*/}
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <SettingIcon />

            <button
              onClick={handlerSignOut}
              className="
                ml-8
                inline-flex
                items-center
                justify-center
                whitespace-nowrap
                rounded-full
                border
                border-transparent
                bg-rose-700
                px-4
                py-1.5
                text-sm
                text-white
                hover:opacity-80
              "
            >
              ອອກລະບົບ
            </button>
          </div>
        </div>

        <MobileNavbar logout={handlerSignOut} />
      </Popover>
    </header>
  )
}
