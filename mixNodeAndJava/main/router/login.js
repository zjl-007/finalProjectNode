const connection = require('../db/mysqlConn');
const Jwt = require("../config/token")
module.exports = (app) => {
    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            res.send({
                data: {
                    code: 500,
                    message: "登录失败,请输入账号或密码!",
                },
            });
            return
        }

        // let sql = 'SELECT username FROM users';
        let sql = `SELECT * FROM users WHERE username='${username}'`
        connection.query(sql, (err, result) => {
            console.log(result);
            if (err || !result.length || (result[0].password != password)) {
                res.send({
                    data: {
                        code: 500,
                        message: "账号或密码错误,请重新输入!"
                    },
                });
                return
            }
            console.log(result)
            let jwt = new Jwt(String(result[0].idusers) + 'and' + String(result[0].username));
            let token = jwt.createdToken();
            res.send({
                data: {
                    token: token || '',
                    id: result[0].idusers,
                    code: 200,
                    message: '登录成功',
                },
            });
        })
    })
}