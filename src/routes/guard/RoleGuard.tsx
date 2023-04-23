import  { FC } from "react"
import { Navigate } from "react-router-dom"

import { useAppSelector } from "@/state/hooks"
import { UserRole } from "@/types/auth.type"
import { APIStatus } from "@/types/api.type"
import { Loading } from "@/common/ui/components"

interface Props {
  authorities: UserRole[]
  children: JSX.Element
}

const RoleGuard: FC<Props> = ({ authorities, children }) => {
  const auth = useAppSelector(state => state.auth)

  if (auth.status === APIStatus.IDLE || auth.status === APIStatus.PENDING) {
    return <Loading />
  }

  if (
    auth.status === APIStatus.REJECTED ||
    (auth.status === APIStatus.FULFILLED && !auth.isAuthenticated)
  ) {
    return <Navigate to="/" replace />
  }

  if (auth.user && !auth.user.roles?.some(role => authorities.includes(role))) {
    return <Navigate to="/404" replace />
  }

  return children
}

export default RoleGuard
