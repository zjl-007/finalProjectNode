const Capture = require("../../runMyClass");
const { toUserInfo } = require("../util/tokenToUserInfo") 
const {writeData,
  delUserData,
  delAllData,
  queryUserData,
} = require('../db/controlData')
let totalPackData = []; //存放抓取的数据
module.exports = (app) => {
  app.post('/startCapture', (req, res) => {
    let message = Capture.startCaptureSync(-1);
    res.send({message});
  })  
  app.post('/stopCapture', (req, res) => {
    Capture.stopCaptureSync();
    res.send('stop');
  })
  app.post('/getCapture', async (req, res) => {
    let packDataArr = Capture.getCaptureResultSync();
    packDataArr.forEach((item, index) => {
      packDataArr[index] = JSON.parse(item)
    });
    totalPackData = totalPackData.concat(packDataArr);
    res.json({code: 200, message: '获取数据成功！', data: totalPackData});
  })
  app.post('/toSaveData', async (req, res) => {
    if(!totalPackData.length) {
      res.json({code: 500, message: '没有数据可存储,请先抓取！'});
      return
    }
    let token = req.headers.authorization;
    let userInfo = toUserInfo(token);
    userInfo = userInfo.split('and')
    let result = await writeData(userInfo[0], userInfo[1], totalPackData); //将数据写入数据库
    res.json(result);
  })
  app.post('/delUserHistoryData', async (req, res) => {
    let idusers = req?.body?.id;
    let {code, data, message} = await delUserData(idusers); //删除用户数据
    res.json({
      code: code ? 200 : 500,
      data: data,
      message
    });
  })
  app.post('/delAllHistoryData', async (req, res) => {
    let idusers = req?.body?.id;
    let {code, data, message} = await delAllData(idusers); //删除所有用户数据
    res.json({
      code: code ? 200 : 500,
      data: data,
      message
    });
  })
  app.post('/getUserHistory', async (req, res) => {
    let idusers = req?.body?.id;
    let {code, data, message} = await queryUserData(idusers); //删除所有用户数据
    res.json({
      code: code ? 200 : 500,
      data: data,
      message
    });
  })
}