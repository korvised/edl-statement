import { FolderIcon } from "@heroicons/react/24/outline"
import { UserIcon } from "@heroicons/react/24/solid"
import { AiFillCreditCard, CgPhone, RxSlash } from "react-icons/all"

import { IAuthUser } from "@/types/auth.type"

interface Props {
  user: IAuthUser
}

export default function UserInfoSection({ user }: Props) {
  return (
    <div className="section-md space-y-1">
      <div className="flex items-center text-gray-700">
        <div className="flex items-center gap-x-1 text-sm">
          <UserIcon className="h-4 w-4" />
          <h3>{user.fullName}</h3>
        </div>

        <RxSlash className="h-3 w-3 text-teal-600" />

        <div className="flex items-center gap-x-1 text-sm">
          <CgPhone className="h-4 w-4" />
          <h3>{user.tel}</h3>
        </div>
      </div>
      <div
        className="flex flex-col justify-between space-y-3 rounded-lg border bg-gradient-to-r from-emerald-500
        to-teal-600 px-4 py-4 text-white sm:flex-row"
      >
        <div className="flex items-center gap-x-4">
          <FolderIcon className="h-8 w-8 text-gray-200 md:h-10 md:w-10" />
          <h1 className="text-2xl font-extrabold">{user.nameLa}</h1>
        </div>

        <div className="grid gap-y-0.5 text-sm">
          <div className="flex gap-x-2 sm:-mt-2 sm:justify-end">
            <AiFillCreditCard className="h-5 w-5" />
            <h4>ເລກບັນຊີ</h4>
          </div>

          <h2>{user.accountNumber}</h2>
        </div>
      </div>
    </div>
  )
}
