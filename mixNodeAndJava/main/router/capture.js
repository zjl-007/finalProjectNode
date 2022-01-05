const Capture = require("../../runMyClass");
const { toUserInfo } = require("../util/tokenToUserInfo")
const {
  writeData,
} = require('../db/controlData')
let totalPackData = []; //存放抓取的数据
let isPutInDB = false; //是否存入过数据库
let startParams = {   //抓取参数对象
  total: 10,
  protocol: 'ip',
  id: 0,
}
module.exports = (app) => {
  app.post('/getCaptureState', (req, res) => {  //获取抓包程序状态
    try {
      let captureState = Capture.getCaptureStateSync();
      res.send({ code: 200, captureState, message: '获取抓包状态成功' });
    } catch (e) {
      res.send({ code: 500, captureState, message: '获取抓包状态失败', e });
    }
  })
  app.post('/startCapture', (req, res) => {
    isPutInDB = false;
    let { id, total, protocol, customContent } = Object.assign({}, startParams, req?.body);
    let content;
    if (protocol && !customContent) content = protocol;
    if (customContent) content = customContent;
    try {
      let message = Capture.startCaptureSync(id, total, content);
      res.send({ code: 200, message });
    } catch (e) {
      res.send({ code: 500, e });
    }
  })
  app.post('/stopCapture', (req, res) => {
    Capture.stopCaptureSync();
    res.send('stop');
  })
  app.post('/getCapture', async (req, res) => {
    // isPutInDB = false;
    let packDataArr = Capture.getCaptureResultSync();
    packDataArr.forEach((item, index) => {
      packDataArr[index] = JSON.parse(item)
    });
    totalPackData = packDataArr.filter(item => JSON.stringify(item) != '{}');
    res.json({ code: 200, message: '获取数据成功！', data: totalPackData });
  })
  app.post('/toSaveData', async (req, res) => {
    if (isPutInDB) {
      res.json({ code: 500, message: '数据已经存储过，请重新抓取！' });
      return
    }
    if (!totalPackData.length) {
      res.json({ code: 500, message: '没有数据可存储,请先抓取！' });
      return
    }
    let token = req.headers.authorization;
    let userInfo = toUserInfo(token);
    userInfo = userInfo.split('and')
    let { code, data, message } = await writeData(userInfo[0], userInfo[1], totalPackData); //将数据写入数据库
    if (code) {
      totalPackData = [];
    }
    isPutInDB = true;
    res.json({
      code: code ? 200 : 500,
      data: data,
      message
    });
  })
}