import * as Yup from 'yup'

export class ForgotValidator {
    private static _email: Yup.StringSchema<string> = Yup.string()
        .email('AUTH.FORGOT.VALIDATORS.EMAIL')
        .required('AUTH.FORGOT.VALIDATORS.REQUIRED')

    static get validationScheme(): Yup.ObjectSchema<object> {
        return Yup
            .object()
            .shape({
                email: this.email,
            })
    }

    static get email(): Yup.StringSchema<string> {
        return this._email
    }
}