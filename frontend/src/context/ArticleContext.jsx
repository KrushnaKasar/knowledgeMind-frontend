// Article Context - Global article state
import { createContext, useState, useCallback } from 'react';
import articleService from '../services/articleService';

export const ArticleContext = createContext(null);

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [myArticles, setMyArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchArticles = useCallback(async (search = '', category = '') => {
        setLoading(true);
        setError(null);
        try {
            const response = await articleService.getAll(search, category);
            if (response.success) {
                setArticles(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch articles');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchMyArticles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await articleService.getMyArticles();
            if (response.success) {
                setMyArticles(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch your articles');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchArticleById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await articleService.getById(id);
            if (response.success) {
                setCurrentArticle(response.data);
                return response.data;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch article');
        } finally {
            setLoading(false);
        }
    }, []);

    const createArticle = useCallback(async (articleData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await articleService.create(articleData);
            if (response.success) {
                setArticles((prev) => [response.data, ...prev]);
                return response;
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to create article';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateArticle = useCallback(async (id, articleData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await articleService.update(id, articleData);
            if (response.success) {
                setArticles((prev) => prev.map((a) => (a.id === id ? response.data : a)));
                setCurrentArticle(response.data);
                return response;
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to update article';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteArticle = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await articleService.delete(id);
            if (response.success) {
                setArticles((prev) => prev.filter((a) => a.id !== id));
                setMyArticles((prev) => prev.filter((a) => a.id !== id));
                return response;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete article');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const value = {
        articles,
        myArticles,
        currentArticle,
        loading,
        error,
        fetchArticles,
        fetchMyArticles,
        fetchArticleById,
        createArticle,
        updateArticle,
        deleteArticle,
        setError,
    };

    return (
        <ArticleContext.Provider value={value}>
            {children}
        </ArticleContext.Provider>
    );
};
