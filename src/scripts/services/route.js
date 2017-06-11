import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Dashboard from '../components/Dashboard';
import Lights from '../components/Lights';
import House from '../components/House';
import Devices from '../components/Devices';
import Other from '../components/Other';
import Weather from '../components/Weather';
import Log from '../components/Log';

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/', component: Lights },
  { path: '/home', component: House },
  { path: '/devices', component: Devices },
  { path: '/weather', component: Weather },
  { path: '/log', component: Log },
  { path: '*', component: Lights }
];

export default new Router({
    mode: 'history',
    routes
});
