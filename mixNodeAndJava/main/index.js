
const setHeader = require('./config/setHeader')
const useConfig = require('./config/useConfig')

const sys = require('./router/sys')
const login = require('./router/login')
const home = require('./router/home')
const capture = require('./router/capture')
const devices = require('./router/devices')

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
    sys(app);
    capture(app);
    devices(app);
}