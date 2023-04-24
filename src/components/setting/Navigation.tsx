import { UserIcon } from "@heroicons/react/24/solid"
import { AiOutlineUser, BiPhone, RiLockPasswordLine } from "react-icons/all"

import { IAuthUser } from "@/types/auth.type"

interface Props {
  user: IAuthUser
  handleOpenEdit: () => void
  handleOpenReset: () => void
}

export function Navigation({ user, handleOpenEdit, handleOpenReset }: Props) {
  return (
    <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
      <div>
        <h2 className="ml-6 mt-6 text-2xl font-extrabold text-gray-600">
          ຂໍ້ມູນຜູ້ໃຊ້ງານ
        </h2>

        <div className="relative flex items-center justify-between md:h-[10rem] md:flex-col md:items-start">
          <div className="absolute -top-3 right-6 hidden md:flex lg:-top-8">
            <AiOutlineUser className="h-24 w-24 text-gray-400 lg:h-32 lg:w-32" />
          </div>

          <div className="grid gap-y-2 px-6 py-4">
            <div className="mt-4 flex items-center gap-x-2">
              <UserIcon className="h-5 w-5 text-gray-500" />
              <p className="text-sm text-gray-600">{user.fullName}</p>
            </div>

            <div className="flex items-center gap-x-2">
              <BiPhone className="h-5 w-5 text-gray-500" />
              <p className="text-sm text-gray-600">{user.tel}</p>
            </div>
          </div>

          <button
            className="group mr-6 block flex h-10 w-28 items-center py-2 pl-4 text-sm text-blue-600 hover:bg-gray-100 md:w-full
              md:border-t md:bg-gray-50"
            onClick={handleOpenEdit}
          >
            <span>ແກ້ໄຂຂໍ້ມູນ</span>
            <span className="transform pl-2 transition-transform delay-75 duration-100 ease-in group-hover:translate-x-1">
              &rarr;
            </span>
          </button>
        </div>
      </div>

      <div>
        <div>
          <h2 className="ml-6 mt-6 text-2xl font-extrabold text-gray-600">
            ລະຫັດຜ່ານ
          </h2>

          <div className="flex items-center justify-between md:h-[10rem] md:flex-col md:items-start">
            <div className="grid gap-y-2 px-6 py-4">
              <div className="mt-4 flex items-center gap-x-2 md:flex-row-reverse md:gap-x-8 lg:items-start">
                <RiLockPasswordLine className="h-5 w-5 min-w-fit text-gray-500 md:-mt-12 md:h-24 md:w-24 md:text-gray-400 lg:-mt-16 lg:h-32 lg:w-32" />
                <p className="text-sm text-gray-600">
                  <span>ຈັດການລະຫັດຄວາມປອດໄພ</span>
                  <span className="hidden sm:inline">
                    ທີ່ນໍາໃຊ້ໃນການເຂົ້າສູ່ລະບົບໃຫ້ມີຄວາມປອດໄພ.
                  </span>
                </p>
              </div>
            </div>

            <button
              className="group mr-6 block flex h-10 w-28 min-w-[7rem] items-center py-2 pl-4 text-sm text-blue-600 hover:bg-gray-100
              md:w-full md:border-t md:bg-gray-50"
              onClick={handleOpenReset}
            >
              <span>ປ່ຽນລະຫັດ</span>
              <span className="transform pl-2 transition-transform delay-75 duration-100 ease-in group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
