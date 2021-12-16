const Jwt = require('../main/config/token')
module.exports = (app) => {
    app.all('*', function (req, res, next) {
        console.log("all 请求----------", req.params, req.body, req.path, req.method);
        if (req.path !== '/login') {
            let token = req.headers.authorization;
            if (!token || token === '') {
                res.send({
                    data: {
                        code: 500,
                        message: '用户未登录,请重新登录！'
                    },
                })
            } else {
                console.log('hava token')
                let jwt = new Jwt();
                try {
                    let res = jwt.checkToken('token');
                    console.log('errrrr',res);
                } catch(e) {
                    res.send({
                        data: {
                            code: 500,
                            message: '身份认证失败,请重新登录！'
                        }
                    })
                }
            }
            return
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Methods', '*')
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        next()
    });
}