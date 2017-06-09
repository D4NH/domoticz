<template>
    <div class="box">
        <img id="hikvision" src="http://192.168.0.102:8010/streaming/channels/1/picture" />
    </div>
</template>

<script>
export default {
    name: 'ip-cam',
    data () {
        return {
            timer: ''
        }
    },
    methods : {
        reloadCamStream () {
            document.getElementById('hikvision').src = 'http://192.168.0.102:8010/streaming/channels/1/picture?rand=' + Math.random();
        },
        cancelAutoUpdate () {
            clearInterval(this.timer);
        }
    },
    created () {
        this.timer = setInterval(this.reloadCamStream, 5000)
    },
    ready () {
        this.reloadCamStream();
    },
    beforeDestroy() {
        this.cancelAutoUpdate();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .box {
        position: relative;
        height: 300px;
        overflow: hidden;
        margin-top: -10px;
    }

    img {
        width: 100%;
        position: absolute;
        bottom: -25px;
    }
</style>
