import { FaHandHoldingWater, FiUploadCloud, FiUsers } from "react-icons/all"
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
    title: "ອັບໂຫຼດໄຟລ໌ຂໍ້ມູນການຊໍາລະຄ່ານໍ້າປະປາ",
    description: "upload file",
    icon: FiUploadCloud,
    authorizes: [USER],
    isOnline: true,
  },
  {
    path: "/statement",
    name: "ລາຍງານການຊຳລະນໍ້າປະປາ",
    title: "ຂໍ້ມູນການຊໍາລະນໍ້າປະປາ",
    description:
      "ລາຍງານຂໍ້ມູນການຊໍາລະນໍ້າປະປາຜ່ານທະນາຄານສົ່ງເສີມກະສິກໍາ ຈໍາກັດ.",
    icon: FaHandHoldingWater,
    authorizes: [USER],
    isOnline: true,
  },
]
