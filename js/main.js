// <!-- Mobile Menu Toggle -->

const menuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// <!-- โหลดข้อมูลทั้งหมด -->
const defaultProjects = [
  {
    title: "NextLRU - Training System",
    role: "Co-Developer",
    period: "02/2026 - Present",
    desc: "ระบบบริหารจัดการการฝึกอบรมครบวงจร พัฒนาด้วย PHP และ MySQL รวมระบบแจ้งเตือนผ่าน Email อัตโนมัติ, CRUD สำหรับผู้ดูแล และการจัดการผู้เข้าร่วมอบรม",
    tech: "PHP • MySQL • PHPMailer • JavaScript",
    images: [
      "NextLRU1.png",
      "NextLRU2.png",
      "NextLRU3.png",
      "NextLRU4.png",
      "NextLRU5.png",
    ],
    previewUrl: "https://nextlru.lru.ac.th",
    codeUrl: "https://github.com/NuengdiawThiaksriboon/Next_LRU",
  },
  {
    title: "Queue Booking System",
    role: "Full Stack Developer",
    period: "05/2025 - Present",
    desc: "ระบบจองคิวออนไลน์สำหรับศูนย์เรียนรู้ รองรับการอัปโหลดสลิป, แจ้งเตือนอัตโนมัติ, JSON API และการติดตามสถานะแบบเรียลไทม์",
    tech: "Full Stack • PHP • MySQL • JSON API • GitHub",
    images: [
      "Booking1.png",
      "Booking2.png",
      "Booking3.png",
      "Booking4.png",
      
    ],
    previewUrl: "#",
    codeUrl: "https://github.com/Nanomamama/mango__db",
  },
  {
    title: "Teacher Professional Development Network System",
    role: "Web Developer (Frontend Focus)",
    period: "2/2025 - 2/2025",
    desc: "ระบบสืบค้นและจัดการข้อมูลเครือข่ายพัฒนาวิชาชีพครู สำหรับคณะครุศาสตร์ มหาวิทยาลัยราชภัฏเลย รองรับการค้นหาข้อมูลโรงเรียนเครือข่าย, ระบบสมาชิก (Register/Login) และส่วนจัดการข้อมูลโปรไฟล์ผู้ใช้",
    tech: "HTML5 • CSS3 • JavaScript • Bootstrap (CDN) • UI Design • GitHub",
    images: [
      "Teacher.png",
      "Teacher1.png",
      "Teacher2.png", 
      "Teacher3.png",
      "Teacher4.png",
      "Teacher5.png",
      "Teacher6.png",
      "Teacher7.png",
      "Teacher8.png",
      
    ],
    previewUrl: "#",
    codeUrl: "https://github.com/Nanomamama/admin_form",
  },
];

// Default Skills
const defaultSkills = [
  { name: "HTML5", icon: "fab fa-html5", color: "#e34f26" },
  { name: "CSS", icon: "fab fa-css3-alt", color: "#1572b6" },
  { name: "JavaScript", icon: "fab fa-js", color: "#f0db4f" },
  { name: "Bootstrap", icon: "fab fa-bootstrap", color: "#7952b3" },
  { name: "React", icon: "fab fa-react", color: "#61dafb" },
  { name: "PHP", icon: "fab fa-php", color: "#787cb5" },
  { name: "MySQL", icon: "fas fa-database", color: "#00758f" },
  { name: "GitHub", icon: "fab fa-github", color: "#ffffff" },
];

