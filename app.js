const projectGrid = document.querySelector('#projectGrid');
const productGrid = document.querySelector('#productGrid');
const modal = document.querySelector('#modal');
const close = document.querySelector('#close');

// Embedded data keeps the website fully functional even when index.html is opened directly
// from a ZIP/file:// without a web server.
const projects = [
  {
    title:'Smart Soil Testing & Irrigation', category:'IoT / Agriculture', image:'assets/smart-soil.png',
    summary:'Portable soil sensing, nutrient/NPK measurement, calibration and connected irrigation intelligence.',
    problem:'Farmers need reliable soil information and irrigation decisions without depending on manual sampling and guesswork.',
    solution:'A portable ESP32-S3 based sensing system captures soil parameters, supports calibration and sends measurements to a connected dashboard for irrigation decisions.',
    features:['Soil moisture monitoring','Temperature and conductivity sensing','NPK / nutrient measurement interface','Calibration through Wi-Fi','Automated irrigation control','MQTT / IoT connectivity'],
    details:'A field-ready soil monitoring and irrigation concept designed to turn soil measurements into practical irrigation and crop-management decisions.',
    stack:'ESP32-S3 • ESP-IDF • RS485/Modbus • Soil sensing • Wi-Fi • MQTT'
  },
  {
    title:'SirenGuard Modular Emergency System', category:'Safety / IoT', image:'assets/sirenguard.png',
    summary:'Plug-and-play connected siren architecture with replaceable electronics and serviceable modules.',
    problem:'Emergency systems become expensive and difficult to service when the controller, connectivity, audio, power and amplifier are tightly integrated.',
    solution:'A modular architecture where controller, LTE/connectivity, audio, Class-D amplifier, power management and BMS sections can be replaced independently.',
    features:['Replaceable controller module','LTE / Ethernet / Wi-Fi / BLE','I²S audio architecture','Class-D amplifier module','Battery charger and BMS','Remote status and diagnostics'],
    details:'Designed for public-safety and industrial alerting deployments where field serviceability and module replacement are important.',
    stack:'CM5 / ESP32-S3 • LTE • Ethernet • Wi-Fi • BLE • I²S • Class-D • BMS'
  },
  {
    title:'FarmGuard Smart Irrigation Pump Controller', category:'Agriculture IoT', image:'assets/farmguard.png',
    summary:'Smart irrigation pump control with water-level monitoring, motor protection and connected field status.',
    problem:'Agricultural pumps can run dry, waste water or operate at the wrong time when irrigation and tank conditions are not monitored.',
    solution:'FarmGuard is a connected pump-controller concept for agricultural installations, combining water-level inputs, protected pump-control logic and a mobile monitoring interface.',
    features:['Tank / borewell water-level monitoring','Automatic irrigation pump start / stop','Dry-run protection using suitable sensors','Overflow prevention where tank sensing is installed','Remote status, alerts and control','Pump runtime and event history'],
    details:'Designed for farms and irrigation installations. Sensor selection, pump ratings, electrical protection and connectivity options are finalized for the installation during engineering.',
    stack:'ESP32 / suitable MCU • Level sensing • Pump control interface • Wi-Fi / optional cellular • Mobile dashboard'
  },
  {
    title:'HomeGuard Smart Water System', category:'Smart Infrastructure', image:'assets/homeguard.png',
    summary:'Connected water monitoring and control for tanks, pumps, leakage and household water management.',
    problem:'Water overflow, dry-run pumps, hidden leakage and poor visibility can waste water and damage household infrastructure.',
    solution:'HomeGuard combines level, flow and leakage sensing with automatic pump/control logic and connected monitoring.',
    features:['Tank level monitoring','Flow measurement','Leak detection','Automatic pump control','Dry-run / overflow protection','Mobile / IoT status monitoring'],
    details:'The modular architecture supports easier installation, maintenance and future sensor expansion for homes and small buildings.',
    stack:'ESP32 • Level sensing • Flow sensing • Leak sensing • Pump control • Wi-Fi • IoT'
  },
  {
    title:'QBESIQ FactoryOS', category:'Industrial Intelligence', image:'assets/factoryos-new.png',
    summary:'AI-powered factory intelligence for machine condition, production signals and actionable events.',
    problem:'Factories often collect machine data but still struggle to answer what is going wrong, why it is happening and what should be done.',
    solution:'QBESIQ FactoryOS combines edge sensing, machine data, analytics and dashboards into one scalable factory intelligence platform.',
    features:['Machine health monitoring','Vibration / temperature / current data','Production and event tracking','Anomaly detection','Root-cause investigation workflow','Actionable dashboards and alerts'],
    details:'A scalable Industrial IoT and AI platform designed to convert raw factory signals into understandable decisions for operators and maintenance teams.',
    stack:'Edge gateway • Vibration • Temperature • Current • RS485/Modbus • Edge AI • Dashboard'
  },
  {
    title:'MachineGuard AI', category:'Predictive Maintenance', image:'assets/machineguard.png',
    summary:'Machine condition monitoring using vibration, temperature and current to detect abnormal behavior early.',
    problem:'Motor and rotating-machine failures are often detected only after performance has degraded or a breakdown has already occurred.',
    solution:'A compact multi-sensor monitoring node processes machine signals at the edge and publishes machine-health indicators to the factory platform.',
    features:['3-axis vibration sensing','Temperature / RTD interface','Current monitoring','Machine-health score','Abnormal vibration detection','IoT / FactoryOS connectivity'],
    details:'Designed for motors, pumps, fans, compressors and other rotating assets where early anomaly detection can reduce downtime.',
    stack:'3-axis vibration • RTD/temperature • Current sensing • ESP32/STM32 • Edge analytics'
  },
  {
    title:'Broken Part Detection', category:'AI Vision Inspection', image:'assets/broken-part-detection-new.png',
    summary:'Camera-based inspection for cracks, missing pieces, deformation and visible component damage.',
    problem:'Manual inspection can miss damaged components and is difficult to scale consistently on a production line.',
    solution:'An industrial camera station uses controlled lighting and computer vision / AI to identify broken or visibly damaged parts before the next process.',
    features:['Crack and break detection','Missing-part detection','Deformation inspection','Pass / fail classification','Production counting and logging','PLC / GPIO trigger output'],
    details:'A production-line vision station designed for automated quality control and traceability, with configurable inspection rules for different part types.',
    stack:'Industrial camera • Edge AI • OpenCV / AI model • Controlled lighting • PLC/GPIO'
  },
  {
    title:'Vision Detection System', category:'AI Vision Inspection', image:'assets/vision-detection-new.png',
    summary:'General-purpose machine vision for presence, position, orientation and visual-quality inspection.',
    problem:'Production lines need fast and repeatable visual checks that can identify incorrect parts or assembly conditions.',
    solution:'A flexible industrial vision station validates part presence, position, orientation and visual quality and provides pass/fail signals to automation equipment.',
    features:['Object / part presence detection','Position and orientation checking','Color / surface inspection','AI classification','Pass / fail decision','PLC and industrial-network integration'],
    details:'A reusable vision platform for inspection stations, assembly verification, sorting and process-quality monitoring.',
    stack:'Industrial camera • Edge compute • Vision AI • OpenCV • PLC/GPIO • Industrial Ethernet'
  },
  {
    title:'BMS Battery Management System', category:'Battery / Energy Systems', image:'assets/bms.png',
    summary:'Battery monitoring and protection for safer, more consistent battery-pack operation.',
    problem:'Battery packs need coordinated monitoring of cell voltage, current and temperature to help identify unsafe or imbalanced operating conditions.',
    solution:'A battery management system concept monitors battery status and supports protection logic, state-of-charge estimation and cell balancing when matched to the selected chemistry and hardware.',
    features:['Cell-voltage monitoring','Pack current measurement','Temperature monitoring','State-of-charge estimation','Cell balancing support','Fault status and data logging'],
    details:'BMS configuration depends on battery chemistry, series cell count, current limits, balancing method and required safety design. Protection thresholds must be validated for the final battery pack.',
    stack:'Battery monitor IC • Current sensing • Temperature sensing • MCU • Balancing circuitry • CAN / UART / RS485 (as required)'
  },
  {
    title:'Smart Rainwater Harvesting Guardian', category:'Water / Sustainability', image:'assets/rainwater-harvesting.png',
    summary:'Intelligent rainwater harvesting monitoring, water-quality checks, recharge control and remote alerts.',
    problem:'Rainwater harvesting installations often operate without measurement, quality monitoring or visibility into storage and recharge performance.',
    solution:'Smart RWH Guardian adds connected sensing and automation to existing harvesting infrastructure for measurable, safer and more efficient water management.',
    features:['Rainfall measurement','Tank level and flow monitoring','Turbidity / pH / EC-TDS sensing','Leak and pressure monitoring','First-flush automation','Recharge / pump / valve control','Remote alerts and dashboard'],
    details:'Designed to convert conventional rainwater harvesting into a connected water-management system for homes, institutions and commercial sites.',
    stack:'ESP32-S3 • Rain gauge • Level • Flow • Water quality • Pressure • Leak sensing • Wi-Fi/4G/RS485'
  }
];

