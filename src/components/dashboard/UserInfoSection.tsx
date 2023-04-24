import { UserIcon } from "@heroicons/react/24/solid"
import { CgPhone, RxSlash } from "react-icons/all"

import { IAuthUser } from "@/types/auth.type"
import { HeroSection } from "./HeroSection"

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

      <div className="overflow-hidden rounded-lg">
        <HeroSection
          accountNumber={user.accountNumber}
          provinceName={user.nameLa}
        />
      </div>
    </div>
  )
}
