// AI API Service
import api from './api';

const aiService = {
    improveContent: async (content) => {
        const response = await api.post('/ai/improve', { content });
        return response.data;
    },

    generateSummary: async (content) => {
        const response = await api.post('/ai/summary', { content });
        return response.data;
    },

    suggestTitle: async (content) => {
        const response = await api.post('/ai/suggest-title', { content });
        return response.data;
    },

    suggestTags: async (content) => {
        const response = await api.post('/ai/suggest-tags', { content });
        return response.data;
    },
};

export default aiService;
