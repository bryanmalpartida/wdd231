// Update footer with current year and last modified date
export function updateFooter() {
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('lastModified');
    
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
}

// Display modal dialog
export function displayModal(title, message) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <p>${message}</p>
            <button class="close-modal">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    const closeButton = modal.querySelector('.close-modal');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    });
    
    // Close when clicking outside modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    });
}