import { Fragment, useMemo } from "react"

import { useAppSelector } from "@/state/hooks"
import { Layout } from "@/common/ui/layout"
import { AppTitle } from "@/common/ui/components"
import { MenuSection, UserInfoSection } from "@/components/dashboard"
import { routes } from "@/config/routes"

export default function Example() {
  const auth = useAppSelector(state => state.auth)

  const filteredRoutes = useMemo(
    () =>
      routes.filter(route =>
        route.authorizes.some(role => auth.user?.roles.includes(role))
      ),
    [auth.user]
  )

  return (
    <Fragment>
      <AppTitle title="Home | ໜ້າຫຼັກ" />
      <Layout>
        <div className="space-y-8 py-4">
          {auth.user && <UserInfoSection user={auth.user} />}
          <MenuSection routes={filteredRoutes} />
        </div>
      </Layout>
    </Fragment>
  )
}
