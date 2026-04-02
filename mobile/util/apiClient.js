import axios from 'axios';
import {BASE_URL} from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: BASE_URL,
  headers:{
    'Content-Type': 'application/json',
  }
})

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken')
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
  return config
}, (error) => {
  return Promise.reject(error);
})

export default api;

api.interceptors.response.use((response) => {
  if(response.status === 204) return null;
  return response.data;
}, (error) => {
  const message = error.response?.data?.message ||
    `HTTP ${error.response?.status || 'Error'}`
  const err = new Error(message);
  err.status = error.response?.status;
  return Promise.reject(err);
})

