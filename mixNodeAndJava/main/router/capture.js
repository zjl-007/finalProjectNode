const Capture = require("../../runMyClass");

module.exports = (app) => {
  app.post('/startCapture', (req, res) => {
    let message = Capture.startCaptureSync(-1);
    console.log(message);
    res.send(message);
  })  
  app.post('/stopCapture', (req, res) => {
    Capture.stopCaptureSync();
    res.send('stop');
  })
  app.post('/getCapture', (req, res) => {
    console.log('get');
    let result = Capture.getCaptureResultSync();
    result.forEach((item, index) => {
      result[index] = JSON.parse(item)
    });
    res.json(result);
  })
}