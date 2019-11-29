const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;
 
const USERNAME = 'grS2gTFhk-i5u3civYG1go1u4zCCDB-I6INaal5F';
 
v3.discovery.nupnpSearch()
  .then(res => {
    const host = res[0].ipaddress;
    return v3.api.createLocal(host).connect(USERNAME);
  })
  .then(api => {
    api.lights.getAll()
      .then(lights => {
        // console.log(JSON.stringify(lights, null, 2));
        for (var light of lights){
          const state = new LightState()
            .transitionDefault()
            .on()
            .brightness(100)
            .effectColorLoop();
          api.lights.setLightState(light._id, state);
        }
    });
  });