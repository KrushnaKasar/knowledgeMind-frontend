// useAI hook
import { useState } from 'react';
import aiService from '../services/aiService';

const useAI = () => {
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState(null);

    const improveContent = async (content) => {
        setAiLoading(true);
        setAiError(null);
        try {
            const response = await aiService.improveContent(content);
            // Backend returns: { success, message, data: { improvedContent } }
            const result = response.data?.improvedContent || response.improvedContent;
            if (result) return result;
            console.warn('AI improve: no result in response', response);
            return null;
        } catch (err) {
            console.error('AI improve error:', err);
            setAiError(err.response?.data?.message || 'AI improvement failed');
            return null;
        } finally {
            setAiLoading(false);
        }
    };

    const generateSummary = async (content) => {
        setAiLoading(true);
        setAiError(null);
        try {
            const response = await aiService.generateSummary(content);
            const result = response.data?.summary || response.summary;
            if (result) return result;
            return null;
        } catch (err) {
            console.error('AI summary error:', err);
            setAiError(err.response?.data?.message || 'Summary generation failed');
            return null;
        } finally {
            setAiLoading(false);
        }
    };

    const suggestTitle = async (content) => {
        setAiLoading(true);
        setAiError(null);
        try {
            const response = await aiService.suggestTitle(content);
            const result = response.data?.suggestedTitle || response.suggestedTitle;
            if (result) return result;
            return null;
        } catch (err) {
            console.error('AI title error:', err);
            setAiError(err.response?.data?.message || 'Title suggestion failed');
            return null;
        } finally {
            setAiLoading(false);
        }
    };

    const suggestTags = async (content) => {
        setAiLoading(true);
        setAiError(null);
        try {
            const response = await aiService.suggestTags(content);
            const result = response.data?.suggestedTags || response.suggestedTags;
            if (result) return result;
            return null;
        } catch (err) {
            console.error('AI tags error:', err);
            setAiError(err.response?.data?.message || 'Tag suggestion failed');
            return null;
        } finally {
            setAiLoading(false);
        }
    };

    return {
        aiLoading,
        aiError,
        improveContent,
        generateSummary,
        suggestTitle,
        suggestTags,
    };
};

export default useAI;
