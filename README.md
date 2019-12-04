# koa2-weibo

## 笔记

1. 安装`cross-env` 区分开发和生产环境

2. 安装`mysql2` 高性能操作

3. 安装`sequelize` 使用`ORM`操作`mysql`

4. 安装`redis`

5. 安装`koa-generic-session`和 `koa-redis` 操作`session`和`redis`

6. 安装`jest` 用于测试，配置`test`运行环境，`--runInBand` 一个一个测试执行，`--forceExit` 测试完退出,`--colors` 测试代码高亮

7. 安装`supertest` 做`http`测试

8. 安装`eslint` 和 `babel-eslint` 做代码检查

9. 安装`pre-commit` 可以指定代码提交前执行`lint`,强制代码规范检查

10. 添加`--inspect` 可以启动chrome调试模式(`chrome://inspect`)，通过debugger来更好的找出问题,端口默认是9229

11. 安装`koa-jwt` 做登录验证

12. 安装`jsonwebtoken` 将登录信息生成token做加密

13. `jwt` vs `session`

    - `jwt` 存储在客户端，不依赖cookie，可以存在header中，在跨域复杂的情况下，方便
    - `session` 存储在服务端，依赖cookie，默认不可跨域

    ```js
    // app.js
    const jwtKoa = require('koa-jwt')
    
    app.use(jwtKoa({
      secret: SECRET
    }).unless({
      path: [/^\/users\/login/] // 忽略验证目录
    }))
    ```

    ```js
    const jwt = require('jsonwebtoken')
    const util = require('util')
    const verify = util.promisify(jwt.verify)
    const { SECRET } = require('../config/constants')
    
    router.post('/login', async (ctx, next) => {
      const { userName, password } = ctx.request.body
      let userInfo
      if (userName === 'zhangsan' && password === '123') {
        userInfo = {
          userId: 1,
          userName: 'zhangsan',
          nickName: '张三',
          gender: 1
        }
      }
      // 加密  userInfo
      let token
      if (userInfo) {
        token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
      }
    
      if (userInfo === undefined) {
        ctx.body = {
          error: -1,
          msg: '登录失败'
        }
        return
      }
      ctx.body = {
        error: 0,
        data: token
      }
    })
    
    router.get('/getUserInfo', async (ctx, next) => {
      const token = ctx.header.authorization
      try {
        const payload = await verify(token.split(' ')[1], SECRET)
        ctx.body = {
          errno: 0,
          userInfo: payload
        }
      } catch (e) {
        ctx.body = {
          errno: -1,
          msg: 'verify token failed'
        }
      }
    })
    ```

14. 安装`ajv` 做数据格式校验

15. 安装`formidable-upload-koa` 做文件上传

16. 安装 `fs-extra` 做文件操作，`fs-extra`依赖于原生`fs`,做了`promise` 扩展

17. 安装`xss` 预防xss攻击

18. 安装`date-fns` 做时间样式处理
