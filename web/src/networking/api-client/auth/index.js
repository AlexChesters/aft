import apiUtils from '../../api-utils'

export default {
  signIn: async (username, password) => await apiUtils.post('/auth/sign-in', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }),
  register: async (username, password) => await apiUtils.post('/auth/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
}
