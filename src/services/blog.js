/**
 * @description 微博 service
 * @author SOALIN
 * @date 2019/12/1 16:56
 */
const { Blog } = require('../db/model/index')

/**
 * 创建微博
 * @param userId
 * @param content
 * @param image
 * @return {Promise<void>}
 */
async function createBlog ({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlog
}
