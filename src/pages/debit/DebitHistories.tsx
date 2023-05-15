import React, { Fragment } from "react"
import { Layout } from "@/common/ui/layout"
import { AppTitle, Breadcrumbs } from "@/common/ui/components"

export default function DebitHistories() {
  return (
    <Fragment>
      <AppTitle title="list of download's histories" />
      <Layout>
        <Breadcrumbs name="ຂໍ້ມູນຜູ້ຊົມໃຊ້ນໍ້າປະປາ" />
        <section className="section-md">DebitHistories</section>
      </Layout>
    </Fragment>
  )
}
