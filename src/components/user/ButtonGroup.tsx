import { FC, Fragment, useState } from "react"
import { EditIconButton, LockIconButton } from "@/common/ui/button"

import { IUser } from "@/types/user.type"
import { IProvince } from "@/types/province.type"

interface Props {
  row: IUser
  provinces: IProvince[]
}

const ButtonGroup: FC<Props> = ({ row }) => {
  const [open, setOpen] = useState(false)

  const { id, accountLocked: isActive } = row

  /** const disabled = useMemo(
   () => userRoleEntities.some(r => r.roleName === UserRole.TELLER),
   [userRoleEntities]
   ) */

  return (
    <Fragment>
      {/*<UpdateUser roles={roles} user={row} open={open} setOpen={setOpen} />*/}
      <div className="flex items-center justify-center gap-x-2">
        <LockIconButton id={`reset-${id}`} status={isActive} />
        <EditIconButton id={`update-${id}`} onClick={() => setOpen(true)} />
      </div>
    </Fragment>
  )
}

export default ButtonGroup
