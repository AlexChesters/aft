/* eslint-env jest */

const nock = require('nock')

describe('api client', () => {
  describe('baseURL', () => {
    const originalEnvironment = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = originalEnvironment
    })

    it('throws if the environment cannot be determined', () => {
      process.env.NODE_ENV = undefined

      expect(() => require('.').default).toThrow()
    })

    it('throws if the environment is set to an invalid value', () => {
      process.env.NODE_ENV = 'some-random-string'

      expect(() => require('.').default).toThrow()
    })

    it('returns the live URL if the environment is set to production', () => {
      process.env.NODE_ENV = 'production'

      const apiClient = require('.').default

      expect(apiClient.baseURL).toEqual('https://edge.alexchesters.com/aft')
    })

    it('returns the dev URL if the environment is set to development', () => {
      process.env.NODE_ENV = 'development'

      const apiClient = require('.').default

      expect(apiClient.baseURL).toEqual('http://localhost:8080')
    })
  })

  describe('auth', () => {
    process.env.NODE_ENV = 'production'
    const apiClient = require('.').default

    describe('sign-in', () => {
      it('makes the appropriate request', async () => {
        nock('https://edge.alexchesters.com')
          .post(
            '/aft/auth/sign-in',
            {
              username: 'billy@bob.com',
              password: 'hunter2'
            }
          )
          .reply(200, [{ foo: 'bar' }])

        const result = await apiClient.auth.signIn('billy@bob.com', 'hunter2')

        expect(result.status).toEqual(200)
        expect(result.data).toEqual([{ foo: 'bar' }])
      })
    })

    describe('register', () => {
      it('makes the appropriate request', async () => {
        nock('https://edge.alexchesters.com')
          .post(
            '/aft/auth/register',
            {
              username: 'billy@bob.com',
              password: 'hunter2'
            }
          )
          .reply(200, [{ foo: 'bar' }])

        const result = await apiClient.auth.register('billy@bob.com', 'hunter2')

        expect(result.status).toEqual(200)
        expect(result.data).toEqual([{ foo: 'bar' }])
      })
    })
  })

  describe('checklists', () => {
    process.env.NODE_ENV = 'production'
    const apiClient = require('.').default

    describe('fetchAll', () => {
      it('makes the appropriate request', async () => {
        nock('https://edge.alexchesters.com')
          .get('/aft/checklists/list')
          .reply(200, { foo: 'bar' })

        const result = await apiClient.checklists.fetchAll()

        expect(result.status).toEqual(200)
        expect(result.data).toEqual({ foo: 'bar' })
      })
    })

    describe('fetchOne', () => {
      it('makes the appropriate request', async () => {
        nock('https://edge.alexchesters.com')
          .get('/aft/checklists/get/some-identifier')
          .reply(200, { foo: 'bar' })

        const result = await apiClient.checklists.fetchOne('some-identifier')

        expect(result.status).toEqual(200)
        expect(result.data).toEqual({ foo: 'bar' })
      })
    })

    describe('save', () => {
      it('makes the appropriate request', async () => {
        nock('https://edge.alexchesters.com')
          .post(
            '/aft/checklists/update',
            {
              identifier: 'some-identifier',
              checklist: { foo: 'bar' }
            }
          )
          .reply(201, { foo: 'bar' })

        const result = await apiClient.checklists.save('some-identifier', { foo: 'bar' })

        expect(result.status).toEqual(201)
        expect(result.data).toEqual({ foo: 'bar' })
      })
    })

    describe('duplicate', () => {
      it('makes the appropriate request', async () => {
        nock('https://edge.alexchesters.com')
          .post(
            '/aft/checklists/duplicate',
            {
              identifier: 'some-identifier'
            }
          )
          .reply(201, { foo: 'bar' })

        const result = await apiClient.checklists.duplicate('some-identifier')

        expect(result.status).toEqual(201)
        expect(result.data).toEqual({ foo: 'bar' })
      })
    })

    describe('delete', () => {
      it('makes the appropriate request', async () => {
        nock('https://edge.alexchesters.com')
          .post(
            '/aft/checklists/delete',
            {
              identifier: 'some-identifier'
            }
          )
          .reply(204)

        const result = await apiClient.checklists.delete('some-identifier')

        expect(result.status).toEqual(204)
        expect(result.data).toEqual(undefined)
      })
    })
  })

  describe('airports', () => {
    const apiClient = require('.').default

    describe('search', () => {
      it('makes the appropriate request', async () => {
        nock('https://edge.alexchesters.com')
          .get(
            '/aft/airports/search/EGCC'
          )
          .reply(200, { foo: 'bar' })

        const result = await apiClient.airports.search('EGCC')

        expect(result.status).toEqual(200)
        expect(result.data).toEqual({ foo: 'bar' })
      })
    })
  })

  describe('aircraft', () => {
    const apiClient = require('.').default

    describe('list', () => {
      it('makes the appropriate request', async () => {
        nock('https://edge.alexchesters.com')
          .get('/aft/aircraft/list')
          .reply(200, [{ foo: 'bar' }])

        const result = await apiClient.aircraft.list()

        expect(result.status).toEqual(200)
        expect(result.data).toEqual([{ foo: 'bar' }])
      })
    })
  })
})
