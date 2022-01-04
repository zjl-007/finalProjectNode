const {queryUserList, editUserInfo} = require('../db/usersControl')
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

  app.post('/editUserInfo', async (req, res) => {
    let params = req.body;
    let formatUserInfo = [];
    let idusers = req?.body?.idusers;
    let needInfoArr = [
      'username', 
      'password', 
      'email', 
      'telphone', 
      'description', 
      'powerlogin',
      'powercapture',
      'powerdb'
    ];
    for(let key of needInfoArr) {
      // if(!params[key] && key != 'description') {
      //   return res.send({
      //     code: 500,
      //     message: '请检查输入项！',
      //     data: '',
      //   })
      // }
      formatUserInfo.push(params[key]);
    }
    const { code, message, err } = await editUserInfo(idusers, formatUserInfo);
    res.send({
      code: code ? 200 : 500,
      message: message,
      err
    })
  })
}