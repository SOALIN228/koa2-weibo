/**
 * @description 微博 @ 用户关系 service
 * @author SOALIN
 * @date 2019/12/5 13:40
 */
const { AtRelation } = require('../db/model')

/**
 * 创建微博 @ 用户的关系
 * @param blogId
 * @param userId
 * @return {Promise<*>}
 */
async function createAtRelation (blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })

  return result.dataValues
}

/**
 * 获取 @ 用户的微博数量(未读)
 * @param userId
 * @return {Promise<void>}
 */
async function getAtRelationCount (userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })

  return result.count
}

module.exports = {
  createAtRelation,
  getAtRelationCount
}
