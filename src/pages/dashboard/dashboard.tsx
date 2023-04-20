import { Fragment } from "react"

import { useAppSelector } from "@/state/hooks"
import Layout from "@/common/ui/layout"
import { AppTitle } from "@/common/ui/components"
import { UserRole } from "@/types/auth.type"
// import { HeroSection, ServiceSection } from "@/components/dashboard"

export default function Example() {
  const auth = useAppSelector(state => state.auth)

  return (
    <Fragment>
      <AppTitle title="Counter Service" />
      <Layout>
        Dashboard
        {/*{auth.user?.roles.includes(UserRole.TELLER) && <ServiceSection />}*/}
        {auth.user?.roles.includes(UserRole.ROOT) && (
          <Fragment>{/*<HeroSection />*/}</Fragment>
        )}
      </Layout>
    </Fragment>
  )
}
