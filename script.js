// ===================== NAV SCROLL =====================
const navHeader = document.getElementById('nav-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navHeader.classList.add('scrolled');
  } else {
    navHeader.classList.remove('scrolled');
  }
}, { passive: true });

// ===================== MOBILE NAV TOGGLE =====================
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
  const isOpen = navLinks.classList.contains('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);

  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close mobile nav when any nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', false);
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });
});

// ===================== CONTACT FORM =====================
const quoteForm = document.getElementById('quote-form');

quoteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = quoteForm.querySelector('button[type="submit"]');
  const original = btn.textContent;

  const firstName  = quoteForm.querySelector('#first-name').value.trim();
  const lastName   = quoteForm.querySelector('#last-name').value.trim();
  const email      = quoteForm.querySelector('#email').value.trim();
  const venue      = quoteForm.querySelector('#venue').value.trim();
  const venueType  = quoteForm.querySelector('#venue-type').value.trim();
  const message    = quoteForm.querySelector('#message').value.trim();

  const subject = encodeURIComponent('Platinum Lockers Quote Request – ' + firstName + ' ' + lastName);
  const body = encodeURIComponent(
    'Name: ' + firstName + ' ' + lastName + '\n' +
    'Email: ' + email + '\n' +
    'Venue / Organization: ' + venue + '\n' +
    'Venue Type: ' + venueType + '\n\n' +
    'Message:\n' + message
  );

  btn.textContent = 'Opening email...';
  btn.disabled = true;

  window.location.href = 'mailto:chad.rochefort@locketgo.com,cstreeting@platinumlockers.com,hello@platinumlockers.com,sales@platinumlockers.com?subject=' + subject + '&body=' + body;

  setTimeout(() => {
    btn.textContent = 'Request Sent!';
    btn.style.background = '#22c55e';
    quoteForm.reset();
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1000);
});

// ===================== NEWSLETTER FORM =====================
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = newsletterForm.querySelector('button');
  btn.textContent = '✓';
  btn.style.background = '#22c55e';
  newsletterForm.reset();
  setTimeout(() => {
    btn.textContent = '➢';
    btn.style.background = '';
  }, 2500);
});

// ===================== HERO SLIDESHOW =====================
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 5000);

// ===================== PARALLAX =====================
// Hero overlay parallaxes slightly; active slide handled by slideshow
const parallaxLayers = [
  { el: document.querySelector('.hero-overlay'), speed: 0.18 },
];

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => window.innerWidth <= 768;

let ticking = false;

function applyParallax() {
  if (prefersReduced || isMobile()) return;

  const scrollY = window.scrollY;

  parallaxLayers.forEach(({ el, speed }) => {
    if (!el) return;
    const section = el.closest('section') || el.parentElement;
    const rect = section ? section.getBoundingClientRect() : null;
    if (rect) {
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
    }
    el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    el.style.willChange = 'transform';
  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(applyParallax);
    ticking = true;
  }
}, { passive: true });

applyParallax();

// ===================== SCROLL ANIMATIONS =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.animate-on-scroll, .animate-card, .why-header, .serve-header, .testimonials-header, .wwa-container, .hw-textbox, .hw-locker-img, .hw-people-img, .contact-info-card, .contact-form-card, .leadership-photo'
).forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// Popout image — observed separately so it keeps its own transition (not overridden by animate-on-scroll)
const wwaPopout = document.querySelector('.wwa-popout-img');
if (wwaPopout) observer.observe(wwaPopout);

