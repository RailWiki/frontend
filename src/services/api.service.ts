import Vue from 'vue';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';

const ApiService = {
    init() {
        axios.interceptors.request.use(async (axConfig: AxiosRequestConfig) => {
            // TODO set app busy

            const accessToken = await Vue.prototype.$auth.getAccessToken();
            if (accessToken) {
                axConfig.headers.Authorization = `Bearer ${accessToken}`;
            }

            return axConfig;
        });

        axios.interceptors.response.use((response: AxiosResponse) => {
            // TODO set not busy
            return response;
        }, (err) => {
          // TODO set global error?
          // TODO set not busy
          return err;
        });
    },

    get(resource: string, requestConfig?: AxiosRequestConfig) {
        const url = `${config.apiUrl}/${resource}`;
        return axios.get(url, requestConfig);
    },

    post(resource: string, data?: any, requestConfig?: AxiosRequestConfig) {
        const url = `${config.apiUrl}/${resource}`;
        return axios.post(url, data, requestConfig);
    },

    put(resource: string, data?: any, requestConfig?: AxiosRequestConfig) {
        const url = `${config.apiUrl}/${resource}`;
        return axios.put(url, data, requestConfig);
    },

    delete(resource: string, requestConfig?: AxiosRequestConfig) {
        const url = `${config.apiUrl}/${resource}`;
        return axios.delete(url, requestConfig);
    }
};

export default ApiService;
