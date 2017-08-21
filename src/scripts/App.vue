<template>
    <div class="wrapper">
        <div class="header">
            <p>
                Domoticz<br/>
                <sunrise-sunset></sunrise-sunset>
            </p>
        </div>

        <div class="content">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>

            <div class="bottom-nav">
                <ul>
                    <li><router-link to="/dashboard">
                        <i class="fa fa-fw fa-2x fa-tachometer" aria-hidden="true"></i><br/>
                        <span>Dashboard</span>
                    </router-link></li>
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
                    <li @click="vibrateButton()"><router-link to="/log">
                        <i class="fa fa-fw fa-2x fa-bars" aria-hidden="true"></i><br/>
                        <span>Log</span>
                    </router-link></li>
                    <!-- <li @click="vibrateButton()"><router-link to="/other">
                        <i class="fa fa-fw fa-2x fa-bars" aria-hidden="true"></i><br/>
                        <span>Other</span>
                    </router-link></li> -->
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
        SunriseSunset
    },
    methods : {
        vibrateButton () {
            navigator.vibrate(25);
        }
    }
}
</script>

<style lang="scss">
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .3s ease;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

    @import '~mini.css';
    @import '../styles/reset.scss';
    @import '../styles/variables.scss';
    @import '../styles/base.scss';

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

    .card-container {
        background-color: white;
        padding: 15px;
        border-bottom: 1px solid #F2F5F7;
        justify-content: center;
        &:last-of-type { border-bottom: none }

        i {
            float: left;
            margin-right: 15px;
            margin-top: 5px;
        }

        ul {
            width: 100%;
        }
    }

    .switches {
        margin-bottom: 15px;
        &--cursor {
            cursor: pointer;
        }
    }

    .home-on {
        color: #F44336;
    }
    .light-on {
        color: #FCD837;
    }
    .mobile-on {
        color: #01848F;
    }
    .tv-on {
        color: #01848F;
    }
</style>
