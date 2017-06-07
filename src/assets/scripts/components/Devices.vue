<template>
    <div>
        <p v-if="devices">
            <ul>
                <li v-for="device in devices" @click="toggleSwitch(device.idx)">
                    {{ device.Name }}
                    {{ device.Status }}
                    {{ device.LastUpdate }}
                </li>
            </ul>
        </p>
        <p v-else>
            error: {{ errorMsg }}
        </p>
    </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)

const hostURL = 'http://192.168.0.101:8080/';
const devicesAPI = hostURL + 'json.htm?type=devices&filter=light&used=true&order=Name';

export default {
    name: 'light-switch',
    data () {
        return {
            devices: [],
            errorMsg: ''
        }
    },
    methods : {
        refreshData () {
            Vue.axios.get(devicesAPI).then(response => {
                this.devices = response.data.result;
            }).catch(error => {
                this.errorMsg = 'Alles is kapot!';
                this.devices = [];
            });
        },
        toggleSwitch (switchId) {
            const toggleSwitchApi = hostURL + `json.htm?type=command&param=switchlight&idx=${switchId}&switchcmd=Toggle`

            Vue.axios.get(toggleSwitchApi).then(response => {
                this.refreshData();
            }).catch(error => {
                this.errorMsg = 'Alles is kapot!';
                this.devices = [];
            });
        }
    },
    created () {
        this.refreshData();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
