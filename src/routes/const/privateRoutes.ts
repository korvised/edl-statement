import { IPrivateRout } from "@/types/layout.type"
import { UserRole } from "@/types/auth.type"
import { Upload, UploadCustomers, UploadHistory } from "@/pages/upload"
import { Statement } from "@/pages/statement"

const { ADMIN, USER } = UserRole

export const privateRoutes: IPrivateRout[] = [
  { path: "/upload", Component: Upload, authorities: [USER] },
  { path: "/upload-history", Component: UploadHistory, authorities: [USER] },
  { path: "/customers", Component: UploadCustomers, authorities: [USER] },
  { path: "/statement", Component: Statement, authorities: [USER] },
]
