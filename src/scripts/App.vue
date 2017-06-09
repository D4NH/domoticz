<template>
    <div class="wrapper">
        <div class="header">
            <p>
                Domoticz<br/>
                <sunrise-sunset></sunrise-sunset>
            </p>
        </div>

        <div class="content">
            <!-- components go here  -->
            <devices></devices>

            <div class="bottom-nav">
                <ul>
                    <li>Home</li>
                    <li>Lights</li>
                </ul>
            </div>
        </div>

        <div class="footer">
            <small>© 2017 Copyright Danh Nguyen | Front-End Developer</small>
        </div>
    </div>
</template>

<script>
import Devices from './components/Devices';
import SunriseSunset from './components/SunriseSunset';

export default {
    components: {
        // components go here
        Devices,
        SunriseSunset
    }
}
</script>

<style lang="scss">
    @import '../styles/reset.scss';
    @import '../styles/variables.scss';

    body {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        background-color: #F2F5F7;
    }

    .wrapper {
        max-width: 1120px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 115px;
        &:after {
            content: '';
            display: block;
            clear: both;
        }
    }

    .header {
        @media only screen and (min-width: $mobile) {}
        text-align: center;
    }
    .content {

    }
    .footer {
        text-align: center;
    }

    .bottom-nav {
        background-color: #2C3E50;
        color: white;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>
