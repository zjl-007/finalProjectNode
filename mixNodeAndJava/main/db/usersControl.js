
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
const delUser = async (idusers, data) => {
    let sql;
    let delUserDataSql = `DELETE FROM historydata where idusers=${idusers};`;
    return new Promise((resolve) => {
        sql = `DELETE FROM users WHERE idusers = ${idusers};`
        sql = sql + delUserDataSql;
        var modSqlParams = data;
        connection.query(sql, modSqlParams, (err, result) => {
            if (err) return resolve({ code: 0, message: '删除用户失败', data: err });   //0未查到
            resolve({ code: 1, message: '删除用户成功', data: {} });  //1查到
        })
    })
}
const addUser = async (data) => {
    let insertArr = ['username','password','telphone','email','description','powerlogin','powercapture','powerdb'];
    let addData = [];
    insertArr.forEach(item => addData.push(data[item]));
    addData.push(1);  //status
    addData.push(1); //role==1
    addData.push(200); //menuid==1
    let sql;
    return new Promise((resolve) => {
        sql = `INSERT INTO users(username,password,telphone,email,description,powerlogin,powercapture,powerdb,status,role,menuid) VALUES(?,?,?,?,?,?,?,?,?,?,?)`
        var modSqlParams = addData;
        connection.query(sql, modSqlParams, (err, result) => {
            if (err) return resolve({ code: 0, message: '添加用户失败', data: err,});   //0未查到
            resolve({ code: 1, message: '添加用户成功', data: {} });  //1查到
        })
    })
}
module.exports = {
    queryUserList,
    editUserInfo,
    delUser,
    addUser
}