// ===================== PHOTO GALLERY =====================
const galleryPhotos = [
  // Hero banner
  'img/hero-banner/platinum-lockers-superaqua-club-waterpark.jpeg',
  'img/hero-banner/platinum-lockers-theme-park-smart-lockers.jpg',
  'img/hero-banner/platinum-lockers-shopping-mall-smart-lockers.jpg',
  'img/hero-banner/platinum-lockers-toronto-aquarium-smart-lockers.png',
  'img/hero-banner/platinum-lockers-venue-smart-locker-unit.jpg',
  'img/hero-banner/platinum-lockers-waterpark-smart-lockers.jpg',
  // Photos
  'img/venue-installations/platinum-lockers-installation-01.jpg',
  'img/venue-installations/platinum-lockers-installation-02.jpg',
  'img/venue-installations/platinum-lockers-installation-03.png',
  'img/venue-installations/platinum-lockers-installation-04.jpg',
  'img/venue-installations/platinum-lockers-installation-05.jpg',
  'img/venue-installations/platinum-lockers-installation-06.jpg',
  'img/venue-installations/platinum-lockers-installation-07.jpg',
  'img/venue-installations/platinum-lockers-installation-08.jpg',
  'img/venue-installations/platinum-lockers-installation-09.png',
  'img/venue-installations/platinum-lockers-installation-10.jpg',
  'img/venue-installations/platinum-lockers-installation-11.jpg',
  'img/venue-installations/platinum-lockers-installation-12.jpg',
  'img/venue-installations/platinum-lockers-installation-13.jpg',
  'img/venue-installations/platinum-lockers-installation-14.jpg',
  'img/venue-installations/platinum-lockers-locker-unit-closeup.jpg',
  'img/venue-installations/platinum-lockers-locker-bank-installation.jpg',
  'img/venue-installations/platinum-lockers-smart-locker-row.jpg',
  'img/venue-installations/platinum-lockers-smart-locker-bank.jpg',
  'img/venue-installations/platinum-lockers-folsom-venue.jpg',
  'img/venue-installations/platinum-lockers-fireside-surf.png',
  'img/venue-installations/platinum-lockers-goplex-venue.png',
  'img/venue-installations/platinum-lockers-installation-15.jpg',
  'img/venue-installations/platinum-lockers-installation-16.jpg',
  'img/venue-installations/platinum-lockers-installation-17.jpg',
  'img/venue-installations/platinum-lockers-installation-18.jpeg',
  'img/venue-installations/platinum-lockers-installation-19.jpg',
  'img/venue-installations/platinum-lockers-installation-20.jpg',
  'img/venue-installations/platinum-lockers-installation-21.jpg',
  'img/venue-installations/platinum-lockers-launch-lew-venue.jpg',
  'img/venue-installations/platinum-lockers-installation-22.jpg',
  'img/venue-installations/platinum-lockers-installation-23.jpg',
  'img/venue-installations/platinum-lockers-installation-24.png',
  'img/venue-installations/platinum-lockers-oceania-venue-01.jpg',
  'img/venue-installations/platinum-lockers-oceania-venue-02.jpg',
  'img/venue-installations/platinum-lockers-oceania-venue-03.jpg',
  'img/venue-installations/platinum-lockers-san-dimas-venue.jpg',
  'img/venue-installations/platinum-lockers-stanbrooke-layout.jpg',
  'img/venue-installations/platinum-lockers-smart-locker-front-view.jpg',
  'img/venue-installations/platinum-lockers-installation-25.jpg',
  'img/venue-installations/platinum-lockers-installation-26.jpg',
  'img/venue-installations/platinum-lockers-installation-27.jpg',
  'img/venue-installations/platinum-lockers-installation-28.jpg',
  'img/venue-installations/platinum-lockers-installation-29.jpeg',
  'img/venue-installations/platinum-lockers-smart-locker-thumbnail-01.jpg',
  'img/venue-installations/platinum-lockers-smart-locker-thumbnail-02.jpg',
  'img/venue-installations/platinum-lockers-smart-locker-thumbnail-03.jpg',
];

const galleryGrid = document.getElementById('gallery-grid');

function getVisibleCount() {
  return window.innerWidth <= 425 ? 6 : 12;
}

// Shuffle helper
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Tracks which src is in each slot (index → src)
let slotSrc = [];

// Queue of photos not currently visible — refills when exhausted
let queue = [];
function nextFromQueue() {
  if (queue.length === 0) {
    const visible = new Set(slotSrc.filter(Boolean));
    queue = shuffle(galleryPhotos.filter(s => !visible.has(s)));
  }
  return queue.shift();
}

let nextSlotIndex = 0;
let rotateInterval = null;

function buildGallery() {
  const count = getVisibleCount();
  slotSrc = new Array(count).fill(null);
  queue = [];
  nextSlotIndex = 0;
  galleryGrid.innerHTML = '';
  const initial = shuffle(galleryPhotos).slice(0, count);
  initial.forEach((src, i) => {
    slotSrc[i] = src;
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.slot = i;
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Platinum Lockers installation photo';
    img.loading = 'lazy';
    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(slotSrc[i]));
    galleryGrid.appendChild(item);
  });
}

