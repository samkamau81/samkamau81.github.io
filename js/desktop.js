// Desktop initialization
const Desktop = {
    init: async function() {
        const data = await Utils.loadJSON('data/portfolio-data.json');
        if (!data) return;

        this.createIcons(data.icons);
        this.createStartMenu(data.icons);
        this.setupIconHandlers();
    },

    createIcons: function(iconsData) {
        const desktop = document.getElementById('desktop');
        
        iconsData.forEach(iconData => {
            const iconHTML = `
                <div class="icon" data-window="${iconData.windowId}">
                    <div class="icon-image">${iconData.icon}</div>
                    <div class="icon-label">${iconData.label}</div>
                </div>
            `;
            desktop.insertAdjacentHTML('beforeend', iconHTML);
        });
    },

    createStartMenu: function(iconsData) {
        const startMenuItems = document.getElementById('startMenuItems');
        
        iconsData.forEach(iconData => {
            const itemHTML = `
                <div class="start-menu-item" onclick="Desktop.openFromMenu('${iconData.windowId}')">
                    ${iconData.label}
                </div>
            `;
            startMenuItems.insertAdjacentHTML('beforeend', itemHTML);
        });
    },

    setupIconHandlers: function() {
        document.querySelectorAll('.icon').forEach(icon => {
            icon.addEventListener('click', function() {
                document.querySelectorAll('.icon').forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
            });
            
            icon.addEventListener('dblclick', function() {
                const windowId = this.dataset.window;
                WindowManager.open(windowId);
            });
        });
    },

    openFromMenu: function(windowId) {
        WindowManager.open(windowId);
        document.getElementById('startMenu').classList.remove('active');
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await WindowManager.init();
    await Desktop.init();
    Taskbar.init();
});

document.addEventListener('DOMContentLoaded', () => {
    const frame = document.getElementById('photoFrame');
    const title = document.getElementById('photoFrameTitle');
    const toggle = frame.querySelector('.xp-toggle');

    title.addEventListener('click', () => {
        frame.classList.toggle('collapsed');
        toggle.textContent = frame.classList.contains('collapsed') ? '▢' : '▁';
    });
});
