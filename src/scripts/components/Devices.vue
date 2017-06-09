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
                {{ device.Name }}<br/>
                <small>{{ device.LastUpdate | moment }}</small>
            </li>
        </ul>

        <ul>
            <li class="switches">
                <i class="fa fa-fw fa-video-camera fa-2x" aria-hidden="true"></i>
                Camera<br/>
                <small>HIKVision</small>
                <br/><br/>
                <ip-cam>Loading...</ip-cam>
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
import moment from 'moment';
import Vue from 'vue';

import IpCam from './IpCam';
Vue.component('ip-cam', IpCam);

import { getDevicesAPI, getToggleAPI } from '../services/domoticz-api';

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
        getDevices () {
            getDevicesAPI ().then((response) => {
                this.devices = response.data.result.sort();
            }).catch(error => {
                this.errorMsg = 'Alles is kapot!';
                this.devices = [];
            });
        },
        toggleSwitch (deviceId) {
            getToggleAPI (deviceId).then((response) => {
                this.getDevices();
            }).catch(error => {
                this.errorMsg = 'Alles is kapot!';
                this.devices = [];
            });
        }
    },
    mounted () {
        this.getDevices();
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
