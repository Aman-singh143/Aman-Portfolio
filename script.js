(function () {
  'use strict';

  // ===== Mobile Nav Toggle =====
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ===== Theme Toggle =====
  var themeBtn = document.getElementById('theme-toggle');
  var html = document.documentElement;
  var STORAGE_KEY = 'aman-portfolio-theme';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Load saved theme or detect system preference
  var savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = html.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  // ===== Scroll Reveal (IntersectionObserver) =====
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
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

  // ===== Active Mini-Nav Highlighting =====
  var miniNavLinks = document.querySelectorAll('.mini-nav a');
  if (miniNavLinks.length > 0 && 'IntersectionObserver' in window) {
    var sections = [];
    miniNavLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.startsWith('#')) {
        var section = document.getElementById(id.substring(1));
        if (section) sections.push({ el: section, link: link });
      }
    });

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var match = sections.find(function (s) { return s.el === entry.target; });
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
  var typingEl = document.getElementById('typing-text');
  if (typingEl) {
    var roles = [
      'Python Backend Developer',
      'ETL Pipeline Engineer',
      'AI Integration Specialist',
      'Data Systems Builder'
    ];
    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 80;
    var deleteSpeed = 40;
    var pauseEnd = 2000;
    var pauseStart = 500;

    function typeEffect() {
      var currentRole = roles[roleIndex];

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
