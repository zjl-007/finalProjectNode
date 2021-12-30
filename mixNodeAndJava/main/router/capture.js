const Capture = require("../../runMyClass");
const {writeData,
  delUserData,
  delAllData,
} = require('../db/controlData')
let totalPackData = []; //存放抓取的数据
module.exports = (app) => {
  app.post('/startCapture', (req, res) => {
    let message = Capture.startCaptureSync(-1);
    console.log(message);
    res.send(message);
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
    res.json(packDataArr);
  })
  app.post('/toSaveData', async (req, res) => {
    let idusers = req?.body?.id;
    if(!totalPackData.length) {
      res.json({code: 500, messge: '没有数据可存储,请先抓取！'});
      return
    }
    let result = await writeData(idusers, totalPackData); //将数据写入数据库
    res.json(result);
  })
  app.post('/delHistoryData', async (req, res) => {
    let idusers = req?.body?.id;
    let result = await delUserData(idusers); //删除用户数据
    res.json(result);
  })
  app.post('/delAllHistoryData', async (req, res) => {
    let idusers = req?.body?.id;
    let result = await delAllData(idusers); //删除所有用户数据
    res.json(result);
  })
}