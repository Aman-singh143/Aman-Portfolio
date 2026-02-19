(function () {
  'use strict';

  // Mobile Nav Toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Theme Toggle
  const themeBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const STORAGE_KEY = 'aman-portfolio-theme';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Load saved theme or detect system preference
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const current = html.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  // Scroll Reveal (IntersectionObserver)
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // Active Mini-Nav Highlighting
  const miniNavLinks = document.querySelectorAll('.mini-nav a');
  if (miniNavLinks.length > 0 && 'IntersectionObserver' in window) {
    const sections = [];
    miniNavLinks.forEach(function (link) {
      const id = link.getAttribute('href');
      if (id && id.startsWith('#')) {
        const section = document.getElementById(id.substring(1));
        if (section) sections.push({ el: section, link: link });
      }
    });

    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const match = sections.find(function (s) { return s.el === entry.target; });
          if (match) {
            miniNavLinks.forEach(function (l) { l.classList.remove('active-nav'); });
            match.link.classList.add('active-nav');
          }
        }
      });
    }, {
      threshold: 0.1, // Lower threshold
      rootMargin: '-10% 0px -40% 0px' // Adjusted margin
    });

    sections.forEach(function (s) {
      navObserver.observe(s.el);
    });

    // Handle bottom of page case explicitly
    window.addEventListener('scroll', function () {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        miniNavLinks.forEach(function (l) { l.classList.remove('active-nav'); });
        if (miniNavLinks.length > 0) {
          miniNavLinks[miniNavLinks.length - 1].classList.add('active-nav');
        }
      }
    });
  }

  // ===== Typing Effect (index page only) =====
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const roles = [
      'Python Backend Developer',
      'ETL Pipeline Engineer',
      'AI Integration Specialist',
      'Data Systems Builder'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseEnd = 2000;
    const pauseStart = 500;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        typingEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(typeEffect, pauseEnd);
          return;
        }
        setTimeout(typeEffect, typeSpeed);
      } else {
        typingEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeEffect, pauseStart);
          return;
        }
        setTimeout(typeEffect, deleteSpeed);
      }
    }

    // Start after a small delay for page load
    setTimeout(typeEffect, 600);
  }

})();
