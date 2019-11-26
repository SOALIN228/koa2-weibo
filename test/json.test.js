/**
 * @description json test
 * @author SOALIN
 * @date 2019/11/26 13:46
 */
const server = require('./server')

test('json 返回数据格式', async () => {
  const res = await server.get('/json')
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
})
