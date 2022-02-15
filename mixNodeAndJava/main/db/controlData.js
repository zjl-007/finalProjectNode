/**
 * 向数据库写入获取到的包
 * 在capture.js中被引用
 */
const {deepClone, sortCountCaptureIp} = require('../util/tokenToUserInfo')
let connection = require('./mysqlConn');
let prePageSize = 10;
let userHistoryData = null; //保存每一次查询到的用户历史数据
let seachParams = null; //每次的查询参数
async function writeData(idusers = 110, userName, packDataArr) {
  let dataArr = [];
  let cacheArr = [idusers, userName];
  let dbNameArr = ['Caplen','SourceIp','TargetPort','SourceMacAddr','SecTime','ContractType','TargetIp','SourcePort','TargetMacAddr' ]
  packDataArr.forEach(item => {
    dbNameArr.forEach(value => {
      cacheArr.push(item[value]);
    })
    dataArr.push(cacheArr);
    cacheArr = [idusers, userName]
  })
  let sql;
  return new Promise((resolve) => {
    sql = `INSERT INTO historydata(idusers,username,Caplen,SourceIp,TargetPort,SourceMacAddr,SecTime,ContractType,TargetIp,SourcePort,TargetMacAddr) VALUES ?`;
    connection.query(sql, [dataArr], (err, result) => {
      if (!err) return resolve({ code: 1, message: '数据插入成功', data: result });   //0未查到
      resolve({ code: 0, message: '数据插入失败', data: err });  //1查到
    })
  })
}
function queryUserData(searchData) {
  return new Promise((resolve) => {
    seachParams = searchData;
    let { currentPageNum, pageSize } = searchData.pageParams || { currentPageNum: 1, pageSize: 10};
    if(JSON.stringify(searchData) == '{}') return resolve({ code: 0, message: '请检查参数！', data: null})
    let getTotalCountSql = `SELECT count(*) FROM historydata where ContractType like '%${searchData.ContractType}%' and idusers like '%${searchData.idusers}%' and  SecTime > '${searchData.startTime || 0}' and SecTime < '${searchData.endTime || Infinity}' and SourcePort like '%${searchData.SourcePort}%' and TargetPort like '%${searchData.TargetPort}%' and SourceIp like '%${searchData.SourceIp}%' and TargetIp like '%${searchData.TargetIp}%';`
    sql = `SELECT * FROM historydata where (ContractType like '%${searchData.ContractType}%') and idusers like '%${searchData.idusers}%' and  (SecTime > '${searchData.startTime || 0}' and SecTime < '${searchData.endTime || Infinity}') and SourcePort like '%${searchData.SourcePort}%' and TargetPort like '%${searchData.TargetPort}%' and SourceIp like '%${searchData.SourceIp}%' and TargetIp like '%${searchData.TargetIp}%';`;
    // sql = `select * from historydata limit ${searchData.pageParams.pageSize} OFFSET ${searchData.pageParams.currentPageNum} where (ContractType like '%${searchData.ContractType}%') and idusers like '%${searchData.idusers}%' and  SecTime > '${searchData.startTime || 0}' and SourcePort like '%${searchData.SourcePort}%' and TargetPort like '%${searchData.TargetPort}%' and SourceIp like '%${searchData.SourceIp}%' and TargetIp like '%${searchData.TargetIp}%'`
    sql = getTotalCountSql + sql;
    connection.query(sql, (err, result) => {
      if (err) return resolve({ code: 0, message: '数据获取失败', data: err });  //0未查到
      userHistoryData = deepClone(result);
      if(((currentPageNum - 1 )* pageSize) > +result[0][0]['count(*)']) currentPageNum = 1;
      if(prePageSize != pageSize && currentPageNum != 1) {
        result[1] = result[1].slice((currentPageNum - 1)*prePageSize, (currentPageNum-1)*pageSize + prePageSize);
      } else {
        result[1] = result[1].slice((currentPageNum - 1)*pageSize, (currentPageNum-1)*pageSize + pageSize);
      }
      prePageSize = pageSize;
      return resolve({ code: 1, message: '数据获取成功', data: {
        list: result[1],
        pageParams: {
          total: result[0][0]['count(*)'], 
          currentPageNum,
          pageSize,
        },
      } });   //1查到
    })
  })
}
function queryUserChartData() {
  return new Promise(resolve => {
    if(!userHistoryData) {
      return resolve({code: 0, message: '未查询到历史数据，请检查参数或稍后再试', data: null}); 
    }
    let res = sortCountCaptureIp(userHistoryData[1]);
    let sql = `select * from captureinfo where idusers like '%${seachParams.idusers || ''}%' and starttime>='${seachParams.startTime || 0}' and endtime<='${seachParams.endTime || Infinity}'`;
    console.log(sql)
    console.log(seachParams)
    connection.query(sql, (err, result) => {
      return resolve({ code: 1, message: '数据查询成功', data: {pieChartData: res, columnarData: result, err}});   //1查到
    })
  })
}
function delUserAllData(idusers) {
  return new Promise((resolve) => {
    if(!idusers) {
      return resolve({ code: 0, message: '错误的用户id或id为空！', data: null})
    }
    sql = `DELETE FROM historydata where idusers=${idusers};DELETE FROM captureinfo where idusers=${idusers};`;
    connection.query(sql, (err, result) => {
      if (err) resolve({ code: 0, message: '数据删除失败', data: err });  //0未查到
      return resolve({ code: 1, message: '数据删除成功' });   //1查到
    })
  })
}

