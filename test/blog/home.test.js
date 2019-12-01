/**
 * @description home api test
 * @author SOALIN
 * @date 2019/12/1 20:09
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

let BLOG_ID = ''

test('注册一个用户, 期望成功', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).toBe(0)
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

test('创建一条微博, 期望成功', async () => {
  const content = '单元测试自动创建的微博_' + Date.now()
  const image = '/xxx.png'

  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  BLOG_ID = res.body.data.id
})

// test('删除用户，期望成功', async () => {
//   const res = await server
//     .post('/api/user/delete')
//     .set('cookie', COOKIE)
//   expect(res.body.errno).toBe(0)
// })

test('退出登录，期望成功', async () => {
  const res = await server
    .post('/api/user/logout')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})
