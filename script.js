/* ============================================================
   SENZELIWE PATOSI — PORTFOLIO JAVASCRIPT
   ============================================================
   Sections:
     1. Lightbox       — open/close certificate viewer
     2. Scroll fade-in — reveal .fade-in elements on scroll
     3. Active nav     — highlight current section in nav
     4. Terminal       — animated code typing in About section
   ============================================================ */


/* ============================================================
   1. LIGHTBOX
   ============================================================
   Usage: add  onclick="openCert('path/to/image.png', 'Title')"
   to any .cert-card element in index.html.
   ============================================================ */

function openCert(imageSrc, title) {
  document.getElementById('lb-img').src = imageSrc;
  document.getElementById('lb-title').textContent = title;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLB() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('lb-img').src = '';
}

function closeLightbox(e) {
  if (e.target === document.getElementById('lightbox')) closeLB();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLB();
});


/* ============================================================
   2. SCROLL FADE-IN
   ============================================================ */

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 5) * 0.08}s`;
  fadeObserver.observe(el);
});


/* ============================================================
   3. ACTIVE NAV HIGHLIGHT
   ============================================================ */

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });
});


/* ============================================================
   4. ANIMATED CODE TERMINAL
   ============================================================
   To update the displayed code, edit terminalLines below.
   ============================================================ */

const terminalLines = [
  { text: "# Senzeliwe Patosi",                 cls: "cm"   },
  { text: "class Developer:",                    cls: "kw"   },
  { text: '  name    = "Senzeliwe Patosi"',      cls: "ind"  },
  { text: '  school  = "WeThinkCode"',           cls: "ind"  },
  { text: '  focus   = "Cloud Computing"',       cls: "ind"  },
  { text: '  langs   = ["Python","Java","SQL"]', cls: "ind"  },
  { text: "",                                     cls: "plain"},
  { text: "  def passion(self):",                cls: "fn"   },
  { text: '    return "Building the future"',    cls: "str"  },
];

const terminalBody = document.getElementById('termBody');
let lineIndex = 0;

function typeNextLine() {
  if (lineIndex >= terminalLines.length) return;
  const line     = terminalLines[lineIndex++];
  const div      = document.createElement('div');
  div.className  = `code-line ${line.cls}`;
  div.textContent = line.text || ' ';
  const duration  = Math.max(0.25, line.text.length * 0.02);
  div.style.animationDuration = duration + 's';
  terminalBody.appendChild(div);
  setTimeout(typeNextLine, duration * 1000 + 100);
}

const termObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    typeNextLine();
    termObserver.disconnect();
  }
}, { threshold: 0.3 });

const aboutSection = document.querySelector('#about');
if (aboutSection) termObserver.observe(aboutSection);
