import { UserIcon } from "@heroicons/react/24/outline"

import { IAuthUser } from "@/types/auth.type"

interface Props {
  user: IAuthUser
}

export default function UserInfoSection({ user }: Props) {
  return (
    <div className="section-md">
      <div className="flex space-y-3 rounded-lg border bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-4 text-white">
        <div>
          <UserIcon className="h-16" />
          <h1 className="text-2xl font-extrabold text-gray-600">
            ຂໍ້ມູນຜູ້ໃຊ້
          </h1>
        </div>

        <div>
          <div className="flex items-center gap-x-2">
            <h2>{user.fullName}</h2>
          </div>

          <div>
            <h2>{user.accountNumber}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
