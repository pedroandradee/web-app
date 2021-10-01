import CryptoJS from 'crypto-js'

/**
 * Secret used by the encryption algorithm
 */
const LS_SECRET_KEY: string = `${process.env.REACT_APP_LS_SECRET_KEY}`

/**
 * Crypto Service
 */
export default class Crypto {
    /**
     * Encrypt a base64 string
     * @param str, String to be encrypted
     * @typeParam string
     */
    public static encryptKey(str: string): string {
        return btoa(str)
    }

    /**
     * Encrypts a string using the Crypto.AES algorithm
     * @param str, String to be encrypted
     * @typeParam string
     */
    public static encryptItem(str: string): string {
        const encrypted = CryptoJS.AES.encrypt(str, LS_SECRET_KEY)
        return encrypted.toString()
    }

    /**
     * Decrypts a string using the Crypto.AES algorithm
     * @param encrypted, String to be decrypted
     * @typeParam string
     */
    public static decryptItem(encrypted: string): string {
        const decrypted = CryptoJS.AES.decrypt(encrypted, LS_SECRET_KEY)
        return decrypted.toString(CryptoJS.enc.Utf8)
    }
}