function loadProjects() {
  const savedData = JSON.parse(localStorage.getItem("portfolioData")) || {};
  let savedProjects = savedData.projects || [];

  const projectMap = new Map();
  defaultProjects.forEach((p) => projectMap.set(p.title, p));
  savedProjects.forEach((p) => projectMap.set(p.title, p));

  const projects = Array.from(projectMap.values());

  const container = document.getElementById("projects-grid");
  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML =
      '<div class="col-span-2 text-center py-20 text-gray-400 text-xl">ยังไม่มีผลงาน ไปเพิ่มที่ Admin ได้เลย</div>';
    return;
  }

  projects.forEach((p) => {
    const card = document.createElement("div");
    card.className =
      "glass rounded-[2rem] overflow-hidden card-hover flex flex-col h-full relative group reveal-on-scroll";

    let actionButtons = "";

    // Build image slider area. If `p.images` is an array, use it; otherwise fall back to `p.image`.
    const imagesArray = Array.isArray(p.images)
      ? p.images
      : p.image
      ? [p.image]
      : [];

    const imagesJson = JSON.stringify(imagesArray);

    const imageArea = `
            <div class="project-slider h-64 sm:h-72 overflow-hidden relative" data-images='${imagesJson}'>
              <img src="${imagesArray.length ? (imagesArray[0]) : ''}" class="main-project-img w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" alt="${p.title}">
              ${imagesArray.length > 1 ? `
              <button class="slider-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white p-2 rounded-full hover:bg-black/50">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button class="slider-next absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white p-2 rounded-full hover:bg-black/50">
                <i class="fas fa-chevron-right"></i>
              </button>
              <div class="slider-thumbs absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2 z-20"></div>
              ` : ''}
            </div>
          `;

    // Build action buttons and place them inside one absolute container with 1rem gap (`gap-4`)
    const buttons = [];

    if (imagesArray.length > 0) {
      buttons.push(`
        <button type="button" data-images='${imagesJson}' class="project-preview-btn bg-cyan-500/90 text-white px-3 py-2 rounded-full text-xs sm:px-5 sm:py-2.5 sm:text-sm font-medium flex items-center gap-2 justify-center w-full sm:w-auto transition-colors duration-200 hover:bg-cyan-600 shadow-lg">
          <i class="fas fa-eye"></i> Image 
        </button>
      `);
    }

    if (p.previewUrl) {
      buttons.push(`
        <a href="${p.previewUrl}" target="_blank" rel="noopener noreferrer" class="project-visit-btn bg-green-500/90 text-white px-3 py-2 rounded-full text-xs sm:px-5 sm:py-2.5 sm:text-sm font-medium flex items-center gap-2 justify-center w-full sm:w-auto transition-colors duration-200 hover:bg-green-600 shadow-lg">
            <i class="fas fa-external-link-alt"></i> Web Site
        </a>
      `);
    }

    if (p.codeUrl) {
      buttons.push(`
        <a href="${p.codeUrl}" target="_blank" rel="noopener noreferrer" class="project-code-btn bg-gray-800/90 text-white px-3 py-2 rounded-full text-xs sm:px-5 sm:py-2.5 sm:text-sm font-medium flex items-center gap-2 justify-center w-full sm:w-auto transition-colors duration-200 hover:bg-gray-900 shadow-lg">
            <i class="fab fa-github"></i> Code
        </a>
      `);
    }

    if (buttons.length) {
      // Responsive action container: centered on small screens, positioned bottom-right on larger screens.
      actionButtons = `
        <div class="project-actions absolute bottom-4 left-1/2 -translate-x-1/2 right-auto sm:left-auto sm:translate-x-0 sm:right-6 sm:bottom-6 z-10 flex flex-wrap items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          ${buttons.join('\n')}
        </div>
      `;
    } else {
      actionButtons = '';
    }

    card.innerHTML = `
            ${imageArea}
            <div class="p-8 sm:p-10 flex flex-col flex-grow text-left">
              <div class="flex justify-between items-center mb-6">
                <span class="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-xs sm:text-[10px] font-bold tracking-widest rounded-full uppercase border border-cyan-400/20">${p.role || "Developer"}</span>
                <span class="text-gray-500 text-xs sm:text-sm font-mono">${p.period || "N/A"}</span>
              </div>
              <h3 class="text-2xl sm:text-3xl font-bold mb-4 logo-font">${p.title}</h3>
              <p class="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 flex-grow">${p.desc || "คำอธิบายโปรเจกต์"}</p>
              <div class="pt-6 border-t border-white/5 flex items-center justify-between">
                <span class="text-xs sm:text-[10px] font-mono text-gray-500 uppercase tracking-tighter">${p.tech || "N/A"}</span>
                <i class="fas fa-external-link-alt text-gray-600 text-xs sm:text-sm"></i>
              </div>
            </div>
            ${actionButtons}
          `;

    container.appendChild(card);
  });

    // After cards are added, initialize sliders (attach events and resolve local paths)
    initProjectImageSliders();
    // initialize lightbox preview buttons
    initProjectLightbox();
}

