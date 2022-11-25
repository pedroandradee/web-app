import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import authService from '../../../services/auth'
import { AxiosResponse } from 'axios'
import {
    changePasswordFailure,
    changePasswordSuccess,
    forgotFailure,
    forgotSuccess,
    loginFailure,
    loginSuccess
} from './actions'
import { IActionType } from '../root.types'
import { AuthTypes, IAuth, IChangePassword, IForgot } from './types'
import { open } from '../snack.bar/actions'
import { SnackBarMessageType } from '../../../components/layout/snackbar'

export function* authenticate(action: IActionType<AxiosResponse<IAuth>>) {
    try {
        const { data } = action.payload
        yield apply(authService, authService.login, [data])
        yield put(loginSuccess())
        yield put(push(`/app/home`))
    } catch (err) {
        yield put(loginFailure())
    }
}

export function* forgot(action: IActionType<AxiosResponse<IForgot>>) {
    try {
        const { data } = action.payload
        yield apply(authService, authService.forgot, [data])
        yield put(forgotSuccess())
    } catch (err) {
        yield put(forgotFailure())
    }
}

export function* changePassword(action: IActionType<AxiosResponse<IChangePassword>>) {
    try {
        const { data } = action.payload
        yield apply(authService, authService.changePassword, [data])
        yield put(changePasswordSuccess())
        yield put(open(SnackBarMessageType.SUCCESS, 'AUTH.CHANGE_PASSWORD.SNACKBAR.TITLE', 'AUTH.CHANGE_PASSWORD.SNACKBAR.MESSAGE'))
    } catch (err) {
        yield put(changePasswordFailure())
    }
}

export default function* authSaga() {
    return yield all([
        takeLatest(AuthTypes.LOGIN_REQUEST, authenticate),
        takeLatest(AuthTypes.FORGOT_REQUEST, forgot),
        takeLatest(AuthTypes.CHANGE_PASSWORD_REQUEST, changePassword)
    ])
}
