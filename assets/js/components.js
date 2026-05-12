/**
 * components.js — Reusable Web Components for Казки Дитинства.
 *
 * Custom Elements (light DOM — works with the existing style.css):
 *
 *   <kd-navbar [depth=""]>
 *       Site header + navigation bar.
 *       depth="":     root pages (index.html, about.html, …)
 *       depth="../":  subdirectory pages (privacy_policy/, …)
 *
 *   <kd-footer [depth=""]>
 *       Site footer with brand, links, legal links, copyright.
 *       Same depth convention as <kd-navbar>.
 *
 *   <kd-store-btn store="ios|android"
 *                 [variant="primary|dark|ghost"]
 *                 [size="lg"]>
 *       App-store download button with icon + localised label.
 *       Defaults: ios → primary, android → dark.
 *
 * Load order (in <head>, before body):
 *   <script src="assets/js/components.js" defer></script>
 *   — defer ensures it runs after parsing but before DOMContentLoaded,
 *     so strings.js / main.js hydration sees the injected HTML.
 */

(function () {
  'use strict';

  /* ── Internal helpers ──────────────────────────────────────────────────── */

  /** Wrap an SVG path string in a button-icon SVG element. */
  function _svgIcon(d) {
    return '<svg class="btn__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'
         + '<path d="' + d + '"/></svg>';
  }

  /* ── SVG icon paths ────────────────────────────────────────────────────── */
  var ICONS = {
    apple:
      _svgIcon(
        'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79' +
        '-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45' +
        ' 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87' +
        '.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28' +
        '-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83' +
        'M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19' +
        '-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z'
      ),
    google:
      _svgIcon(
        'M3.18 23.76c.3.16.64.2.99.11l.09-.05L14.64 12 10.36 7.72 3.18 23.76z' +
        'm18.04-11.4c-.45-.27-2.18-1.24-4.9-2.8l-2.24 2.44 2.24 2.44' +
        'c2.72-1.56 4.46-2.54 4.9-2.8.54-.31.54-1.28 0-1.28z' +
        'M2.28.25C1.93.48 1.7.88 1.7 1.39v21.22c0 .51.23.91.58 1.14' +
        'l.09.06L14.14 12 2.28.25z' +
        'M19.38 9.96l-2.4-1.37-2.5 2.77 2.5 2.75 2.4-1.37' +
        'c.68-.39.68-2.39 0-2.78z'
      ),
  };

  /* ── Store URLs ────────────────────────────────────────────────────────── */
  var STORE_URLS = {
    ios:     'https://apps.apple.com/app/id1513020180',
    android: 'https://play.google.com/store/apps/details?id=ua.andriyantonov.tales',
  };

  /* ────────────────────────────────────────────────────────────────────────
   * <kd-navbar [depth=""]>
   * ────────────────────────────────────────────────────────────────────── */
  class KdNavbar extends HTMLElement {
    connectedCallback() {
      var d = this.getAttribute('depth') || '';
      this.innerHTML =
        '<header>' +
        '<nav class="navbar" aria-label="Головне меню">' +
          '<div class="navbar__inner">' +
            '<a class="navbar__brand" href="' + d + 'index.html">' +
              '<img class="navbar__logo"' +
                  ' src="' + d + 'assets/images/android-foreground-1.webp"' +
                  ' alt="Лого">' +
              '<span class="navbar__name" data-str="nav.brand">Казки Дитинства</span>' +
            '</a>' +
            '<div class="navbar__links">' +
              '<a class="navbar__link"' +
                  ' href="' + d + 'about.html"' +
                  ' data-str="nav.about">Про проєкт</a>' +
              '<a class="btn btn--primary"' +
                  ' style="margin-left:.5rem;padding:.45rem 1.1rem;font-size:.9rem;"' +
                  ' href="' + d + 'support.html"' +
                  ' data-str="nav.support">Підтримати 💪</a>' +
            '</div>' +
            '<button class="navbar__toggle"' +
                    ' aria-label="Відкрити меню"' +
                    ' aria-expanded="false">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
          '<div class="navbar__drawer">' +
            '<a class="navbar__link"' +
                ' href="' + d + 'about.html"' +
                ' data-str="nav.about">Про проєкт</a>' +
            '<a class="btn btn--primary"' +
                ' style="margin-top:.25rem;"' +
                ' href="' + d + 'support.html"' +
                ' data-str="nav.support">Підтримати 💪</a>' +
          '</div>' +
        '</nav>' +
        '</header>';
    }
  }
  customElements.define('kd-navbar', KdNavbar);

  /* ────────────────────────────────────────────────────────────────────────
   * <kd-footer [depth=""]>
   * ────────────────────────────────────────────────────────────────────── */
  class KdFooter extends HTMLElement {
    connectedCallback() {
      var d = this.getAttribute('depth') || '';
      this.innerHTML =
        '<footer class="footer">' +
          '<div class="footer__inner">' +
            '<div class="footer__brand">' +
              '<a class="footer__brand-link" href="' + d + 'index.html">' +
                '<img class="footer__logo"' +
                    ' src="' + d + 'assets/images/android-foreground-1.webp"' +
                    ' alt="Лого">' +
                '<span class="footer__brand-name"' +
                      ' data-str="nav.brand">Казки Дитинства</span>' +
              '</a>' +
              '<p class="footer__tagline"' +
                  ' data-str="footer.tagline">Зроблено з ❤️ до України 🇺🇦</p>' +
            '</div>' +
            '<div>' +
              '<p class="footer__col-title"' +
                  ' data-str="footer.links_title">Посилання</p>' +
              '<ul class="footer__links">' +
                '<li><a href="' + d + 'about.html"' +
                        ' data-str="nav.about">Про проєкт</a></li>' +
                '<li><a href="' + d + 'support.html"' +
                        ' data-str="nav.support">Підтримати 💪</a></li>' +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<p class="footer__col-title"' +
                  ' data-str="footer.legal_title">Правові штуки</p>' +
              '<ul class="footer__links">' +
                '<li><a href="' + d + 'privacy_policy/"' +
                        ' data-str="footer.privacy">Privacy Policy</a></li>' +
                '<li><a href="' + d + 'terms_and_conditions/"' +
                        ' data-str="footer.terms">Terms &amp; Conditions</a></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
          '<p class="footer__bottom"' +
              ' data-str="footer.copyright">© 2024–2026 Казки Дитинства. Всі права захищено.</p>' +
        '</footer>';
    }
  }
  customElements.define('kd-footer', KdFooter);

  /* ────────────────────────────────────────────────────────────────────────
   * <kd-store-btn store="ios|android"
   *               [variant="primary|dark|ghost"]
   *               [size="lg"]>
   *
   * Renders a styled anchor → SVG icon + localised label span.
   * ────────────────────────────────────────────────────────────────────── */
  class KdStoreBtn extends HTMLElement {
    connectedCallback() {
      var store   = this.getAttribute('store') || 'ios';
      var size    = this.getAttribute('size')  || '';
      var variant = this.getAttribute('variant')
                    || (store === 'ios' ? 'primary' : 'dark');
      var strKey  = store === 'ios' ? 'hero.btn_ios' : 'hero.btn_android';
      var label   = store === 'ios' ? 'App Store' : 'Google Play';
      var url     = STORE_URLS[store] || '#';
      var icon    = store === 'ios' ? ICONS.apple : ICONS.google;
      var cls     = ['btn', 'btn--' + variant, size ? 'btn--' + size : '']
                      .filter(Boolean).join(' ');

      this.innerHTML =
        '<a class="' + cls + '"' +
            ' href="' + url + '"' +
            ' target="_blank"' +
            ' rel="noopener noreferrer">' +
          icon +
          '<span data-str="' + strKey + '">' + label + '</span>' +
        '</a>';
    }
  }
  customElements.define('kd-store-btn', KdStoreBtn);

})();
