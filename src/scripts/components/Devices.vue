<template>
    <div v-if="devices">
        <div class="row">
            <div class="col-sm-12">
                <ul class="switches">
                    <li class="card-container" v-for="device in devices" v-if="device.Image === 'Phone'">
                        <p class="text-center" v-if="devices.length === 0"><i class="fa fa-refresh fa-spin fa-fw"></i> Loading...</p>
                        <i class="fa fa-fw fa-mobile fa-2x" :class="{'mobile-on' : device.Status === 'On'}" aria-hidden="true"></i>
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
import moment from 'moment';
import Vue from 'vue';

import { getDevicesAPI } from '../services/domoticz-api';

export default {
    name: 'devices',
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
                    this.devices = response.data.result.sort();
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
