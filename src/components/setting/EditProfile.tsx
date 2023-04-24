import { ChangeEvent, FormEvent, useMemo, useState } from "react"

import { IProfileForm } from "@/types/setting.type"
import { Modal } from "@/common/ui/modal"
import { TextFiled } from "@/common/ui/field"
import { Button } from "@/common/ui/button"
import { IAuthUser } from "@/types/auth.type"
import { AlertService } from "@/common/services"

const alertService = new AlertService()

interface Props {
  open: boolean
  user: IAuthUser
  onClose: () => void
}

export function EditProfile({ open, user, onClose }: Props) {
  const initialValues: IProfileForm = useMemo(
    () => ({
      fullName: user.fullName,
      tel: user.tel,
    }),
    [user]
  )

  const [form, setForm] = useState<IProfileForm>(initialValues)

  const { fullName, tel } = form

  const invalidForm = useMemo(
    () =>
      (fullName.trim() === user.fullName && tel.trim() === user.tel) ||
      fullName.trim().length < 1 ||
      tel.trim().length < 1,
    [fullName, tel, user]
  )

  const handleClose = () => {
    onClose()
    setForm(initialValues)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!invalidForm) {
      const { isConfirmed } = await alertService.confirmModal(
        "ທ່ານຕ້ອງການແກ້ໄຂຂໍ້ມູນຫຼືບໍ່?"
      )

      if (isConfirmed) {
        const body: IProfileForm = {
          fullName: fullName.trim(),
          tel: tel.trim(),
        }

        console.log(body)
      }
    } else {
      await alertService.warning("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນກ່ອນ!")
    }
  }

  return (
    <Modal open={open} title="ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້" className="max-w-sm">
      <form className="space-y-3 font-lao" onSubmit={handleSubmit}>
        <TextFiled
          id="fullName"
          name="fullName"
          label="ຊື່ ແລະ ນາມສະກຸນ"
          value={fullName}
          onChange={handleChange}
          required
        />

        <TextFiled
          id="tel"
          name="tel"
          label="ເບີຕິດຕໍ່"
          value={tel}
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
  )
}
