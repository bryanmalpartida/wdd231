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

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Store form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            idNumber: document.getElementById('idNumber').value,
            services: Array.from(document.querySelectorAll('input[name="services"]:checked')).map(el => el.value),
            submissionDate: new Date().toLocaleString()
        };
        
        // 1. Save to localStorage
        localStorage.setItem('registrationData', JSON.stringify(formData));
        
        // 2. Create and download text file
        const textFileContent = `CallaoBank Client Information\n\n` +
                              `First Name: ${formData.firstName}\n` +
                              `Last Name: ${formData.lastName}\n` +
                              `Email: ${formData.email}\n` +
                              `Phone: ${formData.phone}\n` +
                              `ID Number: ${formData.idNumber}\n` +
                              `Services Interested In: ${formData.services.join(', ')}\n` +
                              `Submission Date: ${formData.submissionDate}\n\n` +
                              `This information has been saved for our records.`;
        
        const blob = new Blob([textFileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'clientinfo.txt';
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);

        try {
            // Fetch processors data
            const response = await fetch('./data/processors.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const processors = await response.json();
            
            // Select random processor
            const randomProcessor = processors[Math.floor(Math.random() * processors.length)];
            
            displayModal(
                'Registration Complete', 
                `Thank you for registering with CallaoBank! Our loan processor ${randomProcessor.name} will contact you soon at ${randomProcessor.email} or ${randomProcessor.phone}.`
            );
            
            // Redirect after modal is closed
            setTimeout(() => {
                window.location.href = 'https://bryanmalpartida.github.io/wdd231/bankproject/services.html';
            }, 3000);
        } catch (error) {
            console.error('Error fetching processors:', error);
            displayModal(
                'Registration Complete', 
                'Thank you for registering with CallaoBank! A loan processor will contact you soon.'
            );
            setTimeout(() => {
                window.location.href = 'https://bryanmalpartida.github.io/wdd231/bankproject/services.html';
            }, 3000);
        }
    });
}

// ==============================================
// Loan Processors Display
// ==============================================

async function fetchAndDisplayLoanProcessors() {
    const container = document.getElementById('processorsContainer');
    if (!container) return;

    // Show loading state
    container.innerHTML = '<div class="loading">Loading loan processors...</div>';

    try {
        const response = await fetch('./data/processors.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const processors = await response.json();
        
        if (!Array.isArray(processors) || processors.length === 0) {
            throw new Error('No processors data available');
        }
        
        displayProcessors(processors);
    } catch (error) {
        console.error('Error fetching loan processors:', error);
        container.innerHTML = '<div class="error">Failed to load loan processors. Please try again later.</div>';
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



