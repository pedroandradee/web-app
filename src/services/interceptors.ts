import { AxiosError, AxiosRequestConfig } from 'axios'

import store, { history } from '../store'
import localStorageService from './local.storage'
import authService from './auth'
import { SnackBarMessageType } from '../components/snackbar'
import { open } from '../store/ducks/snack.bar/actions'
import { RESET_TOKEN_ERROR } from '../store/application/models/auth/access.token'

export default class Interceptors {


    /**
     * Request Interceptors
     * Used to inject in the request header the access token saved in localStorage
     * @param request, Request in which it will be included in the access token
     */
    public static injectAccessToken(request: AxiosRequestConfig): AxiosRequestConfig {
        const { url, data } = request
        if (url?.match(/\/auth\/password$/ig) && !data.old_password) {
            return request
        }
        const token = localStorageService.getItem('access_token')
        if (token) {
            request.headers.Authorization = token ? `Bearer ${token}` : ''
        }
        return request
    }

    /**
     * Response Interceptors
     * Used to centralize the triggering of error messages returned by banckend services
     * @param error, Error object resulting from the request
     */
    public static handlerError(error: AxiosError): Promise<Error> {
        let title = ''
        let message = ''
        const data = error?.response?.data
        switch (error?.response?.status) {
            case 400:
                title = 'SNACKBAR.HANDLER_ERROR.TITLE.BAD_REQUEST'
                message = 'SNACKBAR.HANDLER_ERROR.MESSAGE.BAD_REQUEST'
                break
            case 401:
                if (data?.message === RESET_TOKEN_ERROR.message || data?.description === RESET_TOKEN_ERROR.description) {
                    title = 'SNACKBAR.HANDLER_ERROR.TITLE.INVALID_TOKEN'
                    message = 'SNACKBAR.HANDLER_ERROR.MESSAGE.INVALID_TOKEN'
                    break
                }
                title = 'SNACKBAR.HANDLER_ERROR.TITLE.BAD_REQUEST'
                message = 'SNACKBAR.HANDLER_ERROR.MESSAGE.BAD_REQUEST'
                if (history?.location?.pathname !== '/login') {
                    title = 'SNACKBAR.HANDLER_ERROR.TITLE.UNAUTHORIZED'
                    message = 'SNACKBAR.HANDLER_ERROR.MESSAGE.UNAUTHORIZED'
                    history.push('/')
                }
                authService.logout()
                break
            case 403:
                title = 'SNACKBAR.HANDLER_ERROR.TITLE.FORBIDDEN'
                message = 'SNACKBAR.HANDLER_ERROR.MESSAGE.FORBIDDEN'
                history.push('/access_denied')
                break
            case 404:
                /**
                 * For the GET /users/:userId/avatar endpoint as 404 responses, they should not alert the user.
                 */
                if (!`${error.request.responseURL}`.match(/\/users\/[a-fA-F0-9]{24}\/avatar$/)) {
                    title = 'SNACKBAR.HANDLER_ERROR.TITLE.NOT_FOUND'
                    message = 'SNACKBAR.HANDLER_ERROR.MESSAGE.NOT_FOUND'
                    history.push('/not_found')
                }
                break
            case 409:
                title = 'SNACKBAR.HANDLER_ERROR.TITLE.CONFLICT'
                message = 'SNACKBAR.HANDLER_ERROR.MESSAGE.CONFLICT'
                break
            case 429:
                title = 'SNACKBAR.HANDLER_ERROR.TITLE.TOO_MANY_REQUEST'
                message = 'SNACKBAR.HANDLER_ERROR.MESSAGE.TOO_MANY_REQUEST'
                break
            case 500:
                title = 'SNACKBAR.HANDLER_ERROR.TITLE.INTERNAL_SERVER_ERROR'
                message = 'SNACKBAR.HANDLER_ERROR.MESSAGE.INTERNAL_SERVER_ERROR'
                break
            case 502:
                title = 'SNACKBAR.HANDLER_ERROR.TITLE.BAD_GATEWAY'
                message = 'SNACKBAR.HANDLER_ERROR.MESSAGE.BAD_GATEWAY'
                break
            default:
                title = 'SNACKBAR.HANDLER_ERROR.TITLE.OPERATION_FAILED'
                message = 'SNACKBAR.HANDLER_ERROR.MESSAGE.OPERATION_FAILED'
                if (error?.message === 'Network Error') {
                    title = 'SNACKBAR.HANDLER_ERROR.TITLE.NETWORK_ERROR'
                    message = 'SNACKBAR.HANDLER_ERROR.MESSAGE.NETWORK_ERROR'
                }
                break
        }

        if (title || message) {
            store.dispatch(open(SnackBarMessageType.ERROR, title, message))
        }

        return error?.response?.data ? Promise.reject(error.response.data) : Promise.reject(error)
    }

}
