const user = require('../config.json').user;
var express = require('express');
var router = express.Router();

const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index_on', {title: 'Hue Control Panel'});
});

/* POST home page. */
router.post('/', function (req, res) {
  v3.discovery.nupnpSearch()
    .then(res => {
      const host = res[0].ipaddress;
      return v3.api.createLocal(host).connect(user);
    })
    .then(api => {
      api.lights.getAll()
        .then(lights => {
          const state = new LightState()
          for (var light of lights){ // Adjust each light connected to the hue bridge.
            switch(req.body.brightness) {
              case -1: //Turn ON
                state.transitionDefault().on()
                res.render('index_on', {title: 'Hue Control Panel'});
                break;
              case -2: //Turn OFF
                state.transitionDefault().off()
                res.render('index_off', {title: 'Hue Control Panel'});
                break;
              default: // Adjust brightness
                state.transitionDefault().on().brightness(req.body.brightness);
                res.render('index_on', {title: 'Hue Control Panel'});
            }
            api.lights.setLightState(light._id, state);
          }
      });
    })
    .catch(e => {
      res.render('switch_error', {error: e});
      console.log(`Error: ${e}`)
    });
});

module.exports = router;