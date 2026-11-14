/**
 * APPARATUS THEME - JTG 1:1 REPLICA CONTROLLER
 * Full Desert Sunset Parallax & Glassmorphism Login Card
 */
(function () {
  'use strict';

  function isAuthPage() {
    return window.location.pathname.startsWith('/auth') || 
           window.location.pathname === '/login' ||
           document.querySelector('form[action*="login"]') !== null;
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

  function initApparatus() {
    if (!isAuthPage()) {
      const existing = document.getElementById('apparatus-desert-wrapper');
      if (existing) existing.remove();
      return;
    }

    if (document.getElementById('apparatus-desert-wrapper')) return;

    // Create Desert Sunset Wrapper
    const wrapper = document.createElement('div');
    wrapper.id = 'apparatus-desert-wrapper';
    wrapper.className = 'desert-wrapper';

    const userSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
    const lockSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';

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

      <div class="login-card" id="apparatus-login-card">
        <h2 class="login-title">ArixByte Login</h2>
        <p class="login-subtitle">Welcome to ArixByte Panel</p>
        
        <form class="login-form" id="apparatus-login-form" autocomplete="on">
          <div id="apparatus-login-error" class="login-error" style="display: none;"></div>

          <div class="input-group">
            <span class="input-icon">
              <i class="ri-user-line"></i>
            </span>
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
            <span class="input-icon">
              <i class="ri-lock-line"></i>
            </span>
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
          <p>Forgot Password? <a href="/auth/password">Click Here</a></p>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);

    // Fallback SVG icons
    const iconSpans = wrapper.querySelectorAll('.input-icon');
    if (iconSpans[0]) iconSpans[0].innerHTML = userSvg;
    if (iconSpans[1]) iconSpans[1].innerHTML = lockSvg;

    // React synthetic input dispatcher helper
    function setReactValue(input, val) {
      if (!input) return;
      const lastVal = input.value;
      input.value = val;
      const tracker = input._valueTracker;
      if (tracker) tracker.setValue(lastVal);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Connect form submission
    const loginForm = document.getElementById('apparatus-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async function (e) {
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

        // 1. Try filling Pterodactyl React Formik inputs if present in #app
        const pteroForm = document.querySelector('#app form');
        const pteroUser = pteroForm ? (pteroForm.querySelector('input[name="username"]') || pteroForm.querySelector('input[type="text"]')) : null;
        const pteroPass = pteroForm ? (pteroForm.querySelector('input[name="password"]') || pteroForm.querySelector('input[type="password"]')) : null;
        const pteroSubmit = pteroForm ? pteroForm.querySelector('button[type="submit"]') : null;

        if (pteroUser && pteroPass && pteroSubmit) {
          setReactValue(pteroUser, userVal);
          setReactValue(pteroPass, passVal);
          pteroSubmit.click();
        }

        // 2. Perform direct API authentication with CSRF token
        try {
          const metaCsrf = document.querySelector('meta[name="csrf-token"]');
          const token = metaCsrf ? metaCsrf.getAttribute('content') : '';

          // Check if reCAPTCHA token is required
          let recaptchaToken = null;
          if (window.grecaptcha && window.SiteConfiguration && window.SiteConfiguration.recaptcha && window.SiteConfiguration.recaptcha.enabled) {
            try {
              recaptchaToken = await new Promise(function(resolve) {
                window.grecaptcha.ready(function() {
                  window.grecaptcha.execute(window.SiteConfiguration.recaptcha.siteKey, { action: 'login' })
                    .then(resolve)
                    .catch(function() { resolve(null); });
                });
                setTimeout(function() { resolve(null); }, 1200);
              });
            } catch(e) {
              recaptchaToken = null;
            }
          }

          const payload = {
            user: userVal,
            password: passVal
          };
          if (recaptchaToken) {
            payload.recaptcha_token = recaptchaToken;
          }

          const resp = await fetch('/auth/login', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': token,
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(payload)
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
              errorDetail = 'Panel error: reCAPTCHA quota exceeded or server misconfigured.';
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

    // Parallax GSAP Floating & Mouse Movement
    function setupParallax() {
      if (typeof gsap === 'undefined') {
        setTimeout(setupParallax, 100);
        return;
      }

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

    setupParallax();
  }

  // Handle Initial Load and SPA Transitions
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApparatus);
  } else {
    initApparatus();
  }

  window.addEventListener('popstate', initApparatus);
  const origPushState = history.pushState;
  if (origPushState) {
    history.pushState = function () {
      origPushState.apply(this, arguments);
      setTimeout(initApparatus, 50);
    };
  }
})();
