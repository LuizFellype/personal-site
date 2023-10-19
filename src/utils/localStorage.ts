export function getFromStorage(key: string, defaultValue: any = null) {
    if (typeof localStorage !== 'undefined') {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : defaultValue
    }
    return defaultValue
}

export function setInStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

export const STORAGE_KEYS = {
    matchesList: 'matches',
}