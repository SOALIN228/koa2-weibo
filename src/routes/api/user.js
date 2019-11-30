/**
 * @description user API
 * @author SOALIN
 * @date 2019/11/29 22:41
 */
const router = require('koa-router')()
const userValidate = require('../../validator/user')
const { loginCheck } = require('../../middleware/loginChecks')
const { isExist, register, login, deleteCurUser } = require('../../controller/user')
const { genValidator } = require('../../middleware/validator')
const { isTest } = require('../../utils/env')

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

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    const { userName } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }
})

module.exports = router
