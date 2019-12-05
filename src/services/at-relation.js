/**
 * @description 微博 @ 用户关系 service
 * @author SOALIN
 * @date 2019/12/5 13:40
 */
const { User, Blog, AtRelation } = require('../db/model')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建微博 @ 用户的关系
 * @param blogId
 * @param userId
 * @return {Promise<*>}
 */
async function createAtRelation (blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })

  return result.dataValues
}

/**
 * 获取 @ 用户的微博数量(未读)
 * @param userId
 * @return {Promise<void>}
 */
async function getAtRelationCount (userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })

  return result.count
}

/**
 * 获取 @ 用户的微博列表
 * @param userId
 * @param pageIndex
 * @param pageSize
 * @return {Promise<void>}
 */
async function getAtUserBlogList ({ userId, pageIndex, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId
        }
      },
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })

  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList
}
