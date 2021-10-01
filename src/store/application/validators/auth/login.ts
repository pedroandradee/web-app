import * as Yup from 'yup'

export class LoginValidator {
    private static _login: Yup.StringSchema<string> = Yup.string()
        .email('AUTH.LOGIN.VALIDATORS.INVALID_EMAIL')
        .required('AUTH.LOGIN.VALIDATORS.USERNAME')

    private static _password: Yup.StringSchema<string> = Yup.string()
        .required('AUTH.LOGIN.VALIDATORS.PASSWORD')

    static get validationScheme(): Yup.ObjectSchema<object> {
        return Yup
            .object()
            .shape({
                login: this.login,
                password: this.password
            })
    }

    static get login(): Yup.StringSchema<string> {
        return this._login
    }

    static get password(): Yup.StringSchema<string> {
        return this._password
    }
}
