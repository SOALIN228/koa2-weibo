const { User, Blog } = require('./model')

!(async function () {
  const delUserRes = await User.destroy({
    where: {
      id: 1
    }
  })
  console.log(delUserRes)
})()
