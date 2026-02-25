// AI Tag Suggestion Component
import { useState } from 'react';
import useAI from '../../hooks/useAI';
import Button from '../common/Button';
import { IoPricetag } from 'react-icons/io5';
import './AIComponents.css';

const AITagSuggestion = ({ content, onTagsSelected }) => {
    const { aiLoading, suggestTags } = useAI();
    const [suggestions, setSuggestions] = useState([]);

    const handleSuggest = async () => {
        if (!content || content.trim().length < 20) {
            alert('Please write at least 20 characters of content first');
            return;
        }
        const tags = await suggestTags(content);
        if (tags) setSuggestions(tags);
    };

    const handleAddTag = (tag) => {
        onTagsSelected([tag]);
        setSuggestions(suggestions.filter((s) => s !== tag));
    };

    return (
        <div className="ai-tag-section">
            <Button
                variant="secondary"
                size="sm"
                onClick={handleSuggest}
                loading={aiLoading}
                icon={<IoPricetag />}
                className="ai-btn"
            >
                🤖 AI Suggest Tags
            </Button>

            {suggestions.length > 0 && (
                <div className="ai-tag-suggestions fade-in">
                    <span className="ai-tag-label">Suggested:</span>
                    {suggestions.map((tag, index) => (
                        <button
                            key={index}
                            className="tag ai-tag-suggestion"
                            type="button"
                            onClick={() => handleAddTag(tag)}
                        >
                            + {tag}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AITagSuggestion;
