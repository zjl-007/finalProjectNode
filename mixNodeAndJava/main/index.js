const login = require('./router/login')
const home = require('./router/home')
const setHeader = require('./config/setHeader')
const useConfig = require('./config/useConfig')

require('./db/mysqlConn')
module.exports = (app) => {
    /**
     * app.use config begin
     */
    useConfig(app);


    /**
     * app setHeader
     */
    setHeader(app);

    
    /**
     * app router begin
     * 
     */
    login(app);
    home(app);

}