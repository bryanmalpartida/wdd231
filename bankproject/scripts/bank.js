// Import all necessary modules
import { updateFooter, setupHamburgerMenu } from './utilities.js';
import { setupFormHandler } from './formHandler.js';
import { fetchAndDisplayLoanProcessors } from './processors.js';
import { initModal } from './modal.js';
import { setupAboutSection } from './achievements.js';

// Initialize all page functionality
function initializePage() {
    // Always run these
    setupHamburgerMenu();
    updateFooter();
    initModal();
    
    // Page-specific initializations
    if (document.getElementById('registrationForm')) {
        setupFormHandler();
    }
    
    if (document.getElementById('processorsContainer')) {
        fetchAndDisplayLoanProcessors();
    }

    if (document.querySelector('.about')) {
        setupAboutSection();
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', initializePage);





