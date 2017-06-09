<template>
    <div class="weather">
        <img class="card" border="0" src="https://api.buienradar.nl/image/1.0/RadarMapNL">
        <div class="iframe-container">
            <iframe src="https://gadgets.buienradar.nl/gadget/forecastandstation/6344/" noresize scrolling=no hspace=0 vspace=0 frameborder=0 marginheight=0 marginwidth=0></iframe>
        </div>
    </div>
</template>

<script>
export default {
    name: 'weather'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .iframe-container {
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 15px;
        height: 0;
        overflow: hidden;
        text-align: center;

        iframe {
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    img {
        width: 100%;
    }
</style>
