import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Auth from '@okta/okta-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ApiService from '@/services/api.service';
import config from './config';

import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

ApiService.init();

Vue.use(Auth, config.auth);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
