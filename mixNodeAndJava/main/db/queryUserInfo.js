let connection = require('./mysqlConn');
module.exports = (data) => {
    let queryData = data || {
        username: '',
        idusers: '',
    }
    let sql = `SELECT * FROM users WHERE username='${queryData.username || queryData.idusers}'`
    let rs = connection.query(sql, (err, result) => {
        
    })
    return rs;
}