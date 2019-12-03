/**
 * @description 广场页 controller
 * @author SOALIN
 * @date 2019/12/3 11:38
 */
const { PAGE_SIZE } = require('../config/constants')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')

/**
 * 获取广场的微博列表
 * @param pageIndex
 * @return {Promise<void>}
 */
async function getSquareBlogList (pageIndex = 0) {
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
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
  getSquareBlogList
}
