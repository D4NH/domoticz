<template>
    <div>
        <div class="row">
            <div class="col-sm-12 col-md-6 switches weather">
                <div class="card-container weather-today" v-for="today in weatherToday">
                    <p class="text-center" v-if="weatherForecast.length === 0"><i class="fa fa-refresh fa-spin fa-fw"></i> Loading...</p>
                    <p>
                        {{ today.date | moment }}<br/>
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
            <div class="col-sm-12 col-md-6 switches">
                <img class="buienradar" border="0" src="//api.buienradar.nl/image/1.0/RadarMapNL">
            </div>
        </div>
        <div class="col-sm-12 switches">
            <ul class="card-container weather-forecast">
                <li class="weather-forecast-day" v-for="(forecast, index) in weatherForecast" v-if="index !== 0">
                    {{ forecast.date | moment }}<br/>
                    <div>
                        <img :src="forecast.day.condition.icon" :alt="forecast.day.condition.text">
                    </div>
                    {{ forecast.day.maxtemp_c | roundUp }}&deg;C / {{ forecast.day.mintemp_c | roundUp }}&deg;C
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import moment from 'moment';
import { getWeatherTodayAPI, getWeatherForecastAPI } from '../services/domoticz-api';

export default {
    name: 'weather',
    data() {
        return {
            weatherToday: [],
            weatherForecast: [],
            errorMsg: ''
        };
    },
    filters: {
        roundUp(value) {
            return Math.ceil(value);
        },
        moment(date) {
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
    methods: {
        // getWeatherData () {
        //     getWeatherAPI().then((response) => {
        //         this.weatherData = response.data.result;
        //     }).catch(error => {
        //         this.errorMsg = 'Alles is kapot!';
        //         this.weatherData = [];
        //     });
        // },
        getWeatherToday() {
            getWeatherTodayAPI()
                .then(response => {
                    this.weatherToday = response.data.forecast.forecastday;
                })
                .catch(error => {
                    this.errorMsg = 'Alles is kapot!';
                    this.weatherToday = null;
                });
        },
        getWeatherForecast() {
            getWeatherForecastAPI()
                .then(response => {
                    this.weatherForecast = response.data.forecast.forecastday;
                })
                .catch(error => {
                    this.errorMsg = 'Alles is kapot!';
                    this.weatherForecast = null;
                });
        }
    },
    mounted() {
        this.getWeatherToday();
        this.getWeatherForecast();
    }
};
</script>

<style lang="scss">
.weather {
    text-align: center;

    p {
        margin-top: 0;
        margin-bottom: 0;
    }

    &-today {
        height: 100%;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    &-temp {
        font-size: 20px;
    }
    &-minmaxtemp,
    &-condition {
        font-size: 12px;
    }

    &-forecast {
        display: flex;
        justify-content: space-between;
        text-align: center;
        &-day {
            font-size: 10px;
            display: inline-block;
            img {
                width: 40px;
            }
        }
    }
}
.buienradar {
    width: 100%;
    height: 100%;
    flex: 1;
}
</style>
