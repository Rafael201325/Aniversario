const config = window.INVITE_CONFIG;
const $ = selector => document.querySelector(selector);
const screens = [...document.querySelectorAll(".screen")];
let audioContext;
let soundtrackTimer;

document.documentElement.style.setProperty("--green", config.corPrincipal || "#71ff9b");
if (config.imagemFundo) document.body.style.backgroundImage = `linear-gradient(rgba(3,6,5,.78),rgba(3,6,5,.94)),url("${config.imagemFundo}")`;

function showScreen(id) {
  screens.forEach(screen => { screen.classList.toggle("active", screen.id === id); screen.setAttribute("aria-hidden", screen.id === id ? "false" : "true"); });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function context() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function tone(frequency = 520, duration = .07, volume = .035, type = "sine", delay = 0) {
  try { const ctx = context(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = type; osc.frequency.value = frequency; gain.gain.setValueAtTime(volume, ctx.currentTime + delay); gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + delay + duration); osc.connect(gain).connect(ctx.destination); osc.start(ctx.currentTime + delay); osc.stop(ctx.currentTime + delay + duration); } catch (_) {}
}

function effect(name) {
  if (name === "success") [523,659,784].forEach((n,i) => tone(n,.22,.045,"sine",i*.1));
  else if (name === "envelope") { tone(180,.25,.04,"triangle"); tone(420,.12,.025,"sine",.15); }
  else tone(name === "scan" ? 360 : 620,.055,.025,name === "scan" ? "square" : "sine");
}

function vibrate(pattern) { if (navigator.vibrate) navigator.vibrate(pattern); }
function flash() { const el = $("#flash"); el.classList.remove("active"); void el.offsetWidth; el.classList.add("active"); }
function toast(message) { const el = $("#toast"); el.textContent = message; el.classList.add("show"); clearTimeout(el.timer); el.timer = setTimeout(() => el.classList.remove("show"), 2500); }

function celebrate(total = 90) {
  const box = $("#celebration"); box.replaceChildren();
  for (let i=0;i<total;i++) { const piece=document.createElement("i"); piece.style.left=`${Math.random()*100}%`; piece.style.animationDelay=`${Math.random()*.7}s`; piece.style.setProperty("--duration",`${2+Math.random()*2}s`); piece.style.setProperty("--drift",`${-100+Math.random()*200}px`); piece.style.setProperty("--color",Math.random()>.5?"var(--green)":"var(--gold)"); box.append(piece); }
  setTimeout(() => box.replaceChildren(), 4800);
}

function startSoundtrack() {
  const button=$("#sound-toggle"); const active=button.getAttribute("aria-pressed")==="true";
  if (active) { clearInterval(soundtrackTimer); if (config.musica && window.missionAudio) window.missionAudio.pause(); button.setAttribute("aria-pressed","false"); button.textContent="▶ ATIVAR TRILHA"; return; }
  context();
  if (config.musica) { window.missionAudio ||= new Audio(config.musica); window.missionAudio.loop=true; window.missionAudio.volume=.25; window.missionAudio.play().catch(()=>toast("Não foi possível carregar a música.")); }
  else { const play=()=>{ tone(110,1.8,.012,"sine"); tone(165,1.7,.007,"triangle",.1); }; play(); soundtrackTimer=setInterval(play,1900); }
  button.setAttribute("aria-pressed","true"); button.textContent="Ⅱ PAUSAR TRILHA";
}

function stopSoundtrack() {
  clearInterval(soundtrackTimer);
  soundtrackTimer = undefined;
  if (window.missionAudio) {
    window.missionAudio.pause();
    window.missionAudio.currentTime = 0;
  }
  if (audioContext?.state === "running") audioContext.suspend();
  const button = $("#sound-toggle");
  button.setAttribute("aria-pressed", "false");
  button.textContent = "▶ ATIVAR TRILHA";
}

function runScanner() {
  showScreen("screen-scan"); const statuses=["Lendo credenciais...","Validando acesso...","Conectando ao servidor...","Autorização encontrada."]; let progress=0;
  const timer=setInterval(()=>{ progress=Math.min(100,progress+Math.floor(Math.random()*6)+3); $("#progress-bar").style.width=`${progress}%`; $(".progress").setAttribute("aria-valuenow",progress); $("#progress-number").textContent=`${String(progress).padStart(2,"0")}%`; $("#scan-status").textContent=statuses[progress<28?0:progress<58?1:progress<90?2:3]; if(progress%16<5) effect("scan"); if(progress===100){clearInterval(timer);setTimeout(()=>{effect("success");flash();showScreen("screen-envelope")},600)}},95);
}

function revealMission() { $("#envelope-btn").classList.add("open"); effect("envelope"); vibrate([40,30,70]); setTimeout(()=>{flash();showScreen("screen-mission");celebrate();typeMission()},1100); }
function typeMission(){ const el=$("#mission-title"); const text="Comparecer ao aniversário de"; el.textContent=""; [...text].forEach((char,i)=>setTimeout(()=>{el.textContent+=char;if(i%3===0)tone(720,.025,.009)},i*42)); }

function pagodeFanfare() {
  [392, 440, 523, 659].forEach((note, index) => tone(note, .28, .045, index % 2 ? "triangle" : "sine", index * .11));
  [0, .22, .44, .66].forEach(delay => tone(125, .09, .055, "square", delay));
}

function confirmMission(event) {
  event.preventDefault();
  const whatsappUrl = $("#whatsapp-btn").href;
  if ($("#sound-toggle").getAttribute("aria-pressed") !== "true") startSoundtrack();
  pagodeFanfare();
  celebrate(150);
  flash();
  showScreen("screen-final");
  document.body.classList.add("party-mode");
  vibrate([60,40,100,40,70]);
  setTimeout(() => {
    stopSoundtrack();
    window.location.href = whatsappUrl;
  }, 10000);
}

function fillConfig(){ $("#birthday-name").textContent=config.nome; $("#event-date").textContent=config.data; $("#event-time").textContent=config.horario; $("#event-location").textContent=config.local; $("#event-dress").textContent=config.traje; $("#event-notes").textContent=config.observacoes; $("#maps-btn").href=config.googleMaps; const phone=String(config.telefone||"").replace(/\D/g,""); $("#whatsapp-btn").href=`https://wa.me/${phone}?text=${encodeURIComponent(config.mensagemWhatsApp)}`; }

function updateCountdown(){ const distance=Math.max(0,new Date(config.dataEvento).getTime()-Date.now()); const units=[Math.floor(distance/86400000),Math.floor(distance%86400000/3600000),Math.floor(distance%3600000/60000),Math.floor(distance%60000/1000)]; ["days","hours","minutes","seconds"].forEach((id,i)=>$("#"+id).textContent=String(units[i]).padStart(2,"0")); $("#countdown").classList.toggle("warning",distance<7*86400000&&distance>=86400000); $("#countdown").classList.toggle("urgent",distance<86400000); }

function particles(){ const canvas=$("#particles"),ctx=canvas.getContext("2d"),reduced=matchMedia("(prefers-reduced-motion: reduce)").matches; let dots=[]; const resize=()=>{const dpr=Math.min(devicePixelRatio||1,2);canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";ctx.setTransform(dpr,0,0,dpr,0,0);dots=Array.from({length:Math.min(65,Math.floor(innerWidth/8))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,v:.15+Math.random()*.35,r:.4+Math.random()*1.2}))}; const draw=()=>{ctx.clearRect(0,0,innerWidth,innerHeight);ctx.fillStyle=config.corPrincipal||"#71ff9b";dots.forEach(d=>{ctx.globalAlpha=.15+Math.random()*.45;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();if(!reduced){d.y-=d.v;if(d.y<0)d.y=innerHeight}});ctx.globalAlpha=1;if(!reduced)requestAnimationFrame(draw)};addEventListener("resize",resize,{passive:true});resize();draw();}

$("#accept-btn").addEventListener("click",()=>{effect("click");vibrate(40);flash();runScanner()}); $("#envelope-btn").addEventListener("click",revealMission,{once:true}); $("#sound-toggle").addEventListener("click",startSoundtrack); $("#whatsapp-btn").addEventListener("click",confirmMission); $("#restart-btn").addEventListener("click",()=>location.reload());
fillConfig(); updateCountdown(); setInterval(updateCountdown,1000); particles();
// Remove instalações e caches de versões anteriores que funcionavam como PWA.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => registrations.forEach(registration => registration.unregister()));
}
if ("caches" in window) {
  caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("missao-secreta-")).map(key => caches.delete(key))));
}
