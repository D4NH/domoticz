<template>
    <div v-if="devices" class="devices">
        <ul>
            <li class="switches" v-for="device in devices" v-if="device.Image === 'Phone'">
                <i class="fa fa-fw fa-mobile fa-2x" :class="{'mobile-on' : device.Status === 'On'}" aria-hidden="true"></i>
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
                this.devices = [];
            });
        }
    },
    mounted () {
        this.getDevices();
    }
}
</script>

<style lang="scss">
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
    .mobile-on {
        color: #01848F;
    }
</style>
