// Email Function
function sendEmail() {
    const name = document.getElementById('sender-name')?.value;
    const email = document.getElementById('sender-email')?.value;
    const subject = document.getElementById('email-subject')?.value;
    const message = document.getElementById('email-message')?.value;

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields!');
        return;
    }

    // Create mailto link
    const mailtoLink = `mailto:samuelwawerukamau01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoLink;

    alert('Opening your email client...');
}

// Logout
function logout() {
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