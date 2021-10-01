import Crypto from './crypto'

class LocalSession {

    /**
     * Retrieves an item saved in sessionStorage
     * @param key, Item identifier
     * @typeParam string
     */
    public getItem(key: string): string {
        const encryptedKey = Crypto.encryptKey(key)
        const encryptedItem = sessionStorage.getItem(encryptedKey.toString())
        return encryptedItem ? Crypto.decryptItem(encryptedItem) : ''
    }

    /**
     * Method to persist item in sessionStorage
     * @param key, Item identifier
     * @typeParam string
     * @param item, Item to be persisted
     * @typeParam string
     */
    public setItem(key: string, item: string): void {
        const encryptedKey = Crypto.encryptKey(key)
        const encryptedItem = Crypto.encryptItem(item)
        sessionStorage.setItem(encryptedKey, encryptedItem)
    }

    /**
     * Clean sessionStorage
     */
    public clear(): void {
        sessionStorage.clear()
    }
}

export default new LocalSession()
