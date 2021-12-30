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
        let id = req?.headers.idusers;
        if (!token) {
            console.log('no token')
            res.send({
                code: 501,
                message: '用户未登录,请重新登录！'
            })
            return
        }
        let jwt = new Jwt();
        let result = jwt.checkToken(token);
        if (result instanceof Error) {
            return res.send({
                code: 501,
                message: '错误的token,请重新登录！',
                result
            })
        }
        if (id != result.split('and')[0]) {
            return res.send({
                code: 501,
                message: '用户id和token信息不匹配,请重新登录！',
            })
        }
        if (result.name == 'TokenExpiredError') {//token过期
            return res.send({
                code: 501,
                message: 'token过期,请重新登录！',
                result
            })
        }
        if (result.name == 'JsonWebTokenError') {//无效的token
            return res.send({
                code: 501,
                message: '无效的token,请重新登录！',
                result
            })
        }
        next();
    });
}