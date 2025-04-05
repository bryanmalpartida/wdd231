import { displayModal } from './utils.js';

async function fetchLoanProcessors() {
    try {
        const response = await fetch('data/processors.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const processors = await response.json();
        displayProcessors(processors);
    } catch (error) {
        console.error('Error fetching loan processors:', error);
        displayModal('Error', 'Could not load loan processors. Please try again later.');
    }
}

function displayProcessors(processors) {
    const container = document.getElementById('processorsContainer');
    if (!container) return;

    container.innerHTML = processors.map(processor => `
        <div class="processor-card">
            <img src="images/processors/${processor.image}" alt="${processor.name}" loading="lazy">
            <h3>${processor.name}</h3>
            <p>Phone: ${processor.phone}</p>
            <p>Email: <a href="mailto:${processor.email}">${processor.email}</a></p>
            <button class="contact-btn" data-email="${processor.email}">Contact</button>
        </div>
    `).join('');

    // Add event listeners to contact buttons
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-email');
            displayModal('Contact Processor', `You can contact this processor directly at ${email}`);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', fetchLoanProcessors);