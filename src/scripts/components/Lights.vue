<template>
    <div v-if="devices">
        <div class="row">
            <div class="col-sm-12">
                <ul class="switches">
                    <li class="card-container switches--cursor" v-for="device in devices" v-if="device.idx === '56' || device.idx === '57'" @click="toggleSwitch(device.idx)">
                        <p class="text-center" v-if="devices.length === 0"><i class="fa fa-refresh fa-spin fa-fw"></i> Loading...</p>
                        <i class="fa fa-fw fa-lightbulb-o fa-2x" :class="{'light-on' : device.Status !== 'Off'}" aria-hidden="true"></i>
                        {{ device.Name }}<br/>
                        <small>Last updated: {{ device.LastUpdate | moment }}</small>
                    </li>
                </ul>
            </div>
            <div class="col-sm-12">
                <ul class="switches">
                    <li class="card-container switches--cursor" v-for="device in devices" v-if="device.idx === '49' || device.idx === '3'" @click="toggleSwitch(device.idx)">
                        <i class="fa fa-fw fa-2x" :class="{'light-on' : device.Status === 'On' && device.idx === '3', 'fa-lightbulb-o' : device.idx === '3', 'fa-tv' : device.idx === '49', 'tv-on' : device.Status === 'On' && device.idx === '49'}" aria-hidden="true"></i>
                        {{ device.Name }}<br/>
                        <small>Last updated: {{ device.LastUpdate | moment }}</small>
                    </li>
                </ul>
            </div>
            <div class="col-sm-12">
                <ul class="switches">
                    <li class="card-container switches--cursor" v-for="device in devices" v-if="device.idx === '2' || device.idx === '50' || device.idx === '1'" @click="toggleSwitch(device.idx)">
                        <p class="text-center" v-if="devices.length === 0"><i class="fa fa-refresh fa-spin fa-fw"></i> Loading...</p>
                        <i class="fa fa-fw fa-lightbulb-o fa-2x" :class="{'light-on' : device.Status === 'On'}" aria-hidden="true"></i>
                        {{ device.Name }}<br/>
                        <small>Last updated: {{ device.LastUpdate | moment }}</small>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div v-else>
        <p>error: {{ errorMsg }}</p>
    </div>
</template>

<script>
import { getDevicesAPI, getToggleAPI } from '../services/domoticz-api';
import moment from 'moment';

export default {
    name: 'lights',
    data() {
        return {
            devices: [],
            errorMsg: ''
        };
    },
    filters: {
        moment(date) {
            return moment(date).fromNow();
        }
    },
    methods: {
        moment() {
            return moment();
        },
        getDevices() {
            getDevicesAPI()
                .then(response => {
                    this.devices = response.data.result;
                })
                .catch(error => {
                    this.errorMsg = 'Alles is kapot!';
                    this.devices = null;
                });
        },
        toggleSwitch(deviceId) {
            getToggleAPI(deviceId)
                .then(response => {
                    this.getDevices();
                })
                .catch(error => {
                    this.errorMsg = 'Alles is kapot!';
                    this.devices = null;
                });
        }
    },
    mounted() {
        this.getDevices();
    }
};
</script>

<style lang="scss">

</style>
