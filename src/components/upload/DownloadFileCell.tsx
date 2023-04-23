import { UploadService } from "@/services/upload.service"

interface Props {
  fileName: string
}

const uploadService = new UploadService()

export default function DownloadFileCell({ fileName }: Props) {
  const handleDownload = async () => {
    await uploadService.downloadXML(fileName)
  }

  return (
    <div>
      <button
        type="button"
        className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
        onClick={handleDownload}
      >
        download
      </button>
    </div>
  )
}
