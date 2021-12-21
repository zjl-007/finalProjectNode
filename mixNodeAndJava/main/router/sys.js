const queryUserList = require('../db/queryUserList')
module.exports = (app) => {
  app.post('/getUserList', async (req, res) => {
    const { code, userList } = await queryUserList();
    if (!code) {
      res.send({
        data: {
          code: 500,
          userList: [],
          message: '获取用户列表失败'
        }
      })
      return
    }
    res.send({
      code: 200,
      userList,
      message: '获取用户列表成功'
    })
  })
}