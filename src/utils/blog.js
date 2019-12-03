/**
 * @description 微博数据相关的工具方法
 * @author SOALIN
 * @date 2019/12/3 9:52
 */
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取 blog-list.ejs 文件内容
const BLOG_LIST_TPL = fs.readFileSync(
  path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

function getBlogListStr (blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

module.exports = {
  getBlogListStr
}
