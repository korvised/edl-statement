import { IPrivateRout } from "@/types/layout.type"
import { UserRole } from "@/types/auth.type"
import { Upload } from "@/pages/upload"

const { ADMIN, USER } = UserRole

export const privateRoutes: IPrivateRout[] = [
  { path: "/upload", Component: Upload, authorities: [USER] },
]
