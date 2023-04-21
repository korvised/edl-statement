import { Popover } from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/24/outline"

// import { reportRoutes, serviceRoutes, settingRoutes } from "@/config/navigation"
import { signOut } from "@/state/slices/authSlice"
import { useAppDispatch, useAppSelector } from "@/state/hooks"
import MiniNavbar from "@/common/ui/layout/MiniNavbar"
import Link from "./Link"
import classes from "./MainHeader.module.scss"

export default function MainHeader() {
  const { user } = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  const handlerSignOut = () => {
    dispatch(signOut())
  }

  return (
    <header className={classes.root}>
      <Popover className={classes.container}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <div className={classes.link}>
              <img src="/apb.png" alt="logo" />
              <h3 className={classes.logo__name}>
                <b>ທະນາຄານສົ່ງເສີມກະສີກໍາ</b>
                <p>APIS Water Supply</p>
              </h3>
            </div>
          </div>

          <div className={classes.miniMenu}>
            <Popover.Button className={classes.miniMenu__button}>
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <Popover.Group as="nav" className={classes.nav}>
            <Link path="/dashboard" text="ໜ້າຫຼັກ" />
            <Link path="/about" text="ກ່ຽວກັບພວກເຮົາ" />
          </Popover.Group>
          <div className={classes.userSection}>
            <h3 className={classes.userSection__name}>{user?.username}</h3>
            <button
              className={classes.userSection__button}
              onClick={handlerSignOut}
            >
              ອອກລະບົບ
            </button>
          </div>
        </div>

        <MiniNavbar />
      </Popover>
    </header>
  )
}
