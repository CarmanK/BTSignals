const v3 = require('node-hue-api').v3
  , discovery = v3.discovery
  , hueApi = v3.api
;

const appName = 'kevin';
const deviceName = 'main_bridge';

async function discoverBridge() {
  const discoveryResults = await discovery.nupnpSearch();

  if (discoveryResults.length === 0) {
    console.error('Failed to resolve any Hue Bridges');
    return null;
  } else {
    return discoveryResults[0].ipaddress;
  }
}

async function discoverAndCreateUser() {
  const ipAddress = await discoverBridge();

  // Create an unauthenticated instance of the Hue API so that we can create a new user
  const unauthenticatedApi = await hueApi.createLocal(ipAddress).connect();

  let createdUser;
  try {
    createdUser = await unauthenticatedApi.users.createUser(appName, deviceName);
    
    console.log(`Hue Bridge User: ${createdUser.username}`);
    console.log(`Hue Bridge User Client Key: ${createdUser.clientkey}`);

    // Create a new API instance that is authenticated with the new user we created
    const authenticatedApi = await hueApi.createLocal(ipAddress).connect(createdUser.username);

    // Do something with the authenticated user/api
    const bridgeConfig = await authenticatedApi.configuration.get();
    console.log(`Connected to Hue Bridge: ${bridgeConfig.name} :: ${bridgeConfig.ipaddress}`);

  } catch(err) {
    if (err.getHueErrorType() === 101) {
      console.error('The Link button on the bridge was not pressed. Please press the Link button and try again.');
    } else {
      console.error(`Unexpected Error: ${err.message}`);
    }
  }
}

// Invoke the discovery and create user code
discoverAndCreateUser();