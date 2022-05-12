import apiUtils from '../../api-utils'

export default {
  fetchAll: async () => await apiUtils.get('/checklists/list'),
  fetchOne: async (identifier) => await apiUtils.get(`/checklists/get/${identifier}`),
  save: async (identifier = '', checklist) => await apiUtils.post('/checklists/update', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'access-control-allow-credentials': true,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ identifier, checklist })
  }),
  duplicate: async (identifier) => await apiUtils.post('/checklists/duplicate', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'access-control-allow-credentials': true,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ identifier })
  }),
  delete: async (identifier) => await apiUtils.post('/checklists/delete', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'access-control-allow-credentials': true,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ identifier })
  })
}
