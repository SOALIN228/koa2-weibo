/**
 * @description 微博 路由
 * @author SOALIN
 * @date 2019/12/1 16:29
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middleware/loginChecks')
const { isExist } = require('../../controller/user')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans, getFollowers } = require('../../controller/user-relation')
const { getAtMeCount, getAtMeBlogList, markAsRead } = require('../../controller/blog-at')

router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  // 获取第一页数据
  const result = await getHomeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
  // 获取粉丝
  const fansResult = await getFans(userId)
  const { count: fansCount, userList: fansList } = fansResult.data
  // 获取关注人列表
  const followersResult = await getFollowers(userId)
  const { count: followersCount, list: followersList } = followersResult.data
  // 获取 @ 数量
  const atCountResult = await getAtMeCount(userId)
  const { count: atCount } = atCountResult.data

  await ctx.render('index', {
    userData: {
      userInfo: userInfo,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      atCount
    },
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})

router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName === curUserName
  if (isMe) {
    // 是当前登录用户
    curUserInfo = myUserInfo
  } else {
    // 不是当前登录的用户
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      // 用户名不存在
      ctx.redirect('/404')
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }
  // 获取微博第一页数据
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
  // 获取粉丝
  const fansResult = await getFans(curUserInfo.id)
  const { count: fansCount, userList: fansList } = fansResult.data
  // 获取关注人列表
  const followersResult = await getFollowers(curUserInfo.id)
  const { count: followersCount, list: followersList } = followersResult.data
  // 是否关注
  const amIFollowed = fansList.some(item => {
    return item.userName === myUserName
  })
  // 获取 @ 数量
  const atCountResult = await getAtMeCount(myUserInfo.id)
  const { count: atCount } = atCountResult.data

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      amIFollowed,
      atCount
    }
  })
})

router.get('/square', loginRedirect, async (ctx, next) => {
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}
  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})

router.get('/at-me', loginRedirect, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo

  // 获取 @ 数量
  const atCountResult = await getAtMeCount(userId)
  const { count: atCount } = atCountResult.data

  // 获取第一页列表
  const result = await getAtMeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  await ctx.render('atMe', {
    atCount,
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })

  // 标记为已读
  if (atCount > 0) {
    await markAsRead(userId)
  }
})

module.exports = router
