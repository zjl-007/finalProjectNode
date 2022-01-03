const Capture = require("../../runMyClass");

module.exports = (app) => {
  app.post('/getDevices', (req, res) => {
    try {
      let devices = Capture.getDevicesInfoSync();
      let x;
      devices.length = devices.length/2; 
      devices.forEach((item, index) => {
        x = JSON.parse(item);
        devices[index] = {...x, ...x?.dev};
        delete devices[index].dev;
      })
      devices = [...(new Set(devices))]
      res.send({
        code: 200,
        message: '获取网卡列表成功',
        devices,
      });
    } catch (e) {
      res.send({
        code: 500,
        devices: [],
        message: '获取网卡列表失败',
        e,
      });
    }
  })  
}