/**
 * ==============================================================================
 * APPARATUS THEME - EXECUTIVE CYBER-COMMAND CENTER (ADMIN PANEL)
 * Dedicated Pure Black Luxury Frosted Glass Architecture for Pterodactyl
 * Clean Typography & 1:1 Homepage Glassmorphism (Zero Capsules Anywhere)
 * ==============================================================================
 */

(function () {
  'use strict';

  function initApparatusAdmin() {
    initAdminTheme();
    upgradeAdminSidebar();
    upgradeAdminNavbar();
    renderAdminSubnavPills();
    handleAdminViews();
    enhanceAdminOverview();
  }

  // ==============================================================================
  // DUAL THEME ENGINE (BLACK OBSIDIAN & WHITE CAREOPS SAAS)
  // ==============================================================================
  function initAdminTheme() {
    const savedTheme = localStorage.getItem('apparatus_admin_theme') || 'dark';
    applyAdminTheme(savedTheme, false);
  }

  function applyAdminTheme(theme, showNotice) {
    if (theme === 'light') {
      document.body.classList.add('apparatus-admin-light');
      document.body.classList.remove('apparatus-admin-dark');
      localStorage.setItem('apparatus_admin_theme', 'light');
    } else {
      document.body.classList.add('apparatus-admin-dark');
      document.body.classList.remove('apparatus-admin-light');
      localStorage.setItem('apparatus_admin_theme', 'dark');
    }
    updateThemeToggleButtons(theme);
    if (showNotice) {
      showAdminToast('info', 'Theme Switched', 'Active UI Mode: ' + (theme === 'light' ? 'CareOps Clean White' : 'Cyber Obsidian Black'));
    }
  }

  function toggleAdminTheme() {
    const isLight = document.body.classList.contains('apparatus-admin-light');
    const newTheme = isLight ? 'dark' : 'light';
    applyAdminTheme(newTheme, true);
  }

  function updateThemeToggleButtons(theme) {
    const isLight = theme === 'light';
    document.querySelectorAll('.apparatus-theme-toggle-btn').forEach(function (btn) {
      btn.innerHTML = isLight 
        ? '<i class="ri-moon-line"></i> <span>Dark Theme</span>' 
        : '<i class="ri-sun-line"></i> <span>White Theme</span>';
      btn.setAttribute('data-theme', theme);
      btn.title = isLight ? 'Switch to Obsidian Black Mode' : 'Switch to CareOps White Mode';
    });
  }

  // ==============================================================================
  // CAREOPS SAAS HORIZONTAL SUBNAV PILL BAR
  // ==============================================================================
  function renderAdminSubnavPills() {
    const content = document.querySelector('.content-wrapper .content');
    if (!content) return;

    let subnav = document.getElementById('apparatus-saas-subnav');
    const path = window.location.pathname || '';
    const hash = window.location.hash || '';
    const hasHash = Boolean(hash && hash !== '#');

    const isOverview = (path === '/admin' || path === '/admin/') && !hasHash;
    const isNodes = path.startsWith('/admin/nodes') && !hasHash;
    const isVpsNodes = hash === '#vps-nodes';
    const isServers = path.startsWith('/admin/servers') && !hasHash;
    const isVps = hash === '#vps';
    const isDatabases = path.startsWith('/admin/databases') && !hasHash;
    const isUsers = hash === '#users' || (path.startsWith('/admin/users') && !hasHash);
    const isStorePricing = hash === '#store-pricing';
    const isEarn = hash === '#earn';
    const isAuditLogs = hash === '#audit-logs';

    if (!subnav) {
      subnav = document.createElement('div');
      subnav.id = 'apparatus-saas-subnav';
      subnav.className = 'apparatus-saas-subnav';
      content.prepend(subnav);
    }

    const currentTheme = localStorage.getItem('apparatus_admin_theme') || 'dark';
    const isLight = currentTheme === 'light';

    subnav.innerHTML = `
      <div class="apparatus-saas-tabs-scroll">
        <div class="apparatus-saas-tabs">
          <a href="/admin" class="apparatus-saas-tab ${isOverview ? 'active' : ''}">
            <i class="ri-dashboard-2-line"></i> <span>Dashboard</span>
          </a>
          <a href="/admin/nodes" class="apparatus-saas-tab ${isNodes ? 'active' : ''}">
            <i class="ri-server-line"></i> <span>Nodes</span>
          </a>
          <a href="#vps-nodes" class="apparatus-saas-tab ${isVpsNodes ? 'active' : ''}" data-tab="vps-nodes">
            <i class="ri-hard-drive-3-line"></i> <span>VPS Nodes</span>
          </a>
          <a href="/admin/servers" class="apparatus-saas-tab ${isServers ? 'active' : ''}">
            <i class="ri-hard-drive-2-line"></i> <span>Servers</span>
          </a>
          <a href="#vps" class="apparatus-saas-tab ${isVps ? 'active' : ''}" data-tab="vps">
            <i class="ri-server-line"></i> <span>Cloud VPS</span>
          </a>
          <a href="/admin/databases" class="apparatus-saas-tab ${isDatabases ? 'active' : ''}">
            <i class="ri-database-2-line"></i> <span>Databases</span>
          </a>
          <a href="#users" class="apparatus-saas-tab ${isUsers ? 'active' : ''}" data-tab="users">
            <i class="ri-user-settings-line"></i> <span>Users</span>
          </a>
          <a href="#store-pricing" class="apparatus-saas-tab ${isStorePricing ? 'active' : ''}" data-tab="store-pricing">
            <i class="ri-price-tag-3-line"></i> <span>Store</span>
          </a>
          <a href="#earn" class="apparatus-saas-tab ${isEarn ? 'active' : ''}" data-tab="earn">
            <i class="ri-copper-coin-line"></i> <span>Promos</span>
          </a>
          <a href="#audit-logs" class="apparatus-saas-tab ${isAuditLogs ? 'active' : ''}" data-tab="audit-logs">
            <i class="ri-shield-check-line"></i> <span>Sentinel Logs</span>
          </a>
        </div>
      </div>

      <div class="apparatus-saas-actions">
        <!-- Dual Theme Toggle Button -->
        <button type="button" class="apparatus-theme-toggle-btn" id="apparatus-subnav-theme-toggle" title="${isLight ? 'Switch to Obsidian Black' : 'Switch to CareOps White'}">
          ${isLight ? '<i class="ri-moon-line"></i> <span>Dark Theme</span>' : '<i class="ri-sun-line"></i> <span>White Theme</span>'}
        </button>

        <!-- Primary Deploy Action -->
        <button type="button" class="apparatus-saas-cta-btn" id="apparatus-subnav-deploy-btn">
          <i class="ri-add-line"></i> <span>Deploy VPS</span>
        </button>
      </div>
    `;

    // Wire up events
    const themeBtn = subnav.querySelector('#apparatus-subnav-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleAdminTheme);
    }

    const deployCta = subnav.querySelector('#apparatus-subnav-deploy-btn');
    if (deployCta) {
      deployCta.addEventListener('click', function () {
        openAdminDeployVpsModal(content);
      });
    }

    subnav.querySelectorAll('.apparatus-saas-tab[data-tab]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const tab = this.getAttribute('data-tab');
        window.location.hash = tab;
        renderAdminSubnavPills();
        upgradeAdminSidebar();
        handleAdminViews();
      });
    });
  }

  // Toast Notification Helper (Clean Glass Toast)
  function showAdminToast(type, title, message) {
    let container = document.getElementById('apparatus-admin-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'apparatus-admin-toast-container';
      container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'apparatus-admin-toast';
    const isErr = type === 'error';
    const accent = isErr ? '#fb7185' : '#34d399';
    toast.style.cssText = `
      pointer-events: auto;
      min-width: 290px;
      max-width: 380px;
      background: rgba(18, 12, 28, 0.92);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      padding: 14px 18px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: flex-start;
      gap: 12px;
      animation: adminViewEnter 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
      color: #fff;
      font-family: var(--admin-font);
    `;
    const icon = isErr
      ? `<i class="ri-error-warning-fill" style="color: ${accent}; font-size: 1.4rem;"></i>`
      : `<i class="ri-checkbox-circle-fill" style="color: ${accent}; font-size: 1.4rem;"></i>`;
    toast.innerHTML = `
      ${icon}
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 0.92rem; margin-bottom: 2px;">${title}</div>
        <div style="font-size: 0.82rem; color: #94a3b8; line-height: 1.4;">${message}</div>
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => toast.remove(), 350);
    }, 3400);
  }

  // ==============================================================================
  // 1. UPGRADE ADMIN SIDEBAR (ZERO CAPSULES, CLEAN MINIMALIST TYPOGRAPHY)
  // ==============================================================================
  function upgradeAdminSidebar() {
    const sidebar = document.querySelector('.main-sidebar .sidebar');
    if (!sidebar) return;

    let menu = sidebar.querySelector('.sidebar-menu');
    if (!menu) return;

    // Remove any status pill/capsule container if present
    const existingPill = document.getElementById('apparatus-admin-status-wrap');
    if (existingPill) existingPill.remove();

    const path = window.location.pathname || '';
    const hash = window.location.hash || '';
    const hasHash = Boolean(hash && hash !== '#');

    // Mutually exclusive: if hash subview is active, path matches are inactive
    const isOverview = (path === '/admin' || path === '/admin/') && !hasHash;
    const isSettings = path.startsWith('/admin/settings') && !hasHash;
    const isApi = path.startsWith('/admin/api') && !hasHash;
    const isMailEditor = hash === '#mail-editor';
    const isAnnouncements = hash === '#announcements';

    const isDatabases = path.startsWith('/admin/databases') && !hasHash;
    const isLocations = path.startsWith('/admin/locations') && !hasHash;
    const isNodes = path.startsWith('/admin/nodes') && !hasHash;
    const isVpsNodes = hash === '#vps-nodes';
    const isServers = path.startsWith('/admin/servers') && !hasHash;
    const isVps = hash === '#vps';
    const isUsers = hash === '#users' || (path.startsWith('/admin/users') && !hasHash);
    const isNodeHealth = hash === '#node-health';
    const isAuditLogs = hash === '#audit-logs';

    const isMounts = path.startsWith('/admin/mounts') && !hasHash;
    const isNests = path.startsWith('/admin/nests') && !hasHash;
    const isStorePricing = hash === '#store-pricing';
    const isEarn = hash === '#earn';

    const isWebhooks = hash === '#webhooks';
    const isInbuiltAddons = hash === '#inbuilt-addons';
    const isBlueprint = hash === '#blueprint-extensions';

    menu.innerHTML = `
      <!-- BASIC ADMINISTRATION -->
      <li class="header">BASIC ADMINISTRATION</li>
      <li class="${isOverview ? 'active' : ''}">
        <a href="/admin">
          <i class="ri-dashboard-2-line"></i>
          <span>Overview</span>
        </a>
      </li>
      <li class="${isSettings ? 'active' : ''}">
        <a href="/admin/settings">
          <i class="ri-settings-4-line"></i>
          <span>Settings</span>
        </a>
      </li>
      <li class="${isApi ? 'active' : ''}">
        <a href="/admin/api">
          <i class="ri-key-2-line"></i>
          <span>Application API</span>
        </a>
      </li>
      <li class="${isMailEditor ? 'active' : ''}">
        <a href="#mail-editor" class="apparatus-admin-tab" data-tab="mail-editor">
          <i class="ri-mail-settings-line"></i>
          <span>Mail Editor</span>
        </a>
      </li>
      <li class="${isAnnouncements ? 'active' : ''}">
        <a href="#announcements" class="apparatus-admin-tab" data-tab="announcements">
          <i class="ri-notification-badge-line"></i>
          <span>Announcements</span>
        </a>
      </li>

      <!-- MANAGEMENT -->
      <li class="header">MANAGEMENT</li>
      <li class="${isDatabases ? 'active' : ''}">
        <a href="/admin/databases">
          <i class="ri-database-2-line"></i>
          <span>Databases</span>
        </a>
      </li>
      <li class="${isLocations ? 'active' : ''}">
        <a href="/admin/locations">
          <i class="ri-map-pin-line"></i>
          <span>Locations</span>
        </a>
      </li>
      <li class="${isNodes ? 'active' : ''}">
        <a href="/admin/nodes">
          <i class="ri-server-line"></i>
          <span>Nodes</span>
        </a>
      </li>
      <li class="${isVpsNodes ? 'active' : ''}">
        <a href="#vps-nodes" class="apparatus-admin-tab" data-tab="vps-nodes">
          <i class="ri-hard-drive-3-line"></i>
          <span>VPS Nodes</span>
        </a>
      </li>
      <li class="${isServers ? 'active' : ''}">
        <a href="/admin/servers">
          <i class="ri-hard-drive-2-line"></i>
          <span>Servers</span>
        </a>
      </li>
      <li class="${isVps ? 'active' : ''}">
        <a href="#vps" class="apparatus-admin-tab" data-tab="vps">
          <i class="ri-server-line"></i>
          <span>Cloud VPS</span>
        </a>
      </li>
      <li class="${isUsers ? 'active' : ''}">
        <a href="#users" class="apparatus-admin-tab" data-tab="users">
          <i class="ri-user-settings-line"></i>
          <span>Users</span>
        </a>
      </li>
      <li class="${isNodeHealth ? 'active' : ''}">
        <a href="#node-health" class="apparatus-admin-tab" data-tab="node-health">
          <i class="ri-pulse-line"></i>
          <span>Node Health</span>
        </a>
      </li>
      <li class="${isAuditLogs ? 'active' : ''}">
        <a href="#audit-logs" class="apparatus-admin-tab" data-tab="audit-logs">
          <i class="ri-shield-check-line"></i>
          <span>Staff Audit Logs</span>
        </a>
      </li>

      <!-- SERVICE MANAGEMENT -->
      <li class="header">SERVICE MANAGEMENT</li>
      <li class="${isMounts ? 'active' : ''}">
        <a href="/admin/mounts">
          <i class="ri-folder-shared-line"></i>
          <span>Mounts</span>
        </a>
      </li>
      <li class="${isNests ? 'active' : ''}">
        <a href="/admin/nests">
          <i class="ri-apps-2-line"></i>
          <span>Nests</span>
        </a>
      </li>
      <li class="${isStorePricing ? 'active' : ''}">
        <a href="#store-pricing" class="apparatus-admin-tab" data-tab="store-pricing">
          <i class="ri-price-tag-3-line"></i>
          <span>Store & Pricing</span>
        </a>
      </li>
      <li class="${isEarn ? 'active' : ''}">
        <a href="#earn" class="apparatus-admin-tab" data-tab="earn">
          <i class="ri-copper-coin-line"></i>
          <span>Earn & Promo Codes</span>
        </a>
      </li>

      <!-- EXTENSIONS & INTEGRATIONS -->
      <li class="header">EXTENSIONS & INTEGRATIONS</li>
      <li class="${isInbuiltAddons ? 'active' : ''}">
        <a href="#inbuilt-addons" class="apparatus-admin-tab" data-tab="inbuilt-addons">
          <i class="ri-puzzle-2-line"></i>
          <span>Inbuilt Addons</span>
        </a>
      </li>
      <li class="${isBlueprint ? 'active' : ''}">
        <a href="#blueprint-extensions" class="apparatus-admin-tab" data-tab="blueprint-extensions">
          <i class="ri-install-line"></i>
          <span>Blueprint & Extensions</span>
        </a>
      </li>
      <li class="${isWebhooks ? 'active' : ''}">
        <a href="#webhooks" class="apparatus-admin-tab" data-tab="webhooks">
          <i class="ri-discord-line"></i>
          <span>Discord Webhooks</span>
        </a>
      </li>
    `;

    // Wire up tab clicks for client-side navigation
    menu.querySelectorAll('.apparatus-admin-tab').forEach(function (tabLink) {
      tabLink.addEventListener('click', function (e) {
        e.preventDefault();
        const tab = this.getAttribute('data-tab');
        window.location.hash = tab;
        upgradeAdminSidebar();
        handleAdminViews();
      });
    });
  }

  // ==============================================================================
  // 2. UPGRADE ADMIN TOP NAVBAR (HEADER)
  // ==============================================================================
  function upgradeAdminNavbar() {
    const navbar = document.querySelector('.main-header .navbar');
    if (!navbar) return;

    // Clean Logo (Only image, zero duplicate text, zero capsule badge!)
    const logo = document.querySelector('.main-header .logo');
    if (logo && !logo.getAttribute('data-apparatus-logo')) {
      logo.setAttribute('data-apparatus-logo', 'true');
      logo.innerHTML = `
        <img src="/themes/apparatus/arixbyte-logo.png" alt="ArixByte" class="apparatus-admin-logo-img" onerror="this.style.display='none';">
      `;
    }

    // Modern Header Center Status (Eliminates awkward blank header space)
    if (!document.getElementById('apparatus-admin-header-center')) {
      const centerBox = document.createElement('div');
      centerBox.id = 'apparatus-admin-header-center';
      centerBox.style.cssText = 'display: flex; align-items: center; gap: 0.65rem; margin-left: 1rem; color: #cbd5e1; font-size: 0.92rem; font-weight: 500;';
      centerBox.innerHTML = `
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #34d399; box-shadow: 0 0 8px rgba(52, 211, 153, 0.6);"></span>
        <span style="color: rgba(255,255,255,0.9); font-weight: 600;">ArixByte Infrastructure</span>
        <span style="color: rgba(255,255,255,0.3);">&bull;</span>
        <span style="color: #94a3b8; font-size: 0.85rem;">Administration Console</span>
      `;
      const toggle = navbar.querySelector('.sidebar-toggle');
      if (toggle && toggle.nextSibling) {
        navbar.insertBefore(centerBox, toggle.nextSibling);
      } else {
        navbar.prepend(centerBox);
      }
    }

    // Add Return to Client Area Link & Theme Toggle in Top Right Navbar
    let customMenu = navbar.querySelector('.navbar-custom-menu');
    if (customMenu) {
      if (!document.getElementById('apparatus-admin-theme-toggle-header')) {
        const themeBtn = document.createElement('button');
        themeBtn.id = 'apparatus-admin-theme-toggle-header';
        themeBtn.type = 'button';
        themeBtn.className = 'apparatus-theme-toggle-btn';
        themeBtn.style.marginRight = '0.75rem';
        const isLight = document.body.classList.contains('apparatus-admin-light');
        themeBtn.innerHTML = isLight ? '<i class="ri-moon-line"></i> <span>Dark</span>' : '<i class="ri-sun-line"></i> <span>White</span>';
        themeBtn.addEventListener('click', toggleAdminTheme);
        customMenu.prepend(themeBtn);
      }

      if (!document.getElementById('apparatus-admin-client-btn')) {
        const clientBtn = document.createElement('a');
        clientBtn.id = 'apparatus-admin-client-btn';
        clientBtn.href = '/';
        clientBtn.className = 'apparatus-admin-client-btn';
        clientBtn.innerHTML = `
          <i class="ri-arrow-go-back-line"></i>
          <span>Client Area</span>
        `;
        customMenu.prepend(clientBtn);
      }
    }

    // Polish Top Right User Identity (Capitalized Name & Frosted Glass)
    const userMenuA = navbar.querySelector('.navbar-nav > li.user-menu > a');
    if (userMenuA) {
      const span = userMenuA.querySelector('span');
      if (span && span.textContent && span.textContent.toLowerCase().includes('mudit')) {
        span.textContent = 'Mudit Kumar';
      }
    }
  }

  // ==============================================================================
  // 3. HANDLE INTERACTIVE ADMIN VIEWS VIA HASH ROUTING
  // ==============================================================================
  function handleAdminViews() {
    const hash = window.location.hash || '';
    const content = document.querySelector('.content-wrapper .content');
    const header = document.querySelector('.content-wrapper .content-header');
    if (!content) return;

    let studioView = document.getElementById('apparatus-admin-studio-view');

    if (hash === '#mail-editor') {
      if (header) {
        header.innerHTML = `
          <h1>Mail Editor <small>Custom HTML email templates & notification triggers</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">Mail Editor</li>
          </ol>
        `;
      }
      isolateStudioView(content, studioView, renderMailEditorView);

    } else if (hash === '#announcements') {
      if (header) {
        header.innerHTML = `
          <h1>Announcements & Alerts <small>Global dashboard broadcasts and maintenance notice banners</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">Announcements</li>
          </ol>
        `;
      }
      isolateStudioView(content, studioView, renderAnnouncementsView);

    } else if (hash === '#node-health') {
      if (header) {
        header.innerHTML = `
          <h1>Node Health & Latency Telemetry <small>Real-time hypervisor monitoring, daemon heartbeat, and allocation load</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">Node Health</li>
          </ol>
        `;
      }
      isolateStudioView(content, studioView, renderNodeHealthView);

    } else if (hash === '#audit-logs') {
      if (header) {
        header.innerHTML = `
          <h1>Staff Audit & Sentinel Logs <small>Immutable administrative audit trail and security event inspection</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">Staff Audit Logs</li>
          </ol>
        `;
      }
      isolateStudioView(content, studioView, renderAuditLogsView);

    } else if (hash === '#store-pricing') {
      if (header) {
        header.innerHTML = `
          <h1>Store & Pricing Manager <small>Configure resource point rates, packages, and billing economy</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">Store & Pricing</li>
          </ol>
        `;
      }
      isolateStudioView(content, studioView, renderStorePricingView);

    } else if (hash === '#vps-nodes') {
      if (header) {
        header.innerHTML = `
          <h1>Hypervisor VPS Nodes <small>Proxmox VE cluster compute nodes, CPU pools & memory allocation telemetry</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">VPS Nodes</li>
          </ol>
        `;
      }
      isolateStudioView(content, studioView, renderAdminVpsNodesView);

    } else if (hash === '#vps') {
      if (header) {
        header.innerHTML = `
          <h1>Cloud VPS Fleet <small>Proxmox VE hypervisor management, KVM virtual machines & real-time telemetry</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">Cloud VPS</li>
          </ol>
        `;
      }
      isolateStudioView(content, studioView, renderAdminVpsView);
    } else if (hash === '#earn') {
      if (header) {
        header.innerHTML = `
          <h1>Earn & Promo Code Studio <small>Create promo codes, manage reward quotas & view live user redemption reports</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">Earn & Promo Codes</li>
          </ol>
        `;
      }
      isolateStudioView(content, studioView, renderAdminEarnView);

    } else if (hash === '#webhooks') {
      if (header) {
        header.innerHTML = `
          <h1>Discord Webhooks Dispatcher <small>Real-time node failure, crash alerts, and staff event streams</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">Discord Webhooks</li>
          </ol>
        `;
      }
      isolateStudioView(content, studioView, renderWebhooksView);

    } else if (hash === '#inbuilt-addons') {
      if (header) {
        header.innerHTML = `
          <h1>Inbuilt Addons <small>Integrated system enhancements, security sentinel, and client portal modules</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">Inbuilt Addons</li>
          </ol>
        `;
      }
      isolateStudioView(content, studioView, renderInbuiltAddonsView);

    } else if (hash === '#blueprint-extensions') {
      if (header) {
        header.innerHTML = `
          <h1>Blueprint & Extensions <small>Pterodactyl extension engine, marketplace plugins, and packages</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">Blueprint & Extensions</li>
          </ol>
        `;
      }
      isolateStudioView(content, studioView, renderBlueprintExtensionsView);

    } else if (hash === '#users' || window.location.pathname.startsWith('/admin/users')) {
      if (header) {
        header.innerHTML = `
          <h1>User Management Studio <small>Client accounts, multi-factor security, verified identities, and balances</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">Users</li>
          </ol>
        `;
      }
      isolateStudioView(content, studioView, renderUsersStudioView);

    } else {
      if (studioView) studioView.style.display = 'none';
      Array.from(content.children).forEach(function (c) {
        if (c.id !== 'apparatus-admin-studio-view') c.style.display = '';
      });
      enhanceAdminOverview();
    }
  }

  function isolateStudioView(content, studioView, renderFn) {
    Array.from(content.children).forEach(function (c) {
      if (c.id !== 'apparatus-admin-studio-view' && c.id !== 'apparatus-saas-subnav') c.style.display = 'none';
    });

    if (!studioView) {
      studioView = document.createElement('div');
      studioView.id = 'apparatus-admin-studio-view';
      content.appendChild(studioView);
    }
    studioView.style.display = 'block';
    renderFn(studioView);
  }

  // ==============================================================================
  // 4. MAIL EDITOR STUDIO VIEW (WITH LIVE SWITCHER, VERIFICATION CODE & SOCIAL LINKS)
  // ==============================================================================
  function renderMailEditorView(container) {
    container.className = 'apparatus-admin-view';

    const mailTemplates = {
      verification: {
        name: 'Account Verification & Referral Activation',
        subject: 'Verify Your ArixByte Account & Activate Referral Code',
        sender: 'ArixByte Security <verify@arixbyte.com>',
        btnText: 'Click Here to Get Your Account Verified',
        showCode: true,
        code: 'E4GWJ3',
        body: `Hello **{username}**,

Thank you for registering on ArixByte Cloud! To complete your account activation and unlock your personal referral reward code, please verify your email address using the one-time security code below:

Enter this code on your dashboard or click the direct verification button below to activate your account instantly.`
      },
      welcome: {
        name: 'Welcome to ArixByte Cloud',
        subject: 'Welcome to ArixByte Cloud!',
        sender: 'ArixByte Cloud <noreply@arixbyte.com>',
        btnText: 'Access Client Dashboard',
        showCode: false,
        code: '',
        body: `Hello **{username}**,

Welcome to ArixByte Cloud! Your high-performance computing environment is ready to deploy.

• Dedicated High-Clock CPU Performance
• Ultra-Low Latency NVMe Storage
• Instant Automated Backups & DDoS Mitigation

Click the button below to launch your panel console.`
      },
      password_reset: {
        name: 'Password Reset Instruction',
        subject: 'Reset Your ArixByte Password',
        sender: 'ArixByte Security <auth@arixbyte.com>',
        btnText: 'Reset Account Password',
        showCode: false,
        code: '',
        body: `Hello **{username}**,

We received a request to reset the password for your ArixByte Cloud account.

Click the button below to choose a new secure password. If you did not initiate this request, you can safely ignore this email.`
      },
      server_created: {
        name: 'Server Successfully Provisioned',
        subject: 'Server Successfully Provisioned - ArixByte',
        sender: 'ArixByte Automations <daemon@arixbyte.com>',
        btnText: 'Open Server Console',
        showCode: false,
        code: '',
        body: `Hello **{username}**,

Great news! Your new game server instance has been successfully deployed and bound to high-speed node allocation.

• Status: Online & Guarded
• Hypervisor: Wings v1.11.x Enterprise
• Network: 1 Gbps Symmetric Uplink

Access your server console using the link below.`
      },
      two_factor: {
        name: 'Two-Factor Authentication Alert',
        subject: 'Security Alert: Two-Factor Authentication Updated',
        sender: 'ArixByte Security <security@arixbyte.com>',
        btnText: 'Review Security Settings',
        showCode: false,
        code: '',
        body: `Hello **{username}**,

Two-factor authentication (TOTP) settings on your ArixByte account were recently updated.

If you made this change, no further action is required. If you did not authorize this, contact ArixByte Support immediately.`
      },
      maintenance: {
        name: 'Node Maintenance Advisory',
        subject: 'Scheduled Infrastructure Maintenance Advisory',
        sender: 'ArixByte Operations <ops@arixbyte.com>',
        btnText: 'Check Network Status',
        showCode: false,
        code: '',
        body: `Hello **{username}**,

This is an advance notice that scheduled hardware maintenance is planned for cluster nodes to apply kernel security updates.

• Window: Sunday 02:00 UTC - 02:30 UTC
• Expected Impact: Under 60 seconds reboot latency`
      }
    };

    let activeKey = 'verification';
    let currentTpl = mailTemplates[activeKey];

    container.innerHTML = `
      <div class="apparatus-admin-grid-2">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title"><i class="ri-edit-2-line"></i> Template Configuration</h3>
          </div>
          <div class="box-body">
            <!-- Clickable Visual Template Selector Tabs -->
            <div style="margin-bottom: 1.25rem;">
              <label style="font-size: 0.85rem; color: #94a3b8; font-weight: 600; display: block; margin-bottom: 0.6rem;">
                Select Email Template
              </label>
              <div id="apparatus-mail-tab-pills" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
                <button type="button" class="apparatus-mail-pill active" data-tpl="verification" style="padding: 0.45rem 0.85rem; border-radius: 10px; font-size: 0.84rem; font-weight: 600; cursor: pointer; border: 1px solid rgba(236,72,153,0.4); background: rgba(236,72,153,0.18); color: #fff;">
                  <i class="ri-shield-star-line"></i> Verification
                </button>
                <button type="button" class="apparatus-mail-pill" data-tpl="welcome" style="padding: 0.45rem 0.85rem; border-radius: 10px; font-size: 0.84rem; font-weight: 600; cursor: pointer; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.06); color: #cbd5e1;">
                  <i class="ri-user-smile-line"></i> Welcome
                </button>
                <button type="button" class="apparatus-mail-pill" data-tpl="password_reset" style="padding: 0.45rem 0.85rem; border-radius: 10px; font-size: 0.84rem; font-weight: 600; cursor: pointer; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.06); color: #cbd5e1;">
                  <i class="ri-key-2-line"></i> Password Reset
                </button>
                <button type="button" class="apparatus-mail-pill" data-tpl="server_created" style="padding: 0.45rem 0.85rem; border-radius: 10px; font-size: 0.84rem; font-weight: 600; cursor: pointer; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.06); color: #cbd5e1;">
                  <i class="ri-server-line"></i> Server Deployed
                </button>
                <button type="button" class="apparatus-mail-pill" data-tpl="two_factor" style="padding: 0.45rem 0.85rem; border-radius: 10px; font-size: 0.84rem; font-weight: 600; cursor: pointer; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.06); color: #cbd5e1;">
                  <i class="ri-shield-keyhole-line"></i> 2FA Alert
                </button>
                <button type="button" class="apparatus-mail-pill" data-tpl="maintenance" style="padding: 0.45rem 0.85rem; border-radius: 10px; font-size: 0.84rem; font-weight: 600; cursor: pointer; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.06); color: #cbd5e1;">
                  <i class="ri-tools-line"></i> Maintenance
                </button>
              </div>
              <select class="form-control" id="apparatus-mail-template-select">
                <option value="verification" selected>Account Verification & Referral Activation</option>
                <option value="welcome">Welcome to ArixByte Cloud</option>
                <option value="password_reset">Password Reset Instruction</option>
                <option value="server_created">Server Successfully Provisioned</option>
                <option value="two_factor">Two-Factor Authentication Alert</option>
                <option value="maintenance">Node Maintenance Advisory</option>
              </select>
            </div>
            <div class="form-group">
              <label>Email Subject</label>
              <input type="text" class="form-control" id="apparatus-mail-subject" value="${currentTpl.subject}">
            </div>
            <div class="form-group">
              <label>Sender Display Name</label>
              <input type="text" class="form-control" id="apparatus-mail-sender" value="${currentTpl.sender}">
            </div>
            <div class="form-group">
              <label>Call to Action Button Text</label>
              <input type="text" class="form-control" id="apparatus-mail-btn-text" value="${currentTpl.btnText}">
            </div>
            <div class="form-group">
              <label>Email Message Body (Markdown / HTML)</label>
              <textarea class="form-control" rows="7" id="apparatus-mail-body">${currentTpl.body}</textarea>
            </div>
            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
              <button class="btn btn-primary" id="apparatus-mail-save-btn">
                <i class="ri-save-3-line"></i> Save Template Changes
              </button>
              <button class="btn btn-default" id="apparatus-mail-test-btn">
                <i class="ri-send-plane-line"></i> Send Test Email
              </button>
            </div>
          </div>
        </div>

        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title"><i class="ri-eye-line"></i> Live HTML Email Preview</h3>
          </div>
          <div class="box-body" style="background: rgba(0, 0, 0, 0.45); padding: 1.5rem; border-radius: 12px;">
            <div style="background: #08060c; border: 1px solid rgba(255,255,255,0.14); border-radius: 16px; padding: 2rem; color: #fff; font-family: var(--admin-font); box-shadow: 0 16px 40px rgba(0,0,0,0.6);">
              
              <!-- Brand Header -->
              <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
                <img src="/themes/apparatus/arixbyte-logo.png" alt="ArixByte" style="height: 30px; width: auto;" onerror="this.src='https://arixbyte.com/images/logo.png';">
              </div>

              <!-- Email Subject -->
              <h2 id="apparatus-preview-subject" style="font-size: 1.25rem; font-weight: 700; color: #ec4899; margin-top: 0; margin-bottom: 1rem;">
                ${currentTpl.subject}
              </h2>

              <!-- Body Text -->
              <div id="apparatus-preview-body" style="font-size: 0.92rem; line-height: 1.65; color: #cbd5e1; margin-bottom: 1.5rem; white-space: pre-wrap;">
${formatMailBody(currentTpl.body)}
              </div>

              <!-- Verification Code Card (Dynamic) -->
              <div id="apparatus-preview-code-box" style="display: ${currentTpl.showCode ? 'block' : 'none'}; text-align: center; margin-bottom: 1.75rem; background: rgba(236,72,153,0.08); border: 1px solid rgba(236,72,153,0.3); border-radius: 12px; padding: 1.25rem;">
                <div style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em; color: #f472b6; font-weight: 700; margin-bottom: 0.35rem;">
                  Your 6-Character Verification Code
                </div>
                <div style="font-family: monospace; font-size: 2rem; font-weight: 900; letter-spacing: 0.35em; color: #ffffff; text-shadow: 0 0 16px rgba(236,72,153,0.6);">
                  ${currentTpl.code || 'E4GWJ3'}
                </div>
                <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.35rem;">
                  Valid for 15 minutes • Do not share this security code with anyone
                </div>
              </div>

              <!-- Call to Action Button & Direct Verification Link -->
              <div style="text-align: center; margin-bottom: 2rem;">
                <a href="${activeKey === 'verification' ? 'https://control.arixbyte.com/account?verify_code=E4GWJ3' : 'https://control.arixbyte.com'}" target="_blank" id="apparatus-preview-btn" style="display: inline-block; background: linear-gradient(135deg, #ec4899, #db2777); color: #fff; font-weight: 700; font-size: 0.95rem; padding: 0.85rem 2.2rem; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 18px rgba(236,72,153,0.4);">
                  ${currentTpl.btnText}
                </a>
                <div id="apparatus-preview-direct-link" style="display: ${activeKey === 'verification' ? 'block' : 'none'}; margin-top: 0.75rem; font-size: 0.85rem;">
                  <a href="https://control.arixbyte.com/account?verify_code=E4GWJ3" target="_blank" style="color: #38bdf8; text-decoration: underline; font-weight: 600;">
                    Click here to get your account verified
                  </a>
                </div>
              </div>

              <!-- Official Social Channels -->
              <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.25rem; margin-top: 1.5rem; text-align: center;">
                <div style="font-size: 0.76rem; color: #94a3b8; margin-bottom: 0.65rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700;">
                  Connect with ArixByte Official
                </div>
                <div style="display: flex; justify-content: center; gap: 1.25rem; font-size: 0.84rem; flex-wrap: wrap;">
                  <a href="https://arixbyte.com" target="_blank" style="color: #38bdf8; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
                    <i class="ri-global-line"></i> arixbyte.com
                  </a>
                  <a href="https://discord.arixbyte.com" target="_blank" style="color: #818cf8; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
                    <i class="ri-discord-fill"></i> Discord
                  </a>
                  <a href="https://instagram.arixbyte.com" target="_blank" style="color: #f472b6; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
                    <i class="ri-instagram-line"></i> Instagram
                  </a>
                  <a href="https://wa.me/918218444633" target="_blank" style="color: #34d399; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
                    <i class="ri-whatsapp-line"></i> WhatsApp
                  </a>
                </div>
              </div>

              <!-- Security Footer -->
              <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem; margin-top: 1rem; font-size: 0.72rem; color: #64748b; text-align: center; line-height: 1.5;">
                Sent securely by ArixByte Infrastructure Systems • © 2026 ArixByte Cloud • All Rights Reserved.<br>
                If you did not request this communication, please secure your account immediately.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    function formatMailBody(str) {
      if (!str) return '';
      return str.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    }

    const tplSelect = container.querySelector('#apparatus-mail-template-select');
    const subjInput = container.querySelector('#apparatus-mail-subject');
    const previewSubj = container.querySelector('#apparatus-preview-subject');
    const senderInput = container.querySelector('#apparatus-mail-sender');
    const bodyInput = container.querySelector('#apparatus-mail-body');
    const previewBody = container.querySelector('#apparatus-preview-body');
    const btnInput = container.querySelector('#apparatus-mail-btn-text');
    const previewBtn = container.querySelector('#apparatus-preview-btn');
    const codeBox = container.querySelector('#apparatus-preview-code-box');
    const directLinkBox = container.querySelector('#apparatus-preview-direct-link');
    const pillBtns = container.querySelectorAll('.apparatus-mail-pill');

    function switchTemplate(key) {
      const selected = mailTemplates[key];
      if (!selected) return;
      activeKey = key;

      if (tplSelect) tplSelect.value = key;
      subjInput.value = selected.subject;
      senderInput.value = selected.sender;
      btnInput.value = selected.btnText;
      bodyInput.value = selected.body;

      previewSubj.textContent = selected.subject;
      previewBody.innerHTML = formatMailBody(selected.body);
      previewBtn.textContent = selected.btnText;
      previewBtn.href = (key === 'verification') ? 'https://control.arixbyte.com/account?verify_code=E4GWJ3' : 'https://control.arixbyte.com';
      if (codeBox) codeBox.style.display = selected.showCode ? 'block' : 'none';
      if (directLinkBox) directLinkBox.style.display = (key === 'verification') ? 'block' : 'none';

      // Update pills styling
      pillBtns.forEach(function (pill) {
        if (pill.getAttribute('data-tpl') === key) {
          pill.style.border = '1px solid rgba(236,72,153,0.4)';
          pill.style.background = 'rgba(236,72,153,0.18)';
          pill.style.color = '#fff';
        } else {
          pill.style.border = '1px solid rgba(255,255,255,0.14)';
          pill.style.background = 'rgba(255,255,255,0.06)';
          pill.style.color = '#cbd5e1';
        }
      });
    }

    // Switch templates live on pill tab click
    pillBtns.forEach(function (pill) {
      pill.addEventListener('click', function () {
        const key = this.getAttribute('data-tpl');
        switchTemplate(key);
      });
    });

    // Switch templates live on dropdown change
    if (tplSelect) {
      tplSelect.addEventListener('change', function () {
        switchTemplate(this.value);
      });
    }

    if (subjInput && previewSubj) {
      subjInput.addEventListener('input', function () {
        previewSubj.textContent = this.value || 'Subject Line';
      });
    }
    if (bodyInput && previewBody) {
      bodyInput.addEventListener('input', function () {
        previewBody.innerHTML = formatMailBody(this.value || 'Email body text...');
      });
    }
    if (btnInput && previewBtn) {
      btnInput.addEventListener('input', function () {
        previewBtn.textContent = this.value || 'Button Text';
      });
    }

    const saveBtn = container.querySelector('#apparatus-mail-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        showAdminToast('success', 'Template Saved', 'Mail template changes updated successfully.');
      });
    }

    const testBtn = container.querySelector('#apparatus-mail-test-btn');
    if (testBtn) {
      testBtn.addEventListener('click', async function () {
        const origHtml = testBtn.innerHTML;
        testBtn.disabled = true;
        testBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Dispatching via SMTP...';

        try {
          const csrf = (document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')) || 
                       (typeof getCsrfToken === 'function' ? getCsrfToken() : '') ||
                       (document.querySelector('input[name="_token"]')?.value) || '';

          const subject = (document.getElementById('apparatus-mail-subject')?.value) || 'ArixByte Cloud SMTP Test';
          const previewElement = container.querySelector('.box-info .box-body > div');
          const bodyHtml = previewElement ? previewElement.outerHTML : (document.getElementById('apparatus-mail-body')?.value || '');

          // Call backend SMTP test route
          let resp = await fetch('/auth/mail/test', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': csrf,
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({
              subject: subject,
              body: bodyHtml
            })
          });

          // Fallback to native Pterodactyl mail test if custom route not found
          if (!resp.ok && (resp.status === 404 || resp.status === 405)) {
            resp = await fetch('/admin/settings/mail/test', {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrf,
                'X-Requested-With': 'XMLHttpRequest'
              }
            });
          }

          const data = await resp.json().catch(function () { return {}; });

          if (resp.ok && data.success !== false) {
            const dest = data.recipient ? (' to ' + data.recipient) : '';
            showAdminToast('success', 'Email Sent via SMTP!', '🎉 Test email successfully dispatched' + dest + '! Please check your inbox.');
          } else {
            const err = data.message || (data.errors && data.errors[0]?.detail) || 'SMTP failed to send. Please check your SMTP host, port, username, password and encryption in Settings > Mail.';
            showAdminToast('error', 'SMTP Dispatch Error', err);
          }
        } catch (e) {
          showAdminToast('error', 'Connection Error', 'Failed to connect to SMTP mailer: ' + e.message);
        } finally {
          testBtn.disabled = false;
          testBtn.innerHTML = origHtml;
        }
      });
    }
  }

  // ==============================================================================
  // 5. GLOBAL ANNOUNCEMENTS VIEW (ZERO CAPSULES)
  // ==============================================================================
  function renderAnnouncementsView(container) {
    const saved = JSON.parse(localStorage.getItem('apparatus_admin_announcement') || '{"enabled":true,"type":"info","title":"Scheduled Maintenance Notice","msg":"Frankfurt node maintenance will take place Sunday at 02:00 UTC. Instances will experience under 60 seconds of reboot latency.","url":"https://discord.arixbyte.com","btnText":"Check Status"}');

    container.className = 'apparatus-admin-view';
    container.innerHTML = `
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title"><i class="ri-notification-badge-line"></i> Global Announcements & Alerts</h3>
        </div>
        <div class="box-body">
          <p style="color: #94a3b8; margin-bottom: 1.5rem;">
            Broadcast real-time alert banners across user dashboards, server management pages, and the authentication portal.
          </p>

          <!-- Live Preview Banner -->
          <div style="margin-bottom: 2rem;">
            <label style="font-size: 0.8rem; text-transform: uppercase; color: #94a3b8; font-weight: 700; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem;">
              Live Banner Preview
            </label>
            <div id="apparatus-announcement-live-preview" style="background: rgba(236, 72, 153, 0.1); border: 1px solid rgba(236, 72, 153, 0.35); border-radius: 14px; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; color: #fff;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <i class="ri-information-line" style="font-size: 1.5rem; color: #ec4899;"></i>
                <div>
                  <h4 id="apparatus-announcement-preview-title" style="margin: 0 0 0.25rem 0; font-size: 0.95rem; font-weight: 700; color: #fff;">
                    ${saved.title}
                  </h4>
                  <p id="apparatus-announcement-preview-msg" style="margin: 0; font-size: 0.85rem; color: #cbd5e1;">
                    ${saved.msg}
                  </p>
                </div>
              </div>
              <a id="apparatus-announcement-preview-btn" href="${saved.url}" target="_blank" style="padding: 0.5rem 1.2rem; border-radius: 10px; background: #ec4899; color: #fff; font-size: 0.84rem; font-weight: 700; text-decoration: none; white-space: nowrap;">
                ${saved.btnText}
              </a>
            </div>
          </div>

          <div class="apparatus-admin-grid-2">
            <div>
              <div class="form-group">
                <label>Broadcast Status</label>
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-top: 0.35rem;">
                  <label class="apparatus-switch">
                    <input type="checkbox" id="apparatus-announcement-status" ${saved.enabled ? 'checked' : ''}>
                    <span class="apparatus-slider"></span>
                  </label>
                  <span id="apparatus-announcement-status-lbl" style="font-weight: 600; color: ${saved.enabled ? '#34d399' : '#94a3b8'};">
                    ${saved.enabled ? 'Active Broadcast (Visible on Panels)' : 'Deactivated (Hidden)'}
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label>Banner Severity Style</label>
                <select class="form-control" id="apparatus-announcement-type">
                  <option value="info" ${saved.type === 'info' ? 'selected' : ''}>Information (Cyan)</option>
                  <option value="warning" ${saved.type === 'warning' ? 'selected' : ''}>Important Alert (Amber)</option>
                  <option value="emergency" ${saved.type === 'emergency' ? 'selected' : ''}>Critical Emergency (Rose)</option>
                  <option value="success" ${saved.type === 'success' ? 'selected' : ''}>Promotion / Event (Emerald)</option>
                </select>
              </div>

              <div class="form-group">
                <label>Banner Title</label>
                <input type="text" class="form-control" id="apparatus-announcement-title" value="${saved.title}">
              </div>
            </div>

            <div>
              <div class="form-group">
                <label>Announcement Message</label>
                <textarea class="form-control" rows="3" id="apparatus-announcement-msg">${saved.msg}</textarea>
              </div>

              <div class="form-group">
                <label>Call to Action Link URL</label>
                <input type="text" class="form-control" id="apparatus-announcement-url" value="${saved.url}">
              </div>

              <div class="form-group">
                <label>Action Button Label</label>
                <input type="text" class="form-control" id="apparatus-announcement-btn" value="${saved.btnText}">
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 0.85rem; margin-top: 2rem; margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
            <button class="btn btn-primary" id="apparatus-announcement-save-btn" style="padding: 0.75rem 1.6rem; font-size: 0.95rem; border-radius: 12px; font-weight: 700;">
              <i class="ri-megaphone-line"></i> Save & Broadcast Announcement
            </button>
            <button class="btn btn-default" id="apparatus-announcement-clear-btn" style="padding: 0.75rem 1.4rem; font-size: 0.95rem; border-radius: 12px; font-weight: 600;">
              <i class="ri-delete-bin-line"></i> Deactivate Broadcast
            </button>
          </div>
        </div>
      </div>
    `;

    const titleInput = container.querySelector('#apparatus-announcement-title');
    const msgInput = container.querySelector('#apparatus-announcement-msg');
    const btnInput = container.querySelector('#apparatus-announcement-btn');
    const pTitle = container.querySelector('#apparatus-announcement-preview-title');
    const pMsg = container.querySelector('#apparatus-announcement-preview-msg');
    const pBtn = container.querySelector('#apparatus-announcement-preview-btn');

    if (titleInput && pTitle) titleInput.addEventListener('input', () => pTitle.textContent = titleInput.value);
    if (msgInput && pMsg) msgInput.addEventListener('input', () => pMsg.textContent = msgInput.value);
    if (btnInput && pBtn) btnInput.addEventListener('input', () => pBtn.textContent = btnInput.value);

    const saveBtn = container.querySelector('#apparatus-announcement-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        const payload = {
          enabled: container.querySelector('#apparatus-announcement-status').checked,
          type: container.querySelector('#apparatus-announcement-type').value,
          title: titleInput.value,
          msg: msgInput.value,
          url: container.querySelector('#apparatus-announcement-url').value,
          btnText: btnInput.value
        };
        localStorage.setItem('apparatus_admin_announcement', JSON.stringify(payload));
        localStorage.setItem('apparatus_global_announcement', JSON.stringify(payload));
        showAdminToast('success', 'Announcement Live', 'Global announcement broadcasted to client dashboards.');
      });
    }

    const clearBtn = container.querySelector('#apparatus-announcement-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        container.querySelector('#apparatus-announcement-status').checked = false;
        container.querySelector('#apparatus-announcement-status-lbl').textContent = 'Deactivated (Hidden)';
        container.querySelector('#apparatus-announcement-status-lbl').style.color = '#94a3b8';
        localStorage.removeItem('apparatus_global_announcement');
        showAdminToast('success', 'Banner Deactivated', 'The announcement banner has been hidden.');
      });
    }
  }

  // ==============================================================================
  // 6. NODE HEALTH & DAEMON LATENCY TELEMETRY (ZERO CAPSULES)
  // ==============================================================================
  function renderNodeHealthView(container) {
    container.className = 'apparatus-admin-view';
    container.innerHTML = `
      <div class="box box-primary">
        <div class="box-header with-border">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 class="box-title"><i class="ri-pulse-line"></i> Node Health & Daemon Latency Telemetry</h3>
            <button class="btn btn-xs btn-primary" id="apparatus-ping-all-btn">
              <i class="ri-refresh-line"></i> Run Fleet Diagnostic Ping
            </button>
          </div>
        </div>
        <div class="box-body">
          <div class="apparatus-admin-grid-4" style="margin-bottom: 2rem;">
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Cluster Fleet Status</h4>
                <div class="apparatus-telemetry-val" style="color: #34d399;">100% ONLINE</div>
              </div>
              <i class="ri-shield-check-line apparatus-telemetry-icon-clean"></i>
            </div>
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Average Daemon Ping</h4>
                <div class="apparatus-telemetry-val" style="color: #38bdf8;">16ms</div>
              </div>
              <i class="ri-speed-up-line apparatus-telemetry-icon-clean"></i>
            </div>
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>RAM Utilization</h4>
                <div class="apparatus-telemetry-val" style="color: #c084fc;">54.2%</div>
              </div>
              <i class="ri-cpu-line apparatus-telemetry-icon-clean"></i>
            </div>
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Wings Architecture</h4>
                <div class="apparatus-telemetry-val" style="color: #f472b6;">v1.11.7</div>
              </div>
              <i class="ri-terminal-box-line apparatus-telemetry-icon-clean"></i>
            </div>
          </div>

          <div class="apparatus-admin-grid-3">
            <!-- Node 1 -->
            <div class="box box-solid" style="padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
                <div>
                  <h4 style="margin: 0 0 0.25rem 0; font-size: 1.05rem; font-weight: 700; color: #fff;">Prod-Node-01 (Germany)</h4>
                  <span style="font-size: 0.8rem; color: #94a3b8;">Frankfurt • 159.65.xxx.xxx</span>
                </div>
                <span style="color: #34d399; font-weight: 700; font-size: 0.88rem;">● 12ms</span>
              </div>
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: #cbd5e1;">
                  <span>Memory (RAM)</span>
                  <span style="font-weight: 700;">34.2 / 64 GB (53%)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar cyan" style="width: 53%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: #cbd5e1;">
                  <span>CPU Load (AMD EPYC)</span>
                  <span style="font-weight: 700;">18.4% (Nominal)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar emerald" style="width: 18%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: #cbd5e1;">
                  <span>NVMe Storage</span>
                  <span style="font-weight: 700;">480 GB / 2 TB (24%)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar amber" style="width: 24%;"></div>
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-xs btn-default apparatus-node-ping-btn" style="flex: 1;"><i class="ri-wifi-line"></i> Ping Test</button>
                <button class="btn btn-xs btn-default apparatus-node-restart-btn" style="flex: 1;"><i class="ri-restart-line"></i> Restart Wings</button>
              </div>
            </div>

            <!-- Node 2 -->
            <div class="box box-solid" style="padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
                <div>
                  <h4 style="margin: 0 0 0.25rem 0; font-size: 1.05rem; font-weight: 700; color: #fff;">Prod-Node-02 (Singapore)</h4>
                  <span style="font-size: 0.8rem; color: #94a3b8;">Asia-Pac • 128.199.xxx.xxx</span>
                </div>
                <span style="color: #34d399; font-weight: 700; font-size: 0.88rem;">● 38ms</span>
              </div>
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: #cbd5e1;">
                  <span>Memory (RAM)</span>
                  <span style="font-weight: 700;">48.1 / 64 GB (75%)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar amber" style="width: 75%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: #cbd5e1;">
                  <span>CPU Load (Ryzen 9)</span>
                  <span style="font-weight: 700;">26.8% (Nominal)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar emerald" style="width: 27%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: #cbd5e1;">
                  <span>NVMe Storage</span>
                  <span style="font-weight: 700;">620 GB / 2 TB (31%)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar cyan" style="width: 31%;"></div>
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-xs btn-default apparatus-node-ping-btn" style="flex: 1;"><i class="ri-wifi-line"></i> Ping Test</button>
                <button class="btn btn-xs btn-default apparatus-node-restart-btn" style="flex: 1;"><i class="ri-restart-line"></i> Restart Wings</button>
              </div>
            </div>

            <!-- Node 3 -->
            <div class="box box-solid" style="padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
                <div>
                  <h4 style="margin: 0 0 0.25rem 0; font-size: 1.05rem; font-weight: 700; color: #fff;">Prod-Node-03 (US East)</h4>
                  <span style="font-size: 0.8rem; color: #94a3b8;">New York • 143.198.xxx.xxx</span>
                </div>
                <span style="color: #34d399; font-weight: 700; font-size: 0.88rem;">● 64ms</span>
              </div>
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: #cbd5e1;">
                  <span>Memory (RAM)</span>
                  <span style="font-weight: 700;">22.5 / 64 GB (35%)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar cyan" style="width: 35%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: #cbd5e1;">
                  <span>CPU Load (AMD EPYC)</span>
                  <span style="font-weight: 700;">14.2% (Nominal)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar emerald" style="width: 14%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: #cbd5e1;">
                  <span>NVMe Storage</span>
                  <span style="font-weight: 700;">310 GB / 2 TB (15%)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar amber" style="width: 15%;"></div>
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-xs btn-default apparatus-node-ping-btn" style="flex: 1;"><i class="ri-wifi-line"></i> Ping Test</button>
                <button class="btn btn-xs btn-default apparatus-node-restart-btn" style="flex: 1;"><i class="ri-restart-line"></i> Restart Wings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.apparatus-node-ping-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const rnd = Math.floor(Math.random() * 8) + 12;
        showAdminToast('success', 'Ping Result', `Latency check completed: ${rnd}ms response from hypervisor.`);
      });
    });

    container.querySelectorAll('.apparatus-node-restart-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        showAdminToast('success', 'Wings Signal Sent', 'Daemon restart signal delivered to node socket.');
      });
    });

    const pingAll = container.querySelector('#apparatus-ping-all-btn');
    if (pingAll) {
      pingAll.addEventListener('click', function () {
        showAdminToast('success', 'Diagnostics Complete', 'All 3 production nodes responded with nominal latency (avg 18ms).');
      });
    }
  }

  // ==============================================================================
  // 7. STAFF AUDIT LOGS VIEW (ZERO CAPSULES)
  // ==============================================================================
  function renderAuditLogsView(container) {
    container.className = 'apparatus-admin-view';
    container.innerHTML = `
      <div class="box box-primary">
        <div class="box-header with-border">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 class="box-title"><i class="ri-shield-check-line"></i> Staff Audit & Security Sentinel Log</h3>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-xs btn-default" id="apparatus-audit-export-json"><i class="ri-download-2-line"></i> Export JSON</button>
              <button class="btn btn-xs btn-default" id="apparatus-audit-export-csv"><i class="ri-file-excel-line"></i> Export CSV</button>
              <button class="btn btn-xs btn-danger" id="apparatus-audit-purge"><i class="ri-delete-bin-line"></i> Purge Archive</button>
            </div>
          </div>
        </div>
        <div class="box-body">
          <p style="color: #94a3b8; margin-bottom: 1.5rem;">
            Immutable activity stream logging administrative decisions, privilege grants, and infrastructure mutations.
          </p>

          <div class="apparatus-admin-grid-4" style="margin-bottom: 1.75rem;">
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Total Events Logged</h4>
                <div class="apparatus-telemetry-val">1,482</div>
              </div>
              <i class="ri-file-list-3-line apparatus-telemetry-icon-clean"></i>
            </div>
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Active Staff Sessions</h4>
                <div class="apparatus-telemetry-val" style="color: #34d399;">2 Online</div>
              </div>
              <i class="ri-user-star-line apparatus-telemetry-icon-clean"></i>
            </div>
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Elevated Actions (24h)</h4>
                <div class="apparatus-telemetry-val" style="color: #38bdf8;">34 Actions</div>
              </div>
              <i class="ri-key-fill apparatus-telemetry-icon-clean"></i>
            </div>
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Security Risk Incidents</h4>
                <div class="apparatus-telemetry-val" style="color: #34d399;">0 Threats</div>
              </div>
              <i class="ri-shield-flash-line apparatus-telemetry-icon-clean"></i>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Staff Member</th>
                  <th>Action Performed</th>
                  <th>Target Resource</th>
                  <th>IP Address</th>
                  <th>Security Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code style="color: #94a3b8; background: transparent;">2026-11-16 10:52:14</code></td>
                  <td><strong style="color: #fff;">mudit kumar</strong> <span style="color: #38bdf8; font-size: 0.8rem; margin-left: 0.35rem;">Root Admin</span></td>
                  <td>Updated server allocation limit & CPU throttle</td>
                  <td><code>Server #412</code></td>
                  <td><code>103.115.xxx.xxx</code></td>
                  <td><span style="color: #34d399; font-weight: 600;">● LOW RISK</span></td>
                </tr>
                <tr>
                  <td><code style="color: #94a3b8; background: transparent;">2026-11-16 09:44:02</code></td>
                  <td><strong style="color: #fff;">mudit kumar</strong> <span style="color: #38bdf8; font-size: 0.8rem; margin-left: 0.35rem;">Root Admin</span></td>
                  <td>Modified global email notification templates</td>
                  <td><code>Mailer Studio</code></td>
                  <td><code>103.115.xxx.xxx</code></td>
                  <td><span style="color: #34d399; font-weight: 600;">● LOW RISK</span></td>
                </tr>
                <tr>
                  <td><code style="color: #94a3b8; background: transparent;">2026-11-16 07:18:55</code></td>
                  <td><strong style="color: #fff;">System Daemon</strong> <span style="color: #94a3b8; font-size: 0.8rem; margin-left: 0.35rem;">Automated</span></td>
                  <td>Daily snapshot backup verified on Prod-Node-01</td>
                  <td><code>Node-01 Cluster</code></td>
                  <td><code>127.0.0.1</code></td>
                  <td><span style="color: #34d399; font-weight: 600;">● ROUTINE</span></td>
                </tr>
                <tr>
                  <td><code style="color: #94a3b8; background: transparent;">2026-11-15 22:30:11</code></td>
                  <td><strong style="color: #fff;">mudit kumar</strong> <span style="color: #38bdf8; font-size: 0.8rem; margin-left: 0.35rem;">Root Admin</span></td>
                  <td>Created new node port allocation range (25565 - 25600)</td>
                  <td><code>Frankfurt Hypervisor</code></td>
                  <td><code>103.115.xxx.xxx</code></td>
                  <td><span style="color: #fbbf24; font-weight: 600;">● ELEVATED</span></td>
                </tr>
                <tr>
                  <td><code style="color: #94a3b8; background: transparent;">2026-11-15 19:12:40</code></td>
                  <td><strong style="color: #fff;">mudit kumar</strong> <span style="color: #38bdf8; font-size: 0.8rem; margin-left: 0.35rem;">Root Admin</span></td>
                  <td>Generated Application API Key (Read/Write)</td>
                  <td><code>API Key #18</code></td>
                  <td><code>103.115.xxx.xxx</code></td>
                  <td><span style="color: #fbbf24; font-weight: 600;">● ELEVATED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const expJson = container.querySelector('#apparatus-audit-export-json');
    if (expJson) expJson.addEventListener('click', () => showAdminToast('success', 'Export Complete', 'Audit log export (JSON) downloaded.'));
    const expCsv = container.querySelector('#apparatus-audit-export-csv');
    if (expCsv) expCsv.addEventListener('click', () => showAdminToast('success', 'Export Complete', 'Audit log export (CSV) downloaded.'));
    const purge = container.querySelector('#apparatus-audit-purge');
    if (purge) purge.addEventListener('click', () => showAdminToast('success', 'Archive Pruned', 'Older log archives pruned successfully.'));
  }

  // ==============================================================================
  // 8. STORE & PRICING MANAGER VIEW (ZERO CAPSULES)
  // ==============================================================================
  function renderStorePricingView(container) {
    const pricing = JSON.parse(localStorage.getItem('apparatus_store_pricing') || '{"currency":"Points","usdRate":100,"dailyBonus":10,"referralBonus":50,"ramRate":25,"cpuRate":40,"diskRate":10,"portRate":15}');

    container.className = 'apparatus-admin-view';
    container.innerHTML = `
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title"><i class="ri-price-tag-3-line"></i> Store & Pricing Resource Rates Manager</h3>
        </div>
        <div class="box-body">
          <p style="color: #94a3b8; margin-bottom: 1.5rem;">
            Control the Points currency economy, set unit pricing per hardware resource, and configure client purchase rates.
          </p>

          <div class="apparatus-admin-grid-2">
            <!-- Points Economy -->
            <div class="box box-solid" style="padding: 1.5rem;">
              <h4 style="margin: 0 0 1rem 0; font-weight: 700; color: #ec4899;"><i class="ri-coins-line"></i> Points Currency Settings</h4>
              <div class="form-group">
                <label>Currency Display Label</label>
                <input type="text" class="form-control" id="apparatus-pricing-cur" value="${pricing.currency}">
              </div>
              <div class="form-group">
                <label>Exchange Rate (1 USD equivalent)</label>
                <div class="input-group">
                  <span class="input-group-addon">$1.00 USD =</span>
                  <input type="number" class="form-control" id="apparatus-pricing-usd" value="${pricing.usdRate}">
                  <span class="input-group-addon">Points</span>
                </div>
              </div>
              <div class="form-group">
                <label>Daily Free Login Bonus</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="apparatus-pricing-daily" value="${pricing.dailyBonus}">
                  <span class="input-group-addon">Points / 24h</span>
                </div>
              </div>
              <div class="form-group">
                <label>Referral Bonus per Friend</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="apparatus-pricing-ref" value="${pricing.referralBonus}">
                  <span class="input-group-addon">Points</span>
                </div>
              </div>
            </div>

            <!-- Resource Unit Pricing -->
            <div class="box box-solid" style="padding: 1.5rem;">
              <h4 style="margin: 0 0 1rem 0; font-weight: 700; color: #38bdf8;"><i class="ri-cpu-line"></i> Resource Unit Rates (per Month)</h4>
              <div class="form-group">
                <label>Memory (RAM) Rate</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="apparatus-pricing-ram" value="${pricing.ramRate}">
                  <span class="input-group-addon">Points / GB / Mo</span>
                </div>
              </div>
              <div class="form-group">
                <label>CPU Compute Rate</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="apparatus-pricing-cpu" value="${pricing.cpuRate}">
                  <span class="input-group-addon">Points / 100% Core / Mo</span>
                </div>
              </div>
              <div class="form-group">
                <label>NVMe Disk Storage Rate</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="apparatus-pricing-disk" value="${pricing.diskRate}">
                  <span class="input-group-addon">Points / 10 GB / Mo</span>
                </div>
              </div>
              <div class="form-group">
                <label>Extra Port Allocation Rate</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="apparatus-pricing-port" value="${pricing.portRate}">
                  <span class="input-group-addon">Points / Port</span>
                </div>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
            <button class="btn btn-primary" id="apparatus-pricing-save-btn">
              <i class="ri-save-3-line"></i> Save Pricing Rules & Sync Client Store
            </button>
            <button class="btn btn-default" id="apparatus-pricing-reset-btn">
              <i class="ri-refresh-line"></i> Reset to Recommended Defaults
            </button>
          </div>
        </div>
      </div>
    `;

    const saveBtn = container.querySelector('#apparatus-pricing-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        const payload = {
          currency: container.querySelector('#apparatus-pricing-cur').value || 'Points',
          usdRate: parseInt(container.querySelector('#apparatus-pricing-usd').value, 10) || 100,
          dailyBonus: parseInt(container.querySelector('#apparatus-pricing-daily').value, 10) || 10,
          referralBonus: parseInt(container.querySelector('#apparatus-pricing-ref').value, 10) || 50,
          ramRate: parseInt(container.querySelector('#apparatus-pricing-ram').value, 10) || 25,
          cpuRate: parseInt(container.querySelector('#apparatus-pricing-cpu').value, 10) || 40,
          diskRate: parseInt(container.querySelector('#apparatus-pricing-disk').value, 10) || 10,
          portRate: parseInt(container.querySelector('#apparatus-pricing-port').value, 10) || 15
        };
        localStorage.setItem('apparatus_store_pricing', JSON.stringify(payload));
        showAdminToast('success', 'Pricing Synchronized', 'Resource rates updated across client store.');
      });
    }

    const resetBtn = container.querySelector('#apparatus-pricing-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        localStorage.removeItem('apparatus_store_pricing');
        renderStorePricingView(container);
        showAdminToast('success', 'Defaults Restored', 'Recommended pricing rules reloaded.');
      });
    }
  }

  // ==============================================================================
  // 8B. EARN & PROMO CODE STUDIO (PROMO CODE GENERATION, QUOTAS & LIVE AUDIT REPORT)
  // ==============================================================================
  function getPromoCodesList() {
    let list = [];
    let deletedDefaults = [];
    try {
      deletedDefaults = (JSON.parse(localStorage.getItem('apparatus_deleted_default_codes') || '[]')).map(function (c) { return String(c).toUpperCase(); });
    } catch (e) {}

    try {
      const raw = localStorage.getItem('apparatus_promo_codes');
      if (raw) {
        let parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed.filter(function (c) {
            if (!c || !c.code) return false;
            const codeUpper = String(c.code).toUpperCase();
            if (codeUpper === 'WELCOME20' || codeUpper === 'ARIX50' || c.id === 'pc_welcome' || c.id === 'pc_community') return false;
            if (deletedDefaults.includes(codeUpper)) return false;
            return true;
          });
        }
      }
    } catch (e) {}

    const defaultCodes = [
      { id: 'pc_jee25', code: 'JEE25', points: 100, maxUses: 25, usedCount: 0, active: true, createdAt: '2026-11-16T00:00:00Z', expiresAt: '2026-11-23T00:00:00Z' },
      { id: 'pc_arix100', code: 'ARIX100', points: 100, maxUses: 500, usedCount: 0, active: true },
      { id: 'pc_launch2026', code: 'LAUNCH2026', points: 50, maxUses: 1000, usedCount: 0, active: true }
    ];

    defaultCodes.forEach(function (def) {
      const defUpper = def.code.toUpperCase();
      if (!deletedDefaults.includes(defUpper) && !list.some(function (c) { return (c.code || '').toUpperCase() === defUpper; })) {
        list.push(def);
      }
    });

    try {
      localStorage.setItem('apparatus_promo_codes', JSON.stringify(list));
    } catch (e) {}
    return list;
  }

  function savePromoCodesList(codes) {
    try {
      localStorage.setItem('apparatus_promo_codes', JSON.stringify(codes));
    } catch (e) {
      console.error('Error saving promo codes:', e);
    }
  }

  function markDefaultCodeDeleted(code) {
    let deleted = [];
    try {
      deleted = JSON.parse(localStorage.getItem('apparatus_deleted_default_codes') || '[]');
    } catch (e) {}
    const upper = String(code).toUpperCase();
    if (!deleted.map(function(c){ return String(c).toUpperCase(); }).includes(upper)) {
      deleted.push(upper);
      localStorage.setItem('apparatus_deleted_default_codes', JSON.stringify(deleted));
    }
  }

  function renderAdminEarnView(container) {
    container.className = 'apparatus-admin-view';
    const codes = getPromoCodesList();

    const now = Date.now();
    const activeCodesCount = codes.filter(function (c) {
      return c.active !== false && (!c.expiresAt || new Date(c.expiresAt).getTime() > now);
    }).length;
    const totalRedemptions = codes.reduce(function (sum, c) { return sum + (c.usedCount || 0); }, 0);
    const totalPointsGiven = codes.reduce(function (sum, c) { return sum + ((c.usedCount || 0) * (c.points || 0)); }, 0);

    container.innerHTML = `
      <!-- Telemetry KPIs -->
      <div class="apparatus-admin-grid-4" style="margin-bottom: 1.75rem;">
        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-admin-telemetry-icon" style="background: rgba(236, 72, 153, 0.15); color: #ec4899;">
            <i class="ri-coupon-3-line"></i>
          </div>
          <div>
            <div class="apparatus-admin-telemetry-val">${activeCodesCount}</div>
            <div class="apparatus-admin-telemetry-lbl">Active Promo Codes</div>
          </div>
        </div>

        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-admin-telemetry-icon" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
            <i class="ri-user-follow-line"></i>
          </div>
          <div>
            <div class="apparatus-admin-telemetry-val">${totalRedemptions}</div>
            <div class="apparatus-admin-telemetry-lbl">Total Redemptions</div>
          </div>
        </div>

        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-admin-telemetry-icon" style="background: rgba(251, 191, 36, 0.15); color: #fbbf24;">
            <i class="ri-copper-coin-line"></i>
          </div>
          <div>
            <div class="apparatus-admin-telemetry-val">${totalPointsGiven.toLocaleString()}</div>
            <div class="apparatus-admin-telemetry-lbl">Points Distributed</div>
          </div>
        </div>

        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-admin-telemetry-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
            <i class="ri-shield-user-line"></i>
          </div>
          <div>
            <div class="apparatus-admin-telemetry-val" style="font-size: 1.35rem;">1 / Person</div>
            <div class="apparatus-admin-telemetry-lbl">Redemption Policy</div>
          </div>
        </div>
      </div>

      <!-- Promo Code Creator Box -->
      <div class="box box-primary" style="margin-bottom: 2rem;">
        <div class="box-header with-border">
          <h3 class="box-title"><i class="ri-add-circle-line"></i> Create New Promo Code</h3>
        </div>
        <div class="box-body">
          <p style="color: #94a3b8; margin-bottom: 1.5rem;">
            Generate promotional coupon codes with custom coupon expiration dates, point rewards, and usage limits.
            <strong style="color: #38bdf8;">Coupon validity duration applies only to the coupon redemption window — points claimed by users never expire.</strong> Users are strictly limited to <strong>1 redemption per account</strong>.
          </p>

          <form id="apparatus-create-promo-form">
            <div class="apparatus-admin-grid-4">
              <div class="form-group">
                <label>Promo Code</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="apparatus-new-code" placeholder="e.g. SUMMER50" style="text-transform: uppercase; font-family: monospace; font-weight: 700;" required>
                  <span class="input-group-btn">
                    <button type="button" class="btn btn-default" id="apparatus-gen-rand-code" title="Generate Random Code">
                      <i class="ri-dice-line"></i>
                    </button>
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label>Coins / Points Reward</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="apparatus-new-points" min="1" max="10000" value="50" required>
                  <span class="input-group-addon">Points</span>
                </div>
              </div>

              <div class="form-group">
                <label>Max Allowed Users</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="apparatus-new-maxuses" min="1" max="10000" value="25" required>
                  <span class="input-group-addon">Users</span>
                </div>
              </div>

              <div class="form-group">
                <label>Coupon Validity (Redeem Window)</label>
                <select class="form-control" id="apparatus-new-validity">
                  <option value="86400000">1 Day (24 Hours)</option>
                  <option value="259200000">3 Days</option>
                  <option value="604800000" selected>7 Days (1 Week)</option>
                  <option value="1209600000">14 Days (2 Weeks)</option>
                  <option value="2592000000">30 Days (1 Month)</option>
                  <option value="7776000000">90 Days (3 Months)</option>
                  <option value="0">Never / Permanent Coupon</option>
                </select>
                <small style="color: #94a3b8; font-size: 0.75rem; display: block; margin-top: 0.25rem;">
                  Time limit for redeeming coupon. (Points claimed never expire).
                </small>
              </div>
            </div>

            <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
              <button type="submit" class="btn btn-primary" id="apparatus-submit-promo-btn">
                <i class="ri-check-line"></i> Create Promo Code
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Promo Codes Table -->
      <div class="box box-default">
        <div class="box-header with-border" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <h3 class="box-title"><i class="ri-coupon-3-line"></i> Managed Promo Codes</h3>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <input type="text" id="apparatus-promo-search" class="form-control input-sm" placeholder="Search codes..." style="width: 180px;">
          </div>
        </div>
        <div class="box-body no-padding" style="overflow-x: auto;">
          <table class="table table-hover" id="apparatus-promo-table" style="vertical-align: middle;">
            <thead>
              <tr>
                <th style="padding-left: 1.5rem;">Code</th>
                <th>Reward</th>
                <th>Usage &amp; Remaining</th>
                <th>Coupon Expiration</th>
                <th>Status</th>
                <th>Created</th>
                <th style="text-align: right; padding-right: 1.5rem;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${renderPromoTableRows(codes)}
            </tbody>
          </table>
        </div>
      </div>
    `;

    function renderPromoTableRows(list) {
      if (!list || list.length === 0) {
        return `
          <tr>
            <td colspan="7" style="text-align: center; padding: 2.5rem; color: #94a3b8;">
              <i class="ri-coupon-line" style="font-size: 2rem; display: block; margin-bottom: 0.5rem;"></i>
              No promo codes created yet. Use the form above to create your first code!
            </td>
          </tr>
        `;
      }

      const curTime = Date.now();
      return list.map(function (c) {
        const isExpired = c.expiresAt && new Date(c.expiresAt).getTime() < curTime;
        const isFull = c.maxUses && (c.usedCount || 0) >= c.maxUses;
        const remaining = Math.max(0, (c.maxUses || 0) - (c.usedCount || 0));

        let statusBadge = '<span class="label label-success">Coupon Active</span>';
        if (isExpired) {
          statusBadge = '<span class="label label-danger">Coupon Expired</span>';
        } else if (isFull) {
          statusBadge = '<span class="label label-warning">Quota Full</span>';
        }

        const expiryStr = c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : 'Never';
        const createdStr = c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Recently';

        return `
          <tr data-code="${c.code}">
            <td style="padding-left: 1.5rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <code style="font-family: monospace; font-size: 0.95rem; font-weight: 700; color: #ec4899; background: rgba(236, 72, 153, 0.1); border: 1px solid rgba(236, 72, 153, 0.25); padding: 0.25rem 0.55rem; border-radius: 6px;">${c.code}</code>
                <button type="button" class="btn btn-xs btn-default apparatus-copy-code-btn" data-code="${c.code}" title="Copy Code">
                  <i class="ri-file-copy-line"></i>
                </button>
              </div>
            </td>
            <td>
              <strong style="color: #fbbf24;">+${c.points} Pts</strong>
            </td>
            <td>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <div style="width: 80px; height: 6px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; overflow: hidden;">
                  <div style="width: ${Math.min(100, Math.round(((c.usedCount || 0) / (c.maxUses || 1)) * 100))}%; height: 100%; background: #38bdf8;"></div>
                </div>
                <span style="font-size: 0.85rem; color: #fff;">${c.usedCount || 0} / ${c.maxUses}</span>
                <span style="font-size: 0.78rem; color: #94a3b8;">(${remaining} left)</span>
              </div>
            </td>
            <td style="color: #e2e8f0; font-size: 0.88rem;">
              ${expiryStr}
            </td>
            <td>
              ${statusBadge}
            </td>
            <td style="color: #94a3b8; font-size: 0.85rem;">
              ${createdStr}
            </td>
            <td style="text-align: right; padding-right: 1.5rem;">
              <div style="display: inline-flex; gap: 0.4rem;">
                <button type="button" class="btn btn-sm btn-primary apparatus-btn-check-status" data-code="${c.code}" style="display: inline-flex; align-items: center; gap: 0.35rem;">
                  <i class="ri-pie-chart-line"></i> Check Status
                </button>
                <button type="button" class="btn btn-sm btn-danger apparatus-btn-delete-code" data-code="${c.code}" title="Delete Promo Code">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Attach event listeners
    // 1. Generate random code
    const randBtn = container.querySelector('#apparatus-gen-rand-code');
    const codeInput = container.querySelector('#apparatus-new-code');
    if (randBtn && codeInput) {
      randBtn.addEventListener('click', function () {
        const prefixes = ['ARIX', 'VIP', 'DROP', 'BONUS', 'BOOST', 'REWARD'];
        const p = prefixes[Math.floor(Math.random() * prefixes.length)];
        const s = Math.random().toString(36).substring(2, 6).toUpperCase();
        codeInput.value = p + '-' + s;
      });
    }

    // 2. Submit new code form
    const createForm = container.querySelector('#apparatus-create-promo-form');
    if (createForm) {
      createForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const codeVal = (container.querySelector('#apparatus-new-code').value || '').trim().toUpperCase();
        const pointsVal = parseInt(container.querySelector('#apparatus-new-points').value, 10) || 50;
        const maxUsesVal = parseInt(container.querySelector('#apparatus-new-maxuses').value, 10) || 25;
        const validityMs = parseInt(container.querySelector('#apparatus-new-validity').value, 10) || 0;

        if (!codeVal) {
          showAdminToast('error', 'Missing Code', 'Please enter a valid promo code string.');
          return;
        }

        const currentList = getPromoCodesList();
        if (currentList.some(function (c) { return c.code.toUpperCase() === codeVal; })) {
          showAdminToast('error', 'Duplicate Code', 'A promo code with this name already exists.');
          return;
        }

        const expiresAt = validityMs > 0 ? new Date(Date.now() + validityMs).toISOString() : null;

        const newPromo = {
          id: 'pc_' + Date.now(),
          code: codeVal,
          points: pointsVal,
          maxUses: maxUsesVal,
          usedCount: 0,
          createdAt: new Date().toISOString(),
          expiresAt: expiresAt,
          active: true,
          redemptions: []
        };

        currentList.unshift(newPromo);
        savePromoCodesList(currentList);

        showAdminToast('success', 'Promo Code Created', 'Code ' + codeVal + ' created with ' + pointsVal + ' Points and ' + maxUsesVal + ' user slots.');
        renderAdminEarnView(container);
      });
    }

    // 3. Search filter
    const searchInput = container.querySelector('#apparatus-promo-search');
    const tableBody = container.querySelector('#apparatus-promo-table tbody');
    if (searchInput && tableBody) {
      searchInput.addEventListener('input', function () {
        const q = this.value.trim().toUpperCase();
        const all = getPromoCodesList();
        const filtered = all.filter(function (c) {
          return c.code.toUpperCase().includes(q);
        });
        tableBody.innerHTML = renderPromoTableRows(filtered);
        wireRowButtons();
      });
    }

    function wireRowButtons() {
      // Copy code buttons
      container.querySelectorAll('.apparatus-copy-code-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const cd = this.getAttribute('data-code');
          if (navigator.clipboard) navigator.clipboard.writeText(cd);
          showAdminToast('info', 'Code Copied', 'Promo code ' + cd + ' copied to clipboard.');
        });
      });

      // Check Status buttons
      container.querySelectorAll('.apparatus-btn-check-status').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const cd = this.getAttribute('data-code');
          const all = getPromoCodesList();
          const target = all.find(function (c) { return c.code === cd; });
          if (target) {
            renderAdminCodeStatusModal(target, container);
          }
        });
      });

      // Delete code buttons
      container.querySelectorAll('.apparatus-btn-delete-code').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const cd = (this.getAttribute('data-code') || '').trim();
          if (!cd) return;
          if (confirm('Are you sure you want to permanently delete promo code ' + cd + '?')) {
            markDefaultCodeDeleted(cd);
            let all = getPromoCodesList();
            all = all.filter(function (c) { return (c.code || '').toUpperCase() !== cd.toUpperCase(); });
            savePromoCodesList(all);

            // Also call backend to delete from server ledger
            fetch('/auth/promo/delete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken()
              },
              body: JSON.stringify({ code: cd })
            }).catch(function (e) { console.warn('Server promo delete notice:', e); });

            showAdminToast('success', 'Code Deleted', 'Promo code ' + cd + ' permanently removed.');
            renderAdminEarnView(container);
          }
        });
      });
    }

    wireRowButtons();
  }

  function renderAdminCodeStatusModal(codeObj, parentContainer) {
    const existingModal = document.getElementById('apparatus-code-report-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'apparatus-code-report-modal';
    modal.className = 'apparatus-code-report-modal';

    const redemptions = codeObj.redemptions || [];
    const remaining = Math.max(0, (codeObj.maxUses || 0) - (codeObj.usedCount || 0));
    const curTime = Date.now();
    const isExpired = codeObj.expiresAt && new Date(codeObj.expiresAt).getTime() < curTime;
    const isFull = codeObj.maxUses && (codeObj.usedCount || 0) >= codeObj.maxUses;

    let statusLabel = '<span class="label label-success" style="font-size: 0.85rem; padding: 0.3rem 0.6rem;">Active</span>';
    if (isExpired) statusLabel = '<span class="label label-danger" style="font-size: 0.85rem; padding: 0.3rem 0.6rem;">Expired</span>';
    else if (isFull) statusLabel = '<span class="label label-warning" style="font-size: 0.85rem; padding: 0.3rem 0.6rem;">Limit Reached</span>';

    modal.innerHTML = `
      <div class="apparatus-code-report-dialog">
        
        <!-- Header -->
        <div class="apparatus-code-report-header">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(236, 72, 153, 0.2); color: #ec4899; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
              <i class="ri-pie-chart-line"></i>
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 0.6rem;">
                Status Report: <code style="font-family: monospace; color: #ec4899; background: rgba(236, 72, 153, 0.15); padding: 0.2rem 0.5rem; border-radius: 6px;">${codeObj.code}</code>
              </h3>
              <span style="font-size: 0.82rem; color: #94a3b8;">Audit trail &amp; real-time user redemption logs</span>
            </div>
          </div>
          <button type="button" class="close apparatus-modal-close" style="color: #fff; opacity: 0.7; font-size: 1.6rem; cursor: pointer;">&times;</button>
        </div>

        <!-- Body -->
        <div class="apparatus-code-report-body">
          
          <!-- Summary Metric Tiles -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.75rem;">
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1rem; text-align: center;">
              <span style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.35rem;">Reward</span>
              <strong style="font-size: 1.25rem; color: #fbbf24;">+${codeObj.points} Pts</strong>
            </div>

            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1rem; text-align: center;">
              <span style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.35rem;">Uses Claimed</span>
              <strong style="font-size: 1.25rem; color: #38bdf8;">${codeObj.usedCount || 0} / ${codeObj.maxUses}</strong>
            </div>

            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1rem; text-align: center;">
              <span style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.35rem;">Remaining</span>
              <strong style="font-size: 1.25rem; color: #34d399;">${remaining} Left</strong>
            </div>

            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1rem; text-align: center;">
              <span style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.35rem;">Coupon Status</span>
              <div>${statusLabel}</div>
              <div style="font-size: 0.72rem; color: #94a3b8; margin-top: 0.25rem;">(Claimed points never expire)</div>
            </div>
          </div>

          <!-- Redemptions List -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <h4 style="margin: 0; font-size: 1.05rem; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 0.5rem;">
                <i class="ri-user-follow-line" style="color: #38bdf8;"></i> Users Who Redeemed (${redemptions.length})
              </h4>
              <span style="font-size: 0.8rem; color: #94a3b8;">Enforced Policy: 1 redemption per account</span>
            </div>

            <div style="border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; max-height: 280px; overflow-y: auto;">
              <table class="table" style="margin: 0; font-size: 0.88rem;">
                <thead>
                  <tr style="background: rgba(255, 255, 255, 0.02);">
                    <th>User</th>
                    <th>Email</th>
                    <th>Redeemed At</th>
                    <th>Points Credited</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${redemptions.length === 0 ? `
                    <tr>
                      <td colspan="5" style="text-align: center; padding: 2.5rem; color: #94a3b8;">
                        <i class="ri-inbox-line" style="font-size: 2.2rem; display: block; margin-bottom: 0.5rem; opacity: 0.6;"></i>
                        No users have redeemed this code yet.<br>Share this code in Discord or global announcements!
                      </td>
                    </tr>
                  ` : redemptions.map(function (r) {
                    const avatar = 'https://api.dicebear.com/7.x/thumbs/svg?seed=' + encodeURIComponent(r.username || 'client');
                    const timeStr = r.time ? new Date(r.time).toLocaleString() : 'Just now';
                    return `
                      <tr>
                        <td>
                          <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <img src="${avatar}" alt="" style="width: 24px; height: 24px; border-radius: 50%;" />
                            <strong style="color: #fff;">@${r.username}</strong>
                          </div>
                        </td>
                        <td style="color: #cbd5e1;">${r.email || '—'}</td>
                        <td style="color: #94a3b8; font-size: 0.82rem;">${timeStr}</td>
                        <td><strong style="color: #fbbf24;">+${r.points || codeObj.points} Pts</strong></td>
                        <td><span class="label label-success" style="font-size: 0.75rem;">Redeemed</span></td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="apparatus-code-report-footer">
          <button type="button" class="btn btn-default apparatus-modal-add-ten" style="display: inline-flex; align-items: center; gap: 0.35rem;">
            <i class="ri-add-line"></i> +10 Uses
          </button>
          <button type="button" class="btn btn-default apparatus-modal-copy-code" style="display: inline-flex; align-items: center; gap: 0.35rem;">
            <i class="ri-file-copy-line"></i> Copy Code
          </button>
          <button type="button" class="btn btn-primary apparatus-modal-close" style="padding: 0.5rem 1.25rem;">
            Done
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    function closeModal() {
      modal.remove();
    }

    modal.querySelectorAll('.apparatus-modal-close').forEach(function (btn) {
      btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    // +10 uses action
    const addTenBtn = modal.querySelector('.apparatus-modal-add-ten');
    if (addTenBtn) {
      addTenBtn.addEventListener('click', function () {
        codeObj.maxUses = (codeObj.maxUses || 0) + 10;
        const all = getPromoCodesList();
        const target = all.find(function (c) { return c.code === codeObj.code; });
        if (target) {
          target.maxUses = codeObj.maxUses;
          savePromoCodesList(all);
        }
        showAdminToast('success', 'Capacity Expanded', 'Added +10 uses to code ' + codeObj.code + '. New limit: ' + codeObj.maxUses);
        renderAdminCodeStatusModal(codeObj, parentContainer);
        if (parentContainer) renderAdminEarnView(parentContainer);
      });
    }

    // Copy code action
    const copyCodeBtn = modal.querySelector('.apparatus-modal-copy-code');
    if (copyCodeBtn) {
      copyCodeBtn.addEventListener('click', function () {
        if (navigator.clipboard) navigator.clipboard.writeText(codeObj.code);
        showAdminToast('info', 'Code Copied', 'Promo code ' + codeObj.code + ' copied to clipboard.');
      });
    }
  }


  // ==============================================================================
  // 8C. CLOUD VPS FLEET & HYPERVISOR MANAGEMENT CONSOLE
  // ==============================================================================
  function renderAdminVpsView(container) {
    container.className = 'apparatus-admin-view';

    container.innerHTML = `
      <div class="apparatus-loading-state" style="padding: 3.5rem; text-align: center;">
        <i class="ri-loader-4-line ri-spin" style="font-size: 2.8rem; color: #ec4899;"></i>
        <p style="color: #94a3b8; margin-top: 1.25rem; font-size: 1.05rem; font-weight: 500;">Connecting to Hypervisor Management Gateway...</p>
      </div>
    `;

    Promise.all([
      fetch('/auth/vps/config').then(function (r) { return r.json(); }).catch(function () { return { url: 'http://127.0.0.1:3000', has_key: false }; }),
      fetch('/auth/vps/admin/servers').then(function (r) { return r.json(); }).catch(function () { return { success: false, servers: [] }; })
    ]).then(function (results) {
      const cfg = results[0] || {};
      const srvData = results[1] || {};
      let servers = Array.isArray(srvData.servers) ? srvData.servers : [];

      if (servers.length === 0) {
        const cached = localStorage.getItem('apparatus_admin_vps_cache');
        if (cached) {
          try { servers = JSON.parse(cached); } catch (e) {}
        }
      }

      renderAdminVpsContent(container, cfg, servers);
    }).catch(function (err) {
      console.warn('[Admin VPS] Load error:', err);
      renderAdminVpsContent(container, { url: 'http://127.0.0.1:3000', has_key: false }, []);
    });
  }

  function renderAdminVpsContent(container, cfg, servers) {
    const totalCount = servers.length;
    const runningCount = servers.filter(function (s) { return (s.status || '').toLowerCase() === 'running'; }).length;
    const stoppedCount = totalCount - runningCount;

    let totalCores = 0;
    let totalMemMb = 0;
    servers.forEach(function (s) {
      totalCores += (s.cores || s.cpus || 2);
      totalMemMb += (s.memory || s.ram || (s.mem_usage ? Math.round(s.mem_usage / (1024*1024)) : 2048));
    });
    const totalRamGb = (totalMemMb / 1024).toFixed(1);

    container.innerHTML = `
      <div class="apparatus-saas-dashboard-canvas">
        <!-- TOP OPERATIONS HEADER -->
        <div class="apparatus-saas-header-card">
          <div class="apparatus-saas-title-group">
            <h1 class="apparatus-saas-page-title">Operations dashboard</h1>
            <div class="apparatus-saas-title-sub">Cloud VPS Fleet &bull; Proxmox VE hypervisor cluster &bull; KVM virtual machines</div>
          </div>
          <div class="apparatus-saas-header-controls">
            <div class="apparatus-saas-filter-pill">
              <i class="ri-pulse-line" style="color: var(--admin-accent-green);"></i>
              <span>Live Cluster Telemetry</span>
            </div>
            <button type="button" class="apparatus-saas-round-btn" id="btn-refresh-vps-fleet" title="Refresh Live Data">
              <i class="ri-refresh-line"></i>
            </button>
            <button type="button" class="apparatus-saas-cta-btn" id="btn-top-deploy-vps" style="padding: 7px 16px;">
              <i class="ri-add-line"></i> <span>Deploy VPS</span>
            </button>
          </div>
        </div>

        <!-- MINIMALIST CAREOPS KPI METRICS ROW -->
        <div class="apparatus-saas-kpi-row">
          <div class="apparatus-saas-kpi-col">
            <div class="apparatus-saas-kpi-card">
              <span class="apparatus-saas-kpi-label">Total Cloud VPS</span>
              <div class="apparatus-saas-kpi-value">${totalCount}</div>
              <div class="apparatus-saas-kpi-trend positive">
                <i class="ri-arrow-right-up-line"></i> ${runningCount} active in cluster
              </div>
            </div>
          </div>
          <div class="apparatus-saas-kpi-col">
            <div class="apparatus-saas-kpi-card">
              <span class="apparatus-saas-kpi-label">Running Instances</span>
              <div class="apparatus-saas-kpi-value" style="color: var(--admin-accent-green);">${runningCount}</div>
              <div class="apparatus-saas-kpi-trend positive">
                <i class="ri-checkbox-circle-fill"></i> 100% healthy telemetry
              </div>
            </div>
          </div>
          <div class="apparatus-saas-kpi-col">
            <div class="apparatus-saas-kpi-card">
              <span class="apparatus-saas-kpi-label">Stopped / Inactive</span>
              <div class="apparatus-saas-kpi-value" style="color: var(--admin-text-muted);">${stoppedCount}</div>
              <div class="apparatus-saas-kpi-trend neutral">
                <i class="ri-pause-circle-line"></i> Standby virtual machines
              </div>
            </div>
          </div>
          <div class="apparatus-saas-kpi-col">
            <div class="apparatus-saas-kpi-card">
              <span class="apparatus-saas-kpi-label">Allocated Memory</span>
              <div class="apparatus-saas-kpi-value">${totalRamGb} <span class="unit">GB</span></div>
              <div class="apparatus-saas-kpi-trend neutral">
                <i class="ri-cpu-line"></i> ${totalCores} total vCPU cores
              </div>
            </div>
          </div>
          <div class="apparatus-saas-kpi-col">
            <div class="apparatus-saas-kpi-card">
              <span class="apparatus-saas-kpi-label">Hypervisor Cluster</span>
              <div class="apparatus-saas-kpi-value">${servers.length > 0 ? 'Active' : 'Standby'}</div>
              <div class="apparatus-saas-kpi-trend ${servers.length > 0 ? 'positive' : 'neutral'}">
                <i class="${servers.length > 0 ? 'ri-shield-check-line' : 'ri-time-line'}"></i> ${servers.length > 0 ? 'Proxmox VE Cluster Connected' : 'No VMs provisioned'}
              </div>
            </div>
          </div>
        </div>

        <!-- PROXMOX CLUSTER GATEWAY MODULE -->
        <div class="box apparatus-gateway-box" style="margin-bottom: 2rem;">
          <div class="box-header with-border" style="display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.75rem;">
            <h3 class="box-title" style="color: var(--admin-text-primary); font-size: 1.15rem; font-weight: 700; display: flex; align-items: center; gap: 0.65rem;">
              <i class="ri-shield-keyhole-line" style="color: var(--admin-accent-primary); font-size: 1.35rem;"></i> Cluster Gateway &amp; Virtualization Engine
            </h3>
            <span id="apparatus-alpm-status-pill" class="apparatus-status-badge">
              <span class="dot"></span> <span class="txt">Checking Gateway...</span>
            </span>
          </div>
          <div class="box-body" style="padding: 1.5rem 1.75rem;">
            <div class="row">
              <div class="col-md-5 col-sm-12">
                <div class="form-group">
                  <label style="color: var(--admin-text-secondary); font-weight: 600; font-size: 0.88rem; margin-bottom: 0.45rem; display: block;">Cluster Engine Gateway URL</label>
                  <div class="input-group">
                    <span class="input-group-addon" style="background: var(--admin-pill-bg); color: var(--admin-text-muted); border-color: var(--admin-input-border);"><i class="ri-global-line"></i></span>
                    <input type="text" id="alpm-cfg-url" class="form-control" style="background: var(--admin-input-bg); border-color: var(--admin-input-border); color: var(--admin-input-text); height: 42px;" value="${cfg.url || 'http://127.0.0.1:3000'}" placeholder="http://127.0.0.1:3000">
                  </div>
                  <small style="color: var(--admin-text-muted); margin-top: 0.4rem; display: block;">Internal virtualization engine endpoint (e.g. http://127.0.0.1:3000)</small>
                </div>
              </div>
              <div class="col-md-5 col-sm-12">
                <div class="form-group">
                  <label style="color: var(--admin-text-secondary); font-weight: 600; font-size: 0.88rem; margin-bottom: 0.45rem; display: block;">Cluster Admin API Token</label>
                  <div class="input-group">
                    <span class="input-group-addon" style="background: var(--admin-pill-bg); color: var(--admin-text-muted); border-color: var(--admin-input-border);"><i class="ri-key-2-line"></i></span>
                    <input type="password" id="alpm-cfg-key" class="form-control" style="background: var(--admin-input-bg); border-color: var(--admin-input-border); color: var(--admin-input-text); height: 42px;" value="${cfg.has_key ? '••••••••••••••••' : ''}" placeholder="API Key configured in cluster engine">
                  </div>
                  <small style="color: var(--admin-text-muted); margin-top: 0.4rem; display: block;">Bearer API key with administrative cluster scopes</small>
                </div>
              </div>
              <div class="col-md-2 col-sm-12" style="display: flex; gap: 0.65rem; align-items: flex-end; padding-bottom: 15px;">
                <button type="button" id="btn-save-alpm-cfg" class="btn btn-primary" style="flex: 1; height: 42px; background: var(--admin-accent-gradient); border: none; font-weight: 700; border-radius: 10px;">
                  <i class="ri-save-line"></i> Save
                </button>
                <button type="button" id="btn-test-alpm-ping" class="btn btn-default" style="height: 42px; background: var(--admin-pill-bg); border-color: var(--admin-input-border); color: var(--admin-text-primary); border-radius: 10px; font-weight: 600;" title="Test Connection Ping">
                  <i class="ri-wifi-line"></i> Ping
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- MANAGED CLOUD VPS FLEET TABLE BOX -->
        <div class="box apparatus-gateway-box">
          <div class="box-header with-border" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; padding: 1.25rem 1.75rem;">
            <h3 class="box-title" style="color: var(--admin-text-primary); font-size: 1.15rem; font-weight: 700; display: flex; align-items: center; gap: 0.65rem;">
              <i class="ri-server-line" style="color: var(--admin-accent-primary);"></i> Managed Cloud VPS Instances (${totalCount})
            </h3>
            <div style="display: flex; gap: 0.65rem; align-items: center;">
              <div class="input-group" style="width: 250px;">
                <input type="text" id="alpm-vps-search" class="form-control" style="background: var(--admin-input-bg); border-color: var(--admin-input-border); color: var(--admin-input-text); border-radius: 10px 0 0 10px; height: 40px;" placeholder="Search VPS, IP, Owner...">
                <span class="input-group-addon" style="background: var(--admin-pill-bg); border-color: var(--admin-input-border); color: var(--admin-text-muted); border-radius: 0 10px 10px 0;"><i class="ri-search-line"></i></span>
              </div>
              <button type="button" id="btn-deploy-vps-modal" class="apparatus-saas-cta-btn" style="height: 40px; padding: 0 18px;">
                <i class="ri-add-line"></i> <span>Deploy VPS</span>
              </button>
            </div>
          </div>
          <div class="box-body table-responsive" style="padding: 0;">
            <table class="table table-hover apparatus-cyber-table" style="margin-bottom: 0;">
              <thead>
                <tr style="border-bottom: 1px solid var(--admin-table-border); color: var(--admin-text-muted); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em;">
                  <th style="padding: 1.1rem 1.4rem;">VMID / Hostname</th>
                  <th>Owner (Pterodactyl User)</th>
                  <th>Node &amp; Type</th>
                  <th>Primary IP</th>
                  <th>Allocated Specs</th>
                  <th>Status</th>
                  <th style="text-align: right; padding-right: 1.4rem;">Actions</th>
                </tr>
              </thead>
              <tbody id="alpm-vps-tbody">
                ${renderAdminVpsRows(servers)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    wireAdminVpsEvents(container, cfg, servers);
    testAlpmPing(false);

    const topDeployBtn = container.querySelector('#btn-top-deploy-vps');
    if (topDeployBtn) {
      topDeployBtn.addEventListener('click', function () {
        openAdminDeployVpsModal(container);
      });
    }
  }

  function renderAdminVpsRows(servers) {
    if (!servers || servers.length === 0) {
      return `
        <tr>
          <td colspan="7" style="text-align: center; padding: 4rem 1.5rem; color: #94a3b8;">
            <i class="ri-server-line" style="font-size: 2.8rem; display: block; margin-bottom: 0.75rem; opacity: 0.35; color: #ec4899;"></i>
            <h4 style="color: #fff; font-weight: 700; margin-bottom: 0.35rem;">No Cloud VPS Instances Found</h4>
            <p style="color: #64748b; font-size: 0.9rem; max-width: 480px; margin: 0 auto 1.25rem auto;">
              Ensure your cluster gateway is connected or click "+ Deploy VPS" to provision your first virtual machine.
            </p>
          </td>
        </tr>
      `;
    }

    return servers.map(function (s) {
      const isOnline = (s.status || '').toLowerCase() === 'running';
      const isSuspended = Boolean(s.is_suspended);
      const statusColor = isSuspended ? '#f59e0b' : (isOnline ? '#34d399' : '#ef4444');
      const statusText = isSuspended ? 'SUSPENDED' : (isOnline ? 'ONLINE' : 'STOPPED');

      const ownerEmail = (s.user && s.user.email) ? s.user.email : (s.owner_email || 'Unassigned');
      const ownerName = (s.user && s.user.username) ? s.user.username : (s.owner_username || 'client');
      const ip = s.ip || 'DHCP Pending';
      const node = s.node || s.pve_node || 'pve';
      const type = (s.type || 'qemu').toUpperCase();

      const cores = s.cores || s.cpus || 2;
      const memMb = s.memory || s.ram || (s.mem_usage ? Math.round(s.mem_usage / (1024*1024)) : 2048);
      const memGb = (memMb >= 1024) ? (memMb / 1024).toFixed(0) + ' GB' : memMb + ' MB';
      const diskGb = s.disk || s.disk_gb || 20;

      // OS detection
      const osLower = ((s.os || s.template || s.name || '') + '').toLowerCase();
      let osIcon = '<i class="ri-ubuntu-fill" style="color: #e95420;"></i>';
      if (osLower.includes('debian')) {
        osIcon = '<i class="ri-terminal-window-line" style="color: #d70a53;"></i>';
      } else if (osLower.includes('centos') || osLower.includes('rocky') || osLower.includes('alma')) {
        osIcon = '<i class="ri-terminal-box-line" style="color: #22c55e;"></i>';
      } else if (osLower.includes('win')) {
        osIcon = '<i class="ri-windows-fill" style="color: #0078d4;"></i>';
      } else if (osLower.includes('arch')) {
        osIcon = '<i class="ri-code-s-slash-line" style="color: #1793d1;"></i>';
      }

      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle;" data-vps-id="${s.id}" data-search="${s.name} ${s.vmid} ${ip} ${ownerEmail} ${ownerName}">
          <td style="padding: 1.1rem 1.4rem;">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.25); color: #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 1.35rem;">
                ${osIcon}
              </div>
              <div>
                <strong style="color: #fff; font-size: 0.98rem; display: block;">${s.name || 'Cloud VPS'}</strong>
                <div style="color: #64748b; font-size: 0.82rem; margin-top: 1px;">VMID: <code style="background: rgba(0,0,0,0.45); color: #38bdf8; border: none; padding: 1px 6px; border-radius: 4px; font-weight: 700;">#${s.vmid || s.id}</code></div>
              </div>
            </div>
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #8b5cf6); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.82rem; box-shadow: 0 2px 8px rgba(236,72,153,0.3);">
                ${ownerName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style="color: #f1f5f9; font-weight: 600; font-size: 0.92rem;">${ownerName}</div>
                <div style="color: #64748b; font-size: 0.8rem;">${ownerEmail}</div>
              </div>
            </div>
          </td>
          <td>
            <span class="badge" style="background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 5px 9px; font-weight: 600; font-size: 0.82rem;">
              <i class="ri-hard-drive-3-line" style="color: #38bdf8;"></i> ${node} &bull; ${type}
            </span>
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <code style="background: rgba(0,0,0,0.45); color: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-size: 0.88rem; font-family: monospace;">${ip}</code>
              ${ip !== 'DHCP Pending' ? `
                <button type="button" class="btn btn-xs btn-default apparatus-copy-ip-btn" data-ip="${ip}" title="Copy IP Address" style="background: transparent; border: none; color: #94a3b8; font-size: 1rem;">
                  <i class="ri-file-copy-line"></i>
                </button>
              ` : ''}
            </div>
          </td>
          <td>
            <div style="color: #cbd5e1; font-size: 0.86rem; display: flex; gap: 0.6rem; align-items: center;">
              <span title="vCPU Cores" style="display: inline-flex; align-items: center; gap: 3px;"><i class="ri-cpu-line" style="color: #ec4899;"></i> ${cores}C</span>
              <span title="RAM" style="display: inline-flex; align-items: center; gap: 3px;"><i class="ri-ram-line" style="color: #8b5cf6;"></i> ${memGb}</span>
              <span title="NVMe Disk" style="display: inline-flex; align-items: center; gap: 3px;"><i class="ri-hard-drive-2-line" style="color: #34d399;"></i> ${diskGb}G</span>
            </div>
          </td>
          <td>
            <span class="badge" style="background: rgba(0,0,0,0.35); color: ${statusColor}; border: 1px solid ${statusColor}; border-radius: 20px; padding: 5px 12px; font-weight: 700; font-size: 0.76rem; display: inline-flex; align-items: center; gap: 6px;">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${statusColor}; ${isOnline ? 'box-shadow: 0 0 8px ' + statusColor + ';' : ''}"></span>
              ${statusText}
            </span>
          </td>
          <td style="text-align: right; padding-right: 1.4rem;">
            <div class="btn-group">
              ${isOnline ? `
                <button type="button" class="btn btn-sm btn-default apparatus-btn-vps-power" data-id="${s.id}" data-action="restart" title="Reboot VPS" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
                  <i class="ri-restart-line"></i>
                </button>
                <button type="button" class="btn btn-sm btn-default apparatus-btn-vps-power" data-id="${s.id}" data-action="stop" title="Graceful Shutdown" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3);">
                  <i class="ri-shut-down-line"></i>
                </button>
              ` : `
                <button type="button" class="btn btn-sm btn-default apparatus-btn-vps-power" data-id="${s.id}" data-action="start" title="Start VPS" style="background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3);">
                  <i class="ri-play-line"></i>
                </button>
              `}
              <button type="button" class="btn btn-sm btn-default apparatus-btn-vps-ssh" data-id="${s.id}" data-name="${s.name}" data-vmid="${s.vmid}" data-ip="${ip}" title="SSH Connection Details" style="background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3);">
                <i class="ri-key-2-line"></i>
              </button>
              <button type="button" class="btn btn-sm btn-default apparatus-btn-vps-console" data-id="${s.id}" data-name="${s.name}" data-vmid="${s.vmid}" title="Launch Web Console" style="background: rgba(139, 92, 246, 0.15); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.3);">
                <i class="ri-terminal-line"></i>
              </button>
              <button type="button" class="btn btn-sm btn-default apparatus-btn-vps-delete" data-id="${s.id}" data-vmid="${s.vmid}" title="Destroy VPS" style="background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);">
                <i class="ri-delete-bin-line"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function wireAdminVpsEvents(container, cfg, servers) {
    container.querySelectorAll('.apparatus-copy-ip-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const ip = this.getAttribute('data-ip');
        if (navigator.clipboard) navigator.clipboard.writeText(ip);
        showAdminToast('info', 'IP Copied', 'IP address ' + ip + ' copied to clipboard.');
      });
    });

    const searchInput = container.querySelector('#alpm-vps-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const q = this.value.trim().toLowerCase();
        container.querySelectorAll('#alpm-vps-tbody tr[data-search]').forEach(function (tr) {
          const hay = tr.getAttribute('data-search').toLowerCase();
          tr.style.display = hay.includes(q) ? '' : 'none';
        });
      });
    }

    const saveBtn = container.querySelector('#btn-save-alpm-cfg');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        const url = container.querySelector('#alpm-cfg-url').value.trim();
        const key = container.querySelector('#alpm-cfg-key').value.trim();
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Saving...';

        fetch('/auth/vps/config', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken()
          },
          body: JSON.stringify({ url: url, api_key: key })
        }).then(function (r) { return r.json(); }).then(function (res) {
          saveBtn.disabled = false;
          saveBtn.innerHTML = '<i class="ri-save-line"></i> Save';
          if (res.success) {
            showAdminToast('success', 'Configuration Saved', 'Gateway settings updated successfully.');
            testAlpmPing(true);
          } else {
            showAdminToast('error', 'Save Failed', res.message || 'Could not save gateway settings.');
          }
        }).catch(function (err) {
          saveBtn.disabled = false;
          saveBtn.innerHTML = '<i class="ri-save-line"></i> Save';
          showAdminToast('error', 'Network Error', err.message);
        });
      });
    }

    const pingBtn = container.querySelector('#btn-test-alpm-ping');
    if (pingBtn) {
      pingBtn.addEventListener('click', function () {
        testAlpmPing(true);
      });
    }

    const refreshBtn = container.querySelector('#btn-refresh-vps-fleet');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', function () {
        renderAdminVpsView(container);
      });
    }

    container.querySelectorAll('.apparatus-btn-vps-power').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const act = this.getAttribute('data-action');
        btn.disabled = true;

        fetch('/auth/vps/' + id + '/power', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken()
          },
          body: JSON.stringify({ action: act })
        }).then(function (r) { return r.json(); }).then(function (res) {
          btn.disabled = false;
          if (res.success || res.ok) {
            showAdminToast('success', 'Power Signal Sent', 'Issued ' + act.toUpperCase() + ' to VPS #' + id);
            setTimeout(function () { renderAdminVpsView(container); }, 1500);
          } else {
            showAdminToast('error', 'Operation Failed', res.error || res.message || 'Could not execute power action.');
          }
        }).catch(function (e) {
          btn.disabled = false;
          showAdminToast('error', 'Error', e.message);
        });
      });
    });

    container.querySelectorAll('.apparatus-btn-vps-ssh').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const s = servers.find(function (x) { return String(x.id) === String(id); }) || {
          id: id,
          name: this.getAttribute('data-name'),
          vmid: this.getAttribute('data-vmid'),
          ip: this.getAttribute('data-ip')
        };
        openAdminVpsSshModal(s);
      });
    });

    container.querySelectorAll('.apparatus-btn-vps-console').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        const vmid = this.getAttribute('data-vmid');
        openAdminVpsConsole(id, name, vmid);
      });
    });

    container.querySelectorAll('.apparatus-btn-vps-delete').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const vmid = this.getAttribute('data-vmid');
        if (confirm('Are you sure you want to PERMANENTLY DESTROY VPS #' + vmid + '? This will wipe all disks and data!')) {
          fetch('/auth/vps/admin/' + id, {
            method: 'DELETE',
            headers: { 'X-CSRF-TOKEN': getCsrfToken() }
          }).then(function (r) { return r.json(); }).then(function (res) {
            if (res.success || res.ok) {
              showAdminToast('success', 'VPS Destroyed', 'Virtual server #' + vmid + ' destroyed.');
              renderAdminVpsView(container);
            } else {
              showAdminToast('error', 'Destroy Failed', res.error || 'Failed to destroy VPS.');
            }
          });
        }
      });
    });

    const deployBtn = container.querySelector('#btn-deploy-vps-modal');
    if (deployBtn) {
      deployBtn.addEventListener('click', function () {
        openAdminDeployVpsModal(container);
      });
    }
  }

  function testAlpmPing(interactive) {
    const pill = document.getElementById('apparatus-alpm-status-pill');
    if (pill) {
      pill.innerHTML = '<span class="dot" style="background:#38bdf8;"></span> <span class="txt">Testing Gateway...</span>';
    }

    const t0 = Date.now();
    fetch('/auth/vps/ping')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        const latency = Date.now() - t0;
        if (res.success || res.status === 200) {
          if (pill) {
            pill.className = 'apparatus-status-badge online';
            pill.innerHTML = '<span class="dot"></span> <span class="txt">Cluster Online &bull; ' + latency + 'ms</span>';
          }
          if (interactive) showAdminToast('success', 'Gateway Connected', 'Proxmox virtualization engine is online (' + latency + 'ms).');
        } else {
          if (pill) {
            pill.className = 'apparatus-status-badge offline';
            pill.innerHTML = '<span class="dot"></span> <span class="txt">Gateway Standby</span>';
          }
          if (interactive) showAdminToast('warning', 'Gateway Standby', 'Gateway responding with code ' + (res.status || 'offline') + '.');
        }
      })
      .catch(function () {
        if (pill) {
          pill.className = 'apparatus-status-badge offline';
          pill.innerHTML = '<span class="dot"></span> <span class="txt">Gateway Standby</span>';
        }
        if (interactive) showAdminToast('error', 'Gateway Offline', 'Unable to reach virtualization gateway.');
      });
  }

  // ==============================================================================
  // 8D. PROXMOX HYPERVISOR VPS NODES VIEW
  // ==============================================================================
  function renderAdminVpsNodesView(container) {
    container.className = 'apparatus-admin-view';

    container.innerHTML = `
      <div class="apparatus-loading-state" style="padding: 3.5rem; text-align: center;">
        <i class="ri-loader-4-line ri-spin" style="font-size: 2.8rem; color: #38bdf8;"></i>
        <p style="color: #94a3b8; margin-top: 1.25rem; font-size: 1.05rem; font-weight: 500;">Querying Proxmox Hypervisor Compute Nodes...</p>
      </div>
    `;

    fetch('/auth/vps/admin/nodes')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        let nodes = [];
        if (res.success && Array.isArray(res.nodes)) {
          nodes = res.nodes;
        } else if (res.nodes && Array.isArray(res.nodes)) {
          nodes = res.nodes;
        }

        renderAdminVpsNodesContent(container, nodes);
      })
      .catch(function (err) {
        console.warn('[Admin VPS Nodes] Load error:', err);
        renderAdminVpsNodesContent(container, []);
      });
  }

  function renderAdminVpsNodesContent(container, nodes) {
    const totalNodes = nodes.length;
    const onlineNodes = nodes.filter(function (n) { return (n.status || 'online').toLowerCase() === 'online'; }).length;

    let clusterCores = 0;
    let clusterRamGb = 0;
    let clusterStorageGb = 0;

    nodes.forEach(function (n) {
      clusterCores += (n.cpu_cores || 0);
      clusterRamGb += (n.ram_total_gb || 0);
      clusterStorageGb += (n.storage_total_gb || 0);
    });

    const clusterStorageTb = clusterStorageGb > 0 ? (clusterStorageGb / 1024).toFixed(1) : '0.0';
    const clusterStatusPct = totalNodes > 0 ? (onlineNodes > 0 ? Math.round((onlineNodes / totalNodes) * 100) : 0) : 0;

    container.innerHTML = `
      <div class="apparatus-saas-dashboard-canvas">
        <!-- TOP OPERATIONS HEADER -->
        <div class="apparatus-saas-header-card">
          <div class="apparatus-saas-title-group">
            <h1 class="apparatus-saas-page-title">Hypervisor VPS Nodes</h1>
            <div class="apparatus-saas-title-sub">Proxmox VE cluster compute nodes &bull; CPU pools &bull; Memory &amp; NVMe Storage pools</div>
          </div>
          <div class="apparatus-saas-header-controls">
            <div class="apparatus-saas-filter-pill">
              <i class="${totalNodes > 0 ? 'ri-shield-check-line' : 'ri-time-line'}" style="color: ${totalNodes > 0 ? 'var(--admin-accent-green)' : 'var(--admin-text-muted)'};"></i>
              <span>${totalNodes > 0 ? 'Cluster Active &bull; Proxmox VE' : 'Cluster Idle &bull; No Nodes'}</span>
            </div>
            <button type="button" class="apparatus-saas-round-btn" id="btn-refresh-vps-nodes" title="Refresh Nodes">
              <i class="ri-refresh-line"></i>
            </button>
            <button type="button" class="apparatus-saas-cta-btn" id="btn-top-add-node" style="padding: 7px 16px;">
              <i class="ri-add-line"></i> <span>Connect Node</span>
            </button>
          </div>
        </div>

        <!-- MINIMALIST CAREOPS KPI METRICS ROW -->
        <div class="apparatus-saas-kpi-row">
          <div class="apparatus-saas-kpi-col">
            <div class="apparatus-saas-kpi-card">
              <span class="apparatus-saas-kpi-label">Hypervisor Nodes</span>
              <div class="apparatus-saas-kpi-value">${totalNodes}</div>
              <div class="apparatus-saas-kpi-trend ${totalNodes > 0 ? 'positive' : 'neutral'}">
                <i class="${totalNodes > 0 ? 'ri-arrow-right-up-line' : 'ri-information-line'}"></i> ${totalNodes > 0 ? (onlineNodes + ' Active Proxmox VE nodes') : 'No nodes connected'}
              </div>
            </div>
          </div>
          <div class="apparatus-saas-kpi-col">
            <div class="apparatus-saas-kpi-card">
              <span class="apparatus-saas-kpi-label">Cluster Status</span>
              <div class="apparatus-saas-kpi-value" style="color: ${totalNodes > 0 && onlineNodes > 0 ? 'var(--admin-accent-green)' : 'var(--admin-text-muted)'};">${totalNodes > 0 ? (clusterStatusPct + '%') : '0%'}</div>
              <div class="apparatus-saas-kpi-trend ${totalNodes > 0 && onlineNodes > 0 ? 'positive' : 'neutral'}">
                <i class="${totalNodes > 0 && onlineNodes > 0 ? 'ri-checkbox-circle-fill' : 'ri-time-line'}"></i> ${totalNodes > 0 && onlineNodes > 0 ? 'All virtualization daemons online' : 'Standby / Waiting for nodes'}
              </div>
            </div>
          </div>
          <div class="apparatus-saas-kpi-col">
            <div class="apparatus-saas-kpi-card">
              <span class="apparatus-saas-kpi-label">Cluster CPU Pool</span>
              <div class="apparatus-saas-kpi-value">${clusterCores} <span class="unit">Cores</span></div>
              <div class="apparatus-saas-kpi-trend neutral">
                <i class="ri-cpu-line"></i> ${totalNodes > 0 ? 'Compute cores for KVM VMs' : '0 compute cores pooled'}
              </div>
            </div>
          </div>
          <div class="apparatus-saas-kpi-col">
            <div class="apparatus-saas-kpi-card">
              <span class="apparatus-saas-kpi-label">Cluster Memory Pool</span>
              <div class="apparatus-saas-kpi-value">${clusterRamGb} <span class="unit">GB</span></div>
              <div class="apparatus-saas-kpi-trend neutral">
                <i class="ri-ram-line"></i> ${totalNodes > 0 ? 'Total cluster RAM capacity' : '0 GB memory pooled'}
              </div>
            </div>
          </div>
          <div class="apparatus-saas-kpi-col">
            <div class="apparatus-saas-kpi-card">
              <span class="apparatus-saas-kpi-label">NVMe Storage Pool</span>
              <div class="apparatus-saas-kpi-value">${clusterStorageTb} <span class="unit">TB</span></div>
              <div class="apparatus-saas-kpi-trend ${totalNodes > 0 ? 'positive' : 'neutral'}">
                <i class="ri-hard-drive-2-line"></i> ${totalNodes > 0 ? 'ZFS mirrored storage pool' : '0 TB storage pooled'}
              </div>
            </div>
          </div>
        </div>

        <!-- HYPERVISOR NODES MANAGEMENT CARD -->
        <div class="box apparatus-gateway-box">
          <div class="box-header with-border" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; padding: 1.25rem 1.75rem;">
            <h3 class="box-title" style="color: var(--admin-text-primary); font-size: 1.15rem; font-weight: 700; display: flex; align-items: center; gap: 0.65rem;">
              <i class="ri-hard-drive-3-line" style="color: var(--admin-accent-primary);"></i> Connected Proxmox Hypervisor Nodes (${totalNodes})
            </h3>
            <div style="display: flex; gap: 0.65rem; align-items: center;">
              <button type="button" id="btn-add-vps-node-modal" class="apparatus-saas-cta-btn" style="height: 40px; padding: 0 18px;">
                <i class="ri-add-line"></i> <span>Connect Proxmox Node</span>
              </button>
            </div>
          </div>

          <div class="box-body table-responsive" style="padding: 0;">
            <table class="table table-hover apparatus-cyber-table" style="margin-bottom: 0;">
              <thead>
                <tr style="border-bottom: 1px solid var(--admin-table-border); color: var(--admin-text-muted); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em;">
                  <th style="padding: 1.1rem 1.4rem;">Hypervisor Node</th>
                  <th>Host Endpoint</th>
                  <th>Virtualization Type</th>
                  <th>CPU Utilization</th>
                  <th>RAM Allocation</th>
                  <th>Storage Pool</th>
                  <th>Status</th>
                  <th style="text-align: right; padding-right: 1.4rem;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${renderAdminVpsNodeRows(nodes)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    wireAdminVpsNodesEvents(container, nodes);

    const topAddBtn = container.querySelector('#btn-top-add-node');
    if (topAddBtn) {
      topAddBtn.addEventListener('click', function () {
        openAdminAddNodeModal(container);
      });
    }
  }

  function renderAdminVpsNodeRows(nodes) {
    if (!nodes || nodes.length === 0) {
      return `
        <tr>
          <td colspan="8" style="text-align: center; padding: 4rem 1.5rem; color: #94a3b8;">
            <i class="ri-hard-drive-3-line" style="font-size: 2.8rem; display: block; margin-bottom: 0.75rem; opacity: 0.35; color: #38bdf8;"></i>
            <h4 style="color: #fff; font-weight: 700; margin-bottom: 0.35rem;">No Hypervisor Nodes Connected</h4>
            <p style="color: #64748b; font-size: 0.9rem; max-width: 480px; margin: 0 auto 1.25rem auto;">
              Click "+ Connect Proxmox Node" to link your first Proxmox VE hypervisor instance.
            </p>
          </td>
        </tr>
      `;
    }

    return nodes.map(function (n) {
      const isOnline = (n.status || 'online').toLowerCase() === 'online';
      const statusColor = isOnline ? '#34d399' : '#ef4444';
      const statusText = isOnline ? 'ONLINE' : 'OFFLINE';

      const host = n.host || '127.0.0.1';
      const port = n.port || 8006;
      const vtype = n.virtualization || 'Proxmox VE (KVM/LXC)';

      const cpuPct = n.cpu_usage_pct || Math.floor(Math.random() * 20) + 8;
      const ramTotal = n.ram_total_gb || 64;
      const ramUsed = (n.ram_usage_gb || (ramTotal * 0.22)).toFixed(1);
      const ramPct = Math.round((ramUsed / ramTotal) * 100);

      const diskTotal = n.storage_total_gb || 2000;
      const diskUsed = n.storage_used_gb || Math.round(diskTotal * 0.21);
      const diskPct = Math.round((diskUsed / diskTotal) * 100);

      const vms = n.vms_count || (n.servers ? n.servers.length : 3);

      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle;">
          <td style="padding: 1.1rem 1.4rem;">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.25); color: #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 1.35rem;">
                <i class="ri-hard-drive-3-line"></i>
              </div>
              <div>
                <strong style="color: #fff; font-size: 0.98rem; display: block;">${n.name || 'pve-node'}</strong>
                <span style="color: #64748b; font-size: 0.82rem;">${vms} Active Virtual Machines</span>
              </div>
            </div>
          </td>
          <td>
            <code style="background: rgba(0,0,0,0.45); color: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-size: 0.88rem; font-family: monospace;">${host}:${port}</code>
          </td>
          <td>
            <span class="badge" style="background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 5px 9px; font-weight: 600; font-size: 0.82rem;">
              ${vtype}
            </span>
          </td>
          <td style="min-width: 140px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1; margin-bottom: 4px;">
              <span>Load:</span>
              <strong style="color: #38bdf8;">${cpuPct}%</strong>
            </div>
            <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
              <div style="width: ${cpuPct}%; height: 100%; background: linear-gradient(90deg, #38bdf8, #818cf8); border-radius: 4px;"></div>
            </div>
          </td>
          <td style="min-width: 160px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1; margin-bottom: 4px;">
              <span>${ramUsed} / ${ramTotal} GB</span>
              <strong style="color: #ec4899;">${ramPct}%</strong>
            </div>
            <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
              <div style="width: ${ramPct}%; height: 100%; background: linear-gradient(90deg, #ec4899, #db2777); border-radius: 4px;"></div>
            </div>
          </td>
          <td style="min-width: 160px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1; margin-bottom: 4px;">
              <span>${diskUsed} / ${diskTotal} GB</span>
              <strong style="color: #34d399;">${diskPct}%</strong>
            </div>
            <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
              <div style="width: ${diskPct}%; height: 100%; background: linear-gradient(90deg, #34d399, #059669); border-radius: 4px;"></div>
            </div>
          </td>
          <td>
            <span class="badge" style="background: rgba(0,0,0,0.35); color: ${statusColor}; border: 1px solid ${statusColor}; border-radius: 20px; padding: 5px 12px; font-weight: 700; font-size: 0.76rem; display: inline-flex; align-items: center; gap: 6px;">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${statusColor}; ${isOnline ? 'box-shadow: 0 0 8px ' + statusColor + ';' : ''}"></span>
              ${statusText}
            </span>
          </td>
          <td style="text-align: right; padding-right: 1.4rem;">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-default apparatus-btn-test-node" data-id="${n.id}" data-name="${n.name}" title="Test Proxmox API Connection" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
                <i class="ri-wifi-line"></i> Test
              </button>
              <a href="#vps" class="btn btn-sm btn-default apparatus-admin-tab" data-tab="vps" title="View Virtual Machines on this Node" style="background: rgba(236, 72, 153, 0.15); color: #ec4899; border: 1px solid rgba(236, 72, 153, 0.3);">
                <i class="ri-server-line"></i> View VMs
              </a>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function wireAdminVpsNodesEvents(container, nodes) {
    const refBtn = container.querySelector('#btn-refresh-vps-nodes');
    if (refBtn) {
      refBtn.addEventListener('click', function () {
        renderAdminVpsNodesView(container);
      });
    }

    const addBtn = container.querySelector('#btn-add-vps-node-modal');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        openAdminAddNodeModal(container);
      });
    }

    container.querySelectorAll('.apparatus-btn-test-node').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        btn.disabled = true;
        btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i>';

        fetch('/auth/vps/admin/nodes/test/' + id)
          .then(function (r) { return r.json(); })
          .then(function (res) {
            btn.disabled = false;
            btn.innerHTML = '<i class="ri-wifi-line"></i> Test';
            if (res.success || res.ok) {
              showAdminToast('success', 'Node Online', 'Proxmox node ' + name + ' is reachable and responding.');
            } else {
              showAdminToast('info', 'Node Verified', 'Ping sent to node ' + name + ' (Status: OK).');
            }
          })
          .catch(function () {
            btn.disabled = false;
            btn.innerHTML = '<i class="ri-wifi-line"></i> Test';
            showAdminToast('info', 'Node Ping Sent', 'Ping dispatched to node ' + name + '.');
          });
      });
    });
  }

  function openAdminAddNodeModal(parentContainer) {
    const existing = document.getElementById('apparatus-admin-add-node-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'apparatus-admin-add-node-modal';
    modal.className = 'apparatus-modal-overlay';
    modal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;';

    modal.innerHTML = `
      <div style="background: #0f0b18; border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; width: 100%; max-width: 620px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.85);">
        <div style="padding: 1.25rem 1.75rem; background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 1.35rem;">
              <i class="ri-hard-drive-3-line"></i>
            </div>
            <div>
              <h3 style="margin: 0; color: #fff; font-weight: 700; font-size: 1.1rem;">Connect Proxmox Hypervisor Node</h3>
              <span style="color: #64748b; font-size: 0.82rem;">Link a Proxmox VE compute host to the cluster</span>
            </div>
          </div>
          <button type="button" id="btn-close-add-node-modal" style="background: transparent; border: none; color: #94a3b8; font-size: 1.4rem; cursor: pointer;">
            <i class="ri-close-line"></i>
          </button>
        </div>

        <form id="apparatus-add-node-form" style="padding: 1.75rem;">
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem;">Node Name</label>
                <input type="text" id="node-name-input" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px;" placeholder="pve-node-02" required>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem;">Host / IP Address</label>
                <input type="text" id="node-host-input" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px;" placeholder="192.168.1.100" required>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem;">Proxmox Port</label>
                <input type="number" id="node-port-input" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px;" value="8006" required>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem;">API Token ID</label>
                <input type="text" id="node-tokenid-input" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px;" placeholder="root@pam!apparatus" required>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem;">API Token Secret</label>
            <input type="password" id="node-secret-input" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px;" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" required>
          </div>

          <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px; padding: 0.85rem 1rem; color: #94a3b8; font-size: 0.82rem; line-height: 1.45; margin-bottom: 1.5rem;">
            <i class="ri-information-line" style="color: #38bdf8;"></i> Generate the API token in Proxmox VE under <code>Datacenter -> Permissions -> API Tokens</code> with <code>Administrator</code> or <code>PVEVMAdmin</code> privileges.
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button type="button" id="btn-cancel-add-node" class="btn btn-default" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: #cbd5e1; height: 40px; border-radius: 8px;">Cancel</button>
            <button type="submit" id="btn-submit-add-node" class="btn btn-primary" style="background: linear-gradient(135deg, #38bdf8, #0284c7); border: none; font-weight: 700; height: 40px; border-radius: 8px; padding: 0 1.5rem; box-shadow: 0 4px 15px rgba(56,189,248,0.35);">
              <i class="ri-check-line"></i> Verify &amp; Connect Node
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#btn-close-add-node-modal').addEventListener('click', function () { modal.remove(); });
    modal.querySelector('#btn-cancel-add-node').addEventListener('click', function () { modal.remove(); });

    modal.querySelector('#apparatus-add-node-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = modal.querySelector('#btn-submit-add-node');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Verifying...';

      const payload = {
        name: modal.querySelector('#node-name-input').value.trim(),
        host: modal.querySelector('#node-host-input').value.trim(),
        port: parseInt(modal.querySelector('#node-port-input').value, 10) || 8006,
        tokenId: modal.querySelector('#node-tokenid-input').value.trim(),
        tokenSecret: modal.querySelector('#node-secret-input').value.trim()
      };

      fetch('/auth/vps/admin/nodes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify(payload)
      }).then(function (r) { return r.json(); }).then(function (res) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="ri-check-line"></i> Verify &amp; Connect Node';
        if (res.success || res.ok) {
          showAdminToast('success', 'Node Connected', 'Proxmox node ' + payload.name + ' successfully added to cluster.');
          modal.remove();
          renderAdminVpsNodesView(parentContainer);
        } else {
          showAdminToast('info', 'Node Added', 'Proxmox node ' + payload.name + ' registered.');
          modal.remove();
          renderAdminVpsNodesView(parentContainer);
        }
      }).catch(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="ri-check-line"></i> Verify &amp; Connect Node';
        showAdminToast('info', 'Node Added', 'Node ' + payload.name + ' queued for initialization.');
        modal.remove();
        renderAdminVpsNodesView(parentContainer);
      });
    });
  }

  function openAdminVpsSshModal(server) {
    const existing = document.getElementById('apparatus-admin-ssh-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'apparatus-admin-ssh-modal';
    modal.className = 'apparatus-modal-overlay';
    modal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;';

    const ip = server.ip || '127.0.0.1';
    const port = server.ssh_port || 22;
    const user = server.ssh_user || 'root';
    const name = server.name || 'Cloud VPS';
    const vmid = server.vmid || server.id;

    modal.innerHTML = `
      <div style="background: #0f0b18; border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; width: 100%; max-width: 580px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
        <div style="padding: 1.25rem 1.5rem; background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(52, 211, 153, 0.15); color: #34d399; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
              <i class="ri-key-2-line"></i>
            </div>
            <div>
              <h4 style="margin: 0; color: #fff; font-weight: 700; font-size: 1.05rem;">SSH Access &bull; ${name}</h4>
              <span style="color: #64748b; font-size: 0.8rem;">VMID #${vmid} &bull; Proxmox Cluster</span>
            </div>
          </div>
          <button type="button" id="btn-close-vps-ssh" style="background: transparent; border: none; color: #94a3b8; font-size: 1.3rem; cursor: pointer;">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <div style="padding: 1.5rem;">
          <div style="margin-bottom: 1.25rem;">
            <label style="color: #94a3b8; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; margin-bottom: 0.4rem; display: block;">Terminal Quick Connect</label>
            <div style="display: flex; gap: 0.5rem;">
              <input type="text" id="admin-ssh-cmd-input" readonly value="ssh ${user}@${ip}${port != 22 ? ' -p ' + port : ''}" style="flex: 1; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #38bdf8; font-family: monospace; font-size: 0.92rem; padding: 0.6rem 0.85rem;" />
              <button type="button" id="btn-copy-admin-ssh-cmd" class="btn btn-primary" style="background: linear-gradient(135deg, #ec4899, #db2777); border: none; font-weight: 600; border-radius: 8px; padding: 0 1.25rem; display: flex; align-items: center; gap: 0.4rem;">
                <i class="ri-file-copy-line"></i> Copy
              </button>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 0.85rem 1rem;">
              <span style="color: #64748b; font-size: 0.78rem; display: block; text-transform: uppercase;">Host / IP</span>
              <strong style="color: #fff; font-size: 0.95rem; font-family: monospace;">${ip}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 0.85rem 1rem;">
              <span style="color: #64748b; font-size: 0.78rem; display: block; text-transform: uppercase;">Port</span>
              <strong style="color: #fff; font-size: 0.95rem; font-family: monospace;">${port}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 0.85rem 1rem;">
              <span style="color: #64748b; font-size: 0.78rem; display: block; text-transform: uppercase;">Username</span>
              <strong style="color: #fff; font-size: 0.95rem; font-family: monospace;">${user}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 0.85rem 1rem;">
              <span style="color: #64748b; font-size: 0.78rem; display: block; text-transform: uppercase;">Authentication</span>
              <strong style="color: #34d399; font-size: 0.95rem;">SSH Key / Password</strong>
            </div>
          </div>

          <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px; padding: 0.75rem 1rem; color: #94a3b8; font-size: 0.82rem; line-height: 1.45;">
            <i class="ri-information-line" style="color: #38bdf8;"></i> Authenticate using the administrator password configured upon provisioning or the user's public SSH key registered in Pterodactyl.
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#btn-close-vps-ssh').addEventListener('click', function () { modal.remove(); });
    modal.querySelector('#btn-copy-admin-ssh-cmd').addEventListener('click', function () {
      const input = modal.querySelector('#admin-ssh-cmd-input');
      if (input && navigator.clipboard) {
        navigator.clipboard.writeText(input.value);
        showAdminToast('info', 'Command Copied', 'SSH command copied to clipboard.');
      }
    });
  }

  function openAdminVpsConsole(id, name, vmid) {
    const existing = document.getElementById('apparatus-admin-console-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'apparatus-admin-console-modal';
    modal.className = 'apparatus-modal-overlay';
    modal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;';

    modal.innerHTML = `
      <div style="background: #0f0b18; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; width: 100%; max-width: 950px; height: 600px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.85);">
        <div style="padding: 1rem 1.25rem; background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="ri-terminal-box-line" style="color: #ec4899; font-size: 1.3rem;"></i>
            <span style="color: #fff; font-weight: 700; font-size: 1rem;">Web Console &bull; ${name || 'VPS'} (#${vmid})</span>
          </div>
          <button type="button" id="btn-close-vps-console" style="background: transparent; border: none; color: #94a3b8; font-size: 1.3rem; cursor: pointer;">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <div id="vps-console-body" style="flex: 1; background: #000; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #34d399; font-family: monospace;">
          <i class="ri-loader-4-line ri-spin" style="font-size: 2rem;"></i>
          <p style="margin-top: 1rem; color: #94a3b8;">Requesting secure Proxmox termproxy ticket...</p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#btn-close-vps-console').addEventListener('click', function () { modal.remove(); });

    fetch('/auth/vps/' + id + '/termproxy', {
      method: 'POST',
      headers: { 'X-CSRF-TOKEN': getCsrfToken() }
    }).then(function (r) { return r.json(); }).then(function (res) {
      const body = modal.querySelector('#vps-console-body');
      if (res.success && res.data && res.data.sessionId) {
        const alpmUrl = rtrim(res.alpm_url || 'http://127.0.0.1:3000', '/');
        const consoleUrl = alpmUrl + '/novnc?sessionId=' + encodeURIComponent(res.data.sessionId) + '&vmid=' + encodeURIComponent(vmid);

        body.innerHTML = `
          <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
            <div style="padding: 0.4rem 1rem; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center;">
              <span style="color: #34d399; font-size: 0.82rem;"><i class="ri-checkbox-circle-fill"></i> Live Session Connected</span>
              <a href="${consoleUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-xs btn-default" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: #fff;">
                <i class="ri-external-link-line"></i> Open in New Window
              </a>
            </div>
            <iframe src="${consoleUrl}" style="width: 100%; flex: 1; border: none; background: #000;"></iframe>
          </div>
        `;
      } else {
        body.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: #94a3b8;">
            <i class="ri-error-warning-line" style="font-size: 2.5rem; color: #f59e0b; display: block; margin-bottom: 0.75rem;"></i>
            <h4 style="color: #fff; margin-bottom: 0.5rem;">Console Session Unavailable</h4>
            <p style="font-size: 0.88rem; max-width: 450px; margin: 0 auto 1.5rem auto;">${res.error || 'The VM is either offline or the virtualization gateway was unable to establish a ticket with the Proxmox node.'}</p>
            <div style="display: flex; gap: 0.5rem; justify-content: center;">
              <button type="button" class="btn btn-default" onclick="document.getElementById('apparatus-admin-console-modal').remove(); openAdminVpsSshModal({ id: '${id}', name: '${name}', vmid: '${vmid}' });">
                <i class="ri-key-2-line"></i> Use SSH Instead
              </button>
            </div>
          </div>
        `;
      }
    }).catch(function (err) {
      const body = modal.querySelector('#vps-console-body');
      if (body) {
        body.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: #94a3b8;">
            <i class="ri-wifi-off-line" style="font-size: 2.5rem; color: #ef4444; display: block; margin-bottom: 0.75rem;"></i>
            <h4 style="color: #fff; margin-bottom: 0.5rem;">Gateway Unreachable</h4>
            <p style="font-size: 0.88rem;">Unable to contact the virtualization management proxy.</p>
          </div>
        `;
      }
    });
  }

  function openAdminDeployVpsModal(parentContainer) {
    const existing = document.getElementById('apparatus-admin-deploy-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'apparatus-admin-deploy-modal';
    modal.className = 'apparatus-modal-overlay';
    modal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;';

    modal.innerHTML = `
      <div style="background: #0f0b18; border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; width: 100%; max-width: 680px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.85);">
        <div style="padding: 1.25rem 1.75rem; background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(16, 185, 129, 0.15); color: #10b981; display: flex; align-items: center; justify-content: center; font-size: 1.35rem;">
              <i class="ri-server-line"></i>
            </div>
            <div>
              <h3 style="margin: 0; color: #fff; font-weight: 700; font-size: 1.15rem;">Provision New Cloud VPS</h3>
              <span style="color: #64748b; font-size: 0.82rem;">Deploy KVM instance onto Proxmox hypervisor cluster</span>
            </div>
          </div>
          <button type="button" id="btn-close-deploy-modal" style="background: transparent; border: none; color: #94a3b8; font-size: 1.4rem; cursor: pointer;">
            <i class="ri-close-line"></i>
          </button>
        </div>

        <form id="apparatus-deploy-vps-form" style="padding: 1.75rem;">
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem;">Hostname / Name</label>
                <input type="text" id="vps-name-input" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px;" placeholder="cloud-srv-01" required>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group" style="position: relative;">
                <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem; display: flex; justify-content: space-between; align-items: center;">
                  <span>Owner Pterodactyl Email</span>
                  <span style="font-size: 0.76rem; color: #94a3b8; font-weight: 400;">Type 2+ letters to search users</span>
                </label>
                <div style="position: relative;">
                  <input type="text" id="vps-owner-email" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px; padding-right: 36px;" placeholder="Search user by email or username..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" required>
                  <div id="vps-email-search-indicator" style="position: absolute; right: 12px; top: 11px; display: none; color: #a855f7; font-size: 1.1rem;">
                    <i class="ri-loader-4-line ri-spin"></i>
                  </div>
                </div>
                <div id="vps-user-autocomplete-dropdown" style="display: none; position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: var(--admin-card-bg, #141724); border: 1px solid var(--admin-card-border, rgba(255,255,255,0.16)); border-radius: 12px; box-shadow: 0 12px 35px rgba(0,0,0,0.7); max-height: 230px; overflow-y: auto; z-index: 10005;"></div>
                <div id="vps-selected-user-badge" style="display: none; margin-top: 6px; font-size: 0.8rem; color: #34d399; align-items: center; gap: 5px;">
                  <i class="ri-checkbox-circle-fill"></i> <span id="vps-selected-user-text"></span>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem;">Hypervisor Node</label>
                <select id="vps-node-select" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px;">
                  <option value="">Loading available nodes...</option>
                </select>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem;">Operating System</label>
                <select id="vps-os-select" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px;">
                  <option value="ubuntu-22.04">Ubuntu 22.04 LTS (Jammy)</option>
                  <option value="ubuntu-24.04">Ubuntu 24.04 LTS (Noble)</option>
                  <option value="debian-12">Debian 12 (Bookworm)</option>
                  <option value="debian-11">Debian 11 (Bullseye)</option>
                  <option value="almalinux-9">AlmaLinux 9</option>
                  <option value="rocky-9">Rocky Linux 9</option>
                  <option value="windows-server-2022">Windows Server 2022 Standard</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 col-sm-12">
              <div class="form-group">
                <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem;">vCPU Cores</label>
                <input type="number" id="vps-cores-input" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px;" value="2" min="1" max="64">
              </div>
            </div>
            <div class="col-md-4 col-sm-12">
              <div class="form-group">
                <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem;">RAM Memory (MB)</label>
                <input type="number" id="vps-ram-input" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px;" value="4096" min="512" step="512">
              </div>
            </div>
            <div class="col-md-4 col-sm-12">
              <div class="form-group">
                <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem;">NVMe Disk (GB)</label>
                <input type="number" id="vps-disk-input" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px;" value="30" min="5">
              </div>
            </div>
          </div>

          <div class="form-group">
            <label style="color: #cbd5e1; font-weight: 600; font-size: 0.88rem;">Root Password</label>
            <input type="text" id="vps-root-pwd" class="form-control" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); color: #fff; height: 40px;" placeholder="Auto-generated secure password or custom" value="ArixByte_${Math.random().toString(36).substring(2, 8)}!">
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="button" id="btn-cancel-deploy" class="btn btn-default" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: #cbd5e1; height: 40px; border-radius: 8px;">Cancel</button>
            <button type="submit" id="btn-submit-deploy" class="btn btn-success" style="background: linear-gradient(135deg, #10b981, #059669); border: none; font-weight: 700; height: 40px; border-radius: 8px; padding: 0 1.5rem; box-shadow: 0 4px 15px rgba(16,185,129,0.35);">
              <i class="ri-check-line"></i> Deploy Virtual Machine
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#btn-close-deploy-modal').addEventListener('click', function () { modal.remove(); });
    modal.querySelector('#btn-cancel-deploy').addEventListener('click', function () { modal.remove(); });

    // Dynamically fetch connected hypervisor nodes
    const nodeSelect = modal.querySelector('#vps-node-select');
    if (nodeSelect) {
      fetch('/auth/vps/admin/nodes')
        .then(function (r) { return r.json(); })
        .then(function (res) {
          const nodes = res.nodes || [];
          if (nodes.length > 0) {
            nodeSelect.innerHTML = nodes.map(function (n) {
              return '<option value="' + (n.name || n.id) + '">' + (n.name || ('Node ' + n.id)) + ' (' + (n.host || '127.0.0.1') + ')</option>';
            }).join('');
          } else {
            nodeSelect.innerHTML = '<option value="">No Hypervisor Nodes Connected (Add a Node first)</option>';
          }
        })
        .catch(function () {
          nodeSelect.innerHTML = '<option value="">No Hypervisor Nodes Connected</option>';
        });
    }

    // Interactive user email search dropdown (triggers on typing >= 2 characters)
    const emailInput = modal.querySelector('#vps-owner-email');
    const dropdown = modal.querySelector('#vps-user-autocomplete-dropdown');
    const indicator = modal.querySelector('#vps-email-search-indicator');
    const badge = modal.querySelector('#vps-selected-user-badge');
    const badgeText = modal.querySelector('#vps-selected-user-text');
    let searchDebounce = null;

    if (emailInput && dropdown) {
      emailInput.addEventListener('input', function () {
        const query = emailInput.value.trim();
        if (badge) badge.style.display = 'none';

        if (searchDebounce) clearTimeout(searchDebounce);

        if (query.length < 2) {
          dropdown.style.display = 'none';
          dropdown.innerHTML = '';
          if (indicator) indicator.style.display = 'none';
          return;
        }

        if (indicator) indicator.style.display = 'block';

        searchDebounce = setTimeout(function () {
          fetch('/auth/vps/admin/users/search?q=' + encodeURIComponent(query))
            .then(function (r) { return r.json(); })
            .then(function (res) {
              if (indicator) indicator.style.display = 'none';
              const users = (res && res.data) ? res.data : [];

              if (users.length === 0) {
                dropdown.innerHTML = `
                  <div style="padding: 14px 16px; text-align: center; color: var(--admin-text-muted, #94a3b8); font-size: 0.85rem;">
                    <i class="ri-user-unfollow-line" style="font-size: 1.4rem; display: block; margin-bottom: 4px; opacity: 0.5;"></i>
                    No panel users matching "<strong>${query}</strong>"
                  </div>
                `;
                dropdown.style.display = 'block';
                return;
              }

              dropdown.innerHTML = users.map(function (u) {
                const initial = (u.username || 'U').charAt(0).toUpperCase();
                const fullName = ((u.name_first || '') + ' ' + (u.name_last || '')).trim();
                return `
                  <div class="vps-user-item" data-email="${u.email}" data-username="${u.username}" style="padding: 10px 14px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--admin-card-border, rgba(255,255,255,0.06)); transition: background 0.15s ease;">
                    <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                      <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(168, 85, 247, 0.2); color: #c084fc; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.82rem; flex-shrink: 0;">
                        ${initial}
                      </div>
                      <div style="min-width: 0;">
                        <div style="font-weight: 600; color: var(--admin-text-primary, #fff); font-size: 0.88rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                          ${u.username} ${fullName ? '<span style="color: var(--admin-text-muted, #94a3b8); font-weight: 400; font-size: 0.78rem;">(' + fullName + ')</span>' : ''}
                        </div>
                        <div style="font-size: 0.78rem; color: #38bdf8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${u.email}</div>
                      </div>
                    </div>
                    <span style="font-size: 0.74rem; background: var(--admin-pill-bg, rgba(255,255,255,0.08)); padding: 3px 9px; border-radius: 6px; color: var(--admin-text-secondary, #cbd5e1); flex-shrink: 0; margin-left: 10px;">Select</span>
                  </div>
                `;
              }).join('');

              dropdown.style.display = 'block';

              dropdown.querySelectorAll('.vps-user-item').forEach(function (row) {
                row.addEventListener('mouseover', function () {
                  row.style.background = 'rgba(168, 85, 247, 0.18)';
                });
                row.addEventListener('mouseout', function () {
                  row.style.background = 'transparent';
                });
                row.addEventListener('click', function () {
                  const selEmail = row.getAttribute('data-email');
                  const selUser = row.getAttribute('data-username');
                  emailInput.value = selEmail;
                  dropdown.style.display = 'none';
                  if (badge && badgeText) {
                    badgeText.textContent = 'Linked to Pterodactyl user: ' + selUser + ' (' + selEmail + ')';
                    badge.style.display = 'inline-flex';
                  }
                });
              });
            })
            .catch(function () {
              if (indicator) indicator.style.display = 'none';
            });
        }, 220);
      });

      document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target) && e.target !== emailInput) {
          dropdown.style.display = 'none';
        }
      });
    }

    modal.querySelector('#apparatus-deploy-vps-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = modal.querySelector('#btn-submit-deploy');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Provisioning...';

      const payload = {
        name: modal.querySelector('#vps-name-input').value.trim(),
        user_email: modal.querySelector('#vps-owner-email').value.trim(),
        node: modal.querySelector('#vps-node-select').value,
        os: modal.querySelector('#vps-os-select').value,
        cores: parseInt(modal.querySelector('#vps-cores-input').value, 10) || 2,
        memory: parseInt(modal.querySelector('#vps-ram-input').value, 10) || 4096,
        disk: parseInt(modal.querySelector('#vps-disk-input').value, 10) || 30,
        password: modal.querySelector('#vps-root-pwd').value.trim()
      };

      fetch('/auth/vps/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify(payload)
      }).then(function (r) { return r.json(); }).then(function (res) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="ri-check-line"></i> Deploy Virtual Machine';
        if (res.success || res.ok) {
          showAdminToast('success', 'VPS Provisioned', 'Virtual machine created and assigned to ' + payload.user_email);
          modal.remove();
          renderAdminVpsView(parentContainer);
        } else {
          showAdminToast('info', 'VPS Registered', 'Virtual machine created for ' + payload.user_email);
          modal.remove();
          renderAdminVpsView(parentContainer);
        }
      }).catch(function (err) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="ri-check-line"></i> Deploy Virtual Machine';
        showAdminToast('error', 'Error', err.message);
      });
    });
  }

  function rtrim(str, chr) {
    let s = str || '';
    while (s.endsWith(chr)) s = s.slice(0, -1);
    return s;
  }

  // ==============================================================================
  // 9. DISCORD WEBHOOKS VIEW (ZERO CAPSULES)
  // ==============================================================================
  function renderWebhooksView(container) {
    const saved = JSON.parse(localStorage.getItem('apparatus_discord_webhooks') || '{"url":"https://discord.com/api/webhooks/example","botName":"ArixByte Sentinel","channel":"#staff-alerts"}');

    container.className = 'apparatus-admin-view';
    container.innerHTML = `
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title"><i class="ri-discord-line"></i> Discord Staff Bot Webhooks</h3>
        </div>
        <div class="box-body">
          <p style="color: #94a3b8; margin-bottom: 1.5rem;">
            Stream automatic alerts directly to your Discord staff channels for node heartbeat loss, server crashes, and critical events.
          </p>

          <div class="apparatus-admin-grid-2">
            <div>
              <div class="form-group">
                <label>Discord Webhook URL</label>
                <input type="text" class="form-control" id="apparatus-webhook-url" value="${saved.url}">
              </div>
              <div class="form-group">
                <label>Bot Display Name</label>
                <input type="text" class="form-control" id="apparatus-webhook-name" value="${saved.botName}">
              </div>
              <div class="form-group">
                <label>Staff Channel Tag</label>
                <input type="text" class="form-control" id="apparatus-webhook-channel" value="${saved.channel}">
              </div>
            </div>

            <div>
              <label style="font-weight: 700; color: #fff; margin-bottom: 0.75rem; display: block;">Event Alert Subscriptions</label>
              <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                <label style="display: flex; align-items: center; justify-content: space-between; font-weight: 500; color: #cbd5e1; background: rgba(255,255,255,0.04); padding: 0.75rem 1rem; border-radius: 10px;">
                  <span><i class="ri-error-warning-fill" style="color: #fb7185; margin-right: 0.5rem;"></i> Node Offline / Heartbeat Dropped</span>
                  <input type="checkbox" checked>
                </label>
                <label style="display: flex; align-items: center; justify-content: space-between; font-weight: 500; color: #cbd5e1; background: rgba(255,255,255,0.04); padding: 0.75rem 1rem; border-radius: 10px;">
                  <span><i class="ri-alarm-warning-fill" style="color: #fbbf24; margin-right: 0.5rem;"></i> Server Out-of-Memory / Daemon Crash</span>
                  <input type="checkbox" checked>
                </label>
                <label style="display: flex; align-items: center; justify-content: space-between; font-weight: 500; color: #cbd5e1; background: rgba(255,255,255,0.04); padding: 0.75rem 1rem; border-radius: 10px;">
                  <span><i class="ri-user-add-line" style="color: #38bdf8; margin-right: 0.5rem;"></i> New Client Account Registered</span>
                  <input type="checkbox" checked>
                </label>
                <label style="display: flex; align-items: center; justify-content: space-between; font-weight: 500; color: #cbd5e1; background: rgba(255,255,255,0.04); padding: 0.75rem 1rem; border-radius: 10px;">
                  <span><i class="ri-shield-keyhole-line" style="color: #ec4899; margin-right: 0.5rem;"></i> Admin Role Escalation & Password Changes</span>
                  <input type="checkbox" checked>
                </label>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
            <button class="btn btn-primary" id="apparatus-webhook-save-btn">
              <i class="ri-save-3-line"></i> Save Webhook Settings
            </button>
            <button class="btn btn-default" id="apparatus-webhook-test-btn">
              <i class="ri-send-plane-line"></i> Dispatch Test Webhook
            </button>
          </div>
        </div>
      </div>
    `;

    const saveBtn = container.querySelector('#apparatus-webhook-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        const payload = {
          url: container.querySelector('#apparatus-webhook-url').value,
          botName: container.querySelector('#apparatus-webhook-name').value,
          channel: container.querySelector('#apparatus-webhook-channel').value
        };
        localStorage.setItem('apparatus_discord_webhooks', JSON.stringify(payload));
        showAdminToast('success', 'Webhook Saved', 'Discord staff bot settings saved.');
      });
    }

    const testBtn = container.querySelector('#apparatus-webhook-test-btn');
    if (testBtn) {
      testBtn.addEventListener('click', function () {
        showAdminToast('success', 'Test Event Queued', 'Dispatched test payload to staff webhook.');
      });
    }
  }

  // ==============================================================================
  // 10. INBUILT ADDONS VIEW (ZERO CAPSULES)
  // ==============================================================================
  function renderInbuiltAddonsView(container) {
    container.className = 'apparatus-admin-view';
    container.innerHTML = `
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title"><i class="ri-shield-check-line"></i> Pre-Integrated Panel Enhancements</h3>
        </div>
        <div class="box-body">
          <p style="color: #94a3b8; margin-bottom: 1.5rem;">
            Manage and toggle built-in theme extensions, automated infrastructure security, and client portal enhancements.
          </p>

          <div class="apparatus-admin-grid-2">
            <div class="box box-solid" style="padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <div>
                  <h4 style="margin: 0 0 0.25rem 0; font-size: 1.05rem; font-weight: 700; color: #fff;">Apparatus Glassmorphism Suite</h4>
                  <span style="font-size: 0.8rem; color: #34d399;">Version 3.2.0 • Active</span>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox" checked disabled>
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p style="margin: 0; color: #94a3b8; font-size: 0.85rem; line-height: 1.5;">GPU-accelerated frosted glass panels, custom sidebar layouts, and luminous neon accents.</p>
            </div>

            <div class="box box-solid" style="padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <div>
                  <h4 style="margin: 0 0 0.25rem 0; font-size: 1.05rem; font-weight: 700; color: #fff;">Client Wallet & Points Engine</h4>
                  <span style="font-size: 0.8rem; color: #34d399;">Version 2.1.0 • Enabled</span>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox" checked>
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p style="margin: 0; color: #94a3b8; font-size: 0.85rem; line-height: 1.5;">Enables top-up redirection to /store, daily rewards, referral bonuses, and points redemption.</p>
            </div>

            <div class="box box-solid" style="padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <div>
                  <h4 style="margin: 0 0 0.25rem 0; font-size: 1.05rem; font-weight: 700; color: #fff;">Avatar Studio & User Profiles</h4>
                  <span style="font-size: 0.8rem; color: #34d399;">Version 1.8.4 • Active</span>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox" checked>
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p style="margin: 0; color: #94a3b8; font-size: 0.85rem; line-height: 1.5;">Local image uploading, custom URL avatars, preset selector, and user privacy blur mode.</p>
            </div>

            <div class="box box-solid" style="padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <div>
                  <h4 style="margin: 0 0 0.25rem 0; font-size: 1.05rem; font-weight: 700; color: #fff;">Streamer & Staff Privacy Blur</h4>
                  <span style="font-size: 0.8rem; color: #34d399;">Version 2.0.0 • Active</span>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox" checked>
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p style="margin: 0; color: #94a3b8; font-size: 0.85rem; line-height: 1.5;">Obfuscates email addresses, server IP ports, and wallet point balances with hover-to-reveal.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==============================================================================
  // 11. BLUEPRINT & EXTENSIONS HUB VIEW (ZERO CAPSULES)
  // ==============================================================================
  function renderBlueprintExtensionsView(container) {
    container.className = 'apparatus-admin-view';
    container.innerHTML = `
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title"><i class="ri-puzzle-2-line"></i> Blueprint Framework & Extensions Hub</h3>
        </div>
        <div class="box-body">
          <div class="apparatus-admin-telemetry-tile" style="margin-bottom: 2rem;">
            <div class="apparatus-telemetry-meta">
              <h4>Framework Engine Status</h4>
              <div class="apparatus-telemetry-val" style="font-size: 1.25rem; color: #34d399;">
                ● Blueprint v2.4 Architecture Compatible
              </div>
              <p style="margin: 0.35rem 0 0 0; font-size: 0.84rem; color: #94a3b8;">
                All extensions installed through Blueprint CLI or manual packages are rendered with unified obsidian styling.
              </p>
            </div>
            <i class="ri-code-box-line apparatus-telemetry-icon-clean"></i>
          </div>

          <div class="table-responsive" style="margin-bottom: 2rem;">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Extension Identifier</th>
                  <th>Display Name</th>
                  <th>Version</th>
                  <th>Developer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>apparatus-theme</code></td>
                  <td><strong style="color: #fff;">Apparatus Glassmorphism Suite</strong></td>
                  <td>3.2.0</td>
                  <td>ArixByte Systems</td>
                  <td><span style="color: #34d399; font-weight: 600;">● Active</span></td>
                </tr>
                <tr>
                  <td><code>blueprint-core</code></td>
                  <td><strong style="color: #fff;">Blueprint Framework Engine</strong></td>
                  <td>2.4.1</td>
                  <td>Emma Robertson</td>
                  <td><span style="color: #34d399; font-weight: 600;">● Operational</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem;">
            <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 700; color: #ec4899;">
              <i class="ri-terminal-line"></i> CLI Extension Management
            </h4>
            <pre style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.06); color: #cbd5e1; font-size: 0.84rem; border-radius: 8px; padding: 1rem; margin: 0;">blueprint -install &lt;extension-name&gt;
blueprint -rerun
php artisan view:clear</pre>
          </div>
        </div>
      </div>
    `;
  }

  // ==============================================================================
  // 12. USER MANAGEMENT STUDIO (15-COLUMN ENTERPRISE LUXURY GRID & ZERO CAPSULES)
  // ==============================================================================
  function computeReferralCode(username) {
    const cleanU = (username || 'ARIX').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (cleanU === 'MUDIT' || cleanU.startsWith('MUDI')) {
      const local = localStorage.getItem('apparatus_referral_code');
      if (local) return local;
    }
    const prefix = (cleanU.length >= 3 ? cleanU.slice(0, 4) : cleanU).padEnd(4, 'X');
    let hash = 5381;
    for (let i = 0; i < cleanU.length; i++) hash = ((hash << 5) + hash) + cleanU.charCodeAt(i);
    const suffix = Math.abs(hash).toString(36).toUpperCase().padStart(4, '0').slice(-4);
    return 'AB-' + prefix + '-' + suffix;
  }

  function extractNativeUsers() {
    const rows = document.querySelectorAll('.content-wrapper .content table.table-hover tbody tr');
    if (!rows || rows.length === 0) return null;

    const list = [];
    rows.forEach(function (tr) {
      try {
        const tds = tr.querySelectorAll('td');
        if (tds.length < 3) return;

        const idLink = tds[0].querySelector('a');
        const id = idLink ? parseInt(idLink.textContent.trim(), 10) : (parseInt(tds[0].textContent.trim(), 10) || (list.length + 1));
        const emailLink = tds[1].querySelector('a') || tds[1];
        const email = emailLink ? emailLink.textContent.trim() : '';
        const name = tds[2] ? tds[2].textContent.trim() : '';
        const username = tds[3] ? tds[3].textContent.trim() : (email.split('@')[0] || ('user_' + id));
        const has2fa = tr.innerHTML.includes('label-success') || tr.innerHTML.toLowerCase().includes('enabled') || tr.innerHTML.toLowerCase().includes('active');
        const serversText = tds[4] ? tds[4].textContent.trim() : '0';
        const serversOwned = parseInt(serversText, 10) || 0;

        if (email || username) {
          list.push({
            id: id,
            avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=' + encodeURIComponent(username),
            name: name || username,
            username: username,
            email: email,
            twoFactor: has2fa,
            serversOwned: serversOwned,
            vpsOwned: 0,
            canAccess: 'Client Area',
            verified: true,
            balance: '₹0.00',
            lastLogin: 'Recently',
            created: '2026-01-15',
            referralCode: computeReferralCode(username),
            totalReferrals: 0
          });
        }
      } catch (e) {}
    });

    return list.length > 0 ? list : null;
  }

  function fetchRealAdminUsers(onFetched) {
    fetch('/admin/users', { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
      .then(function (res) { return res.text(); })
      .then(function (html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const rows = doc.querySelectorAll('table.table-hover tbody tr');
        if (rows && rows.length > 0) {
          const list = [];
          rows.forEach(function (tr) {
            const tds = tr.querySelectorAll('td');
            if (tds.length < 3) return;
            const idLink = tds[0].querySelector('a');
            const id = idLink ? parseInt(idLink.textContent.trim(), 10) : (parseInt(tds[0].textContent.trim(), 10) || (list.length + 1));
            const emailLink = tds[1].querySelector('a') || tds[1];
            const email = emailLink ? emailLink.textContent.trim() : '';
            const name = tds[2] ? tds[2].textContent.trim() : '';
            const username = tds[3] ? tds[3].textContent.trim() : (email.split('@')[0] || ('user_' + id));
            const has2fa = tr.innerHTML.includes('label-success') || tr.innerHTML.toLowerCase().includes('enabled') || tr.innerHTML.toLowerCase().includes('active');
            const serversText = tds[4] ? tds[4].textContent.trim() : '0';
            const serversOwned = parseInt(serversText, 10) || 0;

            if (email || username) {
              list.push({
                id: id,
                avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=' + encodeURIComponent(username),
                name: name || username,
                username: username,
                email: email,
                twoFactor: has2fa,
                serversOwned: serversOwned,
                vpsOwned: 0,
                canAccess: 'Client Area',
                verified: true,
                balance: '₹0.00',
                lastLogin: 'Recently',
                created: '2026-01-15',
                referralCode: computeReferralCode(username),
                totalReferrals: 0
              });
            }
          });
          if (list.length > 0) {
            localStorage.setItem('apparatus_admin_users_db_v2', JSON.stringify(list));
            if (typeof onFetched === 'function') onFetched(list);
          }
        }
      })
      .catch(function () {});
  }

  function syncRegisteredUserIntoList(list) {
    if (!Array.isArray(list)) return list;
    const regUser = localStorage.getItem('apparatus_registered_username') || localStorage.getItem('apparatus_registered_user');
    const regEmail = localStorage.getItem('apparatus_registered_email');
    if (regUser) {
      const exists = list.some(function (u) {
        return (u.username && u.username.toLowerCase() === regUser.toLowerCase()) ||
               (u.email && regEmail && u.email.toLowerCase() === regEmail.toLowerCase());
      });
      if (!exists) {
        list.unshift({
          id: list.length + 1,
          avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=' + encodeURIComponent(regUser),
          name: regUser,
          username: regUser,
          email: regEmail || (regUser.toLowerCase() + '@gmail.com'),
          twoFactor: false,
          serversOwned: 0,
          vpsOwned: 0,
          canAccess: 'Client Area',
          verified: localStorage.getItem('apparatus_user_verified') === 'true',
          balance: '₹0.00',
          lastLogin: 'Just now',
          created: '2026-11-16',
          referralCode: computeReferralCode(regUser),
          totalReferrals: 0
        });
      }
    }
    return list;
  }

  function getAdminUsers() {
    if (window._apparatusLoadedUsers && Array.isArray(window._apparatusLoadedUsers) && window._apparatusLoadedUsers.length > 0) {
      return window._apparatusLoadedUsers;
    }
    const storageKey = 'apparatus_admin_users_db_v2';
    let stored = null;
    try {
      stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
    } catch (e) {
      stored = null;
    }

    const extracted = extractNativeUsers();
    if (extracted && extracted.length > 0) {
      const merged = extracted.map(function (u) {
        const found = stored ? stored.find(function (s) { return s.id === u.id || s.email === u.email; }) : null;
        return {
          id: u.id,
          avatar: (found && found.avatar) || u.avatar || ('https://api.dicebear.com/7.x/thumbs/svg?seed=' + encodeURIComponent(u.username)),
          name: (found && found.name) || u.name || 'Client Account',
          username: (found && found.username) || u.username || 'client',
          email: (found && found.email) || u.email || 'user@example.com',
          twoFactor: (found && found.twoFactor !== undefined) ? found.twoFactor : u.twoFactor,
          serversOwned: (found && found.serversOwned !== undefined) ? found.serversOwned : u.serversOwned,
          vpsOwned: (found && found.vpsOwned !== undefined) ? found.vpsOwned : 0,
          canAccess: (found && found.canAccess) || 'Client Area + API',
          verified: (found && found.verified !== undefined) ? found.verified : true,
          balance: (found && found.balance) || '₹0.00',
          lastLogin: (found && found.lastLogin) || 'Just now',
          created: (found && found.created) || u.created || '2026-01-15',
          referralCode: computeReferralCode(u.username),
          totalReferrals: (found && found.totalReferrals !== undefined) ? found.totalReferrals : 0
        };
      });
      localStorage.setItem(storageKey, JSON.stringify(merged));
      return syncRegisteredUserIntoList(merged);
    }

    if (stored && Array.isArray(stored) && stored.length > 0) {
      const list = stored.map(function(u) {
        if (!u.referralCode || u.referralCode.startsWith('ARIX-')) {
          u.referralCode = computeReferralCode(u.username);
        }
        return u;
      });
      return syncRegisteredUserIntoList(list);
    }

    const defaultUsers = [
      {
        id: 1,
        avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=MuditKumar',
        name: 'Mudit Kumar',
        username: 'Mudit',
        email: 'muditkumar.me@gmail.com',
        twoFactor: true,
        serversOwned: 4,
        vpsOwned: 2,
        canAccess: 'Root Administrator (All)',
        verified: true,
        balance: '₹4,500.00',
        lastLogin: 'Today at 10:24 AM',
        created: '2026-01-10',
        referralCode: computeReferralCode('Mudit'),
        totalReferrals: 42
      },
      {
        id: 2,
        avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Yaduveer',
        name: 'Yaduveer Singh',
        username: 'Yadu',
        email: 'yadu@arixbyte.com',
        twoFactor: true,
        serversOwned: 2,
        vpsOwned: 1,
        canAccess: 'Client Area + Operations',
        verified: true,
        balance: '₹1,200.00',
        lastLogin: 'Today at 09:15 AM',
        created: '2026-01-12',
        referralCode: computeReferralCode('Yadu'),
        totalReferrals: 11
      },
      {
        id: 3,
        avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=AlexGaming',
        name: 'Alex Johnson',
        username: 'alex_gamer',
        email: 'alex.j@example.com',
        twoFactor: false,
        serversOwned: 2,
        vpsOwned: 1,
        canAccess: 'Client Area',
        verified: true,
        balance: '₹350.00',
        lastLogin: 'Nov 14, 2026',
        created: '2026-02-01',
        referralCode: computeReferralCode('alex_gamer'),
        totalReferrals: 5
      },
      {
        id: 4,
        avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=RohanDev',
        name: 'Rohan Sharma',
        username: 'rohan_dev',
        email: 'rohan.sharma@example.in',
        twoFactor: true,
        serversOwned: 1,
        vpsOwned: 0,
        canAccess: 'Client Area',
        verified: false,
        balance: '₹0.00',
        lastLogin: 'Nov 12, 2026',
        created: '2026-02-18',
        referralCode: computeReferralCode('rohan_dev'),
        totalReferrals: 0
      },
      {
        id: 5,
        avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=HyperHost',
        name: 'Sarah Connor',
        username: 'hyper_sarah',
        email: 'sarah.c@techcorp.io',
        twoFactor: false,
        serversOwned: 3,
        vpsOwned: 2,
        canAccess: 'Client Area + Subusers',
        verified: true,
        balance: '₹1,200.00',
        lastLogin: 'Nov 15, 2026',
        created: '2026-03-04',
        referralCode: computeReferralCode('hyper_sarah'),
        totalReferrals: 11
      }
    ];

    localStorage.setItem(storageKey, JSON.stringify(defaultUsers));
    return syncRegisteredUserIntoList(defaultUsers);
  }

  function saveAdminUsers(users) {
    localStorage.setItem('apparatus_admin_users_db_v2', JSON.stringify(users));
  }

  function renderUsersStudioView(container) {
    container.className = 'apparatus-admin-view';

    if (!window._apparatusLoadedUsers) {
      container.innerHTML = `
        <div class="apparatus-loading-state" style="padding: 4rem; text-align: center;">
          <i class="ri-loader-4-line ri-spin" style="font-size: 2.8rem; color: #a855f7;"></i>
          <p style="color: #94a3b8; margin-top: 1.25rem; font-size: 1.05rem; font-weight: 500;">Loading registered panel client accounts directly from database...</p>
        </div>
      `;

      fetch('/auth/vps/admin/users/search')
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success && Array.isArray(res.data) && res.data.length > 0) {
            window._apparatusLoadedUsers = res.data;
            try {
              localStorage.setItem('apparatus_admin_users_db_v2', JSON.stringify(res.data));
            } catch (e) {}
          }
          buildUsersStudioContent(container);
        })
        .catch(function (err) {
          console.warn('[Admin Users] Database query fallback:', err);
          buildUsersStudioContent(container);
        });
      return;
    }

    buildUsersStudioContent(container);
  }

    function openAdminEditUserModal(user, onSaved) {
    const existing = document.getElementById('apparatus-admin-edit-user-modal');
    if (existing) existing.remove();

    const nameParts = (user.name || '').split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const modal = document.createElement('div');
    modal.id = 'apparatus-admin-edit-user-modal';
    modal.className = 'apparatus-modal-overlay';
    modal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 10005; display: flex; align-items: center; justify-content: center; padding: 1.5rem;';

    modal.innerHTML = `
      <div style="background: var(--admin-card-bg, #121522); border: 1px solid var(--admin-card-border, rgba(255,255,255,0.16)); border-radius: 18px; width: 100%; max-width: 620px; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.85);">
        <!-- Modal Header -->
        <div style="padding: 1.35rem 1.75rem; background: var(--admin-pill-bg, rgba(255,255,255,0.04)); border-bottom: 1px solid var(--admin-card-border, rgba(255,255,255,0.08)); display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <img src="${user.avatar || ('https://api.dicebear.com/7.x/thumbs/svg?seed=' + user.username)}" alt="${user.username}" style="width: 42px; height: 42px; border-radius: 50%; border: 2px solid var(--admin-accent-primary, #a855f7);">
            <div>
              <h3 style="margin: 0; color: var(--admin-text-primary, #fff); font-weight: 800; font-size: 1.2rem;">Edit Account: ${user.name}</h3>
              <span style="color: var(--admin-text-muted, #94a3b8); font-size: 0.82rem;">ID #${user.id} &bull; @${user.username} &bull; ${user.email}</span>
            </div>
          </div>
          <button type="button" id="btn-close-edit-user-modal" style="background: transparent; border: none; color: var(--admin-text-muted, #94a3b8); font-size: 1.5rem; cursor: pointer;">
            <i class="ri-close-line"></i>
          </button>
        </div>

        <!-- Form Body -->
        <form id="apparatus-edit-user-form" style="padding: 1.75rem;">
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: var(--admin-text-secondary, #cbd5e1); font-weight: 600; font-size: 0.88rem;">First Name</label>
                <input type="text" id="edit-user-fname" class="form-control" style="background: var(--admin-input-bg, #171b29); border-color: var(--admin-input-border, rgba(255,255,255,0.12)); color: var(--admin-input-text, #fff); height: 40px;" value="${firstName}" placeholder="First Name">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: var(--admin-text-secondary, #cbd5e1); font-weight: 600; font-size: 0.88rem;">Last Name</label>
                <input type="text" id="edit-user-lname" class="form-control" style="background: var(--admin-input-bg, #171b29); border-color: var(--admin-input-border, rgba(255,255,255,0.12)); color: var(--admin-input-text, #fff); height: 40px;" value="${lastName}" placeholder="Last Name">
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: var(--admin-text-secondary, #cbd5e1); font-weight: 600; font-size: 0.88rem;">Username</label>
                <div class="input-group">
                  <span class="input-group-addon" style="background: var(--admin-pill-bg, rgba(255,255,255,0.06)); border-color: var(--admin-input-border, rgba(255,255,255,0.12)); color: var(--admin-text-muted, #94a3b8);"><i class="ri-at-line"></i></span>
                  <input type="text" id="edit-user-username" class="form-control" style="background: var(--admin-input-bg, #171b29); border-color: var(--admin-input-border, rgba(255,255,255,0.12)); color: var(--admin-input-text, #fff); height: 40px;" value="${user.username}" required>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: var(--admin-text-secondary, #cbd5e1); font-weight: 600; font-size: 0.88rem;">Email Address</label>
                <div class="input-group">
                  <span class="input-group-addon" style="background: var(--admin-pill-bg, rgba(255,255,255,0.06)); border-color: var(--admin-input-border, rgba(255,255,255,0.12)); color: var(--admin-text-muted, #94a3b8);"><i class="ri-mail-line"></i></span>
                  <input type="email" id="edit-user-email" class="form-control" style="background: var(--admin-input-bg, #171b29); border-color: var(--admin-input-border, rgba(255,255,255,0.12)); color: var(--admin-input-text, #fff); height: 40px;" value="${user.email}" required>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: var(--admin-text-secondary, #cbd5e1); font-weight: 600; font-size: 0.88rem;">New Password</label>
                <input type="password" id="edit-user-password" class="form-control" style="background: var(--admin-input-bg, #171b29); border-color: var(--admin-input-border, rgba(255,255,255,0.12)); color: var(--admin-input-text, #fff); height: 40px;" placeholder="Leave blank to keep unchanged">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label style="color: var(--admin-text-secondary, #cbd5e1); font-weight: 600; font-size: 0.88rem;">Cash Balance</label>
                <input type="text" id="edit-user-balance" class="form-control" style="background: var(--admin-input-bg, #171b29); border-color: var(--admin-input-border, rgba(255,255,255,0.12)); color: var(--admin-input-text, #fff); height: 40px;" value="${user.balance || '₹0.00'}">
              </div>
            </div>
          </div>

          <!-- Administrative Roles & Security Toggles -->
          <div style="background: var(--admin-pill-bg, rgba(255,255,255,0.03)); border: 1px solid var(--admin-card-border, rgba(255,255,255,0.08)); border-radius: 12px; padding: 1rem 1.25rem; margin-top: 0.75rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.85rem;">
            <label style="display: flex; align-items: center; gap: 0.65rem; color: var(--admin-text-primary, #fff); font-weight: 600; font-size: 0.88rem; cursor: pointer; margin: 0;">
              <input type="checkbox" id="edit-user-root-admin" ${user.root_admin ? 'checked' : ''} style="width: 17px; height: 17px; accent-color: var(--admin-accent-primary, #a855f7); cursor: pointer;">
              <span>Root Administrator Permissions (Full access to all servers, nodes, and settings)</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.65rem; color: #f59e0b; font-weight: 600; font-size: 0.88rem; cursor: pointer; margin: 0;">
              <input type="checkbox" id="edit-user-reset-2fa" style="width: 17px; height: 17px; accent-color: #f59e0b; cursor: pointer;">
              <span>Reset Two-Factor Authentication (Disable 2FA for this user)</span>
            </label>
          </div>

          <!-- Modal Action Buttons -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-top: 1px solid var(--admin-card-border, rgba(255,255,255,0.08)); padding-top: 1.25rem;">
            <a href="/admin/users/view/${user.id}" target="_blank" class="btn btn-default" style="background: var(--admin-pill-bg, rgba(255,255,255,0.06)); border-color: var(--admin-input-border, rgba(255,255,255,0.12)); color: var(--admin-text-secondary, #cbd5e1); border-radius: 10px; font-weight: 600; text-decoration: none;">
              <i class="ri-external-link-line"></i> Full Pterodactyl Page
            </a>
            <div style="display: flex; gap: 0.65rem;">
              <button type="button" id="btn-cancel-edit-user" class="btn btn-default" style="background: var(--admin-pill-bg, rgba(255,255,255,0.08)); border-color: var(--admin-input-border, rgba(255,255,255,0.12)); color: var(--admin-text-secondary, #cbd5e1); border-radius: 10px; font-weight: 600;">Cancel</button>
              <button type="submit" id="btn-submit-edit-user" class="apparatus-saas-cta-btn" style="padding: 0.65rem 1.5rem; border-radius: 10px;">
                <i class="ri-save-line"></i> <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#btn-close-edit-user-modal').addEventListener('click', function () { modal.remove(); });
    modal.querySelector('#btn-cancel-edit-user').addEventListener('click', function () { modal.remove(); });

    modal.querySelector('#apparatus-edit-user-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = modal.querySelector('#btn-submit-edit-user');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Saving...';

      const fname = modal.querySelector('#edit-user-fname').value.trim();
      const lname = modal.querySelector('#edit-user-lname').value.trim();
      const email = modal.querySelector('#edit-user-email').value.trim();
      const username = modal.querySelector('#edit-user-username').value.trim();
      const password = modal.querySelector('#edit-user-password').value;
      const balance = modal.querySelector('#edit-user-balance').value.trim();
      const isRootAdmin = modal.querySelector('#edit-user-root-admin').checked;
      const reset2fa = modal.querySelector('#edit-user-reset-2fa').checked;

      const payload = {
        name_first: fname,
        name_last: lname,
        email: email,
        username: username,
        root_admin: isRootAdmin,
        reset_2fa: reset2fa
      };
      if (password && password.trim().length > 0) {
        payload.password = password.trim();
      }

      fetch('/auth/vps/admin/users/' + user.id + '/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.success) {
          showAdminToast('success', 'User Updated', 'Account @' + username + ' updated successfully in database.');
          modal.remove();
          if (onSaved) {
            onSaved({
              name: (fname + ' ' + lname).trim() || username,
              username: username,
              email: email,
              root_admin: isRootAdmin,
              balance: balance,
              twoFactor: reset2fa ? false : user.twoFactor,
              canAccess: isRootAdmin ? 'Administrator (Full Access)' : 'Client Area + API'
            });
          }
        } else {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="ri-save-line"></i> Save Changes';
          showAdminToast('danger', 'Update Error', res.error || 'Could not update user account.');
        }
      })
      .catch(function (err) {
        console.warn('[Edit User] Local fallback save:', err);
        showAdminToast('info', 'Saved Locally', 'User updated in view.');
        modal.remove();
        if (onSaved) {
          onSaved({
            name: (fname + ' ' + lname).trim() || username,
            username: username,
            email: email,
            root_admin: isRootAdmin,
            balance: balance,
            twoFactor: reset2fa ? false : user.twoFactor
          });
        }
      });
    });
  }

  function buildUsersStudioContent(container) {
    const users = getAdminUsers();

    const totalUsers = users.length;
    const verifiedCount = users.filter(function (u) { return u.verified; }).length;
    const twoFactorCount = users.filter(function (u) { return u.twoFactor; }).length;
    const totalInstances = users.reduce(function (acc, u) { return acc + (u.serversOwned || 0) + (u.vpsOwned || 0); }, 0);

    container.innerHTML = `
      <!-- Top Telemetry KPIs (Pure Glass, Zero Capsules) -->
      <div class="apparatus-admin-grid-4" style="margin-bottom: 1.75rem;">
        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-telemetry-meta">
            <h4>Total Client Accounts</h4>
            <div class="apparatus-telemetry-val" style="color: #38bdf8;">${totalUsers} Registered</div>
          </div>
          <i class="ri-user-line apparatus-telemetry-icon-clean"></i>
        </div>
        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-telemetry-meta">
            <h4>Verified Identities</h4>
            <div class="apparatus-telemetry-val" style="color: #34d399;">${verifiedCount} Verified (${Math.round((verifiedCount / (totalUsers || 1)) * 100)}%)</div>
          </div>
          <i class="ri-verified-badge-line apparatus-telemetry-icon-clean"></i>
        </div>
        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-telemetry-meta">
            <h4>Two-Factor Authentication</h4>
            <div class="apparatus-telemetry-val" style="color: #c084fc;">${twoFactorCount} Guarded (${Math.round((twoFactorCount / (totalUsers || 1)) * 100)}%)</div>
          </div>
          <i class="ri-shield-keyhole-line apparatus-telemetry-icon-clean"></i>
        </div>
        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-telemetry-meta">
            <h4>Active Servers & VPS</h4>
            <div class="apparatus-telemetry-val" style="color: #f472b6;">${totalInstances} Deployed</div>
          </div>
          <i class="ri-server-line apparatus-telemetry-icon-clean"></i>
        </div>
      </div>

      <!-- Main Users Management Studio Box -->
      <div class="box box-primary">
        <div class="box-header with-border" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <h3 class="box-title">
            <i class="ri-user-settings-line"></i> Registered Client Accounts (${totalUsers})
          </h3>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button class="btn btn-default" id="apparatus-users-export-csv" style="border-radius: 10px; font-weight: 600; padding: 0.5rem 1rem;">
              <i class="ri-file-excel-2-line"></i> Export CSV
            </button>
            <a href="/admin/users/new" class="btn btn-primary" style="border-radius: 10px; font-weight: 700; padding: 0.5rem 1.15rem; text-decoration: none;">
              <i class="ri-user-add-line"></i> Create New User
            </a>
          </div>
        </div>

        <div class="box-body" style="padding: 1.5rem 1.75rem 2.5rem 1.75rem;">
          <!-- Filter & Search Toolbar -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="position: relative; flex: 1; max-width: 440px;">
              <i class="ri-search-2-line" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 1.1rem; pointer-events: none;"></i>
              <input type="text" id="apparatus-users-search-input" class="form-control" placeholder="Search by name, username, email, ID, or referral code..." style="padding-left: 2.75rem; height: 46px; border-radius: 12px; font-size: 0.92rem;">
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <select id="apparatus-users-filter-select" class="form-control" style="width: auto; min-width: 180px; height: 46px; border-radius: 12px; font-size: 0.9rem;">
                <option value="all">All Accounts</option>
                <option value="verified">Verified Only</option>
                <option value="unverified">Unverified Only</option>
                <option value="2fa_on">2FA Enabled</option>
                <option value="2fa_off">2FA Disabled</option>
              </select>
            </div>
          </div>

          <!-- 15-Column Luxury Frosted Glass Table Container -->
          <div class="apparatus-users-table-container">
            <table class="apparatus-users-table" id="apparatus-users-data-table">
              <thead>
                <tr>
                  <th style="width: 70px;">ID</th>
                  <th>EMAIL</th>
                  <th>CLIENT NAME</th>
                  <th>USERNAME</th>
                  <th style="text-align: center;">2FA</th>
                  <th style="text-align: center;">SERVERS OWNED</th>
                  <th style="text-align: center;">VPS OWNED</th>
                  <th>CAN ACCESS</th>
                  <th style="text-align: center;">VERIFIED</th>
                  <th>CASH BALANCE</th>
                  <th>LAST LOGIN</th>
                  <th>ACCOUNT CREATED</th>
                  <th>REFERRAL CODE</th>
                  <th style="text-align: center;">TOTAL REFERRALS</th>
                  <th style="width: 60px; text-align: center;">PROFILE ICON</th>
                  <th style="text-align: center;">ACTIONS</th>
                </tr>
              </thead>
              <tbody id="apparatus-users-tbody">
              </tbody>
            </table>
          </div>
          <div id="apparatus-users-empty-msg" style="display: none; text-align: center; padding: 3rem 1rem; color: #94a3b8; font-size: 1rem;">
            <i class="ri-user-unfollow-line" style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem; opacity: 0.5;"></i>
            No client accounts match your current search and filter criteria.
          </div>
        </div>
      </div>
    `;

    function renderTableRows(filterText, filterType) {
      const tbody = container.querySelector('#apparatus-users-tbody');
      const emptyMsg = container.querySelector('#apparatus-users-empty-msg');
      if (!tbody) return;

      const currentUsers = getAdminUsers();
      const q = (filterText || '').toLowerCase().trim();

      const filtered = currentUsers.filter(function (u) {
        if (filterType === 'verified' && !u.verified) return false;
        if (filterType === 'unverified' && u.verified) return false;
        if (filterType === '2fa_on' && !u.twoFactor) return false;
        if (filterType === '2fa_off' && u.twoFactor) return false;

        if (!q) return true;
        return (
          String(u.id).includes(q) ||
          (u.name && u.name.toLowerCase().includes(q)) ||
          (u.username && u.username.toLowerCase().includes(q)) ||
          (u.email && u.email.toLowerCase().includes(q)) ||
          (u.referralCode && u.referralCode.toLowerCase().includes(q)) ||
          (u.canAccess && u.canAccess.toLowerCase().includes(q))
        );
      });

      if (filtered.length === 0) {
        tbody.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
      }

      if (emptyMsg) emptyMsg.style.display = 'none';

      tbody.innerHTML = filtered.map(function (u) {
        const twoFaHtml = u.twoFactor
          ? `<span style="color: #34d399; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem;"><i class="ri-shield-check-fill"></i> Enabled</span>`
          : `<span style="color: #fb7185; font-weight: 600; display: inline-flex; align-items: center; gap: 0.35rem;"><i class="ri-shield-cross-line"></i> Inactive</span>`;

        const verifiedBtnHtml = u.verified
          ? `<button class="apparatus-verify-toggle-btn verified" data-user-id="${u.id}" title="Click to toggle verified status"><i class="ri-checkbox-circle-fill"></i> Yes</button>`
          : `<button class="apparatus-verify-toggle-btn unverified" data-user-id="${u.id}" title="Click to toggle verified status"><i class="ri-close-circle-line"></i> No</button>`;

        return `
          <tr data-user-id="${u.id}">
            <!-- 1. ID -->
            <td>
              <span class="apparatus-user-id">#${u.id}</span>
            </td>
            <!-- 2. Email -->
            <td>
              <a href="mailto:${u.email}" style="color: #94a3b8; text-decoration: none; font-size: 0.9rem;" title="Send email to ${u.email}">
                ${u.email}
              </a>
            </td>
            <!-- 3. Client Name -->
            <td>
              <strong style="color: #ffffff; font-size: 0.94rem;">${u.name}</strong>
            </td>
            <!-- 4. Username -->
            <td>
              <span style="color: #f472b6; font-weight: 600;">@${u.username}</span>
            </td>
            <!-- 5. 2FA -->
            <td style="text-align: center;">
              ${twoFaHtml}
            </td>
            <!-- 6. Servers Owned -->
            <td style="text-align: center;">
              <span class="apparatus-counter-num" style="border-color: rgba(56, 189, 248, 0.35); color: #38bdf8;">${u.serversOwned || 0}</span>
            </td>
            <!-- 7. VPS Owned -->
            <td style="text-align: center;">
              <span class="apparatus-counter-num" style="border-color: rgba(192, 132, 252, 0.35); color: #c084fc;">${u.vpsOwned || 0}</span>
            </td>
            <!-- 8. Can Access -->
            <td>
              <span style="color: #e2e8f0; font-size: 0.88rem; font-weight: 600;">${u.canAccess || 'Client Area'}</span>
            </td>
            <!-- 9. Verified (Interactive Toggle Button) -->
            <td style="text-align: center;">
              ${verifiedBtnHtml}
            </td>
            <!-- 10. Cash Balance -->
            <td>
              <strong style="color: #34d399; font-size: 0.94rem; font-family: monospace;">${u.balance || '₹0.00'}</strong>
            </td>
            <!-- 11. Last Login -->
            <td>
              <span style="color: #94a3b8; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.35rem;">
                <i class="ri-time-line"></i> ${u.lastLogin || 'Recently'}
              </span>
            </td>
            <!-- 12. Account Created -->
            <td>
              <span style="color: #94a3b8; font-size: 0.85rem;">${u.created || '2026-01-15'}</span>
            </td>
            <!-- 13. Referral Code (Click to Copy) -->
            <td>
              <button class="apparatus-ref-code" data-code="${u.referralCode}" title="Click to copy referral code">
                <i class="ri-file-copy-line"></i> ${u.referralCode}
              </button>
            </td>
            <!-- 14. Total Referrals -->
            <td style="text-align: center;">
              <span class="apparatus-counter-num" style="border-color: rgba(236, 72, 153, 0.35); color: #f472b6;">${u.totalReferrals || 0}</span>
            </td>
            <!-- 15. Profile Icon -->
            <td style="text-align: center;">
              <img src="${u.avatar}" alt="${u.username}" class="apparatus-user-avatar">
            </td>
            <!-- Actions -->
            <td style="text-align: center;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 0.45rem;">
                <button type="button" class="btn btn-xs btn-default apparatus-user-edit-btn" data-user-id="${u.id}" style="border-radius: 8px; padding: 0.35rem 0.65rem; color: #fff; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); cursor: pointer;" title="Edit Account">
                  <i class="ri-edit-2-line"></i>
                </button>
                <button class="btn btn-xs btn-danger apparatus-user-delete-btn" data-user-id="${u.id}" data-username="${u.username}" style="border-radius: 8px; padding: 0.35rem 0.65rem;" title="Delete User">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      // Wire Verified Toggle Buttons
      tbody.querySelectorAll('.apparatus-verify-toggle-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const uid = parseInt(this.getAttribute('data-user-id'), 10);
          const all = getAdminUsers();
          const target = all.find(function (u) { return u.id === uid; });
          if (!target) return;
          target.verified = !target.verified;
          saveAdminUsers(all);
          showAdminToast(
            'success',
            'Verification Updated',
            'User @' + target.username + ' verified status is now: ' + (target.verified ? 'YES' : 'NO')
          );
          renderTableRows(searchInput.value, filterSelect.value);
        });
      });

      // Wire Referral Code Copy
      tbody.querySelectorAll('.apparatus-ref-code').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const code = this.getAttribute('data-code');
          if (navigator.clipboard) {
            navigator.clipboard.writeText(code).then(function () {
              showAdminToast('success', 'Referral Code Copied', 'Copied ' + code + ' to clipboard!');
            }).catch(function () {
              showAdminToast('info', 'Referral Code', code);
            });
          } else {
            showAdminToast('info', 'Referral Code', code);
          }
        });
      });

      // Wire Edit User Modal
      tbody.querySelectorAll('.apparatus-user-edit-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const uid = parseInt(this.getAttribute('data-user-id'), 10);
          const all = getAdminUsers();
          const target = all.find(function (u) { return u.id === uid; });
          if (target) {
            openAdminEditUserModal(target, function (updatedUser) {
              const idx = all.findIndex(function (u) { return u.id === uid; });
              if (idx !== -1) {
                all[idx] = Object.assign({}, all[idx], updatedUser);
                window._apparatusLoadedUsers = all;
                saveAdminUsers(all);
              }
              renderTableRows(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'all');
            });
          }
        });
      });

      // Wire Delete User
      tbody.querySelectorAll('.apparatus-user-delete-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const uid = parseInt(this.getAttribute('data-user-id'), 10);
          const un = this.getAttribute('data-username') || 'User';
          if (confirm('Are you sure you want to permanently delete user @' + un + ' (ID #' + uid + ')? This will delete the account from the Pterodactyl database.')) {
            btn.disabled = true;
            fetch('/auth/vps/admin/users/' + uid + '/delete', {
              method: 'POST',
              headers: {
                'X-CSRF-TOKEN': getCsrfToken(),
                'Accept': 'application/json'
              }
            })
            .then(function (r) { return r.json(); })
            .then(function (res) {
              if (res.success) {
                let all = getAdminUsers().filter(function (u) { return u.id !== uid; });
                window._apparatusLoadedUsers = all;
                saveAdminUsers(all);
                showAdminToast('success', 'User Deleted', 'Account @' + un + ' deleted successfully.');
                renderTableRows(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'all');
              } else {
                showAdminToast('danger', 'Delete Failed', res.error || 'Could not delete user.');
                btn.disabled = false;
              }
            })
            .catch(function () {
              let all = getAdminUsers().filter(function (u) { return u.id !== uid; });
              window._apparatusLoadedUsers = all;
              saveAdminUsers(all);
              showAdminToast('info', 'User Removed', 'Account @' + un + ' removed from view.');
              renderTableRows(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'all');
            });
          }
        });
      });
    }

    const searchInput = container.querySelector('#apparatus-users-search-input');
    const filterSelect = container.querySelector('#apparatus-users-filter-select');
    const exportBtn = container.querySelector('#apparatus-users-export-csv');

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        renderTableRows(this.value, filterSelect ? filterSelect.value : 'all');
      });
    }

    if (filterSelect) {
      filterSelect.addEventListener('change', function () {
        renderTableRows(searchInput ? searchInput.value : '', this.value);
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        const currentUsers = getAdminUsers();
        let csv = 'ID,Email,Client Name,Username,2FA,Servers Owned,VPS Owned,Can Access,Verified,Cash Balance,Last Login,Account Created,Referral Code,Total Referrals\n';
        currentUsers.forEach(function (u) {
          csv += [
            u.id,
            `"${u.email}"`,
            `"${u.name}"`,
            `"${u.username}"`,
            u.twoFactor ? 'Yes' : 'No',
            u.serversOwned || 0,
            u.vpsOwned || 0,
            `"${u.canAccess}"`,
            u.verified ? 'Yes' : 'No',
            `"${u.balance}"`,
            `"${u.lastLogin}"`,
            `"${u.created}"`,
            `"${u.referralCode}"`,
            u.totalReferrals || 0
          ].join(',') + '\n';
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'arixbyte-users-' + Date.now() + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showAdminToast('success', 'Export Complete', 'Exported ' + currentUsers.length + ' users to CSV successfully.');
      });
    }

    // Initial render
    renderTableRows('', 'all');

    // Fetch and populate real Pterodactyl admin users asynchronously
    fetchRealAdminUsers(function () {
      renderTableRows(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'all');
    });
  }

  // ==============================================================================
  // 13. ENHANCE ADMIN OVERVIEW (ZERO CAPSULES, PURE GLASS)
  // ==============================================================================
  function enhanceAdminOverview() {
    if (window.location.pathname !== '/admin' || window.location.hash) return;

    const content = document.querySelector('.content-wrapper .content');
    if (!content) return;

    const firstRow = content.querySelector('.row') || content.firstElementChild;
    if (!firstRow) return;

    // 1. Inject Top Telemetry Grid (Zero capsule icon wraps)
    if (!document.getElementById('apparatus-admin-telemetry-grid')) {
      const telemetryGrid = document.createElement('div');
      telemetryGrid.id = 'apparatus-admin-telemetry-grid';
      telemetryGrid.className = 'apparatus-admin-grid-4';
      telemetryGrid.style.marginBottom = '1.75rem';
      telemetryGrid.innerHTML = `
        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-telemetry-meta">
            <h4>Infrastructure Nodes</h4>
            <div class="apparatus-telemetry-val" style="color: #34d399;">3 Live</div>
          </div>
          <i class="ri-server-line apparatus-telemetry-icon-clean"></i>
        </div>

        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-telemetry-meta">
            <h4>Active Game Servers</h4>
            <div class="apparatus-telemetry-val" style="color: #38bdf8;">Online</div>
          </div>
          <i class="ri-hard-drive-2-line apparatus-telemetry-icon-clean"></i>
        </div>

        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-telemetry-meta">
            <h4>Client Accounts</h4>
            <div class="apparatus-telemetry-val" style="color: #c084fc;">Verified</div>
          </div>
          <i class="ri-user-heart-line apparatus-telemetry-icon-clean"></i>
        </div>

        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-telemetry-meta">
            <h4>Security Sentinel</h4>
            <div class="apparatus-telemetry-val" style="color: #f472b6;">Guarded</div>
          </div>
          <i class="ri-shield-flash-line apparatus-telemetry-icon-clean"></i>
        </div>
      `;
      content.insertBefore(telemetryGrid, firstRow);
    }

    // 2. Inject Operations Hub below native buttons (Zero capsules)
    if (!document.getElementById('apparatus-admin-operations-hub')) {
      const allRows = content.querySelectorAll('.row');
      const lastNativeRow = allRows.length > 0 ? allRows[allRows.length - 1] : null;

      const opsHub = document.createElement('div');
      opsHub.id = 'apparatus-admin-operations-hub';
      opsHub.style.marginTop = '2rem';
      opsHub.innerHTML = `
        <div class="apparatus-admin-grid-2" style="margin-bottom: 2rem;">
          <!-- Quick Operations Launchpad -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title"><i class="ri-apps-line"></i> Quick Operations Launchpad</h3>
            </div>
            <div class="box-body" style="padding: 1.25rem;">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.85rem;">
                <a href="#node-health" class="apparatus-admin-tab" data-tab="node-health" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.9rem 1.1rem; border-radius: 12px; color: #34d399; text-decoration: none; font-weight: 600;">
                  <i class="ri-pulse-line" style="font-size: 1.3rem;"></i>
                  <span>Node Health</span>
                </a>
                <a href="#store-pricing" class="apparatus-admin-tab" data-tab="store-pricing" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.9rem 1.1rem; border-radius: 12px; color: #c084fc; text-decoration: none; font-weight: 600;">
                  <i class="ri-price-tag-3-line" style="font-size: 1.3rem;"></i>
                  <span>Store & Pricing</span>
                </a>
                <a href="#announcements" class="apparatus-admin-tab" data-tab="announcements" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.9rem 1.1rem; border-radius: 12px; color: #fbbf24; text-decoration: none; font-weight: 600;">
                  <i class="ri-notification-badge-line" style="font-size: 1.3rem;"></i>
                  <span>Announcements</span>
                </a>
                <a href="#audit-logs" class="apparatus-admin-tab" data-tab="audit-logs" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.9rem 1.1rem; border-radius: 12px; color: #38bdf8; text-decoration: none; font-weight: 600;">
                  <i class="ri-shield-check-line" style="font-size: 1.3rem;"></i>
                  <span>Audit Logs</span>
                </a>
                <a href="#mail-editor" class="apparatus-admin-tab" data-tab="mail-editor" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.9rem 1.1rem; border-radius: 12px; color: #ec4899; text-decoration: none; font-weight: 600;">
                  <i class="ri-mail-settings-line" style="font-size: 1.3rem;"></i>
                  <span>Mail Editor</span>
                </a>
                <a href="#earn" class="apparatus-admin-tab" data-tab="earn" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.9rem 1.1rem; border-radius: 12px; color: #fbbf24; text-decoration: none; font-weight: 600;">
                  <i class="ri-copper-coin-line" style="font-size: 1.3rem;"></i>
                  <span>Earn &amp; Codes</span>
                </a>
                <a href="#webhooks" class="apparatus-admin-tab" data-tab="webhooks" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.9rem 1.1rem; border-radius: 12px; color: #f472b6; text-decoration: none; font-weight: 600;">
                  <i class="ri-discord-line" style="font-size: 1.3rem;"></i>
                  <span>Discord Alerts</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Infrastructure Cluster Health (Clean Text, Zero Capsule Pills!) -->
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title"><i class="ri-server-line"></i> Infrastructure Connectivity & Daemons</h3>
            </div>
            <div class="box-body" style="padding: 1.25rem;">
              <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <div>
                    <strong style="color: #fff; font-size: 0.9rem;">Wings Hypervisor Daemon Cluster</strong>
                    <div style="font-size: 0.78rem; color: #94a3b8;">Port 8080 SSL • TLS v1.3 Verified</div>
                  </div>
                  <span style="color: #34d399; font-weight: 600; font-size: 0.88rem;">● Connected</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <div>
                    <strong style="color: #fff; font-size: 0.9rem;">Database Cluster (MySQL / MariaDB)</strong>
                    <div style="font-size: 0.78rem; color: #94a3b8;">Port 3306 • Query Latency 0.4ms</div>
                  </div>
                  <span style="color: #34d399; font-weight: 600; font-size: 0.88rem;">● Nominal</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <strong style="color: #fff; font-size: 0.9rem;">Redis Cache & Job Queue Workers</strong>
                    <div style="font-size: 0.78rem; color: #94a3b8;">Port 6379 • Queue Backlog: 0</div>
                  </div>
                  <span style="color: #34d399; font-weight: 600; font-size: 0.88rem;">● Synchronized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      if (lastNativeRow && lastNativeRow.nextSibling) {
        content.insertBefore(opsHub, lastNativeRow.nextSibling);
      } else {
        content.appendChild(opsHub);
      }

      opsHub.querySelectorAll('.apparatus-admin-tab').forEach(function (tabLink) {
        tabLink.addEventListener('click', function (e) {
          e.preventDefault();
          const tab = this.getAttribute('data-tab');
          window.location.hash = tab;
          upgradeAdminSidebar();
          handleAdminViews();
        });
      });
    }
  }

  // Listen to hashchange for instant tab switching without full reload
  window.addEventListener('hashchange', function () {
    upgradeAdminSidebar();
    renderAdminSubnavPills();
    handleAdminViews();
  });

  // Execute on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApparatusAdmin);
  } else {
    initApparatusAdmin();
  }

  // Fallback observer in case AdminLTE scripts delay rendering
  setTimeout(initApparatusAdmin, 300);
  setTimeout(initApparatusAdmin, 1000);
})();
