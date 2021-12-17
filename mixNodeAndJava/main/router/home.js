const queryUserInfo = require('../db/queryUserInfo')
const queryMenu = require('../db/queryMenu')
module.exports = (app) => {
    app.post('/getUserInfo', async (req, res) => {
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
        const { code, menuList } = await queryMenu(id);
        console.log(menuList)
        res.send({
            data: {
                code,
                menuList
            }
        });
    })
}