const products = [
  {name:'Smart Soil Testing & Irrigation',type:'Agriculture IoT',image:'assets/smart-soil.png',desc:'Portable soil testing, nutrient sensing and connected irrigation intelligence for practical agriculture.'},
  {name:'SirenGuard',type:'Connected Safety',image:'assets/sirenguard.png',desc:'Plug-and-play emergency alerting with replaceable controller, LTE, audio, amplifier and power modules.'},
  {name:'HomeGuard',type:'Smart Water',image:'assets/homeguard.png',desc:'Smart tank, pump, flow and leakage monitoring with connected household water control.'},
  {name:'FarmGuard',type:'Agriculture IoT',image:'assets/farmguard.png',desc:'Smart irrigation pump control with water-level monitoring, dry-run protection, overflow prevention where applicable, and remote monitoring.'},
  {name:'BMS Battery Management System',type:'Battery & Energy Systems',image:'assets/bms.png',desc:'Battery monitoring and protection with voltage, current, temperature, state-of-charge and cell-balancing support.'},
  {name:'QBESIQ FactoryOS',type:'Factory Intelligence',image:'assets/factoryos-new.png',desc:'AI-powered factory operating system for machine condition, production signals, events and analytics.'},
  {name:'MachineGuard AI',type:'Predictive Maintenance',image:'assets/machineguard.png',desc:'Vibration, temperature and current-based machine-health monitoring and early anomaly detection.'},
  {name:'Broken Part Detection',type:'AI Vision Inspection',image:'assets/broken-part-detection-new.png',desc:'Vision inspection for cracks, missing pieces, deformation and visible component damage.'},
  {name:'Vision Detection System',type:'Industrial Vision',image:'assets/vision-detection-new.png',desc:'Industrial camera and edge-AI inspection for presence, position, orientation and visual quality.'},
  {name:'Smart RWH Guardian',type:'Rainwater Harvesting',image:'assets/rainwater-harvesting.png',desc:'Smart rainwater harvesting monitoring, water-quality sensing, recharge control and remote alerts.'}
];

