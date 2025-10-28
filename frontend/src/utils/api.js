import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  sendOTP: (phoneNumber) => api.post('/auth/send-otp/', phoneNumber),
  verifyOTP: (data) => api.post('/auth/verify-otp/', data),
  logout: () => api.post('/auth/logout/'),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data) => api.patch('/auth/profile/', data),
  getDashboard: () => api.get('/auth/dashboard/'),
};

export const projectsAPI = {
  getProjectTypes: (params) => api.get('/projects/types/', { params }),
  getProjectTemplates: (params) => api.get('/projects/templates/', { params }),
  getLocations: (params) => api.get('/projects/locations/', { params }),
  getMaterials: (params) => api.get('/projects/materials/', { params }),
  getMaterialPrices: (params) => api.get('/projects/materials/prices/', { params }),
  getLaborPrices: (params) => api.get('/projects/labor/prices/', { params }),
  getProjectCostBreakdown: (projectTypeId, params) => 
    api.get(`/projects/types/${projectTypeId}/breakdown/`, { params }),
  getFilterOptions: () => api.get('/projects/filter-options/'),
  searchProjects: (params) => api.get('/projects/search/', { params }),
  getLocationDetails: (locationId) => api.get(`/projects/locations/${locationId}/`),
};

export const estimatesAPI = {
  getEstimates: (params) => api.get('/estimates/', { params }),
  getEstimate: (id) => api.get(`/estimates/${id}/`),
  createEstimate: (data) => api.post('/estimates/', data),
  updateEstimate: (id, data) => api.patch(`/estimates/${id}/`, data),
  deleteEstimate: (id) => api.delete(`/estimates/${id}/`),
  calculateCost: (data) => api.post('/estimates/calculate/', data),
  saveEstimate: (data) => api.post('/estimates/save/', data),
  uploadEstimate: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/estimates/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  duplicateEstimate: (id) => api.post(`/estimates/${id}/duplicate/`),
  shareEstimate: (id, data) => api.post(`/estimates/${id}/share/`, data),
  getSharedEstimate: (token) => api.get(`/estimates/shared/${token}/`),
  getStatistics: () => api.get('/estimates/statistics/'),
};

export const subscriptionsAPI = {
  getPlans: () => api.get('/subscriptions/plans/'),
  getCurrentSubscription: () => api.get('/subscriptions/current/'),
  createSubscription: (data) => api.post('/subscriptions/', data),
  upgradeSubscription: (data) => api.post('/subscriptions/upgrade/', data),
  cancelSubscription: () => api.post('/subscriptions/cancel/'),
  getUsage: () => api.get('/subscriptions/usage/'),
  recordUsage: (data) => api.post('/subscriptions/record-usage/', data),
  getPaymentHistory: () => api.get('/subscriptions/payments/'),
};

export const reportsAPI = {
  getReports: (params) => api.get('/reports/', { params }),
  getReport: (id) => api.get(`/reports/${id}/`),
  generateReport: (data) => api.post('/reports/generate/', data),
  downloadReport: (id) => api.get(`/reports/${id}/download/`, { responseType: 'blob' }),
  shareReport: (id, data) => api.post(`/reports/${id}/share/`, data),
  getSharedReport: (token) => api.get(`/reports/shared/${token}/`),
  getTemplates: () => api.get('/reports/templates/'),
};



