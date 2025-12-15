// Taskbar management
const Taskbar = {
    init: function() {
        this.setupClock();
        this.setupStartButton();
        this.update();
    },

    setupClock: function() {
        const clockElement = document.getElementById('clock');
        const updateClock = () => {
            clockElement.textContent = Utils.formatTime();
        };
        setInterval(updateClock, 1000);
        updateClock();
    },

    setupStartButton: function() {
        const startButton = document.getElementById('startButton');
        const startMenu = document.getElementById('startMenu');
        
        startButton.addEventListener('click', () => {
            startMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.start-button') && !e.target.closest('.start-menu')) {
                startMenu.classList.remove('active');
            }
        });
    },

    update: function() {
        const taskbarItems = document.getElementById('taskbarItems');
        taskbarItems.innerHTML = '';
        
        WindowManager.activeWindows.forEach(windowId => {
            const win = document.getElementById(windowId);
            if (!win) return;
            
            const title = win.querySelector('.title-bar-text span:last-child').textContent;
            const item = document.createElement('div');
            item.className = 'taskbar-item';
            
            if (win.classList.contains('active')) {
                item.classList.add('active');
            }
            
            item.textContent = title;
            item.onclick = () => {
                if (win.classList.contains('active')) {
                    WindowManager.minimize(windowId);
                } else {
                    win.classList.add('active');
                }
            };
            
            taskbarItems.appendChild(item);
        });
    }
};