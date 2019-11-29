/**
 * @description sequelize 同步
 * @author SOALIN
 * @date 2019/11/26 21:10
 */
const seq = require('./seq')

require('./model/index')

// 测试连接
seq.authenticate().then(() => {
  console.log('ok')
}).catch(() => {
  console.log('error')
})

// 执行同步
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})
