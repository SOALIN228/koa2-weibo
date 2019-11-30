/**
 * @description json schema 校验
 * @author SOALIN
 * @date 2019/11/30 11:22
 */
const Ajv = require('ajv')
const ajv = new Ajv()

/**
 * json schema 校验
 * @param schema
 * @param data
 * @return {ajv.ErrorObject}
 */
function validate (schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0] // 返回第一个错误
  }
}

module.exports = validate
