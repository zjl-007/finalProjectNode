
let connection = require('./mysqlConn');
module.exports = async () => {
    let sql;
    return new Promise((resolve) => {
        sql = `SELECT * FROM users`
        connection.query(sql, (err, result) => {
            if (err || !result.length) return resolve({ code: 0, userList: [], message: '未查找到数据' });   //0未查到
            resolve({ code: 1, userList: result, message: '数据获取成功' });  //1查到
        })
    })
}