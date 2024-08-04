import axios from 'axios';
import { baseURL } from './process_base_url';
import {store} from "../redux/store.js";


const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const accessToken = state.auth.access_token;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
