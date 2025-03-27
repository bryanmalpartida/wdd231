//HAMBURGUER BAR ON NAV BAR

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navigation");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

//LAST MODIFIED FOOTER

// giving variable to last modified
const lastModifiedDate = document.lastModified;

// using another variable so we can call lastmodified by id
const lastModifiedParagraph = document.getElementById('lastModified');

// desired text+outcome
lastModifiedParagraph.textContent = `Last Modification: ${lastModifiedDate}`;

//YEAR  ON FOOTER

//giving variable to year
const year = document.querySelector("#year");
//variable for current year 
const today = new Date();
//print
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;


// Weather Data (you would replace this with actual API calls)
function loadWeather() {
    // Current Weather
    document.getElementById('weather-icon').innerHTML = '☀️';
    document.getElementById('current-temp').textContent = '32°C';
    document.getElementById('weather-desc').textContent = 'Sunny';
    
    // Forecast
    const forecastContainer = document.getElementById('forecast-container');
    const forecastData = [
        { day: 'Mon', temp: '34°C', icon: '☀️' },
        { day: 'Tue', temp: '33°C', icon: '⛅' },
        { day: 'Wed', temp: '31°C', icon: '☀️' }
    ];
    
    forecastData.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'forecast-day';
        dayElement.innerHTML = `
            <p><strong>${day.day}</strong></p>
            <p>${day.icon}</p>
            <p>${day.temp}</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', loadWeather);


