import { NumberFormat } from "@/common/ui/components"

interface Props {
  selectedFile?: File
}

export function FileName({ selectedFile }: Props) {
  return (
    <div className="mt-6 flex justify-center">
      <div className="flex divide-x border bg-gray-100 text-sm">
        <div className="px-2 py-1.5 text-gray-400">XML</div>

        <div className="flex w-fit min-w-[10rem] gap-x-2 bg-white px-2 py-1.5">
          <b>ຊື່ໄຟລ໌:</b>
          <p>{selectedFile?.name || "N/A"}</p>
        </div>

        <div className="flex px-2 py-1.5">
          <NumberFormat
            value={selectedFile ? selectedFile.size / 1000000 : 0}
          />
          <p className="pl-1">MB</p>
        </div>
      </div>
    </div>
  )
}
