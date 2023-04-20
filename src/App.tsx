import { HelmetProvider } from "react-helmet-async"

import { Routes } from "@/routes"

export default function App() {
  return (
    <HelmetProvider>
      <Routes />
    </HelmetProvider>
  )
}
