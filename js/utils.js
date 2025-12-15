// Utility functions
const Utils = {
    // Format time for clock
    formatTime: () => {
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        return `${hours}:${minutes} ${ampm}`;
    },

    // Load HTML content
    loadHTML: async (url) => {
        try {
            const response = await fetch(url);
            return await response.text();
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
            return '<p>Error loading content</p>';
        }
    },

    // Load JSON data
    loadJSON: async (url) => {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
            return null;
        }
    }
};