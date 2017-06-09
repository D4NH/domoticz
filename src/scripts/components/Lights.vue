<template>
    <div v-if="devices" class="devices">
        <ul>
            <li class="card card--cursor" v-for="device in devices" v-if="device.TypeImg === 'lightbulb' && device.Image === 'Light' && device.idx !== '1'" @click="toggleSwitch(device.idx)">
                <i class="fa fa-fw fa-lightbulb-o fa-2x" :class="{'light-on' : device.Status === 'On'}" aria-hidden="true"></i>
                {{ device.Name }}<br/>
                <small>Last updated: {{ device.LastUpdate | moment }}</small>
            </li>
        </ul>

        <ul>
            <li class="card card--cursor" v-for="device in devices" v-if="device.idx === '10' || device.idx === '1'" @click="toggleSwitch(device.idx)">
                <i class="fa fa-fw fa-2x" :class="{'light-on' : device.Status === 'On' && device.idx === '1', 'fa-lightbulb-o' : device.idx === '1', 'fa-tv' : device.idx === '10', 'tv-on' : device.Status === 'On' && device.idx === '10'}" aria-hidden="true"></i>
                {{ device.Name }}<br/>
                <small>Last updated: {{ device.LastUpdate | moment }}</small>
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


import { getDevicesAPI, getToggleAPI } from '../services/domoticz-api';

export default {
    name: 'lights',
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
    .card {
        &--cursor {
            cursor: pointer;
        }
    }
    .light-on {
        color: #FCD837;
    }
    .tv-on {
        color: #01848F;
    }
</style>
