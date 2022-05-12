/* eslint-env jest */

import persistentStorage from './persistent-storage'

describe('persistent storage', () => {
  beforeEach(() => {
    window.localStorage.clear()
    jest.clearAllMocks()
  })

  describe('settings', () => {
    const storage = persistentStorage.settings

    describe('set', () => {
      it('should allow settings to be set', () => {
        storage.set('amelia', 'earhart')

        expect(window.localStorage.setItem).toHaveBeenCalledWith('aft_PERSISTENT_SETTINGS', JSON.stringify({ amelia: 'earhart' }))
      })
    })

    describe('get', () => {
      it('should allow settings to be get', () => {
        storage.set('amelia', 'earhart')

        expect(storage.get('amelia')).toEqual('earhart')
      })
    })
  })

  describe('checklist state', () => {
    const storage = persistentStorage.checklistState

    describe('set', () => {
      it('should allow a checklist to be set', () => {
        storage.set('amelia', 'earhart')

        expect(window.localStorage.setItem).toHaveBeenCalledWith('aft_CHECKLIST_STATE', JSON.stringify({ amelia: 'earhart' }))
      })
    })

    describe('get', () => {
      it('should allow settings to be get', () => {
        storage.set('amelia', 'earhart')

        expect(storage.get('amelia')).toEqual('earhart')
      })
    })
  })
})
