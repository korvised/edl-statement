export interface IProfileForm {
  fullName: string
  tel: string
}

export interface IChangePasswordBody {
  currentPassword: string
  newPassword: string
}

export interface IChangePasswordForm extends IChangePasswordBody {
  confirmNewPassword: string
}
