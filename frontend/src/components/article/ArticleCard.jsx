// Article Card Component
import { Link } from 'react-router-dom';
import { IoTime, IoPerson } from 'react-icons/io5';
import { timeAgo } from '../../utils/formatDate';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {
    return (
        <Link to={`/article/${article.id}`} className="article-card card slide-up">
            <div className="article-card-header">
                <span className="category-badge">{article.category}</span>
            </div>

            <h3 className="article-card-title">{article.title}</h3>

            <p className="article-card-summary">
                {article.summary || 'No summary available'}
            </p>

            {article.tags && article.tags.length > 0 && (
                <div className="article-card-tags">
                    {article.tags.slice(0, 4).map((tag, index) => (
                        <span key={index} className="tag">#{tag}</span>
                    ))}
                    {article.tags.length > 4 && (
                        <span className="tag tag-more">+{article.tags.length - 4}</span>
                    )}
                </div>
            )}

            <div className="article-card-footer">
                <span className="article-card-author">
                    <IoPerson /> {article.author}
                </span>
                <span className="article-card-date">
                    <IoTime /> {timeAgo(article.created_at)}
                </span>
            </div>
        </Link>
    );
};

export default ArticleCard;
