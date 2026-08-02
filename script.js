/**
 * Applies the given theme to the document and updates the theme toggle button.
 * @param {string} theme - 'light' or 'dark'
 * @param {HTMLElement} htmlElement - The root html element
 * @param {HTMLElement|null} themeBtn - The theme toggle button element
 */
function applyTheme(theme, htmlElement, themeBtn) {
  if (!htmlElement) return;
  htmlElement.setAttribute('data-theme', theme);
  if (themeBtn) {
    themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { applyTheme };
}

(function () {
  'use strict';
  if (typeof document === 'undefined') return;

  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const themeBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const storageKey = 'aman-portfolio-theme';
  const savedTheme = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'), html, themeBtn);

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next, html, themeBtn);
      localStorage.setItem(storageKey, next);
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (element) { observer.observe(element); });
  } else {
    reveals.forEach(function (element) { element.classList.add('visible'); });
  }

  const miniNavLinks = document.querySelectorAll('.mini-nav a');
  if (miniNavLinks.length && 'IntersectionObserver' in window) {
    const sections = Array.from(miniNavLinks).map(function (link) {
      const id = link.getAttribute('href');
      return id && id.startsWith('#') ? { element: document.querySelector(id), link: link } : null;
    }).filter(function (item) { return item && item.element; });

    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const match = sections.find(function (item) { return item.element === entry.target; });
        if (match) {
          miniNavLinks.forEach(function (link) { link.classList.remove('active-nav'); });
          match.link.classList.add('active-nav');
        }
      });
    }, { threshold: 0.1, rootMargin: '-10% 0px -40% 0px' });

    sections.forEach(function (item) { navObserver.observe(item.element); });
  }

  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;
  const roles = ['Data Engineer', 'Backend Systems Builder', 'Data Automation Specialist', 'Practical AI Integrator'];
  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeEffect() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typingEl.textContent = roles[0];
      return;
    }
    const role = roles[roleIndex];
    typingEl.textContent = deleting ? role.slice(0, characterIndex - 1) : role.slice(0, characterIndex + 1);
    characterIndex += deleting ? -1 : 1;
    if (!deleting && characterIndex === role.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
    } else if (deleting && characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 450);
    } else {
      setTimeout(typeEffect, deleting ? 35 : 70);
    }
  }
  setTimeout(typeEffect, 500);
})();