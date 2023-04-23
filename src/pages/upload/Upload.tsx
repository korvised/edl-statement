import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { BsClockHistory, FiUsers } from "react-icons/all"

import { AppTitle, Breadcrumbs } from "@/common/ui/components"
import { Layout } from "@/common/ui/layout"
import { UploadForm } from "@/components/upload"
import { Button } from "@/common/ui/button"

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File>()

  return (
    <Fragment>
      <AppTitle title="Upload File" />
      <Layout>
        <Breadcrumbs name="ອັບໂຫຼດໄຟລ໌" />
        <section className="section-md space-y-2 py-6">
          <div className="flex gap-x-3">
            <Link to="/customers">
              <Button
                variant="outline"
                color="white"
                value="ຂໍ້ມູນຜູ້ຊົມໃຊ້ນໍ້າປະປາ"
                className="gap-x-2"
              >
                <FiUsers className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/upload-history">
              <Button
                variant="outline"
                color="white"
                value="ປະຫວັດການອັບໂຫຼດໄຟລ໌"
                className="gap-x-2"
              >
                <BsClockHistory className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <UploadForm
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </section>
      </Layout>
    </Fragment>
  )
}
