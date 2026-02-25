// Auth API Service
import api from './api';

const authService = {
    signup: async (username, email, password) => {
        const response = await api.post('/auth/signup', { username, email, password });
        return response.data;
    },

    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    },

    updateProfile: async (data) => {
        const response = await api.put('/auth/profile', data);
        return response.data;
    },

    deleteAccount: async (password) => {
        const response = await api.delete('/auth/account', { data: { password } });
        return response.data;
    },
};

export default authService;
