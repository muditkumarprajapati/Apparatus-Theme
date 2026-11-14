/**
 * APPARATUS THEME - JTG 1:1 REPLICA CONTROLLER
 * Full Desert Sunset Parallax, Glassmorphism Login Card & Forgot Password System
 */
(function () {
  'use strict';

  function isAuthPage() {
    return window.location.pathname.startsWith('/auth') || 
           window.location.pathname === '/login' ||
           document.querySelector('form') !== null;
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

  function initApparatus() {
    if (!isAuthPage()) {
      const existing = document.getElementById('apparatus-desert-wrapper');
      if (existing) existing.remove();
      return;
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

      document.body.appendChild(wrapper);
      setupParallax();
    }

    // Determine initial view mode based on URL
    const path = window.location.pathname;
    if (path.startsWith('/auth/password/reset')) {
      renderResetMode();
    } else if (path.startsWith('/auth/password')) {
      renderForgotMode();
    } else {
      renderLoginMode();
    }
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
  // GSAP PARALLAX ANIMATION
  // ----------------------------------------------------------------------------
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

  // Initialize and Handle Navigation
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
      setTimeout(initApparatus, 20);
    };
  }
})();
