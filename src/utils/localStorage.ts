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

export function removeInStorage(key: string) {
    localStorage.removeItem(key)
}

export const STORAGE_KEYS = {
    matchesList: 'matches',
}


export function getFromSession(key: string, defaultValue: any = null) {
    if (typeof window !== 'undefined') {
        const value = window.sessionStorage.getItem(key)
        return value ? JSON.parse(value) : defaultValue
    }
    return defaultValue
}

export function setInSession(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
}

export function removeInSession(key: string) {
    window.sessionStorage.removeItem(key)
}

export const SESSION_KEYS = {
    teamsCtx: 'teamsCtx',
    onGoingMatchState: 'onGoingMatchState',
}


export const setupStorage = () => {
    return {
        get: getFromStorage,
        set: setInStorage,
        remove: removeInStorage,
        keys: STORAGE_KEYS,
    }
}

export const setupSession = () => {
    return {
        get: getFromSession,
        set: setInSession,
        remove: removeInSession,
        keys: SESSION_KEYS,
    }
}