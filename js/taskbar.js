// Clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes} ${ampm}`;
    }
}
setInterval(updateClock, 1000);
updateClock();


// Start menu functionality
const StartMenu = {
    init() {
        const startButton = document.getElementById('startButton');
        const startMenu = document.getElementById('startMenu');
        
        if (!startButton || !startMenu) return;

        // Toggle start menu
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('active');
            startButton.classList.toggle('inactive');
        });

        // Prevent clicks inside menu from closing it
        startMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Close start menu when clicking outside
        document.addEventListener('click', () => {
            startMenu.classList.remove('active');
            startButton.classList.add('inactive');
        });

        // Add click handlers to all menu items to close menu when clicked
        const menuItems = startMenu.querySelectorAll('.start-menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                startMenu.classList.remove('active');
                startButton.classList.add('inactive');
            });
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    StartMenu.init();
});