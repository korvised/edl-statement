import * as FileSaver from "file-saver"

import { api, getExceptionPayload } from "@/common/api"
import { AlertService } from "@/common/services"

const alertService = new AlertService()

export class UploadService {
  downloadXML = async (fileName: string) => {
    try {
      const res = await api.get(`load-file/${fileName}`, {
        responseType: "blob",
      })

      FileSaver.saveAs(res.data, `${fileName}.xml`)
    } catch (ex) {
      const error = getExceptionPayload(ex)
      await alertService.error(error.error || "Error")
    }
  }
}
