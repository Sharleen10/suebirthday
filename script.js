 
  // === FLOATING PARTICLES ===
  const pContainer = document.getElementById('particles');
  const colors = ['#e8607a','#c9a84c','#f7d6df','#f3e8d8','#fff'];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*15+10}s;
      animation-delay:${Math.random()*15}s;
    `;
    pContainer.appendChild(p);
  }
 
  // === COUNTDOWN TO 25th BIRTHDAY: MAY 23, 2026 ===
  // Born: 23 May 2001. Counting DOWN from today to her big day.
  const birthDate  = new Date('2001-05-23T00:00:00');
  const birthday26 = new Date('2026-05-23T00:00:00');
 
  function formatNum(n) {
    if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
    if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
    return n.toLocaleString();
  }
 
  function updateCounter() {
    const now = new Date();
    const diffMs = birthday26 - now;
 
    if (diffMs <= 0) {
      // Birthday has arrived! Transform the whole section
      document.getElementById('c-years').textContent  = '25';
      document.getElementById('c-months').textContent = '🎂';
      document.getElementById('c-days').textContent   = '🌸';
      document.getElementById('c-hours').textContent  = '✨';
      document.getElementById('counter-heading').innerHTML = 'Happy Birthday,<br><em>my love</em> 🎉';
      document.getElementById('section-label').textContent = 'Today is your magical day';
      // Update card labels too
      const labels = document.querySelectorAll('.counter-label');
      const newLabels = ['You\'re 25!', 'Cake time', 'Shine on', 'All yours'];
      labels.forEach((l, i) => { if (newLabels[i]) l.textContent = newLabels[i]; });
    } else {
      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours   = Math.floor(totalMinutes / 60);
      const totalDays    = Math.floor(totalHours / 24);
 
      document.getElementById('c-years').textContent  = '25';
      document.getElementById('c-months').textContent = String(totalDays).padStart(2,'0') + 'd';
      document.getElementById('c-days').textContent   = String(totalHours % 24).padStart(2,'0') + 'h';
      document.getElementById('c-hours').textContent  = String(totalMinutes % 60).padStart(2,'0') + 'm ' + String(totalSeconds % 60).padStart(2,'0') + 's';
    }
 
    // Fun lifetime totals (since birth 23 May 2001)
    const lifetimeSeconds = Math.floor((now - birthDate) / 1000);
    const lifetimeMinutes = Math.floor(lifetimeSeconds / 60);
    const lifetimeDays    = Math.floor(lifetimeSeconds / 86400);
    document.getElementById('t-heartbeats').textContent = formatNum(Math.floor(lifetimeSeconds * 1.2));
    document.getElementById('t-sleeps').textContent     = lifetimeDays.toLocaleString();
    document.getElementById('t-breaths').textContent    = formatNum(Math.floor(lifetimeMinutes * 15));
  }
 
  updateCounter();
  setInterval(updateCounter, 1000);
 
 
  // === FLOATING HEARTS & STARS ===
  const magicLayer = document.getElementById('magic-layer');
  const heartSymbols = ['❤️','💕','💗','💖','💓'];
 
  function spawnHeart() {
    const el = document.createElement('div');
    el.className = 'heart-float';
    el.textContent = heartSymbols[Math.floor(Math.random()*heartSymbols.length)];
    el.style.left = Math.random()*100 + '%';
    el.style.fontSize = (Math.random()*1.2+0.7) + 'rem';
    const dur = Math.random()*12+8;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = Math.random()*6 + 's';
    magicLayer.appendChild(el);
    setTimeout(() => el.remove(), (dur+6)*1000);
  }
  for (let i=0; i<18; i++) setTimeout(spawnHeart, i*600);
  setInterval(spawnHeart, 1800);
 
 
 
  // === ENVELOPE ===
  let envelopeOpened = false;
  function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;
    const env = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const hint = document.getElementById('hint');
    const envHint = document.getElementById('env-hint');
 
    env.classList.add('opened');
    if(envHint) envHint.style.opacity='0';
 
    // After flap opens, slide letter in
    setTimeout(() => {
      letter.style.display = 'block';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { letter.classList.add('visible'); });
      });
    }, 700);
  }
 
  // === VOICE NOTE ===
  let voiceVisible = false;
  function toggleVoice() {
    voiceVisible = !voiceVisible;
    const note = document.getElementById('voice-note');
    const btn  = document.getElementById('voice-btn');
    note.style.display = voiceVisible ? 'block' : 'none';
    if(voiceVisible) {
      note.style.animation = 'reveal-in 0.6s cubic-bezier(.16,1,.3,1) forwards';
      btn.querySelector('span').textContent = 'Now playing... 🎵';
    } else {
      btn.querySelector('span').textContent = 'Play my voice note';
      document.getElementById('voice-audio').pause();
    }
  }
 
  // === SECRET SURPRISE ===
  function revealSecret() {
    const btn = document.getElementById('secret-btn');
    const reveal = document.getElementById('secret-reveal');
    btn.style.display = 'none';
    reveal.style.display = 'block';
    // Big confetti burst
    launchConfetti();
    setTimeout(launchConfetti, 800);
    setTimeout(launchConfetti, 1600);
  }
 
 
  // === 5 SENSES NAVIGATION ===
  function nextSense(num) {
    // hide all cards
    document.querySelectorAll('.sense-card').forEach(el => {
      el.classList.remove('active');
      el.style.display = 'none';
    });
    // update dots
    document.querySelectorAll('.sdot').forEach((dot, i) => {
      dot.classList.remove('active','done');
      if (i < num - 1) dot.classList.add('done');
      if (i === num - 1) dot.classList.add('active');
    });
    // show target card with fresh animation
    const card = document.getElementById('sense-' + num);
    card.style.display = 'flex';
    card.classList.add('active');
    card.style.animation = 'none';
    card.offsetHeight; // reflow
    card.style.animation = '';
    // scroll into view smoothly
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // mini confetti on each reveal
    launchConfetti();
  }
 
  function showFinalMessage() {
    document.querySelectorAll('.sense-card').forEach(el => {
      el.classList.remove('active');
      el.style.display = 'none';
    });
    document.querySelectorAll('.sdot').forEach(dot => {
      dot.classList.remove('active');
      dot.classList.add('done');
    });
    const final = document.getElementById('sense-final');
    final.style.display = 'flex';
    final.classList.add('active');
    final.style.animation = 'none';
    final.offsetHeight;
    final.style.animation = '';
    final.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // triple confetti burst
    launchConfetti();
    setTimeout(launchConfetti, 600);
    setTimeout(launchConfetti, 1300);
  }
 
  // === CONFETTI ===
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let confettiPieces = [];
  let animating = false;
 
  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
 
  function launchConfetti() {
    confettiPieces = [];
    for (let i = 0; i < 180; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 8 + 3,
        color: colors[Math.floor(Math.random()*colors.length)],
        tilt: Math.random()*10 - 5,
        tiltAngle: 0,
        tiltSpeed: Math.random()*0.1 + 0.05,
        vx: Math.random()*4 - 2,
        vy: Math.random()*4 + 2,
      });
    }
    if (!animating) { animating = true; animateConfetti(); }
  }
 
  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces = confettiPieces.filter(p => p.y < canvas.height + 20);
    confettiPieces.forEach(p => {
      p.tiltAngle += p.tiltSpeed;
      p.x += p.vx + Math.sin(p.tiltAngle);
      p.y += p.vy;
      p.tilt = Math.sin(p.tiltAngle) * 12;
      ctx.beginPath();
      ctx.save();
      ctx.translate(p.x + p.r, p.y + p.r);
      ctx.rotate(p.tilt * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(-p.r, -p.r/2, p.r*2, p.r);
      ctx.restore();
    });
    if (confettiPieces.length > 0) {
      requestAnimationFrame(animateConfetti);
    } else {
      animating = false;
    }
  }
 
  // ===== INTERACTIVE WISHES =====

const birthdayWishes = [

  {
    emoji:"✨",
    title:"Adventure",
    text:"May your 25th year be full of places and moments that take your breath away."
  },

  {
    emoji:"🌸",
    title:"Joy",
    text:"The kind of deep, quiet happiness that settles into your bones and stays."
  },

  {
    emoji:"💫",
    title:"Growth",
    text:"Every dream you're brave enough to chase — may it find you."
  },

  {
    emoji:"🍰",
    title:"Sweetness",
    text:"More cake, more laughter, more of all the things that make you smile."
  },

  {
    emoji:"🌙",
    title:"Rest",
    text:"Permission to slow down, breathe, and simply be."
  },

  {
    emoji:"💖",
    title:"Love",
    text:"All the love you give so freely — reflected back to you ten times over."
  },

  {
    emoji:"🌟",
    title:"Courage",
    text:"The boldness to say yes to the things that scare you a little — those are the ones worth doing."
  },

  {
    emoji:"🎶",
    title:"Music",
    text:"May every song that finds you this year feel like it was written just for your soul."
  },

  {
    emoji:"🌺",
    title:"Beauty",
    text:"Not just the kind the world sees — but the rare, radiant kind that lives inside you."
  },

  {
    emoji:"🤝",
    title:"Connection",
    text:"Deeper conversations, truer friendships, and bonds that feel like home."
  },

  {
    emoji:"🌊",
    title:"Peace",
    text:"A stillness in your heart that no chaos can touch. You deserve that kind of calm."
  },

  {
    emoji:"💡",
    title:"Clarity",
    text:"May 25 bring you answers to questions you've been carrying quietly for far too long."
  },

  {
    emoji:"🎨",
    title:"Creativity",
    text:"Space to create, to colour outside the lines, and to express everything you feel inside."
  },

  {
    emoji:"🌍",
    title:"Horizons",
    text:"New places, new perspectives, new versions of yourself waiting just around the corner."
  },

  {
    emoji:"🦋",
    title:"Transformation",
    text:"Twenty-five is not an ending — it is the most beautiful kind of beginning."
  },

  {
    emoji:"☕",
    title:"Comfort",
    text:"Warm mornings, soft moments, and all the little things that make life feel like a hug."
  },

  {
    emoji:"🏆",
    title:"Success",
    text:"On your own terms, in your own time — the kind that truly satisfies."
  },

  {
    emoji:"🌈",
    title:"Hope",
    text:"That no matter what comes, you always find the light waiting on the other side."
  },

  {
    emoji:"🫶",
    title:"Belonging",
    text:"May you always know, without a single doubt, that you are deeply wanted and needed here."
  },

  {
    emoji:"💪",
    title:"Strength",
    text:"You are so much stronger than you know. May this year remind you of that every single day."
  },

  {
    emoji:"🎁",
    title:"Surprise",
    text:"The kind of unexpected moments that make your heart leap — the best stories always start that way."
  },

  {
    emoji:"🌻",
    title:"Warmth",
    text:"People who pour into you as much as you pour into them. You deserve that overflow."
  },

  {
    emoji:"🥂",
    title:"Celebration",
    text:"More reasons to raise a glass, dance a little, and remember how good it is to be alive."
  },

  {
    emoji:"🔮",
    title:"Magic",
    text:"The kind that doesn't need explanation — the feeling that something wonderful is always on its way."
  },

  {
    emoji:"❤️",
    title:"You",
    text:"Above all else — more of your light, your laugh, your love. The world needs every bit of it."
  }

];

let currentWishIndex = 0;

function nextWish(){

  currentWishIndex++;

  if(currentWishIndex >= birthdayWishes.length){
    currentWishIndex = 0;
  }

  const wish = birthdayWishes[currentWishIndex];

  document.getElementById('wish-counter').textContent =
    String(currentWishIndex + 1).padStart(2,'0') + ' / 25';

  document.getElementById('wish-emoji').textContent =
    wish.emoji;

  document.getElementById('wish-title').textContent =
    wish.title;

  document.getElementById('wish-text').textContent =
    wish.text;

}

  document.getElementById('celebrate-btn').addEventListener('click', launchConfetti);
 
  // Auto confetti on load after delay
  setTimeout(launchConfetti, 2000);