function delAllHistoryData(idusers) {return new Promise((resolve) => {
  if(idusers != 110) {
    return resolve({ code: 0, message: '非超级管理员不得删除所有数据！', data: null})
  }
  sql = `DELETE FROM historydata`;
  connection.query(sql, (err, result) => {
      if (err) resolve({ code: 0, message: '数据删除失败', data: err });  //0未查到
      return resolve({ code: 1, message: '数据删除成功', data: result });   //1查到
    })
  })
  
}
function delIdsHistoryData(idsArr) {
  return new Promise((resolve) => {//批量或单条
    if(!idsArr.length) {
      return resolve({ code: 0, message: '参数列表为空！', data: null})
    } 
    let ids = ''  // 初始化批量存储Id的字符串格式
    for (let i = 0; i < idsArr.length; i++) {
      ids += "'" + idsArr[i] + "'" + ','
    }
    ids = ids.slice(0, ids.length - 1) // ids减去最后一个逗号，多个逗号不符合SQL语法，会报错
    sql = "delete from historydata where id in(" + ids + ")"; // in 是用来做批量删除的写法
    connection.query(sql, (err, result) => {
        if (err) resolve({ code: 0, message: '数据删除失败', data: err });  //0未查到
        return resolve({ code: 1, message: '数据删除成功', data: result });   //1查到
    })
  })
}
function saveCaptureInfo(data) {
  let sql;
  let dbNameArr = ['idusers', 'username','starttime','endtime','totalcaplen','totalsectime','totaldatalen'];
  let arr = [];
  dbNameArr.forEach(item => {arr.push(data[item])});
  sql = `INSERT INTO captureinfo(idusers,username,starttime,endtime,totalcaplen,totalsectime,totaldatalen) VALUES ?`;
  return new Promise((resolve) => {
    connection.query(sql, [[arr]], (err, result) => {
      if (!err) return resolve({ code: 1, message: '数据插入成功', data: result });   //0未查到
      resolve({ code: 0, message: '数据插入失败', data: err });  //1查到
    })
  })
}
module.exports = {
  writeData,
  delUserAllData,   //删除某一用户所有数据
  delAllHistoryData,//删除所有用户数据
  queryUserData,
  delIdsHistoryData,//根据id删除用户数据
  queryUserChartData,
  saveCaptureInfo,
}

