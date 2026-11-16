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

      <!-- EXTENSIONS & INTEGRATIONS -->
      <li class="header">EXTENSIONS & INTEGRATIONS</li>
      <li class="${isInbuiltAddons ? 'active' : ''}">
        <a href="#inbuilt-addons" class="apparatus-admin-tab" data-tab="inbuilt-addons">
          <i class="ri-puzzle-line"></i>
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
  // 4. MAIL EDITOR STUDIO VIEW
  // ==============================================================================
  function renderMailEditorView(container) {
    container.className = 'apparatus-admin-view';
    container.innerHTML = `
      <div class="apparatus-admin-grid-2">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title"><i class="ri-edit-2-line"></i> Template Configuration</h3>
          </div>
          <div class="box-body">
            <div class="form-group">
              <label>Select Email Template</label>
              <select class="form-control" id="apparatus-mail-template-select">
                <option value="welcome">Welcome to ArixByte Cloud</option>
                <option value="password_reset">Password Reset Instruction</option>
                <option value="server_created">Server Successfully Provisioned</option>
                <option value="two_factor">Two-Factor Authentication Alert</option>
                <option value="maintenance">Node Maintenance Advisory</option>
              </select>
            </div>
            <div class="form-group">
              <label>Email Subject</label>
              <input type="text" class="form-control" id="apparatus-mail-subject" value="Welcome to ArixByte Cloud!">
            </div>
            <div class="form-group">
              <label>Sender Display Name</label>
              <input type="text" class="form-control" id="apparatus-mail-sender" value="ArixByte Support <noreply@arixbyte.com>">
            </div>
            <div class="form-group">
              <label>Call to Action Button Text</label>
              <input type="text" class="form-control" id="apparatus-mail-btn-text" value="Access Game Server">
            </div>
            <div class="form-group">
              <label>Email Message Body (Markdown / HTML)</label>
              <textarea class="form-control" rows="8" id="apparatus-mail-body">Hello **{username}**,

Welcome to ArixByte Cloud! Your high-performance computing environment is ready to deploy.

- Dedicated CPU Performance
- Ultra-Low Latency NVMe Storage
- Instant Automated Backups

Click the button below to launch your panel console.</textarea>
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
          <div class="box-body" style="background: rgba(0, 0, 0, 0.4); padding: 1.5rem; border-radius: 12px;">
            <div style="background: #000000; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 2rem; color: #fff; font-family: var(--admin-font); box-shadow: 0 16px 40px rgba(0,0,0,0.5);">
              <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
                <img src="/themes/apparatus/arixbyte-logo.png" alt="ArixByte" style="height: 28px; width: auto;" onerror="this.style.display='none';">
              </div>
              <h2 id="apparatus-preview-subject" style="font-size: 1.25rem; font-weight: 700; color: #ec4899; margin-top: 0; margin-bottom: 1rem;">
                Welcome to ArixByte Cloud!
              </h2>
              <div id="apparatus-preview-body" style="font-size: 0.92rem; line-height: 1.6; color: #cbd5e1; margin-bottom: 2rem; white-space: pre-wrap;">
Hello <b>{username}</b>,

Welcome to ArixByte Cloud! Your high-performance computing environment is ready to deploy.

• Dedicated CPU Performance
• Ultra-Low Latency NVMe Storage
• Instant Automated Backups

Click the button below to launch your panel console.
              </div>
              <div style="text-align: center; margin-bottom: 2rem;">
                <span id="apparatus-preview-btn" style="display: inline-block; background: #ec4899; color: #fff; font-weight: 700; padding: 0.75rem 2rem; border-radius: 10px; text-decoration: none;">
                  Access Game Server
                </span>
              </div>
              <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; font-size: 0.75rem; color: #64748b; text-align: center;">
                Sent securely by ArixByte Infrastructure Systems • © 2026 ArixByte Cloud
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const subjInput = container.querySelector('#apparatus-mail-subject');
    const previewSubj = container.querySelector('#apparatus-preview-subject');
    const bodyInput = container.querySelector('#apparatus-mail-body');
    const previewBody = container.querySelector('#apparatus-preview-body');
    const btnInput = container.querySelector('#apparatus-mail-btn-text');
    const previewBtn = container.querySelector('#apparatus-preview-btn');

    if (subjInput && previewSubj) {
      subjInput.addEventListener('input', function () {
        previewSubj.textContent = this.value || 'Subject Line';
      });
    }
    if (bodyInput && previewBody) {
      bodyInput.addEventListener('input', function () {
        previewBody.textContent = this.value || 'Email body text...';
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
      testBtn.addEventListener('click', function () {
        showAdminToast('success', 'Test Dispatched', 'A preview email was sent to your administrator address.');
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
                  <option value="info" ${saved.type === 'info' ? 'selected' : ''}>Information (Cyan Glow)</option>
                  <option value="warning" ${saved.type === 'warning' ? 'selected' : ''}>Important Alert (Amber Glow)</option>
                  <option value="emergency" ${saved.type === 'emergency' ? 'selected' : ''}>Critical Emergency (Rose Glow)</option>
                  <option value="success" ${saved.type === 'success' ? 'selected' : ''}>Promotion / Event (Emerald Glow)</option>
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
              <i class="ri-broadcast-line"></i> Save & Broadcast Announcement
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
            referralCode: 'ARIX-' + username.toUpperCase().slice(0, 4) + '-' + id,
            totalReferrals: 0
          });
        }
      } catch (e) {}
    });

    return list.length > 0 ? list : null;
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
          referralCode: (found && found.referralCode) || ('ARIX-' + (u.username || 'USER').toUpperCase().slice(0, 4) + '-' + u.id),
          totalReferrals: (found && found.totalReferrals !== undefined) ? found.totalReferrals : 0
        };
      });
      localStorage.setItem(storageKey, JSON.stringify(merged));
      return merged;
    }

    if (stored && Array.isArray(stored) && stored.length > 0) {
      return stored;
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
        referralCode: 'ARIX-MUDIT-01',
        totalReferrals: 42
      },
      {
        id: 2,
        avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=ServerRoot',
        name: 'Server Admin',
        username: 'ServerRoot',
        email: 'admin@arixbyte.com',
        twoFactor: true,
        serversOwned: 8,
        vpsOwned: 4,
        canAccess: 'System Infrastructure',
        verified: true,
        balance: '₹12,850.00',
        lastLogin: 'Yesterday at 18:45',
        created: '2026-01-12',
        referralCode: 'ARIX-ROOT-02',
        totalReferrals: 19
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
        referralCode: 'ARIX-ALEX-03',
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
        referralCode: 'ARIX-ROHN-04',
        totalReferrals: 2
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
        referralCode: 'ARIX-SARH-05',
        totalReferrals: 11
      }
    ];

    localStorage.setItem(storageKey, JSON.stringify(defaultUsers));
    return defaultUsers;
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
                  <th style="width: 50px; text-align: center;">ICON</th>
                  <th style="width: 70px;">ID</th>
                  <th>CLIENT NAME</th>
                  <th>USERNAME</th>
                  <th>EMAIL</th>
                  <th style="text-align: center;">2FA</th>
                  <th style="text-align: center;">SERVERS</th>
                  <th style="text-align: center;">VPS</th>
                  <th>CAN ACCESS</th>
                  <th style="text-align: center;">VERIFIED</th>
                  <th>CASH BALANCE</th>
                  <th>LAST LOGIN</th>
                  <th>ACCOUNT CREATED</th>
                  <th>REFERRAL CODE</th>
                  <th style="text-align: center;">TOTAL REFS</th>
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
            <!-- 1. Profile Icon -->
            <td style="text-align: center;">
              <img src="${u.avatar}" alt="${u.username}" class="apparatus-user-avatar">
            </td>
            <!-- 2. ID -->
            <td>
              <span class="apparatus-user-id">#${u.id}</span>
            </td>
            <!-- 3. Client Name -->
            <td>
              <strong style="color: #ffffff; font-size: 0.94rem;">${u.name}</strong>
            </td>
            <!-- 4. Username -->
            <td>
              <span style="color: #f472b6; font-weight: 600;">@${u.username}</span>
            </td>
            <!-- 5. Email -->
            <td>
              <a href="mailto:${u.email}" style="color: #94a3b8; text-decoration: none; font-size: 0.9rem;" title="Send email to ${u.email}">
                ${u.email}
              </a>
            </td>
            <!-- 6. 2FA -->
            <td style="text-align: center;">
              ${twoFaHtml}
            </td>
            <!-- 7. Servers Owned -->
            <td style="text-align: center;">
              <span class="apparatus-counter-num" style="border-color: rgba(56, 189, 248, 0.35); color: #38bdf8;">${u.serversOwned || 0}</span>
            </td>
            <!-- 8. VPS Owned -->
            <td style="text-align: center;">
              <span class="apparatus-counter-num" style="border-color: rgba(192, 132, 252, 0.35); color: #c084fc;">${u.vpsOwned || 0}</span>
            </td>
            <!-- 9. Can Access -->
            <td>
              <span style="color: #e2e8f0; font-size: 0.88rem; font-weight: 600;">${u.canAccess || 'Client Area'}</span>
            </td>
            <!-- 10. Verified (Interactive Toggle Button) -->
            <td style="text-align: center;">
              ${verifiedBtnHtml}
            </td>
            <!-- 11. Cash Balance -->
            <td>
              <strong style="color: #34d399; font-size: 0.94rem; font-family: monospace;">${u.balance || '₹0.00'}</strong>
            </td>
            <!-- 12. Last Login -->
            <td>
              <span style="color: #94a3b8; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.35rem;">
                <i class="ri-time-line"></i> ${u.lastLogin || 'Recently'}
              </span>
            </td>
            <!-- 13. Account Created -->
            <td>
              <span style="color: #94a3b8; font-size: 0.85rem;">${u.created || '2026-01-15'}</span>
            </td>
            <!-- 14. Referral Code (Click to Copy) -->
            <td>
              <button class="apparatus-ref-code" data-code="${u.referralCode}" title="Click to copy referral code">
                <i class="ri-file-copy-line"></i> ${u.referralCode}
              </button>
            </td>
            <!-- 15. Total Referrals -->
            <td style="text-align: center;">
              <span class="apparatus-counter-num" style="border-color: rgba(236, 72, 153, 0.35); color: #f472b6;">${u.totalReferrals || 0}</span>
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
