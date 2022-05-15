import apiUtils from '../../api-utils'

export default {
  fetchAll: async () => await apiUtils.get('/checklists/list', {}, true),
  fetchOne: async (identifier) => await apiUtils.get(`/checklists/get/${identifier}`, {}, true),
  save: async (identifier = '', checklist) => await apiUtils.post('/checklists/update', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ identifier, checklist })
  }, true),
  duplicate: async (identifier) => await apiUtils.post('/checklists/duplicate', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ identifier })
  }, true),
  delete: async (identifier) => await apiUtils.post('/checklists/delete', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ identifier })
  }, true)
}
