/**
 * @description jest server
 * @author SOALIN
 * @date 2019/11/26 13:44
 */
const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
