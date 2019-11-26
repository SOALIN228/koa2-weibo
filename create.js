const { Blog, User } = require('./model')

!(async function () {
  // 创建用户
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '213',
    nickName: '张三'
  })
  console.log('zhangsan:', zhangsan.dataValues)
  const zhangsanId = zhangsan.dataValues.id

  const lisi = await User.create({
    userName: 'lisi',
    password: '213',
    nickName: '李四'
  })
  const lisiId = lisi.dataValues.id

  const blog1 = await Blog.create({
    title: '标题1',
    content: '内容1',
    userId: zhangsanId
  })
  console.log('blog1', blog1.dataValues)

  const blog2 = await Blog.create({
    title: '标题2',
    content: '内容2',
    userId: zhangsanId
  })
  console.log('blog2', blog2.dataValues)

  const blog3 = await Blog.create({
    title: '标题3',
    content: '内容3',
    userId: zhangsanId
  })
  console.log('blog3', blog3.dataValues)

  const blog4 = await Blog.create({
    title: '标题4',
    content: '内容4',
    userId: lisiId
  })
  console.log('blog4', blog4.dataValues)
})()
