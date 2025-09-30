
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

window.addEventListener('load', () => {
  if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark');
});


const translations = {
  en: {
    home: "Home", donate: "Donate", search: "Search", ngo: "NGO Registration",
    heroTitle: "Connecting Hospitals, Donors & NGOs",
    heroDesc: "Get real-time updates for emergencies and donations.",
    findHelp: "Find Help Near You",
    findHelpDesc: "Search for hospitals, NGOs, donors, and types of donations in your area.",
    nearestHospital: "Nearest Hospital Bed", nearestNGO: "Nearest NGO",
    nearestDonor: "Nearest Donor", typeOfDonation: "Type of Donation"
  },
  hi: {
    home: "मुख्य पृष्ठ", donate: "दान करें", search: "खोजें", ngo: "एनजीओ पंजीकरण",
    heroTitle: "अस्पताल, दाता और एनजीओ से जुड़ना",
    heroDesc: "आपातकाल और दान के लिए रियल-टाइम अपडेट प्राप्त करें।",
    findHelp: "अपने नजदीकी सहायता खोजें",
    findHelpDesc: "अपने क्षेत्र में अस्पताल, एनजीओ, दाता और दान के प्रकार खोजें।",
    nearestHospital: "नजदीकी अस्पताल का बिस्तर", nearestNGO: "नजदीकी एनजीओ",
    nearestDonor: "नजदीकी दाता", typeOfDonation: "दान का प्रकार"
  }
};

document.getElementById('languageSelect')?.addEventListener('change', e => {
  const lang = e.target.value;
  document.querySelectorAll('nav a').forEach(link => {
    const key = link.getAttribute('data-key');
    if(translations[lang][key]) link.textContent = translations[lang][key];
  });

  const heroTitle = document.querySelector('[data-key="heroTitle"]');
  const heroDesc = document.querySelector('[data-key="heroDesc"]');
  const findHelpHeading = document.querySelector('[data-key="findHelp"]');
  const findHelpDesc = document.querySelector('[data-key="findHelpDesc"]');

  if(heroTitle) heroTitle.textContent = translations[lang].heroTitle;
  if(heroDesc) heroDesc.textContent = translations[lang].heroDesc;
  if(findHelpHeading) findHelpHeading.textContent = translations[lang].findHelp;
  if(findHelpDesc) findHelpDesc.textContent = translations[lang].findHelpDesc;

  const cards = document.querySelectorAll('.category-card h3');
  if(cards.length > 0){
    cards[0].textContent = translations[lang].nearestHospital;
    cards[1].textContent = translations[lang].nearestNGO;
    cards[2].textContent = translations[lang].nearestDonor;
    cards[3].textContent = translations[lang].typeOfDonation;
  }
});

function initMap() {
  const center = {lat:28.6139, lng:77.2090};
  const map = new google.maps.Map(document.getElementById("map"), {zoom:12, center});
  const hospitals = [
    {name:"City Hospital", lat:28.6139, lng:77.2190},
    {name:"LifeCare Hospital", lat:28.6239, lng:77.2290},
    {name:"RedCross Blood Bank", lat:28.6039, lng:77.1990}
  ];
  hospitals.forEach(h => new google.maps.Marker({position:{lat:h.lat,lng:h.lng}, map, title:h.name}));
}


function calculatePoints(type){
  switch(type){
    case 'blood': return 50;
    case 'plasma': return 70;
    case 'organ': return 200;
    case 'medicine': return 30;
    case 'clothes': return 20;
    case 'money': return 100;
    case 'childSupport': return 40;
    case 'food': return 20;
    default: return 10;
  }
}

let userRewards = {totalPoints:0, donations:[]};

function updateRewardsUI(){
  const pointsDisplay = document.getElementById('totalPoints');
  const donationHistory = document.getElementById('donationHistory');
  if(!pointsDisplay || !donationHistory) return;
  pointsDisplay.innerText = userRewards.totalPoints;
  donationHistory.innerHTML = '';
  userRewards.donations.forEach(d=>{
    const li = document.createElement('li'); 
    li.innerText=`${d.type} - +${d.points} Points`;
    donationHistory.appendChild(li);
  });
}

function addDonation(type, points){
  userRewards.totalPoints+=points; 
  userRewards.donations.push({type, points}); 
  updateRewardsUI();
}

function redeemPoints(){
  if(userRewards.totalPoints<100){
    alert("You need at least 100 points to redeem rewards!");
    return;
  }
  alert("🎉 Points redeemed successfully!");
  userRewards.totalPoints-=100;
  updateRewardsUI();
}

