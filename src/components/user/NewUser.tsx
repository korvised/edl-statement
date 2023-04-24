import { ChangeEvent, FormEvent, Fragment, useMemo, useState } from "react"

import { IUserBody } from "@/types/user.type"
import { IProvince } from "@/types/province.type"
import { useRegisterUserMutation } from "@/state/queries/userApiSlice"
import { Modal } from "@/common/ui/modal"
import { TextFiled } from "@/common/ui/field"
import { Button } from "@/common/ui/button"
import { Loading } from "@/common/ui/components"
import { AlertService } from "@/common/services"
import { ProvinceOption } from "./ProvinceOption"

const alertService = new AlertService()

interface Props {
  open: boolean
  provinces: IProvince[]
  onClose: () => void
}

const initialValues: IUserBody = {
  fullName: "",
  tel: "",
  username: "",
  password: "",
  provinceId: "",
}

export default function NewUser({ open, provinces, onClose }: Props) {
  const [form, setForm] = useState<IUserBody>(initialValues)

  const { fullName, tel, username, password, provinceId } = form

  const invalidForm = useMemo(
    () =>
      fullName.trim().length < 1 ||
      tel.trim().length < 1 ||
      password.trim().length < 4 ||
      provinceId.trim().length < 1,
    [form]
  )

  const [registerUser, { isLoading }] = useRegisterUserMutation()

  const handleClose = () => {
    onClose()
    setForm(initialValues)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleChangProvince = (province: IProvince) => {
    setForm({ ...form, provinceId: province.id })
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
        const body: IUserBody = {
          fullName: fullName.trim(),
          tel: tel.trim(),
          username: username.trim(),
          password: password.trim(),
          provinceId: provinceId.trim(),
        }

        const res = await registerUser(body).unwrap()

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
          <div className="space-y-1">
            <label className="block font-lao text-sm font-medium text-gray-700">
              ແຂວງ
            </label>
            <ProvinceOption
              provinces={provinces}
              province={provinceId}
              setProvince={handleChangProvince}
            />
          </div>

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

          <TextFiled
            id="username"
            name="username"
            label="Username"
            value={username}
            onChange={handleChange}
            required
          />

          <TextFiled
            id="password"
            name="password"
            label="ລະຫັດຜ່ານ"
            minLength={4}
            value={password}
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
