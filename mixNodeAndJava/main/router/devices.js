const Capture = require("../../runMyClass");

module.exports = (app) => {
  app.post('/getDevices', (req, res) => {
    console.log('getDevices')
    try {
      let devices = Capture.getDevicesInfoSync();
    } catch (error) {
      console.log('获取错误', error)
    }
    
    //console.log(devices);
    res.send('re');
  })  
}