/**
 * 向数据库写入获取到的包
 * 在capture.js中被引用
 */
let connection = require('./mysqlConn');
async function writeData(idusers = 110, packDataArr) {
  let dataArr = [];
  let cacheArr = [idusers];
  packDataArr.forEach(item => {
    Object.keys(item).forEach(value => {
      cacheArr.push(item[value]);
    })
    dataArr.push(cacheArr);
    cacheArr = [idusers]
  })
  let sql;
  return new Promise((resolve) => {
    sql = `INSERT INTO historydata(idusers,Caplen,ContractType,SecTime,SourceIp,SourceMacAddr,SourcePort,TargetIp,TargetMacAddr,Targetport) VALUES ?`;
    connection.query(sql, [dataArr], (err, result) => {
      if (!err) return resolve({ code: 1, message: '数据插入成功', data: result });   //0未查到
      resolve({ code: 0, message: '数据插入失败', data: err });  //1查到
    })
  })
}

function delUserData(id) {
  return new Promise((resolve) => {
    if(!id) {
      return resolve({ code: 0, message: '错误的用户id或id为空！', data: null})
    }
    sql = `DELETE FROM websites where id=${id}`;
    connection.query(sql, (err, result) => {
      if (err) resolve({ code: 0, message: '数据删除失败', data: err });  //0未查到
      return resolve({ code: 1, message: '数据删除成功', data: result });   //1查到
    })
  })
}

function delAllData(id) {return new Promise((resolve) => {
  if(id != 110) {
    return resolve({ code: 0, message: '非超级管理员不得删除所有数据！', data: null})
  }
  sql = `DELETE FROM websites where id=*`;
  connection.query(sql, (err, result) => {
      if (err) resolve({ code: 0, message: '数据删除失败', data: err });  //0未查到
      return resolve({ code: 1, message: '数据删除成功', data: result });   //1查到
    })
  })
  
}
module.exports = {
  writeData,
  delUserData,
  delAllData
}