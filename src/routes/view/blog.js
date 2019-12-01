/**
 * @description 微博 路由
 * @author SOALIN
 * @date 2019/12/1 16:29
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middleware/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

module.exports = router
