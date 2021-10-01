import authService from '../../../services/auth'
import { LogicalStrategy } from '../../../routes'

export class ScopesUtil {

    public static verifyScopes(expectedScopes?: string[], logicalStrategy = LogicalStrategy.AND): boolean {
        if (expectedScopes) {
            try {
                const { scope } = authService.decodeToken()
                if (scope) {
                    const scopes = scope.split(' ')
                    if (expectedScopes.length === 0) {
                        return true
                    }
                    return logicalStrategy === LogicalStrategy.AND ?
                        expectedScopes.every(itemScope => scopes.includes(itemScope))
                        : expectedScopes.some(itemScope => scopes.includes(itemScope))
                }
                throw new Error()
            } catch (e) {
                return false
            }
        }

        return true

    }
}
