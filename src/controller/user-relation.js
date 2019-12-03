/**
 * @description 用户关系 controller
 * @author SOALIN
 * @date 2019/12/3 14:36
 */
const { getUsersByFollower } = require('../services/user-relation')
const { SuccessModel } = require('../model/ResModel')

/**
 * 根据 userId 获取粉丝列表
 * @param userId
 * @return {Promise<void>}
 */
async function getFans (userId) {
  const { count, userList } = await getUsersByFollower(userId)

  return new SuccessModel({
    count,
    userList
  })
}

module.exports = {
  getFans
}
