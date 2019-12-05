/**
 * @description 微博 @ 关系 controller
 * @author SOALIN
 * @date 2019/12/5 13:52
 */
const { getAtRelationCount } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')

/**
 * 获取 @ 我的微博数量
 * @param userId
 * @return {Promise<void>}
 */
async function getAtMeCount (userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({ count })
}

module.exports = {
  getAtMeCount
}
