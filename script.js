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
  'img/Hero banner/superaquaclub-testimonial.jpeg',
  'img/Hero banner/Chad Rochefort_Park.jpg',
  'img/Hero banner/Chad Rochefort_productions_mall.jpg',
  'img/Hero banner/Chad Rochefort_productions_toronto aquarium.png',
  'img/Hero banner/DSC_0002 (2).JPG',
  'img/Hero banner/pexels-stephan-saloth-28489944-31501600.jpg',
  // Photos
  'img/Photos/0c957d6b-cea9-4f0b-ad74-a620d7f61f43.jpg',
  'img/Photos/0faaca79-4475-4d44-b82c-ef4657461257.jpg',
  'img/Photos/113d5cc9-41b9-40ae-af26-24f71fa42a4a.png',
  'img/Photos/20260115_150351.jpg',
  'img/Photos/290ae18e-a85e-4de6-8e3b-1c25a7b98e37.jpg',
  'img/Photos/362516fd-6236-48d2-9837-441af3082209.jpg',
  'img/Photos/4362312b-16b2-4f0b-82d3-302afff77df8.jpg',
  'img/Photos/4f1eb6ec-e5e6-4b6b-b901-0fbc2710b4f8.jpg',
  'img/Photos/59785616-d3d9-4835-b60b-3302b41bdca7.png',
  'img/Photos/5b4f7077-5ac3-430d-bda6-9a5511132bb0.jpg',
  'img/Photos/79a22fca-0181-4989-8d6d-17634e326fb5.jpg',
  'img/Photos/89c0391f-5302-48d2-9522-85af20e37698.jpg',
  'img/Photos/8b683573-1f1b-44bb-984c-6f9a42ffe08b.jpg',
  'img/Photos/9676a534-d861-417f-8e8e-56f2cd14cee4.jpg',
  'img/Photos/DSC_0002 (2).JPG',
  'img/Photos/DSC_0319.JPG',
  'img/Photos/DSC_0997.JPG',
  'img/Photos/DSC_1000-2.JPG',
  'img/Photos/Falsom 1.jpg',
  'img/Photos/Fireside Surf LLC locker.png',
  'img/Photos/Goplex 1.png',
  'img/Photos/IMG-20230417-WA0001.jpg',
  'img/Photos/IMG-20230417-WA0002.jpg',
  'img/Photos/IMG-20230417-WA0004.jpg',
  'img/Photos/IMG_6335.jpeg',
  'img/Photos/IMG_8109.jpg',
  'img/Photos/Image (4).jpg',
  'img/Photos/Image (6).jpg',
  'img/Photos/Launch Lew 1.jpg',
  'img/Photos/Media (1).jpg',
  'img/Photos/Media (2).jpg',
  'img/Photos/MicrosoftTeams-image (6).png',
  'img/Photos/Oceania 1.jpg',
  'img/Photos/Oceania 2.jpg',
  'img/Photos/Oceania 3.jpg',
  'img/Photos/San dimas 2.jpg',
  'img/Photos/Stanbrooke layout.jpg',
  'img/Photos/Straight on 03 11 2025.jpg',
  'img/Photos/a86a0da2-32e7-4545-8e7b-3b8b434e4884.jpg',
  'img/Photos/ad2d4a7e-bc75-4428-be49-d31337627073.jpg',
  'img/Photos/b674d916-d7d6-4218-a982-0d73965633c7.jpg',
  'img/Photos/e3491b6e-565f-4f65-b60c-a8cb98dac76c.jpg',
  'img/Photos/image3.jpeg',
  'img/Photos/thumbnail_IMG_8087.jpg',
  'img/Photos/thumbnail_IMG_8088.jpg',
  'img/Photos/thumbnail_IMG_8094.jpg',
];

const GALLERY_VISIBLE = 12;
const galleryGrid = document.getElementById('gallery-grid');

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
const slotSrc = new Array(GALLERY_VISIBLE).fill(null);

// Queue of photos not currently visible — refills when exhausted
let queue = [];
function nextFromQueue() {
  if (queue.length === 0) {
    // Refill with all photos not currently on screen, shuffled
    const visible = new Set(slotSrc.filter(Boolean));
    queue = shuffle(galleryPhotos.filter(s => !visible.has(s)));
  }
  return queue.shift();
}

// Slot rotation order: cycle through slots 0–11 in order so no slot is starved
let nextSlotIndex = 0;

function buildGallery() {
  galleryGrid.innerHTML = '';
  const initial = shuffle(galleryPhotos).slice(0, GALLERY_VISIBLE);
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
  const items = galleryGrid.querySelectorAll('.gallery-item');
  const slotIndex = nextSlotIndex % GALLERY_VISIBLE;
  nextSlotIndex++;

  const newSrc = nextFromQueue();
  if (!newSrc) return; // shouldn't happen, but guard

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

buildGallery();
setInterval(rotateGallery, 3000);

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
