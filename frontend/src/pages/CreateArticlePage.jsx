// Create Article Page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useArticles from '../hooks/useArticles';
import ArticleForm from '../components/article/ArticleForm';
import './CreateArticlePage.css';

const CreateArticlePage = () => {
    const navigate = useNavigate();
    const { createArticle } = useArticles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (articleData) => {
        setLoading(true);
        setError('');
        try {
            const response = await createArticle(articleData);
            if (response?.success) {
                navigate(`/article/${response.data.id}`);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create article');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="page-header slide-up">
                <h1>Create New Article ✍️</h1>
                <p>Share your knowledge with the world</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <ArticleForm onSubmit={handleSubmit} loading={loading} />
        </div>
    );
};

export default CreateArticlePage;
