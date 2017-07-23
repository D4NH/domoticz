<template>
    <div class="card-container">
        <p class="text-center" v-if="logData.length === 0"><i class="fa fa-refresh fa-spin fa-fw"></i> Loading...</p>
        <p v-for="log in logData">
            {{ log.level }}
            {{ log.message }}
        </p>
    </div>
</template>

<script>
import _ from 'lodash';
import { getLogAPI } from '../services/domoticz-api';

export default {
    name: 'log',
    data () {
        return {
            logData: [],
            errorMsg: '',
            timer: ''
        }
    },
    methods : {
        getLog () {
            getLogAPI ().then((response) => {
                this.logData = response.data.result;
            }).catch(error => {
                this.errorMsg = 'Alles is kapot!';
                this.logData = null;
            });
        },
        cancelAutoUpdate () {
            clearInterval(this.timer);
        }
    },
    mounted () {
        this.getLog();
        this.timer = setInterval(this.getLog, 2000);
    },
    beforeDestroy () {
        this.cancelAutoUpdate();
    }
}
</script>

<style lang="scss">
</style>
