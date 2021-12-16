const login = require('./router/login')
const setHeader = require('./config/setHeader')
const useConfig = require('./config/useConfig')

require('./db/mysqlConn')
module.exports = (app) => {
    /**
     * app.use config begin
     */
    useConfig(app);

    /**
     * app router begin
     * 
     */
    login(app);
    setHeader(app);

}