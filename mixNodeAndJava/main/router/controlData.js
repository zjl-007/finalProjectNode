
const {
  delHistoryData,
  delUserData,
  delAllData,
  queryUserData,
} = require('../db/controlData')
module.exports = (app) => {
  app.post('/delHistoryData', async (req, res) => { //批量或单条
    let delDataIds = req?.body?.ids;
    let {code, data, message} = await delHistoryData(delDataIds); //删除用户数据
    res.json({
      code: code ? 200 : 500,
      data: data,
      message
    });
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