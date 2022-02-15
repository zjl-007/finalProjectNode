const Capture = require("../../runMyClass");
const { toUserInfo } = require("../util/tokenToUserInfo")
const {
  writeData,
  saveCaptureInfo,
} = require('../db/controlData')
let totalPackData = []; //存放抓取的数据
let isPutInDB = false; //是否存入过数据库
let startParams = {   //抓取参数对象
  total: 10,
  protocol: 'ip',
  id: 0,
}
let token;
let userInfo;
let captureInfo = {
  idusers: '',
  username: '',
  starttime: '',
  endtime: '',
  totalcaplen: 0,
  totalsectime: '',
  totaldatalen: '',
};
//保存一些实时信息
let nowCaptureInfo = {
  dataLen: 0,
  totalTime: 0,
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
    nowCaptureInfo = {dataLen: 0,totalTime: 0}
    totalPackData = [];
    try {
      let message = Capture.startCaptureSync(id, total, content);
      token = req.headers.authorization;userInfo = toUserInfo(token);
      userInfo = userInfo.split('and')
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
    nowCaptureInfo.dataLen = 0; 
    packDataArr.forEach((item,index) => {
      if(JSON.stringify(JSON.parse(item)) != '{}') {
        totalPackData[index] = JSON.parse(item)
        totalPackData[index].users = userInfo[1];
        nowCaptureInfo.dataLen += Number(totalPackData[index].Caplen)
        nowCaptureInfo.totalTime = totalPackData[totalPackData.length - 1].SecTime - totalPackData[0].SecTime
      }
    })

    res.json({ code: 200, message: '获取数据成功！', data: totalPackData, info: nowCaptureInfo });
  })
  app.post('/toSaveData', async (req, res) => {
    if (isPutInDB) return res.json({ code: 500, message: '数据已经存储过，请重新抓取！' });
    if (!totalPackData.length) return res.json({ code: 500, message: '没有数据可存储,请先抓取！' });
    let { code, data, message } = await writeData(userInfo[0], userInfo[1], totalPackData,); //将数据写入数据库

    captureInfo.idusers = userInfo[0];
    captureInfo.username = userInfo[1];
    captureInfo.starttime = totalPackData[0].SecTime;
    captureInfo.endtime = totalPackData[totalPackData.length - 1].SecTime;
    captureInfo.totalsectime = totalPackData[totalPackData.length - 1].SecTime - totalPackData[0].SecTime;
    captureInfo.totaldatalen = totalPackData.length;
    totalPackData.forEach(item => {captureInfo.totalcaplen = +captureInfo.totalcaplen + +item.Caplen;});
    captureInfo.totalcaplen += '';
    if(!captureInfo.totalsectime) captureInfo.totalsectime = 1; 
    let x = await saveCaptureInfo(captureInfo); //记录信息
    Object.keys(captureInfo).forEach(item => captureInfo[item] = '');

    if (code) totalPackData = [];
    isPutInDB = true;
    res.json({
      code: code ? 200 : 500,
      data: data,
      message,
      x
    });
  })
}