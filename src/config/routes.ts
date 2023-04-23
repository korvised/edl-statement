import {
  BsClockHistory,
  FaHandHoldingWater,
  FiUploadCloud,
  FiUsers,
} from "react-icons/all"
import { IRout } from "@/types/layout.type"
import { UserRole } from "@/types/auth.type"

const { ADMIN, USER } = UserRole

export const routes: IRout[] = [
  {
    path: "/users",
    name: "ຂໍ້ມູນຜູ້ໃຊ້",
    title: "ຈັດການຂໍ້ມູນຜູ້ໃຊ້ງານ",
    description:
      "ຈັການຂໍ້ມູນຜູ້ໃຊ້ງານໃນລະບົບເຊັ່ນ: ລົງທະບຽນຜູ້ໃຊ້, ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້...",
    icon: FiUsers,
    authorizes: [ADMIN],
    isOnline: true,
  },

  {
    path: "/upload",
    name: "ອັບໂຫຼດໄຟລ໌",
    title: "ອັບໂຫຼດໄຟລ໌",
    description:
      "ອັບໂຫຼດໄຟລ໌ຂໍ້ມູນຜູ້ຊົມໃຊ້ນໍ້າປະປາພາຍໃນແຂວງເຂົ້າລະບົບທະນາຄານສົ່ງເສີມກະສິກໍາ ຈໍາກັດ.",
    icon: FiUploadCloud,
    authorizes: [USER],
    isOnline: true,
  },
  {
    path: "/upload-history",
    name: "ປະຫວັດ",
    title: "ປະຫວັດການອັບໂຫຼດໄຟລ໌",
    description:
      "ປະຫວັດການອັບໂຫຼດໄຟລ໌ຂໍ້ມູນຜູ້ຊົມໃຊ້ນໍ້າປະປາຂົ້າລະບົບທະນາຄານສົ່ງເສີມກະສິກໍາ ຈໍາກັດ.",
    icon: BsClockHistory,
    authorizes: [USER],
    isOnline: false,
  },
  {
    path: "/statement",
    name: "Statement",
    title: "Statement",
    description:
      "ລາຍງານຂໍ້ມູນການຊໍາລະນໍ້າປະປາຜ່ານທະນາຄານສົ່ງເສີມກະສິກໍາ ຈໍາກັດ.",
    icon: FaHandHoldingWater,
    authorizes: [USER],
    isOnline: true,
  },
]
