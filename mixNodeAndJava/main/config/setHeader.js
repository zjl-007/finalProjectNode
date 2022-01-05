const Jwt = require('./token')
const queryUserInfo = require('../db/queryUserInfo')
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
        let tokenResult = jwt.checkToken(token);  //token验证，返回加密的数据
        if (tokenResult instanceof Error) {
            return res.send({
                code: 501,
                message: '错误的token,请重新登录！',
                tokenResult
            })
        }
        if (id != tokenResult.split('and')[0]) {
            return res.send({
                code: 501,
                message: '用户id和token信息不匹配,请重新登录！',
            })
        }
        if (tokenResult.name == 'TokenExpiredError') {//token过期
            return res.send({
                code: 501,
                message: 'token过期,请重新登录！',
                tokenResult
            })
        }
        if (tokenResult.name == 'JsonWebTokenError') {//无效的token
            return res.send({
                code: 501,
                message: '无效的token,请重新登录！',
                tokenResult
            })
        }

        //登录权限控制
        let { userInfo } = await queryUserInfo(+tokenResult.split('and')[0]); 
        if (!userInfo[0]?.powerlogin) {
            return res.send({
                code: 501,
                message: "此账号已停用,请联系管理员开启!",
                data : userInfo.powerlogin,
            });
        }
        //抓包权限控制
        let capturePowerUrl = ['/startCapture','/getCapture'];
        if(!userInfo[0]?.powercapture && capturePowerUrl.includes(req.path)) {
            return res.send({
                code: 500,
                message: "抓包权限被关闭,请联系管理员开启!",
                data : userInfo.powercapture,
            });
        }
        //数据库权限控制
        let dbPowerUrl = ['/delUserHistoryData', '/delHistoryData', '/toSaveData']
        if(!userInfo[0]?.powerdb && dbPowerUrl.includes(req.path)) {
            return res.send({
                code: 500,
                message: "此账号无数据库权限,请联系管理员开启!",
                data : userInfo.powerdb,
            });
        }
        // if(req.path === '/delAllHistoryData' && +req?.body?.id !== +tokenResult.split('and')[0]) {
        //     return res.send({
        //         code: 500,
        //         message: "无权限,请联系管理员开启!",
        //         data : req.body,
        //         y:  req?.body?.id,
        //         x: tokenResult.split('and')[0]
        //     });
        // }
        next();
    });
}