/* ============
 * Main File
 * ============
 *
 * Initialize the application.
 */

import Vue from 'vue';
import App from './App';
import router from './services/route';

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
