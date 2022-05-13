import apiUtils from '../../api-utils'

export default {
  list: async (identifier) => await apiUtils.get('/aircraft/list')
}
