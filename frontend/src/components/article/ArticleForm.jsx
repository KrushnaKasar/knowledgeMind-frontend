// Article Form Component (Create/Edit)
import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import ArticleEditor from './ArticleEditor';
import TagInput from './TagInput';
import AIImproveButton from '../ai/AIImproveButton';
import AITagSuggestion from '../ai/AITagSuggestion';
import { CATEGORIES } from '../../utils/constants';
import { IoSave } from 'react-icons/io5';
import './ArticleForm.css';

const ArticleForm = ({ initialData, onSubmit, loading, isEdit = false }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setContent(initialData.content || '');
            setCategory(initialData.category || '');
            setTags(initialData.tags || []);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || title.trim().length < 5) {
            setError('Title must be at least 5 characters');
            return;
        }
        if (!content.trim() || content.trim().length < 20) {
            setError('Content must be at least 20 characters');
            return;
        }
        if (!category) {
            setError('Please select a category');
            return;
        }

        onSubmit({
            title: title.trim(),
            content: content.trim(),
            category,
            tags: tags.join(','),
        });
    };

    return (
        <form className="article-form fade-in" onSubmit={handleSubmit}>
            {error && <div className="alert alert-error">{error}</div>}

            <Input
                label="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title"
                required
            />

            <div className="input-group">
                <label>Category <span style={{ color: 'var(--error-400)' }}>*</span></label>
                <select
                    className="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <ArticleEditor
                value={content}
                onChange={setContent}
                placeholder="Write your article content here..."
            />

            <div className="ai-tools-section">
                <h4 className="ai-tools-title">🤖 AI Assistant</h4>
                <div className="ai-tools-row">
                    <AIImproveButton
                        content={content}
                        onImproved={(improved) => setContent(improved)}
                        onTitleSuggested={(suggested) => setTitle(suggested)}
                    />
                </div>
            </div>

            <TagInput tags={tags} setTags={setTags} />

            <AITagSuggestion content={content} onTagsSelected={(newTags) => setTags([...tags, ...newTags])} />

            <div className="form-actions">
                <Button type="submit" variant="primary" size="lg" loading={loading} icon={<IoSave />}>
                    {isEdit ? 'Update Article' : 'Publish Article'}
                </Button>
            </div>
        </form>
    );
};

export default ArticleForm;
