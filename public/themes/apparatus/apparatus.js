/**
 * APPARATUS THEME - JTG 1:1 REPLICA CONTROLLER
 * Full Desert Sunset Parallax, Glassmorphism Login Card & Forgot Password System
 */
(function () {
  'use strict';

  function isAuthPage() {
    return window.location.pathname.startsWith('/auth') || 
           window.location.pathname === '/login';
  }

  // Toast / Popup Notification System
  function showToast(type, title, message) {
    const existing = document.getElementById('apparatus-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'apparatus-toast';
    toast.className = 'apparatus-toast apparatus-toast-' + type;

    const iconSvg = type === 'success' 
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

    toast.innerHTML = 
      '<div class="apparatus-toast-icon">' + iconSvg + '</div>' +
      '<div class="apparatus-toast-content">' +
        '<div class="apparatus-toast-title">' + title + '</div>' +
        '<div class="apparatus-toast-msg">' + message + '</div>' +
      '</div>';

    document.body.appendChild(toast);

    setTimeout(function () {
      toast.classList.add('apparatus-toast-show');
    }, 20);

    if (type !== 'success') {
      setTimeout(function () {
        toast.classList.remove('apparatus-toast-show');
        setTimeout(function () { toast.remove(); }, 400);
      }, 5000);
    }
  }

  // React Synthetic Input Helper
  function setReactValue(input, val) {
    if (!input) return;
    const lastVal = input.value;
    input.value = val;
    const tracker = input._valueTracker;
    if (tracker) tracker.setValue(lastVal);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Fetch CSRF Token
  function getCsrfToken() {
    const metaCsrf = document.querySelector('meta[name="csrf-token"]');
    return metaCsrf ? metaCsrf.getAttribute('content') : '';
  }


  function applyViewMode() {
    if (isAuthPage()) return;

    const isServerTab = window.location.hash === '#servers' || window.location.pathname.startsWith('/servers');
    const hero = document.getElementById('apparatus-dashboard-view');
    const dashLink = document.querySelector('.apparatus-nav-link[data-tab="dashboard"]');
    const serverLink = document.querySelector('.apparatus-nav-link[data-tab="servers"]');

    if (window.location.pathname === '/') {
      if (isServerTab) {
        if (dashLink) dashLink.classList.remove('active');
        if (serverLink) serverLink.classList.add('active');
        if (hero) hero.style.display = 'none';
        document.body.classList.add('apparatus-view-servers');
        document.body.classList.remove('apparatus-view-dashboard');
      } else {
        if (dashLink) dashLink.classList.add('active');
        if (serverLink) serverLink.classList.remove('active');
        if (hero) hero.style.display = 'block';
        document.body.classList.add('apparatus-view-dashboard');
        document.body.classList.remove('apparatus-view-servers');
      }
    } else {
      if (dashLink) dashLink.classList.remove('active');
      if (serverLink) serverLink.classList.remove('active');
      if (hero) hero.style.display = 'none';
      document.body.classList.remove('apparatus-view-dashboard', 'apparatus-view-servers');
    }

    cleanPterodactylElements();
  }

  function cleanPterodactylElements() {
    if (isAuthPage()) return;

    // 0. Completely remove native progress bar / cyan glowing line
    document.querySelectorAll('div[class*="ProgressBar"], div[class*="ProgressBar__BarFill"], div[class*="ProgressBar___StyledDiv"], .sc-14ayc3f-0, .sc-14ayc3f-1, [class*="sc-14ayc3f"]').forEach(function (el) {
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
      el.style.setProperty('height', '0', 'important');
      el.style.setProperty('box-shadow', 'none', 'important');
      el.style.setProperty('opacity', '0', 'important');
    });

    // 1. Hide native top navigation bar completely
    const navSelectors = [
      'nav',
      'header',
      '[role="navigation"]',
      '[class*="NavigationBar"]',
      '[class*="Navigation___"]',
      'div[class*="NavigationBar___StyledDiv"]'
    ];
    document.querySelectorAll(navSelectors.join(',')).forEach(function (el) {
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
      el.style.setProperty('height', '0', 'important');
      el.style.setProperty('min-height', '0', 'important');
      el.style.setProperty('max-height', '0', 'important');
      el.style.setProperty('margin', '0', 'important');
      el.style.setProperty('padding', '0', 'important');
      el.style.setProperty('border', 'none', 'important');
    });

    // 2. Hide top bar inside #app if rendered without standard nav tag
    const app = document.getElementById('app');
    if (app) {
      const topDivs = app.querySelectorAll('& > div > div, & > div > header, & > div > nav');
      topDivs.forEach(function (el) {
        if (
          el.querySelector('a[href="/admin"]') ||
          el.querySelector('button[aria-label="Search"]') ||
          (el.textContent.includes('Pterodactyl') && !el.classList.contains('apparatus-sidebar') && el.tagName.toLowerCase() !== 'main')
        ) {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
          el.style.setProperty('height', '0', 'important');
          el.style.setProperty('margin', '0', 'important');
          el.style.setProperty('padding', '0', 'important');
          el.style.setProperty('border', 'none', 'important');
        }
      });
    }

    // 3. Hide Pterodactyl and Blueprint footers & copyright
    document.querySelectorAll('footer, [class*="Blueprint"], [class*="Footer"], p, div, span').forEach(function (el) {
      if (el.children.length === 0 && (
        el.textContent.includes('Blueprint') ||
        el.textContent.includes('Pterodactyl ©') ||
        el.textContent.includes('Pterodactyl®')
      )) {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
        if (el.parentElement && (el.parentElement.tagName.toLowerCase() === 'p' || el.parentElement.tagName.toLowerCase() === 'footer')) {
          el.parentElement.style.setProperty('display', 'none', 'important');
          el.parentElement.style.setProperty('visibility', 'hidden', 'important');
        }
      }
    });
  }

  function initSidebar() {
    if (isAuthPage()) {
      const existing = document.getElementById('apparatus-sidebar');
      if (existing) existing.style.display = 'none';
      const toggle = document.getElementById('apparatus-mobile-toggle');
      if (toggle) toggle.style.display = 'none';
      const hero = document.getElementById('apparatus-dashboard-view');
      if (hero) hero.style.display = 'none';
      return;
    }

    // Insert Dashboard Hero if on dashboard and not already created
    let hero = document.getElementById('apparatus-dashboard-view');
    if (!hero) {
      hero = document.createElement('div');
      hero.id = 'apparatus-dashboard-view';
      hero.className = 'apparatus-dashboard-hero';
      hero.innerHTML = `
        <div class="apparatus-hero-card">
          <div class="apparatus-hero-badge">ArixByte Cloud</div>
          <h1 class="apparatus-hero-title">Welcome to <span>ArixByte</span></h1>
          <p class="apparatus-hero-desc">Your high-performance gaming servers and cloud infrastructure are powered and ready.</p>
          <div class="apparatus-hero-actions">
            <a href="#servers" class="apparatus-hero-btn apparatus-hero-btn-primary" id="apparatus-hero-to-servers">
              <i class="ri-server-line"></i> View My Servers
            </a>
            <a href="/account" class="apparatus-hero-btn apparatus-hero-btn-secondary">
              <i class="ri-user-settings-line"></i> Account Settings
            </a>
            <a href="https://discord.arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-hero-btn apparatus-hero-btn-discord">
              <i class="ri-discord-fill"></i> Join Discord
            </a>
          </div>
        </div>
      `;
      const app = document.getElementById('app');
      if (app) {
        app.prepend(hero);
      } else {
        document.body.appendChild(hero);
      }

      const toServersBtn = document.getElementById('apparatus-hero-to-servers');
      if (toServersBtn) {
        toServersBtn.addEventListener('click', function (e) {
          e.preventDefault();
          window.location.hash = '#servers';
          applyViewMode();
        });
      }
    }

    let sidebar = document.getElementById('apparatus-sidebar');
    if (!sidebar) {
      sidebar = document.createElement('aside');
      sidebar.id = 'apparatus-sidebar';
      sidebar.className = 'apparatus-sidebar';

      sidebar.innerHTML = `
        <div class="apparatus-sidebar-header">
          <div class="apparatus-sidebar-brand">
            <span class="brand-text">ARIXBYTE</span>
          </div>
        </div>

        <div class="apparatus-sidebar-scroll">
          <!-- Home -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Home</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="/" class="apparatus-nav-link" data-tab="dashboard">
                  <i class="ri-dashboard-3-line apparatus-nav-icon"></i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#servers" class="apparatus-nav-link" data-tab="servers">
                  <i class="ri-server-line apparatus-nav-icon"></i>
                  <span>Servers</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Account -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Account</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="/account" class="apparatus-nav-link" data-path="/account">
                  <i class="ri-user-settings-line apparatus-nav-icon"></i>
                  <span>Account Credentials</span>
                </a>
              </li>
              <li>
                <a href="/account/api" class="apparatus-nav-link" data-path="/account/api">
                  <i class="ri-key-2-line apparatus-nav-icon"></i>
                  <span>API Credentials</span>
                </a>
              </li>
              <li>
                <a href="/account/ssh" class="apparatus-nav-link" data-path="/account/ssh">
                  <i class="ri-terminal-window-line apparatus-nav-icon"></i>
                  <span>SSH Keys</span>
                </a>
              </li>
              <li>
                <a href="/account/activity" class="apparatus-nav-link" data-path="/account/activity">
                  <i class="ri-history-line apparatus-nav-icon"></i>
                  <span>Recent Activity</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Ticket -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Ticket</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="#ticket" class="apparatus-nav-link apparatus-ticket-link">
                  <i class="ri-customer-service-2-line apparatus-nav-icon"></i>
                  <span>Ticket</span>
                  <span class="apparatus-tag-soon">Soon</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Socials -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Socials</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="https://arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-nav-link">
                  <i class="ri-global-line apparatus-nav-icon"></i>
                  <span>Website</span>
                  <i class="ri-external-link-line apparatus-external-icon"></i>
                </a>
              </li>
              <li>
                <a href="https://discord.arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-nav-link">
                  <i class="ri-discord-fill apparatus-nav-icon" style="color: #5865F2;"></i>
                  <span>Discord</span>
                  <i class="ri-external-link-line apparatus-external-icon"></i>
                </a>
              </li>
              <li>
                <a href="https://instagram.arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-nav-link">
                  <i class="ri-instagram-line apparatus-nav-icon" style="color: #E1306C;"></i>
                  <span>Instagram</span>
                  <i class="ri-external-link-line apparatus-external-icon"></i>
                </a>
              </li>
              <li>
                <a href="https://wa.me/918218444633" target="_blank" rel="noopener noreferrer" class="apparatus-nav-link">
                  <i class="ri-whatsapp-line apparatus-nav-icon" style="color: #25D366;"></i>
                  <span>Whatsapp</span>
                  <i class="ri-external-link-line apparatus-external-icon"></i>
                </a>
              </li>
            </ul>
          </div>

          <!-- Empty space after socials -->
          <div class="apparatus-downside-spacer"></div>

          <!-- Downside Options (Admin Panel & Sign Out) -->
          <div class="apparatus-nav-category apparatus-downside-options">
            <ul class="apparatus-nav-list">
              <li>
                <a href="/admin" class="apparatus-nav-link" data-path="/admin">
                  <i class="ri-settings-4-line apparatus-nav-icon"></i>
                  <span>Admin Panel</span>
                  <span class="apparatus-tag-admin">Admin</span>
                </a>
              </li>
              <li>
                <a href="#logout" class="apparatus-nav-link apparatus-logout-link">
                  <i class="ri-logout-box-r-line apparatus-nav-icon"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      `;

      document.body.appendChild(sidebar);

      // Ticket placeholder click handler
      const ticketBtn = sidebar.querySelector('.apparatus-ticket-link');
      if (ticketBtn) {
        ticketBtn.addEventListener('click', function (e) {
          e.preventDefault();
          showToast('success', 'Tickets', 'Ticket support system is coming soon!');
        });
      }

      // Logout handler
      const logoutBtn = sidebar.querySelector('.apparatus-logout-link');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', async function (e) {
          e.preventDefault();
          showToast('info', 'Signing Out', 'Logging out of your account...');
          try {
            const csrf = getCsrfToken();
            await fetch('/auth/logout', {
              method: 'POST',
              headers: {
                'X-CSRF-TOKEN': csrf,
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
              }
            });
          } catch (err) {}
          window.location.href = '/auth/login';
        });
      }

      // Tab switcher handlers for Dashboard vs Servers
      sidebar.querySelectorAll('a[data-tab]').forEach(function (tabLink) {
        tabLink.addEventListener('click', function (e) {
          const tab = this.getAttribute('data-tab');
          if (tab === 'servers') {
            if (window.location.pathname !== '/') {
              window.location.href = '/#servers';
              return;
            }
            e.preventDefault();
            window.location.hash = '#servers';
            applyViewMode();
          } else if (tab === 'dashboard') {
            if (window.location.pathname !== '/') {
              window.location.href = '/';
              return;
            }
            e.preventDefault();
            if (window.location.hash) {
              history.pushState(null, '', window.location.pathname);
            }
            applyViewMode();
          }
        });
      });

      // Mobile toggle button
      let toggle = document.getElementById('apparatus-mobile-toggle');
      if (!toggle) {
        toggle = document.createElement('button');
        toggle.id = 'apparatus-mobile-toggle';
        toggle.className = 'apparatus-mobile-toggle';
        toggle.setAttribute('aria-label', 'Toggle Navigation');
        toggle.innerHTML = '<i class="ri-menu-2-line"></i>';
        toggle.addEventListener('click', function () {
          sidebar.classList.toggle('open');
        });
        document.body.appendChild(toggle);
      }
    } else {
      sidebar.style.display = 'flex';
      const toggle = document.getElementById('apparatus-mobile-toggle');
      if (toggle) toggle.style.display = '';
    }

    // Update active route link
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.apparatus-nav-link[data-path]');
    links.forEach(function (link) {
      const p = link.getAttribute('data-path');
      if (p !== '/' && currentPath.startsWith(p)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    applyViewMode();
  }

  function initApparatus() {
    const isAuth = isAuthPage();

    if (isAuth) {
      document.body.classList.add('apparatus-auth');
    } else {
      document.body.classList.remove('apparatus-auth');
    }

    let wrapper = document.getElementById('apparatus-desert-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'apparatus-desert-wrapper';
      wrapper.className = 'desert-wrapper';

      wrapper.innerHTML = `
        <div class="parallax-container" id="apparatus-parallax">
          <img src="/themes/apparatus/desert/img-bg.svg" alt="" class="parallax-layer layer-bg" />
          <img src="/themes/apparatus/desert/img-1.svg" alt="" class="parallax-layer layer-1" />
          <img src="/themes/apparatus/desert/img-2.svg" alt="" class="parallax-layer layer-2" />
          <img src="/themes/apparatus/desert/img-3.svg" alt="" class="parallax-layer layer-3" />
          
          <div class="parallax-layer layer-text">
            <h1 class="background-title">ARIXBYTE</h1>
            <p class="background-subtitle">CLOUD &amp; INFRASTRUCTURES</p>
          </div>

          <img src="/themes/apparatus/desert/img-4.svg" alt="" class="parallax-layer layer-4" />
          <img src="/themes/apparatus/desert/img-5.svg" alt="" class="parallax-layer layer-5" />
          <img src="/themes/apparatus/desert/img-6.svg" alt="" class="parallax-layer layer-6" />
          <img src="/themes/apparatus/desert/img-7.svg" alt="" class="parallax-layer layer-7" />
        </div>

        <div class="login-card" id="apparatus-card-slot"></div>
      `;

      document.body.prepend(wrapper);
      setupParallax();
    }

    const cardSlot = document.getElementById('apparatus-card-slot');

    if (isAuth) {
      if (cardSlot) cardSlot.style.display = 'block';
      const path = window.location.pathname;
      if (path.startsWith('/auth/password/reset')) {
        renderResetMode();
      } else if (path.startsWith('/auth/password')) {
        renderForgotMode();
      } else {
        renderLoginMode();
      }
    } else {
      if (cardSlot) cardSlot.style.display = 'none';
      if (typeof gsap !== 'undefined') {
        gsap.set(".desert-wrapper", { backgroundColor: "#F7ABAE" });
        gsap.set(".parallax-container", { scale: 1, opacity: 1 });
      }
    }

    initSidebar();
  }

  // Icons
  const userSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
  const lockSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
  const mailSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';

  // ----------------------------------------------------------------------------
  // VIEW 1: LOGIN MODE
  // ----------------------------------------------------------------------------
  function renderLoginMode() {
    const card = document.getElementById('apparatus-card-slot');
    if (!card) return;

    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.visibility = 'visible';

    card.innerHTML = `
      <h2 class="login-title">ArixByte Login</h2>
      <p class="login-subtitle">Welcome to ArixByte Panel</p>
      
      <form class="login-form" id="apparatus-login-form" autocomplete="on">
        <div id="apparatus-login-error" class="login-error" style="display: none;"></div>

        <div class="input-group">
          <span class="input-icon"><i class="ri-user-line"></i></span>
          <input 
            type="text" 
            id="apparatus-user-field"
            required 
            placeholder="Username or Email" 
            class="login-input" 
            autocomplete="username"
          />
        </div>

        <div class="input-group">
          <span class="input-icon"><i class="ri-lock-line"></i></span>
          <input 
            type="password" 
            id="apparatus-pass-field"
            required 
            placeholder="Password" 
            class="login-input" 
            autocomplete="current-password"
          />
        </div>

        <button type="submit" id="apparatus-submit-btn" class="login-button">
          Sign In
        </button>
      </form>

      <div class="apparatus-footer-links">
        <p>Don’t have an account? <a href="/auth/register">Register</a></p>
        <p>Forgot Password? <a href="/auth/password" id="apparatus-to-forgot">Click Here</a></p>
      </div>
    `;

    // Fallback SVG icons
    const icons = card.querySelectorAll('.input-icon');
    if (icons[0]) icons[0].innerHTML = userSvg;
    if (icons[1]) icons[1].innerHTML = lockSvg;

    // Handle Forgot Password link click smoothly
    const forgotLink = document.getElementById('apparatus-to-forgot');
    if (forgotLink) {
      forgotLink.addEventListener('click', function (e) {
        e.preventDefault();
        history.pushState(null, '', '/auth/password');
        renderForgotMode();
      });
    }

    // Handle Login Submit
    const form = document.getElementById('apparatus-login-form');
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const userVal = document.getElementById('apparatus-user-field').value.trim();
        const passVal = document.getElementById('apparatus-pass-field').value;
        const errorBox = document.getElementById('apparatus-login-error');
        const submitBtn = document.getElementById('apparatus-submit-btn');

        if (!userVal || !passVal) {
          showToast('error', 'Missing Information', 'Please enter your username and password.');
          return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Authenticating...';
        if (errorBox) {
          errorBox.style.display = 'none';
          errorBox.textContent = '';
        }

        // Bridge to native Formik in #app
        const pteroForm = document.querySelector('#app form');
        const pteroUser = pteroForm ? (pteroForm.querySelector('input[name="username"]') || pteroForm.querySelector('input[type="text"]')) : null;
        const pteroPass = pteroForm ? (pteroForm.querySelector('input[name="password"]') || pteroForm.querySelector('input[type="password"]')) : null;
        const pteroSubmit = pteroForm ? pteroForm.querySelector('button[type="submit"]') : null;

        if (pteroUser && pteroPass && pteroSubmit) {
          setReactValue(pteroUser, userVal);
          setReactValue(pteroPass, passVal);
          pteroSubmit.click();
        }

        // Direct API Request
        try {
          const token = getCsrfToken();
          const resp = await fetch('/auth/login', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': token,
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ user: userVal, password: passVal })
          });

          const data = await resp.json();

          if (resp.ok) {
            showToast('success', 'Login Successful!', 'Welcome back! Redirecting to panel...');
            setTimeout(function () {
              if (data.data && data.data.complete) {
                window.location.href = data.data.intended || '/';
              } else if (data.data && data.data.confirmation_token) {
                window.location.href = '/auth/login/checkpoint';
              } else {
                window.location.href = '/';
              }
            }, 800);
          } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign In';

            let errorDetail = 'Invalid username or password.';
            if (data.errors && data.errors[0] && data.errors[0].detail) {
              errorDetail = data.errors[0].detail;
            } else if (data.message) {
              errorDetail = data.message;
            }

            if (resp.status === 429) {
              errorDetail = 'Too many login attempts. Please wait a few moments.';
            } else if (resp.status === 500) {
              errorDetail = 'Panel error: reCAPTCHA quota exceeded or server error.';
            }

            showToast('error', 'Login Failed', errorDetail);
            if (errorBox) {
              errorBox.textContent = errorDetail;
              errorBox.style.display = 'block';
            }
          }
        } catch (err) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sign In';
          const netMsg = 'Network error communicating with panel.';
          showToast('error', 'Error', netMsg);
          if (errorBox) {
            errorBox.textContent = netMsg;
            errorBox.style.display = 'block';
          }
        }
      });
    }
  }

  // ----------------------------------------------------------------------------
  // VIEW 2: FORGOT PASSWORD MODE
  // ----------------------------------------------------------------------------
  function renderForgotMode() {
    const card = document.getElementById('apparatus-card-slot');
    if (!card) return;

    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.visibility = 'visible';

    card.innerHTML = `
      <h2 class="login-title">ArixByte Login</h2>
      <p class="login-subtitle">Request Password Reset</p>
      
      <form class="login-form" id="apparatus-forgot-form" autocomplete="on">
        <div id="apparatus-forgot-msg" style="display: none;"></div>

        <p style="margin: 0 0 0.5rem 0; font-size: 0.95rem; color: rgba(255, 255, 255, 0.85); line-height: 1.4;">
          Enter your account username or email to receive instructions on resetting your password.
        </p>

        <div class="input-group">
          <span class="input-icon"><i class="ri-user-line"></i></span>
          <input 
            type="text" 
            id="apparatus-email-field"
            required 
            placeholder="Username or Email Address" 
            class="login-input" 
            autocomplete="username"
          />
        </div>

        <button type="submit" id="apparatus-send-email-btn" class="login-button">
          Send Email
        </button>
      </form>

      <div class="apparatus-footer-links">
        <p>Remember your password? <a href="/auth/login" id="apparatus-to-login">Sign In</a></p>
      </div>
    `;

    // Fallback SVG icon
    const icons = card.querySelectorAll('.input-icon');
    if (icons[0]) icons[0].innerHTML = userSvg;

    // Handle Back to Login click
    const loginLink = document.getElementById('apparatus-to-login');
    if (loginLink) {
      loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        history.pushState(null, '', '/auth/login');
        renderLoginMode();
      });
    }

    // Handle Forgot Password Submit
    const form = document.getElementById('apparatus-forgot-form');
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const emailVal = document.getElementById('apparatus-email-field').value.trim();
        const msgBox = document.getElementById('apparatus-forgot-msg');
        const sendBtn = document.getElementById('apparatus-send-email-btn');

        if (!emailVal) {
          showToast('error', 'Missing Information', 'Please enter your account username or email.');
          return;
        }

        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending Email...';
        if (msgBox) {
          msgBox.style.display = 'none';
          msgBox.className = '';
          msgBox.textContent = '';
        }

        // Bridge to native Pterodactyl Forgot Password Form in #app if present
        const pteroForm = document.querySelector('#app form');
        const pteroEmail = pteroForm ? pteroForm.querySelector('input[name="email"], input[type="email"], input[type="text"]') : null;
        const pteroSubmit = pteroForm ? pteroForm.querySelector('button[type="submit"]') : null;

        if (pteroEmail && pteroSubmit) {
          setReactValue(pteroEmail, emailVal);
          pteroSubmit.click();
        }

        // Direct API Request to /auth/password
        try {
          const token = getCsrfToken();
          const resp = await fetch('/auth/password', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': token,
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ email: emailVal })
          });

          const data = await resp.json();

          if (resp.ok) {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send Email';

            const successText = data.status || 'We have emailed your password reset link!';
            showToast('success', 'Email Sent!', successText);

            if (msgBox) {
              msgBox.className = 'login-success';
              msgBox.textContent = successText;
              msgBox.style.display = 'block';
            }
          } else {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send Email';

            let errorDetail = 'We cannot find an account with that email or username.';
            let errorTitle = 'Account Not Found';

            if (resp.status === 404 || resp.status === 422) {
              errorTitle = 'Account Not Found';
              errorDetail = 'We cannot find an account with that email or username.';
            } else if (resp.status === 429) {
              errorTitle = 'Too Many Attempts';
              errorDetail = 'Too many password reset attempts. Please wait a few moments.';
            } else if (data.errors && data.errors[0] && data.errors[0].detail) {
              errorDetail = data.errors[0].detail;
            } else if (data.status) {
              errorDetail = data.status;
            }

            showToast('error', errorTitle, errorDetail);

            if (msgBox) {
              msgBox.className = 'login-error';
              msgBox.textContent = errorDetail;
              msgBox.style.display = 'block';
            }
          }
        } catch (err) {
          sendBtn.disabled = false;
          sendBtn.textContent = 'Send Email';
          const netMsg = 'Network error communicating with panel.';
          showToast('error', 'Error', netMsg);
          if (msgBox) {
            msgBox.className = 'login-error';
            msgBox.textContent = netMsg;
            msgBox.style.display = 'block';
          }
        }
      });
    }
  }

  // ----------------------------------------------------------------------------
  // VIEW 3: SET NEW PASSWORD MODE (/auth/password/reset/{token})
  // ----------------------------------------------------------------------------
  function renderResetMode() {
    const card = document.getElementById('apparatus-card-slot');
    if (!card) return;

    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.visibility = 'visible';

    card.innerHTML = `
      <h2 class="login-title">ArixByte Login</h2>
      <p class="login-subtitle">Set New Password</p>
      
      <form class="login-form" id="apparatus-reset-form" autocomplete="on">
        <div id="apparatus-reset-msg" style="display: none;"></div>

        <div class="input-group">
          <span class="input-icon"><i class="ri-mail-line"></i></span>
          <input 
            type="email" 
            id="apparatus-reset-email"
            required 
            placeholder="Account Email Address" 
            class="login-input" 
            autocomplete="email"
          />
        </div>

        <div class="input-group">
          <span class="input-icon"><i class="ri-lock-line"></i></span>
          <input 
            type="password" 
            id="apparatus-new-password"
            required 
            placeholder="New Password" 
            class="login-input" 
            autocomplete="new-password"
          />
        </div>

        <div class="input-group">
          <span class="input-icon"><i class="ri-lock-line"></i></span>
          <input 
            type="password" 
            id="apparatus-confirm-password"
            required 
            placeholder="Confirm New Password" 
            class="login-input" 
            autocomplete="new-password"
          />
        </div>

        <button type="submit" id="apparatus-reset-submit-btn" class="login-button">
          Reset Password
        </button>
      </form>

      <div class="apparatus-footer-links">
        <p>Return to <a href="/auth/login" id="apparatus-to-login-from-reset">Sign In</a></p>
      </div>
    `;

    // Fallback SVG icons
    const icons = card.querySelectorAll('.input-icon');
    if (icons[0]) icons[0].innerHTML = mailSvg;
    if (icons[1]) icons[1].innerHTML = lockSvg;
    if (icons[2]) icons[2].innerHTML = lockSvg;

    const loginLink = document.getElementById('apparatus-to-login-from-reset');
    if (loginLink) {
      loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        history.pushState(null, '', '/auth/login');
        renderLoginMode();
      });
    }

    const form = document.getElementById('apparatus-reset-form');
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('apparatus-reset-email').value.trim();
        const password = document.getElementById('apparatus-new-password').value;
        const confirmPassword = document.getElementById('apparatus-confirm-password').value;
        const msgBox = document.getElementById('apparatus-reset-msg');
        const submitBtn = document.getElementById('apparatus-reset-submit-btn');

        if (password !== confirmPassword) {
          showToast('error', 'Passwords Do Not Match', 'Please make sure both passwords match.');
          return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Updating Password...';

        // Extract token from path: /auth/password/reset/{token}
        const pathParts = window.location.pathname.split('/');
        const token = pathParts[pathParts.length - 1] || '';

        try {
          const csrf = getCsrfToken();
          const resp = await fetch('/auth/password/reset', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': csrf,
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({
              email: email,
              password: password,
              password_confirmation: confirmPassword,
              token: token
            })
          });

          const data = await resp.json();

          if (resp.ok) {
            showToast('success', 'Password Reset!', 'Your password has been reset. Redirecting to login...');
            setTimeout(function () {
              window.location.href = '/auth/login';
            }, 1200);
          } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Reset Password';
            const detail = (data.errors && data.errors[0] && data.errors[0].detail) || data.status || 'Failed to reset password.';
            showToast('error', 'Reset Failed', detail);
            if (msgBox) {
              msgBox.className = 'login-error';
              msgBox.textContent = detail;
              msgBox.style.display = 'block';
            }
          }
        } catch (err) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Reset Password';
          const netMsg = 'Network error updating password.';
          showToast('error', 'Error', netMsg);
          if (msgBox) {
            msgBox.className = 'login-error';
            msgBox.textContent = netMsg;
            msgBox.style.display = 'block';
          }
        }
      });
    }
  }

  // ----------------------------------------------------------------------------
  // GSAP PARALLAX & CINEMATIC INTRO ANIMATION
  // ----------------------------------------------------------------------------
  function setupParallax() {
    if (typeof gsap === 'undefined') {
      setTimeout(setupParallax, 100);
      return;
    }

    gsap.set(".desert-wrapper", { backgroundColor: "#F7ABAE" });
    gsap.set(".parallax-container", { scale: 1, opacity: 1, visibility: "visible" });
    gsap.set(".login-card", { autoAlpha: 1, opacity: 1, y: 0, visibility: "visible" });

    const slot = document.getElementById('apparatus-card-slot');
    if (slot) {
      slot.style.display = isAuthPage() ? 'block' : 'none';
      if (isAuthPage()) {
        slot.style.opacity = '1';
        slot.style.visibility = 'visible';
      }
    }

    // Continuous floating wave motion on layers
    const layers = [1, 2, 3, 4, 5, 6, 7];
    layers.forEach(function (layerNum) {
      gsap.to('.layer-' + layerNum, {
        y: -10 - layerNum * 5,
        duration: 3 + layerNum * 0.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    });

    gsap.to('.layer-text', {
      y: -20,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // Mouse parallax tracking
    window.addEventListener('mousemove', function (e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      layers.forEach(function (layerNum) {
        const depth = layerNum * 10;
        gsap.to('.layer-' + layerNum, {
          x: -x * depth,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      gsap.to('.layer-text', {
        x: -x * 30,
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  }

  // Initialize and Handle Navigation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApparatus);
  } else {
    initApparatus();
  }

  
  // Dynamic cleanup observer for Pterodactyl DOM updates
  const apparatusObserver = new MutationObserver(function () {
    if (!isAuthPage()) {
      cleanPterodactylElements();
    }
  });
  apparatusObserver.observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener('popstate', initApparatus);
  window.addEventListener('hashchange', applyViewMode);
  const origPushState = history.pushState;
  if (origPushState) {
    history.pushState = function () {
      origPushState.apply(this, arguments);
      setTimeout(initApparatus, 20);
    };
  }
})();
