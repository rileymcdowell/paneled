function isDevlopmentMode() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
}

if (isDevlopmentMode()) {
  console.log("Detected local development mode");
} else {
  console.log("Detected production mode");
}

const _LOCAL_BACKEND = "http://localhost:5000";
const _PRODUCTION_BACKEND = window.location.origin;

function getBackendUrl() {
  if (isDevlopmentMode() ) {
    return _LOCAL_BACKEND;
  } else {
    return _PRODUCTION_BACKEND;
  }
}

function fetchGET(uri) {
  return fetch(uri).then((x) => x.json());
}

function fetchPOST(uri, data) {
  return fetch(uri, { method: 'POST'
                    , mode: 'cors'
                    , cache: 'no-cache'
                    , headers: { 'Content-Type': 'application/json'}
                    , body: JSON.stringify(data)
                    });
}

function makeApiEndpoint(target) {
  return `${getBackendUrl()}/api/v1/${target}`;
}

export function getShadowTree() {
  return fetchGET(makeApiEndpoint("shadowtree"));
}

export function applyProposedPanelConfig(previousPanelConfig, proposedPanelConfig) {
  return fetchPOST(makeApiEndpoint("panel"), {previousPanelConfig, proposedPanelConfig});
}

export function applyProposedGroupConfig(previousGroupConfig, proposedGroupConfig) {
  return fetchPOST(makeApiEndpoint("group"), {previousGroupConfig, proposedGroupConfig});
}