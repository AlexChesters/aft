import apiUtils from '../../api-utils'

export default {
  search: async (identifier) => await apiUtils.get(`/airports/search/${identifier}`)
}
