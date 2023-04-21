import { FolderIcon } from "@heroicons/react/24/outline"
import { AiFillCreditCard } from "react-icons/all"

import { IAuthUser } from "@/types/auth.type"

interface Props {
  user: IAuthUser
}

export default function UserInfoSection({ user }: Props) {
  return (
    <div className="section-md">
      <div
        className="flex flex-col justify-between space-y-3 rounded-lg border bg-gradient-to-r from-emerald-500
        to-teal-600 px-4 py-4 text-white sm:flex-row"
      >
        <div className="flex items-center gap-x-4">
          <FolderIcon className="h-8 w-8 text-gray-200 md:h-10 md:w-10" />
          <h1 className="text-2xl font-extrabold">{user.fullName}</h1>
        </div>

        <div className="grid gap-y-0.5 text-sm">
          <div className="flex gap-x-2 sm:-mt-2">
            <AiFillCreditCard className="h-5 w-5" />
            <h4>ເລກບັນຊີ</h4>
          </div>
          <h2>{user.accountNumber}</h2>
        </div>
      </div>
    </div>
  )
}
