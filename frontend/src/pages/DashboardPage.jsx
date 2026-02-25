// Dashboard Page - User's Articles
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoAdd, IoPencil, IoTrash, IoEye } from 'react-icons/io5';
import useArticles from '../hooks/useArticles';
import useAuth from '../hooks/useAuth';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { timeAgo } from '../utils/formatDate';
import './DashboardPage.css';

const DashboardPage = () => {
    const { myArticles, loading, fetchMyArticles, deleteArticle } = useArticles();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchMyArticles();
    }, [fetchMyArticles]);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteArticle(deleteId);
        } catch {
            // handled in context
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="container">
            <div className="dashboard-header slide-up">
                <div>
                    <h1>My Articles 📝</h1>
                    <p>Welcome back, <strong>{user?.username}</strong>! Manage your articles here.</p>
                </div>
                <Link to="/create" className="btn btn-primary">
                    <IoAdd /> New Article
                </Link>
            </div>

            {loading ? (
                <Loader size="lg" text="Loading your articles..." />
            ) : myArticles.length === 0 ? (
                <div className="empty-state fade-in">
                    <span className="empty-icon">✍️</span>
                    <h3>No articles yet</h3>
                    <p>Start sharing your knowledge with the world!</p>
                    <Link to="/create" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
                        <IoAdd /> Create Your First Article
                    </Link>
                </div>
            ) : (
                <div className="dashboard-list">
                    {myArticles.map((article, index) => (
                        <div
                            key={article.id}
                            className="dashboard-item card fade-in"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="dashboard-item-main">
                                <div className="dashboard-item-info">
                                    <span className="category-badge">{article.category}</span>
                                    <h3 className="dashboard-item-title">{article.title}</h3>
                                    <p className="dashboard-item-summary">
                                        {article.summary || 'No summary'}
                                    </p>
                                    <span className="dashboard-item-date">{timeAgo(article.created_at)}</span>
                                </div>
                                <div className="dashboard-item-actions">
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => navigate(`/article/${article.id}`)}
                                        title="View"
                                    >
                                        <IoEye />
                                    </button>
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => navigate(`/edit/${article.id}`)}
                                        title="Edit"
                                    >
                                        <IoPencil />
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => { setDeleteId(article.id); setShowDeleteModal(true); }}
                                        title="Delete"
                                    >
                                        <IoTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Article"
            >
                <p style={{ marginBottom: 'var(--space-5)', color: 'var(--text-secondary)' }}>
                    Are you sure? This action cannot be undone.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
                    <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete} loading={deleting}>Delete</Button>
                </div>
            </Modal>
        </div>
    );
};

export default DashboardPage;
