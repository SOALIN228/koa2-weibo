/**
 * @description blog model test
 * @author SOALIN
 * @date 2019/12/1 20:06
 */
const { Blog } = require('../../src/db/model/index')

test('Blog 模型的各个属性，符合预期', () => {
  const blog = Blog.build({
    userId: 1,
    content: '微博内容',
    image: '/test.png'
  })
  // 验证属性
  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('微博内容')
  expect(blog.image).toBe('/test.png')
})
