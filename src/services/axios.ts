import { Agent } from 'https'
import { AxiosInstance, default as axios } from 'axios'
import Interceptors from './interceptors'
import RefreshToken from './refresh.token'

/**
 *
 */
class Axios {

    /**
     * Static method that will return the axios instance
     */
    public static getInstance(): AxiosInstance {
        if (!this._instance) {
            this._instance = axios.create({
                baseURL: process.env.REACT_APP_API_GATEWAY,
                httpsAgent: new Agent({ rejectUnauthorized: false })
            })

            this.configRefreshToken()
            this.configRequestInterceptors()
            this.configResponseInterceptors()
        }
        return this._instance
    }
    private static _instance: AxiosInstance

    /**
     * Method for configuring the interceptors that acted on the request
     */
    private static configRequestInterceptors(): void {
        this._instance
            .interceptors
            .request
            .use(Interceptors.injectAccessToken)
    }

    /**
     * Method for configuring the interceptors that acted on the response
     */
    private static configResponseInterceptors(): void {
        this._instance
            .interceptors
            .response
            .use(
                undefined,
                Interceptors.handlerError
            )
    }

    /**
     * Interceptor configuration method for renewing access tokens
     */
    private static configRefreshToken(): void {
        this._instance
            .interceptors
            .response
            .use(
                undefined,
                RefreshToken.interceptor
            )
    }
}

export default Axios.getInstance()
