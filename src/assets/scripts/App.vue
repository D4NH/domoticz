<template>
  <div id="app">
    <!-- components go here -->
    <light-switch></light-switch>
  </div>
</template>

<script>
import LightSwitch from './components/LightSwitch';

export default {
  components: {
    // components go here
    LightSwitch
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
