// Article API Service
import api from './api';

const articleService = {
    getAll: async (search = '', category = '') => {
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;
        const response = await api.get('/articles', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/articles/${id}`);
        return response.data;
    },

    getMyArticles: async () => {
        const response = await api.get('/articles/user/my-articles');
        return response.data;
    },

    create: async (articleData) => {
        const response = await api.post('/articles', articleData);
        return response.data;
    },

    update: async (id, articleData) => {
        const response = await api.put(`/articles/${id}`, articleData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/articles/${id}`);
        return response.data;
    },
};

export default articleService;
