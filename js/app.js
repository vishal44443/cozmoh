// Data: update thumbnail paths and templateLink values as needed
const templates = [
  { id:1, name:"Clean home service", thumbnail:"screenshots/s1.gif", templateLink:"https://demosites.royal-elementor-addons.com/cleaning-v1/?ref=rea-plugin-backend-templates" },
  { id:2, name:"online course", thumbnail:"screenshots/s2.gif", templateLink:"https://demosites.royal-elementor-addons.com/online-course-v1/" },
  { id:3, name:"exchange", thumbnail:"screenshots/s3.gif", templateLink:"https://demosites.royal-elementor-addons.com/landing-page-investment-platform-v1/?ref=rea-plugin-backend-templates" },
  { id:4, name:"fashion", thumbnail:"screenshots/s4.png", templateLink:"https://demosites.royal-elementor-addons.com/shop-wooshop-v2/?ref=rea-plugin-backend-templates" },
  { id:5, name:"personal porfolio", thumbnail:"screenshots/s5.png", templateLink:"https://demosites.royal-elementor-addons.com/landing-page-digital-product-v1/?ref=rea-plugin-backend-templates" },
  { id:6, name:"finance", thumbnail:"screenshots/s6.png", templateLink:"https://demosites.royal-elementor-addons.com/financial-services-v1/"},
  { id:7, name:"restaurant", thumbnail:"screenshots/s7.png", templateLink:"https://demosites.royal-elementor-addons.com/restaurant-v1/" },
  { id:8, name:"lawyer", thumbnail:"screenshots/s8.png", templateLink:"https://demosites.royal-elementor-addons.com/lawyer-v1/?ref=rea-plugin-backend-templates" },
  { id:9, name:"personal porfolio", thumbnail:"screenshots/s9.png", templateLink:"https://demosites.royal-elementor-addons.com/one-page-v2/?ref=rea-plugin-backend-templates" },
  { id:10, name:"Car repair", thumbnail:"screenshots/s10.png", templateLink:"https://demosites.royal-elementor-addons.com/car-repair-v1/?ref=rea-plugin-backend-templates" },
  { id:11, name:"Gym", thumbnail:"screenshots/s11.png", templateLink:"https://demosites.royal-elementor-addons.com/fitness-gym-v1/?ref=rea-plugin-backend-templates"},
  { id:12, name:"doctor", thumbnail:"screenshots/s12.png", templateLink:"https://demosites.royal-elementor-addons.com/dental-v1/?ref=rea-plugin-backend-templates" },
  { id:13, name:"Consultant One", thumbnail:"screenshots/s13.png", templateLink:"https://demosites.royal-elementor-addons.com/construction-v3/" },
  { id:14, name:"Cyber security", thumbnail:"screenshots/s14.png", templateLink:"https://demosites.royal-elementor-addons.com/cybersecurity-v1/" },
  { id:15, name:"Restaurant", thumbnail:"screenshots/s15.png", templateLink:"https://demosites.royal-elementor-addons.com/pizza-v1/" },
  { id:16, name:"fashion", thumbnail:"screenshots/s16.png",   templateLink:"https://demosites.royal-elementor-addons.com/fashion-v3/" },
  { id:17, name:"Pet shop", thumbnail:"screenshots/s17.png", templateLink:"https://demosites.royal-elementor-addons.com/pet-shop-v1/" },
  { id:18, name:"digital marketing ", thumbnail:"screenshots/s18.png", templateLink:"https://demosites.royal-elementor-addons.com/digital-marketing-agency-v4/" },
  { id:19, name:"Digital", thumbnail:"screenshots/s19.png", templateLink:"https://demosites.royal-elementor-addons.com/digital-marketing-agency-v2/" },
  { id:20, name:"Doctor", thumbnail:"screenshots/s20.png", templateLink:"https://demosites.royal-elementor-addons.com/medical-v1/" }
];

const grid = document.getElementById('grid');
const toast = document.getElementById('toast');

function showToast(msg='Link copied'){
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._hideTimeout);
  toast._hideTimeout = setTimeout(()=> toast.classList.remove('show'), 1600);
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  } catch (err) {
    document.body.removeChild(textArea);
    return false;
  }
}

async function copyText(text){
  if(navigator.clipboard && navigator.clipboard.writeText){
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch(e){
      return fallbackCopyTextToClipboard(text);
    }
  } else {
    return fallbackCopyTextToClipboard(text);
  }
}

function escapeHtml(str){
  if(!str && str !== 0) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

document.getElementById('search').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filteredTemplates = templates.filter(t => t.name.toLowerCase().includes(query));
  render(filteredTemplates);
});

function render(filteredTemplates = templates) {
  grid.innerHTML = '';
  filteredTemplates.forEach(t => {
    const li = document.createElement('li');
    li.className = 'card';
    li.setAttribute('role','listitem');
    li.innerHTML = `
      <div class="thumb">
        <img alt="${escapeHtml(t.name)} screenshot" src="${escapeHtml(t.thumbnail)}" onerror="this.style.opacity='0.4'">
      </div>
      <div class="card-body">
        <div style="min-width:0">
          <div class="name">${escapeHtml(t.name)}</div>
          <div class="sub">Template ID: ${t.id}</div>
        </div>
        <div class="actions">
          <button class="copy" data-link="${escapeHtml(t.templateLink)}" aria-label="Copy link for ${escapeHtml(t.name)}">Copy</button>
        </div>
      </div>
      <div class="card-footer">
        <div class="link-preview" title="${escapeHtml(t.templateLink)}">${escapeHtml(t.templateLink)}</div>
        <div style="font-size:12px;color:var(--muted)">${t.id}</div>
      </div>
    `;
    li.querySelector('button.copy').addEventListener('click', async (ev) => {
      const link = ev.currentTarget.getAttribute('data-link') || '';
      const ok = await copyText(link);
      if(ok){
        showToast('Link copied to clipboard ✅');
        ev.currentTarget.setAttribute('aria-pressed','true');
        setTimeout(()=> ev.currentTarget.setAttribute('aria-pressed','false'), 1200);
      } else {
        showToast('Copy failed — select and copy manually');
      }
    });
    grid.appendChild(li);
  });
}

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' && document.activeElement && document.activeElement.matches('button.copy')){
    document.activeElement.click();
  }
});

render();
