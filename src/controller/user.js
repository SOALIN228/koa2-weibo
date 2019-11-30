/**
 * @description user controller
 * @author SOALIN
 * @date 2019/11/29 22:45
 */
const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param userName
 * @return {Promise<void>}
 */
async function isExist (userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册
 * @param userName
 * @param password
 * @param gender （1 男，2 女，3 保密）
 * @return {Promise<void>}
 */
async function register ({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return ErrorModel(registerUserNameExistInfo)
  }
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (e) {
    console.error(e.message, e.stack)
    return new ErrorModel(registerFailInfo)
  }
}

module.exports = {
  isExist,
  register
}
