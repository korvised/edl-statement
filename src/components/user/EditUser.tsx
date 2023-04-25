import { ChangeEvent, FormEvent, Fragment, useMemo, useState } from "react"

import { IEditUserBody, IEditUserParams, IUser } from "@/types/user.type"
import { IProvince } from "@/types/province.type"
import { useUpdateUserMutation } from "@/state/queries/userApiSlice"
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
  user: IUser
  onClose: () => void
}

export function EditUser({ open, provinces, user, onClose }: Props) {
  const initialValues: IEditUserBody = useMemo(
    () => ({
      fullName: user.fullName,
      tel: user.tel,
      provinceId: user.provinceId,
    }),
    [user]
  )

  const [form, setForm] = useState<IEditUserBody>(initialValues)

  const { fullName, tel, provinceId } = form

  const invalidForm = useMemo(
    () =>
      fullName.trim().length < 3 ||
      tel.trim().length < 5 ||
      provinceId.trim().length < 1,
    [form]
  )

  const [updateUser, { isLoading }] = useUpdateUserMutation()

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
        const body: IEditUserBody = {
          fullName: fullName.trim(),
          tel: tel.trim(),
          provinceId: provinceId.trim(),
        }

        const params: IEditUserParams = {
          id: user.id,
          body: body,
        }

        const res = await updateUser(params).unwrap()

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
            minLength={3}
            maxLength={50}
            onChange={handleChange}
            required
          />

          <TextFiled
            id="tel"
            name="tel"
            label="ເບີຕິດຕໍ່"
            value={tel}
            minLength={5}
            maxLength={15}
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
