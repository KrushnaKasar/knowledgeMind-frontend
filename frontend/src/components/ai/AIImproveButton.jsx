// AI Improve Button Component
import { IoSparkles, IoText, IoColorWand } from 'react-icons/io5';
import useAI from '../../hooks/useAI';
import Button from '../common/Button';
import './AIComponents.css';

const AIImproveButton = ({ content, onImproved, onTitleSuggested }) => {
    const { aiLoading, improveContent, suggestTitle } = useAI();

    const handleImprove = async () => {
        if (!content || content.trim().length < 20) {
            alert('Please write at least 20 characters of content first');
            return;
        }
        const improved = await improveContent(content);
        if (improved) onImproved(improved);
    };

    const handleSuggestTitle = async () => {
        if (!content || content.trim().length < 20) {
            alert('Please write at least 20 characters of content first');
            return;
        }
        const title = await suggestTitle(content);
        if (title) onTitleSuggested(title);
    };

    return (
        <div className="ai-buttons">
            <Button
                variant="secondary"
                size="sm"
                onClick={handleImprove}
                loading={aiLoading}
                icon={<IoSparkles />}
                className="ai-btn pulse-glow"
            >
                Improve with AI
            </Button>
            <Button
                variant="secondary"
                size="sm"
                onClick={handleSuggestTitle}
                loading={aiLoading}
                icon={<IoColorWand />}
                className="ai-btn"
            >
                Suggest Title
            </Button>
        </div>
    );
};

export default AIImproveButton;
