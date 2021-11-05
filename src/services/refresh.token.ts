import { AxiosError, AxiosResponse } from 'axios'
import localStorageService from './local.storage'
import axiosInstance from './axios'

export interface RefreshData {
    readonly access_token: string
    readonly refresh_token: string
}

/**
 * Code inspired by the publication of Emeke Ajeh
 * See more: https://gist.github.com/Godofbrowser/bf118322301af3fc334437c683887c5f
 */
class RefreshTokenInterceptor {
    /**
     * Check if the error should be intercepted by the RefreshTokenInterceptor
     * @param error
     * {@link AxiosError}
     */
    private static shouldIntercept(error: AxiosError | any): boolean {
        const { response: { data, status }, config: { url } } = error
        const statusCode = status === 401
        const message = data?.message === 'UNAUTHORIZED'
        const description = data?.description === 'Authentication failed because access token is expired.'
        const auth = !/auth$/.test(url || '')
        const refresh = !/refresh$/.test(url || '')
        const changePassword = !/password$/.test(url || '')

        return statusCode && message && description && auth && refresh && changePassword
    }

    private _isRefreshing: boolean
    private _failedQueue: any[]
    private _apiVersion: string

    constructor() {
        this._isRefreshing = false
        this._failedQueue = []
        this._apiVersion = 'v1'
        this.interceptor = this.interceptor.bind(this)
        this.processQueue = this.processQueue.bind(this)
    }

    /**
     * Refresh Token Interceptor
     * @param error
     * {@link AxiosError}
     */
    public interceptor(error: AxiosError | any): Promise<any> {

        if (!RefreshTokenInterceptor.shouldIntercept(error)) {
            return Promise.reject(error)
        }

        if (error.config._retry || error.config._queued) {
            return Promise.reject(error)
        }

        const originalRequest: any = error.config

        if (this._isRefreshing) {
            return new Promise((resolve, reject) => this._failedQueue.push({ resolve, reject }))
                .then(() => {
                    originalRequest._queued = true
                    return axiosInstance.request(originalRequest)
                })
                .catch(() => {
                    return Promise.reject(error)
                })
        }

        originalRequest._retry = true
        this._isRefreshing = true

        return new Promise((resolve, reject) => {
            this.handleTokenRefresh()
                .then((response: AxiosResponse<RefreshData>) => {
                    const { data, data: { access_token, refresh_token } } = response
                    localStorageService.setItem('access_token', access_token)
                    localStorageService.setItem('refresh_token', refresh_token)
                    this.processQueue(null, data)
                    resolve(axiosInstance.request(originalRequest))
                })
                .catch((err) => {
                    this.processQueue(err, null)
                    reject(err)
                })
                .finally(() => this._isRefreshing = false)
        })
    }

    /**
     * Queue to store failed requests and after renewing run them again
     * @param error
     * {@link AxiosError}
     * @param data
     * {@link RefreshData}
     */
    private processQueue(error: AxiosError | any, data: RefreshData | null = null) {
        this._failedQueue.forEach((promise) => {
            error ? promise.reject(error) : promise.resolve(data)
        })
        this._failedQueue = []
    }

    /**
     * Method for making the request and obtaining new access tokens
     */
    private handleTokenRefresh(): Promise<AxiosResponse<RefreshData>> {
        const access_token = localStorageService.getItem('access_token')
        const refresh_token = localStorageService.getItem('refresh_token')
        const body = { access_token, refresh_token }
        return axiosInstance.post(`${this._apiVersion}/auth/refresh`, body)
    }
}

export default new RefreshTokenInterceptor()
