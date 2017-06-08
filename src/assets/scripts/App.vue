<template>
    <div class="wrapper">
        <div class="header">
            <p class="header__small">header</p>
        </div>

        <div class="content">
            <!-- components go here  -->
            <devices></devices>
        </div>

        <div class="footer">
            <small>© 2017 Copyright Danh Nguyen | Front-End Developer</small>
        </div>
    </div>
</template>

<script>
import Devices from './components/Devices';

export default {
  components: {
    // components go here
    Devices
  }
}
</script>

<style lang="scss">
    @import '../styles/reset.scss';
    @import '../styles/variables.scss';
    @import '../styles/base.scss';
</style>
