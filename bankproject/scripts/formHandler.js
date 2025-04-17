import { displayModal } from './modal.js';

export function setupFormHandler() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = collectFormData(form);
        saveToLocalStorage(formData);
        downloadClientInfo(formData);
        
        try {
            await processFormSubmission(formData);
        } catch (error) {
            handleSubmissionError(error);
        }
    });
}

function collectFormData(form) {
    return {
        firstName: form.querySelector('#firstName').value,
        lastName: form.querySelector('#lastName').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        idNumber: form.querySelector('#idNumber').value,
        services: Array.from(form.querySelectorAll('input[name="services"]:checked')).map(el => el.value),
        submissionDate: new Date().toLocaleString()
    };
}

function saveToLocalStorage(data) {
    localStorage.setItem('registrationData', JSON.stringify(data));
}

function downloadClientInfo(data) {
    const blob = new Blob([formatDataAsText(data)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clientinfo.txt';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

function formatDataAsText(data) {
    return `CallaoBank Client Information\n\n` +
           `First Name: ${data.firstName}\n` +
           `Last Name: ${data.lastName}\n` +
           `Email: ${data.email}\n` +
           `Phone: ${data.phone}\n` +
           `ID Number: ${data.idNumber}\n` +
           `Services: ${data.services.join(', ')}\n` +
           `Submitted: ${data.submissionDate}`;
}

async function processFormSubmission(formData) {
    const response = await fetch('./data/processors.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const processors = await response.json();
    const randomProcessor = processors[Math.floor(Math.random() * processors.length)];
    
    displayModal(
        'Registration Complete', 
        `Thank you! ${randomProcessor.name} will contact you at ${randomProcessor.email}`
    );
    
    setTimeout(() => {
        window.location.href = 'https://bryanmalpartida.github.io/wdd231/bankproject/services.html';
    }, 3000);
}

function handleSubmissionError(error) {
    console.error('Form submission error:', error);
    displayModal(
        'Registration Complete', 
        'Thank you for registering! A processor will contact you soon.'
    );
    setTimeout(() => {
        window.location.href = 'https://bryanmalpartida.github.io/wdd231/bankproject/services.html';
    }, 3000);
}