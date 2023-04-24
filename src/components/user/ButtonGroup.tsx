import { FC, Fragment, useState } from "react"
import { EditIconButton, LockIconButton } from "@/common/ui/button"

import { IUser } from "@/types/user.type"
import { IProvince } from "@/types/province.type"
import { useUpdateStatusMutation } from "@/state/queries/userApiSlice"
import { AlertService } from "@/common/services"
import { Loading } from "@/common/ui/components"

const alertService = new AlertService()

interface Props {
  row: IUser
  provinces: IProvince[]
}

const ButtonGroup: FC<Props> = ({ row }) => {
  const [open, setOpen] = useState(false)

  const { id, accountLocked: isActive } = row

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

  return (
    <Fragment>
      {isLoading && <Loading />}
      {/*<UpdateUser roles={roles} user={row} open={open} setOpen={setOpen} />*/}
      <div className="flex items-center justify-center gap-x-2">
        <LockIconButton
          id={`reset-${id}`}
          status={isActive}
          onClick={handleUpdateStatus}
        />
        <EditIconButton id={`update-${id}`} onClick={() => setOpen(true)} />
      </div>
    </Fragment>
  )
}

export default ButtonGroup
