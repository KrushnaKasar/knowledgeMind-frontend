// Tag Input Component
import { useState } from 'react';
import { IoClose, IoAdd } from 'react-icons/io5';
import './TagInput.css';

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const addTag = () => {
        const tag = inputValue.trim().toLowerCase();
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
            setInputValue('');
        }
    };

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        }
        if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    return (
        <div className="input-group">
            <label>Tags</label>
            <div className="tag-input-wrapper">
                <div className="tag-list">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag tag-removable">
                            #{tag}
                            <button type="button" onClick={() => removeTag(index)} className="tag-remove">
                                <IoClose />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="tag-input-row">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a tag and press Enter"
                        className="tag-input"
                    />
                    <button type="button" className="btn btn-ghost btn-sm" onClick={addTag}>
                        <IoAdd />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TagInput;
