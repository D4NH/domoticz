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
            <router-view></router-view>

            <div class="bottom-nav">
                <ul>
                    <li @click="vibrateButton()"><router-link to="/">
                        <i class="fa fa-fw fa-2x fa-lightbulb-o" aria-hidden="true"></i><br/>
                        <span>Lights</span>
                    </router-link></li>
                    <li @click="vibrateButton()"><router-link to="/home">
                        <i class="fa fa-fw fa-2x fa-home" aria-hidden="true"></i><br/>
                        <span>Home</span>
                    </router-link></li>
                    <li @click="vibrateButton()"><router-link to="/devices">
                        <i class="fa fa-fw fa-2x fa-mobile" aria-hidden="true"></i><br/>
                        <span>Devices</span>
                    </router-link></li>
                    <li @click="vibrateButton()"><router-link to="/weather">
                        <i class="fa fa-fw fa-2x fa-cloud" aria-hidden="true"></i><br/>
                        <span>Weather</span>
                    </router-link></li>
                    <li @click="vibrateButton()"><router-link to="/other">
                        <i class="fa fa-fw fa-2x fa-bars" aria-hidden="true"></i><br/>
                        <span>Other</span>
                    </router-link></li>
                </ul>
            </div>
        </div>

        <div class="footer">
            <small>© 2017 Copyright Danh Nguyen | Front-End Developer</small>
        </div>
    </div>
</template>

<script>
import SunriseSunset from './components/SunriseSunset';

export default {
    components: {
        // components go here
        SunriseSunset
    },
    methods : {
        vibrateButton () {
            navigator.vibrate(50);
        }
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
        margin-bottom: 105px;
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


    .card {
        background-color: white;
        padding: 15px;
        border-bottom: 1px solid #F2F5F7;
        &:last-of-type { border-bottom: none }

        i {
            float: left;
            margin-right: 15px;
            margin-top: 5px;
        }
    }

    .bottom-nav {
        background-color: #2C3E50;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 0 15px;
        display: flex;
        flex-wrap: no-wrap;
        justify-content: space-around;

        ul {
            list-style: none;
        }

        li {
            display: inline-block;
            text-align: center;
            padding: 0 5px;
        }

        a {
            color: white;
            text-decoration: none;
            span {
                font-size: 10px;
            }
        }
    }
</style>
