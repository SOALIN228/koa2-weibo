/**
 * @description error 404 路由
 * @author SOALIN
 * @date 2019/11/28 19:16
 */
const router = require('koa-router')()
router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router
