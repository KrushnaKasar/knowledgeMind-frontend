// Edit Article Page
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useArticles from '../hooks/useArticles';
import ArticleForm from '../components/article/ArticleForm';
import Loader from '../components/common/Loader';
import './CreateArticlePage.css';

const EditArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentArticle, fetchArticleById, updateArticle } = useArticles();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadArticle = async () => {
            await fetchArticleById(id);
            setFetching(false);
        };
        loadArticle();
    }, [id, fetchArticleById]);

    const handleSubmit = async (articleData) => {
        setLoading(true);
        setError('');
        try {
            const response = await updateArticle(id, articleData);
            if (response?.success) {
                navigate(`/article/${id}`);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update article');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <Loader size="lg" text="Loading article..." />;
    }

    return (
        <div className="container">
            <div className="page-header slide-up">
                <h1>Edit Article ✏️</h1>
                <p>Update your article content</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <ArticleForm
                initialData={currentArticle}
                onSubmit={handleSubmit}
                loading={loading}
                isEdit
            />
        </div>
    );
};

export default EditArticlePage;
