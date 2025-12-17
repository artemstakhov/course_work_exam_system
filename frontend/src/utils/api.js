import axios from 'axios';
import { API_BASE_URL } from './constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Щось пішло не так';
    
    // Не удаляем cookie автоматически - пусть компоненты решают
    // if (error.response?.status === 401) {
    //   только для auth эндпоинтов
    // }
    
    return Promise.reject({ ...error, message });
  }
);

// API Service - централізовані методи для всіх запитів
export const apiService = {
  // Auth
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  
  // Users
  getUserById: (userId) => api.get(`/user/${userId}`),
  
  // Tests
  getTests: () => api.get('/tests'),
  getTestById: (testId) => api.get(`/tests/${testId}`),
  createTest: (userId, testData) => api.post(`/user/test/${userId}`, testData),
  deleteTest: (testId) => api.delete(`/tests/${testId}`),
  
  // Sessions
  startSession: (testId) => api.post(`/tests/${testId}/session/start`),
  getSession: (testId) => api.get(`/tests/${testId}/session`),
  updateSession: (testId, data) => api.put(`/tests/${testId}/session`, data),
  submitSession: (testId, data) => api.post(`/tests/${testId}/session/submit`, data),
};

export default api;
