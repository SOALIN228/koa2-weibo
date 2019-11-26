/**
 * @description 连接 redis 的 get set
 * @author SOALIN
 */
const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', err => {
  console.log('redis error', err)
})

/**
 *
 * @param key
 * @param value
 * @param timeout 过期时间，单位 s
 */
function set (key, value, timeout = 60 * 60) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value)
  redisClient.expire(key, timeout)
}

/**
 *
 * @param key
 * @return {Promise<unknown>}
 */
function get (key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if(val === null || val === undefined) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (e) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}
