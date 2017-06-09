import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

import Lights from '../components/Lights';
import House from '../components/House';
import Devices from '../components/Devices';
import Other from '../components/Other';
import Weather from '../components/Weather';

const routes = [
  { path: '/', component: Lights },
  { path: '/home', component: House },
  { path: '/devices', component: Devices },
  { path: '/weather', component: Weather },
  { path: '*', component: Other }
]

export default new Router({
    mode: 'history',
    routes
})
