import { action } from 'typesafe-actions'
import { AuthTypes, IAuth, IChangePassword } from './types'

/* Actions for Login */
export const loginRequest = (data: IAuth) => action(AuthTypes.LOGIN_REQUEST, { data })

export const loginSuccess = () => action(AuthTypes.LOGIN_SUCCESS)

export const loginFailure = () => action(AuthTypes.LOGIN_FAILURE)

export const loginReset = () => action(AuthTypes.LOGIN_RESET)

/* Actions for Forgot */
export const forgotRequest = (email: string) => action(AuthTypes.FORGOT_REQUEST, { data: { email } })

export const forgotSuccess = () => action(AuthTypes.FORGOT_SUCCESS)

export const forgotFailure = () => action(AuthTypes.FORGOT_FAILURE)

export const forgotReset = () => action(AuthTypes.FORGOT_RESET)

/* Actions for Change Password */
export const changePasswordRequest = (data: IChangePassword) => action(AuthTypes.CHANGE_PASSWORD_REQUEST, { data })

export const changePasswordSuccess = () => action(AuthTypes.CHANGE_PASSWORD_SUCCESS)

export const changePasswordFailure = () => action(AuthTypes.CHANGE_PASSWORD_FAILURE)

export const changePasswordReset = () => action(AuthTypes.CHANGE_PASSWORD_RESET)