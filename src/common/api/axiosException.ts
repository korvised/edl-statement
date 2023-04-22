import { isAxiosError } from "axios"
import { APIError } from "@/types/api.type"

const InternalError: APIError = {
  code: -500,
  message: "Internal error during request",
}

export const getExceptionPayload = (ex: unknown): APIError => {
  if (typeof ex !== "object" || !ex || !isAxiosError(ex)) {
    // console.log("not object");
    return InternalError
  }

  if (ex.code === "ERR_NETWORK") {
    return {
      code: -404,
      message:
        "ການເຊື່ອມຕໍ່ຂັດຂ້ອງກະລຸນາກວດສອບອິນເຕີເນັດຂອງທ່ານແລ້ວລອງໃໝ່ອີກຄັ້ງ!",
    }
  } else if (isAxiosError(ex)) {
    return ex.response?.data || InternalError
  }

  return InternalError
}
