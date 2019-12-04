/**
 * @description home api test
 * @author SOALIN
 * @date 2019/12/1 20:09
 */

const server = require('../server')
const { COOKIE_1 } = require('../testUserInfo')

// 存储微博 id
let BLOG_ID = ''

test('创建一条微博, 期望成功', async () => {
  const content = '单元测试自动创建的微博_' + Date.now()
  const image = '/xxx.png'

  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image
    })
    .set('cookie', COOKIE_1)
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  BLOG_ID = res.body.data.id
})

test('首页，加载第一页数据，期望成功', async () => {
  const res = await server
    .get(`/api/blog/loadMore/0`)
    .set('cookie', COOKIE_1)
  expect(res.body.errno).toBe(0)

  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})
