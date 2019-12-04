/**
 * @description 时间相关的工具函数
 * @author SOALIN
 * @date 2019/12/4 16:23
 */
const { format } = require('date-fns')

/**
 * 格式化时间
 * @param str
 * @return {string}
 */
function timeFormat (str) {
  return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
  timeFormat
}
