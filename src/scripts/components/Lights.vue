<template>
    <div v-if="devices">
        <ul class="switches">
            <li class="card-container switches--cursor" v-for="device in devices" v-if="device.TypeImg === 'lightbulb' && device.Image === 'Light' && device.idx !== '53' && device.idx !== '2'" @click="toggleSwitch(device.idx)">
                <p class="text-center" v-if="devices.length === 0"><i class="fa fa-refresh fa-spin fa-fw"></i> Loading...</p>
                <i class="fa fa-fw fa-lightbulb-o fa-2x" :class="{'light-on' : device.Status === 'On'}" aria-hidden="true"></i>
                {{ device.Name }}<br/>
                <small>Last updated: {{ device.LastUpdate | moment }}</small>
            </li>
        </ul>
        <ul class="switches">
            <li class="card-container switches--cursor" v-for="device in devices" v-if="device.idx === '49' || device.idx === '3'" @click="toggleSwitch(device.idx)">
                <i class="fa fa-fw fa-2x" :class="{'light-on' : device.Status === 'On' && device.idx === '3', 'fa-lightbulb-o' : device.idx === '3', 'fa-tv' : device.idx === '49', 'tv-on' : device.Status === 'On' && device.idx === '49'}" aria-hidden="true"></i>
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
                this.devices = response.data.result;
            }).catch(error => {
                this.errorMsg = 'Alles is kapot!';
                this.devices = null;
            });
        },
        toggleSwitch (deviceId) {
            getToggleAPI (deviceId).then((response) => {
                this.getDevices();
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
