import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AuthGuard, RoleGuard } from "./guard"
import { SignIn } from "@/pages/auth"
import { NotFound, Unauthorized } from "@/pages/404"
import { authRoutes } from "./const/authRoutes"
import { privateRoutes } from "./const/privateRoutes"

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />

        {authRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <AuthGuard>
                <Component />
              </AuthGuard>
            }
          />
        ))}

        {privateRoutes.map(({ authorities, path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <RoleGuard authorities={authorities}>
                <Component />
              </RoleGuard>
            }
          />
        ))}

        <Route path="/errors" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
