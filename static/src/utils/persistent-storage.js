const SETTINGS_KEY = 'aft_PERSISTENT_SETTINGS'
const CHECKLIST_STATE_KEY = 'aft_CHECKLIST_STATE'

const categories = {
  SETTINGS: SETTINGS_KEY,
  CHECKLIST_STATE: CHECKLIST_STATE_KEY
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
    }
  }
}

export default {
  settings: getStorage(categories.SETTINGS),
  checklistState: getStorage(categories.CHECKLIST_STATE)
}
