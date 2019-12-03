/**
 * @description 微博 service
 * @author SOALIN
 * @date 2019/12/1 16:56
 */
const { Blog, User } = require('../db/model/index')
const { formatUser } = require('./_format')

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

/**
 * 根据用户获取微博列表
 * @param userName
 * @param pageIndex
 * @param pageSize
 * @return {Promise<void>}
 */
async function getBlogListByUser ({ userName, pageIndex = 0, pageSize = 10 }) {
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })
  let blogList = result.rows.map(row => row.dataValues)

  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser
}
