import axiosInstance from './axios'
import jwt from 'jsonwebtoken'
import localStorageService from './local.storage'
import sessionStorageService from './session.storage'
import { IAuth, IChangePassword, IForgot } from '../store/ducks/auth/types'
import { AccessToken } from '../store/application/models/auth/access.token'

export enum LogicalStrategy {
    OR = 'or',
    AND = 'and'
}

/**
 * Auth Service
 */
export class AuthService {

    constructor(private apiVersion: string = 'v1') {
    }

    /**
     * Performs the request of access tokens informing the user's credentials
     * @param body, User's credentials
     * @typeParam {@link IAuth}
     */
    public async login(body: IAuth): Promise<AccessToken> {
        const response = await axiosInstance.post(`${this.apiVersion}/auth`, body)
        const { access_token, refresh_token } = response.data
        const accessToken: AccessToken = this.verify(access_token)
        localStorageService.setItem('access_token', access_token)
        localStorageService.setItem('refresh_token', refresh_token)
        return accessToken
    }

    /**
     * Run the password recovery request by entering the user's email
     * @param data, User's data
     * @typeParam {@link IForgot}
     */
    public forgot(data: IForgot): Promise<any> {
        return axiosInstance.post(`${this.apiVersion}/auth/forgot`, data)
    }

    /**
     * Perform the password reset request stating the user's email and new password
     * @param data, User's data
     * @typeParam {@link IChangePassword}
     */
    public changePassword(data: IChangePassword): Promise<any> {
        let options
        if (!data?.old_password) {
            const token = sessionStorageService.getItem('token')
            const headers = {
                'Authorization': `Bearer ${token}`
            }
            options = { headers }
        }
        return axiosInstance.patch(`${this.apiVersion}/auth/password`, data, options)
    }

    /**
     * Decodes the jwt token saved in localStorage returning the payload
     * @returns AccessToken or Error with name JsonWebTokenError
     * See more: {@link https://www.npmjs.com/package/jsonwebtoken#errors--codes}
     */
    public decodeToken(): AccessToken {
        const token = localStorageService.getItem('access_token')
        return this.decode(token)
    }

    /**
     * Checks whether the user is properly authenticated
     * @returns boolean
     */
    public isAuthenticated(): boolean {
        try {
            const localToken: AccessToken | Error = this.decodeToken()
            return !!localToken
        } catch (e) {
            this.logout()
            return false
        }
    }

    /**
     * Performs the system logout by clearing the localstorage
     */
    public logout(): void {
        const themeMode = localStorageService.getItem('themeMode')
        localStorageService.logout()
        if (themeMode) {
            localStorageService.setItem('themeMode', themeMode)
        }
    }

    /**
     * Decodes jwt token returning the payload
     * @param token, Toke jwt to be decoded
     * @typeParam string
     * @returns AccessToken or Error with name JsonWebTokenError
     * See more: {@link https://www.npmjs.com/package/jsonwebtoken#errors--codes}
     */
    public decode(token: string): AccessToken {
        const jsonDecoded = jwt.decode(token, { complete: true })
        return new AccessToken().fromJSON(jsonDecoded.payload)
    }

    /**
     * Validation of the signature and issuer of the token
     * @param token, Token jwt to be validated
     * @typeParam string
     * @returns AccessToken or Error with name JsonWebTokenError
     * See more: {@link https://www.npmjs.com/package/jsonwebtoken#errors--codes}
     */
    public verify(token: string): AccessToken {
        const jwtPublicKey = process.env.REACT_APP_JWT_PUBLIC_KEY
        const issuer = process.env.REACT_APP_ISSUER
        const options = {
            algorithms: ['RS256'],
            issuer
        }
        const jsonDecoded = jwt.verify(token, jwtPublicKey, options)
        return new AccessToken().fromJSON(jsonDecoded)
    }
}

export default new AuthService()
