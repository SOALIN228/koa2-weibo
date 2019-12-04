/**
 * @description user service
 * @author SOALIN
 * @date 2019/11/29 22:49
 */
const { User } = require('../db/model/index')
const { addFollower } = require('./user-relation')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param userName
 * @param password
 * @return {Promise<void>}
 */
async function getUserInfo (userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if (result == null) {
    return result
  }

  return formatUser(result.dataValues) // 格式化
}

/**
 * 创建用户
 * @param userName
 * @param password
 * @param gender
 * @param nickName
 * @return {Promise<void>}
 */
async function createUser ({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName || userName,
    gender
  })
  const data = result.dataValues
  addFollower(data.id, data.id)
  return data
}

/**
 * 删除用户
 * @param userName
 * @return {Promise<void>}
 */
async function deleteUser (userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  return result > 0
}

/**
 * 更新用户信息
 * @param newPassword
 * @param newNickName
 * @param newPicture
 * @param newCity
 * @param userName
 * @param password
 * @return {Promise<void>}
 */
async function updateUser ({ newPassword, newNickName, newPicture, newCity }, { userName, password }) {
  // 修改内容
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (newCity) {
    updateData.city = newCity
  }
  // 查询条件
  const whereData = {
    userName
  }
  if (password) {
    whereData.password = password
  }
  const result = await User.update(updateData, {
    where: whereData
  })
  return result[0] > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}
