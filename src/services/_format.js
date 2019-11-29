/**
 * @description 数据格式化
 * @author SOALIN
 * @date 2019/11/29 23:23
 */
const { DEFAULT_PICTURE } = require('../config/constants')

/**
 * 用户默认头像
 * @param obj
 * @return {Object}
 * @private
 */
function _formatUserPicture (obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户信息
 * @param list
 */
function formatUser (list) {
  if (list == null) { // 空
    return list
  }

  if (list instanceof Array) { // 数组情况
    return list.map(_formatUserPicture)
  }

  return _formatUserPicture(list) // 单个对象情况
}

module.exports = {
  formatUser
}
