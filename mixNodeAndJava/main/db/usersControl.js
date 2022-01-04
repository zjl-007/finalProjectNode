
let connection = require('./mysqlConn');
const queryUserList = async () => {
    let sql;
    return new Promise((resolve) => {
        sql = `SELECT * FROM users`
        connection.query(sql, (err, result) => {
            if (err || !result.length) return resolve({ code: 0, userList: [], message: '未查找到数据' });   //0未查到
            resolve({ code: 1, userList: result, message: '数据获取成功' });  //1查到
        })
    })
}
const editUserInfo = async (idusers, data) => {
    let sql;
    return new Promise((resolve) => {
        sql = `UPDATE users SET username=?,password=?,email=?,telphone=?,description=?,powerlogin=?,powercapture=?,powerdb=? WHERE idusers = ${idusers}`
        var modSqlParams = data;
        connection.query(sql, modSqlParams, (err, result) => {
            if (err) return resolve({ code: 0, message: '数据更新失败', err });   //0未查到
            resolve({ code: 1, message: '数据更新成功' });  //1查到
        })
    })
}
module.exports = {
    queryUserList,
    editUserInfo
}