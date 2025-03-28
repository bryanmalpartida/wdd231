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


// WEATHER API
const weatherApiKey = '3b7e2ed5452c2561882dce5c3d0ef5e7';

//HELP CAPITALIZE WORDS
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
} 
//END OF CAPITALIZE WORDS

const chamberLocation = { lat: -12.0464, lon: -77.0428 }; //LIMA COORDENATES

async function fetchWeatherData() {
    try {
        // CURRENT WEATHER
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${chamberLocation.lat}&lon=${chamberLocation.lon}&units=imperial&appid=${weatherApiKey}`
        );
        const currentData = await currentResponse.json();

        // 3 DAY FORECAST
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${chamberLocation.lat}&lon=${chamberLocation.lon}&units=imperial&cnt=24&appid=${weatherApiKey}`
        );
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-desc').textContent = 'Weather data unavailable';
    }
}

function displayCurrentWeather(data) {
    document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°F`;
    const description = capitalizeWords(data.weather[0].description);  
    document.getElementById('weather-desc').textContent = description; 
    
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].main}">`;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    
    
    const dailyForecasts = [];
    for (let i = 4; i < 40; i += 8) { 
        if (data.list[i]) {
            dailyForecasts.push(data.list[i]);
        }
    }
    
    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const capitalizedDesc = forecast.weather[0].description
            .split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        const dayElement = document.createElement('div');
        dayElement.className = 'forecast-day';
        dayElement.innerHTML = `
            <p class="day-name">${dayName}</p>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].main}">
            <p class="forecast-temp">${Math.round(forecast.main.temp)}°F</p>
            <p class="forecast-desc">${capitalizedDesc}</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

document.addEventListener('DOMContentLoaded', fetchWeatherData);
//END OF WEATHER SECTION


//SPOTLIGHT
const url = 'https://bryanmalpartida.github.io/wdd231/chamber/data/members.json';
const spotlightContainer = document.getElementById('spotlight-container');

async function getMemberData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        displaySpotlights(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
        spotlightContainer.innerHTML = '<p>Unable to load member spotlights at this time.</p>';
    }
}

const displaySpotlights = (members) => {
    spotlightContainer.innerHTML = '';
    
    // ONLY GOLD AND SILVER MEMBERS
    const qualifiedMembers = members.filter(member => member.level === 2 || member.level === 3);
    
    // SHOW 3 RANDOM MEMBERS
    const shuffledMembers = [...qualifiedMembers].sort(() => 0.5 - Math.random());
    const selectedMembers = shuffledMembers.slice(0, 3);
    
    // COLUMN CONTAINERS
    const columnsContainer = document.createElement('div');
    columnsContainer.className = 'columns-container';
    
    selectedMembers.forEach((member) => {
        const membershipLevel = member.level === 3 ? 'Gold' : 'Silver';
        const levelClass = member.level === 3 ? 'gold' : 'silver';

        const column = document.createElement('div');
        column.className = 'member-column';
        
        const card = document.createElement('section');
        card.className = 'member-card';
        
        const name = document.createElement('h2');
        const portrait = document.createElement('img');
        const address = document.createElement('p');
        const phonenumber = document.createElement('p');
        const websiteurl = document.createElement('p');
        const websiteLink = document.createElement('a');
        const badge = document.createElement('div');

        //text content//
        name.textContent = member.name;
        address.textContent = member.address;
        phonenumber.textContent = `Phone: ${formatPhoneNumber(member.phonenumber)}`;
        websiteLink.textContent = 'Website';
        websiteLink.href = ensureHttp(member.websiteurl);
        websiteLink.target = '_blank';
        badge.textContent = `${membershipLevel} Member`;
        badge.className = `membership-badge ${levelClass}`;

        // img attributes
        portrait.src = member.image || 'https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1492.jpg';
        portrait.alt = `Portrait of ${member.name}`;
        portrait.loading = 'lazy';
        portrait.className = 'member-icon';

        // APPEND ELEMENTS
        websiteurl.appendChild(websiteLink);
        card.appendChild(portrait);
        card.appendChild(name);
        card.appendChild(phonenumber);
        card.appendChild(address);
        card.appendChild(websiteurl);
        card.appendChild(badge);
        
        column.appendChild(card);
        columnsContainer.appendChild(column);
    });
    
    spotlightContainer.appendChild(columnsContainer);
};
//END OF SPOTLIGHT 

// Helper functions
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

function ensureHttp(url) {
    return url.startsWith('http') ? url : `https://${url}`;
}

document.addEventListener('DOMContentLoaded', getMemberData);


