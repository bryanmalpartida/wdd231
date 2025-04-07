// ==============================================
// Utility Functions
// ==============================================

function updateFooter() {
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('lastModified');
    
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
}

function displayModal(title, message) {
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
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    });
}

// ==============================================
// Main Page Functionality
// ==============================================

function setupMainPage() {
    // Hamburger menu functionality
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navigation");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Update footer
    updateFooter();
}

// ==============================================
// Form Handling
// ==============================================

function setupFormHandler() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Store form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            idNumber: document.getElementById('idNumber').value,
            services: Array.from(document.querySelectorAll('input[name="services"]:checked')).map(el => el.value)
        };
        
        localStorage.setItem('registrationData', JSON.stringify(formData));
        
        // For demo purposes, we'll use a sample processor
        const sampleProcessor = {
            name: "María Rodríguez",
            email: "maria.rodriguez@callaobank.com",
            phone: "+51 987 654 321"
        };
        
        displayModal(
            'Registration Complete', 
            `Thank you for registering with CallaoBank! Our loan processor ${sampleProcessor.name} will contact you soon at ${sampleProcessor.email} or ${sampleProcessor.phone}.`
        );
        
        // Redirect after modal is closed
        setTimeout(() => {
            window.location.href = 'formaction.html';
        }, 3000);
    });
}

// ==============================================
// Loan Processors Display
// ==============================================

async function fetchAndDisplayLoanProcessors() {
    try {
        // Sample data - in a real app you would fetch this from JSON
        const processors = [
            {
                "name": "María Rodríguez",
                "email": "maria.rodriguez@callaobank.com",
                "phone": "+51 987 654 321",
                "image": "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1492.jpg"
            },
            {
                "name": "Carlos Gutiérrez",
                "email": "carlos.gutierrez@callaobank.com",
                "phone": "+51 987 654 322",
                "image": "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1492.jpg"
            },
            // Add more processors as needed
        ];

        displayProcessors(processors);
    } catch (error) {
        console.error('Error with loan processors:', error);
        displayModal('Error', 'Could not load loan processors. Please try again later.');
    }
}

function displayProcessors(processors) {
    const container = document.getElementById('processorsContainer');
    if (!container) return;

    container.innerHTML = processors.map(processor => `
        <div class="processor-card">
            <img src="${processor.image}" alt="${processor.name}" loading="lazy">
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

// ==============================================
// Initialize Based on Current Page
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    // Common functionality for all pages
    setupMainPage();

    // Page-specific functionality
    if (document.getElementById('registrationForm')) {
        setupFormHandler();
    }
    
    if (document.getElementById('processorsContainer')) {
        fetchAndDisplayLoanProcessors();
    }
});
