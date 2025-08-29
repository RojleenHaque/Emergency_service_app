const SERVICES = [
  { id:'nat', icon:'assets/emergency.png', nameEn:'National Emergency Number', number:'999', category:'National Emergency', btnn:'all' },
  { id:'pol', icon:'assets/police.png', nameEn:'Police Helpline Number', number:'999', category:'Police', btnn:'police' },
  { id:'fire', icon:'assets/fire-service.png', nameEn:'Fire Service Number', number:'999', category:'Fire Service', btnn:'fire' },
  { id:'amb', icon:'assets/ambulance.png', nameEn:'Ambulance Service', number:'1994-999999', category:'Ambulance', btnn:'Health' },
  { id:'women', icon:'assets/emergency.png', nameEn:'Women & Child Helpline', number:'109', category:'Women & Child', btnn:'Help' },
  { id:'anti', icon:'assets/emergency.png', nameEn:'Anti-Corruption Helpline', number:'106', category:'Anti-Corruption', btnn:'Govt.' },
  { id:'power', icon:'assets/emergency.png', nameEn:'Electricity Helpline', number:'16216', category:'Electricity Outage', btnn:'Electricity' },
  { id:'brac', icon:'assets/brac.png', nameEn:'BRAC Helpline', number:'16445', category:'BRAC', btnn:'NGO' },
  { id:'rail', icon:'assets/Bangladesh-RailWay.png', nameEn:'Bangladesh Railway ', number:'163', category:'Railway', btnn:'Travel' },
];

// ------- State -------
let heartCount = 0, coinCount = 100, copyCount = 0;
const history = [];

const $ = (s,root=document)=>root.querySelector(s);

// ------- Helpers -------
function formatNow(){
  return new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit' });
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
  if(navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
  const ta = document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); } finally { document.body.removeChild(ta); }
  return Promise.resolve();
}

// ------- Render Cards -------
function makeCard(svc){
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.serviceId = svc.id;

  card.innerHTML = `
    <div class="avatar"><img src="${svc.icon}" alt="${svc.nameEn}"></div>
    <div class="names-heart">
      <div class="en">${svc.nameEn}</div>
      <button class="heart-btn" title="Add to favorites">💗</button>
    </div>
    <div class="badge">${svc.category}</div>
    <div class="number">${svc.number}</div>
    <div class="btnn">${svc.btnn}</div>
    <div class="actions">
      <button class="btn copy"><img src="assets/copy.jpeg" alt=""> Copy</button>
      <button class="btn call"><img src="assets/call.jpeg" alt=""> Call</button>
    </div>
  `;

  card.querySelector('.heart-btn').addEventListener('click', () => { heartCount++; updateNavbar(); });
  card.querySelector('.btn.copy').addEventListener('click', async () => {
    await copyToClipboard(svc.number);
    copyCount++; updateNavbar();
    alert(`Copied "${svc.number}" for ${svc.nameEn}`);
  });
  card.querySelector('.btn.call').addEventListener('click', () => {
    if(coinCount<20){ alert('Not enough coins to call.'); return; }
    coinCount-=20; updateNavbar();
    const when=formatNow(); history.unshift({name:svc.nameEn, number:svc.number, time:when}); renderHistory();
    tel(svc.number);
  });

  return card;
}

function renderCards(){
  const mount = document.getElementById('cards');
  mount.innerHTML = '';
  SERVICES.forEach(svc => mount.appendChild(makeCard(svc)));
}

// ------- Render History -------
function renderHistory(){
  const list = document.getElementById('historyList');
  list.innerHTML='';
  if(history.length===0){ document.getElementById('historyEmpty').style.display='block'; return; }
  document.getElementById('historyEmpty').style.display='none';
  history.forEach(item=>{
    const li = document.createElement('li');
    li.className='history-item';
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
document.getElementById('clearHistory').addEventListener('click', ()=>{ 
  history.length=0; 
  renderHistory(); 
});

// ------- Start -------
renderCards(); 
updateNavbar(); 
renderHistory();