function projectCard(p,i){
  return `<article class="project-card" data-i="${i}">
    <div class="image-wrap"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
    <div class="project-body">
      <small>${p.category}</small><h3>${p.title}</h3><p>${p.summary}</p>
      <div class="mini-info"><strong>Problem</strong><span>${p.problem}</span></div>
      <div class="mini-info"><strong>Solution</strong><span>${p.solution}</span></div>
      <div class="feature-tags">${p.features.slice(0,4).map(x=>`<span>${x}</span>`).join('')}</div>
      <button class="view-btn" type="button">View complete project details →</button>
    </div>
  </article>`;
}

function productCard(p,i){
  return `<article class="product-card" data-p="${i}">
    <div class="image-wrap"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
    <div class="product-body"><small>${p.type}</small><h3>${p.name}</h3><p>${p.desc}</p><button class="view-btn" type="button">View solution details →</button></div>
  </article>`;
}

function openProject(p){
  if(!p) return;
  document.querySelector('#modalImg').src=p.image;
  document.querySelector('#modalImg').alt=p.title;
  document.querySelector('#modalCat').textContent=p.category;
  document.querySelector('#modalTitle').textContent=p.title;
  document.querySelector('#modalSummary').textContent=p.summary;
  document.querySelector('#modalDetails').innerHTML = `
    <strong>Problem</strong><br>${p.problem || ''}<br><br>
    <strong>Solution</strong><br>${p.solution || p.details || ''}<br><br>
    <strong>Key Features</strong><br>${(p.features||[]).map(x=>'• '+x).join('<br>')}
  `;
  document.querySelector('#modalStack').textContent='Technology: '+(p.stack || 'QBES product architecture');
  modal.classList.add('show');
}

