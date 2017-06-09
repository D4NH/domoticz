import axios from 'axios';

const BASE_URL = 'http://192.168.0.101:8080';

export {
    getSunriseAPI,
    getDevicesAPI,
    getToggleAPI
};

function getSunriseAPI() {
    const getSunriseAPI = `${BASE_URL}/json.htm?type=command&param=getSunRiseSet`;
    return axios.get(getSunriseAPI).then(response => response);
}

function getDevicesAPI() {
    const devicesAPI = `${BASE_URL}/json.htm?type=devices&filter=light&used=true&order=Name`;
    return axios.get(devicesAPI).then(response => response);
}

function getToggleAPI(deviceId) {
    const toggleSwitchApi = `${BASE_URL}/json.htm?type=command&param=switchlight&idx=${deviceId}&switchcmd=Toggle`
    return axios.get(toggleSwitchApi).then(response => response);
}

// function getPrivateStartupBattles() {
//   const url = `${BASE_URL}/api/battles/private`;
//   return axios.get(url).then(response => response.data);
// }
