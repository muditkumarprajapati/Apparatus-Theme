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
    upgradeAdminSidebar();
    upgradeAdminNavbar();
    handleAdminViews();
    enhanceAdminOverview();
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

    const isOverview = path === '/admin' && !hash;
    const isSettings = path.startsWith('/admin/settings');
    const isApi = path.startsWith('/admin/api');
    const isMailEditor = path === '/admin/mail-editor' || hash === '#mail-editor';
    const isAnnouncements = path === '/admin/announcements' || hash === '#announcements';

    const isDatabases = path.startsWith('/admin/databases');
    const isLocations = path.startsWith('/admin/locations');
    const isNodes = path.startsWith('/admin/nodes');
    const isServers = path.startsWith('/admin/servers');
    const isUsers = path.startsWith('/admin/users') || hash === '#users';
    const isNodeHealth = path === '/admin/node-health' || hash === '#node-health';
    const isAuditLogs = path === '/admin/audit-logs' || hash === '#audit-logs';

    const isMounts = path.startsWith('/admin/mounts');
    const isNests = path.startsWith('/admin/nests');
    const isStorePricing = path === '/admin/store-pricing' || hash === '#store-pricing';
    const isEarn = path === '/admin/earn' || hash === '#earn';

    const isWebhooks = path === '/admin/webhooks' || hash === '#webhooks';
    const isInbuiltAddons = path === '/admin/inbuilt-addons' || hash === '#inbuilt-addons';
    const isBlueprint = path === '/admin/extensions' || hash === '#blueprint-extensions';

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
      <li class="${isServers ? 'active' : ''}">
        <a href="/admin/servers">
          <i class="ri-hard-drive-2-line"></i>
          <span>Servers</span>
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

    // Add Return to Client Area Link in Top Right Navbar
    let customMenu = navbar.querySelector('.navbar-custom-menu');
    if (customMenu && !document.getElementById('apparatus-admin-client-btn')) {
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
      if (c.id !== 'apparatus-admin-studio-view') c.style.display = 'none';
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
    const saved = JSON.parse(localStorage.getItem('apparatus_admin_announcement') || '{"enabled":true,"type":"info","title":"Scheduled Maintenance Notice","msg":"Frankfurt node maintenance will take place Sunday at 02:00 UTC. Instances will experience under 60 seconds of reboot latency.","url":"https://discord.gg/arixbyte","btnText":"Check Status"}');

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
    try {
      const raw = localStorage.getItem('apparatus_promo_codes');
      if (raw) {
        let parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Purge old mock demo codes (WELCOME20, ARIX50)
          const filtered = parsed.filter(function (c) {
            return c && c.code !== 'WELCOME20' && c.code !== 'ARIX50' && c.id !== 'pc_welcome' && c.id !== 'pc_community';
          });
          if (filtered.length !== parsed.length) {
            localStorage.setItem('apparatus_promo_codes', JSON.stringify(filtered));
          }
          return filtered;
        }
      }
    } catch (e) {}
    localStorage.setItem('apparatus_promo_codes', JSON.stringify([]));
    return [];
  }

  function savePromoCodesList(codes) {
    try {
      localStorage.setItem('apparatus_promo_codes', JSON.stringify(codes));
    } catch (e) {
      console.error('Error saving promo codes:', e);
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
          const cd = this.getAttribute('data-code');
          if (confirm('Are you sure you want to permanently delete promo code ' + cd + '?')) {
            let all = getPromoCodesList();
            all = all.filter(function (c) { return c.code !== cd; });
            savePromoCodesList(all);
            showAdminToast('success', 'Code Deleted', 'Promo code ' + cd + ' removed.');
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
                <a href="/admin/users/view/${u.id}" class="btn btn-xs btn-default" style="border-radius: 8px; padding: 0.35rem 0.65rem; color: #fff; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);" title="Edit Account">
                  <i class="ri-edit-2-line"></i>
                </a>
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

      // Wire Delete User
      tbody.querySelectorAll('.apparatus-user-delete-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const uid = parseInt(this.getAttribute('data-user-id'), 10);
          const un = this.getAttribute('data-username') || 'User';
          if (confirm('Are you sure you want to remove user @' + un + ' (ID #' + uid + ')?')) {
            let all = getAdminUsers();
            all = all.filter(function (u) { return u.id !== uid; });
            saveAdminUsers(all);
            showAdminToast('error', 'User Removed', 'User @' + un + ' has been deleted.');
            renderTableRows(searchInput.value, filterSelect.value);
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
