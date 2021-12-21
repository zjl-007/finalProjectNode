const Jwt = require('./token')
module.exports = (app) => {
    app.all('*', async function (req, res, next) {
        console.log("all 请求----------", req.params, req.body, req.path, req.method);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Methods', '*')
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        if (req.path === '/login') {
            next();
            return;
        }
        let token = req.headers.authorization;
        if (!token) {
            console.log('no token')
            res.send({
                data: {
                    code: 501,
                    message: '用户未登录,请重新登录！'
                },
            })
            return
        }
        console.log('hava token')
        let jwt = new Jwt();
        let result = jwt.checkToken(token);
        if (result.name == 'TokenExpiredError') {//token过期
            res.send({
                data: {
                    code: 501,
                    message: 'token过期,请重新登录！',
                    result
                }
            })
            return
        } else if (result.name == 'JsonWebTokenError') {//无效的token
            res.send({
                data: {
                    code: 501,
                    message: '无效的token,请重新登录！',
                    result
                }
            })
            return
        }
        next();
    });
}