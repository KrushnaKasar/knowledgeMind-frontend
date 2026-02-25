// useArticles hook
import { useContext } from 'react';
import { ArticleContext } from '../context/ArticleContext';

const useArticles = () => {
    const context = useContext(ArticleContext);
    if (!context) {
        throw new Error('useArticles must be used within an ArticleProvider');
    }
    return context;
};

export default useArticles;
