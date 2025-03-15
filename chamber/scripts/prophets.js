const url= 'https://bryanmalpartida.github.io/wdd231/prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets); 
    displayProphets(data.prophets);
  }
  
  const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
      
      let card = document.createElement('section');
      let fullName = document.createElement('h2'); 
      let portrait = document.createElement('img');
      let dob = document.createElement('p');
      let pob = document.createElement('p');
  
     
      fullName.textContent = `${prophet.name} ${prophet.lastname}`; 
      
      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); 
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '340');
      portrait.setAttribute('height', '440');
      dob.textContent = `Date of Birth: ${prophet.birthdate}`;
      pob.textContent = `Place of Birth: ${prophet.birthplace}`;

      
     
      dob.style.padding = '10px'; 
     

    
      
      card.appendChild(fullName);
      card.appendChild(portrait);
      card.appendChild(dob);
      card.appendChild(pob);
      cards.appendChild(card);
    }); 
  }
  
  getProphetData();

  