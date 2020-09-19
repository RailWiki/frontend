import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Multiselect from 'vue-multiselect';
import Auth from '@okta/okta-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ApiService from '@/services/api.service';
import config from './config';
import * as helpers from './helpers';

import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';

Vue.use(BootstrapVue);
Vue.component('multiselect', Multiselect);

ApiService.init();

Vue.use(Auth, config.auth);
Vue.use(require('vue-moment'));

Vue.filter('truncate', helpers.truncateString);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
