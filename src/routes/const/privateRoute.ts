import { IAuthRout } from "@/types/layout.type"
import Dashboard from "@/pages/dashboard"
import About from "@/pages/about"

export const privateRoute: IAuthRout[] = [
  { path: "/dashboard", Component: Dashboard },
  { path: "/about", Component: About },
]
