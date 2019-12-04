/**
 * @description 用户关系
 * @author SOALIN
 * @date 2019/12/4 13:42
 */
const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation')
const { ID_1, USER_NAME_1, COOKIE_1, ID_2, USER_NAME_2 } = require('../testUserInfo')

test('id_1取消关注id_2, 避免影响', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: ID_2 })
    .set('cookie', COOKIE_1)
  expect(1).toBe(1)
})

test('id_1关注id_2, 期望成功', async () => {
  const res = await server
    .post('/api/profile/follow')
    .send({ userId: ID_2 })
    .set('cookie', COOKIE_1)
  expect(res.body.errno).toBe(0)
})

test('获取id_2的粉丝，期望id_1存在', async () => {
  const result = await getFans(ID_2)
  const { count, userList } = result.data
  const hasUserName = userList.some(fanInfo => {
    return fanInfo.userName === USER_NAME_1
  })
  expect(count > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

test('获取id_1的关注人，期望id_2存在', async () => {
  const result = await getFollowers(ID_1)
  const { count, list } = result.data
  const hasUserName = list.some(followerInfo => {
    return followerInfo.userName === USER_NAME_2
  })
  expect(count > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

test('获取id_1的 at 列表，期望id_2存在', async () => {
  const result = await server
    .get('/api/user/getAtList')
    .set('cookie', COOKIE_1)
  const atList = result.body
  const hasUserName = atList.some(item => {
    // nickName - userName
    return item.indexOf(`- ${USER_NAME_2}`) > 0
  })
  expect(hasUserName).toBe(true)
})

test('id_1取消关注id_2, 期望成功', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: ID_2 })
    .set('cookie', COOKIE_1)
  expect(res.body.errno).toBe(0)
})
