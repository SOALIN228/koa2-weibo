/**
 * @description user 路由
 * @author SOALIN
 * @date 2019/11/29 16:47
 */
const router = require('koa-router')()

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {})
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', {})
})

module.exports = router
