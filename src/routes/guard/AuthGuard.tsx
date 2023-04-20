import { FC } from "react"
import { Navigate } from "react-router-dom"

import { useAppSelector } from "@/state/hooks"
import { Loading } from "@/common/ui/components"
import { APIStatus } from "@/types/api.type"

interface Props {
  children: JSX.Element
}

const AuthGuard: FC<Props> = ({ children }) => {
  const auth = useAppSelector(state => state.auth)

  if (auth.status === APIStatus.IDLE || auth.status === APIStatus.PENDING) {
    return <Loading />
  }

  if (auth.status === APIStatus.REJECTED || !auth.isAuthenticated) {
    return <Navigate to="/sign-in" replace />
  }

  return children
}

export default AuthGuard
