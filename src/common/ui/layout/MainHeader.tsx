import { useMemo } from "react"
import { Popover } from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/24/outline"

import { routes } from "@/config/routes"
import { signOut } from "@/state/slices/authSlice"
import { useAppDispatch, useAppSelector } from "@/state/hooks"
import MiniNavbar from "@/common/ui/layout/MiniNavbar"
import Link from "./Link"
import SettingIcon from "./SettingIcon"
import classes from "./MainHeader.module.scss"

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
            <Link path="/dashboard" label="ໜ້າຫຼັກ" />
            {filteredRoutes.map(route => (
              <Link key={route.path} path={route.path} label={route.name} />
            ))}
            <Link path="/about" label="ກ່ຽວກັບພວກເຮົາ" />
          </Popover.Group>
          <div className={classes.userSection}>
            <SettingIcon />

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