document.addEventListener('DOMContentLoaded',()=>{
  const donorForm = document.getElementById('donorForm');
  donorForm?.addEventListener('submit', e=>{
    e.preventDefault();
    const donor = {
      name:document.getElementById('donorName').value,
      contact:document.getElementById('donorContact').value,
      donationType:document.getElementById('donationType').value,
      location:document.getElementById('location').value,
      points:calculatePoints(document.getElementById('donationType').value),
      verified:false
    };
    let donors=JSON.parse(localStorage.getItem('donors'))||[];
    donors.push(donor); localStorage.setItem('donors',JSON.stringify(donors));
    alert(`Thank you ${donor.name}! Registered as ${donor.donationType} donor.`);
    donorForm.reset();
    addDonation(donor.donationType, donor.points);
  });

  const hospitalForm = document.getElementById('hospitalForm');
  hospitalForm?.addEventListener('submit', e=>{
    e.preventDefault();
    const hospital={
      name:document.getElementById('hospitalName').value,
      email:document.getElementById('hospitalEmail').value,
      contact:document.getElementById('hospitalContact').value,
      address:document.getElementById('hospitalAddress').value,
      beds:document.getElementById('hospitalBeds').value,
      speciality:document.getElementById('hospitalSpeciality').value,
      verified:false
    };
    let hospitals=JSON.parse(localStorage.getItem('hospitals'))||[];
    hospitals.push(hospital); localStorage.setItem('hospitals',JSON.stringify(hospitals));
    alert(`Hospital "${hospital.name}" registered successfully!`);
    hospitalForm.reset();
  });

  const ngoForm = document.getElementById('ngoForm');
  ngoForm?.addEventListener('submit', e=>{
    e.preventDefault();
    const ngo={
      name:document.getElementById('ngoName').value,
      email:document.getElementById('ngoEmail').value,
      contact:document.getElementById('ngoContact').value,
      address:document.getElementById('ngoAddress').value,
      type:document.getElementById('ngoType').value,
      verified:false
    };
    let ngos=JSON.parse(localStorage.getItem('ngos'))||[];
    ngos.push(ngo); localStorage.setItem('ngos',JSON.stringify(ngos));
    alert(`NGO "${ngo.name}" registered successfully!`);
    ngoForm.reset();
  });
});


document.getElementById('searchForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  const location=document.getElementById('searchLocation').value.toLowerCase();
  const category=document.getElementById('searchCategory').value;
  const donationType=document.getElementById('donationType').value;
  const resultsContainer=document.getElementById('searchResults');
  resultsContainer.innerHTML='';

  let data=[];
  if(category==='hospital') data=JSON.parse(localStorage.getItem('hospitals'))||[];
  else if(category==='ngo') data=JSON.parse(localStorage.getItem('ngos'))||[];
  else if(category==='donor') data=JSON.parse(localStorage.getItem('donors'))||[];

  data.forEach(item=>{
    if(item.location && !item.location.toLowerCase().includes(location)) return;
    if(donationType!=='any' && item.donationType && item.donationType!==donationType) return;

    const card=document.createElement('div');
    card.classList.add('result-card');
    card.innerHTML=`
      <h3>${item.name}</h3>
      <p>${item.address || item.location || ''}</p>
      ${item.beds? `<p>Available Beds: ${item.beds}</p>`: ''}
      ${item.donationType? `<p>Donation: ${item.donationType}</p>`: ''}
      ${item.type? `<p>Type: ${item.type}</p>`: ''}
    `;
    resultsContainer.appendChild(card);
  });
});

function generateQRCode(){
  const input=document.getElementById('verifyInput').value.trim();
  if(!input){ alert("Please enter ID"); return;}
  const canvas=document.getElementById('qrCanvas');
  QRCode.toCanvas(canvas, input, function (error) {
    if(error) console.error(error);
    else console.log('QR Generated!');
  });
}

function toggleChatbot(){
  const chatbot=document.getElementById('chatbot');
  if(chatbot) chatbot.classList.toggle('open');
}

function sendChat(e){
  if(e.key==='Enter'){
    const msg=document.getElementById('chatbot-input').value;
    const container=document.getElementById('chatbot-messages');
    if(!msg) return;
    const userDiv=document.createElement('div');
    userDiv.className='chatbot-msg user'; userDiv.innerText=msg;
    container.appendChild(userDiv);

    const botDiv=document.createElement('div');
    botDiv.className='chatbot-msg bot';
    botDiv.innerText='Thanks for your message! We will respond soon.';
    container.appendChild(botDiv);

    document.getElementById('chatbot-input').value='';
    container.scrollTop=container.scrollHeight;
  }
}
