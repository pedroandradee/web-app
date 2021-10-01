import { Component } from 'react'
import authService, { LogicalStrategy } from '../../services/auth'
import { AccessToken } from '../../store/application/models/auth/access.token'

interface IProps {
    readonly scopes: string[]
    readonly logicalStrategy?: LogicalStrategy
}

export class VerifyScopes extends Component<IProps> {

    public static validate(expectedScopes?: string[], logicalStrategy = LogicalStrategy.AND): boolean {
        if (!logicalStrategy) {
            logicalStrategy = LogicalStrategy.AND
        }
        if (expectedScopes) {
            try {
                const accessToken: AccessToken = authService.decodeToken()
                const scope: string = accessToken.scope || ''
                const scopes = scope?.split(' ')
                if (expectedScopes.length === 0) {
                    return true
                }

                return logicalStrategy === LogicalStrategy.AND ? expectedScopes.every(itemScope => scopes.includes(itemScope))
                    : expectedScopes.some(itemScope => scopes.includes(itemScope))
            } catch (e) {
                return false
            }
        }

        return true

    }

    public render() {
        const { scopes, children, logicalStrategy } = this.props
        if (VerifyScopes.validate(scopes, logicalStrategy)) {
            return children
        }
        return false
    }
}