function render(){
  if(projectGrid){
    projectGrid.innerHTML=projects.map(projectCard).join('');
    document.querySelectorAll('.project-card').forEach(c=>c.addEventListener('click',()=>openProject(projects[+c.dataset.i])));
  }
  if(!productGrid) return;
  productGrid.innerHTML=products.map(productCard).join('');
  document.querySelectorAll('.product-card').forEach(c=>c.addEventListener('click',()=>{
    const product=products[+c.dataset.p];
    const match=projects.find(p=>p.title===product.name || p.title.toLowerCase().includes(product.name.toLowerCase()) || product.name.toLowerCase().includes(p.title.toLowerCase()));
    if(match) openProject(match); else openProject({title:product.name,category:product.type,image:product.image,summary:product.desc,problem:'Product concept focused on a real-world engineering requirement.',solution:product.desc,features:[],stack:'QBES product architecture'});
  }));
}

close.addEventListener('click',()=>modal.classList.remove('show'));
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('show')});
document.querySelector('.menu').addEventListener('click',()=>document.querySelector('.nav nav').classList.toggle('open'));
render();

/* QBES V15 full-page interaction layer */
(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const progress = document.createElement('div');
  progress.className='page-progress';
  progress.innerHTML='<i></i>';
  body.prepend(progress);

  const ambient = document.createElement('div');
  ambient.className='ambient-field';
  for(let i=0;i<10;i++) ambient.appendChild(document.createElement('span'));
  body.appendChild(ambient);

  if(!reduce && window.matchMedia('(pointer:fine)').matches){
    const glow=document.createElement('div'); glow.className='cursor-glow'; body.appendChild(glow);
    let gx=0,gy=0,tx=0,ty=0;
    window.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;glow.style.opacity='.85'});
    function moveGlow(){gx+=(tx-gx)*.12;gy+=(ty-gy)*.12;glow.style.left=gx+'px';glow.style.top=gy+'px';requestAnimationFrame(moveGlow)} moveGlow();
    window.addEventListener('pointerleave',()=>glow.style.opacity='0');
  }

  const revealTargets=document.querySelectorAll('.section,.innovation-section,.cta,.contact-card,.panel,.pub-grid article,.service-grid article,.flow-card');
  revealTargets.forEach((el,i)=>{el.classList.add('reveal'); if(i%5===1) el.classList.add('reveal-left'); if(i%5===3) el.classList.add('reveal-right')});
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -45px'});
  revealTargets.forEach(el=>io.observe(el));

  function observeDynamic(){document.querySelectorAll('.product-card').forEach((el,i)=>{if(!el.classList.contains('reveal')){el.classList.add('reveal');io.observe(el)}})}
  observeDynamic();
  const pg=document.querySelector('#productGrid');
  if(pg) new MutationObserver(observeDynamic).observe(pg,{childList:true});

  const nav=document.querySelector('.nav');
  const links=[...document.querySelectorAll('.nav nav a')];
  const sections=[...document.querySelectorAll('main section[id]')];
  function scrollFX(){
    const max=document.documentElement.scrollHeight-window.innerHeight;
    progress.firstElementChild.style.width=(max>0?(window.scrollY/max)*100:0)+'%';
    nav.classList.toggle('scrolled',window.scrollY>18);
    let active='home';
    sections.forEach(s=>{if(window.scrollY>=s.offsetTop-180) active=s.id});
    links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+active));
  }
  window.addEventListener('scroll',scrollFX,{passive:true}); scrollFX();

  if(!reduce && window.matchMedia('(pointer:fine)').matches){
    const tiltSelectors='.panel,.service-grid article,.flow-card,.product-card,.pub-grid article';
    document.querySelectorAll(tiltSelectors).forEach(card=>{
      card.addEventListener('pointermove',e=>{
        if(window.innerWidth<900) return;
        const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(900px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave',()=>{card.style.transform=''});
    });
  }

  // Keep dynamically-created product cards animated and clickable.
  if(pg){
    const refresh=()=>{document.querySelectorAll('.product-card').forEach((card,i)=>{card.style.setProperty('--card-index',i);});observeDynamic()};
    setTimeout(refresh,60);
  }
})();


// QBES V17: reveal the hero message when the cursor enters the left intelligence zone.
(function(){
  const hero=document.querySelector('.hero');
  if(!hero || window.matchMedia('(max-width: 900px)').matches) return;
  const reveal=()=>hero.classList.add('copy-revealed');
  const hide=()=>hero.classList.remove('copy-revealed');
  hero.addEventListener('mousemove',e=>{
    const r=hero.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width;
    const y=(e.clientY-r.top)/r.height;
    if(x<0.56 && y>0.20) reveal();
    else if(x>0.64) hide();
  });
  hero.addEventListener('mouseleave',hide);
})();
