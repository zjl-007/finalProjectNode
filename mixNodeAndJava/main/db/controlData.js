/**
 * 向数据库写入获取到的包
 * 在capture.js中被引用
 */
let connection = require('./mysqlConn');
async function writeData(idusers = 110, userName, packDataArr) {
  let dataArr = [];
  let cacheArr = [idusers, userName];
  packDataArr.forEach(item => {
    Object.keys(item).forEach(value => {
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
function queryUserData(idusers) {
  return new Promise((resolve) => {
    if(!idusers) {
      return resolve({ code: 0, message: '错误的用户id或id为空！', data: null})
    }
    sql = `SELECT * FROM historydata where idusers=${idusers}`;
    connection.query(sql, (err, result) => {
      if (err) resolve({ code: 0, message: '数据获取失败', data: err });  //0未查到
      return resolve({ code: 1, message: '数据获取成功', data: result });   //1查到
    })
  })
}
function delUserData(idusers) {
  return new Promise((resolve) => {
    if(!idusers) {
      return resolve({ code: 0, message: '错误的用户id或id为空！', data: null})
    }
    sql = `DELETE FROM historydata where idusers=${idusers}`;
    connection.query(sql, (err, result) => {
      if (err) resolve({ code: 0, message: '数据删除失败', data: err });  //0未查到
      return resolve({ code: 1, message: '数据删除成功', data: result });   //1查到
    })
  })
}

function delAllData(idusers) {return new Promise((resolve) => {
  if(idusers != 110) {
    return resolve({ code: 0, message: '非超级管理员不得删除所有数据！', data: null})
  }
  sql = `DELETE FROM historydata where idusers=*`;
  connection.query(sql, (err, result) => {
      if (err) resolve({ code: 0, message: '数据删除失败', data: err });  //0未查到
      return resolve({ code: 1, message: '数据删除成功', data: result });   //1查到
    })
  })
  
}
function delHistoryData(idsArr) {return new Promise((resolve) => {//批量或单条
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

module.exports = {
  writeData,
  delUserData,
  delAllData,
  queryUserData,
  delHistoryData
}