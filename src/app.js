const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')
// const jwtKoa = require('koa-jwt')

const { isProd } = require('./utils/env')
const { REDIS_CONFIG } = require('./config/db')
const { SESSION_SECRET_KEY } = require('./config/secretKeys')
// const { SECRET } = require('./config/secretKeys')

const blogViewRouter = require('./routes/view/blog')
const HomeAPIRouter = require('./routes/api/blog-home')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const utilsAPIRouter = require('./routes/api/utils')
const errorViewRouter = require('./routes/view/error')

// error handler
onerror(app)

// app.use(jwtKoa({
//   secret: SECRET
// }).unless({
//   path: [/^\/users\/login/] // 忽略验证目录
// }))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SECRET_KEY] // cookie 密钥配置
app.use(session({
  key: 'weibo.sid', // cookie name 默认为 koa.sid
  prefix: 'weibo:sess', // redis key 的前缀，默认是 koa:sess:
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore({ // redis 存储时间默认和 cookie 存储时间保存一致
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  })
}))

// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(HomeAPIRouter.routes(), HomeAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error handler
let onerrorConfig = {}
if (isProd) {
  onerrorConfig = { // 出错自动跳转到错误页
    redirect: '/error'
  }
}
onerror(app, onerrorConfig)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
