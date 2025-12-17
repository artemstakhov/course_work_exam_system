import api from './api';
import { API_ENDPOINTS } from './constants';

export const authService = {
  register: async (data) => {
    const response = await api.post(API_ENDPOINTS.REGISTER, data);
    return response.data;
  },
  
  login: async (data) => {
    const response = await api.post(API_ENDPOINTS.LOGIN, data);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post(API_ENDPOINTS.LOGOUT);
    return response.data;
  },
};

export const testService = {
  getAll: async () => {
    const response = await api.get(API_ENDPOINTS.GET_TESTS);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(API_ENDPOINTS.GET_TEST(id));
    return response.data;
  },
  
  create: async (userId, data) => {
    const response = await api.post(API_ENDPOINTS.CREATE_TEST(userId), data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(API_ENDPOINTS.DELETE_TEST(id));
    return response.data;
  },
  
  complete: async (userId, data) => {
    const response = await api.post(API_ENDPOINTS.COMPLETE_TEST(userId), data);
    return response.data;
  },
};

export const userService = {
  getById: async (id) => {
    const response = await api.get(API_ENDPOINTS.GET_USER(id));
    return response.data;
  },
};