// Create lightbox DOM (if missing) and wire preview buttons
function initProjectLightbox() {
  if (!document.getElementById('project-lightbox')) {
    const lb = document.createElement('div');
    lb.id = 'project-lightbox';
    lb.style.cssText = 'position:fixed;inset:0;display:none;align-items:center;justify-content:center;z-index:60;';
    lb.innerHTML = `
      <div id="lb-overlay" style="position:absolute;inset:0;background:rgba(0,0,0,0.85);"></div>
      <div id="lb-content" style="position:relative;max-width:95%;max-height:95%;display:flex;align-items:center;justify-content:center;padding:16px;">
        <button id="lb-close" aria-label="Close preview" style="position:absolute;top:12px;right:12px;z-index:70;background:transparent;border:none;color:white;font-size:20px;padding:10px;">&times;</button>
        <button id="lb-prev" aria-label="Previous" style="position:absolute;left:10px;z-index:70;background:rgba(0,0,0,0.4);border:none;color:white;font-size:18px;padding:12px;border-radius:999px;">◀</button>
        <img id="lb-img" src="" alt="Preview image" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.6);" />
        <button id="lb-next" aria-label="Next" style="position:absolute;right:10px;z-index:70;background:rgba(0,0,0,0.4);border:none;color:white;font-size:18px;padding:12px;border-radius:999px;">▶</button>
      </div>
    `;
    document.body.appendChild(lb);

    // events
    const overlay = document.getElementById('lb-overlay');
    const closeBtn = document.getElementById('lb-close');
    const prevBtn = document.getElementById('lb-prev');
    const nextBtn = document.getElementById('lb-next');

    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));

    // keyboard
    document.addEventListener('keydown', (e) => {
      const lbEl = document.getElementById('project-lightbox');
      if (!lbEl || lbEl.style.display === 'none') return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // touch swipe for lightbox
    let sx = 0; let sy = 0; let moved = false;
    const img = document.getElementById('lb-img');
    lb.addEventListener('touchstart', (ev) => { const t = ev.touches[0]; if (t) { sx = t.clientX; sy = t.clientY; moved = false; } }, {passive:true});
    lb.addEventListener('touchmove', (ev) => { const t = ev.touches[0]; if (!t) return; const dx = t.clientX - sx; const dy = t.clientY - sy; if (Math.abs(dx) > Math.abs(dy)) { ev.preventDefault(); moved = true; } }, {passive:false});
    lb.addEventListener('touchend', (ev) => { if (!moved) return; const t = ev.changedTouches[0]; if (!t) return; const dx = t.clientX - sx; if (dx > 40) navigateLightbox(-1); else if (dx < -40) navigateLightbox(1); });
  }

  // bind preview buttons
  document.querySelectorAll('.project-preview-btn').forEach((btn) => {
    btn.removeEventListener('click', onPreviewClick);
    btn.addEventListener('click', onPreviewClick);
  });
}

let _lbImages = [];
let _lbIndex = 0;
function onPreviewClick(e) {
  const btn = e.currentTarget;
  const images = JSON.parse(btn.getAttribute('data-images') || '[]');
  if (!images || !images.length) return;
  _lbImages = images.map(resolveImagePath);
  _lbIndex = 0;
  openLightbox(_lbIndex);
}

