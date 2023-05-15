import { IPrivateRout } from "@/types/layout.type"
import { UserRole } from "@/types/auth.type"
import { Upload, UploadHistories, WSCustomers } from "@/pages/upload"
import { DebitHistories, DebitTransactions } from "@/pages/debit"
import { Statement } from "@/pages/statement"
import { Users } from "@/pages/user"

const { ADMIN, USER } = UserRole

export const privateRoutes: IPrivateRout[] = [
  { path: "/upload", Component: Upload, authorities: [USER] },
  {
    path: "/upload-histories",
    Component: UploadHistories,
    authorities: [USER],
  },
  { path: "/debit", Component: DebitTransactions, authorities: [USER] },
  { path: "/debit-histories", Component: DebitHistories, authorities: [USER] },
  { path: "/customers", Component: WSCustomers, authorities: [USER] },
  { path: "/statement", Component: Statement, authorities: [USER] },
  { path: "/users", Component: Users, authorities: [ADMIN] },
]
