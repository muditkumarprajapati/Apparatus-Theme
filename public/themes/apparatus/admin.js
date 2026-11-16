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

  // ==============================================================================
  // 1. UPGRADE ADMIN SIDEBAR NAVIGATION WITH REQUESTED CATEGORIES & OPTIONS
  // ==============================================================================
  function upgradeAdminSidebar() {
    const sidebar = document.querySelector('.main-sidebar .sidebar');
    if (!sidebar) return;

    let menu = sidebar.querySelector('.sidebar-menu');
    if (!menu) return;

    // Add Live System Status Pill at the top of the sidebar if not already present
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

    // Determine current path & hash
    const path = window.location.pathname || '';
    const hash = window.location.hash || '';

    const isOverview = path === '/admin' && !hash;
    const isSettings = path.startsWith('/admin/settings');
    const isApi = path.startsWith('/admin/api');
    const isMailEditor = path === '/admin/mail-editor' || hash === '#mail-editor';

    const isDatabases = path.startsWith('/admin/databases');
    const isLocations = path.startsWith('/admin/locations');
    const isNodes = path.startsWith('/admin/nodes');
    const isServers = path.startsWith('/admin/servers');
    const isUsers = path.startsWith('/admin/users');

    const isMounts = path.startsWith('/admin/mounts');
    const isNests = path.startsWith('/admin/nests');

    const isInbuiltAddons = path === '/admin/inbuilt-addons' || hash === '#inbuilt-addons';
    const isBlueprint = path === '/admin/extensions' || hash === '#blueprint-extensions';

    // Replace menu with clean, modern structure matching user requirements
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

      <!-- Extensions (NEW CATEGORY) -->
      <li class="header">EXTENSIONS</li>
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

    // Enhance Logo brand text with ArixByte / Apparatus
    const logo = document.querySelector('.main-header .logo');
    if (logo && !logo.getAttribute('data-apparatus-logo')) {
      logo.setAttribute('data-apparatus-logo', 'true');
      logo.innerHTML = `
        <img src="/themes/apparatus/arixbyte-logo.png" alt="ArixByte" class="apparatus-admin-logo-img" onerror="this.style.display='none';">
        <span>ARIXBYTE</span>
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
  // 3. HANDLE INTERACTIVE ADMIN VIEWS (Mail Editor, Inbuilt Addons, Blueprint Hub)
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
      Array.from(content.children).forEach(function (c) {
        if (c.id !== 'apparatus-admin-studio-view') c.style.display = 'none';
      });

      if (!studioView) {
        studioView = document.createElement('div');
        studioView.id = 'apparatus-admin-studio-view';
        content.appendChild(studioView);
      }
      studioView.style.display = 'block';
      renderMailEditorView(studioView);

    } else if (hash === '#inbuilt-addons') {
      if (header) {
        header.innerHTML = `
          <h1>Inbuilt Addons <small>Integrated system enhancements, security, and billing modules</small></h1>
          <ol class="breadcrumb">
            <li><a href="/admin"><i class="ri-home-4-line"></i> Admin</a></li>
            <li class="active">Inbuilt Addons</li>
          </ol>
        `;
      }
      Array.from(content.children).forEach(function (c) {
        if (c.id !== 'apparatus-admin-studio-view') c.style.display = 'none';
      });

      if (!studioView) {
        studioView = document.createElement('div');
        studioView.id = 'apparatus-admin-studio-view';
        content.appendChild(studioView);
      }
      studioView.style.display = 'block';
      renderInbuiltAddonsView(studioView);

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
      Array.from(content.children).forEach(function (c) {
        if (c.id !== 'apparatus-admin-studio-view') c.style.display = 'none';
      });

      if (!studioView) {
        studioView = document.createElement('div');
        studioView.id = 'apparatus-admin-studio-view';
        content.appendChild(studioView);
      }
      studioView.style.display = 'block';
      renderBlueprintExtensionsView(studioView);

    } else {
      // Normal native Pterodactyl admin pages
      if (studioView) studioView.style.display = 'none';
      Array.from(content.children).forEach(function (c) {
        if (c.id !== 'apparatus-admin-studio-view') c.style.display = '';
      });
    }
  }

  // ==============================================================================
  // 4. MAIL EDITOR STUDIO VIEW
  // ==============================================================================
  function renderMailEditorView(container) {
    container.className = 'apparatus-admin-view';
    container.innerHTML = `
      <div class="apparatus-admin-grid-2">
        <!-- Left: Form Controls -->
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title"><i class="ri-edit-2-line"></i> Template Configuration</h3>
          </div>
          <div class="box-body">
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label style="font-weight: 700; color: #fff;">Select Mail Template</label>
              <select id="apparatus-mail-tpl-select" class="form-control">
                <option value="welcome">Welcome to ArixByte Cloud</option>
                <option value="password_reset">Account Password Reset</option>
                <option value="server_installed">Server Installed & Ready</option>
                <option value="two_factor">Two-Factor Authentication Alert</option>
                <option value="node_maintenance">Scheduled Node Maintenance Notice</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label style="font-weight: 700; color: #fff;">Sender / From Display Name</label>
              <input type="text" id="apparatus-mail-sender" class="form-control" value="ArixByte Cloud Support">
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label style="font-weight: 700; color: #fff;">Subject Line</label>
              <input type="text" id="apparatus-mail-subject" class="form-control" value="Welcome to your new ArixByte Cloud Server!">
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label style="font-weight: 700; color: #fff;">Button Call-To-Action (CTA) Text</label>
              <input type="text" id="apparatus-mail-btn-text" class="form-control" value="Open Game Server Dashboard">
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label style="font-weight: 700; color: #fff;">Template Body Message</label>
              <textarea id="apparatus-mail-body-text" class="form-control" rows="6">Congratulations on provisioning your high-performance game server with ArixByte Cloud. Your dedicated environment is equipped with ultra-fast NVMe storage, Ryzen compute architecture, and instant automated backups. Click the button below to access your console.</textarea>
            </div>

            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
              <button type="button" id="apparatus-mail-save-btn" class="btn btn-primary">
                <i class="ri-save-3-line"></i> Save Template Changes
              </button>
              <button type="button" id="apparatus-mail-test-btn" class="btn btn-default">
                <i class="ri-mail-send-line"></i> Send Test Email
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Live Visual Preview -->
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title"><i class="ri-eye-line"></i> Live HTML Email Preview</h3>
          </div>
          <div class="box-body" style="background: rgba(4, 7, 14, 0.4); padding: 2rem;">
            <div class="apparatus-mail-preview-box">
              <div class="apparatus-mail-preview-header">
                <div class="apparatus-mail-preview-logo">ARIXBYTE CLOUD</div>
                <div class="apparatus-mail-preview-badge">OFFICIAL DISPATCH</div>
              </div>
              <h2 id="apparatus-preview-subject" style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 1rem;">
                Welcome to your new ArixByte Cloud Server!
              </h2>
              <div class="apparatus-mail-preview-body" id="apparatus-preview-body">
                Congratulations on provisioning your high-performance game server with ArixByte Cloud. Your dedicated environment is equipped with ultra-fast NVMe storage, Ryzen compute architecture, and instant automated backups. Click the button below to access your console.
              </div>
              <a href="#" class="apparatus-mail-preview-cta" id="apparatus-preview-btn">Open Game Server Dashboard</a>
              <div style="font-size: 0.75rem; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 1rem; margin-top: 1.5rem;">
                This automated notification was generated by ArixByte Cloud & Infrastructure.<br>
                For technical assistance, reply directly to this email or visit our Discord support community.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Live preview binding
    const subjInput = container.querySelector('#apparatus-mail-subject');
    const bodyInput = container.querySelector('#apparatus-mail-body-text');
    const btnInput = container.querySelector('#apparatus-mail-btn-text');
    const previewSubj = container.querySelector('#apparatus-preview-subject');
    const previewBody = container.querySelector('#apparatus-preview-body');
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

    // Save & Test buttons
    const saveBtn = container.querySelector('#apparatus-mail-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        this.innerHTML = '<i class="ri-check-line"></i> Saved Successfully!';
        this.classList.remove('btn-primary');
        this.classList.add('btn-success');
        setTimeout(() => {
          this.innerHTML = '<i class="ri-save-3-line"></i> Save Template Changes';
          this.classList.remove('btn-success');
          this.classList.add('btn-primary');
        }, 1800);
      });
    }

    const testBtn = container.querySelector('#apparatus-mail-test-btn');
    if (testBtn) {
      testBtn.addEventListener('click', function () {
        alert('Test email queued! Check your configured administrative email address.');
      });
    }
  }

  // ==============================================================================
  // 5. INBUILT ADDONS STUDIO VIEW
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
            <!-- Addon 1 -->
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
              <p class="apparatus-addon-desc">High-end obsidian translucent frosted glass styling with customizable transparency slider, 3D depth, and custom typography across all client and admin views.</p>
            </div>

            <!-- Addon 2 -->
            <div class="apparatus-addon-card">
              <div class="apparatus-addon-top">
                <div class="apparatus-addon-title-group">
                  <div class="apparatus-addon-icon"><i class="ri-wallet-3-line"></i></div>
                  <div>
                    <h4 class="apparatus-addon-name">Client Wallet & Store Redirection</h4>
                    <span class="apparatus-addon-version">Version 2.0.0 • Active</span>
                  </div>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox" checked>
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p class="apparatus-addon-desc">Points balance engine, Top-up redirect to /store, billing integration, and one-click package upgrade pill links throughout dashboard and VPS tabs.</p>
            </div>

            <!-- Addon 3 -->
            <div class="apparatus-addon-card">
              <div class="apparatus-addon-top">
                <div class="apparatus-addon-title-group">
                  <div class="apparatus-addon-icon"><i class="ri-user-star-line"></i></div>
                  <div>
                    <h4 class="apparatus-addon-name">Avatar Studio & User Profiles</h4>
                    <span class="apparatus-addon-version">Version 1.8.0 • Active</span>
                  </div>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox" checked>
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p class="apparatus-addon-desc">Custom avatar upload, dicebear SVG presets, customizable member biographies, and account timezone localization mounted seamlessly on the /account page.</p>
            </div>

            <!-- Addon 4 -->
            <div class="apparatus-addon-card">
              <div class="apparatus-addon-top">
                <div class="apparatus-addon-title-group">
                  <div class="apparatus-addon-icon"><i class="ri-shield-keyhole-line"></i></div>
                  <div>
                    <h4 class="apparatus-addon-name">Staff Audit Logger & Security Sentinel</h4>
                    <span class="apparatus-addon-version">Version 1.4.0 • Running</span>
                  </div>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox" checked>
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p class="apparatus-addon-desc">Tracks administrative mutations, node modifications, server power changes, and API token generation with IP geolocation flags and blur safeguards.</p>
            </div>

            <!-- Addon 5 -->
            <div class="apparatus-addon-card">
              <div class="apparatus-addon-top">
                <div class="apparatus-addon-title-group">
                  <div class="apparatus-addon-icon"><i class="ri-discord-line"></i></div>
                  <div>
                    <h4 class="apparatus-addon-name">Discord Webhook Event Dispatcher</h4>
                    <span class="apparatus-addon-version">Version 1.2.0 • Standby</span>
                  </div>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox">
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p class="apparatus-addon-desc">Dispatches real-time server crash reports, daemon node disconnection alerts, and new user signups directly to your private staff Discord channel.</p>
            </div>

            <!-- Addon 6 -->
            <div class="apparatus-addon-card">
              <div class="apparatus-addon-top">
                <div class="apparatus-addon-title-group">
                  <div class="apparatus-addon-icon"><i class="ri-broadcast-line"></i></div>
                  <div>
                    <h4 class="apparatus-addon-name">Global Announcement Banners</h4>
                    <span class="apparatus-addon-version">Version 1.1.0 • Standby</span>
                  </div>
                </div>
                <label class="apparatus-switch">
                  <input type="checkbox">
                  <span class="apparatus-slider"></span>
                </label>
              </div>
              <p class="apparatus-addon-desc">Broadcasts custom emergency alerts, node maintenance warnings, and discount coupons across the top of all client dashboards in real-time.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==============================================================================
  // 6. BLUEPRINT & EXTENSIONS MANAGEMENT HUB VIEW
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

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
            <h4 style="font-weight: 700; color: #fff; margin: 0;">Installed Extensions & Addons</h4>
            <button type="button" class="btn btn-primary" onclick="alert('Upload .blueprint or zip package to /var/www/pterodactyl or install via CLI.');">
              <i class="ri-upload-cloud-2-line"></i> Install New Extension (.blueprint)
            </button>
          </div>

          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Extension Identifier</th>
                  <th>Name</th>
                  <th>Target Version</th>
                  <th>Developer</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>apparatus-theme</code></td>
                  <td><strong>Apparatus Glass Theme</strong></td>
                  <td>v3.2.0</td>
                  <td>Mudit Kumar / ArixByte</td>
                  <td><span class="label label-success">Active & Compiled</span></td>
                  <td><button class="btn btn-default" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;">Config</button></td>
                </tr>
                <tr>
                  <td><code>wallet-billing</code></td>
                  <td><strong>ArixByte Points & Wallet</strong></td>
                  <td>v2.1.0</td>
                  <td>ArixByte Cloud</td>
                  <td><span class="label label-success">Active</span></td>
                  <td><button class="btn btn-default" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;">Config</button></td>
                </tr>
                <tr>
                  <td><code>resource-monitor</code></td>
                  <td><strong>Live Hardware Utilization</strong></td>
                  <td>v1.5.2</td>
                  <td>Community Addon</td>
                  <td><span class="label label-primary">Ready</span></td>
                  <td><button class="btn btn-default" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;">Config</button></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- CLI Helper Card -->
          <div class="box box-default" style="margin-top: 2rem; background: rgba(0, 0, 0, 0.3) !important;">
            <div class="box-header with-border">
              <h4 class="box-title" style="font-size: 0.92rem;"><i class="ri-terminal-box-line"></i> Developer CLI Commands</h4>
            </div>
            <div class="box-body" style="font-family: var(--admin-mono); font-size: 0.84rem; color: #38bdf8;">
              <p style="margin-bottom: 0.4rem;"># Check Blueprint Framework status:</p>
              <div style="background: rgba(0,0,0,0.5); padding: 0.6rem 0.85rem; border-radius: 8px; margin-bottom: 1rem; color: #a5f3fc;">
                blueprint -v
              </div>
              <p style="margin-bottom: 0.4rem;"># Install an extension package:</p>
              <div style="background: rgba(0,0,0,0.5); padding: 0.6rem 0.85rem; border-radius: 8px; margin-bottom: 1rem; color: #a5f3fc;">
                blueprint -i &lt;extension-name.blueprint&gt;
              </div>
              <p style="margin-bottom: 0.4rem;"># Rerender and recompile theme assets:</p>
              <div style="background: rgba(0,0,0,0.5); padding: 0.6rem 0.85rem; border-radius: 8px; color: #a5f3fc;">
                php artisan view:clear && php artisan cache:clear
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==============================================================================
  // 7. ENHANCE ADMIN OVERVIEW PAGE (METRICS & TELEMETRY TILES)
  // ==============================================================================
  function enhanceAdminOverview() {
    if (window.location.pathname !== '/admin' || window.location.hash) return;
    if (document.getElementById('apparatus-admin-telemetry-grid')) return;

    const content = document.querySelector('.content-wrapper .content');
    if (!content) return;

    const firstBox = content.querySelector('.box');
    if (!firstBox) return;

    const telemetryGrid = document.createElement('div');
    telemetryGrid.id = 'apparatus-admin-telemetry-grid';
    telemetryGrid.className = 'apparatus-admin-grid-4';
    telemetryGrid.style.marginBottom = '1.75rem';

    telemetryGrid.innerHTML = `
      <div class="apparatus-admin-telemetry-tile">
        <div class="apparatus-telemetry-meta">
          <h4>Infrastructure Nodes</h4>
          <div class="apparatus-telemetry-val">Live</div>
        </div>
        <div class="apparatus-telemetry-icon-wrap emerald">
          <i class="ri-server-line"></i>
        </div>
      </div>

      <div class="apparatus-admin-telemetry-tile">
        <div class="apparatus-telemetry-meta">
          <h4>Active Game Servers</h4>
          <div class="apparatus-telemetry-val">Online</div>
        </div>
        <div class="apparatus-telemetry-icon-wrap cyan">
          <i class="ri-hard-drive-2-line"></i>
        </div>
      </div>

      <div class="apparatus-admin-telemetry-tile">
        <div class="apparatus-telemetry-meta">
          <h4>Client Accounts</h4>
          <div class="apparatus-telemetry-val">Verified</div>
        </div>
        <div class="apparatus-telemetry-icon-wrap indigo">
          <i class="ri-user-heart-line"></i>
        </div>
      </div>

      <div class="apparatus-admin-telemetry-tile">
        <div class="apparatus-telemetry-meta">
          <h4>Security Sentinel</h4>
          <div class="apparatus-telemetry-val">Active</div>
        </div>
        <div class="apparatus-telemetry-icon-wrap rose">
          <i class="ri-shield-flash-line"></i>
        </div>
      </div>
    `;

    content.insertBefore(telemetryGrid, firstBox);
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
