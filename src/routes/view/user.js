/**
 * @description user 路由
 * @author SOALIN
 * @date 2019/11/29 16:47
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middleware/loginChecks')

/**
 * 获取登录信息
 * @param ctx
 */
function getLoginInfo (ctx) {
  let data = {
    isLogin: false // 默认未登录
  }

  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  return data
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router
