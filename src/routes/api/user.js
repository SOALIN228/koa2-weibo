/**
 * @description user API
 * @author SOALIN
 * @date 2019/11/29 22:41
 */
const router = require('koa-router')()
const userValidate = require('../../validator/user')
const { isExist, register, login } = require('../../controller/user')
const { genValidator } = require('../../middleware/validator')

router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    gender
  })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

module.exports = router
