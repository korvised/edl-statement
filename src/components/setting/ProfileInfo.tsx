import { useState } from "react"
import { useAppSelector } from "@/state/hooks"
import { HeroSection } from "@/components/dashboard"
import { Navigation } from "./Navigation"

export default function ProfileInfo() {
  const [openEdit, setOpenEdit] = useState(false)
  const [openReset, setOpenReset] = useState(false)

  const { user } = useAppSelector(state => state.auth)

  const handleOpenEdit = () => {
    setOpenEdit(true)
  }

  const handleOpenReset = () => {
    setOpenReset(true)
  }

  return user ? (
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
  ) : null
}
