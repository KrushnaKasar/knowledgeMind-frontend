// Extract a short summary from article content
export const extractSummary = (content, maxLength = 150) => {
    // Remove HTML tags
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();

    if (cleanContent.length <= maxLength) return cleanContent;

    return cleanContent.substring(0, maxLength).trim() + '...';
};
