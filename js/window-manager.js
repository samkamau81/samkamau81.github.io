// Window management system

const WindowManager = {
    activeWindows: new Set(),
    draggedElement: null,
    offsetX: 0,
    offsetY: 0,

    init: async function() {
        const data = await Utils.loadJSON('data/portfolio-data.json');
        if (!data) return;

        await this.createWindows(data.windows);
        this.setupDragHandlers();
    },

    createWindows: async function(windowsData) {
        const container = document.getElementById('windows-container');

        for (const windowData of windowsData) {
            const content = await Utils.loadHTML(windowData.contentFile);
            
            const windowHTML = `
                <div class="window" id="${windowData.id}" 
                     style="left: ${windowData.position.left}px; 
                            top: ${windowData.position.top}px; 
                            width: ${windowData.size.width}px; 
                            height: ${windowData.size.height}px;">
                    <div class="title-bar">
                        <div class="title-bar-text">
                            <span>${windowData.icon}</span>
                            <span>${windowData.title}</span>
                        </div>
                        <div class="title-bar-controls">
                            <button onclick="WindowManager.minimize('${windowData.id}')">_</button>
                            <button onclick="WindowManager.maximize('${windowData.id}')">□</button>
                            <button onclick="WindowManager.close('${windowData.id}')">×</button>
                        </div>
                    </div>
                    <div class="window-content">
                        ${content}
                    </div>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', windowHTML);
        }
    },

    open: function(windowId) {
        const win = document.getElementById(windowId);
        if (!win) return;

        document.querySelectorAll('.window').forEach(w => w.style.zIndex = 1);
        win.style.zIndex = 10;

        win.classList.add('active');
        this.activeWindows.add(windowId);
        Taskbar.update();
    },


    close: function(windowId) {
        const win = document.getElementById(windowId);
        if (!win) return;
        
        win.classList.remove('active');
        this.activeWindows.delete(windowId);
        Taskbar.update();
    },

    minimize: function(windowId) {
        const win = document.getElementById(windowId);
        if (!win) return;
        
        win.classList.remove('active');
        Taskbar.update();
    },

    maximize: function(windowId) {
        const win = document.getElementById(windowId);
        if (!win) return;
        
        if (win.style.width === '100%') {
            const data = win.dataset;
            win.style.width = data.originalWidth || '650px';
            win.style.height = data.originalHeight || '450px';
            win.style.left = data.originalLeft || '100px';
            win.style.top = data.originalTop || '50px';
        } else {
            win.dataset.originalWidth = win.style.width;
            win.dataset.originalHeight = win.style.height;
            win.dataset.originalLeft = win.style.left;
            win.dataset.originalTop = win.style.top;
            
            win.style.width = '100%';
            win.style.height = 'calc(100vh - 30px)';
            win.style.left = '0';
            win.style.top = '0';
        }
    },

    setupDragHandlers: function() {
        document.addEventListener('mousedown', (e) => {
            const titleBar = e.target.closest('.title-bar');
            if (!titleBar || e.target.tagName === 'BUTTON') return;
            
            this.draggedElement = titleBar.parentElement;
            const rect = this.draggedElement.getBoundingClientRect();
            this.offsetX = e.clientX - rect.left;
            this.offsetY = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (this.draggedElement) {
                this.draggedElement.style.left = (e.clientX - this.offsetX) + 'px';
                this.draggedElement.style.top = (e.clientY - this.offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            this.draggedElement = null;
        });
    }
};