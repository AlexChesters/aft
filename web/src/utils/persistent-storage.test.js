/* eslint-env jest */

import persistentStorage from './persistent-storage'

describe('persistent storage', () => {
  beforeEach(() => {
    window.localStorage.clear()
    jest.clearAllMocks()
  })

  describe('auth', () => {
    const auth = persistentStorage.auth

    describe('set', () => {
      it('should allow access token to be set', () => {
        auth.set('accessToken', 'my-token')

        expect(window.localStorage.setItem).toHaveBeenCalledWith('aft_AUTH', JSON.stringify({ accessToken: 'my-token' }))
      })
    })

    describe('get', () => {
      it('should allow access token to be get', () => {
        auth.set('accessToken', 'my-token')

        expect(auth.get('accessToken')).toEqual('my-token')
      })
    })

    describe('clear', () => {
      it('should allow all values to be cleared', () => {
        auth.set('accessToken', 'my-token')
        auth.set('amelia', 'earhart')
        auth.clear()

        expect(auth.get('accessToken')).toEqual(undefined)
        expect(auth.get('amelia')).toEqual(undefined)
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
