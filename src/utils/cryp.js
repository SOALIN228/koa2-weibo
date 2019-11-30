/**
 * @description 加密方法
 * @author SOALIN
 * @date 2019/11/30 10:22
 */
const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../config/secretKeys')

/**
 * md5 加密
 * @param content 明文
 */
function _md5 (content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param content 明文密码
 */
function doCrypto (content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto
