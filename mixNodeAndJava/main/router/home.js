const queryUserInfo = require('../db/queryUserInfo')
const queryMenu = require('../db/queryMenu')
module.exports = (app) => {
    app.post('/getNowUserInfo', async (req, res) => {
        let id = req?.body?.id;
        const { code, userInfo } = await queryUserInfo(id);
        if (!id || !code) {
            res.send({
                data: {
                    data: {},
                    code: 500,
                    message: '查询用户信息失败！'
                },
            });
            return
        }
        res.send({
            data: {
                data: userInfo[0],
                code: 200,
                message: '查询用户信息成功！'
            },
        });
    })
    app.post('/getMenus', async (req, res) => {
        let id = req?.body?.id;
        const { userInfo } = await queryUserInfo(id);
        if (!id || !userInfo.length) {
            res.send({
                data: {
                    data: {},
                    code: 500,
                    message: '用户信息有误！'
                },
            });
            return
        }
        let menuid = userInfo[0].menuid;
        const { code, status, menuList, message } = await queryMenu(menuid);
        res.send({
            data: {
                code: status,
                menuList,
                message,
                info: 'menus',
            }
        });
    })
}