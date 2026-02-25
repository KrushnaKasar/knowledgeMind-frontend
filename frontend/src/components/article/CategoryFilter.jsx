// Category Filter Component
import { CATEGORIES } from '../../utils/constants';
import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
    return (
        <div className="category-filter">
            <button
                className={`category-chip ${!selectedCategory ? 'active' : ''}`}
                onClick={() => onCategoryChange('')}
            >
                All
            </button>
            {CATEGORIES.map((category) => (
                <button
                    key={category}
                    className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
