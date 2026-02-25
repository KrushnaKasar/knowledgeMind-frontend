// Form validation utilities
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 6;
};

export const validateUsername = (username) => {
    return username.length >= 3 && username.length <= 30;
};

export const validateArticle = (title, content, category) => {
    const errors = {};
    if (!title || title.trim().length < 5) errors.title = 'Title must be at least 5 characters';
    if (!content || content.trim().length < 20) errors.content = 'Content must be at least 20 characters';
    if (!category) errors.category = 'Category is required';
    return errors;
};
