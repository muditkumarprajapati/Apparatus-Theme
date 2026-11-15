/**
 * APPARATUS THEME - JTG 1:1 REPLICA CONTROLLER
 * Full Desert Sunset Parallax, Glassmorphism Login Card & Forgot Password System
 */
(function () {
  'use strict';

  // Inject instant global CSS to permanently hide Pterodactyl progress bar / cyan glowing line
  (function injectInstantProgressBarKiller() {
    if (document.getElementById('apparatus-kill-progressbar')) return;
    const s = document.createElement('style');
    s.id = 'apparatus-kill-progressbar';
    s.textContent = `
      div[class*="ProgressBar"],
      div[class*="ProgressBar__BarFill"],
      div[class*="ProgressBar___StyledDiv"],
      .sc-14ayc3f-0,
      .sc-14ayc3f-1,
      [class*="sc-14ayc3f"],
      div[style*="hsl(178"],
      div[style*="211, 238"],
      div[style*="height: 2px"],
      div[style*="height:2px"] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        min-height: 0 !important;
        max-height: 0 !important;
        width: 0 !important;
        opacity: 0 !important;
        box-shadow: none !important;
        pointer-events: none !important;
        position: absolute !important;
        top: -99999px !important;
        left: -99999px !important;
      }
    `;
    (document.head || document.documentElement).appendChild(s);
  })();

  function isAuthPage() {
    return window.location.pathname.startsWith('/auth') || 
           window.location.pathname === '/login';
  }

  function isUnauthorizedAdminAttempt() {
    const rawPath = window.location.pathname || '';
    if (!rawPath.startsWith('/admin')) return false;

    // Check if this is the legitimate Pterodactyl Admin Panel
    if (document.querySelector('.main-sidebar') || document.querySelector('.content-wrapper') || document.body.classList.contains('skin-blue')) {
      return false;
    }

    const user = window.PterodactylUser;
    if (user && user.root_admin) {
      return false;
    }

    return true;
  }

  // Toast / Popup Notification System
  function showToast(type, title, message) {
    const existing = document.getElementById('apparatus-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'apparatus-toast';
    toast.className = 'apparatus-toast apparatus-toast-' + type;

    let iconSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    if (type === 'success') {
      iconSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    }

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

    const dismissMs = type === 'success' ? 4000 : 5000;
    setTimeout(function () {
      toast.classList.remove('apparatus-toast-show');
      setTimeout(function () { toast.remove(); }, 400);
    }, dismissMs);
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


  // Accurate Active Sidebar Route Highlighting
  function updateActiveSidebarLinks() {
    const rawPath = window.location.pathname || '/';
    // Normalize path by stripping trailing slash (unless root '/')
    const currentPath = (rawPath.length > 1 && rawPath.endsWith('/')) ? rawPath.slice(0, -1) : rawPath;

    const isResourceTab = window.location.hash === '#resource' || currentPath === '/billing/resource' || currentPath === '/resource';
    const isVpsTab = !isResourceTab && (currentPath === '/vps' || currentPath.startsWith('/vps/') || window.location.hash === '#vps');
    const isServerTab = !isResourceTab && !isVpsTab && (currentPath === '/servers' || currentPath.startsWith('/servers/') || window.location.hash === '#servers');
    const isDashboardTab = !isResourceTab && !isVpsTab && !isServerTab && (currentPath === '/' || currentPath === '/dashboard');

    const links = document.querySelectorAll('.apparatus-nav-link[data-path], .apparatus-nav-link[data-tab]');
    links.forEach(function (link) {
      const tab = link.getAttribute('data-tab');
      const pAttr = link.getAttribute('data-path');
      const p = pAttr ? ((pAttr.length > 1 && pAttr.endsWith('/')) ? pAttr.slice(0, -1) : pAttr) : '';

      let isActive = false;

      if (tab === 'resource' || p === '/billing/resource' || p === '/resource') {
        isActive = isResourceTab;
      } else if (tab === 'dashboard' || p === '/') {
        isActive = isDashboardTab;
      } else if (tab === 'servers' || p === '/servers') {
        isActive = isServerTab;
      } else if (tab === 'vps' || p === '/vps') {
        isActive = isVpsTab;
      } else if (p === '/account') {
        // Account Credentials should ONLY be active on exact /account, NOT on /account/api, /account/ssh, etc.
        isActive = currentPath === '/account';
      } else if (p) {
        // Sub-routes such as /account/api, /account/ssh, /account/activity, /admin
        isActive = currentPath === p || currentPath.startsWith(p + '/');
      }

      if (isActive) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function applyViewMode() {
    if (isAuthPage() || isUnauthorizedAdminAttempt()) return;

    const rawPath = window.location.pathname || '/';
    const currentPath = (rawPath.length > 1 && rawPath.endsWith('/')) ? rawPath.slice(0, -1) : rawPath;

    const isResourceTab = window.location.hash === '#resource' || currentPath === '/billing/resource' || currentPath === '/resource';
    const isVpsTab = !isResourceTab && (currentPath === '/vps' || currentPath.startsWith('/vps/') || window.location.hash === '#vps');
    const isServerTab = !isResourceTab && !isVpsTab && (currentPath === '/servers' || currentPath.startsWith('/servers/') || window.location.hash === '#servers');
    const isDashboardTab = !isResourceTab && !isVpsTab && !isServerTab && (currentPath === '/' || currentPath === '/dashboard');
    const isHomeRoute = isDashboardTab || isServerTab || isVpsTab;

    const hero = document.getElementById('apparatus-dashboard-view');
    const resView = document.getElementById('apparatus-resource-view');

    if (isResourceTab) {
      if (hero) hero.style.display = 'none';
      if (resView) {
        resView.style.display = 'block';
        if (typeof renderResourcePage === 'function') renderResourcePage();
      }
      document.body.classList.add('apparatus-page-resource');
      document.body.classList.remove('apparatus-page-dashboard', 'apparatus-page-servers', 'apparatus-page-vps');

      // Hide all account containers and native server messages
      document.querySelectorAll('div[class*="AccountOverviewContainer"], div[class*="AccountApiContainer"], div[class*="AccountSSHContainer"], div[class*="ActivityLogContainer"], .sc-12to0iy-1, .sc-1c4s3nm-0, .sc-yksipt-0, p[class*="DashboardContainer"], .sc-1topkxf-3').forEach(function (el) {
        el.style.setProperty('display', 'none', 'important');
      });
    } else if (isHomeRoute) {
      if (resView) resView.style.display = 'none';
      if (hero) hero.style.display = 'block';
      document.body.classList.remove('apparatus-page-resource');

      const sPane = document.getElementById('apparatus-pane-servers');
      const vPane = document.getElementById('apparatus-pane-vps');
      const sBtn = document.getElementById('apparatus-tab-btn-servers');
      const vBtn = document.getElementById('apparatus-tab-btn-vps');
      const deployBtn = document.getElementById('apparatus-hub-deploy-btn');

      if (isServerTab) {
        document.body.classList.add('apparatus-page-servers');
        document.body.classList.remove('apparatus-page-dashboard', 'apparatus-page-vps');
        if (sPane) sPane.style.display = 'block';
        if (vPane) vPane.style.display = 'none';
        if (sBtn) sBtn.classList.add('active');
        if (vBtn) vBtn.classList.remove('active');
        if (deployBtn) {
          deployBtn.innerHTML = '<i class="ri-add-line"></i> Deploy Server';
        }
      } else if (isVpsTab) {
        document.body.classList.add('apparatus-page-vps');
        document.body.classList.remove('apparatus-page-dashboard', 'apparatus-page-servers');
        if (sPane) sPane.style.display = 'none';
        if (vPane) vPane.style.display = 'block';
        if (sBtn) sBtn.classList.remove('active');
        if (vBtn) vBtn.classList.add('active');
        if (deployBtn) {
          deployBtn.innerHTML = '<i class="ri-add-line"></i> Deploy Cloud VPS';
        }
      } else {
        document.body.classList.add('apparatus-page-dashboard');
        document.body.classList.remove('apparatus-page-servers', 'apparatus-page-vps');
      }

      // Hide all account containers and native server messages if user transitioned to home
      document.querySelectorAll('div[class*="AccountOverviewContainer"], div[class*="AccountApiContainer"], div[class*="AccountSSHContainer"], div[class*="ActivityLogContainer"], .sc-12to0iy-1, .sc-1c4s3nm-0, .sc-yksipt-0, p[class*="DashboardContainer"], .sc-1topkxf-3').forEach(function (el) {
        el.style.setProperty('display', 'none', 'important');
      });
    } else {
      if (resView) resView.style.display = 'none';
      if (hero) hero.style.display = 'none';
      document.body.classList.remove('apparatus-page-resource', 'apparatus-page-dashboard', 'apparatus-page-servers', 'apparatus-page-vps', 'apparatus-view-dashboard', 'apparatus-view-servers', 'apparatus-view-vps');

      // Restore display for account containers when on account routes
      document.querySelectorAll('div[class*="AccountOverviewContainer"], div[class*="AccountApiContainer"], div[class*="AccountSSHContainer"], div[class*="ActivityLogContainer"], .sc-12to0iy-1, .sc-1c4s3nm-0, .sc-yksipt-0, div.bg-gray-700, [class*="PageContentBlock"]').forEach(function (el) {
        el.style.removeProperty('display');
        el.style.removeProperty('visibility');
        el.style.removeProperty('height');
      });
    }

    updateActiveSidebarLinks();
    cleanPterodactylElements();
  }

  function cleanPterodactylElements() {
    if (isAuthPage() || isUnauthorizedAdminAttempt()) return;

    // 0. Completely remove native progress bar / cyan glowing line
    const progressSelectors = [
      'div[class*="ProgressBar"]',
      'div[class*="ProgressBar__BarFill"]',
      'div[class*="ProgressBar___StyledDiv"]',
      '.sc-14ayc3f-0',
      '.sc-14ayc3f-1',
      '[class*="sc-14ayc3f"]',
      'div[style*="hsl(178"]',
      'div[style*="211, 238"]',
      'div[style*="height: 2px"]',
      'div[style*="height:2px"]'
    ];
    document.querySelectorAll(progressSelectors.join(',')).forEach(function (el) {
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
      el.style.setProperty('height', '0', 'important');
      el.style.setProperty('min-height', '0', 'important');
      el.style.setProperty('max-height', '0', 'important');
      el.style.setProperty('box-shadow', 'none', 'important');
      el.style.setProperty('opacity', '0', 'important');
      el.style.setProperty('position', 'absolute', 'important');
      el.style.setProperty('top', '-99999px', 'important');
      el.style.setProperty('pointer-events', 'none', 'important');
    });

    // 1. Hide native top navigation bar & SubNavigation completely
    const navSelectors = [
      'nav',
      'header',
      '[role="navigation"]',
      '[class*="NavigationBar"]',
      'div[class*="NavigationBar___StyledDiv"]',
      '#SubNavigation',
      '[id="SubNavigation"]',
      'div#SubNavigation',
      'div[id*="SubNavigation"]',
      'nav#SubNavigation',
      'div[class*="SubNavigation"]',
      'nav[class*="SubNavigation"]',
      '[class*="SubNavigation"]'
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
      if (el.id === 'SubNavigation' || el.matches('[class*="SubNavigation"]') || el.closest('[class*="SubNavigation"], #SubNavigation')) {
        try { el.remove(); } catch(e) {}
      }
    });

    // 2. Hide top bar inside #app if rendered without standard nav tag
    const app = document.getElementById('app');
    if (app) {
      const topDivs = app.querySelectorAll('& > div > div, & > div > header, & > div > nav');
      topDivs.forEach(function (el) {
        if (
          el.classList.contains('apparatus-sidebar') ||
          el.id === 'apparatus-dashboard-view' ||
          el.matches('[class*="DashboardContainer"], main') ||
          el.closest('[class*="DashboardContainer"]')
        ) {
          return;
        }
        if (
          el.querySelector('a[href="/admin"]') ||
          el.querySelector('button[aria-label="Search"]') ||
          el.matches('[class*="NavigationBar"]') ||
          el.querySelector('[class*="NavigationBar"]') ||
          el.matches('[class*="SubNavigation"]') ||
          el.querySelector('[class*="SubNavigation"]') ||
          el.id === 'SubNavigation' ||
          el.querySelector('#SubNavigation')
        ) {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
          el.style.setProperty('height', '0', 'important');
          el.style.setProperty('margin', '0', 'important');
          el.style.setProperty('padding', '0', 'important');
          el.style.setProperty('border', 'none', 'important');
          try { el.remove(); } catch(e) {}
        }
      });
    }

    // 3. Remove Pterodactyl and Blueprint footers & copyright completely
    document.querySelectorAll('a[href*="pterodactyl.io"], a[href*="blueprint.zip"]').forEach(function (a) {
      const container = a.closest('p, footer, div[class*="ContentContainer"], div');
      if (container && !container.classList.contains('apparatus-sidebar') && !container.closest('.apparatus-sidebar')) {
        container.style.setProperty('display', 'none', 'important');
        try { container.remove(); } catch (e) {}
      } else {
        try { a.remove(); } catch (e) {}
      }
    });

    document.querySelectorAll('footer, [class*="Blueprint"], [class*="Footer"], p, div[class*="ContentContainer"]').forEach(function (el) {
      if (el.classList.contains('apparatus-sidebar') || el.closest('.apparatus-sidebar')) return;
      const text = (el.textContent || '').trim();
      if (
        (text.includes('Blueprint') && text.includes('©')) ||
        (text.includes('Pterodactyl') && text.includes('©')) ||
        text.includes('Pterodactyl®') ||
        text.includes('2015 - 2026') ||
        text.includes('2023 - 2026') ||
        text.includes('blueprint.zip')
      ) {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
        el.style.setProperty('height', '0', 'important');
        try { el.remove(); } catch (e) {}
      }
    });

    // 4. Proper Transparency & Styling for ContentBox cards (.sc-mjlt6f-2) across /account, /account/api, /account/ssh
    const contentCards = document.querySelectorAll('.sc-mjlt6f-2, [class*="sc-mjlt6f-2"], div[class*="ContentBox___StyledDiv"]');
    contentCards.forEach(function (card) {
      card.style.setProperty('background', 'rgba(26, 16, 38, 0.28)', 'important');
      card.style.setProperty('backdrop-filter', 'blur(20px) saturate(180%)', 'important');
      card.style.setProperty('-webkit-backdrop-filter', 'blur(20px) saturate(180%)', 'important');
      card.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.18)', 'important');
      card.style.setProperty('border-radius', '16px', 'important');
      card.style.setProperty('box-shadow', '0 16px 40px 0 rgba(0, 0, 0, 0.22), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)', 'important');
      if (card.parentElement && !card.parentElement.style.height) {
        card.parentElement.style.display = 'flex';
        card.parentElement.style.flexDirection = 'column';
        card.style.flex = '1 1 auto';
      }
    });

    // Strip borders, backgrounds and shadows from any transition/fade wrappers inside cards ONLY
    document.querySelectorAll('.sc-mjlt6f-2 [class*="Fade"], .sc-mjlt6f-2 [class*="sc-1p0gm8n"], .sc-mjlt6f-2 div[class*="Fade__Container"]').forEach(function (fade) {
      fade.style.setProperty('border', 'none', 'important');
      fade.style.setProperty('background', 'transparent', 'important');
      fade.style.setProperty('box-shadow', 'none', 'important');
      if (!fade.textContent || !fade.textContent.trim()) {
        fade.style.setProperty('display', 'none', 'important');
        fade.style.setProperty('height', '0', 'important');
        fade.style.setProperty('min-height', '0', 'important');
        fade.style.setProperty('margin', '0', 'important');
        fade.style.setProperty('padding', '0', 'important');
      }
    });

    // 4b. Hide native Pterodactyl empty server messages and dashboard leaks on Dashboard and Servers tabs
    const rawP = window.location.pathname || '/';
    const curP = (rawP.length > 1 && rawP.endsWith('/')) ? rawP.slice(0, -1) : rawP;
    const isSrv = curP === '/servers' || curP.startsWith('/servers/') || window.location.hash === '#servers';
    const isVps = curP === '/vps' || curP.startsWith('/vps/') || window.location.hash === '#vps';
    const isDash = (curP === '/' || curP === '/dashboard') && !isSrv && !isVps;
    if (isDash || isSrv || isVps) {
      document.querySelectorAll('p[class*="DashboardContainer"], .sc-1topkxf-3, div[class*="AccountOverviewContainer"], div[class*="AccountApiContainer"], div[class*="AccountSSHContainer"], div[class*="ActivityLogContainer"], .sc-12to0iy-1, .sc-1c4s3nm-0, .sc-yksipt-0').forEach(function (el) {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
        el.style.setProperty('height', '0', 'important');
      });
      document.querySelectorAll('p').forEach(function (p) {
        if (p.textContent && p.textContent.includes('There are no servers associated with your account')) {
          p.style.setProperty('display', 'none', 'important');
          p.style.setProperty('visibility', 'hidden', 'important');
          p.style.setProperty('height', '0', 'important');
        }
      });
    }

    // 5. Ensure inputs and textareas on account pages are properly translucent
    document.querySelectorAll('.sc-19rce1w-0, .sc-19rce1w-1, .sc-lcvdq4-0, .sc-plts88-0').forEach(function (inp) {
      inp.style.setProperty('background', 'rgba(0, 0, 0, 0.2)', 'important');
      inp.style.setProperty('backdrop-filter', 'blur(8px)', 'important');
      inp.style.setProperty('-webkit-backdrop-filter', 'blur(8px)', 'important');
      inp.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.16)', 'important');
      inp.style.setProperty('border-radius', '10px', 'important');
      inp.style.setProperty('color', '#ffffff', 'important');
    });

    // 6. Ensure action buttons on account cards have Apparatus pink gradient
    document.querySelectorAll('.sc-mjlt6f-2 button:not([class*="secondary"]):not([class*="danger"]):not([class*="ghost"])').forEach(function (btn) {
      btn.style.setProperty('background', 'linear-gradient(135deg, #ec4899, #db2777)', 'important');
      btn.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.2)', 'important');
      btn.style.setProperty('color', '#ffffff', 'important');
      btn.style.setProperty('border-radius', '10px', 'important');
      btn.style.setProperty('box-shadow', '0 4px 15px rgba(236, 72, 153, 0.35)', 'important');
    });

    // 7. Ensure "Recent Activity" header text is present above the activity card on /account/activity
    const rawPathname = window.location.pathname || '';
    if (rawPathname.startsWith('/account/activity')) {
      const actCard = document.querySelector('.bg-gray-700');
      if (actCard && !document.getElementById('apparatus-activity-header')) {
        const header = document.createElement('h2');
        header.id = 'apparatus-activity-header';
        header.className = 'apparatus-section-title';
        header.innerHTML = '<i class="ri-history-line" style="color: #ffffff;"></i> Recent Activity';
        if (actCard.parentElement) {
          actCard.parentElement.insertBefore(header, actCard);
        }
      }

      // 8. Enhance Activity Log IP addresses with Flag, Blur, and Clickable Location Lookup
      enhanceActivityLogIps();
      enhanceActivityLogBadges();
    } else {
      const existingHeader = document.getElementById('apparatus-activity-header');
      if (existingHeader) existingHeader.remove();
    }
  }

  // Activity Log IP Country & Flag enhancement
  const ipCountryCache = new Map();

  function isPrivateIp(ip) {
    if (!ip) return true;
    ip = ip.trim();
    return ip === '127.0.0.1' || ip === 'localhost' || ip === '::1' ||
      /^10\./.test(ip) ||
      /^192\.168\./.test(ip) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip) ||
      /^fc00:/.test(ip) ||
      /^fe80:/.test(ip);
  }

  async function resolveIpCountry(ip, imgEl) {
    if (!ip || isPrivateIp(ip)) return;
    if (ipCountryCache.has(ip)) {
      const code = ipCountryCache.get(ip);
      if (code && imgEl) {
        imgEl.src = 'https://flagcdn.com/20x15/' + code + '.png';
        imgEl.style.display = 'inline-block';
        imgEl.title = code.toUpperCase();
      }
      return;
    }
    try {
      const cached = localStorage.getItem('apparatus_geo_' + ip);
      if (cached) {
        ipCountryCache.set(ip, cached);
        if (imgEl) {
          imgEl.src = 'https://flagcdn.com/20x15/' + cached + '.png';
          imgEl.style.display = 'inline-block';
          imgEl.title = cached.toUpperCase();
        }
        return;
      }
    } catch (e) {}

    try {
      const res = await fetch('https://api.country.is/' + ip);
      if (res.ok) {
        const data = await res.json();
        if (data && data.country) {
          const code = data.country.toLowerCase();
          ipCountryCache.set(ip, code);
          try { localStorage.setItem('apparatus_geo_' + ip, code); } catch (e) {}
          if (imgEl) {
            imgEl.src = 'https://flagcdn.com/20x15/' + code + '.png';
            imgEl.style.display = 'inline-block';
            imgEl.title = code.toUpperCase();
          }
        }
      }
    } catch (e) {}
  }

  // Activity Log IP Blur & Flag enhancement (Clean inline layout, no box badge, no globe icon)
  function enhanceActivityLogIps() {
    const card = document.querySelector('.bg-gray-700');
    if (!card) return;
    const rows = card.children;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.dataset.apparatusIpEnhanced) continue;
      const spans = row.querySelectorAll('span');
      for (let j = 0; j < spans.length; j++) {
        const s = spans[j];
        const text = s.textContent.trim();
        const match = text.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
        if (match && s.childNodes.length > 0) {
          const ip = match[1];
          row.dataset.apparatusIpEnhanced = 'true';

          const lookupUrl = 'https://www.iplocation.net/ip-lookup?query=' + encodeURIComponent(ip);

          const container = document.createElement('a');
          container.href = lookupUrl;
          container.target = '_blank';
          container.rel = 'noopener noreferrer';
          container.className = 'apparatus-ip-container apparatus-ip-link';
          container.title = 'Click to check IP location (' + ip + ')';

          const isLocal = isPrivateIp(ip);
          if (isLocal) {
            const localIcon = document.createElement('i');
            localIcon.className = 'ri-shield-keyhole-line apparatus-ip-local-icon';
            localIcon.title = 'Localhost / Private Network';
            container.appendChild(localIcon);
          } else {
            const flagImg = document.createElement('img');
            flagImg.className = 'apparatus-ip-flag';
            flagImg.alt = 'Country flag';
            flagImg.style.display = 'none';

            flagImg.onload = function () {
              flagImg.style.display = 'inline-block';
            };
            flagImg.onerror = function () {
              flagImg.style.display = 'none';
            };

            container.appendChild(flagImg);
            resolveIpCountry(ip, flagImg);
          }

          const ipSpan = document.createElement('span');
          ipSpan.className = 'apparatus-ip-blurred';
          ipSpan.textContent = ip;
          container.appendChild(ipSpan);

          // Click reveal support
          container.addEventListener('click', function () {
            ipSpan.classList.add('revealed');
          });

          s.innerHTML = '';
          s.appendChild(container);

          const divider = document.createElement('span');
          divider.className = 'apparatus-ip-divider';
          divider.innerHTML = '&bull;';
          s.appendChild(divider);
          break;
        }
      }
    }
  }

  // Activity Log Event Status Circle enhancement (Green circular tick for success, red circular cross for error, etc.)
  function enhanceActivityLogBadges() {
    const actContainer = document.querySelector('div[class*="ActivityLogContainer"]') || document.querySelector('.bg-gray-700');
    if (!actContainer) return;

    const links = actContainer.querySelectorAll('a:not([class*="apparatus-ip"])');
    for (let i = 0; i < links.length; i++) {
      const a = links[i];
      if (a.dataset.apparatusEventEnhanced) continue;

      const raw = (a.textContent || '').trim();
      if (!raw) continue;

      a.dataset.apparatusEventEnhanced = 'true';

      // Clean dash text node right before the badge if present ("mudit — " -> "mudit ")
      if (a.previousSibling && a.previousSibling.nodeType === Node.TEXT_NODE) {
        a.previousSibling.textContent = a.previousSibling.textContent.replace(/\s*[—–-]\s*/g, ' ');
      }

      let icon = 'ri-check-line';
      let title = 'Successful (' + raw + ')';
      let typeClass = 'apparatus-event-circle-success';

      const lower = raw.toLowerCase();
      if (lower.includes('fail') || lower.includes('error') || lower.includes('denied') || lower.includes('delete')) {
        // Red circular cross
        icon = 'ri-close-line';
        title = lower.includes('delete') ? 'Deleted (' + raw + ')' : 'Failed / Error (' + raw + ')';
        typeClass = 'apparatus-event-circle-error';
      } else if (lower.includes('warn') || lower.includes('checkpoint') || lower.includes('password') || lower.includes('recovery')) {
        // Amber circular alert
        icon = 'ri-alert-line';
        title = 'Security Alert (' + raw + ')';
        typeClass = 'apparatus-event-circle-warn';
      } else if (lower.startsWith('server:power') || lower.startsWith('server:console')) {
        // Cyan circular info/power
        icon = lower.includes('stop') ? 'ri-stop-line' : 'ri-play-line';
        title = 'Server Action (' + raw + ')';
        typeClass = 'apparatus-event-circle-info';
      } else {
        // Green circular tick (auth:success, login, verified, created, etc.)
        icon = 'ri-check-line';
        title = 'Success (' + raw + ')';
        typeClass = 'apparatus-event-circle-success';
      }

      a.className = 'apparatus-event-badge ' + typeClass;
      a.title = title;
      a.innerHTML = '<i class="' + icon + '"></i>';
    }
  }

  // Event formatters for Recent Activity
  function formatEventName(event) {
    if (!event) return 'Account Event';
    const map = {
      'auth:success': 'Account Logged In',
      'auth:login': 'Account Logged In',
      'auth:checkpoint': '2FA Verification Passed',
      'auth:password': 'Password Changed',
      'auth:recovery': 'Recovery Code Used',
      'server:console.command': 'Console Command Sent',
      'server:power.start': 'Server Started',
      'server:power.stop': 'Server Stopped',
      'server:power.restart': 'Server Restarted',
      'server:file.upload': 'File Uploaded',
      'server:file.delete': 'File Deleted',
      'server:backup.create': 'Backup Created',
      'server:backup.delete': 'Backup Deleted',
      'account:api-key.create': 'API Key Created',
      'account:api-key.delete': 'API Key Revoked',
      'account:ssh-key.create': 'SSH Key Added',
      'account:ssh-key.delete': 'SSH Key Removed'
    };
    if (map[event]) return map[event];
    return event.replace(/[:._]/g, ' ').replace(/\b\w/g, function (l) { return l.toUpperCase(); });
  }

  function getEventIcon(event) {
    if (!event) return 'ri-pulse-line';
    if (event.includes('login') || event.includes('auth')) return 'ri-login-box-line';
    if (event.includes('command')) return 'ri-terminal-box-line';
    if (event.includes('power')) return 'ri-shut-down-line';
    if (event.includes('file')) return 'ri-folder-line';
    if (event.includes('backup')) return 'ri-archive-line';
    if (event.includes('key')) return 'ri-key-2-line';
    return 'ri-pulse-line';
  }

  function timeAgo(dateString) {
    if (!dateString) return 'Just now';
    const now = new Date();
    const past = new Date(dateString);
    const diffSec = Math.floor((now - past) / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return diffMin + 'm ago';
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return diffHr + 'h ago';
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 30) return diffDay + 'd ago';
    return past.toLocaleDateString();
  }

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  function formatBytesToGB(mb) {
    if (!mb || mb <= 0) return '0.0 GB';
    return (mb / 1024).toFixed(1) + ' GB';
  }

  function initInstanceTabs() {
    const tabServers = document.getElementById('apparatus-tab-btn-servers');
    const tabVps = document.getElementById('apparatus-tab-btn-vps');
    const paneServers = document.getElementById('apparatus-pane-servers');
    const paneVps = document.getElementById('apparatus-pane-vps');
    const deployBtn = document.getElementById('apparatus-hub-deploy-btn');
    const heroVpsBtn = document.getElementById('apparatus-hero-vps-btn');

    function selectTab(target) {
      if (target === 'vps') {
        if (tabVps) tabVps.classList.add('active');
        if (tabServers) tabServers.classList.remove('active');
        if (paneVps) paneVps.style.display = 'block';
        if (paneServers) paneServers.style.display = 'none';
        if (deployBtn) {
          deployBtn.innerHTML = '<i class="ri-add-line"></i> Deploy Cloud VPS';
          deployBtn.onclick = function () { window.open('https://arixbyte.com', '_blank'); };
        }
      } else {
        if (tabServers) tabServers.classList.add('active');
        if (tabVps) tabVps.classList.remove('active');
        if (paneServers) paneServers.style.display = 'block';
        if (paneVps) paneVps.style.display = 'none';
        if (deployBtn) {
          deployBtn.innerHTML = '<i class="ri-add-line"></i> Deploy Server';
          deployBtn.onclick = function () { window.open('https://arixbyte.com', '_blank'); };
        }
      }
    }

    if (tabServers) {
      tabServers.addEventListener('click', function () { selectTab('servers'); });
    }
    if (tabVps) {
      tabVps.addEventListener('click', function () { selectTab('vps'); });
    }
    if (heroVpsBtn) {
      heroVpsBtn.addEventListener('click', function () {
        selectTab('vps');
        const hub = document.getElementById('apparatus-area-4');
        if (hub) hub.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const heroStoreBtn = document.getElementById('apparatus-hero-store-btn');
    if (heroStoreBtn) {
      heroStoreBtn.addEventListener('click', function () {
        const billing = document.getElementById('apparatus-area-billing');
        if (billing) {
          billing.scrollIntoView({ behavior: 'smooth' });
          billing.style.transition = 'box-shadow 0.3s ease';
          billing.style.boxShadow = '0 0 25px rgba(236, 72, 153, 0.45)';
          setTimeout(function () { billing.style.boxShadow = ''; }, 1500);
        } else {
          window.open('https://arixbyte.com', '_blank');
        }
      });
    }

    const vpsRefreshBtn = document.getElementById('apparatus-vps-refresh-btn');
    if (vpsRefreshBtn) {
      vpsRefreshBtn.addEventListener('click', function () {
        showToast('info', 'Cloud VPS Sync', 'Checking active KVM cloud instances...');
        setTimeout(function () {
          showToast('success', 'VPS Synced', '0 active KVM instances found. Deploy one to begin!');
        }, 1000);
      });
    }
  }

  function initDailyReward() {
    const dailyBtn = document.getElementById('apparatus-daily-reward-btn');
    const coinDisplay = document.getElementById('apparatus-coin-count');
    const metricCoins = document.getElementById('apparatus-metric-coins');

    let coins = parseInt(localStorage.getItem('apparatus_coins') || '100', 10);
    if (isNaN(coins) || coins < 0) coins = 100;

    function refreshCoinDisplays() {
      if (coinDisplay) coinDisplay.textContent = coins.toLocaleString();
      if (metricCoins) metricCoins.textContent = coins.toLocaleString();
      const rCoins = document.getElementById('res-coin-count');
      if (rCoins) rCoins.textContent = coins.toLocaleString();
    }
    refreshCoinDisplays();

    if (!dailyBtn) return;

    const ONE_DAY = 24 * 60 * 60 * 1000;
    const lastClaim = localStorage.getItem('apparatus_last_daily_claim');
    const now = Date.now();

    if (lastClaim && (now - parseInt(lastClaim, 10)) < ONE_DAY) {
      const hoursLeft = Math.ceil((ONE_DAY - (now - parseInt(lastClaim, 10))) / (60 * 60 * 1000));
      dailyBtn.disabled = true;
      dailyBtn.innerHTML = '<i class="ri-check-line"></i> Claimed (' + hoursLeft + 'h left)';
      dailyBtn.classList.add('apparatus-btn-disabled');
    }

    dailyBtn.addEventListener('click', function () {
      const curNow = Date.now();
      const curLast = localStorage.getItem('apparatus_last_daily_claim');
      if (curLast && (curNow - parseInt(curLast, 10)) < ONE_DAY) {
        showToast('info', 'Daily Reward', 'Already claimed today! Please check back tomorrow.');
        return;
      }

      coins += 2;
      localStorage.setItem('apparatus_coins', coins.toString());
      localStorage.setItem('apparatus_last_daily_claim', curNow.toString());
      refreshCoinDisplays();

      dailyBtn.disabled = true;
      dailyBtn.innerHTML = '<i class="ri-check-line"></i> Claimed (24h left)';
      dailyBtn.classList.add('apparatus-btn-disabled');
      showToast('success', 'Daily Reward Claimed!', '🎉 +2 Coins added! Your total is now ' + coins + ' 🪙');
    });
  }

  function initBillingActions() {
    const topupBtn = document.getElementById('apparatus-wallet-topup-btn');
    const ribbonTopup = document.getElementById('apparatus-ribbon-topup');

    function openTopupModal() {
      showToast('info', 'INR Wallet Top-Up', 'Redirecting to Instant UPI / NetBanking Gateway...');
      setTimeout(function () {
        window.open('https://arixbyte.com', '_blank');
      }, 1000);
    }

    if (topupBtn) topupBtn.addEventListener('click', openTopupModal);
    if (ribbonTopup) ribbonTopup.addEventListener('click', openTopupModal);

    const upgradePills = document.querySelectorAll('.apparatus-upgrade-pill');
    upgradePills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        const item = pill.dataset.upgrade || 'Resource Addon';
        const price = pill.dataset.price || '₹99';
        showToast('success', 'Order Selected', 'Selected ' + item + ' for ' + price + '/mo. Redirecting to billing...');
        setTimeout(function () {
          window.open('https://arixbyte.com', '_blank');
        }, 1200);
      });
    });
  }

  function getReferralCode(user) {
    const u = (user && user.username) ? user.username : ((window.PterodactylUser && window.PterodactylUser.username) || 'USER');
    const cleanU = u.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const prefix = (cleanU.length >= 3 ? cleanU.slice(0, 4) : cleanU).padEnd(4, 'X');
    const seed = (user && user.email ? user.email : '') + u + (user && user.id ? user.id : '');
    let hash = 5381;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) + hash) + seed.charCodeAt(i);
      hash |= 0;
    }
    const suffix = Math.abs(hash).toString(36).toUpperCase().padStart(4, '0').slice(-4);
    return 'AB-' + prefix + '-' + suffix;
  }

  function initReferralCode() {
    const codeEl = document.getElementById('apparatus-user-ref-code');
    const copyBtn = document.getElementById('apparatus-copy-ref-btn');
    if (!codeEl) return;

    const user = window.PterodactylUser || {};
    const code = getReferralCode(user);
    codeEl.textContent = code;

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        const textToCopy = codeEl.textContent.trim();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy);
        } else {
          const ta = document.createElement('textarea');
          ta.value = textToCopy;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }

        const icon = copyBtn.querySelector('i');
        const span = copyBtn.querySelector('span');
        if (icon) icon.className = 'ri-check-line';
        if (span) span.textContent = 'Copied!';
        copyBtn.classList.add('copied');

        showToast('success', 'Referral Code Copied!', 'Your code ' + textToCopy + ' was copied! Share it to earn 10 Coins per referral.');

        setTimeout(function () {
          if (icon) icon.className = 'ri-file-copy-line';
          if (span) span.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2500);
      });
    }
  }

  function updateResourceGauges(totalRamMB, totalCpuPercent, totalDiskMB) {
    const ramText = document.getElementById('apparatus-gauge-ram-text');
    const ramBar = document.getElementById('apparatus-gauge-ram-bar');
    const cpuText = document.getElementById('apparatus-gauge-cpu-text');
    const cpuBar = document.getElementById('apparatus-gauge-cpu-bar');
    const diskText = document.getElementById('apparatus-gauge-disk-text');
    const diskBar = document.getElementById('apparatus-gauge-disk-bar');

    const ramGB = (totalRamMB / 1024).toFixed(1);
    const diskGB = (totalDiskMB / 1024).toFixed(1);

    if (ramText) ramText.textContent = ramGB + ' GB Allocated';
    if (cpuText) cpuText.textContent = totalCpuPercent + '% Compute';
    if (diskText) diskText.textContent = diskGB + ' GB NVMe';

    // Width percentages for visually pleasing gauges
    const ramPct = Math.min(100, Math.max(8, (totalRamMB / 32768) * 100));
    const cpuPct = Math.min(100, Math.max(8, (totalCpuPercent / 800) * 100));
    const diskPct = Math.min(100, Math.max(8, (totalDiskMB / 102400) * 100));

    if (ramBar) ramBar.style.width = ramPct + '%';
    if (cpuBar) cpuBar.style.width = cpuPct + '%';
    if (diskBar) diskBar.style.width = diskPct + '%';
  }

  // ==============================================================================
  // RESOURCE ALLOCATION DATA STORE (Server & VPS Resources)
  // Default values are 0 / unallocated as requested
  // Admin page can update this structure via window.setApparatusResources(newData)
  // ==============================================================================
  function getApparatusResources() {
    const defaults = {
      server: {
        slots: 0,
        processor: '0',
        ram: '0 MB',
        cpu: '0%',
        disk: '0 GB',
        allocation: 0,
        ports: 0,
        database: 0,
        validity: '0 (after activation of server)'
      },
      vps: {
        slots: 0,
        node: '0',
        ram: '0 GB',
        cpu: '0 vCPU',
        disk: '0 GB'
      }
    };
    try {
      const saved = localStorage.getItem('apparatus_allocated_resources');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          server: Object.assign({}, defaults.server, parsed.server || {}),
          vps: Object.assign({}, defaults.vps, parsed.vps || {})
        };
      }
    } catch (e) {}
    return defaults;
  }
  window.getApparatusResources = getApparatusResources;
  window.setApparatusResources = function (data) {
    try {
      localStorage.setItem('apparatus_allocated_resources', JSON.stringify(data));
      renderResourcePage();
    } catch (e) {}
  };

  function renderResourcePage() {
    const res = getApparatusResources();

    // Overview Ribbon
    const sSlotsVal = document.getElementById('res-val-server-slots');
    if (sSlotsVal) sSlotsVal.textContent = res.server.slots + ' Slots';
    const vSlotsVal = document.getElementById('res-val-vps-slots');
    if (vSlotsVal) vSlotsVal.textContent = res.vps.slots + ' Slots';

    // Server Resources
    const sSlots = document.getElementById('res-server-slots');
    if (sSlots) sSlots.textContent = res.server.slots;
    const sProc = document.getElementById('res-server-processor');
    if (sProc) sProc.textContent = res.server.processor;
    const sRam = document.getElementById('res-server-ram');
    if (sRam) sRam.textContent = res.server.ram;
    const sCpu = document.getElementById('res-server-cpu');
    if (sCpu) sCpu.textContent = res.server.cpu;
    const sDisk = document.getElementById('res-server-disk');
    if (sDisk) sDisk.textContent = res.server.disk;
    const sAlloc = document.getElementById('res-server-allocation');
    if (sAlloc) sAlloc.textContent = res.server.allocation;
    const sPorts = document.getElementById('res-server-ports');
    if (sPorts) sPorts.textContent = res.server.ports;
    const sDb = document.getElementById('res-server-database');
    if (sDb) sDb.textContent = res.server.database;
    const sVal = document.getElementById('res-server-validity');
    if (sVal) sVal.textContent = res.server.validity;

    // VPS Resources
    const vSlots = document.getElementById('res-vps-slots');
    if (vSlots) vSlots.textContent = res.vps.slots;
    const vNode = document.getElementById('res-vps-node');
    if (vNode) vNode.textContent = res.vps.node;
    const vRam = document.getElementById('res-vps-ram');
    if (vRam) vRam.textContent = res.vps.ram;
    const vCpu = document.getElementById('res-vps-cpu');
    if (vCpu) vCpu.textContent = res.vps.cpu;
    const vDisk = document.getElementById('res-vps-disk');
    if (vDisk) vDisk.textContent = res.vps.disk;

    // Coins Balance
    const rCoins = document.getElementById('res-coin-count');
    if (rCoins) {
      const curCoins = parseInt(localStorage.getItem('apparatus_coins') || '100', 10);
      rCoins.textContent = (isNaN(curCoins) ? 100 : curCoins).toLocaleString();
    }

    // Live Gauges Text
    const gRam = document.getElementById('res-gauge-ram-text');
    if (gRam) gRam.textContent = `0 MB / ${res.server.ram} (0%)`;
    const gCpu = document.getElementById('res-gauge-cpu-text');
    if (gCpu) gCpu.textContent = `0% / ${res.server.cpu} In Use`;
    const gDisk = document.getElementById('res-gauge-disk-text');
    if (gDisk) gDisk.textContent = `0 GB / ${res.server.disk} Used`;
    const gPorts = document.getElementById('res-gauge-ports-text');
    if (gPorts) gPorts.textContent = `0 / ${res.server.ports} Assigned`;
  }

  // Load API Data for Dashboard (Servers, Activities, Account Details)
  async function loadDashboardApiData() {
    // 1. Fetch user data if not fully provided
    try {
      const accRes = await fetch('/api/client/account', { headers: { Accept: 'application/json' } });
      if (accRes.ok) {
        const accData = await accRes.json();
        const attr = accData.attributes || accData;
        if (attr.username) {
          const uEl = document.getElementById('apparatus-welcome-username');
          if (uEl) uEl.textContent = attr.username;
          const refEl = document.getElementById('apparatus-user-ref-code');
          if (refEl) refEl.textContent = getReferralCode(attr);
        }
        if (attr.email) {
          const eEl = document.getElementById('apparatus-email-val') || document.getElementById('apparatus-email-real');
          if (eEl) eEl.textContent = attr.email;
        }
        if (attr.admin !== undefined) {
          const isAdmin = !!attr.admin;
          const rEl = document.getElementById('apparatus-stat-role');
          const mRole = document.getElementById('apparatus-metric-role');
          if (rEl) rEl.textContent = isAdmin ? 'Administrator' : 'User';
          if (mRole) mRole.textContent = isAdmin ? 'Administrator' : 'User';

          if (isAdmin) {
            document.body.classList.add('apparatus-is-admin');
          } else {
            document.body.classList.remove('apparatus-is-admin');
            const adminItem = document.querySelector('.apparatus-admin-panel-item');
            if (adminItem) adminItem.remove();
          }
        }
      }
    } catch (e) {}

    // 2. Fetch Servers & aggregate capacity
    try {
      const srvRes = await fetch('/api/client', { headers: { Accept: 'application/json' } });
      const container = document.getElementById('apparatus-servers-list');
      const countBadge = document.getElementById('apparatus-server-badge');
      const ownedStat = document.getElementById('apparatus-stat-servers-owned');

      const mInstances = document.getElementById('apparatus-metric-instances');
      const mInstancesSub = document.getElementById('apparatus-metric-instances-sub');
      const mRam = document.getElementById('apparatus-metric-ram');
      const mCpu = document.getElementById('apparatus-metric-cpu');
      const mDisk = document.getElementById('apparatus-metric-disk');

      if (srvRes.ok) {
        const srvData = await srvRes.json();
        const servers = srvData.data || [];
        const total = (srvData.meta && srvData.meta.pagination && srvData.meta.pagination.total !== undefined)
          ? srvData.meta.pagination.total
          : servers.length;

        if (countBadge) countBadge.textContent = total;
        if (ownedStat) ownedStat.textContent = total;
        if (mInstances) mInstances.textContent = total;
        if (mInstancesSub) mInstancesSub.innerHTML = total + (total === 1 ? ' Server' : ' Servers') + ' &bull; 0 VPS';

        let totalRamMB = 0;
        let totalCpuPercent = 0;
        let totalDiskMB = 0;

        servers.forEach(function (s) {
          const limits = (s.attributes && s.attributes.limits) || {};
          if (typeof limits.memory === 'number') totalRamMB += limits.memory;
          if (typeof limits.cpu === 'number') totalCpuPercent += limits.cpu;
          if (typeof limits.disk === 'number') totalDiskMB += limits.disk;
        });

        if (mRam) mRam.textContent = (totalRamMB / 1024).toFixed(1) + ' GB';
        if (mCpu) mCpu.textContent = totalCpuPercent + '% CPU';
        if (mDisk) mDisk.textContent = (totalDiskMB / 1024).toFixed(1) + ' GB NVMe';

        updateResourceGauges(totalRamMB, totalCpuPercent, totalDiskMB);

        if (servers.length === 0) {
          if (container) {
            container.innerHTML = `
              <div class="apparatus-empty-servers">
                <div class="apparatus-empty-icon"><i class="ri-gamepad-line"></i></div>
                <h4 class="apparatus-empty-title">No Game Servers Active</h4>
                <p class="apparatus-empty-desc">
                  You do not have any active game servers yet. Deploy high-performance Minecraft, Rust, CS2, or bot instances with instant setup.
                </p>
                <div class="apparatus-empty-actions">
                  <a href="https://arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-primary">
                    <i class="ri-add-line"></i> Deploy Server
                  </a>
                  <a href="#resource" class="apparatus-btn apparatus-btn-glass" id="apparatus-empty-view-res-btn">
                    <i class="ri-cpu-line"></i> View Resources
                  </a>
                </div>
              </div>
            `;
          }
        } else {
          if (container) {
            let html = '<div class="apparatus-servers-grid">';
            servers.forEach(function (s) {
              const attr = s.attributes || {};
              const id = attr.identifier || attr.uuid || '';
              const name = attr.name || 'Server';
              const node = attr.node || 'ArixByte Node';
              const mem = attr.limits && attr.limits.memory !== undefined ? (attr.limits.memory === 0 ? 'Unlimited' : attr.limits.memory + ' MB') : 'Standard';
              const cpu = attr.limits && attr.limits.cpu !== undefined ? (attr.limits.cpu === 0 ? 'Unlimited' : attr.limits.cpu + '%') : 'Standard';
              const disk = attr.limits && attr.limits.disk !== undefined ? (attr.limits.disk === 0 ? 'Unlimited' : attr.limits.disk + ' MB') : 'Standard';

              html += `
                <div class="apparatus-server-item">
                  <div class="apparatus-server-main">
                    <div class="apparatus-server-top">
                      <div class="apparatus-server-badge-online">
                        <span class="apparatus-status-dot"></span> Active
                      </div>
                      <span class="apparatus-server-node"><i class="ri-router-line"></i> ${node}</span>
                    </div>
                    <h4 class="apparatus-server-name">${name}</h4>
                    <div class="apparatus-server-stats">
                      <span><i class="ri-cpu-line"></i> ${cpu}</span>
                      <span><i class="ri-database-2-line"></i> ${mem}</span>
                      <span><i class="ri-hard-drive-line"></i> ${disk}</span>
                    </div>
                  </div>
                  <div class="apparatus-server-action-wrap">
                    <a href="/server/${id}" class="apparatus-server-btn">
                      Manage <i class="ri-arrow-right-s-line"></i>
                    </a>
                  </div>
                </div>
              `;
            });
            html += '</div>';
            container.innerHTML = html;
          }
        }
      } else {
        renderDefaultEmptyServers();
      }
    } catch (e) {
      renderDefaultEmptyServers();
    }

    // 3. Fetch Recent Activities
    try {
      const actRes = await fetch('/api/client/account/activity?page=1', { headers: { Accept: 'application/json' } });
      const actContainer = document.getElementById('apparatus-activity-list');
      if (actRes.ok) {
        const actData = await actRes.json();
        const activities = actData.data || [];
        if (activities.length === 0) {
          if (actContainer) actContainer.innerHTML = '<div class="apparatus-empty-msg">No recent activity.</div>';
        } else {
          let html = '';
          activities.slice(0, 5).forEach(function (item) {
            const attr = item.attributes || {};
            const event = attr.event || 'activity';
            const timestamp = attr.timestamp || '';
            const title = formatEventName(event);
            const time = timeAgo(timestamp);

            html += `
              <div class="apparatus-act-row">
                <span class="apparatus-act-name">${title}</span>
                <span class="apparatus-act-time">${time}</span>
              </div>
            `;
          });
          if (actContainer) actContainer.innerHTML = html;
        }
      } else {
        if (actContainer) actContainer.innerHTML = '<div class="apparatus-empty-msg">No recent activity.</div>';
      }
    } catch (e) {
      const actContainer = document.getElementById('apparatus-activity-list');
      if (actContainer) actContainer.innerHTML = '<div class="apparatus-empty-msg">No recent activity.</div>';
    }
  }

  function renderDefaultEmptyServers() {
    const container = document.getElementById('apparatus-servers-list');
    const countBadge = document.getElementById('apparatus-server-badge');
    const mInstances = document.getElementById('apparatus-metric-instances');
    const mInstancesSub = document.getElementById('apparatus-metric-instances-sub');
    if (countBadge) countBadge.textContent = '0';
    if (mInstances) mInstances.textContent = '0';
    if (mInstancesSub) mInstancesSub.innerHTML = '0 Servers &bull; 0 VPS';
    if (container) {
      container.innerHTML = `
        <div class="apparatus-empty-servers">
          <div class="apparatus-empty-icon"><i class="ri-gamepad-line"></i></div>
          <h4 class="apparatus-empty-title">No Game Servers Active</h4>
          <p class="apparatus-empty-desc">
            You do not have any active game servers yet. Deploy high-performance Minecraft, Rust, CS2, or bot instances with instant setup.
          </p>
          <div class="apparatus-empty-actions">
            <a href="https://arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-primary">
              <i class="ri-add-line"></i> Deploy Server
            </a>
            <a href="#resource" class="apparatus-btn apparatus-btn-glass" id="apparatus-empty-view-res-btn">
              <i class="ri-cpu-line"></i> View Resources
            </a>
          </div>
        </div>
      `;
    }
  }

  // Initialize the Transparent Futuristic Dashboard
  function initDashboardView() {
    let dash = document.getElementById('apparatus-dashboard-view');
    if (dash) return;

    dash = document.createElement('div');
    dash.id = 'apparatus-dashboard-view';
    dash.className = 'apparatus-dashboard-view';

    const user = window.PterodactylUser || {};
    const username = user.username || 'User';
    const email = user.email || 'user@arixbyte.com';
    const isRootAdmin = !!user.root_admin;
    const useTotp = !!user.use_totp;
    const greeting = getGreeting();
    const referralCode = getReferralCode(user);

    dash.innerHTML = `
      <div class="apparatus-dashboard-container">
        
        <!-- Top Section: Dynamic Hero Banner -->
        <div class="apparatus-card apparatus-card-welcome" id="apparatus-area-1">
          <div class="apparatus-welcome-content">
            <h1 class="apparatus-welcome-title">${greeting}, <span class="apparatus-user-name" id="apparatus-welcome-username">${username}</span></h1>
            <p class="apparatus-welcome-desc">ArixByte Cloud Console &bull; High Performance Game Servers &amp; KVM Cloud VPS</p>
            <div class="apparatus-welcome-actions">
              <a href="/servers" class="apparatus-btn apparatus-btn-primary" id="apparatus-btn-to-servers">
                <i class="ri-server-line apparatus-btn-icon-servers"></i> View Servers
              </a>
              <button type="button" class="apparatus-btn apparatus-btn-glass" id="apparatus-hero-vps-btn">
                <i class="ri-hard-drive-3-line apparatus-btn-icon-vps"></i> Cloud VPS
              </button>
              <button type="button" class="apparatus-btn apparatus-btn-glass" id="apparatus-hero-store-btn">
                <i class="ri-shopping-bag-3-line apparatus-btn-icon-store"></i> Billing &amp; Store
              </button>
              <a href="https://discord.arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-glass">
                <i class="ri-discord-fill apparatus-btn-icon-discord"></i> Discord Community
              </a>
            </div>
          </div>
          <div class="apparatus-welcome-decor apparatus-welcome-decor-ab" aria-hidden="true">
            <img src="/themes/apparatus/ab-logo.png" class="apparatus-ab-watermark" alt="ArixByte">
          </div>
        </div>

        <!-- Top Metric Ribbon (4 Modern Glass Tiles) -->
        <div class="apparatus-metrics-ribbon" id="apparatus-metrics-ribbon">
          <!-- Metric 1: Active Instances -->
          <div class="apparatus-metric-tile">
            <div class="apparatus-metric-icon apparatus-icon-purple">
              <i class="ri-server-line"></i>
            </div>
            <div class="apparatus-metric-body">
              <span class="apparatus-metric-label">Active Instances</span>
              <div class="apparatus-metric-num">
                <span class="apparatus-metric-val" id="apparatus-metric-instances">0</span>
                <span class="apparatus-metric-unit">Active</span>
              </div>
              <span class="apparatus-metric-sub" id="apparatus-metric-instances-sub">0 Servers &bull; 0 VPS</span>
            </div>
          </div>

          <!-- Metric 2: INR Balance & Coins -->
          <div class="apparatus-metric-tile">
            <div class="apparatus-metric-icon apparatus-icon-emerald">
              <i class="ri-wallet-3-line"></i>
            </div>
            <div class="apparatus-metric-body">
              <span class="apparatus-metric-label">Cash Balance</span>
              <div class="apparatus-metric-num">
                <span class="apparatus-metric-val" id="apparatus-metric-balance">₹0.00</span>
                <span class="apparatus-metric-unit">INR</span>
              </div>
              <span class="apparatus-metric-sub">
                <span id="apparatus-metric-coins">100</span> Referral Points &bull; <a href="javascript:void(0)" class="apparatus-metric-sublink" id="apparatus-ribbon-topup">Top Up</a>
              </span>
            </div>
          </div>

          <!-- Metric 3: Resource Capacity -->
          <div class="apparatus-metric-tile">
            <div class="apparatus-metric-icon apparatus-icon-cyan">
              <i class="ri-cpu-line"></i>
            </div>
            <div class="apparatus-metric-body">
              <span class="apparatus-metric-label">Allocated Resources</span>
              <div class="apparatus-metric-num">
                <span class="apparatus-metric-val" id="apparatus-metric-ram">0.0 GB</span>
                <span class="apparatus-metric-unit">RAM</span>
              </div>
              <span class="apparatus-metric-sub" id="apparatus-metric-sub-res">
                <span id="apparatus-metric-cpu">0% CPU</span> &bull; <span id="apparatus-metric-disk">0.0 GB NVMe</span>
              </span>
            </div>
          </div>

          <!-- Metric 4: Security & Access -->
          <div class="apparatus-metric-tile">
            <div class="apparatus-metric-icon apparatus-icon-pink">
              <i class="ri-shield-check-line"></i>
            </div>
            <div class="apparatus-metric-body">
              <span class="apparatus-metric-label">Security &amp; Role</span>
              <div class="apparatus-metric-num">
                <span class="apparatus-metric-val" id="apparatus-metric-role">${isRootAdmin ? 'Administrator' : 'User'}</span>
              </div>
              <span class="apparatus-metric-sub">
                2FA: <span id="apparatus-metric-2fa" class="${useTotp ? 'status-on' : 'status-off'}">${useTotp ? 'Active &bull; Protected' : 'Disabled'}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Main 2-Column Content Grid -->
        <div class="apparatus-dash-main-grid">
          <!-- Left Column: Dual Instances Hub (Area 4) -->
          <div class="apparatus-dash-col apparatus-dash-left">
            <div class="apparatus-card apparatus-card-servers" id="apparatus-area-4">
              <div class="apparatus-card-header apparatus-hub-header">
                <div class="apparatus-tabs-nav">
                  <button type="button" class="apparatus-tab-btn active" data-tab="servers" id="apparatus-tab-btn-servers">
                    <i class="ri-gamepad-line"></i> Game Servers
                  </button>
                  <button type="button" class="apparatus-tab-btn" data-tab="vps" id="apparatus-tab-btn-vps">
                    <i class="ri-server-line"></i> Cloud VPS
                  </button>
                </div>
                <div class="apparatus-hub-actions">
                  <button type="button" class="apparatus-btn apparatus-btn-primary apparatus-btn-sm" id="apparatus-hub-deploy-btn">
                    <i class="ri-add-line"></i> Deploy Server
                  </button>
                </div>
              </div>

              <!-- Tab 1: Game Servers List -->
              <div class="apparatus-tab-pane active" id="apparatus-pane-servers">
                <div class="apparatus-servers-content" id="apparatus-servers-list">
                  <div class="apparatus-empty-msg">
                    <i class="ri-loader-4-line apparatus-spin"></i> Loading servers...
                  </div>
                </div>
              </div>

              <!-- Tab 2: Cloud VPS Hub -->
              <div class="apparatus-tab-pane" id="apparatus-pane-vps" style="display: none;">
                <div class="apparatus-vps-empty">
                  <div class="apparatus-vps-empty-icon">
                    <i class="ri-server-line"></i>
                  </div>
                  <h4 class="apparatus-vps-empty-title">No Cloud VPS Found</h4>
                  <p class="apparatus-vps-empty-desc">
                    You don't have any active Cloud VPS instances associated with your account.
                  </p>
                  <div class="apparatus-vps-empty-actions">
                    <a href="https://arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-primary">
                      <i class="ri-add-line"></i> Deploy Cloud VPS
                    </a>
                    <a href="#resource" class="apparatus-btn apparatus-btn-glass" id="apparatus-vps-view-res-btn">
                      <i class="ri-cpu-line"></i> View Resources
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Billing/Wallet, Resource Allocation, and Recent Activity -->
          <div class="apparatus-dash-col apparatus-dash-right">
            
            <!-- Card 1: Billing & INR Wallet -->
            <div class="apparatus-card apparatus-card-billing" id="apparatus-area-billing">
              <div class="apparatus-card-header">
                <h2 class="apparatus-card-title">
                  <i class="ri-wallet-3-line" style="color: #34d399;"></i> Billing &amp; Wallet
                </h2>
              </div>

              <div class="apparatus-billing-balances">
                <!-- Cash Wallet -->
                <div class="apparatus-balance-box apparatus-balance-cash">
                  <span class="apparatus-balance-label">Cash Balance</span>
                  <div class="apparatus-balance-value">₹0.00</div>
                  <span class="apparatus-balance-note">Instant UPI / NetBanking / Cards</span>
                </div>

                <!-- Referral Points Balance -->
                <div class="apparatus-balance-box apparatus-balance-coins">
                  <span class="apparatus-balance-label">Referral Points</span>
                  <div class="apparatus-balance-value">
                    <span id="apparatus-coin-count">100</span> <span class="apparatus-coin-symbol">🪙</span>
                  </div>
                  <span class="apparatus-balance-note">Redeem points for discounts &amp; upgrades</span>
                </div>
              </div>

              <div class="apparatus-billing-actions">
                <button type="button" class="apparatus-btn apparatus-btn-primary apparatus-btn-full" id="apparatus-wallet-topup-btn">
                  <i class="ri-add-circle-line"></i> Top Up Balance (INR ₹)
                </button>

                <!-- User Unique Referral Code Box -->
                <div class="apparatus-referral-card">
                  <div class="apparatus-referral-header">
                    <div class="apparatus-referral-header-left">
                      <div class="apparatus-referral-icon">
                        <i class="ri-gift-line"></i>
                      </div>
                      <div class="apparatus-referral-titles">
                        <span class="apparatus-referral-title">Referral Program</span>
                        <span class="apparatus-referral-subtitle">Earn 10 coins per friend invited</span>
                      </div>
                    </div>
                  </div>

                  <div class="apparatus-referral-box">
                    <div class="apparatus-referral-code-wrap">
                      <span class="apparatus-referral-code-tag">YOUR CODE</span>
                      <code class="apparatus-referral-code" id="apparatus-user-ref-code">${referralCode}</code>
                    </div>
                    <button type="button" class="apparatus-copy-ref-btn" id="apparatus-copy-ref-btn" title="Copy Referral Code">
                      <i class="ri-file-copy-line"></i> <span>Copy</span>
                    </button>
                  </div>

                  <div class="apparatus-referral-note">
                    <i class="ri-sparkling-fill" style="color: #fbbf24; font-size: 0.72rem; margin-right: 4px;"></i>
                    Earn <strong style="color: #fbbf24; margin: 0 3px;">10 Coins</strong> for each friend who joins using your code
                  </div>
                </div>
              </div>

              <!-- Quick Resource Upgrades -->
              <div class="apparatus-upgrades-section">
                <span class="apparatus-upgrades-title">
                  <i class="ri-flashlight-line"></i> Quick Server Upgrades
                </span>
                <div class="apparatus-upgrades-grid">
                  <button type="button" class="apparatus-upgrade-pill" data-upgrade="+2 GB DDR4 RAM" data-price="₹99">
                    <span class="upgrade-name">+2 GB RAM</span>
                    <span class="upgrade-price">₹99/mo</span>
                  </button>
                  <button type="button" class="apparatus-upgrade-pill" data-upgrade="+100% Dedicated CPU" data-price="₹79">
                    <span class="upgrade-name">+100% CPU</span>
                    <span class="upgrade-price">₹79/mo</span>
                  </button>
                  <button type="button" class="apparatus-upgrade-pill" data-upgrade="+20 GB NVMe Storage" data-price="₹49">
                    <span class="upgrade-name">+20 GB NVMe</span>
                    <span class="upgrade-price">₹49/mo</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Card 2: Resource Allocation -->
            <div class="apparatus-card apparatus-card-resources" id="apparatus-area-resources">
              <div class="apparatus-card-header">
                <h2 class="apparatus-card-title">
                  <i class="ri-dashboard-3-line" style="color: #38bdf8;"></i> Resource Capacity
                </h2>
                <a href="#resource" class="apparatus-link-btn" id="apparatus-dash-resource-link" style="text-decoration: none; font-size: 0.76rem; font-weight: 600; color: #38bdf8; display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 6px; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); transition: all 0.2s ease;">
                  <span>Allocated</span> <i class="ri-arrow-right-line"></i>
                </a>
              </div>

              <div class="apparatus-gauges-list">
                <!-- Memory Bar -->
                <div class="apparatus-gauge-row">
                  <div class="apparatus-gauge-header">
                    <span class="gauge-label"><i class="ri-database-2-line"></i> Memory (RAM)</span>
                    <span class="gauge-val" id="apparatus-gauge-ram-text">0.0 GB Allocated</span>
                  </div>
                  <div class="apparatus-progress-track">
                    <div class="apparatus-progress-bar apparatus-progress-ram" id="apparatus-gauge-ram-bar" style="width: 20%;"></div>
                  </div>
                </div>

                <!-- CPU Bar -->
                <div class="apparatus-gauge-row">
                  <div class="apparatus-gauge-header">
                    <span class="gauge-label"><i class="ri-cpu-line"></i> CPU Compute</span>
                    <span class="gauge-val" id="apparatus-gauge-cpu-text">0% Allocated</span>
                  </div>
                  <div class="apparatus-progress-track">
                    <div class="apparatus-progress-bar apparatus-progress-cpu" id="apparatus-gauge-cpu-bar" style="width: 15%;"></div>
                  </div>
                </div>

                <!-- Disk Bar -->
                <div class="apparatus-gauge-row">
                  <div class="apparatus-gauge-header">
                    <span class="gauge-label"><i class="ri-hard-drive-line"></i> NVMe Storage</span>
                    <span class="gauge-val" id="apparatus-gauge-disk-text">0.0 GB Allocated</span>
                  </div>
                  <div class="apparatus-progress-track">
                    <div class="apparatus-progress-bar apparatus-progress-disk" id="apparatus-gauge-disk-bar" style="width: 25%;"></div>
                  </div>
                </div>
              </div>

              <!-- Blurred Email Quick Row -->
              <div class="apparatus-account-quick-row">
                <span class="apparatus-row-label">Account Email</span>
                <span class="apparatus-email-blurred" id="apparatus-email-val" title="Click or hover to reveal">${email}</span>
              </div>
            </div>

            <!-- Card 3: Recent Activity (Area 2) -->
            <div class="apparatus-card apparatus-card-activity" id="apparatus-area-2">
              <div class="apparatus-card-header">
                <h2 class="apparatus-card-title">
                  <i class="ri-history-line" style="color: #f472b6;"></i> Recent Activity
                </h2>
                <a href="/account/activity" class="apparatus-link">View All <i class="ri-arrow-right-s-line"></i></a>
              </div>
              <div class="apparatus-activity-list" id="apparatus-activity-list">
                <div class="apparatus-empty-msg">Loading activity...</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    const app = document.getElementById('app');
    if (app) {
      app.prepend(dash);
    } else {
      document.body.appendChild(dash);
    }

    const toServersBtn = document.getElementById('apparatus-btn-to-servers');
    if (toServersBtn) {
      toServersBtn.addEventListener('click', function (e) {
        const rawP = window.location.pathname || '/';
        const onHome = rawP === '/' || rawP === '/servers' || rawP === '/vps' || rawP === '/dashboard';
        if (!onHome) {
          window.location.href = '/servers';
          return;
        }
        e.preventDefault();
        if (window.location.pathname !== '/servers') {
          history.pushState(null, '', '/servers');
        }
        applyViewMode();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const dashResLink = document.getElementById('apparatus-dash-resource-link');
    if (dashResLink) {
      dashResLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.hash = '#resource';
        applyViewMode();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Toggle reveal for mobile touch
    const emailEl = document.getElementById('apparatus-email-val');
    if (emailEl) {
      emailEl.addEventListener('click', function () {
        emailEl.classList.toggle('revealed');
      });
    }

    // Initialize interactive tabs, coins, referral code, and billing
    initInstanceTabs();
    initDailyReward();
    initReferralCode();
    initBillingActions();

    // Load dynamic data
    loadDashboardApiData();
  }

  // Initialize the Dedicated Resource Allocation View
  function initResourceView() {
    let resView = document.getElementById('apparatus-resource-view');
    if (resView) return;

    resView = document.createElement('div');
    resView.id = 'apparatus-resource-view';
    resView.className = 'apparatus-resource-view';
    resView.style.display = 'none';

    resView.innerHTML = `
      <div class="apparatus-dashboard-container">
        
        <!-- Top Resource Header -->
        <div class="apparatus-card apparatus-resource-header-card">
          <div class="apparatus-resource-header-left">
            <div class="apparatus-resource-breadcrumbs">
              <a href="/" class="apparatus-breadcrumb-link" id="apparatus-res-back-btn">
                <i class="ri-arrow-left-s-line"></i> Dashboard
              </a>
              <span class="apparatus-breadcrumb-sep">/</span>
              <span class="apparatus-breadcrumb-current">Resources</span>
            </div>
            <h1 class="apparatus-resource-main-title">
              <i class="ri-cpu-line" style="color: #f472b6;"></i> Allocated Resources
            </h1>
            <p class="apparatus-resource-subtitle">
              Overview of your dedicated Game Server and Cloud VPS computing limits.
            </p>
          </div>

          <div class="apparatus-resource-header-right">
            <a href="/" class="apparatus-btn apparatus-btn-glass" id="apparatus-res-back-btn-2">
              <i class="ri-dashboard-line"></i> Back to Dashboard
            </a>
          </div>
        </div>

        <!-- Quick Overview Stats Ribbon -->
        <div class="apparatus-resource-overview-ribbon">
          <div class="apparatus-resource-stat-tile">
            <div class="apparatus-res-stat-icon" style="background: rgba(244, 114, 182, 0.12); color: #f472b6;">
              <i class="ri-gamepad-line"></i>
            </div>
            <div class="apparatus-res-stat-body">
              <span class="apparatus-res-stat-label">Game Server Slots</span>
              <span class="apparatus-res-stat-val" id="res-val-server-slots">0 Slots</span>
            </div>
          </div>

          <div class="apparatus-resource-stat-tile">
            <div class="apparatus-res-stat-icon" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8;">
              <i class="ri-hard-drive-3-line"></i>
            </div>
            <div class="apparatus-res-stat-body">
              <span class="apparatus-res-stat-label">Cloud VPS Slots</span>
              <span class="apparatus-res-stat-val" id="res-val-vps-slots">0 Slots</span>
            </div>
          </div>

          <div class="apparatus-resource-stat-tile">
            <div class="apparatus-res-stat-icon" style="background: rgba(52, 211, 153, 0.12); color: #34d399;">
              <i class="ri-shield-check-line"></i>
            </div>
            <div class="apparatus-res-stat-body">
              <span class="apparatus-res-stat-label">Allocation Status</span>
              <span class="apparatus-res-stat-val" style="color: #34d399;">Active • Verified</span>
            </div>
          </div>
        </div>

        <!-- Live Resource Usage Gauges (Used vs Allocated) -->
        <div class="apparatus-card apparatus-resource-card apparatus-res-gauges-card">
          <div class="apparatus-card-header apparatus-res-card-header">
            <div class="apparatus-res-card-title-group">
              <div class="apparatus-res-badge-icon" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
                <i class="ri-pulse-line"></i>
              </div>
              <div>
                <h2 class="apparatus-card-title">Live Resource Utilization</h2>
                <span class="apparatus-res-card-sub">Real-time quota consumption across active instances</span>
              </div>
            </div>
          </div>

          <div class="apparatus-res-gauges-grid">
            <!-- Gauge 1: RAM -->
            <div class="apparatus-res-gauge-tile">
              <div class="apparatus-res-gauge-head">
                <span class="apparatus-res-gauge-title"><i class="ri-database-2-line" style="color: #f472b6;"></i> Memory (RAM)</span>
                <span class="apparatus-res-gauge-val" id="res-gauge-ram-text">0 MB / 0 MB (0%)</span>
              </div>
              <div class="apparatus-progress-track">
                <div class="apparatus-progress-bar apparatus-progress-ram" id="res-gauge-ram-bar" style="width: 0%;"></div>
              </div>
            </div>

            <!-- Gauge 2: CPU Compute -->
            <div class="apparatus-res-gauge-tile">
              <div class="apparatus-res-gauge-head">
                <span class="apparatus-res-gauge-title"><i class="ri-cpu-line" style="color: #38bdf8;"></i> CPU Compute</span>
                <span class="apparatus-res-gauge-val" id="res-gauge-cpu-text">0% / 0% In Use</span>
              </div>
              <div class="apparatus-progress-track">
                <div class="apparatus-progress-bar apparatus-progress-cpu" id="res-gauge-cpu-bar" style="width: 0%;"></div>
              </div>
            </div>

            <!-- Gauge 3: Disk Storage -->
            <div class="apparatus-res-gauge-tile">
              <div class="apparatus-res-gauge-head">
                <span class="apparatus-res-gauge-title"><i class="ri-hard-drive-2-line" style="color: #34d399;"></i> NVMe Storage</span>
                <span class="apparatus-res-gauge-val" id="res-gauge-disk-text">0 GB / 0 GB Used</span>
              </div>
              <div class="apparatus-progress-track">
                <div class="apparatus-progress-bar apparatus-progress-disk" id="res-gauge-disk-bar" style="width: 0%;"></div>
              </div>
            </div>

            <!-- Gauge 4: Ports & Allocations -->
            <div class="apparatus-res-gauge-tile">
              <div class="apparatus-res-gauge-head">
                <span class="apparatus-res-gauge-title"><i class="ri-share-network-line" style="color: #fbbf24;"></i> Allocations &amp; Ports</span>
                <span class="apparatus-res-gauge-val" id="res-gauge-ports-text">0 / 0 Assigned</span>
              </div>
              <div class="apparatus-progress-track">
                <div class="apparatus-progress-bar apparatus-progress-ports" id="res-gauge-ports-bar" style="width: 0%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Two-Column Main Resource Grid -->
        <div class="apparatus-resource-grid">

          <!-- Column 1: Server Resources -->
          <div class="apparatus-card apparatus-resource-card">
            <div class="apparatus-card-header apparatus-res-card-header">
              <div class="apparatus-res-card-title-group">
                <div class="apparatus-res-badge-icon" style="background: rgba(244, 114, 182, 0.15); color: #f472b6;">
                  <i class="ri-gamepad-line"></i>
                </div>
                <div>
                  <h2 class="apparatus-card-title">Server Resources</h2>
                  <span class="apparatus-res-card-sub">Pterodactyl Game Server Allocation</span>
                </div>
              </div>
            </div>

            <div class="apparatus-res-items-list">
              
              <!-- SERVER SLOTS -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-server-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">SERVER SLOTS</span>
                    <span class="apparatus-res-row-desc">Total deployable game servers</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-slots">0</span>
                </div>
              </div>

              <!-- ALLOCATED PROCESSOR -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-cpu-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">ALLOCATED PROCESSOR</span>
                    <span class="apparatus-res-row-desc">Compute architecture tier</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-processor">0</span>
                </div>
              </div>

              <!-- RAM -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-database-2-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">RAM</span>
                    <span class="apparatus-res-row-desc">Allocated memory capacity</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-ram">0 MB</span>
                </div>
              </div>

              <!-- CPU -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-dashboard-3-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">CPU</span>
                    <span class="apparatus-res-row-desc">Allocated processing limit</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-cpu">0%</span>
                </div>
              </div>

              <!-- DISK -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-hard-drive-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">DISK</span>
                    <span class="apparatus-res-row-desc">Fast NVMe SSD storage</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-disk">0 GB</span>
                </div>
              </div>

              <!-- ALLOCATION -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-node-tree"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">ALLOCATION</span>
                    <span class="apparatus-res-row-desc">Network IP allocation count</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-allocation">0</span>
                </div>
              </div>

              <!-- PORTS -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-router-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">PORTS</span>
                    <span class="apparatus-res-row-desc">Assigned server ports</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-ports">0</span>
                </div>
              </div>

              <!-- DATABASE -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-database-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">DATABASE</span>
                    <span class="apparatus-res-row-desc">MySQL database limit</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-database">0</span>
                </div>
              </div>

              <!-- VALIDITY -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-calendar-check-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">VALIDITY</span>
                    <span class="apparatus-res-row-desc">Starts after activation of server</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val apparatus-res-badge-validity" id="res-server-validity">0 (after activation)</span>
                </div>
              </div>

            </div>

            <div class="apparatus-res-card-footer">
              <i class="ri-information-line"></i>
              <span>Game server resources are allocated and updated by administrators.</span>
            </div>
          </div>

          <!-- Column 2: Right Column (VPS Resources & Coins) -->
          <div class="apparatus-resource-col-right">

            <!-- Card 2: VPS Resources -->
            <div class="apparatus-card apparatus-resource-card">
              <div class="apparatus-card-header apparatus-res-card-header">
                <div class="apparatus-res-card-title-group">
                  <div class="apparatus-res-badge-icon" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
                    <i class="ri-hard-drive-3-line"></i>
                  </div>
                  <div>
                    <h2 class="apparatus-card-title">VPS Resources</h2>
                    <span class="apparatus-res-card-sub">Cloud KVM Virtual Private Server</span>
                  </div>
                </div>
              </div>

              <div class="apparatus-res-items-list">
                
                <!-- VPS SLOTS -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon"><i class="ri-server-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">VPS SLOTS</span>
                      <span class="apparatus-res-row-desc">Total deployable VPS instances</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" id="res-vps-slots">0</span>
                  </div>
                </div>

                <!-- ALLOCATED NODE -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon"><i class="ri-global-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">ALLOCATED NODE</span>
                      <span class="apparatus-res-row-desc">Assigned hypervisor node</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" id="res-vps-node">0</span>
                  </div>
                </div>

                <!-- RAM -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon"><i class="ri-database-2-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">RAM</span>
                      <span class="apparatus-res-row-desc">Dedicated physical memory</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" id="res-vps-ram">0 GB</span>
                  </div>
                </div>

                <!-- CPU -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon"><i class="ri-dashboard-3-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">CPU</span>
                      <span class="apparatus-res-row-desc">Dedicated virtual CPU cores</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" id="res-vps-cpu">0 vCPU</span>
                  </div>
                </div>

                <!-- DISK -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon"><i class="ri-hard-drive-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">DISK</span>
                      <span class="apparatus-res-row-desc">Dedicated NVMe block storage</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" id="res-vps-disk">0 GB</span>
                  </div>
                </div>

              </div>

              <div class="apparatus-res-card-footer">
                <i class="ri-information-line"></i>
                <span>Cloud VPS instances and node allocations are provisioned by administrators.</span>
              </div>
            </div>

            <!-- Card 3: Reward Coins -->
            <div class="apparatus-card apparatus-resource-card apparatus-res-coins-card">
              <div class="apparatus-card-header apparatus-res-card-header">
                <div class="apparatus-res-card-title-group">
                  <div class="apparatus-res-badge-icon" style="background: rgba(251, 191, 36, 0.15); color: #fbbf24;">
                    <i class="ri-copper-coin-line"></i>
                  </div>
                  <div>
                    <h2 class="apparatus-card-title">Reward Coins</h2>
                    <span class="apparatus-res-card-sub">Available Balance &amp; Earnings</span>
                  </div>
                </div>
              </div>

              <!-- Main Coin Balance Box -->
              <div class="apparatus-res-coins-box">
                <div class="apparatus-res-coins-meta">
                  <span class="apparatus-res-coins-lbl">AVAILABLE COINS</span>
                  <div class="apparatus-res-coins-num">
                    <span id="res-coin-count">0</span>
                    <span class="apparatus-coin-icon-gold">🪙</span>
                  </div>
                </div>
              </div>

              <div class="apparatus-res-items-list">
                
                <!-- Referral Bonus -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon" style="color: #fbbf24;"><i class="ri-gift-2-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">REFERRAL BONUS</span>
                      <span class="apparatus-res-row-desc">Earn per friend who registers with your code</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" style="color: #fbbf24; border-color: rgba(251, 191, 36, 0.3);">+10 Coins</span>
                  </div>
                </div>

                <!-- Daily Bonus -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon" style="color: #34d399;"><i class="ri-calendar-check-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">DAILY BONUS</span>
                      <span class="apparatus-res-row-desc">Claim free bonus coins every 24 hours</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" style="color: #34d399; border-color: rgba(52, 211, 153, 0.3);">+2 Coins</span>
                  </div>
                </div>

                <!-- Coin Redemption -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon" style="color: #f472b6;"><i class="ri-exchange-funds-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">REDEMPTION</span>
                      <span class="apparatus-res-row-desc">Redeem coins for RAM, CPU &amp; discounts</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" style="color: #f472b6; border-color: rgba(244, 114, 182, 0.3);">Available</span>
                  </div>
                </div>

              </div>

              <div class="apparatus-res-card-footer">
                <i class="ri-information-line"></i>
                <span>Coins can be earned through daily logins and referrals to upgrade server limits.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    `;

    const app = document.getElementById('app') || document.body;
    const dash = document.getElementById('apparatus-dashboard-view');
    if (dash && dash.parentNode) {
      dash.parentNode.insertBefore(resView, dash.nextSibling);
    } else if (app) {
      app.appendChild(resView);
    }

    // Attach back buttons
    const backBtn1 = document.getElementById('apparatus-res-back-btn');
    const backBtn2 = document.getElementById('apparatus-res-back-btn-2');
    function goBackToDash(e) {
      e.preventDefault();
      window.location.hash = '';
      if (window.location.pathname !== '/') {
        history.pushState(null, '', '/');
      }
      applyViewMode();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (backBtn1) backBtn1.addEventListener('click', goBackToDash);
    if (backBtn2) backBtn2.addEventListener('click', goBackToDash);

    renderResourcePage();
  }

  function initSidebar() {
    if (isAuthPage() || isUnauthorizedAdminAttempt()) {
      const existing = document.getElementById('apparatus-sidebar');
      if (existing) existing.style.display = 'none';
      const toggle = document.getElementById('apparatus-mobile-toggle');
      if (toggle) toggle.style.display = 'none';
      const hero = document.getElementById('apparatus-dashboard-view');
      if (hero) hero.style.display = 'none';
      return;
    }

    const user = window.PterodactylUser || {};
    const isRootAdmin = !!user.root_admin;
    if (isRootAdmin) {
      document.body.classList.add('apparatus-is-admin');
    } else {
      document.body.classList.remove('apparatus-is-admin');
    }

    // Initialize 4-card transparent dashboard and resource view
    initDashboardView();
    initResourceView();

    let sidebar = document.getElementById('apparatus-sidebar');
    if (!sidebar) {
      sidebar = document.createElement('aside');
      sidebar.id = 'apparatus-sidebar';
      sidebar.className = 'apparatus-sidebar';

      sidebar.innerHTML = `
        <div class="apparatus-sidebar-header">
          <div class="apparatus-sidebar-brand">
            <span class="brand-text">ARIXBYTE CLOUD</span>
          </div>
        </div>

        <div class="apparatus-sidebar-scroll">
          <!-- Home -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Home</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="/" class="apparatus-nav-link" data-tab="dashboard" data-path="/">
                  <i class="ri-dashboard-3-line apparatus-nav-icon"></i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/servers" class="apparatus-nav-link" data-tab="servers" data-path="/servers">
                  <i class="ri-gamepad-line apparatus-nav-icon"></i>
                  <span>Servers</span>
                </a>
              </li>
              <li>
                <a href="/vps" class="apparatus-nav-link apparatus-vps-link" data-tab="vps" data-path="/vps">
                  <i class="ri-server-line apparatus-nav-icon"></i>
                  <span>VPS</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Billing -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Billing</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="#resource" class="apparatus-nav-link apparatus-resource-link" data-tab="resource">
                  <i class="ri-cpu-line apparatus-nav-icon"></i>
                  <span>Resource</span>
                </a>
              </li>
              <li>
                <a href="#store" class="apparatus-nav-link apparatus-store-link" data-path="/billing/store">
                  <i class="ri-shopping-cart-2-line apparatus-nav-icon"></i>
                  <span>Store</span>
                  <span class="apparatus-tag-soon">Soon</span>
                </a>
              </li>
              <li>
                <a href="#earn" class="apparatus-nav-link apparatus-earn-link" data-path="/billing/earn">
                  <i class="ri-copper-coin-line apparatus-nav-icon"></i>
                  <span>Earn</span>
                  <span class="apparatus-tag-soon">Soon</span>
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

          <!-- Panel Settings -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Panel Settings</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="#panel-settings" class="apparatus-nav-link apparatus-panel-settings-link" data-tab="panel-settings">
                  <i class="ri-settings-3-line apparatus-nav-icon"></i>
                  <span>Panel Settings</span>
                </a>
              </li>
              <li>
                <a href="#hyper-editor" class="apparatus-nav-link apparatus-hyper-editor-link" data-tab="hyper-editor">
                  <i class="ri-sparkling-2-line apparatus-nav-icon"></i>
                  <span>Hyper Editor</span>
                </a>
              </li>
              <li>
                <a href="#hyper-settings" class="apparatus-nav-link apparatus-hyper-settings-link" data-tab="hyper-settings">
                  <i class="ri-settings-4-line apparatus-nav-icon"></i>
                  <span>Hyper Settings</span>
                </a>
              </li>
              <li>
                <a href="#addon-settings" class="apparatus-nav-link apparatus-addon-settings-link" data-tab="addon-settings">
                  <i class="ri-stack-line apparatus-nav-icon"></i>
                  <span>Addon Settings</span>
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
              ${isRootAdmin ? `
              <li class="apparatus-admin-panel-item">
                <a href="/admin" class="apparatus-nav-link" data-path="/admin">
                  <i class="ri-settings-4-line apparatus-nav-icon"></i>
                  <span>Admin Panel</span>
                  <span class="apparatus-tag-admin">Admin</span>
                </a>
              </li>
              ` : ''}
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

      // Billing click handlers
      const resourceBtn = sidebar.querySelector('.apparatus-resource-link');
      if (resourceBtn) {
        resourceBtn.addEventListener('click', function (e) {
          e.preventDefault();
          window.location.hash = '#resource';
          applyViewMode();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      const storeBtn = sidebar.querySelector('.apparatus-store-link');
      if (storeBtn) {
        storeBtn.addEventListener('click', function (e) {
          e.preventDefault();
          const billCard = document.getElementById('apparatus-area-billing');
          if (billCard) {
            billCard.scrollIntoView({ behavior: 'smooth' });
            billCard.style.transition = 'box-shadow 0.3s ease';
            billCard.style.boxShadow = '0 0 25px rgba(236, 72, 153, 0.45)';
            setTimeout(function () { billCard.style.boxShadow = ''; }, 1500);
          } else {
            showToast('info', 'Cloud Store (INR)', 'Opening ArixByte Store...');
            setTimeout(function () { window.open('https://arixbyte.com', '_blank'); }, 800);
          }
        });
      }

      const earnBtn = sidebar.querySelector('.apparatus-earn-link');
      if (earnBtn) {
        earnBtn.addEventListener('click', function (e) {
          e.preventDefault();
          const dailyBtn = document.getElementById('apparatus-daily-reward-btn');
          if (dailyBtn) {
            dailyBtn.scrollIntoView({ behavior: 'smooth' });
            dailyBtn.click();
          } else {
            showToast('info', 'Referral & Earn', 'Claim daily referral points and redeem for server discounts!');
          }
        });
      }

      // Ticket placeholder click handler
      const ticketBtn = sidebar.querySelector('.apparatus-ticket-link');
      if (ticketBtn) {
        ticketBtn.addEventListener('click', function (e) {
          e.preventDefault();
          showToast('success', 'Tickets', 'Ticket support system is coming soon!');
        });
      }

      // Panel Settings category click handlers
      const panelSettingsLinks = [
        { selector: '.apparatus-panel-settings-link', title: 'Panel Settings', msg: 'Opening Panel Settings configuration...' },
        { selector: '.apparatus-hyper-editor-link', title: 'Hyper Editor', msg: 'Opening Hyper Editor customization module...' },
        { selector: '.apparatus-hyper-settings-link', title: 'Hyper Settings', msg: 'Opening Hyper Settings preferences...' },
        { selector: '.apparatus-addon-settings-link', title: 'Addon Settings', msg: 'Opening Addon Settings configuration...' }
      ];

      panelSettingsLinks.forEach(function (item) {
        const btn = sidebar.querySelector(item.selector);
        if (btn) {
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            showToast('info', item.title, item.msg);
          });
        }
      });

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

      // Tab switcher handlers for Dashboard vs Servers vs VPS
      sidebar.querySelectorAll('a[data-tab]').forEach(function (tabLink) {
        tabLink.addEventListener('click', function (e) {
          const tab = this.getAttribute('data-tab');
          if (!tab || (tab !== 'dashboard' && tab !== 'servers' && tab !== 'vps')) return;

          const rawP = window.location.pathname || '/';
          const onHome = rawP === '/' || rawP === '/servers' || rawP === '/vps' || rawP === '/dashboard';

          if (!onHome) {
            // If navigating from an account subpage, navigate cleanly so React Router unmounts the account page!
            if (tab === 'servers') {
              window.location.href = '/servers';
            } else if (tab === 'vps') {
              window.location.href = '/vps';
            } else {
              window.location.href = '/';
            }
            return;
          }

          // If already on home (between /, /servers, /vps), switch smoothly
          e.preventDefault();
          if (tab === 'servers') {
            if (window.location.pathname !== '/servers') {
              history.pushState(null, '', '/servers');
            }
          } else if (tab === 'vps') {
            if (window.location.pathname !== '/vps') {
              history.pushState(null, '', '/vps');
            }
          } else if (tab === 'dashboard') {
            if (window.location.pathname !== '/') {
              history.pushState(null, '', '/');
            }
          }
          applyViewMode();
          window.scrollTo({ top: 0, behavior: 'smooth' });
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

    applyViewMode();
  }

  function initApparatus() {
    const isAuth = isAuthPage();
    const isHacking = isUnauthorizedAdminAttempt();

    if (isAuth || isHacking) {
      document.body.classList.add('apparatus-auth');
      if (isHacking) {
        document.body.classList.add('apparatus-hacking-mode');
      } else {
        document.body.classList.remove('apparatus-hacking-mode');
      }
    } else {
      document.body.classList.remove('apparatus-auth', 'apparatus-hacking-mode');
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
            <h1 class="background-title" id="apparatus-bg-title">ARIXBYTE</h1>
            <p class="background-subtitle" id="apparatus-bg-subtitle">CLOUD &amp; INFRASTRUCTURES</p>
          </div>

          <img src="/themes/apparatus/desert/img-4.svg" alt="" class="parallax-layer layer-4" />
          <img src="/themes/apparatus/desert/img-5.svg" alt="" class="parallax-layer layer-5" />
          <img src="/themes/apparatus/desert/img-6.svg" alt="" class="parallax-layer layer-6" />
          <img src="/themes/apparatus/desert/img-7.svg" alt="" class="parallax-layer layer-7" />
        </div>

        <div class="login-card" id="apparatus-card-slot"></div>
      `;

      document.body.prepend(wrapper);
    }
    setupParallax();

    const bgTitle = document.getElementById('apparatus-bg-title');
    const bgSubtitle = document.getElementById('apparatus-bg-subtitle');
    const cardSlot = document.getElementById('apparatus-card-slot');

    if (isHacking) {
      if (bgTitle) bgTitle.textContent = 'HACKING ATTEMPT';
      if (bgSubtitle) bgSubtitle.textContent = 'You Cannot Access is Page';
      renderHackingMode();
      return;
    } else {
      if (bgTitle) bgTitle.textContent = 'ARIXBYTE';
      if (bgSubtitle) bgSubtitle.textContent = 'CLOUD & INFRASTRUCTURES';
    }

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

  function renderHackingMode() {
    document.body.classList.add('apparatus-auth', 'apparatus-hacking-mode');

    const sidebar = document.getElementById('apparatus-sidebar');
    if (sidebar) sidebar.style.display = 'none';
    const toggle = document.getElementById('apparatus-mobile-toggle');
    if (toggle) toggle.style.display = 'none';
    const hero = document.getElementById('apparatus-dashboard-view');
    if (hero) hero.style.display = 'none';

    document.querySelectorAll('div[class*="AccountOverviewContainer"], div[class*="AccountApiContainer"], div[class*="AccountSSHContainer"], div[class*="ActivityLogContainer"], .sc-12to0iy-1, .sc-1c4s3nm-0, .sc-yksipt-0, p[class*="DashboardContainer"], .sc-1topkxf-3, div.bg-gray-700, [class*="PageContentBlock"], main, #app > div > div').forEach(function (el) {
      if (!el.classList.contains('desert-wrapper') && !el.closest('#apparatus-desert-wrapper')) {
        el.style.setProperty('display', 'none', 'important');
      }
    });

    const bgTitle = document.getElementById('apparatus-bg-title');
    if (bgTitle) bgTitle.textContent = 'HACKING ATTEMPT';

    const bgSubtitle = document.getElementById('apparatus-bg-subtitle');
    if (bgSubtitle) bgSubtitle.textContent = 'You Cannot Access is Page';

    const card = document.getElementById('apparatus-card-slot');
    if (!card) return;

    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.visibility = 'visible';

    const user = window.PterodactylUser;
    const isLoggedIn = !!(user && (user.uuid || user.username || user.email));
    const btnHref = isLoggedIn ? '/' : '/auth/login';
    const btnText = isLoggedIn ? 'Return to Dashboard' : 'Go to Login Page';
    const btnIcon = isLoggedIn ? 'ri-arrow-left-line' : 'ri-login-box-line';

    card.innerHTML = `
      <div class="hacking-warning-icon">
        <i class="ri-alert-fill"></i>
      </div>
      <h2 class="login-title" style="color: #ef4444; font-size: 1.55rem; margin-bottom: 0.35rem; font-weight: 800; letter-spacing: 0.02em;">ACCESS DENIED</h2>
      <p class="login-subtitle" style="margin-bottom: 1.5rem; color: rgba(255, 255, 255, 0.78); font-size: 0.92rem; line-height: 1.5;">
        You do not have permission to access this page.
      </p>
      <a href="${btnHref}" class="login-button apparatus-hacking-back-btn" style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; box-sizing: border-box;">
        <i class="${btnIcon}"></i> ${btnText}
      </a>
    `;

    const backBtn = card.querySelector('.apparatus-hacking-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', function (e) {
        if (isLoggedIn) {
          e.preventDefault();
          window.history.pushState({}, '', '/');
          document.body.classList.remove('apparatus-auth', 'apparatus-hacking-mode');
          if (bgTitle) bgTitle.textContent = 'ARIXBYTE';
          if (bgSubtitle) bgSubtitle.textContent = 'CLOUD & INFRASTRUCTURES';
          initApparatus();
          applyViewMode();
        }
      });
    }

    if (typeof gsap !== 'undefined') {
      gsap.set(".desert-wrapper", { backgroundColor: "#F7ABAE", display: "block" });
      gsap.set(".parallax-container", { scale: 1, opacity: 1, visibility: "visible" });
    }
    setupParallax();
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
  let parallaxInitialized = false;
  function setupParallax() {
    if (typeof gsap === 'undefined') {
      setTimeout(setupParallax, 50);
      return;
    }

    gsap.set(".desert-wrapper", { backgroundColor: "#F7ABAE" });
    gsap.set(".parallax-container", { scale: 1, opacity: 1, visibility: "visible" });

    const slot = document.getElementById('apparatus-card-slot');
    if (slot) {
      const shouldShow = isAuthPage() || isUnauthorizedAdminAttempt();
      slot.style.display = shouldShow ? 'block' : 'none';
      if (shouldShow) {
        slot.style.opacity = '1';
        slot.style.visibility = 'visible';
      }
    }

    if (parallaxInitialized) return;
    parallaxInitialized = true;

    gsap.fromTo(".login-card", 
      { autoAlpha: 0, y: 35, scale: 0.96 }, 
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out", delay: 0.05 }
    );

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

  
  // Global click interception: block non-admins attempting to access /admin
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href*="/admin"], a[data-path="/admin"]');
    if (!a) return;
    const user = window.PterodactylUser;
    const isRootAdmin = !!(user && user.root_admin);
    if (!isRootAdmin) {
      e.preventDefault();
      e.stopPropagation();
      window.history.pushState({}, '', '/admin');
      initApparatus();
    }
  }, true);

  // Dynamic cleanup and route sync observer for Pterodactyl SPA updates
  let lastObservedPath = window.location.pathname;
  const apparatusObserver = new MutationObserver(function () {
    if (!isAuthPage() && !isUnauthorizedAdminAttempt()) {
      cleanPterodactylElements();
      if (window.location.pathname !== lastObservedPath) {
        lastObservedPath = window.location.pathname;
        applyViewMode();
      }
    }
  });
  apparatusObserver.observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener('popstate', function () {
    initApparatus();
    applyViewMode();
  });
  window.addEventListener('hashchange', applyViewMode);

  const origPushState = history.pushState;
  if (origPushState) {
    history.pushState = function () {
      origPushState.apply(this, arguments);
      setTimeout(function () {
        initApparatus();
        applyViewMode();
      }, 20);
    };
  }

  const origReplaceState = history.replaceState;
  if (origReplaceState) {
    history.replaceState = function () {
      origReplaceState.apply(this, arguments);
      setTimeout(function () {
        applyViewMode();
      }, 20);
    };
  }
})();
