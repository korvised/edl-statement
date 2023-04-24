import { ChangeEvent, FormEvent, useMemo, useState } from "react"

import { IChangePasswordBody, IChangePasswordForm } from "@/types/setting.type"
import { useAppDispatch } from "@/state/hooks"
import { changePassword } from "@/state/slices"
import { Modal } from "@/common/ui/modal"
import { TextFiled } from "@/common/ui/field"
import { Button } from "@/common/ui/button"
import { AlertService } from "@/common/services"

const alertService = new AlertService()

interface Props {
  open: boolean
  onClose: () => void
}

const initialValues: IChangePasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
}

export function ChangePassword({ open, onClose }: Props) {
  const dispatch = useAppDispatch()

  const [form, setForm] = useState<IChangePasswordForm>(initialValues)

  const { currentPassword, newPassword, confirmNewPassword } = form

  const invalidForm = useMemo(
    () =>
      currentPassword.trim().length < 4 ||
      newPassword.trim().length < 4 ||
      confirmNewPassword.trim().length < 4,
    [currentPassword, newPassword, confirmNewPassword]
  )

  const isUnmatched = useMemo(
    () =>
      newPassword.length >= 4 &&
      confirmNewPassword.length >= 4 &&
      newPassword !== confirmNewPassword,
    [newPassword, confirmNewPassword]
  )

  const handleClose = () => {
    onClose()
    setForm(initialValues)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (invalidForm) {
      await alertService.warning("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນກ່ອນ!")
    } else {
      if (isUnmatched) return

      const { isConfirmed } = await alertService.confirmModal(
        "ທ່ານຕ້ອງການປ່ຽນລະຫັດຜ່ານຫຼືບໍ່?"
      )

      if (isConfirmed) {
        const body: IChangePasswordBody = {
          currentPassword,
          newPassword,
        }

        const res = await dispatch(changePassword(body)).unwrap()

        if (res && res.status === 200) handleClose()
      }
    }
  }

  return (
    <Modal open={open} title="ປ່ຽນລະຫັດຜ່ານ" className="max-w-sm">
      <form className="space-y-3 font-lao" onSubmit={handleSubmit}>
        <TextFiled
          id="currentPassword"
          type="password"
          name="currentPassword"
          label="ລະຫັດຜ່ານປະຈຸບັນ"
          placeholder="4 ໂຕຂື້ນໄປ"
          value={currentPassword}
          onChange={handleChange}
          required
        />

        <TextFiled
          id="newPassword"
          type="password"
          name="newPassword"
          label="ລະຫັດຜ່ານປະໃໝ່"
          placeholder="4 ໂຕຂື້ນໄປ"
          value={newPassword}
          onChange={handleChange}
          required
        />

        <TextFiled
          id="confirmNewPassword"
          type="password"
          name="confirmNewPassword"
          label="ຢືນຢັນລະຫັດຜ່ານປະໃໝ່"
          placeholder="4 ໂຕຂື້ນໄປ"
          value={confirmNewPassword}
          isInvalid={isUnmatched}
          errorMsg="ລະຫັດຜ່ານບໍ່ຕົງກັນ"
          onChange={handleChange}
          required
        />

        <div className="flex justify-end gap-x-3 pt-4">
          <Button
            type="submit"
            variant="solid"
            color="primary"
            value="ບັນທຶກ"
            disabled={invalidForm || isUnmatched}
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
  )
}
