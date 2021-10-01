import { createTypes } from 'reduxsauce'
import { IComponentState } from '../root.types'

export const AuthTypes = createTypes(`
    LOGIN_REQUEST
    LOGIN_SUCCESS
    LOGIN_FAILURE
    LOGIN_RESET
    
    FORGOT_REQUEST
    FORGOT_SUCCESS
    FORGOT_FAILURE
    FORGOT_RESET
    
    CHANGE_PASSWORD_REQUEST
    CHANGE_PASSWORD_SUCCESS
    CHANGE_PASSWORD_FAILURE
    CHANGE_PASSWORD_RESET  
`,
    {
        prefix: '@auth/'
    }
)

/**
 * Actions
 */
export interface IAuth {
    readonly login: string
    readonly password: string
}

export interface IForgot {
    readonly email: string
}

export interface IChangePassword {
    readonly email: string
    readonly new_password: string
    readonly old_password?: string
}

/**
 * State type
 */
export interface IAuthState {
    readonly login: IComponentState
    readonly forgot: IComponentState
    readonly changePassword: IComponentState
}
