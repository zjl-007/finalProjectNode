
const {
  delIdsHistoryData,
  delUserAllData,
  delAllHistoryData,
  queryUserData,
  queryUserChartData,
} = require('../db/controlData')
module.exports = (app) => {
  //批量或单条删除用户数据
  app.post('/delHistoryData', async (req, res) => { 
    let delDataIds = req?.body?.ids;
    let {code, data, message} = await delIdsHistoryData(delDataIds);
    res.json({
      code: code ? 200 : 500,
      data: data,
      message
    });
  })
  //删除用户所有数据
  app.post('/delUserHistoryData', async (req, res) => {
    let idusers = req?.body?.id;
    let {code, data, message} = await delUserAllData(idusers); 
    res.json({
      code: code ? 200 : 500,
      data: data,
      message
    });
  })
  //删除所有用户数据
  app.post('/delAllHistoryData', async (req, res) => {
    if(+req?.headers.idusers != 110) {
      res.json({
        code: 500,
        data: {},
        message: '无权限',
      });
    }
    let idusers = req?.body?.id;
    let {code, data, message} = await delAllHistoryData(idusers); 
    res.json({
      code: code ? 200 : 500,
      data: data,
      message
    });
  })
  //获取指定用户数据
  app.post('/getUserHistory', async (req, res) => {
    let searchData = req?.body || {};
    let {code, data, message} = await queryUserData(searchData); 
    res.json({
      code: code ? 200 : 500,
      data: data,
      message,
      searchData
    });
  })

  //获取历史图表页的数据
  app.post('/getUserChartHistory', async (req, res) => {
    let {code, data, message} = await queryUserChartData();
    res.json({
      code: code?200: 500,
      message,
      data: data,
    })
  })
}