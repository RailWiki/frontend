import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';

const ApiService = {
    init() {
        axios.interceptors.request.use((config: AxiosRequestConfig) => {
            // TODO set app busy
            return config;
        });

        axios.interceptors.response.use((response: AxiosResponse) => {
            // TODO set not busy
            return response;
        }, () => {
            // TODO set global error?
            // TODO set not busy
        });
    },
    
    get(resource: string, requestConfig?: AxiosRequestConfig) {
        const url = `${config.API_URL}/${resource}`;
        return axios.get(url, requestConfig);
    },

    post(resource: string, data?: any, requestConfig?: AxiosRequestConfig) {
        const url = `${config.API_URL}/${resource}`;
        return axios.post(url, data, requestConfig);
    },

    put(resource: string, data?: any, requestConfig?: AxiosRequestConfig) {
        const url = `${config.API_URL}/${resource}`;
        return axios.put(url, data, requestConfig);
    },

    delete(resource: string, requestConfig?: AxiosRequestConfig) {
        const url = `${config.API_URL}/${resource}`;
        return axios.delete(url, requestConfig);
    }
};

export default ApiService;