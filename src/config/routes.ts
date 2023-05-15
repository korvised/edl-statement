import {
  AiOutlineFileDone,
  BsClockHistory,
  FaHandHoldingWater,
  FiUploadCloud,
  FiUsers,
  MdOutlineWorkHistory,
} from "react-icons/all"
import { IRout } from "@/types/layout.type"
import { UserRole } from "@/types/auth.type"

const { ADMIN, USER } = UserRole

export const routes: IRout[] = [
  {
    path: "/customers",
    name: "ຂໍ້ມູນຜູ້ຊົມໃຊ້ນໍ້າປະປາ",
    title: "ຂໍ້ມູນຜູ້ຊົມໃຊ້ນໍ້າປະປາ",
    description:
      "ຂໍ້ມູນຜູ້ຊົມໃຊ້ນໍ້າປະປາພາຍໃນແຂວງທີ່ໄດ້ອັບໂຫຼດເຂົ້າລະບົບທະນາຄານສົ່ງເສີມກະສິກໍາ ຈໍາກັດ.",
    icon: FiUsers,
    authorizes: [USER],
    isOnline: false,
  },
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
    path: "/debit",
    name: "ສ້າງໄຟລ໌ຕັດໜີ້",
    title: "ສ້າງໄຟລ໌ຕັດໜີ້",
    description:
      "ລາຍການທຸລະກໍາຂອງລູກຄ້າ ທສກ ທີ່ຍັງບໍ່ທັນໄດ້ສ້າງໄຟລ໌ຕັດໜີ້ເບື້ອງລະບົບຂອງລະບົບນໍ້າປະປາ.",
    icon: AiOutlineFileDone,
    authorizes: [USER],
    isOnline: true,
  },
  {
    path: "/upload-histories",
    name: "ປະຫວັດ",
    title: "ປະຫວັດການອັບໂຫຼດໄຟລ໌",
    description:
      "ປະຫວັດການອັບໂຫຼດໄຟລ໌ຂໍ້ມູນຜູ້ຊົມໃຊ້ນໍ້າປະປາຂົ້າລະບົບທະນາຄານສົ່ງເສີມກະສິກໍາ ຈໍາກັດ.",
    icon: BsClockHistory,
    authorizes: [USER],
    isOnline: false,
  },
  {
    path: "/debit-histories",
    name: "ປະຫວັດການສ້າງໄຟລ໌ຕັດໜີ້",
    title: "ປະຫວັດການສ້າງໄຟລ໌ຕັດໜີ້",
    description:
      "ລາຍການປະຫວັດການສ້າງໄຟລ໌ຕັດໜີ້ທຸລະກໍາຂອງລູກຄ້າ ທສກ ທີ່ຍັງບໍ່ທັນໄດ້ສ້າງໄຟລ໌ຕັດໜີ້ເບື້ອງລະບົບຂອງລະບົບນໍ້າປະປາ.",
    icon: MdOutlineWorkHistory,
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
