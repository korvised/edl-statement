import { FC, ReactNode } from "react"

import { useAppSelector } from "@/state/hooks"
import { Loading } from "@/common/ui/components"
import MainHeader from "./MainHeader"
import Footer from "./Footer"

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { showLoading, loadingMsg } = useAppSelector(state => state.layout)

  return (
    <div className="relative flex h-16 min-h-screen flex-col bg-white font-lao">
      {showLoading && <Loading msg={loadingMsg} />}
      <MainHeader />
      <main className="flex-1 pt-[4rem]">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
