import { Fragment } from "react"
import { Navigate } from "react-router-dom"

import { useAppSelector } from "@/state/hooks"
import { AppTitle } from "@/common/ui/components"
import { SignInForm } from "@/components/auth"

export default function SignIn() {
  const { isAuthenticated } = useAppSelector(state => state.auth)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <Fragment>
      <AppTitle title="Counter Service | Sign in" />
      <SignInForm />
    </Fragment>
  )
}
