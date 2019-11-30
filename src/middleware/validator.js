/**
 * @description json schema 验证中间件
 * @author SOALIN
 * @date 2019/11/30 12:11
 */

const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

/**
 * 生成 json schema 验证中间件
 * @param validateFn 验证函数
 */
function genValidator (validateFn) {
  async function validator (ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) { // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    await next() // 验证成功，执行下一步
  }

  return validator
}

module.exports = {
  genValidator
}
