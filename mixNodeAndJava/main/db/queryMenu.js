// const { resolve, reject } = require('when');
let connection = require('./mysqlConn');
module.exports = async (id) => {
    let sql;
    return new Promise((resolve, reject) => {
        if (id) {
            sql = `SELECT * FROM firstmenu WHERE id=${id}`
        } else {
            resolve({ code: 0, menuList: [] });   //0未查到
            return
        }
        
        connection.query(sql, (err, result1) => {
            console.log(sql);
            if (err || !result1.length) {
                resolve({ code: 0, menuList: [] });   //0未查到
            } else {
                // let sql1 = `SELECT * FROM firstmenu WHERE fatherid=${result1[0].menuid}`
                // console.log(result1 + 'fdsafdsadsaf');
                // connection.query(sql1, (err, result2) => {
                //     if (err || !result2.length) {
                //         resolve({ code: 0, menuList: [] });   //0未查到
                //     } else {
                //         resolve({ code: 1, menuList: result2 });  //1查到
                //     }
                // })
                resolve({ code: 1, menuList: result1 });  //1查到
            }
        })
    })
}