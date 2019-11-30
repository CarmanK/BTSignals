const user = require('../config.json').user;
var express = require('express');
var router = express.Router();

const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Hue Control Panel',
    user: user
  });
});

/* POST home page. */
router.post('/', function (req, res) {
  console.log(req.body.bri);
  // v3.discovery.nupnpSearch()
  // .then(res => {
  //   const host = res[0].ipaddress;
  //   return v3.api.createLocal(host).connect(USERNAME);
  // })
  // .then(api => {
  //   api.lights.getAll()
  //     .then(lights => {
  //       // console.log(JSON.stringify(lights, null, 2));
  //       // https://github.com/peter-murray/node-hue-api/blob/HEAD/docs/lightState.md
  //       for (var light of lights){ // Adjust each light connected to the hue bridge.
  //         const state = new LightState()
  //           .transitionDefault()
  //           .on()
  //           .brightness(req.body.bri);
  //         api.lights.setLightState(light._id, state);
  //       }
  //   });
  // });
  // res.render('index', { title: 'Hue Control Panel' });
});

module.exports = router;
