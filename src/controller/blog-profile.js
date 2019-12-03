/**
 * @description 个人主页 controller
 * @author SOALIN
 * @date 2019/12/2 21:50
 */
const { getBlogListByUser } = require('../services/blog')
const { PAGE_SIZE } = require('../config/constants')
const { SuccessModel } = require('../model/ResModel')

/**
 * 获取个人主页微博列表
 * @param userName
 * @param pageIndex
 * @return {Promise<void>}
 */
async function getProfileBlogList (userName, pageIndex) {
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const blogList = result.blogList
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getProfileBlogList
}
