import { useEffect } from "react"
import { HelmetProvider } from "react-helmet-async"

import { Routes } from "@/routes"
import { useAppDispatch } from "@/state/hooks"
import { getMe } from "@/state/slices"

export default function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [])

  return (
    <HelmetProvider>
      <Routes />
    </HelmetProvider>
  )
}
