import * as uuidv4 from 'uuid'

import persistentStorage from '../utils/persistent-storage'

const baseURL = {
  development: 'http://localhost:8080',
  'development-shared': 'http://192.168.1.125:8080',
  production: 'https://edge.alexchesters.com/aft'
}[process.env.NODE_ENV]

if (!baseURL) throw new Error('NO_API_BASE_URL')

const authStorage = persistentStorage.auth

const ensureTokenFreshness = async () => {
  const expires = new Date(authStorage.get('expiresIn'))
  const refreshToken = authStorage.get('refreshToken')

  // TODO: decide how to handle this case
  // throw error?
  if (!expires || !refreshToken) return

  // consider tokens due to expire within 5 minutes as expired
  expires.setMinutes(-5)

  if (new Date() > expires) {
    const res = await post('/auth/refresh/web', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    })

    authStorage.set('accessToken', res.data.accessToken)
    const date = new Date()
    date.setSeconds(date.getSeconds() + Number.parseInt(res.data.expiresIn))
    authStorage.set('expiresIn', date.toISOString())
  }
}

const fetch = async (url, options) => {
  return new Promise((resolve, reject) => {
    window.fetch(url, options).then(resolve, reject)

    window.setTimeout(() => resolve({ ok: false }), 5000, new Error('ETIMEOUT'))
  })
}

const get = async (path, options, authenticated) => {
  if (!options) options = {}

  if (authenticated) {
    await ensureTokenFreshness()

    options.headers
      ? options.headers.authorization = authStorage.get('accessToken')
      : options.headers = { authorization: authStorage.get('accessToken') }
  }

  const res = await fetch(`${baseURL}${path}`, options)

  const status = res.status

  if (!res.ok) return { status, error: true }

  try {
    return { status, data: await res.json() }
  } catch (ex) {
    return { status, error: true }
  }
}

const post = async (path, options, authenticated) => {
  if (!options) options = {}

  if (authenticated) {
    await ensureTokenFreshness()

    options.headers
      ? options.headers.authorization = authStorage.get('accessToken')
      : options.headers = { authorization: authStorage.get('accessToken') }
  }

  const retryId = `CHECKLIST_ERROR_CACHE__${uuidv4.v4()}`
  const url = `${baseURL}${path}`

  let res

  try {
    res = await fetch(url, options)
  } catch (ex) {
    window.localStorage.setItem(retryId, JSON.stringify({ url, options }))
    return { error: true, retryId }
  }

  const status = res.status

  if (!res.ok) {
    window.localStorage.setItem(retryId, JSON.stringify({ url, options }))
    return { status, error: true, retryId }
  }

  try {
    return { status, data: await res.json() }
  } catch (ex) {
    window.localStorage.setItem(retryId, JSON.stringify({ url, options }))
    return { status, error: true, retryId }
  }
}

const retryRequest = async (retryId) => {
  const { url, options } = JSON.parse(window.localStorage.getItem(retryId))

  window.localStorage.removeItem(retryId)

  return post(url, options)
}

export default {
  get,
  post,
  retryRequest,
  baseURL
}
