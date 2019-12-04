/**
 * @description 数据格式化
 * @author SOALIN
 * @date 2019/11/29 23:23
 */
const { DEFAULT_PICTURE } = require('../config/constants')
const { timeFormat } = require('../utils/dt')

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
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime (obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
 * 格式化用户信息
 * @param list
 * @return {({picture}|*)[]|*}
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

/**
 * 格式化微博信息
 * @param list
 * @return {unknown[]|*}
 */
function formatBlog (list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formatDBTime)
  }
  // 对象
  let result = list
  result = _formatDBTime(result)
  return result
}

module.exports = {
  formatUser,
  formatBlog
}
