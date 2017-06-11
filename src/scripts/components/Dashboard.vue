<template>
    <div class="dashboard container">
        <div class="row">
            <div class="col-sm-4 lights">
                <p class="text-center" v-if="devices.length === 0"><i class="fa fa-refresh fa-spin fa-fw"></i> Loading...</p>
                <div class="card-container">
                    <div v-if="devices">
                        <ul>
                            <li class="switches--cursor" v-for="device in devices" v-if="device.TypeImg === 'lightbulb' && device.Image === 'Light' && device.idx !== '1'" @click="toggleSwitch(device.idx)">
                                <i class="fa fa-fw fa-lightbulb-o fa-2x" :class="{'light-on' : device.Status === 'On'}" aria-hidden="true"></i>
                                {{ device.Name }}<br/>
                                <small>Last updated: {{ device.LastUpdate | moment }}</small>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <p>error: {{ errorMsg }}</p>
                    </div>
                </div>
                <div class="card-container">
                    <div v-if="devices">
                        <ul>
                            <li class="switches--cursor" v-for="device in devices" v-if="device.idx === '10' || device.idx === '1'" @click="toggleSwitch(device.idx)">
                                <i class="fa fa-fw fa-2x" :class="{'light-on' : device.Status === 'On' && device.idx === '1', 'fa-lightbulb-o' : device.idx === '1', 'fa-tv' : device.idx === '10', 'tv-on' : device.Status === 'On' && device.idx === '10'}" aria-hidden="true"></i>
                                {{ device.Name }}<br/>
                                <small>Last updated: {{ device.LastUpdate | moment }}</small>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <p>error: {{ errorMsg }}</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-3 weather-report">
                <p class="text-center" v-if="weatherToday.length === 0"><i class="fa fa-refresh fa-spin fa-fw"></i> Loading...</p>
                <div class="card-container">
                    <div class="weather-today" v-for="today in weatherToday">
                        <p>
                            {{ today.date | momentCal }}<br/>
                            <small>{{ today.date }}</small>
                        </p>
                        <img :src="today.day.condition.icon" :alt="today.day.condition.text">
                        <p class="weather-condition">{{ today.day.condition.text }}</p>
                        <p>
                            <span class="weather-temp">{{ today.day.avgtemp_c | roundUp }}&deg;C</span><br/>
                            <span class="weather-minmaxtemp">{{ today.day.maxtemp_c | roundUp }}&deg;C / {{ today.day.mintemp_c | roundUp }}&deg;C</span>
                        </p>
                    </div>
                </div>
                <img class="buienradar" border="0" src="//api.buienradar.nl/image/1.0/RadarMapNL">
            </div>
            <div class="col-sm-5 house">
                <p class="text-center" v-if="devices.length === 0"><i class="fa fa-refresh fa-spin fa-fw"></i> Loading...</p>
                <div class="card-container">
                    <ul>
                        <li v-for="device in devices" v-if="device.idx === '38' || device.idx === '31'">
                            <i class="fa fa-fw fa-home fa-2x" :class="{'home-on' : device.Status === 'Open'}" aria-hidden="true"></i>
                            {{ device.Name }} {{ device.Status }} <br/>
                            <small>Last updated: {{ device.LastUpdate | moment }}</small>
                        </li>
                    </ul>
                </div>
                <div class="cam-container" :class="{'popup': popup}" @click="togglePopup">
                    <ip-cam></ip-cam>
                </div>
            </div>
        </div>
        <!-- <div class="row">
            <div class="col-sm-4 lights">
                <div class="card-container">
                    <p>Je weet zelluf</p>
                </div>
            </div>
            <div class="col-sm-4 weather-report">
                <div class="card-container">
                    <p>Blaat</p>
                </div>
            </div>
            <div class="col-sm-4 weather-report">
                <div class="card-container">
                    <p>Camera</p>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import moment from 'moment';
import { getDevicesAPI, getToggleAPI, getWeatherTodayAPI, getWeatherForecastAPI } from '../services/domoticz-api';

export default {
    name: 'dashboard',
    data () {
        return {
            popup: false,
            devices: [],
            weatherToday: [],
            errorMsg: ''
        }
    },
    filters: {
        roundUp (value) {
            return Math.ceil(value);
        },
        moment (date) {
            return moment(date).fromNow();
        },
        momentCal (date) {
            return moment(date).calendar(null, {
                sameDay: '[Today]',
                nextDay: 'dddd',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: 'DD/MM/YYYY'
            });
        }
    },
    methods : {
        togglePopup () {
            this.popup = !this.popup;
        },
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
        },
        getWeatherToday () {
            getWeatherTodayAPI().then((response) => {
                this.weatherToday = response.data.forecast.forecastday;
            }).catch(error => {
                this.errorMsg = 'Alles is kapot!';
                this.weatherToday = [];
            });
        }
    },
    mounted () {
        this.getDevices();
        this.getWeatherToday();
    }
}
</script>

<style lang="scss">
    .row {
        margin-bottom: 8px;
    }
    .lights, .house {
        .card-container {
            margin-bottom: 8px;
        }
        li {
            padding: 9.7px;
        }
    }
    .house {
        overflow: hidden;
        .cam-container {
            background-color: white;
        }
        .box {
            height: 299px;
            margin: 0 auto;
            img {
                position: absolute;
                bottom: -110px;
            }
        }
    }
    .popup {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        .box {
            width: auto;
            height: auto;
            img {
                position: relative;
                top: 0;
            }
        }
    }
    .weather-report {
        text-align: center;
        p {
            margin: 0;
        }
        .weather {
            &-condition,
            &-minmaxtemp {
                font-size: 10px;
            }
        }
        .buienradar {
            margin-top: 8px;
        }
    }
</style>
