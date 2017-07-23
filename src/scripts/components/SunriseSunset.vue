<template>
    <small><i class="fa fa-sun-o" aria-hidden="true"></i> {{sunData.Sunrise}} | <i class="fa fa-moon-o" aria-hidden="true"></i> {{sunData.Sunset}}</small>
</template>

<script>
import { getSunriseAPI } from '../services/domoticz-api';

export default {
    name: 'sunrise-sunset',
    data () {
        return {
            sunData: [],
            errorMsg: ''
        }
    },
    methods: {
        getSundata () {
            getSunriseAPI().then((response) => {
                this.sunData = response.data;
            }).catch(error => {
                this.errorMsg = 'Alles is kapot!';
                this.sunData = null;
            });
        }
    },
    mounted () {
        this.getSundata();
    }
}
</script>

<style lang="scss">
</style>
