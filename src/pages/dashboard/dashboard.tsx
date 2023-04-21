import { Fragment } from "react"

import { useAppSelector } from "@/state/hooks"
import Layout from "@/common/ui/layout"
import { AppTitle } from "@/common/ui/components"
import { UserRole } from "@/types/auth.type"
import { UserInfoSection } from "@/components/dashboard"
// import { HeroSection, ServiceSection } from "@/components/dashboard"

export default function Example() {
  const auth = useAppSelector(state => state.auth)

  return (
    <Fragment>
      <AppTitle title="Home | ໜ້າຫຼັກ" />
      <Layout>
        <div className="py-8 space-y-8">
          {auth.user && <UserInfoSection user={auth.user} />}
        </div>

      </Layout>
    </Fragment>
  )
}
