const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const allFiles = fs.readdirSync(imagesDir);

// Get only user's personal photos (not Framer assets)
const userPhotos = allFiles.filter(f => 
  (f.startsWith('Screenshot_') || f.startsWith('2025')) && 
  !f.includes('(1)') && 
  (f.endsWith('.jpg') || f.endsWith('.png'))
);

console.log(`Found ${userPhotos.length} personal photos`);

const videos = [
  'Screen_Recording_20240224-154722_Snapchat.mp4',
  'Screen_Recording_20260501_214328_Photos.mp4',
  'Screen_Recording_20260501_214450_Photos (1).mp4',
  'VN20240605_123303.mp4'
];

// Birthday messages to insert between photo groups
const birthdayMessages = [
  { emoji: '💜', title: '3+ Years & Counting...', text: 'From colleagues to soulmates — who knew that one office could hold so much love? Every day with you has been a blessing, Shruti.' },
  { emoji: '✨', title: 'Where It All Began', text: 'We started in the same company, sat in the same office, and somehow the universe knew we were meant for so much more. Thank you for being my everything.' },
  { emoji: '🥰', title: 'My Favorite Person', text: 'You make ordinary days extraordinary. Your smile lights up my world, and your laughter is my favorite sound. Happy Birthday, Shruti!' },
  { emoji: '🎂', title: 'A Birthday Wish', text: 'On your special day, I want you to know — you deserve all the happiness in the world. May this year bring you everything your beautiful heart desires.' },
  { emoji: '💫', title: 'You Are My Home', text: 'No matter where life takes us, you will always be my safe place. I am so grateful for every moment we have shared together.' },
  { emoji: '🌹', title: 'To My Better Half', text: '3 years of memories, laughter, late-night talks, and growing together. I wouldn\'t trade a single second. Here\'s to forever, Shruti.' },
  { emoji: '🎉', title: 'Celebrating You!', text: 'Today is all about YOU — the most amazing, beautiful, and kind-hearted person I know. I am so lucky to call you mine. Happy Birthday!' },
  { emoji: '💐', title: 'From Desk Mates to Soulmates', text: 'Who would have thought that two people sitting in the same office would end up writing the most beautiful love story? I love our story.' },
  { emoji: '🦋', title: 'Growing Together', text: 'From our first conversation to this very moment — we have grown so much together. Every chapter with you gets better and better.' },
  { emoji: '🌙', title: 'My Constant', text: 'Through every high and low, every laugh and tear, you have been my rock. I love you more than words can say. Happy Birthday, beautiful!' },
  { emoji: '🫶', title: 'Forever Grateful', text: 'Grateful for every sunrise I wake up knowing you are in my life. You make everything worth it. Cheers to another amazing year together!' },
  { emoji: '🎈', title: 'Here\'s to Us', text: 'Every photo here holds a memory. Every memory holds a feeling. And every feeling reminds me how deeply I love you, Shruti Pachkate. 💜' },
  { emoji: '🥂', title: 'A Toast to You', text: 'To the girl who turned a regular office into a love story — may your birthday be as wonderful and special as you are to me.' },
  { emoji: '🌸', title: 'My Sunshine', text: 'You bring color to my world and warmth to my soul. 3+ years and I still get butterflies when I see you smile. Never stop smiling, Shruti.' },
  { emoji: '💌', title: 'A Promise', text: 'I promise to keep making you laugh, to hold your hand through everything, and to celebrate every single birthday with you. Always and forever.' },
  { emoji: '🎊', title: 'The Best Chapter', text: 'Life gave me many things, but the best gift was finding you. Happy Birthday to the one who makes my heart complete. 💜' },
  { emoji: '⭐', title: 'You Shine Bright', text: 'Among all the people in the world, you shine the brightest. Keep being the incredible person you are. The world is better because you are in it.' },
  { emoji: '🌷', title: 'My Endless Love', text: 'From sharing a workplace to sharing a life — every moment has been worth it. I love you endlessly, Shruti. Happy Birthday, my love!' },
  { emoji: '💝', title: 'More Than Words', text: 'No birthday message can capture what you mean to me. But I hope these photos, these memories, remind you of how beautiful our journey has been.' },
  { emoji: '🎁', title: 'The Greatest Gift', text: 'You are the greatest gift life has ever given me. On your birthday, I just want to say — thank you for choosing me. I love you, Shruti Pachkate. 💜🎂' },
];

// Build photo grid HTML with messages after every 3 photos
let photoCardsArr = [];
let msgIndex = 0;

