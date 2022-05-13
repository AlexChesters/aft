import apiUtils from '../api-utils'

import checklists from './checklists'
import airports from './airports'
import aircraft from './aircraft'
import auth from './auth'

export default {
  checklists,
  airports,
  aircraft,
  auth,
  baseURL: apiUtils.baseURL,
  retryRequest: apiUtils.retryRequest
}
