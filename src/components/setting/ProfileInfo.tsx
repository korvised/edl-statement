import { Fragment, useState } from "react"
import { useAppSelector } from "@/state/hooks"

import { HeroSection } from "@/components/dashboard"
import { Navigation } from "./Navigation"
import { ChangePassword } from "./ChangePassword"
import { EditProfile } from "./EditProfile"

export default function ProfileInfo() {
  const [openEdit, setOpenEdit] = useState(false)
  const [openReset, setOpenReset] = useState(false)

  const { user } = useAppSelector(state => state.auth)

  const handleOpenEdit = () => {
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const handleOpenReset = () => {
    setOpenReset(true)
  }

  const handleCloseReset = () => {
    setOpenReset(false)
  }

  return user ? (
    <Fragment>
      <EditProfile open={openEdit} user={user} onClose={handleCloseEdit} />
      <ChangePassword open={openReset} onClose={handleCloseReset} />

      <div className="reletive overflow-hidden rounded-lg border">
        <HeroSection
          accountNumber={user.accountNumber}
          provinceName={user.nameLa}
        />

        <Navigation
          user={user}
          handleOpenEdit={handleOpenEdit}
          handleOpenReset={handleOpenReset}
        />
      </div>
    </Fragment>
  ) : null
}
