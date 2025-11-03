const loader = document.getElementById('loader');
const site = document.getElementById('site');

// Navigation functionality
const navButtons = document.querySelectorAll('.nav-btn');
const contentSections = document.querySelectorAll('.content-section');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSection = button.dataset.section;
    
    // Update active nav button
    navButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Show target section
    contentSections.forEach(section => {
      section.classList.remove('active');
    });
    const targetEl = document.getElementById(targetSection);
    if (targetEl) targetEl.classList.add('active');

    // Initialize snipe behavior when entering the tab
    if (targetSection === 'snipe') {
      initSnipe();
    }
    // Initialize audio tab when entering
    if (targetSection === 'audio') {
      initAudio();
    }
  });
});

// CTA Button interactions with external links
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    this.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Handle specific button actions
    if (this.classList.contains('primary')) {
      // Join mission - opens Discord
      this.innerHTML = '<span>CONNECTING...</span>';
      setTimeout(() => {
        this.innerHTML = '<span>JOIN MISSION</span>';
      }, 2000);
    } else if (this.classList.contains('secondary')) {
      // Watch demo - opens TikTok
      this.innerHTML = '<span>LOADING...</span>';
      setTimeout(() => {
        this.innerHTML = '<span>WATCH DEMO</span>';
      }, 1500);
    }
  });
});

// Stat cards animation
const statCards = document.querySelectorAll('.stat-card');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideUp 0.6s ease forwards';
    }
  });
}, observerOptions);

statCards.forEach(card => {
  observer.observe(card);
});

// Social cards hover effect
const socialCards = document.querySelectorAll('.social-card');
socialCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 0, 64, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Add entrance animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.8s ease';
    document.body.style.opacity = '1';
  }, 100);

  const snipeVisible = document.getElementById('snipe')?.classList.contains('active');
  if (snipeVisible) initSnipe();
  const audioVisible = document.getElementById('audio')?.classList.contains('active');
  if (audioVisible) initAudio();

  // Initialize background audio controls
  initBackgroundAudio();
});

/* Toast */
function showToast(msg, timeout=2600){
  let wrap = document.getElementById('toastWrap');
  if(!wrap){
    wrap = document.createElement('div');
    wrap.id = 'toastWrap';
    wrap.style.position = 'fixed';
    wrap.style.bottom = '16px';
    wrap.style.left = '50%';
    wrap.style.transform = 'translateX(-50%)';
    wrap.style.zIndex = '9999';
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.gap = '8px';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  t.style.background = 'rgba(0,0,0,0.7)';
  t.style.color = '#fff';
  t.style.padding = '10px 14px';
  t.style.border = '1px solid rgba(255,0,64,0.4)';
  t.style.borderRadius = '8px';
  t.style.transition = 'opacity 0.3s';
  t.style.boxShadow = '0 8px 24px rgba(255,0,64,0.3)';
  wrap.appendChild(t);
  setTimeout(()=> t.style.opacity = '0', timeout - 400);
  setTimeout(()=> t.remove(), timeout);
}

/* Weekly rotating news for #newsContent */
const weeklyNews = [
  "Week 1: DFL kickoff — focus on supporting small variety streamers; community meetup on Saturday.",
  "Week 2: Training sessions — tips for polite chat engagement and best practices for joining games.",
  "Week 3: Spotlight — nominate a streamer for boosted rounds and coordinated viewership.",
  "Week 4: Collabs — organize group joins for charity streams and friendly events.",
  "Week 5+: Ongoing — rotating highlights and shoutouts. Check back each week for updates."
];

function updateWeeklyNews(){
  const start = new Date(2025,0,1); // fixed epoch for deterministic rotation
  const now = new Date();
  const weekNumber = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
  const idx = weekNumber % weeklyNews.length;
  const el = document.getElementById('newsContent');
  if(el) el.textContent = weeklyNews[idx];
}

/* run on load and expose for manual refresh */
window.addEventListener('load', () => {
  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
    if (site) site.removeAttribute('aria-hidden');
    showToast('Welcome to DFL HUB');
    updateWeeklyNews();
  }, 850);
});
window.updateWeeklyNews = updateWeeklyNews;

/* Sanitizer: remove AI/experiment words from page text and inputs */
function sanitizeContent(){
  const blacklist = ['ai', 'artificial intelligence', 'experiment', 'openai', 'gpt', 'assistant'];
  const regex = new RegExp('\\b(' + blacklist.join('|') + ')\\b','gi');

  const desc = document.getElementById('desc');
  if (desc) {
    desc.innerHTML = desc.innerHTML.replace(regex, '[redacted]');
  }

  function sanitizeNode(node){
    if(node.nodeType === Node.TEXT_NODE){
      if(regex.test(node.nodeValue)){
        node.nodeValue = node.nodeValue.replace(regex, '[redacted]');
      }
    } else {
      node.childNodes.forEach(n => sanitizeNode(n));
    }
  }
  const container = document.querySelector('.container');
  if (container) sanitizeNode(container);

  showToast('Sanitized visible content (client-side only)');
}

