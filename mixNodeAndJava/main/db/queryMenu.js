
let connection = require('./mysqlConn');
module.exports = async (menuid, role) => {
    let sql;
    return new Promise((resolve) => {
        if (!menuid) return resolve({ code: 0, menuList: [], status: 500, message: '错误的id值' });   //0未查到
        sql = `SELECT * FROM firstmenu WHERE usermenuid=${menuid}`;
        connection.query(sql, (err, result1) => {
            if (err || !result1.length) return resolve({ code: 0, status: 500, menuList: [], message: '未查找到数据' });   //0未查到
            let sqlChildMenu = '';
            let menuList = [];
            result1.forEach((item, index) => {
                sqlChildMenu = `SELECT * FROM firstmenu WHERE fatherid=${item.id} and role=${role}`;
                connection.query(sqlChildMenu, (err, result2) => {
                    if (err || !result2.length) return resolve({ code: 0, status: 500, menuList: [] });   //0未查到
                    item.childrenMenuList = result2;
                    menuList.push(item);
                    if(index == result1.length - 1) {
                        resolve({ code: 1, status: 200, menuList, message: '列表获取成功' });  //1查到
                    }
                })
            })
        })
    })
    
}