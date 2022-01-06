const { queryUserList, 
  editUserInfo,
  delUser,
  addUser
} = require('../db/usersControl')
const queryUserInfo = require("../db/queryUserInfo")
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
    for (let key of needInfoArr) {
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
  app.post('/delUser', async (req, res) => {
    let idusers = req.body.id || '';
    if(!idusers || +idusers == 110) {
      return res.send({
        code: 500,
        message: '用户id为空或此用户不存在！'
      })
    }
    const { code, message, data } = await delUser(idusers);
    return  res.send({
        code: code ? 200 : 500,
        data,
        message
      })
  })
  app.post('/addUser', async (req, res) => {
    if(!req.body.username) {
      return  res.send({
        code: 500,
        data,
        message: '请检查输入项'
      })
    }
    const { code: x } = await queryUserInfo(null, req.body.username);
    if(x) {
      return  res.send({
        code: 500,
        message: '此用户系统已存在！'
      })
    }
    const { code, message, data, } = await addUser(req.body);
    return  res.send({
      code: code ? 200 : 500,
      data,
      message,
    })
  })
}