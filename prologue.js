(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.createElement('section');
  stage.id = 'prologue';
  stage.setAttribute('aria-label', '南瓜假期互動序幕');
  stage.dataset.phase = 'welcome';
  stage.innerHTML = `
    <div class="pr-space"><canvas id="pr-stars" aria-hidden="true"></canvas><div class="pr-grid"></div><div class="pr-orb orb-a"></div><div class="pr-orb orb-b"></div><div class="pr-orb orb-c"></div></div>
    <div class="pr-top"><img src="assets/logo.png" alt="Pumpkin VR"><span class="pr-edition">PUMPKIN ESCAPE / 2026</span><div class="pr-top-actions"><button id="pr-sound" aria-pressed="false">♫ 音效關</button><button id="pr-skip">跳過遊戲 ↗</button></div></div>
    <div class="pr-intro"><span class="pr-label">一封邀請，藏在日常的另一邊。</span><h1>這次，<br>逃離<span>日常。</span></h1><p>怒貓船長找到了一扇通往假期的門。<br>幫他充滿能量，看看門後是什麼。</p><button id="pr-start" class="pr-primary">啟動假期任務 <span>▶</span></button><small>一個約 20 秒的小挑戰・手機／鍵盤都能玩</small></div>
    <div class="pr-portal" aria-hidden="true"><div class="portal-halo"></div><div class="portal-ring ring-a"></div><div class="portal-ring ring-b"></div><div class="portal-ring ring-c"></div><div class="portal-sea"></div><span class="portal-coordinate">21°56′ N / KENTING</span><div class="portal-locks"><i>✦</i><i>✦</i><i>✦</i></div></div>
    <img class="pr-captain" src="assets/captain-alt.png" alt="QUANTAAR 怒貓船長官方原始角色圖">
    <div class="pr-character-tag"><span>CAPTAIN FURY</span>這一關，帶你去放假。</div><div class="pr-shard shard-a" aria-hidden="true"></div><div class="pr-shard shard-b" aria-hidden="true"></div><div class="pr-shard shard-c" aria-hidden="true"></div>
    <div class="pr-game-hud"><div><span>MISSION 01 / 開啟假期傳送門</span><h2>讓能量停在<span>亮色區域</span></h2></div><div class="pr-progress" aria-label="傳送門能量"><b id="pr-score">0</b><span>/ 3</span></div></div>
    <div class="pr-controls"><p id="pr-feedback" role="status">按住蓄力，放開發射。讓能量停在亮色區域！</p><div class="pr-meter" role="progressbar" aria-label="發射能量" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="pr-zone"></span><span id="pr-meter-fill"></span><i id="pr-needle"></i><span class="meter-zero">0</span><span class="meter-max">100</span></div><button id="pr-charge">按住蓄力 <span>↑ 放開發射</span></button><small>滑鼠／觸控長按　或　按住空白鍵再放開</small></div>
    <div id="pr-projectile" aria-hidden="true"></div><div class="pr-vignette" aria-hidden="true"></div>
    <div class="pr-cinema" aria-live="polite"><div class="cinema-sea"></div><div class="cinema-shutter shutter-left"></div><div class="cinema-shutter shutter-right"></div><div class="cinema-lines"><p>日常任務，暫停。</p><p>換我們，進入快樂的世界。</p></div><div class="cinema-invite"><div class="invite-eyebrow">南瓜虛擬科技股份有限公司 · 特別邀請</div><span class="invite-pretitle">你的假期，正式開場。</span><h2>歡樂的<br><em>耍費時光</em></h2><div class="invite-date">2026.11.12 — 11.13<span>墾丁夏都 · 兩天一夜</span></div><p>親愛的南瓜隊友，<br>這次，把主角的位置留給自己。</p><button class="pr-primary" id="pr-explore">展開我們的旅程 <span>→</span></button></div><div class="cinema-wave wave-one"></div><div class="cinema-wave wave-two"></div></div>
    <div class="pr-map"><div class="pr-map-heading"><span class="pr-label">HOLIDAY WORLD / 選一站，開始探索</span><h2>快樂，正在<span>載入。</span></h2><p>點擊旅程島嶼，打開這次的冒險。</p></div><div class="pr-islands"><svg viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true"><path d="M100 300 C250 20 340 440 500 180 S750 500 900 170"/></svg><button class="island island-hotel" data-island="0"><span class="island-picture"><img src="assets/hotel.png" alt="夏都海灘實景"></span><b>01 / 夏都</b><small>我們的海邊基地</small><i>＋</i></button><button class="island island-atv" data-island="1"><span class="island-picture"><img src="assets/atv.jpg" alt="越野實景參考"></span><b>02 / 越野</b><small>冒險模式 ON</small><i>＋</i></button><button class="island island-farm" data-island="2"><span class="island-picture"><img src="assets/farm.jpg" alt="農場實景參考"></span><b>03 / 農場</b><small>療癒值補滿</small><i>＋</i></button><button class="island island-kart" data-island="3"><span class="island-picture"><img src="assets/kart-real.jpg" alt="卡丁車場實景參考"></span><b>04 / 卡丁車</b><small>下一個彎，換你領先</small><i>＋</i></button></div><div class="pr-map-bottom"><button id="pr-replay">↻ 重播序幕</button><button id="pr-details" class="pr-primary">打開兩日行程與旅遊資訊 →</button><span>11/12—11/13 · 店家及部分安排待確認</span></div></div>
    <dialog id="pr-scene-dialog"><button id="pr-scene-close" aria-label="關閉景點">×</button><img id="pr-scene-img" alt=""><div class="pr-scene-body"><span id="pr-scene-time"></span><h2 id="pr-scene-title"></h2><p id="pr-scene-description"></p><small id="pr-scene-credit"></small><button id="pr-scene-schedule" class="pr-primary">查看兩天時間表 →</button></div></dialog>
    <div class="pr-bottom"><span>QUANTAAR ORIGINAL HERO · CAPTAIN FURY</span><span>把日常暫停，快樂繼續。</span></div>`;
  document.body.prepend(stage);
  const mainSections = [...document.body.children].filter(e => e !== stage && e.tagName !== 'SCRIPT');
  mainSections.forEach(e => e.inert = true);
  document.body.classList.add('prologue-active');
  const find = s => stage.querySelector(s);
  const many = s => [...stage.querySelectorAll(s)];
  let phase = 'welcome', score = 0, charging = false, power = 0, chargeStarted = 0, shotBusy = false;
  let timers = [], sound = false, audio;
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
  function tone(hz, duration = .15) {
    if (!sound || !audio) return;
    const oscillator = audio.createOscillator(), gain = audio.createGain();
    oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(hz, audio.currentTime);
    gain.gain.setValueAtTime(.045, audio.currentTime); gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + duration);
    oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(); oscillator.stop(audio.currentTime + duration);
  }
  function setPhase(value) { phase = value; stage.dataset.phase = value; }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function startGame() {
    clearTimers(); score = 0; power = 0; charging = false; shotBusy = false;
    stage.classList.remove('cinema-play', 'cinema-reveal', 'cinema-complete', 'pr-hit', 'pr-miss');
    many('.portal-locks i').forEach(i => i.classList.remove('lit'));
    find('#pr-score').textContent = '0'; find('#pr-charge').disabled = false; find('#pr-skip').textContent = '跳過遊戲 ↗';
    find('#pr-feedback').textContent = '按住蓄力，放開發射。讓能量停在亮色區域！';
    updateMeter(); setPhase('game'); find('#pr-charge').focus({preventScroll:true}); tone(330);
  }
  function updateMeter() {
    find('#pr-meter-fill').style.width = power + '%'; find('#pr-needle').style.left = power + '%';
    find('.pr-meter').setAttribute('aria-valuenow', String(Math.round(power)));
  }
  function beginCharge() {
    if (phase !== 'game' || shotBusy || charging) return;
    charging = true; chargeStarted = performance.now(); stage.classList.add('pr-charging');
    find('#pr-feedback').textContent = '對準亮色區域……準備放開！';
  }
  function releaseCharge() {
    if (!charging || phase !== 'game') return;
    charging = false; stage.classList.remove('pr-charging'); shotBusy = true;
    const hit = power >= 38 && power <= 80;
    stage.classList.remove('pr-hit', 'pr-miss');
    find('#pr-projectile').classList.remove('fired'); void stage.offsetWidth; find('#pr-projectile').classList.add('fired');
    tone(220 + power * 5, .2);
    later(() => {
      stage.classList.add(hit ? 'pr-hit' : 'pr-miss');
      if (hit) {
        many('.portal-locks i')[score].classList.add('lit'); score++;
        find('#pr-score').textContent = String(score);
        find('#pr-feedback').textContent = ['','漂亮！第一道封印解除。','第二道封印解除！假期就在眼前。','傳送門已開啟，準備出發！'][score];
        tone(520 + score * 180, .35);
      } else find('#pr-feedback').textContent = power < 38 ? '再多蓄一點能量。亮色區域等你！' : '能量太滿啦！下一次早一點放開。';
      if (score === 3) { find('#pr-charge').disabled = true; later(reveal, 900); }
      else later(() => { shotBusy = false; stage.classList.remove('pr-hit','pr-miss'); }, 400);
    }, reduced ? 10 : 480);
  }
  function reveal() {
    clearTimers(); charging = false; shotBusy = false; stage.classList.remove('pr-charging');
    setPhase('cinema'); find('#pr-skip').textContent = '直接揭幕 ↗';
    stage.classList.add('cinema-play'); tone(440,.6); later(()=>tone(660,.5),180); later(()=>tone(880,.6),360);
    if (reduced) return showInvitation();
    later(() => stage.classList.add('cinema-reveal'), 2200);
    later(showInvitation, 5200);
  }
  function showInvitation() {
    clearTimers(); stage.classList.add('cinema-complete'); setPhase('invitation');
    find('#pr-skip').textContent = '進入旅程 ↗'; find('#pr-explore').focus({preventScroll:true});
  }
  function showMap() { clearTimers(); setPhase('map'); find('#pr-skip').textContent='完整旅遊資訊 ↗'; find('[data-island="0"]').focus({preventScroll:true}); }
  function showDetails(anchor = '#schedule') {
    clearTimers(); charging = false; find('#pr-scene-dialog').close();
    stage.hidden = true; document.body.classList.remove('prologue-active'); mainSections.forEach(e=>e.inert=false);
    document.querySelector(anchor)?.scrollIntoView({behavior:'instant'});
    const target=document.querySelector(anchor); if(target){target.tabIndex=-1;target.focus({preventScroll:true});}
    replayButton.hidden=false;
  }
  find('#pr-start').onclick = startGame;
  find('#pr-explore').onclick = showMap;
  find('#pr-skip').onclick = () => { if(phase==='cinema')showInvitation();else if(phase==='invitation')showMap();else if(phase==='map')showDetails();else reveal(); };
  find('#pr-sound').onclick = async () => {
    sound = !sound;
    if(sound) { try{audio ||= new (window.AudioContext || window.webkitAudioContext)(); await audio.resume();}catch{sound=false;} }
    find('#pr-sound').textContent = sound ? '♫ 音效開' : '♫ 音效關'; find('#pr-sound').setAttribute('aria-pressed',String(sound)); tone(660);
  };
  const chargeButton=find('#pr-charge');
  chargeButton.addEventListener('pointerdown',e=>{e.preventDefault();chargeButton.setPointerCapture(e.pointerId);beginCharge();});
  chargeButton.addEventListener('pointerup',releaseCharge);
  chargeButton.addEventListener('pointercancel',()=>{charging=false;stage.classList.remove('pr-charging');power=0;updateMeter();});
  chargeButton.addEventListener('keydown',e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();if(!e.repeat)beginCharge();}});
  chargeButton.addEventListener('keyup',e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();releaseCharge();}});
  window.addEventListener('blur',()=>{charging=false;stage.classList.remove('pr-charging');});
  find('#pr-replay').onclick=startGame; find('#pr-details').onclick=()=>showDetails();
  find('#pr-scene-close').onclick=()=>find('#pr-scene-dialog').close();
  find('#pr-scene-schedule').onclick=()=>showDetails();
  const locations = [
    ['hotel.png','DAY 1 / 14:30 抵達','夏都・海邊基地','先寄放行李，15:00 起依飯店安排入住。15:30 水上、排球、室內自由參加，想放空也可以。11 月海域依天候開放，官網列至 17:00。','夏都官方海灘實景・本次住宿地點'],
    ['atv.jpg','DAY 1 / 11:30','越野・冒險開機','和隊友一起切換戶外冒險。店家、路線、體驗時長尚待確認。若第一天加開晚間團體活動，取消越野、增加飯店停留為備案。','維多利亞 ATV 真實參考場景・店家未定案'],
    ['farm.jpg','DAY 2 / 11:30','農場・療癒補給','慢下來，看看風景。照片以鹿境梅花鹿生態園區實景參考，實際農場待確認。第二天午餐原稿未列，仍待補上。','台灣旅圖／鹿境實景參考・農場未定案'],
    ['kart-real.jpg','DAY 2 / 13:00','卡丁車・快樂加速','這次同事變車友，想跑一圈，也能替隊友加油。車場、分組、輪次與參加條件待確認。14:30 下午茶，15:30 返程，預計18:00左營。','海角卡丁車場實景參考・車場未定案']
  ];
  many('[data-island]').forEach(b=>b.onclick=()=>{
    const s=locations[+b.dataset.island];find('#pr-scene-img').src='assets/'+s[0];find('#pr-scene-img').alt=s[4];
    find('#pr-scene-time').textContent=s[1];find('#pr-scene-title').textContent=s[2];find('#pr-scene-description').textContent=s[3];find('#pr-scene-credit').textContent=s[4];find('#pr-scene-dialog').showModal();tone(440);
  });
  const replayButton=document.createElement('button');replayButton.id='prologue-replay';replayButton.textContent='▶ 重玩假期序幕';replayButton.hidden=true;document.body.append(replayButton);
  replayButton.onclick=()=>{stage.hidden=false;mainSections.forEach(e=>e.inert=true);document.body.classList.add('prologue-active');replayButton.hidden=true;startGame();};
  const canvas=find('#pr-stars'),ctx=canvas.getContext('2d');
  let width=0,height=0,previous=0;
  const particles=Array.from({length:95},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.5+.3,s:Math.random()*.00002+.000005}));
  function resize(){width=stage.clientWidth;height=stage.clientHeight;canvas.width=width;canvas.height=height;}
  new ResizeObserver(resize).observe(stage);
  function frame(now){
    const delta=Math.min(now-previous,40); previous=now;
    if(!stage.hidden&&ctx&&width){ctx.clearRect(0,0,width,height);for(const p of particles){if(!reduced)p.y=(p.y+p.s*delta)%1;ctx.fillStyle='rgba(171,226,255,'+(p.r/2)+')';ctx.beginPath();ctx.arc(p.x*width,p.y*height,p.r,0,Math.PI*2);ctx.fill();}}
    if(charging){const v=((now-chargeStarted)/1700)%2;power=(v<=1?v:2-v)*100;updateMeter();}
    if(!document.hidden)requestAnimationFrame(frame);else previous=0;
  }
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)requestAnimationFrame(frame);else{charging=false;stage.classList.remove('pr-charging');}});
  resize();requestAnimationFrame(frame);find('#pr-start').focus({preventScroll:true});
})();
