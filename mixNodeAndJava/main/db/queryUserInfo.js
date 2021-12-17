// const { resolve, reject } = require('when');
let connection = require('./mysqlConn');
module.exports = async (id) => {
    let sql;
    return new Promise((resolve, reject) => {
        if (id) {
            sql = `SELECT * FROM users WHERE idusers=${id}`
        } else {
            resolve({ code: 0, userInfo: {} });   //0未查到
            return
        }
        connection.query(sql, (err, result) => {
            if (err || !result.length) {
                resolve({ code: 0, userInfo: {} });   //0未查到
            } else {
                resolve({ code: 1, userInfo: result });  //1查到
            }
        })
    })
}