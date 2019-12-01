/**
 * @description 数据模型入口文件
 * @author SOALIN
 * @date 2019/11/29 17:28
 */
const User = require('./User')
const Blog = require('./Blog')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}
