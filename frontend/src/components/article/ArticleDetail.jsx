// Article Detail Component
import { IoTime, IoPerson, IoCalendar, IoArrowBack, IoPencil, IoTrash } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/formatDate';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';
import './ArticleDetail.css';

const ArticleDetail = ({ article, onDelete }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const isAuthor = user && article && user.id === article.user_id;

    if (!article) return null;

    return (
        <article className="article-detail fade-in">
            <div className="article-detail-header">
                <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
                    <IoArrowBack /> Back
                </button>

                {isAuthor && (
                    <div className="article-detail-actions">
                        <Link to={`/edit/${article.id}`} className="btn btn-secondary btn-sm">
                            <IoPencil /> Edit
                        </Link>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={onDelete}
                            icon={<IoTrash />}
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            <div className="article-detail-meta">
                <span className="category-badge">{article.category}</span>
            </div>

            <h1 className="article-detail-title">{article.title}</h1>

            <div className="article-detail-info">
                <span className="detail-info-item">
                    <IoPerson /> {article.author}
                </span>
                <span className="detail-info-item">
                    <IoCalendar /> {formatDateTime(article.created_at)}
                </span>
                {article.updated_at !== article.created_at && (
                    <span className="detail-info-item">
                        <IoTime /> Updated: {formatDateTime(article.updated_at)}
                    </span>
                )}
            </div>

            {article.tags && article.tags.length > 0 && (
                <div className="article-detail-tags">
                    {article.tags.map((tag, index) => (
                        <span key={index} className="tag">#{tag}</span>
                    ))}
                </div>
            )}

            <div className="article-detail-content">
                {article.content}
            </div>
        </article>
    );
};

export default ArticleDetail;
