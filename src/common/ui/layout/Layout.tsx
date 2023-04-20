import { FC, ReactNode } from "react"

import MainHeader from "./MainHeader"
import Footer from "./Footer"
import classes from "./Layout.module.scss"
import { useAppSelector } from "@/state/hooks"
import { Loading } from "@/common/ui/components"

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { showLoading, loadingMsg } = useAppSelector(state => state.layout)

  return (
    <div className={classes.layout}>
      {showLoading && <Loading msg={loadingMsg} />}
      <MainHeader />
      <main className={classes.content}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
