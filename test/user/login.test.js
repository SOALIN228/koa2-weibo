/**
 * @description user api test
 * @author SOALIN
 * @date 2019/11/30 17:40
 */
const server = require('../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

let COOKIE = ''

test('注册一个用户, 期望成功', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).toBe(0)
})

test('重复注册用户，期望失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.error).not.toBe(0)
})

test('查询注册的用户，期望成功', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(res.body.errno).toBe(0)
})

test('json schema 检测，非法的格式，期望失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send({
      userName: '123',
      password: 'a',
      gender: 'mail'
    })
  expect(res.body.errno).not.toBe(0)
})

test('登录，期望成功', async () => {
  const res = await server
    .post('/api/user/login')
    .send({
      userName,
      password
    })
  expect(res.body.errno).toBe(0)

  COOKIE = res.headers['set-cookie'].join(';')
})

test('删除用户，期望成功', async () => {
  const res = await server
    .post('/api/user/delete')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

test('删除后查询注册的用户，期望失败', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(res.body.errno).not.toBe(0)
})
