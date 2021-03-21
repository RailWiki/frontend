import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Multiselect from 'vue-multiselect';
import VueMoment from 'vue-moment';
import Auth from '@okta/okta-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import config from './config';
import * as helpers from './helpers';

import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';

Vue.use(BootstrapVue);
Vue.component('multiselect', Multiselect);

Vue.use(Auth, config.auth);
Vue.use(VueMoment);

Vue.filter('truncate', helpers.truncateString);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
