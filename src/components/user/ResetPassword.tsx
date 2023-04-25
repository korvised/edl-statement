import { ChangeEvent, FormEvent, Fragment, useMemo, useState } from "react"

import { IResetUserPasswordParams } from "@/types/user.type"
import { useResetPasswordMutation } from "@/state/queries/userApiSlice"
import { Modal } from "@/common/ui/modal"
import { TextFiled } from "@/common/ui/field"
import { Button } from "@/common/ui/button"
import { Loading } from "@/common/ui/components"
import { AlertService } from "@/common/services"

const alertService = new AlertService()

interface Props {
  id: number
  open: boolean
  onClose: () => void
}

export function ResetPassword({ id, open, onClose }: Props) {
  const [newPassword, setNewPassword] = useState<string>("")

  const invalidForm = useMemo(
    () => newPassword.trim().length < 1,
    [newPassword]
  )

  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const handleClose = () => {
    onClose()
    setNewPassword("")
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value.trim())
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (invalidForm) {
      await alertService.warning("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນກ່ອນ!")
    } else {
      const { isConfirmed } = await alertService.confirmModal(
        "ທ່ານຕ້ອງການລົງທະບຽນຜູ້ໃຊ້ຫຼືບໍ່?"
      )

      if (isConfirmed) {
        const body: IResetUserPasswordParams = {
          id,
          newPassword,
        }

        const res = await resetPassword(body).unwrap()

        if (res && res.status === 200) {
          handleClose()
          await alertService.success(res.reason)
        }
      }
    }
  }

  return (
    <Fragment>
      {isLoading && <Loading />}
      <Modal title="ລົງທະບຽນຜູ້ໃຊ້" open={open} className="max-w-sm">
        <form className="space-y-3 font-lao" onSubmit={handleSubmit}>
          <TextFiled
            id="newPassword"
            name="newPassword"
            label="ລະຫັດຜ່ານ"
            minLength={4}
            value={newPassword}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-x-3 pt-4">
            <Button
              type="submit"
              variant="solid"
              color="primary"
              value="ບັນທຶກ"
              disabled={invalidForm}
              className="w-20"
            />

            <Button
              variant="solid"
              color="danger"
              value="ຍົກເລີກ"
              className="w-20"
              onClick={handleClose}
            />
          </div>
        </form>
      </Modal>
    </Fragment>
  )
}
