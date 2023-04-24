export interface IProfileForm {
  fullName: string
  tel: string
}

export interface IResetPasswordBody {
  currentPassword: string
  newPassword: string
}

export interface IResetPasswordForm extends IResetPasswordBody {
  confirmNewPassword: string
}
