// AI Summary Preview Component
import { useState } from 'react';
import useAI from '../../hooks/useAI';
import Button from '../common/Button';
import { IoSparkles } from 'react-icons/io5';
import './AIComponents.css';

const AISummaryPreview = ({ content }) => {
    const { aiLoading, generateSummary } = useAI();
    const [summary, setSummary] = useState('');

    const handleGenerate = async () => {
        if (!content || content.trim().length < 20) {
            alert('Please write at least 20 characters of content first');
            return;
        }
        const result = await generateSummary(content);
        if (result) setSummary(result);
    };

    return (
        <div className="ai-summary-section">
            <Button
                variant="secondary"
                size="sm"
                onClick={handleGenerate}
                loading={aiLoading}
                icon={<IoSparkles />}
                className="ai-btn"
            >
                Generate Summary
            </Button>
            {summary && (
                <div className="ai-summary-preview fade-in">
                    <p className="ai-summary-text">{summary}</p>
                </div>
            )}
        </div>
    );
};

export default AISummaryPreview;
