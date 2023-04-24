import { IAuthRout } from "@/types/layout.type"
import { Dashboard } from "@/pages/dashboard"
import { About } from "@/pages/about"
import { Profile } from "@/pages/setting"

export const authRoutes: IAuthRout[] = [
  { path: "/dashboard", Component: Dashboard },
  { path: "/about", Component: About },
  { path: "/settings", Component: Profile },
]
