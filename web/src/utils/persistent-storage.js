const CHECKLIST_STATE_KEY = 'aft_CHECKLIST_STATE'
const AUTH_KEY = 'aft_AUTH'

const categories = {
  CHECKLIST_STATE: CHECKLIST_STATE_KEY,
  AUTH: AUTH_KEY
}

const getAllSettings = (key) => JSON.parse(
  window.localStorage.getItem(key)
) || {}

const getStorage = (localStorageKey) => {
  return {
    get: (key) => {
      return getAllSettings(localStorageKey)[key]
    },
    set: (key, value) => {
      const settings = getAllSettings(localStorageKey)

      settings[key] = value

      window.localStorage.setItem(
        localStorageKey,
        JSON.stringify(settings)
      )
    },
    clear: () => {
      window.localStorage.setItem(localStorageKey, JSON.stringify({}))
    }
  }
}

export default {
  checklistState: getStorage(categories.CHECKLIST_STATE),
  auth: getStorage(categories.AUTH)
}
