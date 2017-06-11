<template>
    <div class="box">
        <span v-if="loading"><i class="fa fa-refresh fa-spin fa-fw"></i> Loading...</span>
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
            this.loading = false;
            document.getElementById('hikvision').src = 'http://192.168.0.101:8080/camsnapshot.jpg?idx=1&rand=' + Math.random();
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
    }

    img#hikvision {
        width: 100%;
        @media only screen and (max-width: 500px) {
            position: absolute;
            bottom: -25px;
        }
    }
</style>
