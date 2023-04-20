import { Fragment } from "react"
import { Link } from "react-router-dom"
import { Popover, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"

// import { serviceRoutes, reportRoutes } from "@/config/navigation"
import classes from "./MiniNavbar.module.scss"

const routes: any[] = []
// [
// ...serviceRoutes.filter(s => s.isOnline),
// ...reportRoutes.filter(r => r.isOnline),
// ]

export default function MiniNavbar() {
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
      <Popover.Panel focus className={classes.modal}>
        <div className={classes.container}>
          <div className="px-5 pb-6 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <img className="h-8 w-auto" src="/apb.png" alt="Your Company" />
              </div>
              <div className="-mr-2">
                <Popover.Button className={classes.closeButton}>
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid grid-cols-1 gap-7">
                {routes.map(item => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                  >
                    <div className={classes.icon}>
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="ml-4 text-base font-medium text-gray-900">
                      {item.name}
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="px-5 py-6">
            <div className={classes.nav}>
              <Link to="/about" className={classes.nav__item}>
                ກ່ຽວກັບພວກເຮົາ
              </Link>
            </div>
            <div className="mt-6">
              <button className={classes.signoutButton}>ອອກລະບົບ</button>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  )
}
