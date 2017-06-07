<template>
  <div id="app">
    <!-- components go here -->
    <devices></devices>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
