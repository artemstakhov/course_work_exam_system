export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v2';

export const API_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_TESTS: '/tests',
  GET_TEST: (id) => `/tests/${id}`,
  CREATE_TEST: (userId) => `/user/test/${userId}`,
  DELETE_TEST: (id) => `/tests/${id}`,
  COMPLETE_TEST: (userId) => `/user/complete/${userId}`,
  GET_USER: (id) => `/user/${id}`,
};
