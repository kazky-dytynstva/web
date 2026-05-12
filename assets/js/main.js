/**
 * main.js — Казки Дитинства
 *
 * Responsibilities:
 *  1. Hydrate [data-str] elements from window.STRINGS
 *  2. Navbar hamburger toggle (mobile)
 *  3. Screenshots card-stack auto-rotation
 */

(function () {
  'use strict';

  /* ── 1. Strings hydration ─────────────────────────────── */
  /**
   * Looks up a dotted key path in window.STRINGS and returns the value.
   * e.g. "nav.brand" → STRINGS.nav.brand
   */
  function getString(keyPath) {
    const keys = keyPath.split('.');
    let node = window.STRINGS;
    for (const k of keys) {
      if (node == null || typeof node !== 'object') return null;
      node = node[k];
    }
    return typeof node === 'string' ? node : null;
  }

  function hydrateStrings() {
    if (!window.STRINGS) return;
    document.querySelectorAll('[data-str]').forEach(function (el) {
      const val = getString(el.getAttribute('data-str'));
      if (val == null) return;
      // Use innerHTML if the value contains HTML tags
      if (/<[a-z][\s\S]*>/i.test(val)) {
        el.innerHTML = val;
      } else {
        // Handle literal \n as line breaks (for multi-line strings)
        el.innerHTML = val
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br>');
      }
    });
  }

  /* ── 2. Navbar hamburger ──────────────────────────────── */
  function initNavbar() {
    const toggle = document.querySelector('.navbar__toggle');
    const drawer = document.querySelector('.navbar__drawer');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', function () {
      const isOpen = drawer.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close drawer when a link inside it is clicked
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── 3. Screenshot card stack ─────────────────────────── */
  /**
   * Stack order: cards are sorted by their DOM position.
   * The FIRST child is the top card (highest z-index, most visible).
   * Rotation: move first child to end of parent, triggering CSS
   * nth-child recalculation. A leaving animation plays on the
   * departing card before it is moved.
   */
  function initPhoneStack() {
    const stack = document.querySelector('.phone-stack');
    if (!stack) return;

    let timer = null;
    let rotating = false;

    function rotate() {
      if (rotating) return;
      const cards = stack.querySelectorAll('.phone-card');
      if (cards.length < 2) return;

      rotating = true;
      const leaving = cards[0];
      leaving.classList.add('is-leaving');

      setTimeout(function () {
        leaving.classList.remove('is-leaving');
        stack.appendChild(leaving);   // move to end of DOM → becomes nth-child(last)
        rotating = false;
      }, 500); // matches CSS transition duration
    }

    // Auto-rotate every 3 seconds
    function start() {
      timer = setInterval(rotate, 3000);
    }
    function stop() {
      clearInterval(timer);
    }

    // Pause on hover / touch-start
    stack.addEventListener('mouseenter', stop);
    stack.addEventListener('mouseleave', start);
    stack.addEventListener('touchstart', function () { stop(); }, { passive: true });
    stack.addEventListener('touchend', function () {
      // Resume after a short delay on touch devices
      setTimeout(start, 2500);
    }, { passive: true });

    // Tap / click to manually advance
    stack.addEventListener('click', function () {
      stop();
      rotate();
      start();
    });

    start();
  }

  /* ── Init ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    hydrateStrings();
    initNavbar();
    initPhoneStack();
  });

})();
