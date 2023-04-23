import { Fragment, useState } from "react"

import { AppTitle, Breadcrumbs } from "@/common/ui/components"
import { Layout } from "@/common/ui/layout"
import { XML } from "@/types/upload.type"
import { UploadForm } from "@/components/upload"

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<XML>()

  return (
    <Fragment>
      <AppTitle title="Upload File" />
      <Layout>
        <Breadcrumbs name="ອັບໂຫຼດໄຟລ໌" />
        <section className="section-md py-6">
          <UploadForm
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </section>
      </Layout>
    </Fragment>
  )
}
