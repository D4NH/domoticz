<template>
    <div v-if="devices" class="devices">
        <ul>
            <li class="light-switches" v-for="device in devices" v-if="device.TypeImg === 'lightbulb' && device.Image === 'Light' " @click="toggleSwitch(device.idx)">
                {{ device.Name }}
                {{ device.Status }}
                <br/>
                <small class="light-switches__blaat">{{ device.LastUpdate | moment }}</small>
            </li>
        </ul>

        <ul>
            <li v-for="device in devices" v-if="device.Image === 'Phone'">
                {{ device.Name }}
                {{ device.Status }}
                <br/>
                <small>{{ device.LastUpdate | moment }}</small>
            </li>
        </ul>

        <ul>
            <li v-for="device in devices" v-if="device.TypeImg === 'doorbell' || device.TypeImg === 'door'" @click="toggleSwitch(device.idx)">
                {{ device.Name }}
                {{ device.Status }}
                <br/>
                <small>{{ device.LastUpdate | moment }}</small>
            </li>
        </ul>
    </div>
    <div v-else>
        <p>error: {{ errorMsg }}</p>
    </div>
    </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import moment from 'moment';

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
    filters: {
        moment (date) {
            return moment(date).fromNow();
        }
    },
    methods : {
        moment () {
            return moment();
        },
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .devices {
        display: inline-block;
    }
    .light-switches {
        cursor: pointer;
    }
</style>
