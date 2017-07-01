<template>
    <div class="box">
        <p class="text-center" v-if="loading"><i class="fa fa-refresh fa-spin fa-fw"></i> Loading...</p>
        <img id="hikvision" src="" />
    </div>
</template>

<script>
export default {
    name: 'ip-cam',
    data () {
        return {
            loading: true,
            timer: ''
        }
    },
    methods : {
        getCamStream () {
            const BASE_URL = (window.location.href.indexOf('localhost') > -1 || window.location.href.indexOf('192') > -1) ? 'http://192.168.0.101:8080' : 'https://thuis.danhnguyen.nl';
            document.getElementById('hikvision').src = `${BASE_URL}/camsnapshot.jpg?idx=1&rand=` + Math.random();
            this.loading = false;
        },
        cancelAutoUpdate () {
            clearInterval(this.timer);
        }
    },
    activate () {
        this.getCamStream();
    },
    mounted () {
        this.timer = setInterval(this.getCamStream, 2000);
    },
    beforeDestroy () {
        this.cancelAutoUpdate();
    }
}
</script>

<style lang="scss">
    .box {
        position: relative;
        @media only screen and (max-width: 500px) {
            height: 300px;
        }
        overflow: hidden;
        margin-top: -10px;
        .fa-refresh {
            float: none;
            margin-right: 0;
            margin-top: 0;
        }
    }

    img#hikvision {
        width: 100%;
        @media only screen and (max-width: 500px) {
            position: absolute;
            bottom: -25px;
        }
    }
</style>