userPhotos.forEach((img, i) => {
  photoCardsArr.push(`
      <div class="photo-card" style="animation-delay: ${(i % 10) * 0.1}s">
        <img src="images/${img}" alt="Memory ${i+1}" loading="lazy" onclick="openLightbox(this.src)">
      </div>`);
  
  // After every 3 photos, insert a message card
  if ((i + 1) % 3 === 0 && msgIndex < birthdayMessages.length) {
    const msg = birthdayMessages[msgIndex];
    photoCardsArr.push(`
      <div class="message-card">
        <div class="msg-emoji">${msg.emoji}</div>
        <h3>${msg.title}</h3>
        <p>${msg.text}</p>
      </div>`);
    msgIndex++;
  }
});

const photoCards = photoCardsArr.join('');

// Build video cards
const videoCards = videos.map((v, i) => `
      <div class="video-card">
        <video controls playsinline preload="metadata">
          <source src="media/${v}" type="video/mp4">
        </video>
      </div>`).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Happy Birthday Shruti Pachkate! 🎂💜</title>
  <meta name="description" content="A special birthday celebration for Shruti Pachkate">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      background: #0d0118;
      color: #f0e6ff;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      min-height: 100vh;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0d0118; }
    ::-webkit-scrollbar-thumb { background: #7e22ce; border-radius: 3px; }

    /* Welcome Overlay */
    #welcomeOverlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 100000;
      background: radial-gradient(ellipse at center, #1a0a2e 0%, #0d0118 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.8s ease, visibility 0.8s ease;
    }
    #welcomeOverlay.hidden {
      opacity: 0;
      visibility: hidden;
    }
    .welcome-box {
      text-align: center;
      animation: pulse 2s ease-in-out infinite;
    }
    .welcome-box .cake { font-size: 80px; margin-bottom: 16px; }
    .welcome-box h1 {
      font-family: 'Playfair Display', serif;
      font-size: 42px;
      background: linear-gradient(135deg, #e9d5ff, #a855f7, #7c3aed);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    .welcome-box p { color: #c4a8e0; font-size: 16px; margin-bottom: 32px; }
    .enter-btn {
      padding: 16px 56px;
      background: linear-gradient(135deg, #9b59b6, #a855f7);
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      transition: all 0.3s;
      box-shadow: 0 8px 32px rgba(168, 85, 247, 0.4);
    }
    .enter-btn:hover { transform: scale(1.05); box-shadow: 0 12px 40px rgba(168, 85, 247, 0.6); }

    /* Fireworks Canvas */
    #fireworksCanvas {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 99999;
      pointer-events: none;
      display: none;
    }
    #nameOverlay {
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100001;
      text-align: center;
      pointer-events: none;
      display: none;
    }
    #nameOverlay h1 {
      font-family: 'Playfair Display', serif;
      font-size: 96px;
      font-weight: 900;
      color: #f0e6ff;
      animation: nameGlow 1.5s ease-in-out infinite;
      text-transform: uppercase;
    }
    #nameOverlay p {
      font-size: 32px;
      color: #c4a8e0;
      margin-top: 8px;
    }
    @keyframes nameGlow {
      0%, 100% { text-shadow: 0 0 20px #a855f7, 0 0 40px #9b59b6, 0 0 60px #7e22ce; }
      50% { text-shadow: 0 0 40px #a855f7, 0 0 80px #9b59b6, 0 0 120px #7e22ce, 0 0 160px #6b21a8; }
    }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes sparkle {
      0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1) rotate(180deg); }
    }
    .sparkle-star {
      position: fixed;
      pointer-events: none;
      z-index: 99998;
      animation: sparkle 1.5s ease-in-out infinite;
    }

    /* Hero Section */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 20px;
      background: radial-gradient(ellipse at top, #1e0a3a 0%, #0d0118 60%);
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 30% 40%, rgba(168,85,247,0.08) 0%, transparent 40%),
                  radial-gradient(circle at 70% 60%, rgba(126,34,206,0.06) 0%, transparent 40%);
      animation: pulse 8s ease-in-out infinite;
    }
    .hero-content { position: relative; z-index: 2; }
    .hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: 72px;
      font-weight: 700;
      background: linear-gradient(135deg, #e9d5ff, #a855f7, #7c3aed);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 16px;
      line-height: 1.1;
    }
    .hero .subtitle {
      font-size: 24px;
      color: #c4a8e0;
      font-weight: 300;
      margin-bottom: 8px;
    }
    .hero .emojis { font-size: 48px; margin-top: 24px; }

    /* Sections */
    .section {
      padding: 80px 24px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .section-title {
      text-align: center;
      font-family: 'Playfair Display', serif;
      font-size: 48px;
      margin-bottom: 12px;
      background: linear-gradient(135deg, #e9d5ff, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .section-subtitle {
      text-align: center;
      color: #9a7ebf;
      font-size: 16px;
      margin-bottom: 48px;
    }

    /* Photo Grid */
    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .photo-card {
      border-radius: 12px;
      overflow: hidden;
      aspect-ratio: 9/16;
      position: relative;
      cursor: pointer;
      border: 1px solid rgba(168,85,247,0.15);
      transition: all 0.4s ease;
      animation: fadeInUp 0.6s ease forwards;
      opacity: 0;
    }
    .photo-card:hover {
      transform: translateY(-8px);
      border-color: rgba(168,85,247,0.5);
      box-shadow: 0 16px 48px rgba(168,85,247,0.25);
    }
    .photo-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .photo-card:hover img { transform: scale(1.05); }

    /* Birthday Message Cards */
    .message-card {
      grid-column: 1 / -1;
      text-align: center;
      padding: 48px 32px;
      margin: 24px 0;
      background: linear-gradient(135deg, rgba(168,85,247,0.08), rgba(126,34,206,0.05));
      border: 1px solid rgba(168,85,247,0.2);
      border-radius: 20px;
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
      animation: fadeInUp 0.6s ease forwards;
    }
    .message-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, transparent, #a855f7, #7c3aed, transparent);
    }
    .message-card .msg-emoji {
      font-size: 48px;
      margin-bottom: 16px;
      filter: drop-shadow(0 0 12px rgba(168,85,247,0.4));
    }
    .message-card h3 {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      font-weight: 700;
      background: linear-gradient(135deg, #e9d5ff, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
    }
    .message-card p {
      color: #c4a8e0;
      font-size: 16px;
      line-height: 1.7;
      max-width: 640px;
      margin: 0 auto;
      font-weight: 300;
    }
    @media (max-width: 768px) {
      .message-card { padding: 32px 20px; }
      .message-card h3 { font-size: 22px; }
      .message-card p { font-size: 14px; }
    }

    /* Video Section */
    .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }
    .video-card {
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(168,85,247,0.2);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      background: #1a0a2e;
      transition: all 0.3s ease;
    }
    .video-card:hover {
      border-color: rgba(168,85,247,0.5);
      box-shadow: 0 12px 48px rgba(168,85,247,0.2);
    }
    .video-card video {
      width: 100%;
      display: block;
      background: #1a0a2e;
    }

    /* Lightbox */
    #lightbox {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.95);
      z-index: 100002;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    #lightbox.active { display: flex; }
    #lightbox img {
      max-width: 90%;
      max-height: 90vh;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(168,85,247,0.3);
    }
    #lightbox .close-btn {
      position: absolute;
      top: 24px; right: 24px;
      font-size: 36px;
      color: white;
      cursor: pointer;
      background: rgba(168,85,247,0.3);
      width: 48px; height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
    }
    #lightbox .close-btn:hover { background: rgba(168,85,247,0.6); }

    /* Footer */
    .footer {
      text-align: center;
      padding: 60px 24px;
      background: linear-gradient(180deg, transparent, rgba(168,85,247,0.05));
    }
    .footer .hearts { font-size: 48px; margin-bottom: 16px; }
    .footer p { color: #9a7ebf; font-size: 14px; }

    /* Floating particles */
    .particle {
      position: fixed;
      pointer-events: none;
      border-radius: 50%;
      background: rgba(168,85,247,0.3);
      animation: float 15s infinite;
      z-index: 0;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero h1 { font-size: 42px; }
      .hero .subtitle { font-size: 18px; }
      .section-title { font-size: 32px; }
      .photo-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
      .video-grid { grid-template-columns: 1fr; }
      #nameOverlay h1 { font-size: 56px; }
      .welcome-box h1 { font-size: 28px; }
    }
  </style>
</head>
<body>

  <!-- Welcome Overlay -->
  <div id="welcomeOverlay">
    <div class="welcome-box">
      <div class="cake">🎂</div>
      <h1>Happy Birthday<br>Shruti Pachkate!</h1>
      <p>A special surprise awaits you 💜</p>
      <button class="enter-btn" onclick="enterSite()">🎉 Enter</button>
    </div>
  </div>

  <!-- Fireworks Canvas -->
  <canvas id="fireworksCanvas"></canvas>
  <div id="nameOverlay">
    <div style="font-size: 64px; margin-bottom: 12px;">🎆✨🎇</div>
    <h1>SHRUTI</h1>
    <p>🎂 Happy Birthday! 🎂</p>
    <div style="font-size: 48px; margin-top: 12px;">🎉🥳💜</div>
  </div>

  <!-- Hero Section -->
  <section class="hero" id="hero">
    <div class="hero-content">
      <h1>Happy Birthday<br>Shruti! 💜</h1>
      <p class="subtitle">Wishing you the most amazing birthday ever ✨</p>
      <div class="emojis">🎂 🎉 🥳 💜 🎈</div>
    </div>
  </section>

  <!-- Photo Gallery -->
  <section class="section" id="gallery">
    <h2 class="section-title">💜 Our Memories 💜</h2>
    <p class="section-subtitle">Every moment with you is special ✨</p>
    <div class="photo-grid">
${photoCards}
    </div>
  </section>

  <!-- Video Section -->
  <section class="section" id="videos">
    <h2 class="section-title">🎬 Special Videos 🎬</h2>
    <p class="section-subtitle">Relive these beautiful moments 💜</p>
    <div class="video-grid">
${videoCards}
    </div>
  </section>

  <!-- Footer -->
  <div class="footer">
    <div class="hearts">💜💜💜</div>
    <p>Made with love for Shruti Pachkate 🎂</p>
    <p style="margin-top: 8px; font-size: 12px; color: #6b4f8a;">Happy Birthday! 🥳</p>
  </div>

  <!-- Lightbox -->
  <div id="lightbox" onclick="closeLightbox()">
    <div class="close-btn">✕</div>
    <img id="lightboxImg" src="" alt="Photo">
  </div>

  <!-- Floating Particles -->
  <script>
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.width = (4 + Math.random() * 8) + 'px';
    p.style.height = p.style.width;
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 15 + 's';
    p.style.animationDuration = (10 + Math.random() * 20) + 's';
    document.body.appendChild(p);
  }
  </script>

  <!-- Fireworks Script -->
  <script>
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');
  let fireworks = [], particles = [], running = false;

  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }

  class Firework {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height;
      this.ty = Math.random() * canvas.height * 0.5;
      this.s = 4 + Math.random() * 4;
      this.h = [280,300,320,260,340][Math.floor(Math.random()*5)];
      this.alive = true;
      this.trail = [];
    }
    update() {
      this.trail.push({x:this.x,y:this.y});
      if(this.trail.length>8) this.trail.shift();
      this.y -= this.s;
      if(this.y<=this.ty) { this.explode(); this.alive=false; }
    }
    explode() {
      for(let i=0;i<80;i++){
        const a=(Math.PI*2/80)*i, sp=2+Math.random()*5;
        particles.push({x:this.x,y:this.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,a:1,h:this.h+Math.random()*30-15,sz:2+Math.random()*2,d:0.01+Math.random()*0.02});
      }
    }
    draw() {
      this.trail.forEach((t,i)=>{ctx.beginPath();ctx.arc(t.x,t.y,2,0,Math.PI*2);ctx.fillStyle=\`hsla(\${this.h},80%,70%,\${i/this.trail.length})\`;ctx.fill();});
      ctx.beginPath();ctx.arc(this.x,this.y,3,0,Math.PI*2);ctx.fillStyle=\`hsl(\${this.h},100%,80%)\`;ctx.fill();
    }
  }

  function animate() {
    if(!running) return;
    ctx.fillStyle='rgba(13,1,24,0.15)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if(Math.random()<0.08) fireworks.push(new Firework());
    fireworks=fireworks.filter(f=>f.alive);
    fireworks.forEach(f=>{f.update();f.draw();});
    particles=particles.filter(p=>p.a>0);
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vy+=0.05;p.vx*=0.99;p.a-=p.d;
      ctx.beginPath();ctx.arc(p.x,p.y,p.sz,0,Math.PI*2);ctx.fillStyle=\`hsla(\${p.h},90%,65%,\${p.a})\`;ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  function addSparkles() {
    const e=['✨','⭐','💜','🌟','💫'];
    for(let i=0;i<20;i++){
      const s=document.createElement('div');
      s.className='sparkle-star';
      s.textContent=e[Math.floor(Math.random()*e.length)];
      s.style.cssText=\`left:\${Math.random()*100}%;top:\${Math.random()*100}%;font-size:\${16+Math.random()*24}px;animation-delay:\${Math.random()*2}s\`;
      document.body.appendChild(s);
      setTimeout(()=>s.remove(),5000);
    }
  }

  function enterSite() {
    document.getElementById('welcomeOverlay').classList.add('hidden');
    resize(); window.addEventListener('resize',resize);
    canvas.style.display='block';
    running=true; animate();
    const n=document.getElementById('nameOverlay');
    n.style.display='block';
    n.style.animation='none';
    n.offsetHeight;
    n.style.animation='fadeInUp 0.5s ease forwards';
    addSparkles();
    setTimeout(addSparkles,1500);
    setTimeout(addSparkles,3000);
    setTimeout(()=>{
      n.style.opacity='0';
      n.style.transition='opacity 1s';
      setTimeout(()=>{running=false;canvas.style.display='none';n.style.display='none';},1000);
    },4500);
  }

  // Lightbox
  function openLightbox(src) {
    document.getElementById('lightboxImg').src=src;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow='hidden';
  }
  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow='';
  }

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.style.animationPlayState = 'running';
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.photo-card').forEach(c => {
    c.style.animationPlayState = 'paused';
    observer.observe(c);
  });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log(`✅ Built birthday page with ${userPhotos.length} photos and ${videos.length} videos!`);
