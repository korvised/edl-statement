import { Fragment } from "react"

import { AppTitle, Breadcrumbs } from "@/common/ui/components"
import { Layout } from "@/common/ui/layout"
import { ProfileInfo } from "@/components/setting"

export default function Profile() {
  return (
    <Fragment>
      <AppTitle title="Profile Settings" />
      <Layout>
        <Breadcrumbs name="ຕັ້ງຄ່າ" />
        <section className="section-md py-6">
          <ProfileInfo />
        </section>
      </Layout>
    </Fragment>
  )
}
