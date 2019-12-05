/**
 * @description 微博 @ 用户数据模型
 * @author SOALIN
 * @date 2019/12/5 9:47
 */
const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 Id'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '微博 Id'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false, // 默认未读
    comment: '是否已读'
  }
})

module.exports = AtRelation
