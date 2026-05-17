 // === MYSTERY COUNTDOWN ===
  (function() {
    const overlay  = document.getElementById('countdown-overlay');
    const numEl    = document.getElementById('cd-number');
    const msgEl    = document.getElementById('cd-message');
    const progress = document.getElementById('cd-progress');
    const flash    = document.getElementById('reveal-flash');
    const cdHearts = document.getElementById('cd-hearts');
    const CIRCUM   = 628; // 2 * pi * 100
 
    const messages = [
      'Close your eyes…',
      'Take a deep breath…',
      'Someone loves you very much…',
      'Get ready, my love…',
      '✨'
    ];
 
    // lock scroll
    document.body.classList.add('locked');
 
    // spawn soft hearts in the overlay
    const heartSyms = ['❤️','💕','🩷','💗'];
    for (let i = 0; i < 12; i++) {
      const h = document.createElement('div');
      h.className = 'cd-heart';
      h.textContent = heartSyms[i % heartSyms.length];
      h.style.left = (Math.random() * 90) + '%';
      h.style.bottom = '-40px';
      h.style.animationDuration  = (Math.random() * 8 + 6) + 's';
      h.style.animationDelay     = (Math.random() * 8) + 's';
      h.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
      cdHearts.appendChild(h);
    }
 
    let count = 5;
 
    function tick() {
      // update message
      msgEl.style.opacity = '0';
      setTimeout(() => {
        msgEl.textContent  = messages[5 - count];
        msgEl.style.opacity = '1';
      }, 300);
 
      // update number
      numEl.textContent = count;
 
      // update ring — shrinks from full to empty over 5 ticks
      const offset = CIRCUM * (1 - count / 5);
      progress.style.strokeDashoffset = offset;
 
      if (count === 0) {
        // Flash and reveal
        flash.classList.add('flash');
        setTimeout(() => {
          flash.classList.remove('flash');
          overlay.classList.add('hidden');
          document.body.classList.remove('locked');
        }, 300);
        return;
      }
 
      count--;
      setTimeout(tick, 1000);
    }
 
    // small delay before starting so page is ready
    setTimeout(tick, 600);
  })();
 

 
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
 
  function closeEnvelope() {
    const env     = document.getElementById('envelope');
    const letter  = document.getElementById('letter');
    const envHint = document.getElementById('env-hint');
 
    // hide letter first
    letter.classList.remove('visible');
    setTimeout(() => {
      letter.style.display = 'none';
      // close flap
      env.classList.remove('opened');
      // restore hint and allow re-opening
      if (envHint) { envHint.style.opacity = '1'; envHint.textContent = 'tap to open again'; }
      envelopeOpened = false;
    }, 500);
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
      btn.querySelector('span').textContent = 'Play your special song 🎵';
      document.getElementById('voice-audio').pause();
    }
  }
 
  // === SECRET SURPRISE ===
  function revealSecret() {
    const btn = document.getElementById('secret-btn');
    const reveal = document.getElementById('secret-reveal');
    btn.style.display = 'none';
    reveal.style.display = 'block';
    // Single confetti burst
    launchConfetti();
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

  }

  function resetSenses() {
    // hide all cards including final
    document.querySelectorAll('.sense-card').forEach(el => {
      el.classList.remove('active');
      el.style.display = 'none';
    });
    // reset dots
    document.querySelectorAll('.sdot').forEach((dot, i) => {
      dot.classList.remove('active','done');
      if (i === 0) dot.classList.add('active');
    });
    // show sense 1
    const first = document.getElementById('sense-1');
    first.style.display = 'flex';
    first.classList.add('active');
    first.style.animation = 'none';
    first.offsetHeight;
    first.style.animation = '';
    // show dots again
    document.getElementById('sense-dots').style.display = 'flex';
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
    // single confetti burst
    launchConfetti();
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
 
  document.getElementById('celebrate-btn').addEventListener('click', launchConfetti);
 
  // Auto confetti on load after delay
  setTimeout(launchConfetti, 2000);
 
  // ===== WISH DATA =====
  const birthdayWishes = [
    { image:"pics/adventure.jpeg",      title:"Adventure",      text:"May your 25th year be full of places and moments that take your breath away." },
    { image:"pics/joy.jpeg",           title:"Joy",            text:"The kind of deep, quiet happiness that settles into your bones and stays." },
    { image:"pics/growth1.jpeg",         title:"Growth",         text:"Every dream you're brave enough to chase — may it find you." },
    { image:"pics/sweet1.jpeg",          title:"Sweetness",      text:"More cake, more laughter, more of all the things that make you smile." },
    { image:"pics/rest1.jpeg",           title:"Rest",           text:"Permission to slow down, breathe, and simply be." },
    { image:"pics/love1.jpeg",           title:"Love",           text:"All the love you give so freely — reflected back to you ten times over." },
    { image:"pics/courage1.jpeg",        title:"Courage",        text:"The boldness to say yes to the things that scare you a little, those are the ones worth doing." },
    { image:"pics/music1.jpeg",          title:"Music",          text:"May every song feel like it was written just for your soul." },
    { image:"pics/Beauty.jpeg",        title:"Beauty",         text:"The rare kind that lives inside you and shines through everything." },
    { image:"pics/connections1.jpeg",     title:"Connection",     text:"Deeper conversations, truer friendships, and bonds that feel like home." },
    { image:"pics/peace1.jpeg",          title:"Peace",          text:"A calm no chaos can touch. A quiet you can always return to." },
    { image:"pics/clarity1.jpeg",        title:"Clarity",        text:"May everything you've been wondering finally make sense." },
    { image:"pics/creativity.jpeg",    title:"Creativity",     text:"Space to create, to colour outside the lines, and to express everything you feel inside." },
    { image:"pics/horizons1.jpeg",       title:"Horizons",       text:"New places and new versions of you waiting ahead." },
    { image:"pics/transformation1.jpeg", title:"Transformation", text:"This is not an ending — it's your beginning." },
    { image:"pics/comfort.jpg",        title:"Comfort",        text:"Soft mornings and warm moments that feel like home." },
    { image:"pics/success1.jpeg",        title:"Success",        text:"On your terms, in your time, in your way." },
    { image:"pics/hope1.jpeg",           title:"Hope",           text:"Light always finds you, even in quiet moments." },
    { image:"pics/belonging1.jpeg",      title:"Belonging",      text:"May you always know, without a single doubt, that you are deeply wanted and needed here." },
    { image:"pics/strength1.jpeg",       title:"Strength",       text:"You are so much stronger than you know. May this year remind you of that every single day." },
    { image:"pics/suprise1.jpeg",       title:"Surprise",       text:"The kind of unexpected moments that make your heart leap — the best stories always start that way." },
    { image:"pics/warmth1.jpeg",         title:"Warmth",         text:"People who pour into you the way you pour into others. You deserve that overflow." },
    { image:"pics/celebration1.jpeg",    title:"Celebration",    text:"More reasons to raise a glass, dance a little, and remember how good it is to be alive." },
    { image:"pics/magic1.jpeg",          title:"Magic",          text:"The kind that doesn't need explanation — the feeling that something wonderful is always on its way." },
    { image:"pics/You.jpeg",           title:"You",            text:"Above all else — more of you. More of your light, your laugh, your love. The world needs every bit of it." }
  ];
 
  let currentWishIndex = 0;
 
  // ===== NEXT WISH (PAGE-FLIP FEEL) =====
  function nextWish() {
    currentWishIndex++;
    if (currentWishIndex >= birthdayWishes.length) currentWishIndex = 0;
 
    const wish  = birthdayWishes[currentWishIndex];
    const img   = document.getElementById('wish-image');
    const title = document.getElementById('wish-title');
    const text  = document.getElementById('wish-text');
    const card  = document.querySelector('.wish-reveal-card');
 
    // Page-flip: tilt card away
    card.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
    card.style.transform  = 'rotateY(90deg) scale(0.95)';
    card.style.opacity    = '0.3';
 
    title.classList.add('fade');
    text.classList.add('fade');
    img.classList.remove('animate');
 
    setTimeout(() => {
      // Swap content
      document.getElementById('wish-counter').textContent =
        String(currentWishIndex + 1).padStart(2,'0') + ' / 25';
 
      img.src        = wish.image;
      title.textContent = wish.title;
      text.textContent  = wish.text;
 
      title.classList.remove('fade');
      text.classList.remove('fade');
 
      // Flip card back in
      card.style.transform = 'rotateY(-90deg) scale(0.95)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.transition = 'transform 0.35s cubic-bezier(.16,1,.3,1), opacity 0.35s ease';
          card.style.transform  = 'rotateY(0deg) scale(1)';
          card.style.opacity    = '1';
        });
      });
 
      void img.offsetWidth;
      img.classList.add('animate');
 
      if (typeof launchConfetti === 'function') launchConfetti();
    }, 260);
  }

   // === SCROLL TO TOP VISIBILITY ===
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });