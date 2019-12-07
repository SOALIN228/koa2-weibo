/**
 * @description json schema 校验
 * @author SOALIN
 * @date 2019/11/30 11:22
 */
const Ajv = require('ajv')
const localize = require('ajv-i18n')
const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true
})
require('ajv-errors')(ajv)

/**
 * json schema 校验
 * @param schema
 * @param data
 * @return {ajv.ErrorObject}
 */
function validate (schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    localize.zh(ajv.errors) // 将错误信息转换为中文
    const messages = ajv.errorsText(ajv.errors, { separator: '\n' }) // 所有错误，字符串格式，\n分割
    ajv.errors[0].message = messages.split('\n').slice(-1) // 取出第一个出现的错误
    return ajv.errors[0] // 返回第一个错误
  }
}

module.exports = validate
