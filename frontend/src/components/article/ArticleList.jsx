// Article List Component
import ArticleCard from './ArticleCard';
import Loader from '../common/Loader';
import './ArticleList.css';

const ArticleList = ({ articles, loading }) => {
    if (loading) {
        return <Loader size="lg" text="Loading articles..." />;
    }

    if (!articles || articles.length === 0) {
        return (
            <div className="empty-state fade-in">
                <span className="empty-icon">📭</span>
                <h3>No articles found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="article-grid">
            {articles.map((article, index) => (
                <div key={article.id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <ArticleCard article={article} />
                </div>
            ))}
        </div>
    );
};

export default ArticleList;
