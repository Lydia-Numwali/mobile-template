import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; 

const BASE_URL = 'http://10.12.73.137:5000';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});


export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('accessToken');  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default { axiosInstance, axiosPrivate };