function openLightbox(startIndex) {
  _lbIndex = ((startIndex % _lbImages.length) + _lbImages.length) % _lbImages.length;
  const lb = document.getElementById('project-lightbox');
  const img = document.getElementById('lb-img');
  if (!lb || !img) return;
  img.src = _lbImages[_lbIndex] || '';
  lb.style.display = 'flex';
}

function closeLightbox() {
  const lb = document.getElementById('project-lightbox');
  if (!lb) return;
  lb.style.display = 'none';
}

function navigateLightbox(dir) {
  if (!_lbImages || !_lbImages.length) return;
  _lbIndex = ((_lbIndex + dir) % _lbImages.length + _lbImages.length) % _lbImages.length;
  const img = document.getElementById('lb-img');
  if (img) img.src = _lbImages[_lbIndex];
}

  // Resolve image path: if URL or absolute path -> return as-is, otherwise prefix with local folder `image_project/`.
  function resolveImagePath(path) {
    if (!path) return "";
    const trimmed = path.trim();
    if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('/')) return trimmed;
    return `image_project/${trimmed}`;
  }

  function initProjectImageSliders() {
    document.querySelectorAll('.project-slider').forEach((wrapper) => {
      const images = JSON.parse(wrapper.getAttribute('data-images') || '[]');
      const imgEl = wrapper.querySelector('.main-project-img');
      const prev = wrapper.querySelector('.slider-prev');
      const next = wrapper.querySelector('.slider-next');
      const thumbsContainer = wrapper.querySelector('.slider-thumbs');

      if (!images || images.length === 0) {
        if (imgEl) imgEl.src = '';
        return;
      }

      // Normalize to resolved paths
      const resolved = images.map(resolveImagePath);
      if (imgEl) imgEl.src = resolved[0];

      let idx = 0;

      function show(i) {
        idx = ((i % resolved.length) + resolved.length) % resolved.length;
        if (imgEl) imgEl.src = resolved[idx];
        // update active thumb
        if (thumbsContainer) {
          Array.from(thumbsContainer.children).forEach((t, j) => {
            t.classList.toggle('opacity-40', j !== idx);
          });
        }
      }

      if (prev) prev.addEventListener('click', () => show(idx - 1));
      if (next) next.addEventListener('click', () => show(idx + 1));

      if (thumbsContainer) {
        // create thumbs
        resolved.forEach((src, i) => {
          const t = document.createElement('img');
          t.src = src;
          t.className = 'w-10 h-10 object-cover rounded-full border border-white/20 cursor-pointer transition-opacity';
          if (i !== 0) t.classList.add('opacity-40');
          t.addEventListener('click', () => show(i));
          thumbsContainer.appendChild(t);
        });
      }
    });
  }

function loadSkills() {
  const savedData = JSON.parse(localStorage.getItem("portfolioData")) || {};
  let skills = savedData.skills || defaultSkills;

  if (skills.length > 0 && typeof skills[0] === "string") {
    skills = skills.map((name) => ({
      name,
      icon: "fas fa-code",
      color: "#22d3ee",
    }));
  }

  const container = document.getElementById("skills-grid");
  container.innerHTML = "";

  skills.forEach((skill) => {
    const item = document.createElement("div");
    item.className =
      "glass rounded-2xl p-6 sm:p-8 text-center card-hover flex flex-col items-center justify-center h-full";
    item.innerHTML = `
                    <i class="${skill.icon || "fas fa-code"} text-4xl sm:text-5xl mb-4 sm:mb-6" style="color: ${skill.color || "#22d3ee"}"></i>
                    <h4 class="text-lg sm:text-xl font-bold mb-2">${skill.name}</h4>
                    <p class="text-xs sm:text-sm text-gray-500">${skill.level || "Advanced"}</p>
                `;
    container.appendChild(item);
  });
}

