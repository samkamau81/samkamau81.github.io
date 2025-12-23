// Utility functions
const Utils = {

    logout: function() {
        if (confirm('Are you sure you want to log off?')) {
            document.body.style.transition = 'opacity 1s';
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                document.body.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #0a58ca; color: white; font-size: 24px; flex-direction: column;">
                        <div style="margin-bottom: 20px;">🪟</div>
                        <div>Windows is shutting down...</div>
                        <div style="margin-top: 20px; font-size: 14px;">Thank you for visiting!</div>
                    </div>
                `;
                document.body.style.opacity = '1';
                
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }, 1000);
        }
    }
};

// Image viewer function - Windows XP Style
function openImageViewer(imageSrc, imageName) {
    // Create image viewer window
    const viewer = document.createElement('div');
    viewer.id = 'image-viewer';
    viewer.className = 'secondary-window active';
    viewer.style.cssText = 'left: 10%; top: 5%; width: 80%; height: 85%; z-index: 200;';
    
    viewer.innerHTML = `
        <div class="title-bar">
            <div class="title-bar-text">
                <span>🖼️</span>
                <span>${imageName} - Windows Picture and Fax Viewer</span>
            </div>
            <div class="title-bar-controls">
                <button onclick="closeImageViewer()">×</button>
            </div>
        </div>
        <div class="window-content" style="padding: 0; background: #f0f0f0; display: flex; flex-direction: column;">
            <!-- Toolbar -->
            <div style="background: #ece9d8; padding: 5px 10px; border-bottom: 1px solid #ccc; display: flex; gap: 5px; align-items: center;">
                <button class="viewer-btn" onclick="rotateImage(-90)" title="Rotate Left">
                    <span style="font-size: 16px;">↶</span>
                </button>
                <button class="viewer-btn" onclick="rotateImage(90)" title="Rotate Right">
                    <span style="font-size: 16px;">↷</span>
                </button>
                <div style="width: 1px; height: 20px; background: #999; margin: 0 5px;"></div>
                <button class="viewer-btn" onclick="zoomImage('in')" title="Zoom In">
                    <span style="font-size: 16px;">🔍+</span>
                </button>
                <button class="viewer-btn" onclick="zoomImage('out')" title="Zoom Out">
                    <span style="font-size: 16px;">🔍-</span>
                </button>
                <button class="viewer-btn" onclick="zoomImage('fit')" title="Best Fit">
                    <span style="font-size: 16px;">⊡</span>
                </button>
                <button class="viewer-btn" onclick="zoomImage('actual')" title="Actual Size">
                    <span style="font-size: 16px;">1:1</span>
                </button>
                <div style="margin-left: auto; font-size: 11px; color: #666;">
                    <span id="zoom-level">100%</span>
                </div>
            </div>
            
            <!-- Image Container -->
            <div style="flex: 1; overflow: auto; display: flex; align-items: center; justify-content: center; background: #808080; position: relative;">
                <img id="viewer-image" src="${imageSrc}" alt="${imageName}" 
                     style="max-width: 100%; max-height: 100%; object-fit: contain; transition: transform 0.3s ease;"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23ccc%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%23666%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImage not found%3C/text%3E%3C/svg%3E'">
            </div>
            
            <!-- Status Bar -->
            <div style="background: #ece9d8; padding: 5px 10px; border-top: 1px solid #ccc; font-size: 10px; color: #000; display: flex; justify-content: space-between;">
                <span>${imageName}</span>
                <span id="image-info">Loading...</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(viewer);
    
    // Make window draggable
    makeWindowDraggable(viewer);
    
    // Load image info
    const img = document.getElementById('viewer-image');
    img.onload = function() {
        document.getElementById('image-info').textContent = 
            `${this.naturalWidth} × ${this.naturalHeight} pixels`;
    };
}

// Close image viewer
function closeImageViewer() {
    const viewer = document.getElementById('image-viewer');
    if (viewer) {
        viewer.remove();
    }
}

// Rotation state
let currentRotation = 0;
let currentZoom = 1;

// Rotate image
function rotateImage(degrees) {
    currentRotation += degrees;
    const img = document.getElementById('viewer-image');
    if (img) {
        img.style.transform = `rotate(${currentRotation}deg) scale(${currentZoom})`;
    }
}

// Zoom image
function zoomImage(action) {
    const img = document.getElementById('viewer-image');
    const zoomLevel = document.getElementById('zoom-level');
    
    if (!img) return;
    
    switch(action) {
        case 'in':
            currentZoom = Math.min(currentZoom * 1.2, 5);
            break;
        case 'out':
            currentZoom = Math.max(currentZoom / 1.2, 0.1);
            break;
        case 'fit':
            currentZoom = 1;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            break;
        case 'actual':
            currentZoom = 1;
            img.style.maxWidth = 'none';
            img.style.maxHeight = 'none';
            break;
    }
    
    img.style.transform = `rotate(${currentRotation}deg) scale(${currentZoom})`;
    if (zoomLevel) {
        zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
    }
}

// Make window draggable
function makeWindowDraggable(windowElement) {
    const titleBar = windowElement.querySelector('.title-bar');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    
    titleBar.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    function dragStart(e) {
        if (e.target.tagName === 'BUTTON') return;
        
        initialX = e.clientX - windowElement.offsetLeft;
        initialY = e.clientY - windowElement.offsetTop;
        isDragging = true;
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        
        windowElement.style.left = currentX + 'px';
        windowElement.style.top = currentY + 'px';
    }
    
    function dragEnd() {
        isDragging = false;
    }
}

// Reset viewer state when opening new image
document.addEventListener('DOMContentLoaded', () => {
    // Reset on new viewer
    const observer = new MutationObserver(() => {
        if (document.getElementById('image-viewer')) {
            currentRotation = 0;
            currentZoom = 1;
        }
    });
    
    observer.observe(document.body, { childList: true });
});