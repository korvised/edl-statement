import { FormEvent, useMemo, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { AiOutlineCloudUpload, BsFiletypeXml } from "react-icons/all"
import clsx from "clsx"

import { useAppDispatch } from "@/state/hooks"
import { XML } from "@/types/upload.type"
import { Button } from "@/common/ui/button"
import { FileName } from "./FileName"
import { uploadFile } from "@/state/slices/uploadSlice"

interface Props {
  selectedFile?: XML
  setSelectedFile: (selectedFile: XML) => void
}

const buttonStyle =
  "relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"

export default function UploadForm({ selectedFile, setSelectedFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()

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
        setSelectedFile(acceptedFiles[0])
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (selectedFile) {
      const formData = new FormData();
      formData.append("xmlFile", selectedFile)

      dispatch(uploadFile(formData))
    }
  }

  return (
    <form {...getRootProps({ className })} onSubmit={handleSubmit}>
      <input {...getInputProps()} ref={inputRef} />

      <div className="flex items-center justify-center">
        <BsFiletypeXml className="h-16 w-16 text-center" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-x-2 text-sm">
        <button type="button" onClick={() => open()} className={buttonStyle}>
          ເລືອກໄຟລ໌
        </button>

        <p>ຫຼື ລາກໄຟລ໌ທີ່ຕ້ອງການອັບໂຫຼດໃສ່ຫ້ອງນີ້ ( 1 ໄຟລ໌ )</p>
      </div>
      <p className="text-center text-sm text-gray-400">
        ຕ້ອງເປັນໄຟລ໌ xml ເທົານັ້ນ
      </p>

      <FileName selectedFile={selectedFile} />

      <div className="mt-8 flex justify-center">
        <Button
          variant="solid"
          color="primary"
          type="submit"
          value="ອັບໂຫຼດໄຟລ໌"
          className="gap-x-2"
          disabled={!selectedFile}
        >
          <AiOutlineCloudUpload className="h-5 w-5" />
        </Button>
      </div>
    </form>
  )
}
