/**
 * @description 广场 api test
 * @author SOALIN
 * @date 2019/12/3 13:39
 */
const server = require('../server')
const { COOKIE, USER_NAME } = require('../testUserInfo')

test('广场，加载第一页数据，期望成功', async () => {
  const res = await server
    .get(`/api/square/loadMore/0`)
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)

  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})
