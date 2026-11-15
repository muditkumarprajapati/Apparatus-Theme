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


  // Accurate Active Sidebar Route Highlighting
  function updateActiveSidebarLinks() {
    const rawPath = window.location.pathname || '/';
    // Normalize path by stripping trailing slash (unless root '/')
    const currentPath = (rawPath.length > 1 && rawPath.endsWith('/')) ? rawPath.slice(0, -1) : rawPath;

    const isServerTab = currentPath === '/servers' || currentPath.startsWith('/servers/') || window.location.hash === '#servers';
    const isDashboardTab = (currentPath === '/' || currentPath === '/dashboard') && !isServerTab;

    const links = document.querySelectorAll('.apparatus-nav-link[data-path], .apparatus-nav-link[data-tab]');
    links.forEach(function (link) {
      const tab = link.getAttribute('data-tab');
      const pAttr = link.getAttribute('data-path');
      const p = pAttr ? ((pAttr.length > 1 && pAttr.endsWith('/')) ? pAttr.slice(0, -1) : pAttr) : '';

      let isActive = false;

      if (tab === 'dashboard' || p === '/') {
        isActive = isDashboardTab;
      } else if (tab === 'servers' || p === '/servers') {
        isActive = isServerTab;
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
    if (isAuthPage()) return;

    const rawPath = window.location.pathname || '/';
    const currentPath = (rawPath.length > 1 && rawPath.endsWith('/')) ? rawPath.slice(0, -1) : rawPath;

    const isServerTab = currentPath === '/servers' || currentPath.startsWith('/servers/') || window.location.hash === '#servers';
    const isDashboardTab = (currentPath === '/' || currentPath === '/dashboard') && !isServerTab;
    const isHomeRoute = isDashboardTab || isServerTab;

    const hero = document.getElementById('apparatus-dashboard-view');

    if (isHomeRoute) {
      if (hero) hero.style.display = 'block';

      if (isServerTab) {
        document.body.classList.add('apparatus-page-servers');
        document.body.classList.remove('apparatus-page-dashboard');
      } else {
        document.body.classList.add('apparatus-page-dashboard');
        document.body.classList.remove('apparatus-page-servers');
      }

      // Hide all account containers and native server messages if user transitioned to home
      document.querySelectorAll('div[class*="AccountOverviewContainer"], div[class*="AccountApiContainer"], div[class*="AccountSSHContainer"], div[class*="ActivityLogContainer"], .sc-12to0iy-1, .sc-1c4s3nm-0, .sc-yksipt-0, p[class*="DashboardContainer"], .sc-1topkxf-3').forEach(function (el) {
        el.style.setProperty('display', 'none', 'important');
      });
    } else {
      if (hero) hero.style.display = 'none';
      document.body.classList.remove('apparatus-page-dashboard', 'apparatus-page-servers', 'apparatus-view-dashboard', 'apparatus-view-servers');

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
    if (isAuthPage()) return;

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
    const isDash = (curP === '/' || curP === '/dashboard') && !isSrv;
    if (isDash || isSrv) {
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
          }
        }
      }
    } catch (e) {}
  }

  // Activity Log IP Blur & Flag enhancement (No capsule, smooth blur reveal like dashboard email)
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
          container.className = 'apparatus-ip-container';
          container.title = 'Click to check IP location (' + ip + ')';

          const isLocal = isPrivateIp(ip);
          if (isLocal) {
            container.innerHTML = '<i class="ri-shield-keyhole-line apparatus-ip-local-icon" title="Localhost / Proxy IP"></i><span class="apparatus-ip-blurred">' + ip + '</span>';
          } else {
            const flagImg = document.createElement('img');
            flagImg.className = 'apparatus-ip-flag';
            flagImg.alt = 'Flag';
            flagImg.style.display = 'none';

            const fallbackIcon = document.createElement('i');
            fallbackIcon.className = 'ri-global-line apparatus-ip-global-icon';

            container.appendChild(flagImg);
            container.appendChild(fallbackIcon);

            const ipSpan = document.createElement('span');
            ipSpan.className = 'apparatus-ip-blurred';
            ipSpan.textContent = ip;
            container.appendChild(ipSpan);

            flagImg.onload = function () {
              fallbackIcon.style.display = 'none';
            };

            resolveIpCountry(ip, flagImg);
          }

          s.innerHTML = '';
          s.appendChild(container);
          const divider = document.createElement('span');
          divider.className = 'text-gray-400';
          divider.innerHTML = '&nbsp;|&nbsp;';
          s.appendChild(divider);
          break;
        }
      }
    }
  }

  // Event formatters for Recent Activity
  function formatEventName(event) {
    if (!event) return 'Account Event';
    const map = {
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
        }
        if (attr.email) {
          const eEl = document.getElementById('apparatus-email-val') || document.getElementById('apparatus-email-real');
          if (eEl) eEl.textContent = attr.email;
        }
        if (attr.admin !== undefined) {
          const rEl = document.getElementById('apparatus-stat-role');
          if (rEl) rEl.textContent = attr.admin ? 'Administrator' : 'User';
        }
      }
    } catch (e) {}

    // 2. Fetch Servers
    try {
      const srvRes = await fetch('/api/client', { headers: { Accept: 'application/json' } });
      const container = document.getElementById('apparatus-servers-list');
      const countBadge = document.getElementById('apparatus-server-badge');
      const ownedStat = document.getElementById('apparatus-stat-servers-owned');

      if (srvRes.ok) {
        const srvData = await srvRes.json();
        const servers = srvData.data || [];
        const total = (srvData.meta && srvData.meta.pagination && srvData.meta.pagination.total !== undefined)
          ? srvData.meta.pagination.total
          : servers.length;

        if (countBadge) countBadge.textContent = total + (total === 1 ? ' Server' : ' Servers');
        if (ownedStat) ownedStat.textContent = total;

        if (servers.length === 0) {
          if (container) {
            container.innerHTML = `
              <div class="apparatus-empty-servers">
                <div class="apparatus-empty-icon"><i class="ri-server-line"></i></div>
                <h3 class="apparatus-empty-title">No Servers Found</h3>
                <p class="apparatus-empty-desc">
                  You don't have any active servers. Purchase one from our website to get started.
                </p>
                <div class="apparatus-empty-actions">
                  <a href="https://arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-primary">
                    Purchase Now from our Website <i class="ri-external-link-line"></i>
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
              const node = attr.node || 'ArixByte';
              const mem = attr.limits && attr.limits.memory !== undefined ? (attr.limits.memory === 0 ? 'Unlimited' : attr.limits.memory + ' MB') : 'Standard';
              const cpu = attr.limits && attr.limits.cpu !== undefined ? (attr.limits.cpu === 0 ? 'Unlimited' : attr.limits.cpu + '%') : 'Standard';
              const disk = attr.limits && attr.limits.disk !== undefined ? (attr.limits.disk === 0 ? 'Unlimited' : attr.limits.disk + ' MB') : 'Standard';

              html += `
                <div class="apparatus-server-item">
                  <div>
                    <h4 class="apparatus-server-name">${name}</h4>
                    <div class="apparatus-server-stats">
                      <span><i class="ri-cpu-line"></i> ${cpu}</span>
                      <span><i class="ri-database-2-line"></i> ${mem}</span>
                      <span><i class="ri-hard-drive-line"></i> ${disk}</span>
                    </div>
                  </div>
                  <a href="/server/${id}" class="apparatus-server-btn">
                    Manage <i class="ri-arrow-right-s-line"></i>
                  </a>
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
    if (countBadge) countBadge.textContent = '0 Servers';
    if (container) {
      container.innerHTML = `
        <div class="apparatus-empty-servers">
          <div class="apparatus-empty-icon"><i class="ri-server-line"></i></div>
          <h3 class="apparatus-empty-title">No Servers Found</h3>
          <p class="apparatus-empty-desc">
            You don't have any active servers. Purchase one from our website to get started.
          </p>
          <div class="apparatus-empty-actions">
            <a href="https://arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-primary">
              Purchase Now from our Website <i class="ri-external-link-line"></i>
            </a>
          </div>
        </div>
      `;
    }
  }

  // Initialize the 4-Card Transparent Dashboard
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

    dash.innerHTML = `
      <div class="apparatus-dashboard-container">
        <!-- Left Column: Area 1 (Welcome) & Area 4 (Servers) -->
        <div class="apparatus-dash-col apparatus-dash-left">
          
          <!-- Area 1: Welcome -->
          <div class="apparatus-card apparatus-card-welcome" id="apparatus-area-1">
            <div class="apparatus-welcome-content">
              <h1 class="apparatus-welcome-title">Hello, <span class="apparatus-user-name" id="apparatus-welcome-username">${username}</span></h1>
              <p class="apparatus-welcome-desc">Welcome to your server control panel.</p>
              <div class="apparatus-welcome-actions">
                <a href="/servers" class="apparatus-btn apparatus-btn-primary" id="apparatus-btn-to-servers">
                  <i class="ri-server-line"></i> View Servers
                </a>
                <a href="/account" class="apparatus-btn apparatus-btn-glass">
                  <i class="ri-user-settings-line"></i> Account Settings
                </a>
                <a href="https://discord.arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-glass">
                  <i class="ri-discord-fill"></i> Discord
                </a>
              </div>
            </div>
            <div class="apparatus-welcome-decor" aria-hidden="true">
              <i class="ri-cloud-line"></i>
            </div>
          </div>

          <!-- Area 4: Servers -->
          <div class="apparatus-card apparatus-card-servers" id="apparatus-area-4">
            <div class="apparatus-card-header">
              <h2 class="apparatus-card-title">Servers</h2>
              <span class="apparatus-pill" id="apparatus-server-badge">0 Servers</span>
            </div>
            <div class="apparatus-servers-content" id="apparatus-servers-list">
              <div class="apparatus-empty-msg">Loading servers...</div>
            </div>
          </div>
        </div>

        <!-- Right Column: Area 2 (Recent Activity) & Area 3 (Account) -->
        <div class="apparatus-dash-col apparatus-dash-right">
          
          <!-- Area 2: Recent Activity -->
          <div class="apparatus-card apparatus-card-activity" id="apparatus-area-2">
            <div class="apparatus-card-header">
              <h2 class="apparatus-card-title">Recent Activity</h2>
              <a href="/account/activity" class="apparatus-link">View All <i class="ri-arrow-right-s-line"></i></a>
            </div>
            <div class="apparatus-activity-list" id="apparatus-activity-list">
              <div class="apparatus-empty-msg">Loading activity...</div>
            </div>
          </div>

          <!-- Area 3: Account Credentials -->
          <div class="apparatus-card apparatus-card-account" id="apparatus-area-3">
            <div class="apparatus-card-header">
              <h2 class="apparatus-card-title">Account</h2>
              <span class="apparatus-pill apparatus-pill-green">Active</span>
            </div>

            <div class="apparatus-account-rows">
              <!-- Email (Blurred, cursor hover reveals) -->
              <div class="apparatus-row">
                <span class="apparatus-row-label">Email</span>
                <span class="apparatus-email-blurred" id="apparatus-email-val" title="Hover to reveal">${email}</span>
              </div>

              <!-- Servers Owned -->
              <div class="apparatus-row">
                <span class="apparatus-row-label">Servers Owned</span>
                <span class="apparatus-row-val" id="apparatus-stat-servers-owned">0</span>
              </div>

              <!-- Active Tickets -->
              <div class="apparatus-row">
                <span class="apparatus-row-label">Active Tickets</span>
                <span class="apparatus-row-val">
                  0 Active &middot; <a href="https://discord.arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-inline-link">Support</a>
                </span>
              </div>

              <!-- 2FA -->
              <div class="apparatus-row">
                <span class="apparatus-row-label">Two-Factor Auth</span>
                <span class="apparatus-row-val" id="apparatus-stat-2fa">
                  ${useTotp ? '<span class="status-on">Enabled</span>' : '<span class="status-off">Disabled</span>'}
                </span>
              </div>

              <!-- Role -->
              <div class="apparatus-row">
                <span class="apparatus-row-label">Role</span>
                <span class="apparatus-row-val" id="apparatus-stat-role">
                  ${isRootAdmin ? 'Administrator' : 'User'}
                </span>
              </div>
            </div>

            <div class="apparatus-account-footer">
              <a href="/account" class="apparatus-btn apparatus-btn-glass apparatus-btn-full">
                Manage Account
              </a>
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
        const onHome = rawP === '/' || rawP === '/servers' || rawP === '/dashboard';
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

    // Toggle reveal for mobile touch
    const emailEl = document.getElementById('apparatus-email-val');
    if (emailEl) {
      emailEl.addEventListener('click', function () {
        emailEl.classList.toggle('revealed');
      });
    }

    // Load dynamic data
    loadDashboardApiData();
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

    // Initialize 4-card transparent dashboard
    initDashboardView();

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
          const rawP = window.location.pathname || '/';
          const onHome = rawP === '/' || rawP === '/servers' || rawP === '/dashboard';

          if (!onHome) {
            // If navigating from an account subpage, navigate cleanly so React Router unmounts the account page!
            if (tab === 'servers') {
              window.location.href = '/servers';
            } else {
              window.location.href = '/';
            }
            return;
          }

          // If already on home (between / and /servers), switch smoothly
          e.preventDefault();
          if (tab === 'servers') {
            if (window.location.pathname !== '/servers') {
              history.pushState(null, '', '/servers');
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

  
  // Dynamic cleanup and route sync observer for Pterodactyl SPA updates
  let lastObservedPath = window.location.pathname;
  const apparatusObserver = new MutationObserver(function () {
    if (!isAuthPage()) {
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
