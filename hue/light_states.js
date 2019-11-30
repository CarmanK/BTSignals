const user = require('../config.json').user;
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;
 
v3.discovery.nupnpSearch()
  .then(res => {
    const host = res[0].ipaddress;
    return v3.api.createLocal(host).connect(user);
  })
  .then(api => {
    api.lights.getAll()
      .then(lights => {
        // console.log(JSON.stringify(lights, null, 2));
        // https://github.com/peter-murray/node-hue-api/blob/HEAD/docs/lightState.md
        for (var light of lights){ // Adjust each light connected to the hue bridge.
          const state = new LightState()
            .transitionDefault()
            .on()
            .brightness(100)
          api.lights.setLightState(light._id, state);
        }
    });
  });