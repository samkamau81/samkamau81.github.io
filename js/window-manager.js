// Window management system
let topZIndex = 20;

const WindowManager = {
    open(id) {
        const win = document.getElementById(id);
        if (!win) return;

        win.classList.add('active');
        win.style.zIndex = ++topZIndex;

        // Center after render
        requestAnimationFrame(() => {
            centerWindow(win);
        });
    },

    close(id) {
        const win = document.getElementById(id);
        if (!win) return;

        win.classList.remove('active');
    },

    minimize(id) {
        const win = document.getElementById(id);
        if (!win) return;

        win.classList.remove('active');
    },

    focus(win) {
        win.style.zIndex = ++topZIndex;
    }
};

/* Center window relative to viewport */
function centerWindow(win) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const winWidth = win.offsetWidth;
    const winHeight = win.offsetHeight;

    win.style.left = `${Math.max(0, (viewportWidth - winWidth) / 2)}px`;
    win.style.top = `${Math.max(0, (viewportHeight - winHeight) / 2)}px`;
}

/* Click to focus */
document.addEventListener('mousedown', (e) => {
    const win = e.target.closest('.secondary-window');
    if (win) {
        WindowManager.focus(win);
    }
});

/* Drag windows by title bar */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.secondary-window .title-bar')
        .forEach(bar => {
            bar.addEventListener('mousedown', e => {
                if (e.target.tagName === 'BUTTON') return;

                const win = bar.closest('.secondary-window');
                let offsetX = e.clientX - win.offsetLeft;
                let offsetY = e.clientY - win.offsetTop;

                function move(e) {
                    win.style.left = `${e.clientX - offsetX}px`;
                    win.style.top = `${e.clientY - offsetY}px`;
                }

                function stop() {
                    document.removeEventListener('mousemove', move);
                    document.removeEventListener('mouseup', stop);
                }

                document.addEventListener('mousemove', move);
                document.addEventListener('mouseup', stop);

                WindowManager.focus(win);
            });
        });
});

/* Re-center active windows on resize / orientation change */
window.addEventListener('resize', () => {
    document.querySelectorAll('.secondary-window.active')
        .forEach(win => centerWindow(win));
});

/* Expose globally for HTML */
window.openWindow = (id) => WindowManager.open(id);
window.closeWindow = (id) => WindowManager.close(id);
window.minimizeWindow = (id) => WindowManager.minimize(id);
