import Crypto from './crypto'

/**
 * LocalStorage Service
 * Access interface to the browser's Storage location, added an encryption layer
 */
class LocalStorage {
    /**
     * Retrieves an item saved in localStorage
     * @param key, Item identifier
     * @typeParam string
     */
    public getItem(key: string): string {
        const encryptedKey = Crypto.encryptKey(key)
        const encryptedItem = localStorage.getItem(encryptedKey.toString())
        return encryptedItem ? Crypto.decryptItem(encryptedItem) : ''
    }

    /**
     * Method to persist item in localStorage
     * @param key, Item identifier
     * @typeParam string
     * @param item, Item to be persisted
     * @typeParam string
     */
    public setItem(key: string, item: string): void {
        const encryptedKey = Crypto.encryptKey(key)
        const encryptedItem = Crypto.encryptItem(item)
        localStorage.setItem(encryptedKey, encryptedItem)
    }

    /**
     * Method to remove item in localStorage
     * @param key, Item identifier
     * @typeParam string
     */
    public removeItem(key: string): void {
        const encryptedKey = Crypto.encryptKey(key)
        localStorage.removeItem(encryptedKey)
    }

    /**
     * Clean localStorage for secure logout
     */
    public logout(): void {
        localStorage.clear()
    }
}

export default new LocalStorage()
