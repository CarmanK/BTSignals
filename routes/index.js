const user = require('../config.json').user;
var express = require('express');
var router = express.Router();

const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Hue Control Panel'});
});

/* POST home page. */
router.post('/', function (req, res) {
  switch(req.body.brightness) {
    case -2: // Turn OFF
      v3.discovery.nupnpSearch()
      .then(res => {
        const host = res[0].ipaddress;
        return v3.api.createLocal(host).connect(user);
      })
      .then(api => {
        api.lights.getAll()
          .then(lights => {
            for (var light of lights){ // Adjust each light connected to the hue bridge.
              const state = new LightState()
                .transitionDefault()
                .off()
              api.lights.setLightState(light._id, state);
            }
        });
      })
      .catch(e => {
        console.log(`Error: ${e}`)
      });
      break;
    case -1: // Turn ON
      v3.discovery.nupnpSearch()
      .then(res => {
        const host = res[0].ipaddress;
        return v3.api.createLocal(host).connect(user);
      })
      .then(api => {
        api.lights.getAll()
          .then(lights => {
            for (var light of lights){ // Adjust each light connected to the hue bridge.
              const state = new LightState()
                .transitionDefault()
                .on()
              api.lights.setLightState(light._id, state);
            }
        });
      }).catch(e => {
        console.log(`Error: ${e}`)
      });
      break;
    default: // Adjust brightness
      v3.discovery.nupnpSearch()
      .then(res => {
        const host = res[0].ipaddress;
        return v3.api.createLocal(host).connect(user);
      })
      .then(api => {
        api.lights.getAll()
          .then(lights => {
            for (var light of lights){ // Adjust each light connected to the hue bridge.
              const state = new LightState()
                .transitionDefault()
                .on()
                .brightness(req.body.brightness);
              api.lights.setLightState(light._id, state);
            }
        });
      }).catch(e => {
        console.log(`Error: ${e}`)
      });
  }
});

module.exports = router;