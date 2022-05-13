import apiUtils from '../../api-utils'
import persistentStorage from '../../../utils/persistent-storage'

const auth = persistentStorage.auth

export default {
  fetchAll: async () => await apiUtils.get('/checklists/list', {
    headers: {
      authorization: auth.get('accessToken')
    }
  }),
  fetchOne: async (identifier) => await apiUtils.get(`/checklists/get/${identifier}`, {
    headers: {
      authorization: auth.get('accessToken')
    }
  }),
  save: async (identifier = '', checklist) => await apiUtils.post('/checklists/update', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: auth.get('accessToken')
    },
    body: JSON.stringify({ identifier, checklist })
  }),
  duplicate: async (identifier) => await apiUtils.post('/checklists/duplicate', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: auth.get('accessToken')
    },
    body: JSON.stringify({ identifier })
  }),
  delete: async (identifier) => await apiUtils.post('/checklists/delete', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: auth.get('accessToken')
    },
    body: JSON.stringify({ identifier })
  })
}
