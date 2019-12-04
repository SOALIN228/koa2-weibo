/**
 * @description 微博首页 API
 * @author SOALIN
 * @date 2019/12/1 16:49
 */
const xss = require('xss')
const router = require('koa-router')()
const blogValidate = require('../../validator/blog')
const { getBlogListStr } = require('../../utils/blog')
const { getHomeBlogList } = require('../../controller/blog-home')
const { loginCheck } = require('../../middleware/loginChecks')
const { genValidator } = require('../../middleware/validator')
const { create } = require('../../controller/blog-home')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({
    userId,
    content: xss(content),
    image
  })
})

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const { id: userId } = ctx.session.userInfo
  const result = await getHomeBlogList(userId, pageIndex)
  // 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router
