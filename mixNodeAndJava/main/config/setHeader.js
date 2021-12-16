const Jwt = require('./token')
const queryUserInfo = require('../db/queryUserInfo')
module.exports = (app) => {
    app.all('*', function (req, res, next) {
        console.log("all 请求----------", req.params, req.body, req.path, req.method);
        if (req.path !== '/login') {
            let token = req.headers.authorization;
            if (!token || token === '') {
                console.log('no token')
                res.send({
                    data: {
                        code: 500,
                        message: '用户未登录,请重新登录！'
                    },
                })
            } else {
                console.log('hava token')
                let jwt = new Jwt();
                let result = jwt.checkToken(token);
                if (result instanceof Error) {
                    res.send({
                        data: {
                            code: 500,
                            message: '身份认证失败,请重新登录！'
                        }
                    })
                    return
                }
                console.log(queryUserInfo({username: 'admin'}))
            }
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Methods', '*')
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        next()
    });
}