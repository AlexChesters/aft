import apiUtils from '../api-utils'

import checklists from './checklists'
import airports from './airports'
import aircraft from './aircraft'

export default {
  checklists,
  airports,
  aircraft,
  baseURL: apiUtils.baseURL,
  retryRequest: apiUtils.retryRequest
}
