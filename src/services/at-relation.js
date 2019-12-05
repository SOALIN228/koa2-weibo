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

module.exports = {
  createAtRelation
}
