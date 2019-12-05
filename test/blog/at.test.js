/**
 * @description 微博 @ test
 * @author SOALIN
 * @date 2019/12/5 15:50
 */
const server = require('../server')
const { COOKIE_1, COOKIE_2, USER_NAME_2 } = require('../testUserInfo')

let BLOG_ID

test('id_1创建一条微博，@id_2,期望成功', async () => {
  const content = `单元测试 @${USER_NAME_2} - ${USER_NAME_2}`
  const res = await server
    .post('/api/blog/create')
    .send({ content })
    .set('cookie', COOKIE_1)
  expect(res.body.errno).toBe(0)

  BLOG_ID = res.body.data.id
})

test('id_2的@列表，期望存在id_1创建的微博', async () => {
  const res = await server
    .get('/api/atMe/loadMore/0')
    .set('cookie', COOKIE_2)
  expect(res.body.errno).toBe(0)
  const data = res.body.data
  const blogList = data.blogList
  const isHaveCurBlog = blogList.some(blog => blog.id === BLOG_ID)
  expect(isHaveCurBlog).toBe(true)
})
