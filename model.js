const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建User 模型，数据库名字为users
const User = seq.define('user', {
  userName: {
    type: Sequelize.STRING, // varchar(255)
    allowNull: false // 不能为空
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING
  }
})

// 创建Blog 模型
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// 外键关联
Blog.belongsTo(User, {
  // 创建外键 Blog.userId -> User.id
  foreignKey: 'userId'
})
// 两个作用相同，可以只写一个，都写的话在查询是不管先查users 表还是blogs 表都可以
User.hasMany(Blog, {
  // 创建外键 Blog.userId -> User.id
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}
