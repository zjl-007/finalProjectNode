// const { resolve, reject } = require('when');
let connection = require('./mysqlConn');
module.exports = async (id, username) => {
    let sql;
    return new Promise((resolve) => {
        if (username && !id) {
            sql = `SELECT * FROM users WHERE username=${username}`
            connection.query(sql, (err, result) => {
                if (err || !result.length) return resolve({ code: 0, userInfo: {}, message: '未查找到数据' });   //0未查到
                resolve({ code: 1, userInfo: result, message: '数据获取成功' });  //1查到
            })
            return
        }
        if (!id) return resolve({ code: 0, userInfo: {}, message: '错误的id值' });   //0未查到
        sql = `SELECT * FROM users WHERE idusers=${id}`
        connection.query(sql, (err, result) => {
            if (err || !result.length) return resolve({ code: 0, userInfo: {}, message: '未查找到数据' });   //0未查到
            resolve({ code: 1, userInfo: result, message: '数据获取成功' });  //1查到
        })
    })
}