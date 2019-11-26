/**
 * @description 存储配置
 * @author SOALIN
 */
const { isProd } = require('../utils/env')
let REDIS_CONFIG = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '717900',
  database: 'koa2_weibo'
}

if (isProd) { // 线上配置
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  }

  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '717900',
    database: 'koa2_weibo'
  }
}

module.exports = {
  REDIS_CONFIG,
  MYSQL_CONFIG
}
