import { saveAs } from "file-saver"

import { api, getExceptionPayload } from "@/common/api"
import { AlertService } from "@/common/services"

const alertService = new AlertService()

export class DebitService {
  downloadXML = async (fileName: string) => {
    try {
      const res = await api.get(`/re-download/${fileName}`, {
        responseType: "blob",
      })

      saveAs(res.data, `${fileName}.xml`)
    } catch (ex) {
      const error = getExceptionPayload(ex)
      await alertService.error(error.error || "Error")
    }
  }
}
