<template>
    <div v-if="devices" class="devices">
        <ul class="switches">
            <li class="card-container" v-for="device in devices" v-if="device.idx === '38' || device.idx === '31' || device.idx === '46'">
                <p class="text-center" v-if="devices.length === 0"><i class="fa fa-refresh fa-spin fa-fw"></i> Loading...</p>
                <i class="fa fa-fw fa-home fa-2x" :class="{'home-on' : device.Status === 'Open'}" aria-hidden="true"></i>
                {{ device.Name }} {{ device.Status }} <br/>
                <small>Last updated: {{ device.LastUpdate | moment }}</small>
            </li>
        </ul>

        <ul class="switches">
            <li class="card-container">
                <i class="fa fa-fw fa-video-camera fa-2x" aria-hidden="true"></i>
                Camera<br/>
                <small>HIKVision</small>
                <br/><br/>
                <ip-cam>Loading...</ip-cam>
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

import { getDevicesAPI } from '../services/domoticz-api';

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
                this.devices = null;
            });
        }
    },
    mounted () {
        this.getDevices();
    }
}
</script>

<style lang="scss">
</style>
