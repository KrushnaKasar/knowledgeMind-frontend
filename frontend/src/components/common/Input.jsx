// Reusable Input Component
const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    ...props
}) => {
    return (
        <div className="input-group">
            {label && (
                <label htmlFor={name}>
                    {label} {required && <span style={{ color: 'var(--error-400)' }}>*</span>}
                </label>
            )}
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`input ${error ? 'input-error' : ''}`}
                required={required}
                {...props}
            />
            {error && <span className="input-error-text">{error}</span>}
        </div>
    );
};

export default Input;
