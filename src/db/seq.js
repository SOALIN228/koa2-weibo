/**
 * @description sequelize 实例
 * @author SOALIN
 * @date 2019/11/26 13:56
 */
const Sequelize = require('sequelize')
const { MYSQL_CONFIG } = require('../config/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONFIG

const config = {
  host,
  dialect: 'mysql'
}

if (isTest) { // 测试环境不打印sql
  config.logging = () => {}
}

// 线上配置
if (isProd) {
  config.pool = {
    max: 5, // 连接池最大的连接数量
    min: 0,
    idle: 10000 // 如果一个连接池10 s内未被使用，将被释放
  }
}

const seq = new Sequelize(database, user, password, config)

module.exports = seq
