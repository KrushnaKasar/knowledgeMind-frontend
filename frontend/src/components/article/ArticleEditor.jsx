// Article Editor Component (Simple textarea-based editor)
import './ArticleEditor.css';

const ArticleEditor = ({ value, onChange, placeholder }) => {
    return (
        <div className="input-group">
            <label>Content <span style={{ color: 'var(--error-400)' }}>*</span></label>
            <div className="editor-wrapper">
                <textarea
                    className="editor-textarea"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder || 'Write your article content here...'}
                />
            </div>
            <span className="editor-hint">
                Write your article content. Supports plain text.
            </span>
        </div>
    );
};

export default ArticleEditor;
