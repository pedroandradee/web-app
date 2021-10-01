import { Component } from 'react'
import authService from '../../services/auth'
import { AccessToken } from '../../store/application/models/auth/access.token'

interface IProps {
    readonly expected: string | string[]
}

export class VerifyUserType extends Component<IProps> {

    public static validate(expected: string | string[]): boolean {
        try {
            const accessToken: AccessToken = authService.decodeToken()
            const userType: string | undefined = accessToken.sub_type

            if (Array.isArray(expected)) {
                return expected.some((allowedType: string) => allowedType === userType)
            }

            return userType === expected

        } catch (e) {
            return false
        }
    }

    public render() {
        const { expected, children } = this.props
        if (VerifyUserType.validate(expected)) {
            return children
        }
        return false
    }
}
