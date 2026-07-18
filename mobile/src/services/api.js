import axios from 'axios';
import { auth } from '../config/firebase';
import { Platform } from 'react-native';

// Use 10.0.2.2 for Android Emulator to hit localhost. iOS uses localhost.
const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the Firebase ID token to requests automatically
api.interceptors.request.use(
  async (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to log detailed errors and success responses
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.url} - Status: ${response.status}`);
    console.log('[API Data]', response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[API Error] URL: ${error.config?.url} | Status: ${error.response.status} | Data:`, error.response.data);
    } else if (error.request) {
      console.error('[API Error] No Response/Network Error | URL:', error.config?.baseURL + (error.config?.url || ''));
    } else {
      console.error('[API Error] Request Setup:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
