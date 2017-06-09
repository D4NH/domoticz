<template>
    <div v-if="devices" class="devices">
        <ul>
            <li class="switches switches--cursor" v-for="device in devices" v-if="device.TypeImg === 'lightbulb' && device.Image === 'Light'" @click="toggleSwitch(device.idx)">
                <i class="fa fa-fw fa-lightbulb-o fa-2x" :class="{'light-on' : device.Status === 'On'}" aria-hidden="true"></i>
                {{ device.Name }}<br/>
                <small>{{ device.LastUpdate | moment }}</small>
            </li>
        </ul>

        <ul>
            <li class="switches" v-for="device in devices" v-if="device.Image === 'Phone'">
                <i class="fa fa-fw fa-mobile fa-2x" :class="{'mobile-on' : device.Status === 'On'}" aria-hidden="true"></i>
                {{ device.Name }} {{ device.Status }}<br/>
                <small>{{ device.LastUpdate | moment }}</small>
            </li>
        </ul>

        <ul>
            <li class="switches">
                <img id="hikvision" src="http://192.168.0.102:8010/streaming/channels/1/picture" />
            </li>
        </ul>

        <ul>
            <li class="switches" v-for="device in devices" v-if="device.TypeImg === 'doorbell' || device.TypeImg === 'door'" @click="toggleSwitch(device.idx)">
                <i class="fa fa-fw fa-home fa-2x" :class="{'home-on' : device.Status === 'Open'}" aria-hidden="true"></i>
                {{ device.Name }} {{ device.Status }} <br/>
                <small>{{ device.LastUpdate | moment }}</small>
            </li>
        </ul>
    </div>
    <div v-else>
        <p>error: {{ errorMsg }}</p>
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
    name: 'devices',
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
        },
        reloadCamStream () {
            setInterval(function() {
                console.log('reloading');
                document.getElementById('hikvision').src = 'http://192.168.0.102:8010/streaming/channels/1/picture?rand=' + Math.random();
            }, 1000);
        }
    },
    created () {
        this.refreshData();
    },
    ready () {
        this.reloadCamStream();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .devices {
        ul {
            list-style: none;
            margin-left: 0;
            padding-left: 0;
        }
    }
    .switches {
        background-color: white;
        padding: 15px;
        border-bottom: 1px solid #F2F5F7;
        &:last-of-type { border-bottom: none }

        &--cursor {
            cursor: pointer;
        }

        img {
            width: 100%;
        }

        i {
            float: left;
            margin-right: 15px;
            margin-top: 5px;
        }
    }
    .light-on {
        color: #FCD837;
    }
    .mobile-on {
        color: #01848F;
    }
    .home-on {
        color: #F44336;
    }
</style>
