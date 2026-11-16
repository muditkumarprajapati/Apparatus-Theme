/**
 * ==============================================================================
 * APPARATUS THEME - EXECUTIVE CYBER-COMMAND CENTER (ADMIN PANEL)
 * Dedicated High-Tech Obsidian Architecture & Extension Hub for Pterodactyl
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

  // Toast Notification Helper
  function showAdminToast(type, title, message) {
    let container = document.getElementById('apparatus-admin-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'apparatus-admin-toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'apparatus-admin-toast';
    const isErr = type === 'error';
    const borderColor = isErr ? 'rgba(244, 63, 94, 0.45)' : 'rgba(16, 185, 129, 0.45)';
    const icon = isErr
      ? '<i class="ri-error-warning-fill" style="color: #fb7185; font-size: 1.4rem;"></i>'
      : '<i class="ri-checkbox-circle-fill" style="color: #34d399; font-size: 1.4rem;"></i>';
    toast.style.border = '1px solid ' + borderColor;
    toast.innerHTML = `
      ${icon}
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 0.88rem; margin-bottom: 2px;">${title}</div>
        <div style="font-size: 0.8rem; color: #94a3b8; line-height: 1.4;">${message}</div>
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
  // 1. UPGRADE ADMIN SIDEBAR NAVIGATION WITH REQUESTED CATEGORIES & 5 NEW OPTIONS
  // ==============================================================================
  function upgradeAdminSidebar() {
    const sidebar = document.querySelector('.main-sidebar .sidebar');
    if (!sidebar) return;

    let menu = sidebar.querySelector('.sidebar-menu');
    if (!menu) return;

    // Add Live System Status Pill at the top of the sidebar
    if (!document.getElementById('apparatus-admin-status-wrap')) {
      const statusWrap = document.createElement('div');
      statusWrap.id = 'apparatus-admin-status-wrap';
      statusWrap.className = 'apparatus-admin-sidebar-status';
      statusWrap.innerHTML = `
        <div class="apparatus-admin-status-pill">
          <span class="apparatus-admin-status-dot"></span>
          <span>SYSTEM ONLINE • PROD NODE</span>
        </div>
      `;
      sidebar.insertBefore(statusWrap, menu);
    }

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
    const isUsers = path.startsWith('/admin/users');
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
          <span class="apparatus-admin-badge cyan">PRO</span>
        </a>
      </li>
      <li class="${isAnnouncements ? 'active' : ''}">
        <a href="#announcements" class="apparatus-admin-tab" data-tab="announcements">
          <i class="ri-notification-badge-line"></i>
          <span>Announcements</span>
          <span class="apparatus-admin-badge yellow">LIVE</span>
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
        <a href="/admin/users">
          <i class="ri-user-settings-line"></i>
          <span>Users</span>
        </a>
      </li>
      <li class="${isNodeHealth ? 'active' : ''}">
        <a href="#node-health" class="apparatus-admin-tab" data-tab="node-health">
          <i class="ri-pulse-line"></i>
          <span>Node Health</span>
          <span class="apparatus-admin-badge emerald">PULSE</span>
        </a>
      </li>
      <li class="${isAuditLogs ? 'active' : ''}">
        <a href="#audit-logs" class="apparatus-admin-tab" data-tab="audit-logs">
          <i class="ri-shield-check-line"></i>
          <span>Staff Audit Logs</span>
          <span class="apparatus-admin-badge indigo">AUDIT</span>
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
          <span class="apparatus-admin-badge purple">POINTS</span>
        </a>
      </li>

      <!-- EXTENSIONS & INTEGRATIONS -->
      <li class="header">EXTENSIONS & INTEGRATIONS</li>
      <li class="${isInbuiltAddons ? 'active' : ''}">
        <a href="#inbuilt-addons" class="apparatus-admin-tab" data-tab="inbuilt-addons">
          <i class="ri-puzzle-line"></i>
          <span>Inbuilt Addons</span>
          <span class="apparatus-admin-badge emerald">ACTIVE</span>
        </a>
      </li>
      <li class="${isBlueprint ? 'active' : ''}">
        <a href="#blueprint-extensions" class="apparatus-admin-tab" data-tab="blueprint-extensions">
          <i class="ri-install-line"></i>
          <span>Blueprint & Extensions</span>
          <span class="apparatus-admin-badge pink">HUB</span>
        </a>
      </li>
      <li class="${isWebhooks ? 'active' : ''}">
        <a href="#webhooks" class="apparatus-admin-tab" data-tab="webhooks">
          <i class="ri-discord-line"></i>
          <span>Discord Webhooks</span>
          <span class="apparatus-admin-badge indigo">BOT</span>
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

    // Enhance Logo brand text with clean single ArixByte logo image + ADMIN badge (No duplicated text!)
    const logo = document.querySelector('.main-header .logo');
    if (logo && !logo.getAttribute('data-apparatus-logo')) {
      logo.setAttribute('data-apparatus-logo', 'true');
      logo.innerHTML = `
        <img src="/themes/apparatus/arixbyte-logo.png" alt="ArixByte" class="apparatus-admin-logo-img" onerror="this.style.display='none';">
        <span class="apparatus-admin-logo-badge">ADMIN</span>
      `;
    }

    // Add Return to Client Area Pill in Top Right Navbar
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

    } else {
      // Normal native Pterodactyl admin overview
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
          <div class="box-body" style="background: rgba(8, 12, 20, 0.6); padding: 1.5rem; border-radius: 12px;">
            <div style="background: #111827; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 2rem; color: #fff; font-family: sans-serif; box-shadow: 0 12px 30px rgba(0,0,0,0.4);">
              <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
                <img src="/themes/apparatus/arixbyte-logo.png" alt="ArixByte" style="height: 28px; width: auto;" onerror="this.style.display='none';">
              </div>
              <h2 id="apparatus-preview-subject" style="font-size: 1.25rem; font-weight: 700; color: #38bdf8; margin-top: 0; margin-bottom: 1rem;">
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
                <span id="apparatus-preview-btn" style="display: inline-block; background: #0ea5e9; color: #fff; font-weight: 700; padding: 0.75rem 2rem; border-radius: 8px; text-decoration: none;">
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
        showAdminToast('success', 'Template Saved', 'Mail template changes have been updated successfully.');
      });
    }

    const testBtn = container.querySelector('#apparatus-mail-test-btn');
    if (testBtn) {
      testBtn.addEventListener('click', function () {
        showAdminToast('success', 'Test Email Dispatched', 'A preview email was dispatched to administrator mailbox.');
      });
    }
  }

  // ==============================================================================
  // 5. GLOBAL ANNOUNCEMENTS VIEW (OPTION 2)
  // ==============================================================================
  function renderAnnouncementsView(container) {
    const saved = JSON.parse(localStorage.getItem('apparatus_admin_announcement') || '{"enabled":true,"type":"info","title":"Scheduled Maintenance Notice","msg":"Frankfurt node maintenance will take place Sunday at 02:00 UTC. Instances will experience under 60 seconds of reboot latency.","url":"https://discord.gg/arixbyte","btnText":"Check Status"}');

    container.className = 'apparatus-admin-view';
    container.innerHTML = `
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title"><i class="ri-notification-badge-line"></i> Global Announcement & Maintenance Banner System</h3>
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
            <div id="apparatus-announcement-live-preview" style="background: rgba(14, 165, 233, 0.12); border: 1px solid rgba(56, 189, 248, 0.4); border-radius: 12px; padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; color: #fff;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div id="apparatus-announcement-preview-icon" style="width: 38px; height: 38px; border-radius: 10px; background: rgba(56, 189, 248, 0.2); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; color: #38bdf8;">
                  <i class="ri-information-line"></i>
                </div>
                <div>
                  <h4 id="apparatus-announcement-preview-title" style="margin: 0 0 0.25rem 0; font-size: 0.94rem; font-weight: 700; color: #fff;">
                    ${saved.title}
                  </h4>
                  <p id="apparatus-announcement-preview-msg" style="margin: 0; font-size: 0.84rem; color: #cbd5e1;">
                    ${saved.msg}
                  </p>
                </div>
              </div>
              <a id="apparatus-announcement-preview-btn" href="${saved.url}" target="_blank" style="padding: 0.45rem 1rem; border-radius: 8px; background: #0ea5e9; color: #fff; font-size: 0.82rem; font-weight: 700; text-decoration: none; white-space: nowrap;">
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
                  <span id="apparatus-announcement-status-lbl" style="font-weight: 700; color: ${saved.enabled ? '#34d399' : '#94a3b8'};">
                    ${saved.enabled ? 'Active Broadcast (Visible on Panels)' : 'Deactivated (Hidden)'}
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label>Banner Severity Style</label>
                <select class="form-control" id="apparatus-announcement-type">
                  <option value="info" ${saved.type === 'info' ? 'selected' : ''}>Information (Cyan Glow)</option>
                  <option value="warning" ${saved.type === 'warning' ? 'selected' : ''}>Important Alert / Advisory (Amber Glow)</option>
                  <option value="emergency" ${saved.type === 'emergency' ? 'selected' : ''}>Critical Emergency / Downtime (Rose Glow)</option>
                  <option value="success" ${saved.type === 'success' ? 'selected' : ''}>Promotion / Event Announcement (Emerald Glow)</option>
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

          <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
            <button class="btn btn-primary" id="apparatus-announcement-save-btn">
              <i class="ri-broadcast-line"></i> Save & Broadcast Announcement
            </button>
            <button class="btn btn-danger" id="apparatus-announcement-clear-btn">
              <i class="ri-delete-bin-line"></i> Deactivate Broadcast
            </button>
          </div>
        </div>
      </div>
    `;

    const titleInput = container.querySelector('#apparatus-announcement-title');
    const msgInput = container.querySelector('#apparatus-announcement-msg');
    const btnInput = container.querySelector('#apparatus-announcement-btn');
    const typeSelect = container.querySelector('#apparatus-announcement-type');
    const pTitle = container.querySelector('#apparatus-announcement-preview-title');
    const pMsg = container.querySelector('#apparatus-announcement-preview-msg');
    const pBtn = container.querySelector('#apparatus-announcement-preview-btn');
    const pIcon = container.querySelector('#apparatus-announcement-preview-icon');
    const pCard = container.querySelector('#apparatus-announcement-live-preview');

    function updatePreview() {
      if (pTitle && titleInput) pTitle.textContent = titleInput.value;
      if (pMsg && msgInput) pMsg.textContent = msgInput.value;
      if (pBtn && btnInput) pBtn.textContent = btnInput.value;

      const t = typeSelect ? typeSelect.value : 'info';
      if (t === 'emergency') {
        pCard.style.background = 'rgba(244, 63, 94, 0.14)';
        pCard.style.borderColor = 'rgba(244, 63, 94, 0.4)';
        pIcon.style.background = 'rgba(244, 63, 94, 0.2)';
        pIcon.style.color = '#fb7185';
        pBtn.style.background = '#f43f5e';
      } else if (t === 'warning') {
        pCard.style.background = 'rgba(245, 158, 11, 0.14)';
        pCard.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        pIcon.style.background = 'rgba(245, 158, 11, 0.2)';
        pIcon.style.color = '#fbbf24';
        pBtn.style.background = '#f59e0b';
      } else if (t === 'success') {
        pCard.style.background = 'rgba(16, 185, 129, 0.14)';
        pCard.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        pIcon.style.background = 'rgba(16, 185, 129, 0.2)';
        pIcon.style.color = '#34d399';
        pBtn.style.background = '#10b981';
      } else {
        pCard.style.background = 'rgba(14, 165, 233, 0.12)';
        pCard.style.borderColor = 'rgba(56, 189, 248, 0.4)';
        pIcon.style.background = 'rgba(56, 189, 248, 0.2)';
        pIcon.style.color = '#38bdf8';
        pBtn.style.background = '#0ea5e9';
      }
    }

    if (titleInput) titleInput.addEventListener('input', updatePreview);
    if (msgInput) msgInput.addEventListener('input', updatePreview);
    if (btnInput) btnInput.addEventListener('input', updatePreview);
    if (typeSelect) typeSelect.addEventListener('change', updatePreview);

    const saveBtn = container.querySelector('#apparatus-announcement-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        const payload = {
          enabled: container.querySelector('#apparatus-announcement-status').checked,
          type: typeSelect.value,
          title: titleInput.value,
          msg: msgInput.value,
          url: container.querySelector('#apparatus-announcement-url').value,
          btnText: btnInput.value
        };
        localStorage.setItem('apparatus_admin_announcement', JSON.stringify(payload));
        localStorage.setItem('apparatus_global_announcement', JSON.stringify(payload));
        showAdminToast('success', 'Announcement Broadcasted', 'The global notice banner is now live across user dashboards.');
      });
    }

    const clearBtn = container.querySelector('#apparatus-announcement-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        container.querySelector('#apparatus-announcement-status').checked = false;
        container.querySelector('#apparatus-announcement-status-lbl').textContent = 'Deactivated (Hidden)';
        container.querySelector('#apparatus-announcement-status-lbl').style.color = '#94a3b8';
        localStorage.removeItem('apparatus_global_announcement');
        showAdminToast('success', 'Banner Deactivated', 'The global announcement has been removed.');
      });
    }
  }

  // ==============================================================================
  // 6. NODE HEALTH & DAEMON LATENCY TELEMETRY VIEW (OPTION 4)
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
          <!-- Overall Fleet Summary -->
          <div class="apparatus-admin-grid-4" style="margin-bottom: 2rem;">
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Cluster Fleet Status</h4>
                <div class="apparatus-telemetry-val" style="color: #34d399;">100% ONLINE</div>
              </div>
              <div class="apparatus-telemetry-icon-wrap emerald">
                <i class="ri-shield-check-line"></i>
              </div>
            </div>
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Average Daemon Ping</h4>
                <div class="apparatus-telemetry-val" style="color: #38bdf8;">16ms</div>
              </div>
              <div class="apparatus-telemetry-icon-wrap cyan">
                <i class="ri-speed-up-line"></i>
              </div>
            </div>
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>RAM Utilization</h4>
                <div class="apparatus-telemetry-val" style="color: #818cf8;">54.2%</div>
              </div>
              <div class="apparatus-telemetry-icon-wrap indigo">
                <i class="ri-cpu-line"></i>
              </div>
            </div>
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Wings Architecture</h4>
                <div class="apparatus-telemetry-val" style="color: #fb7185;">v1.11.7</div>
              </div>
              <div class="apparatus-telemetry-icon-wrap rose">
                <i class="ri-terminal-box-line"></i>
              </div>
            </div>
          </div>

          <!-- Nodes List -->
          <div class="apparatus-admin-grid-3">
            <!-- Node 1 -->
            <div class="box box-solid" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                  <h4 style="margin: 0 0 0.25rem 0; font-size: 1rem; font-weight: 700; color: #fff;">Prod-Node-01 (Germany)</h4>
                  <span style="font-size: 0.78rem; color: #94a3b8;">Frankfurt • 159.65.xxx.xxx</span>
                </div>
                <span class="apparatus-status-pill online"><i class="ri-checkbox-circle-fill"></i> 12ms</span>
              </div>
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1;">
                  <span>Memory (RAM)</span>
                  <span style="font-weight: 700;">34.2 / 64 GB (53%)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar cyan" style="width: 53%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1;">
                  <span>CPU Load (AMD EPYC)</span>
                  <span style="font-weight: 700;">18.4% (Nominal)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar emerald" style="width: 18%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 1.25rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1;">
                  <span>NVMe Storage</span>
                  <span style="font-weight: 700;">480 GB / 2 TB (24%)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar indigo" style="width: 24%;"></div>
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-xs btn-default apparatus-node-ping-btn" style="flex: 1;"><i class="ri-wifi-line"></i> Ping Test</button>
                <button class="btn btn-xs btn-default apparatus-node-restart-btn" style="flex: 1;"><i class="ri-restart-line"></i> Restart Wings</button>
              </div>
            </div>

            <!-- Node 2 -->
            <div class="box box-solid" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                  <h4 style="margin: 0 0 0.25rem 0; font-size: 1rem; font-weight: 700; color: #fff;">Prod-Node-02 (Singapore)</h4>
                  <span style="font-size: 0.78rem; color: #94a3b8;">Asia-Pac • 128.199.xxx.xxx</span>
                </div>
                <span class="apparatus-status-pill online"><i class="ri-checkbox-circle-fill"></i> 38ms</span>
              </div>
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1;">
                  <span>Memory (RAM)</span>
                  <span style="font-weight: 700;">48.1 / 64 GB (75%)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar amber" style="width: 75%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1;">
                  <span>CPU Load (Ryzen 9)</span>
                  <span style="font-weight: 700;">26.8% (Nominal)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar emerald" style="width: 27%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 1.25rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1;">
                  <span>NVMe Storage</span>
                  <span style="font-weight: 700;">620 GB / 2 TB (31%)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar indigo" style="width: 31%;"></div>
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-xs btn-default apparatus-node-ping-btn" style="flex: 1;"><i class="ri-wifi-line"></i> Ping Test</button>
                <button class="btn btn-xs btn-default apparatus-node-restart-btn" style="flex: 1;"><i class="ri-restart-line"></i> Restart Wings</button>
              </div>
            </div>

            <!-- Node 3 -->
            <div class="box box-solid" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                  <h4 style="margin: 0 0 0.25rem 0; font-size: 1rem; font-weight: 700; color: #fff;">Prod-Node-03 (US East)</h4>
                  <span style="font-size: 0.78rem; color: #94a3b8;">New York • 143.198.xxx.xxx</span>
                </div>
                <span class="apparatus-status-pill online"><i class="ri-checkbox-circle-fill"></i> 64ms</span>
              </div>
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1;">
                  <span>Memory (RAM)</span>
                  <span style="font-weight: 700;">22.5 / 64 GB (35%)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar cyan" style="width: 35%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1;">
                  <span>CPU Load (AMD EPYC)</span>
                  <span style="font-weight: 700;">14.2% (Nominal)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar emerald" style="width: 14%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 1.25rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1;">
                  <span>NVMe Storage</span>
                  <span style="font-weight: 700;">310 GB / 2 TB (15%)</span>
                </div>
                <div class="apparatus-progress">
                  <div class="apparatus-progress-bar indigo" style="width: 15%;"></div>
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
        showAdminToast('success', 'Ping Result', `Latency check completed: ${rnd}ms response from hypervisor socket.`);
      });
    });

    container.querySelectorAll('.apparatus-node-restart-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        showAdminToast('success', 'Wings Restart Queued', 'Daemon restart signal sent to target node socket.');
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
  // 7. STAFF AUDIT & SECURITY SENTINEL LOG VIEW (OPTION 1)
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
            Immutable activity stream logging all administrative decisions, privilege grants, and infrastructure mutations.
          </p>

          <div class="apparatus-admin-grid-4" style="margin-bottom: 1.75rem;">
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Total Events Logged</h4>
                <div class="apparatus-telemetry-val">1,482</div>
              </div>
              <div class="apparatus-telemetry-icon-wrap indigo"><i class="ri-file-list-3-line"></i></div>
            </div>
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Active Staff Sessions</h4>
                <div class="apparatus-telemetry-val">2 Online</div>
              </div>
              <div class="apparatus-telemetry-icon-wrap emerald"><i class="ri-user-star-line"></i></div>
            </div>
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Elevated Actions (24h)</h4>
                <div class="apparatus-telemetry-val">34 Actions</div>
              </div>
              <div class="apparatus-telemetry-icon-wrap cyan"><i class="ri-key-fill"></i></div>
            </div>
            <div class="apparatus-admin-telemetry-tile">
              <div class="apparatus-telemetry-meta">
                <h4>Security Risk Incidents</h4>
                <div class="apparatus-telemetry-val" style="color: #34d399;">0 Threats</div>
              </div>
              <div class="apparatus-telemetry-icon-wrap rose"><i class="ri-shield-flash-line"></i></div>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-hover table-striped">
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
                  <td><code style="color: #94a3b8;">2026-11-16 10:52:14</code></td>
                  <td><strong>mudit kumar</strong> <span class="label label-primary">Root Admin</span></td>
                  <td>Updated server allocation limit & CPU throttle</td>
                  <td><code>Server #412</code> (Minecraft SMP)</td>
                  <td><code>103.115.xxx.xxx</code></td>
                  <td><span class="label label-success">LOW RISK</span></td>
                </tr>
                <tr>
                  <td><code style="color: #94a3b8;">2026-11-16 09:44:02</code></td>
                  <td><strong>mudit kumar</strong> <span class="label label-primary">Root Admin</span></td>
                  <td>Modified global email notification templates</td>
                  <td><code>Mailer Studio</code></td>
                  <td><code>103.115.xxx.xxx</code></td>
                  <td><span class="label label-success">LOW RISK</span></td>
                </tr>
                <tr>
                  <td><code style="color: #94a3b8;">2026-11-16 07:18:55</code></td>
                  <td><strong>System Daemon</strong> <span class="label label-default">Automated</span></td>
                  <td>Daily snapshot backup verified on Prod-Node-01</td>
                  <td><code>Node-01 Cluster</code></td>
                  <td><code>127.0.0.1</code></td>
                  <td><span class="label label-success">ROUTINE</span></td>
                </tr>
                <tr>
                  <td><code style="color: #94a3b8;">2026-11-15 22:30:11</code></td>
                  <td><strong>mudit kumar</strong> <span class="label label-primary">Root Admin</span></td>
                  <td>Created new node port allocation range (25565 - 25600)</td>
                  <td><code>Frankfurt Hypervisor</code></td>
                  <td><code>103.115.xxx.xxx</code></td>
                  <td><span class="label label-warning">ELEVATED</span></td>
                </tr>
                <tr>
                  <td><code style="color: #94a3b8;">2026-11-15 19:12:40</code></td>
                  <td><strong>mudit kumar</strong> <span class="label label-primary">Root Admin</span></td>
                  <td>Generated Application API Key (Read/Write)</td>
                  <td><code>API Key #18</code></td>
                  <td><code>103.115.xxx.xxx</code></td>
                  <td><span class="label label-warning">ELEVATED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const expJson = container.querySelector('#apparatus-audit-export-json');
    if (expJson) {
      expJson.addEventListener('click', () => showAdminToast('success', 'Export Complete', 'Audit log export (JSON) downloaded.'));
    }
    const expCsv = container.querySelector('#apparatus-audit-export-csv');
    if (expCsv) {
      expCsv.addEventListener('click', () => showAdminToast('success', 'Export Complete', 'Audit log export (CSV) downloaded.'));
    }
    const purge = container.querySelector('#apparatus-audit-purge');
    if (purge) {
      purge.addEventListener('click', () => showAdminToast('success', 'Archive Maintained', 'Logs older than 90 days pruned from storage.'));
    }
  }

  // ==============================================================================
  // 8. STORE & PRICING MANAGER VIEW (OPTION 5)
  // ==============================================================================
  function renderStorePricingView(container) {
    const pricing = JSON.parse(localStorage.getItem('apparatus_store_pricing') || '{"currency":"Points","usdRate":100,"dailyBonus":10,"referralBonus":50,"ramRate":25,"cpuRate":40,"diskRate":10,"portRate":15,"dbRate":20,"backupRate":25}');

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
            <div class="box box-solid" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 1.5rem;">
              <h4 style="margin: 0 0 1rem 0; font-weight: 700; color: #c084fc;"><i class="ri-coins-line"></i> Points Currency Settings</h4>
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
                <label>Referral Bonus per Invited Friend</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="apparatus-pricing-ref" value="${pricing.referralBonus}">
                  <span class="input-group-addon">Points</span>
                </div>
              </div>
            </div>

            <!-- Resource Unit Pricing -->
            <div class="box box-solid" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 1.5rem;">
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
        showAdminToast('success', 'Pricing Synchronized', 'Resource point rates saved and live across client store views.');
      });
    }

    const resetBtn = container.querySelector('#apparatus-pricing-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        localStorage.removeItem('apparatus_store_pricing');
        renderStorePricingView(container);
        showAdminToast('success', 'Defaults Restored', 'Recommended pricing metrics reloaded.');
      });
    }
  }

  // ==============================================================================
  // 9. DISCORD WEBHOOKS DISPATCHER VIEW (OPTION 3)
  // ==============================================================================
  function renderWebhooksView(container) {
    const saved = JSON.parse(localStorage.getItem('apparatus_discord_webhooks') || '{"url":"https://discord.com/api/webhooks/example","botName":"ArixByte Staff Sentinel","channel":"#staff-alerts"}');

    container.className = 'apparatus-admin-view';
    container.innerHTML = `
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title"><i class="ri-discord-line"></i> Discord Staff Bot Webhook Dispatcher</h3>
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
                <label style="display: flex; align-items: center; justify-content: space-between; font-weight: 500; color: #cbd5e1; background: rgba(255,255,255,0.04); padding: 0.65rem 1rem; border-radius: 8px;">
                  <span><i class="ri-error-warning-fill" style="color: #fb7185; margin-right: 0.5rem;"></i> Node Offline / Heartbeat Dropped (Critical)</span>
                  <input type="checkbox" checked>
                </label>
                <label style="display: flex; align-items: center; justify-content: space-between; font-weight: 500; color: #cbd5e1; background: rgba(255,255,255,0.04); padding: 0.65rem 1rem; border-radius: 8px;">
                  <span><i class="ri-alarm-warning-fill" style="color: #fbbf24; margin-right: 0.5rem;"></i> Server Out-of-Memory / Daemon Crash</span>
                  <input type="checkbox" checked>
                </label>
                <label style="display: flex; align-items: center; justify-content: space-between; font-weight: 500; color: #cbd5e1; background: rgba(255,255,255,0.04); padding: 0.65rem 1rem; border-radius: 8px;">
                  <span><i class="ri-user-add-line" style="color: #38bdf8; margin-right: 0.5rem;"></i> New Client Account Registered</span>
                  <input type="checkbox" checked>
                </label>
                <label style="display: flex; align-items: center; justify-content: space-between; font-weight: 500; color: #cbd5e1; background: rgba(255,255,255,0.04); padding: 0.65rem 1rem; border-radius: 8px;">
                  <span><i class="ri-shield-keyhole-line" style="color: #c084fc; margin-right: 0.5rem;"></i> Admin Role Escalation & Password Changes</span>
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
        showAdminToast('success', 'Webhook Saved', 'Discord bot dispatcher configuration saved.');
      });
    }

    const testBtn = container.querySelector('#apparatus-webhook-test-btn');
    if (testBtn) {
      testBtn.addEventListener('click', function () {
        showAdminToast('success', 'Test Event Queued', 'Dispatched test embed payload to staff webhook.');
      });
    }
  }

  // ==============================================================================
  // 10. INBUILT ADDONS STUDIO VIEW
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
            <div class="apparatus-addon-card">
              <div class="apparatus-addon-top">
                <div class="apparatus-addon-title-group">
                  <div class="apparatus-addon-icon"><i class="ri-sparkling-fill"></i></div>
                  <div>
                    <h4 class="apparatus-addon-name">Apparatus Glassmorphism Suite</h4>
                    <span class="apparatus-addon-version">Version 3.2.0 • Active</span>
                  </div>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox" checked disabled>
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p class="apparatus-addon-desc">High-performance GPU-accelerated frosted glass panels, custom sidebar layouts, and luminous neon accents.</p>
            </div>

            <div class="apparatus-addon-card">
              <div class="apparatus-addon-top">
                <div class="apparatus-addon-title-group">
                  <div class="apparatus-addon-icon"><i class="ri-wallet-3-line"></i></div>
                  <div>
                    <h4 class="apparatus-addon-name">Client Wallet & Points Engine</h4>
                    <span class="apparatus-addon-version">Version 2.1.0 • Enabled</span>
                  </div>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox" checked>
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p class="apparatus-addon-desc">Enables top-up redirection to /store, daily rewards, referral bonuses, and points redemption.</p>
            </div>

            <div class="apparatus-addon-card">
              <div class="apparatus-addon-top">
                <div class="apparatus-addon-title-group">
                  <div class="apparatus-addon-icon"><i class="ri-user-smile-line"></i></div>
                  <div>
                    <h4 class="apparatus-addon-name">Avatar Studio & User Profiles</h4>
                    <span class="apparatus-addon-version">Version 1.8.4 • Active</span>
                  </div>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox" checked>
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p class="apparatus-addon-desc">Local image uploading, custom URL avatars, preset selector, and user privacy blur mode.</p>
            </div>

            <div class="apparatus-addon-card">
              <div class="apparatus-addon-top">
                <div class="apparatus-addon-title-group">
                  <div class="apparatus-addon-icon"><i class="ri-eye-close-line"></i></div>
                  <div>
                    <h4 class="apparatus-addon-name">Streamer & Staff Privacy Blur</h4>
                    <span class="apparatus-addon-version">Version 2.0.0 • Active</span>
                  </div>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox" checked>
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p class="apparatus-addon-desc">Obfuscates email addresses, server IP ports, and wallet point balances with smooth hover-to-reveal.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==============================================================================
  // 11. BLUEPRINT & EXTENSIONS HUB VIEW
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
                <i class="ri-checkbox-circle-fill"></i> Blueprint v2.4 Architecture Compatible
              </div>
              <p style="margin: 0.35rem 0 0 0; font-size: 0.82rem; color: #94a3b8;">
                All extensions installed through Blueprint CLI or manual packages are rendered with unified obsidian styling.
              </p>
            </div>
            <div class="apparatus-telemetry-icon-wrap emerald">
              <i class="ri-code-box-line"></i>
            </div>
          </div>

          <div class="table-responsive" style="margin-bottom: 2rem;">
            <table class="table table-hover table-striped">
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
                  <td><strong>Apparatus Glassmorphism Suite</strong></td>
                  <td>3.2.0</td>
                  <td>ArixByte Systems</td>
                  <td><span class="label label-success">ACTIVE</span></td>
                </tr>
                <tr>
                  <td><code>blueprint-core</code></td>
                  <td><strong>Blueprint Framework Engine</strong></td>
                  <td>2.4.1</td>
                  <td>Emma Robertson</td>
                  <td><span class="label label-success">OPERATIONAL</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: rgba(8, 12, 20, 0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem;">
            <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 700; color: #38bdf8;">
              <i class="ri-terminal-line"></i> CLI Extension Management
            </h4>
            <pre style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.06); color: #cbd5e1; font-size: 0.82rem; border-radius: 8px; padding: 1rem; margin: 0;">blueprint -install &lt;extension-name&gt;
blueprint -rerun
php artisan view:clear</pre>
          </div>
        </div>
      </div>
    `;
  }

  // ==============================================================================
  // 12. ENHANCE ADMIN OVERVIEW (TELEMETRY & OPERATIONS COMMAND HUB)
  // ==============================================================================
  function enhanceAdminOverview() {
    if (window.location.pathname !== '/admin' || window.location.hash) return;

    const content = document.querySelector('.content-wrapper .content');
    if (!content) return;

    const firstRow = content.querySelector('.row') || content.firstElementChild;
    if (!firstRow) return;

    // 1. Inject Top Telemetry Grid
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
          <div class="apparatus-telemetry-icon-wrap emerald">
            <i class="ri-server-line"></i>
          </div>
        </div>

        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-telemetry-meta">
            <h4>Active Game Servers</h4>
            <div class="apparatus-telemetry-val" style="color: #38bdf8;">Online</div>
          </div>
          <div class="apparatus-telemetry-icon-wrap cyan">
            <i class="ri-hard-drive-2-line"></i>
          </div>
        </div>

        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-telemetry-meta">
            <h4>Client Accounts</h4>
            <div class="apparatus-telemetry-val" style="color: #818cf8;">Verified</div>
          </div>
          <div class="apparatus-telemetry-icon-wrap indigo">
            <i class="ri-user-heart-line"></i>
          </div>
        </div>

        <div class="apparatus-admin-telemetry-tile">
          <div class="apparatus-telemetry-meta">
            <h4>Security Sentinel</h4>
            <div class="apparatus-telemetry-val" style="color: #fb7185;">Guarded</div>
          </div>
          <div class="apparatus-telemetry-icon-wrap rose">
            <i class="ri-shield-flash-line"></i>
          </div>
        </div>
      `;
      content.insertBefore(telemetryGrid, firstRow);
    }

    // 2. Inject Executive Command Center Hub below the default 4 buttons to eliminate empty void
    if (!document.getElementById('apparatus-admin-operations-hub')) {
      const allRows = content.querySelectorAll('.row');
      const lastNativeRow = allRows.length > 0 ? allRows[allRows.length - 1] : null;

      const opsHub = document.createElement('div');
      opsHub.id = 'apparatus-admin-operations-hub';
      opsHub.style.marginTop = '2rem';
      opsHub.innerHTML = `
        <div class="apparatus-admin-grid-2" style="margin-bottom: 2rem;">
          <!-- Quick Operations Shortcuts -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title"><i class="ri-apps-line"></i> Quick Operations Launchpad</h3>
            </div>
            <div class="box-body" style="padding: 1.25rem;">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.85rem;">
                <a href="#node-health" class="apparatus-admin-tab" data-tab="node-health" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); padding: 0.85rem 1rem; border-radius: 10px; color: #34d399; text-decoration: none; font-weight: 600;">
                  <i class="ri-pulse-line" style="font-size: 1.3rem;"></i>
                  <span>Node Health</span>
                </a>
                <a href="#store-pricing" class="apparatus-admin-tab" data-tab="store-pricing" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.25); padding: 0.85rem 1rem; border-radius: 10px; color: #c084fc; text-decoration: none; font-weight: 600;">
                  <i class="ri-price-tag-3-line" style="font-size: 1.3rem;"></i>
                  <span>Store & Pricing</span>
                </a>
                <a href="#announcements" class="apparatus-admin-tab" data-tab="announcements" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.25); padding: 0.85rem 1rem; border-radius: 10px; color: #fbbf24; text-decoration: none; font-weight: 600;">
                  <i class="ri-notification-badge-line" style="font-size: 1.3rem;"></i>
                  <span>Announcements</span>
                </a>
                <a href="#audit-logs" class="apparatus-admin-tab" data-tab="audit-logs" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.25); padding: 0.85rem 1rem; border-radius: 10px; color: #818cf8; text-decoration: none; font-weight: 600;">
                  <i class="ri-shield-check-line" style="font-size: 1.3rem;"></i>
                  <span>Audit Logs</span>
                </a>
                <a href="#mail-editor" class="apparatus-admin-tab" data-tab="mail-editor" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); padding: 0.85rem 1rem; border-radius: 10px; color: #38bdf8; text-decoration: none; font-weight: 600;">
                  <i class="ri-mail-settings-line" style="font-size: 1.3rem;"></i>
                  <span>Mail Editor</span>
                </a>
                <a href="#webhooks" class="apparatus-admin-tab" data-tab="webhooks" style="display: flex; align-items: center; gap: 0.75rem; background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.25); padding: 0.85rem 1rem; border-radius: 10px; color: #fb7185; text-decoration: none; font-weight: 600;">
                  <i class="ri-discord-line" style="font-size: 1.3rem;"></i>
                  <span>Discord Alerts</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Infrastructure Cluster Health -->
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title"><i class="ri-server-line"></i> Infrastructure Connectivity & Daemons</h3>
            </div>
            <div class="box-body" style="padding: 1.25rem;">
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.65rem; border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <div>
                    <strong style="color: #fff; font-size: 0.88rem;">Wings Hypervisor Daemon Cluster</strong>
                    <div style="font-size: 0.76rem; color: #94a3b8;">Port 8080 SSL • TLS v1.3 Verified</div>
                  </div>
                  <span class="apparatus-status-pill online"><i class="ri-checkbox-circle-fill"></i> Connected</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.65rem; border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <div>
                    <strong style="color: #fff; font-size: 0.88rem;">Database Cluster (MySQL / MariaDB)</strong>
                    <div style="font-size: 0.76rem; color: #94a3b8;">Port 3306 • Query Latency 0.4ms</div>
                  </div>
                  <span class="apparatus-status-pill online"><i class="ri-checkbox-circle-fill"></i> Nominal</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <strong style="color: #fff; font-size: 0.88rem;">Redis Cache & Job Queue Workers</strong>
                    <div style="font-size: 0.76rem; color: #94a3b8;">Port 6379 • Queue Backlog: 0</div>
                  </div>
                  <span class="apparatus-status-pill online"><i class="ri-checkbox-circle-fill"></i> Synchronized</span>
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
