import { FC, Fragment, useState } from "react"
import {
  EditIconButton,
  LockIconButton,
  ResetPassIconButton,
} from "@/common/ui/button"

import { IUser } from "@/types/user.type"
import { IProvince } from "@/types/province.type"
import { useUpdateStatusMutation } from "@/state/queries/userApiSlice"
import { AlertService } from "@/common/services"
import { Loading } from "@/common/ui/components"
import { ResetPassword } from "@/components/user/ResetPassword"
import { EditUser } from "@/components/user/EditUser"

const alertService = new AlertService()

interface Props {
  row: IUser
  provinces: IProvince[]
}

const ButtonGroup: FC<Props> = ({ row: user, provinces }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openReset, setOpenReset] = useState(false)

  const { id, accountLocked: isActive } = user

  const [updateStatus, { isLoading }] = useUpdateStatusMutation()

  const handleUpdateStatus = async () => {
    const { isConfirmed } = await alertService.confirmModal(
      `ທ່ານຕ້ອງການ${isActive ? "ລ໋ອກ" : "ປົດລ໋ອກ"}ບັນຊີຜູ້ໃຊ້ຫຼືບໍ່?`
    )

    if (isConfirmed) {
      const res = await updateStatus(id).unwrap()

      if (res && res.status === 200) {
        await alertService.success(res.reason)
      }
    }
  }

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

  return (
    <Fragment>
      {isLoading && <Loading />}
      <ResetPassword id={id} open={openReset} onClose={handleCloseReset} />
      <EditUser
        open={openEdit}
        user={user}
        provinces={provinces}
        onClose={handleCloseEdit}
      />
      <div className="flex items-center justify-center gap-x-2">
        <LockIconButton
          id={`lock-${id}`}
          status={isActive}
          onClick={handleUpdateStatus}
        />
        <ResetPassIconButton id={`reset-${id}`} onClick={handleOpenReset} />
        <EditIconButton id={`update-${id}`} onClick={handleOpenEdit} />
      </div>
    </Fragment>
  )
}

export default ButtonGroup
