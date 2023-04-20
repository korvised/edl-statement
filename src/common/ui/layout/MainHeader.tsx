import { Link } from "react-router-dom"
import { Popover } from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/24/outline"

// import { reportRoutes, serviceRoutes, settingRoutes } from "@/config/navigation"
import { signOut } from "@/state/slices/authSlice"
import { useAppDispatch, useAppSelector } from "@/state/hooks"
import MiniNavbar from "@/common/ui/layout/MiniNavbar"
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
            <Link to="/" className={classes.link}>
              <img src="/apb.png" alt="logo" />
              <h3 className={classes.logo__name}>
                <b>ທະນາຄານສົ່ງເສີມກະສີກໍາ</b>
                <p>Counter Service</p>
              </h3>
            </Link>
          </div>

          <div className={classes.miniMenu}>
            <Popover.Button className={classes.miniMenu__button}>
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <Popover.Group as="nav" className={classes.nav}>
            {/*{user?.roles.includes(UserRole.TELLER) && (*/}
            {/*  <Dropdown*/}
            {/*    name="ບໍລິການ"*/}
            {/*    routes={serviceRoutes.filter(s => s.isOnline)}*/}
            {/*  />*/}
            {/*)}*/}

            {/*{user?.roles.includes(UserRole.TELLER) && (*/}
            {/*  <Dropdown*/}
            {/*    name="ລາຍງານ"*/}
            {/*    routes={reportRoutes.filter(r => r.isOnline)}*/}
            {/*  />*/}
            {/*)}*/}

            {/*{user?.roles.includes(UserRole.ROOT) && (*/}
            {/*  <Dropdown name="ຕັ້ງຄ່າ" routes={settingRoutes} />*/}
            {/*)}*/}

            <Link to="/about" className={classes.nav__link}>
              ກ່ຽວກັບພວກເຮົາ
            </Link>
          </Popover.Group>
          <div className={classes.userSection}>
            <h3 className={classes.userSection__name}>{user?.userName}</h3>
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
