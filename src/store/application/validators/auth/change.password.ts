import * as Yup from 'yup'
import { ForgotValidator } from './forgot'

export class ChangePasswordValidator extends ForgotValidator {

    private static _new_password: Yup.StringSchema<string> = Yup.string()
        .min(4, 'AUTH.CHANGE_PASSWORD.VALIDATORS.NEW_PASSWORD.MIN')
        .max(30, 'AUTH.CHANGE_PASSWORD.VALIDATORS.NEW_PASSWORD.MAX')
        .test(
            'passwordIsValid',
            'AUTH.CHANGE_PASSWORD.VALIDATORS.NEW_PASSWORD.INVALID_FORMAT',
            (value) => {
                if (value) {
                    const capitalLetter = new RegExp(/[A-Z]/g).test(value)
                    const num = new RegExp(/[0-9]/g).test(value)
                    const sym = new RegExp(/[@#$%*!?._\-+\s]/g).test(value)
                    return sym && capitalLetter && num
                }
                return true
            })
        .required('AUTH.CHANGE_PASSWORD.VALIDATORS.NEW_PASSWORD.REQUIRED')

    private static _confirmPassword: Yup.StringSchema<string> = Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'AUTH.CHANGE_PASSWORD.VALIDATORS.CONFIRM_PASSWORD.INCOMPATIBLE')
        .required('AUTH.CHANGE_PASSWORD.VALIDATORS.CONFIRM_PASSWORD.PASSWORD_CONFIRM')

    static get validationScheme(): Yup.ObjectSchema<object> {
        return ForgotValidator
            .validationScheme
            .concat(
                Yup.object().shape({
                    new_password: this.new_password,
                    confirmPassword: this.confirmPassword
                })
            )
    }

    static get new_password(): Yup.StringSchema<string> {
        return this._new_password
    }

    static get confirmPassword(): Yup.StringSchema<string> {
        return this._confirmPassword
    }
}