function rotateGallery() {
  const count = getVisibleCount();
  const items = galleryGrid.querySelectorAll('.gallery-item');
  const slotIndex = nextSlotIndex % count;
  nextSlotIndex++;

  const newSrc = nextFromQueue();
  if (!newSrc) return;

  const slot = items[slotIndex];
  slot.classList.add('fade-out');

  setTimeout(() => {
    slotSrc[slotIndex] = newSrc;
    slot.querySelector('img').src = newSrc;
    slot.classList.remove('fade-out');
    slot.classList.add('fade-in');
    setTimeout(() => slot.classList.remove('fade-in'), 650);
  }, 600);
}

function startGallery() {
  buildGallery();
  if (rotateInterval) clearInterval(rotateInterval);
  rotateInterval = setInterval(rotateGallery, 3000);
}

startGallery();

// Rebuild if crossing the 425px breakpoint
let wasSmall = window.innerWidth <= 425;
window.addEventListener('resize', () => {
  const isSmall = window.innerWidth <= 425;
  if (isSmall !== wasSmall) {
    wasSmall = isSmall;
    startGallery();
  }
});

// ---- Lightbox ----
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===================== TESTIMONIAL CAROUSEL =====================
const tcTrackWrap = document.querySelector('.tc-track-wrap');
const tcTrack     = document.querySelector('.tc-track');
const tcCards     = document.querySelectorAll('.testimonial-card');
const tcDotsEl    = document.getElementById('tc-dots');
const tcPrevBtn   = document.querySelector('.tc-prev');
const tcNextBtn   = document.querySelector('.tc-next');
let tcCurrentPage = 0;

function tcPerPage()    { return window.innerWidth <= 640 ? 1 : 3; }
function tcTotalPages() { return Math.ceil(tcCards.length / tcPerPage()); }

function tcBuildDots() {
  tcDotsEl.innerHTML = '';
  const total = tcTotalPages();
  for (let i = 0; i < total; i++) {
    const btn = document.createElement('button');
    btn.className = 'tc-dot' + (i === tcCurrentPage ? ' active' : '');
    btn.setAttribute('aria-label', `Page ${i + 1}`);
    btn.addEventListener('click', () => tcGoTo(i));
    tcDotsEl.appendChild(btn);
  }
}

function tcGoTo(page) {
  const total = tcTotalPages();
  const gap   = window.innerWidth <= 640 ? 0 : 24;
  // getBoundingClientRect is reliable at any point after layout
  const w     = tcTrackWrap.getBoundingClientRect().width;

  tcCurrentPage = ((page % total) + total) % total;
  tcTrack.style.transform = `translateX(-${tcCurrentPage * (w + gap)}px)`;

  tcDotsEl.querySelectorAll('.tc-dot').forEach((d, i) =>
    d.classList.toggle('active', i === tcCurrentPage)
  );

  // Fully remove arrows from layout when there is only one page
  const multiPage = total > 1;
  tcPrevBtn.classList.toggle('tc-hidden', !multiPage);
  tcNextBtn.classList.toggle('tc-hidden', !multiPage);
}

function tcInit() {
  if (tcCurrentPage >= tcTotalPages()) tcCurrentPage = 0;
  tcBuildDots();
  tcGoTo(tcCurrentPage);
}

// Defer until after first paint so getBoundingClientRect has real dimensions
requestAnimationFrame(tcInit);

tcPrevBtn.addEventListener('click', () => tcGoTo(tcCurrentPage - 1));
tcNextBtn.addEventListener('click', () => tcGoTo(tcCurrentPage + 1));

// Rebuild on breakpoint cross (640px)
let tcWasSmall = window.innerWidth <= 640;
window.addEventListener('resize', () => {
  const small = window.innerWidth <= 640;
  if (small !== tcWasSmall) { tcWasSmall = small; tcCurrentPage = 0; tcInit(); }
  else tcGoTo(tcCurrentPage);
}, { passive: true });

// Swipe support
let tcTouchX = 0;
tcTrack.addEventListener('touchstart', (e) => { tcTouchX = e.touches[0].clientX; }, { passive: true });
tcTrack.addEventListener('touchend', (e) => {
  const diff = tcTouchX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) tcGoTo(tcCurrentPage + (diff > 0 ? 1 : -1));
}, { passive: true });
