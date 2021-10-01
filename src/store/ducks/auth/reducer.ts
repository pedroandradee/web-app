import { createReducer } from 'reduxsauce'
import { AuthTypes, IAuthState } from './types'
import { failure, request, success } from '../root.types'
import { Reducer } from 'redux'

const INITIAL_STATE: IAuthState = {
    login: {
        error: false,
        loading: false,
        success: false
    },
    forgot: {
        error: false,
        loading: false,
        success: false
    },
    changePassword: {
        error: false,
        loading: false,
        success: false
    }
}

export const loginRequest = (state: IAuthState = INITIAL_STATE) => {
    return { ...state, login: request(state.login) }
}

export const loginSuccess = (state: IAuthState = INITIAL_STATE) => {
    return { ...state, login: success(state.login) }
}

export const loginFailure = (state: IAuthState = INITIAL_STATE) => {
    return { ...state, login: failure(state.login) }
}

export const loginReset = (state: IAuthState = INITIAL_STATE) => {
    return { ...state, login: INITIAL_STATE.login }
}

export const forgotRequest = (state: IAuthState = INITIAL_STATE) => {
    return { ...state, forgot: request(state.forgot) }
}

export const forgotSuccess = (state: IAuthState = INITIAL_STATE) => {
    return { ...state, forgot: success(state.forgot) }
}

export const forgotFailure = (state: IAuthState = INITIAL_STATE) => {
    return { ...state, forgot: failure(state.forgot) }
}

export const forgotReset = (state: IAuthState = INITIAL_STATE) => {
    return { ...state, forgot: INITIAL_STATE.forgot }
}

export const changePasswordRequest = (state: IAuthState = INITIAL_STATE) => {
    return { ...state, changePassword: request(state.changePassword) }
}

export const changePasswordSuccess = (state: IAuthState = INITIAL_STATE) => {
    return { ...state, changePassword: success(state.changePassword) }
}

export const changePasswordFailure = (state: IAuthState = INITIAL_STATE) => {
    return { ...state, changePassword: failure(state.changePassword) }
}

export const changePasswordReset = (state: IAuthState = INITIAL_STATE) => {
    return { ...state, changePassword: INITIAL_STATE.changePassword }
}

const reducer: Reducer<IAuthState> = createReducer<IAuthState>(INITIAL_STATE, {
    [AuthTypes.LOGIN_REQUEST]: loginRequest,
    [AuthTypes.LOGIN_SUCCESS]: loginSuccess,
    [AuthTypes.LOGIN_FAILURE]: loginFailure,
    [AuthTypes.LOGIN_RESET]: loginReset,

    [AuthTypes.FORGOT_REQUEST]: forgotRequest,
    [AuthTypes.FORGOT_SUCCESS]: forgotSuccess,
    [AuthTypes.FORGOT_FAILURE]: forgotFailure,
    [AuthTypes.FORGOT_RESET]: forgotReset,

    [AuthTypes.CHANGE_PASSWORD_REQUEST]: changePasswordRequest,
    [AuthTypes.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
    [AuthTypes.CHANGE_PASSWORD_FAILURE]: changePasswordFailure,
    [AuthTypes.CHANGE_PASSWORD_RESET]: changePasswordReset
})

export default reducer
