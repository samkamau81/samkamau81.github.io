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

// Start Menu
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');

    if (startButton && startMenu) {
        startButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the document listener from closing it immediately
            startMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.start-button') && !e.target.closest('.start-menu')) {
                startMenu.classList.remove('active');
            }
        });
    }
});