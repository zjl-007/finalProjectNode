// 引入模块依赖
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const e = require('express');
// 创建 token 类
class Jwt {
    constructor(data) {
        this.data = data;

    }


    //简易token生成
    createdToken() {
        let data = this.data;
        let created = Math.floor(Date.now() / 1000);
        let token = jwt.sign({
            data,
            exp: created + 60 * 30,
        }, 'secret')
        return token
    }

    //
    checkToken(token) {
        let res;
        let result;
        try {
            result = jwt.verify(token, 'secret')
            let {exp = 0} = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch(e) {
            res = e;
        }
        return res;
    }
    //生成token
    // generateToken() {
    //     let data = this.data;
    //     let created = Math.floor(Date.now() / 1000);
    //     let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_private_key.pem'));//私钥 可以自己生成
    //     // let token = jwt.sign({
    //     //     data: '123',
    //     //     exp: created + 60 * 30,
    //     // }, 'secret', {algorithm: 'RS256'});
    //     token = jwt.sign({
    //         foo: 'foo'
    //     }, 'secret', {algorithm: 'RS256'});
    //     return token || '';
    // }

    // // 校验token
    // verifyToken() {
    //     let token = this.data;
    //     let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_public_key.pem'));//公钥 可以自己生成
    //     let res;
    //     try {
    //         let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
    //         let {exp = 0} = result, current = Math.floor(Date.now() / 1000);
    //         if (current <= exp) {
    //             res = result.data || {};
    //         }
    //     } catch (e) {
    //         res = 'err';
    //     }
    //     return res;
    // }
}

module.exports = Jwt;