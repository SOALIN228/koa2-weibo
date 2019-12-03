/**
 * @description 用户关系 service
 * @author SOALIN
 * @date 2019/12/3 14:49
 */
const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取关注该用户的用户列表,即粉丝
 * @param followerId
 * @return {Promise<void>}
 */
async function getUsersByFollower (followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })

  // 格式化
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}

module.exports = {
  getUsersByFollower
}
