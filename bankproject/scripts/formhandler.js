import { displayModal } from './utils.js';

document.getElementById('registrationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Store form data in localStorage
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        idNumber: document.getElementById('idNumber').value,
        services: Array.from(document.querySelectorAll('input[name="services"]:checked')).map(el => el.value)
    };
    
    localStorage.setItem('registrationData', JSON.stringify(formData));
    
    // Fetch a random loan processor
    fetch('data/processors.json')
        .then(response => response.json())
        .then(data => {
            const randomProcessor = data[Math.floor(Math.random() * data.length)];
            displayModal(
                'Registration Complete', 
                `Thank you for registering with CallaoBank! Our loan processor ${randomProcessor.name} will contact you soon at ${randomProcessor.email} or ${randomProcessor.phone}.`
            );
            
            // Redirect after modal is closed
            setTimeout(() => {
                window.location.href = 'formaction.html';
            }, 3000);
        })
        .catch(error => {
            console.error('Error:', error);
            displayModal(
                'Registration Complete', 
                'Thank you for registering with CallaoBank! A loan processor will contact you soon.'
            );
            
            setTimeout(() => {
                window.location.href = 'formaction.html';
            }, 3000);
        });
});