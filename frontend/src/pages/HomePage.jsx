// Home Page
import { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import useArticles from '../hooks/useArticles';
import useDebounce from '../hooks/useDebounce';
import ArticleList from '../components/article/ArticleList';
import CategoryFilter from '../components/article/CategoryFilter';
import './HomePage.css';

const HomePage = () => {
    const { articles, loading, fetchArticles } = useArticles();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 400);

    useEffect(() => {
        fetchArticles(debouncedSearch, selectedCategory);
    }, [debouncedSearch, selectedCategory, fetchArticles]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSearchQuery('');
    };

    return (
        <div className="container">
            <div className="home-hero slide-up">
                <h1 className="home-title">
                    Discover & Share <span className="gradient-text">Knowledge</span>
                </h1>
                <p className="home-subtitle">
                    Explore articles on tech, AI, and more — powered by AI-assisted writing ✨
                </p>

                <div className="search-bar glass">
                    <IoSearch className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search articles by title, content, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="home-filters">
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                />
            </div>

            <div className="home-results">
                {(searchQuery || selectedCategory) && (
                    <p className="results-info">
                        {loading ? 'Searching...' : `${articles.length} article${articles.length !== 1 ? 's' : ''} found`}
                        {selectedCategory && ` in ${selectedCategory}`}
                        {searchQuery && ` for "${searchQuery}"`}
                    </p>
                )}
                <ArticleList articles={articles} loading={loading} />
            </div>
        </div>
    );
};

export default HomePage;
