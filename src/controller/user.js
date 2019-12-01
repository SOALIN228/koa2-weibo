/**
 * @description user controller
 * @author SOALIN
 * @date 2019/11/29 22:45
 */
const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../model/ErrorInfo')
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
    return new ErrorModel(registerUserNameExistInfo)
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

/**
 * 登录
 * @param ctx
 * @param userName
 * @param password
 * @return {Promise<void>}
 */
async function login (ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) { // 登录失败
    return new ErrorModel(loginFailInfo)
  }
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 删除当前用户
 * @param userName
 * @return {Promise<void>}
 */
async function deleteCurUser (userName) {
  const result = await deleteUser(userName)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改个人信息
 * @param ctx
 * @param nickName
 * @param city
 * @param picture
 * @return {Promise<void>}
 */
async function changeInfo (ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  const result = await updateUser({
    newNickName: nickName,
    newCity: city,
    newPicture: picture
  }, { userName })
  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @param userName
 * @param password
 * @param newPassword
 * @return {Promise<void>}
 */
async function changePassword (userName, password, newPassword) {
  const result = await updateUser({ newPassword: doCrypto(newPassword) }, {
    userName,
    password: doCrypto(password)
  })
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param ctx
 * @return {Promise<void>}
 */
async function logout (ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
}
