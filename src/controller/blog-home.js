/**
 * @description 首页 controller
 * @author SOALIN
 * @date 2019/12/1 16:55
 */
const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')

/**
 * 创建微博
 * @param userId
 * @param content
 * @param image
 * @return {Promise<void>}
 */
async function create ({ userId, content, image }) {
  try {
    const blog = await createBlog({
      userId,
      content,
      image
    })
    return new SuccessModel(blog)
  } catch (e) {
    console.error(e.message, e.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}
