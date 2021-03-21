import Vue from 'vue';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';
import store from '../store';

const instance = axios.create({
  baseURL: config.apiUrl,
});

instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  store.commit('INCREASE_CURRENT_API_CALL_COUNT', null, { root: true });

  const accessToken = await Vue.prototype.$auth.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
},
(error: AxiosError) => {
  store.commit('DECREASE_CURRENT_API_CALL_COUNT', null, { root: true });
  Promise.reject(error);
});

instance.interceptors.response.use((response: AxiosResponse) => {
  store.commit('DECREASE_CURRENT_API_CALL_COUNT', null, { root: true });
  return response;
}, _ => {
  store.commit('DECREASE_CURRENT_API_CALL_COUNT', null, { root: true });

  // TODO handle unauth error (redirect)
  // TODO: handle 500 (see https://github.com/Netflix/dispatch/blob/develop/src/dispatch/static/dispatch/src/api.js#L37)

  // TODO: Make 400s more useable
});

const ApiService = {
  get(resource: string, requestConfig?: AxiosRequestConfig) {
    return instance.get(resource, requestConfig);
  },

  post(resource: string, data?: any, requestConfig?: AxiosRequestConfig) {
    return instance.post(resource, data, requestConfig);
  },

  put(resource: string, data?: any, requestConfig?: AxiosRequestConfig) {
    return instance.put(resource, data, requestConfig);
  },

  delete(resource: string, requestConfig?: AxiosRequestConfig) {
    return instance.delete(resource, requestConfig);
  }
};

export default ApiService;