window.onload = () => {
  loadProjects();
  loadSkills();
  // initialize scroll reveal after content is rendered
  initScrollReveal();
};

const rotatingTexts = [
  "Bringing digital to life.",
  "Coding with joy.",
  "Crafting every emotion.",
  "Tech that gets you.",
  "Redefining the experience."
];

let currentIndex = 0;
const textElement = document.getElementById("rotating-text");
const cursor = document.getElementById("cursor");

let charIndex = 0;
let isDeleting = false;

// ปรับค่าให้ดูเป็นธรรมชาติ
let baseTypingSpeed = 70;
let baseDeletingSpeed = 35;
let pauseAfterComplete = 2000;

function getNaturalTypingSpeed(textLength) {
  // ตัวแรก ๆ พิมพ์ช้าหน่อย
  if (charIndex < 3) return 120 + Math.random() * 40;

  // ช่วงกลางเร็วขึ้น
  if (charIndex < textLength - 3)
    return baseTypingSpeed + Math.random() * 50;

  // ช่วงท้ายช้าลงเล็กน้อย
  return 100 + Math.random() * 40;
}

function getNaturalDeletingSpeed() {
  // ลบช่วงกลางเร็วกว่า
  return baseDeletingSpeed + Math.random() * 30;
}

function type() {
  const currentText = rotatingTexts[currentIndex];

  if (!isDeleting && charIndex < currentText.length) {
    textElement.textContent += currentText.charAt(charIndex);
    charIndex++;
    setTimeout(type, getNaturalTypingSpeed(currentText.length));
    return;
  }

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => {
      isDeleting = true;
      type();
    }, pauseAfterComplete + Math.random() * 1000);
    return;
  }

  if (isDeleting && charIndex > 0) {
    textElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(type, getNaturalDeletingSpeed());
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentIndex = (currentIndex + 1) % rotatingTexts.length;
    setTimeout(type, 500);
  }
}

if (textElement) {
  textElement.textContent = "";
  type();
}

// Scroll reveal animations: inject minimal CSS and observe elements with `reveal-on-scroll` class.
function initScrollReveal() {
  // inject styles once
  if (!document.getElementById('reveal-on-scroll-styles')) {
    const s = document.createElement('style');
    s.id = 'reveal-on-scroll-styles';
    s.textContent = `
      .reveal-on-scroll { opacity: 0; transform: translateY(20px) scale(0.98); will-change: transform, opacity; }
      .reveal-on-scroll.in-view { opacity: 1; transform: translateY(0) scale(1); }
      .reveal-on-scroll:hover { transform: translateY(-4px) scale(1.01); }
    `;
    document.head.appendChild(s);
  }
  // Auto-add reveal-on-scroll to common UI elements if not explicitly set
  const autoSelectors = [
    'section > .max-w-7xl > div',
    '.glass',
    '.badge-float',
    '.project-slider',
    '.group',
    '#projects-grid > div',
    '#skills-grid > div',
    '.card-hover'
  ];
  autoSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (!el.classList.contains('reveal-on-scroll')) el.classList.add('reveal-on-scroll');
    });
  });

  const els = Array.from(document.querySelectorAll('.reveal-on-scroll'));
  if (!els.length) return;

  // set base transition and a small stagger based on index
  els.forEach((el, i) => {
    el.style.transition = 'opacity 0.55s cubic-bezier(.2,.9,.2,1), transform 0.55s cubic-bezier(.2,.9,.2,1)';
    // set a small stagger but cap it so far-away items don't wait too long
    const delay = Math.min(i * 70, 500);
    el.style.transitionDelay = `${delay}ms`;
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
}


// Back to Top Button - โผล่เมื่อเลื่อนลงมา 400px + smooth scroll
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.remove('hidden');
            backToTopBtn.classList.add('flex', 'animate-fade-in');
        } else {
            backToTopBtn.classList.add('hidden');
            backToTopBtn.classList.remove('flex', 'animate-fade-in');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
