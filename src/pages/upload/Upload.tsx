import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"

import { AppTitle, Breadcrumbs, NumberFormat } from "@/common/ui/components"
import Layout from "@/common/ui/layout"
import clsx from "clsx"
import { BsFiletypeXml } from "react-icons/all"

const buttonStyle =
  "relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"

interface XML extends File {
  url: string
}

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<XML>()

  const inputRef = useRef<HTMLInputElement>(null)

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept: { "text/xml": [] },
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        const file: XML = Object.assign(acceptedFiles[0], {
          url: URL.createObjectURL(acceptedFiles[0]),
        })

        setSelectedFile(file)
      }
    },
  })

  const className = useMemo(
    () =>
      clsx(
        "flex border-2 p-8 rounded-md border-dashed transition flex-col gap-y-1 text-gray-600",
        isFocused && "border-sky-500",
        isDragAccept && "border-blue-500",
        isDragReject && "border-red-500"
      ),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <Fragment>
      <AppTitle title="Upload File" />
      <Layout>
        <Breadcrumbs name="ອັບໂຫຼດໄຟລ໌" />
        <section className="section-md py-6">
          <div {...getRootProps({ className })}>
            <input {...getInputProps()} ref={inputRef} />

            <div className="flex items-center justify-center">
              <BsFiletypeXml className="h-16 w-16 text-center" />
            </div>

            <div className="mt-4 flex items-center justify-center gap-x-2 text-sm">
              <button
                type="button"
                onClick={() => open()}
                className={buttonStyle}
              >
                ເລືອກໄຟລ໌
              </button>

              <p>ຫຼື ລາກໄຟລ໌ທີ່ຕ້ອງການອັບໂຫຼດໃສ່ຫ້ອງນີ້</p>
            </div>
            <p className="text-center text-sm text-gray-400">
              ຕ້ອງເປັນໄຟລ໌ xml ເທົານັ້ນ
            </p>
          </div>

          <div className="mt-6">
            {selectedFile && (
              <div className="flex gap-x-2">
                <b>ຊື່ໄຟລ໌:</b>
                <p>{selectedFile.name}</p>
                <p>
                  (<NumberFormat value={selectedFile.size / 1000000} />
                  <span className="pl-1">MB</span>)
                </p>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </Fragment>
  )
}
