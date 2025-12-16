// Window Management
function openWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.classList.add('active');
    }
    const startMenu = document.getElementById('startMenu');
    if (startMenu) {
        startMenu.classList.remove('active');
    }
}

function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.classList.remove('active');
    }
}

function minimizeWindow(windowId) {
    // In this basic version, minimize is the same as close/hide
    closeWindow(windowId);
}