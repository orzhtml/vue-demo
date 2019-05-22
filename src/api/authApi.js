import api from './api'
import constants from '../constants'
console.log('host: ', constants)
export default {
  async getColumn (parm) {
    let obj = {
      url: constants.host + 'app/get_column',
      data: parm
    }
    return api.post(obj)
  }
}
