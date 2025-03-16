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


//json//
const url= 'https://bryanmalpartida.github.io/wdd231/chamber/data/members.json';
const cards = document.querySelector('#cards');
const toggleButton = document.querySelector('#toggle-view');
let isGridView = true;

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
  }

const displayMembers = (members) => {
    members.forEach((member) => {

        let card = document.createElement('section');
        let name = document.createElement('h2'); 
        let portrait = document.createElement('img');
        let address = document.createElement('p');
        let phonenumber = document.createElement('p');
        let websiteurl = document.createElement('p');
        let level = document.createElement('p');
        let birthplace = document.createElement('p');

         //text content//
        name.textContent = `${member.name}`; 
        address.textContent = `Address: ${member.address}`;
        phonenumber.textContent = `Phone Number: ${member.phonenumber}`;
        websiteurl.textContent = `Website: ${member.websiteurl}`;
        level.textContent = `Level: ${member.level}`;
        birthplace.textContent = `Place of Birth: ${member.birthplace}`;
        

        portrait.setAttribute('src', member.image);
        portrait.setAttribute('alt', `Portrait of ${member.name} `);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(portrait);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phonenumber);
        card.appendChild(websiteurl);
        card.appendChild(level);
        card.appendChild(birthplace)
        cards.appendChild(card);
      }); 
  }

// Toggle between grid and list views
toggleButton.addEventListener('click', () => {
  if (isGridView) {
    cards.classList.remove('grid-view');
    cards.classList.add('list-view');
    toggleButton.textContent = 'Switch to Grid View';
  } else {
    cards.classList.remove('list-view');
    cards.classList.add('grid-view');
    toggleButton.textContent = 'Switch to List View';
  }
  isGridView = !isGridView;
});

getMemberData();

