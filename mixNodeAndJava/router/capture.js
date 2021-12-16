const myclass = require('../runMyClass.js')

module.exports = (app) => {
    app.post('/capture/start', function (req, res) {
        //res.send(JSON.stringify(res));
        myclass.startSync();
        res.send('suceesssssssss');
    })
    app.post('/capture/stop', function (req, res) {
        //res.send(JSON.stringify(res));
        myclass.stopSync();
        res.send('stopppppppppp');
    })
    app.post('/get', function (req, res) {
        const data = myclass.getInfoSync();
        console.log(data);
        res.send(data);
    })
}