/**
 * @description 微博缓存层
 * @author SOALIN
 * @date 2019/12/3 11:51
 */
const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis_key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表的缓存
 * @param pageIndex
 * @param pageSize
 * @return {Promise<void>}
 */
async function getSquareCacheList (pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  // 获取缓存
  const cacheResult = await get(key)
  if (cacheResult !== null) {
    // 获取缓存成功
    return cacheResult
  }

  // 没有缓存，读取数据库
  const result = await getBlogListByUser({
    pageIndex,
    pageSize
  })

  // 设置缓存
  set(key, result, 60)
  return result
}

module.exports = {
  getSquareCacheList
}
