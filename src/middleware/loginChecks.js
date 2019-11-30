/**
 * @description 登录验证中间件
 * @author SOALIN
 * @date 2019/11/30 15:29
 */
const { loginCheckFailInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

/**
 * API 登录验证
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
async function loginCheck (ctx, next) {
  if (ctx.session && ctx.session.userInfo) { // 已登录
    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo) // 未登录
}

/**
 * 页面登录验证
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
async function loginRedirect (ctx, next) {
  if (ctx.session && ctx.session.userInfo) { // 已登录
    await next()
    return
  }
  // 未登录
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect
}