/* Clear local storage/session storage */
function clearLocal(){
  try{
    localStorage.clear();
    sessionStorage.clear();
    showToast('Local data cleared (storage only)');
  }catch(e){
    showToast('Could not clear storage');
  }
}

/* External open helper (guarded) */
function openExtern(e){
  e.preventDefault();
  const url = e.currentTarget.dataset.href;
  if(!url) return;
  window.open(url, '_blank', 'noopener');
}

/* small safety: prompt before unload if audio playing / loop active */
window.addEventListener('beforeunload', (ev) => {
  if(typeof loops !== 'undefined' && Object.keys(loops).length > 0){
    ev.preventDefault();
    ev.returnValue = '';
  }
});

/* Expose needed functions to global for inline handlers */
window.sanitizeContent = sanitizeContent;
window.clearLocal = clearLocal;
window.openExtern = openExtern;
window.updateWeeklyNews = updateWeeklyNews;

/* Background audio: initialization and toggle */
function initBackgroundAudio(){
  const audio = document.getElementById('bgAudio');
  const toggle = document.getElementById('audioToggle');
  const canvas = document.getElementById('waveform');
  if(!audio || !toggle) return;

  // Apply initial muted state from localStorage (default: muted)
  const stored = localStorage.getItem('dfl_audio_muted');
  const muted = stored === null ? true : stored === '1';
  audio.muted = muted;
  audio.volume = 0.6;
  toggle.setAttribute('aria-pressed', (!muted).toString());
  toggle.textContent = muted ? '🔈' : '🔊';

  // Web Audio analyser setup (lazy)
  let audioCtx = null;
  let analyser = null;
  let source = null;
  let rafId = null;
  let dataArray = null;

  function ensureAnalyser() {
    if (!canvas) return;
    if (audioCtx) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      const bufferLength = analyser.fftSize;
      dataArray = new Uint8Array(bufferLength);

      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      drawWaveform();
    } catch (e) {
      console.warn('AudioContext init failed', e);
    }
  }

  // draw loop
  function drawWaveform(){
    if (!canvas || !analyser || !dataArray) return;
    const ctx = canvas.getContext('2d');
    const DPR = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.floor(width * DPR);
    canvas.height = Math.floor(height * DPR);
    ctx.scale(DPR, DPR);

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, width, height);

      // background glow
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, 'rgba(255,215,0,0.06)');
      g.addColorStop(1, 'rgba(255,107,64,0.02)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // scrappy multiple strokes
      for (let pass = 0; pass < 3; pass++) {
        ctx.beginPath();
        const lineAlpha = 0.18 - pass * 0.05;
        ctx.strokeStyle = `rgba(255,215,0,${lineAlpha})`;
        ctx.lineWidth = 1 + pass;
        const sliceWidth = width / dataArray.length;
        let x = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height / 2);
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.stroke();
      }
    };
    if (!rafId) draw();
  }

  function stopDrawing(){
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    // clear canvas
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx && ctx.clearRect(0,0,canvas.width,canvas.height);
    }
  }

  // Attempt to autoplay (may be blocked on some devices until user interaction)
  const tryPlay = async () => {
    try {
      ensureAnalyser();
      await audio.play();
    } catch (err) {
      // autoplay prevented or audio device start failed
      console.warn('Audio.play failed', err);
      if (!localStorage.getItem('dfl_audio_autoplay_blocked')) {
        showToast('Background audio ready — tap the speaker to enable playback');
        localStorage.setItem('dfl_audio_autoplay_blocked', '1');
      }
      // If the failure looks like an audio device error, surface it
      if (err && /device|start|output|audio/i.test(String(err.message || err))) {
        showToast('Audio device unavailable — audio disabled');
      }
    }
  };
  tryPlay();
  
  // Toggle handler
  const toggleAudio = async () => {
    // If audio is currently muted, unmute and play
    if (audio.muted) {
      audio.muted = false;
      try {
        // resume AudioContext on user gesture if needed
        ensureAnalyser();
        if (audioCtx && audioCtx.state === 'suspended') {
          try {
            await audioCtx.resume();
          } catch (errResume) {
            console.warn('AudioContext resume failed', errResume);
            showToast('Could not resume audio context');
          }
        }
        try {
          await audio.play();
        } catch (errPlay) {
          console.warn('audio.play failed on toggle', errPlay);
          showToast('Could not start playback on this device');
        }
      } catch(e){
        console.warn('toggleAudio error', e);
        showToast('Tap to start audio on this device');
      }
      toggle.textContent = '🔊';
      toggle.setAttribute('aria-pressed', 'true');
      localStorage.setItem('dfl_audio_muted', '0');
    } else {
      audio.muted = true;
      toggle.textContent = '🔈';
      toggle.setAttribute('aria-pressed', 'false');
      localStorage.setItem('dfl_audio_muted', '1');
    }
  };
  
  toggle.addEventListener('click', async (e) => {
    e.preventDefault();
    // On first user interaction, ensure analyser exists
    ensureAnalyser();
    await toggleAudio();
  });

  // Pause drawing when page hidden, resume when visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopDrawing();
      if (audioCtx && audioCtx.state === 'running') audioCtx.suspend && audioCtx.suspend();
    } else {
      // resume on visible
      ensureAnalyser();
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume && audioCtx.resume();
      drawWaveform();
    }
  });

  // resize handler to adjust canvas
  window.addEventListener('resize', () => {
    if (analyser && canvas) {
      // force redraw with new size
      stopDrawing();
      drawWaveform();
    }
  });

  // expose for debugging
  window.__dfl_audio_ctx = { audioCtx, analyser };

  // cleanup on unload
  window.addEventListener('pagehide', () => {
    stopDrawing();
    if (audioCtx && audioCtx.close) audioCtx.close();
    audio.pause();
  });

  // Add a global unhandled rejection handler to surface audio device problems
  window.addEventListener('unhandledrejection', (event) => {
    try {
      const reason = event.reason || '';
      // If this is related to audio device start, give a friendly toast and prevent noisy console
      if (reason && /device|start|audio|output|media/i.test(String(reason.message || reason))) {
        showToast('Failed to start the audio device — audio disabled');
        // prevent default logging spill (still available in devtools)
        event.preventDefault && event.preventDefault();
      }
    } catch (e) {
      // fallback: log quietly
      console.warn('unhandledrejection handler error', e);
    }
  });
}

