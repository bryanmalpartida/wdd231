export async function fetchAndDisplayLoanProcessors() {
    const container = document.getElementById('processorsContainer');
    if (!container) return;

    try {
        const processors = await fetchProcessors();
        displayProcessors(processors, container);
    } catch (error) {
        handleProcessorError(error, container);
    }
}

async function fetchProcessors() {
    const response = await fetch('./data/processors.json');
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

function displayProcessors(processors, container) {
    container.innerHTML = processors.map(processor => `
        <div class="processor-card">
            <img src="${processor.image}" alt="${processor.name}" loading="lazy">
            <h3>${processor.name}</h3>
            <p>Phone: ${formatPhone(processor.phone)}</p>
            <p>Email: <a href="mailto:${processor.email}">${processor.email}</a></p>
            <button class="contact-btn" data-email="${processor.email}" aria-label="Contact ${processor.name}">Contact</button>
        </div>
    `).join('');


    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-email');
            displayModal('Contact Processor', `Contact: ${email}`);
        });
    });
}

function formatPhone(phone) {
    return phone;
}

function handleProcessorError(error, container) {
    console.error('Processor loading failed:', error);
    container.innerHTML = '<div class="error">Failed to load loan processors. Please try again later.</div>';
    displayModal('Error', 'Could not load loan processors. Please try again later.');
}