// ------- Data -------
const SERVICES = [
  { id:'nat', icon:'🛟', nameBn:'জাতীয় জরুরি সেবা', nameEn:'National Emergency Number', number:'999', category:'National Emergency' },
  { id:'pol', icon:'👮‍♂️', nameBn:'পুলিশ', nameEn:'Police Helpline Number', number:'999', category:'Police' },
  { id:'fire', icon:'🚒', nameBn:'ফায়ার সার্ভিস', nameEn:'Fire Service Number', number:'999', category:'Fire Service' },
  { id:'amb', icon:'🚑', nameBn:'অ্যাম্বুলেন্স', nameEn:'Ambulance Service', number:'1994-999999', category:'Ambulance' },
  { id:'women', icon:'👩‍👧', nameBn:'নারী ও শিশু সহায়তা', nameEn:'Women & Child Helpline', number:'109', category:'Women & Child Helpline' },
  { id:'anti', icon:'⚖️', nameBn:'দুর্নীতি দমন', nameEn:'Anti-Corruption Helpline', number:'106', category:'Anti-Corruption' },
  { id:'power', icon:'💡', nameBn:'বিদ্যুৎ বিঘ্ন', nameEn:'Electricity Helpline', number:'16216', category:'Electricity Outage' },
  { id:'brac', icon:'🏥', nameBn:'ব্র‍্যাক', nameEn:'Brac Helpline', number:'16445', category:'BRAC' },
  { id:'rail', icon:'🚆', nameBn:'বাংলাদেশ রেলওয়ে', nameEn:'Bangladesh Railway Helpline', number:'163', category:'Bangladesh Railway' },
];

// ------- State -------
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
const history = []; // { nameEn, number, time }

// ------- Helpers -------
const $ = (s,root=document)=>root.querySelector(s);
function formatNow(){
  try{
    return new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit' });
  }catch(e){
    return new Date().toLocaleTimeString();
  }
}
function updateNavbar(){
  $('#heartCount').textContent = heartCount;
  $('#coinCount').textContent = coinCount;
  $('#copyCount').textContent = copyCount;
}
function tel(number){
  window.location.href = 'tel:' + number.replace(/[^0-9+]/g,'');
}
function copyToClipboard(text){
  if(navigator.clipboard && navigator.clipboard.writeText){
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement('textarea');
  ta.value = text; document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); } finally { document.body.removeChild(ta); }
  return Promise.resolve();
}

// ------- Render Cards -------
function makeCard(svc){
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.serviceId = svc.id;

  card.innerHTML = `
    <div class="card-header">
      <div class="left">
        <div class="avatar" aria-hidden="true">${svc.icon}</div>
        <div class="names">
          <div class="bn">${svc.nameBn}</div>
          <div class="en">${svc.nameEn}</div>
        </div>
      </div>
      <button class="heart-btn" title="Add to favorites" aria-label="Add to favorites">💗</button>
    </div>
    <div class="badge"><span>🏷️</span><span>${svc.category}</span></div>
    <div class="number" aria-label="Hotline number">${svc.number}</div>
    <div class="actions">
      <button class="btn copy" title="Copy number">Copy</button>
      <button class="btn call" title="Call now">Call</button>
    </div>
  `;

  card.querySelector('.heart-btn').addEventListener('click', () => {
    heartCount += 1; updateNavbar();
  });
  card.querySelector('.btn.copy').addEventListener('click', async () => {
    await copyToClipboard(svc.number);
    copyCount += 1; updateNavbar();
    alert(`Copied "${svc.number}" to clipboard for ${svc.nameEn}.`);
  });
  card.querySelector('.btn.call').addEventListener('click', () => {
    if(coinCount < 20){
      alert('Not enough coins to make a call. You need 20 coins per call.');
      return;
    }
    alert(`Calling ${svc.nameEn} (${svc.number})`);
    coinCount -= 20; updateNavbar();
    const when = formatNow();
    history.unshift({ name: svc.nameEn, number: svc.number, time: when });
    renderHistory();
    tel(svc.number);
  });

  return card;
}

function renderCards(){
  const mount = document.getElementById('cards');
  mount.innerHTML = '';
  SERVICES.forEach(svc => mount.appendChild(makeCard(svc)));
}

// ------- History -------
function renderHistory(){
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  if(history.length === 0){
    document.getElementById('historyEmpty').style.display = 'block';
    return;
  }
  document.getElementById('historyEmpty').style.display = 'none';
  history.forEach(item => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `
      <div class="meta">
        <strong>${item.name}</strong>
        <span class="small">${item.number}</span>
      </div>
      <div class="small">${item.time}</div>
    `;
    list.appendChild(li);
  });
}

// ------- Clear History -------
document.getElementById('clearHistory').addEventListener('click', () => {
  history.length = 0; renderHistory();
});

// ------- Start -------
renderCards(); updateNavbar(); renderHistory();