/* initSnipe and initAudio remain unchanged (existing below) */
function initSnipe() {
  const container = document.getElementById('snipeContainer');
  if (!container) return;
  if (container.dataset.initialized === '1') return;
  const seen = localStorage.getItem('snipeSeen') === '1';
  const mountVideo = () => {
    const video = document.createElement('video');
    video.className = 'snipe-video';
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.muted = true;
    video.controls = true;
    video.autoplay = true;
    const src = document.createElement('source');
    src.src = 'Snipe of the month.mp4';
    src.type = 'video/mp4';
    video.appendChild(src);
    video.addEventListener('canplay', () => {
      requestAnimationFrame(() => {
        video.classList.add('ready');
      });
    }, { once: true });
    container.innerHTML = '';
    container.appendChild(video);
    container.dataset.initialized = '1';
  };
  if (seen) {
    mountVideo();
  } else {
    container.innerHTML = '';
    const ph = document.createElement('div');
    ph.className = 'snipe-placeholder';
    ph.textContent = '?';
    container.appendChild(ph);
    setTimeout(() => {
      mountVideo();
      localStorage.setItem('snipeSeen', '1');
    }, 1400);
  }
}

/* NEW: Audio of the month initializer */
function initAudio() {
  const container = document.getElementById('audioContainer');
  if (!container) return;
  if (container.dataset.initialized === '1') return;
  const seen = localStorage.getItem('audioSeen') === '1';

  const mountAudio = () => {
    const wrap = document.createElement('div');
    wrap.className = 'audio-player';
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.preload = 'auto';
    const src = document.createElement('source');
    src.src = 'Super_TriHard_World.mp3';
    src.type = 'audio/mpeg';
    audio.appendChild(src);

    // small play hint button for mobile
    const hint = document.createElement('div');
    hint.style.fontSize = '0.95rem';
    hint.style.color = 'var(--text-secondary)';
    hint.textContent = 'Tap play to listen';

    wrap.appendChild(audio);
    wrap.appendChild(hint);
    container.innerHTML = '';
    container.appendChild(wrap);
    container.dataset.initialized = '1';
  };

  if (seen) {
    mountAudio();
  } else {
    container.innerHTML = '';
    const ph = document.createElement('div');
    ph.className = 'snipe-placeholder';
    ph.textContent = '?';
    container.appendChild(ph);
    setTimeout(() => {
      mountAudio();
      localStorage.setItem('audioSeen', '1');
    }, 900);
  }
}