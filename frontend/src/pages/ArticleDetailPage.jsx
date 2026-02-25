// Article Detail Page
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useArticles from '../hooks/useArticles';
import ArticleDetail from '../components/article/ArticleDetail';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

const ArticleDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentArticle, loading, fetchArticleById, deleteArticle } = useArticles();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchArticleById(id);
    }, [id, fetchArticleById]);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteArticle(id);
            navigate('/');
        } catch {
            // Error handled in context
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    if (loading) {
        return <Loader size="lg" text="Loading article..." />;
    }

    return (
        <div className="container">
            <ArticleDetail
                article={currentArticle}
                onDelete={() => setShowDeleteModal(true)}
            />

            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Article"
            >
                <p style={{ marginBottom: 'var(--space-5)', color: 'var(--text-secondary)' }}>
                    Are you sure you want to delete this article? This action cannot be undone.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
                    <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete} loading={deleting}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default ArticleDetailPage;
