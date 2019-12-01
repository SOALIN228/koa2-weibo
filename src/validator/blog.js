/**
 * @description 微博数据格式检验
 * @author SOALIN
 * @date 2019/12/1 17:24
 */
const validate = require('./_validate')
// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * 校验微博数据格式
 * @param data 微博信息
 * @return {ajv.ErrorObject}
 */
function blogValidate (data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidate
