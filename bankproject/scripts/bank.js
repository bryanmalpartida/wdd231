// IMPORT
import { updateFooter, setupHamburgerMenu } from './utilities.js';
import { setupFormHandler } from './formHandler.js';
import { fetchAndDisplayLoanProcessors } from './processors.js';
import { initModal } from './modal.js';
import { setupAboutSection } from './achievements.js';

// INITIALIZE FUNCTIONABILITY
function initializePage() {
    setupHamburgerMenu();
    updateFooter();
    initModal();
    
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

document.addEventListener('DOMContentLoaded', initializePage);





