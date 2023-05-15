import { DebitService } from "@/services"

interface Props {
  fileName: string
}

const debitService = new DebitService()

export default function DownloadFileCell({ fileName }: Props) {
  const handleDownload = async () => {
    await debitService.downloadXML(fileName)
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
