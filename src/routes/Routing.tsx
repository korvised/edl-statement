import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AuthGuard } from "./guard"
import { SignIn } from "@/pages/auth"
import { NotFound, Unauthorized } from "@/pages/404"
import { privateRoute } from "./const/privateRoute"

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />

        {privateRoute.map(({ path, Component }) => (
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

        <Route path="/errors" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
