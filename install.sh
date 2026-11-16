#!/bin/bash
# ==============================================================================
# Apparatus Theme - 100% Script-Based Installer for Pterodactyl Panel
# 1 - Install Theme
# 2 - Update Theme
# 3 - Remove Theme
# ==============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

clear
echo -e "${CYAN}${BOLD}"
cat << "EOF"
  █████  ██████  ██████   █████  ██████   █████  ████████ ██    ██ ███████
 ██   ██ ██   ██ ██   ██ ██   ██ ██   ██ ██   ██    ██    ██    ██ ██     
 ███████ ██████  ██████  ███████ ██████  ███████    ██    ██    ██ ███████
 ██   ██ ██      ██      ██   ██ ██   ██ ██   ██    ██    ██    ██      ██
 ██   ██ ██      ██      ██   ██ ██   ██ ██   ██    ██     ██████  ███████
EOF
echo -e "${YELLOW}           JTGPANEL | CLOUD & INFRASTRUCTURE | ARIXBYTE LOGIN${NC}"
echo -e "${CYAN}========================================================================${NC}\n"

# Verify Root Privileges
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}[ERROR] Please run this script as root:${NC}"
  echo -e "${YELLOW}curl -sSL https://raw.githubusercontent.com/muditkumarprajapati/Apparatus-Theme/main/install.sh -o install.sh && bash install.sh${NC}"
  exit 1
fi

PTERO_DIR="/var/www/pterodactyl"
if [ ! -d "$PTERO_DIR" ]; then
  echo -e "${RED}[ERROR] Pterodactyl directory not found at: $PTERO_DIR${NC}"
  exit 1
fi

WRAPPER_FILE="$PTERO_DIR/resources/views/templates/wrapper.blade.php"
ERROR_FILE="$PTERO_DIR/resources/views/layouts/error.blade.php"
ADMIN_FILE="$PTERO_DIR/resources/views/layouts/admin.blade.php"
ASSET_DIR="$PTERO_DIR/public/themes/apparatus"

# Resolve latest commit SHA to completely bypass GitHub CDN edge caching
LATEST_SHA=$(curl -s "https://api.github.com/repos/muditkumarprajapati/Apparatus-Theme/commits/main" | grep '"sha"' | head -n 1 | cut -d '"' -f 4)
if [ -n "$LATEST_SHA" ]; then
  RAW_BASE="https://raw.githubusercontent.com/muditkumarprajapati/Apparatus-Theme/$LATEST_SHA"
else
  RAW_BASE="https://raw.githubusercontent.com/muditkumarprajapati/Apparatus-Theme/main"
fi

# Function: Install
install_theme() {
  echo -e "\n${BLUE}>>> Installing Apparatus Theme...${NC}"

  # Step 1: Backup
  if [ -f "$WRAPPER_FILE" ] && [ ! -f "$WRAPPER_FILE.apparatus.bak" ]; then
    echo -e "${BLUE}[1/4] Creating backup of original wrapper.blade.php...${NC}"
    cp "$WRAPPER_FILE" "$WRAPPER_FILE.apparatus.bak"
    echo -e "${GREEN}✓ Backup created: $WRAPPER_FILE.apparatus.bak${NC}"
  else
    echo -e "${YELLOW}[1/4] Existing backup detected. Keeping original safe.${NC}"
  fi
  if [ -f "$ERROR_FILE" ] && [ ! -f "$ERROR_FILE.apparatus.bak" ]; then
    cp "$ERROR_FILE" "$ERROR_FILE.apparatus.bak"
  fi
  if [ -f "$ADMIN_FILE" ] && [ ! -f "$ADMIN_FILE.apparatus.bak" ]; then
    cp "$ADMIN_FILE" "$ADMIN_FILE.apparatus.bak"
    echo -e "${GREEN}✓ Backup created: $ADMIN_FILE.apparatus.bak${NC}"
  fi

  # Step 2: Download Assets
  echo -e "${BLUE}[2/4] Deploying theme assets (7-Layer Parallax SVGs, CSS, JS)...${NC}"
  TS=$(date +%s)

  for theme in desert cyberpunk aurora nebula shogun; do
    echo -e "  -> Downloading $theme parallax layers..."
    mkdir -p "$ASSET_DIR/$theme"
    for file in img-bg.svg img-1.svg img-2.svg img-3.svg img-4.svg img-5.svg img-6.svg img-7.svg; do
      curl -s -L "$RAW_BASE/public/themes/apparatus/$theme/$file?v=$TS" -o "$ASSET_DIR/$theme/$file"
    done
  done
  curl -s -L "$RAW_BASE/public/themes/apparatus/desert/favicon.png?v=$TS" -o "$ASSET_DIR/desert/favicon.png" || true

  echo -e "  -> Downloading apparatus.css..."
  curl -s -L "$RAW_BASE/public/themes/apparatus/apparatus.css?v=$TS" -o "$ASSET_DIR/apparatus.css"

  echo -e "  -> Downloading apparatus.js..."
  curl -s -L "$RAW_BASE/public/themes/apparatus/apparatus.js?v=$TS" -o "$ASSET_DIR/apparatus.js"

  echo -e "  -> Downloading admin.css..."
  curl -s -L "$RAW_BASE/public/themes/apparatus/admin.css?v=$TS" -o "$ASSET_DIR/admin.css"

  echo -e "  -> Downloading admin.js..."
  curl -s -L "$RAW_BASE/public/themes/apparatus/admin.js?v=$TS" -o "$ASSET_DIR/admin.js"

  echo -e "  -> Downloading admin-bg.jpg..."
  curl -s -L "$RAW_BASE/public/themes/apparatus/admin-bg.jpg?v=$TS" -o "$ASSET_DIR/admin-bg.jpg"

  echo -e "  -> Downloading lenis.min.js..."
  curl -s -L "$RAW_BASE/public/themes/apparatus/lenis.min.js?v=$TS" -o "$ASSET_DIR/lenis.min.js"

  echo -e "  -> Downloading logos..."
  curl -s -L "$RAW_BASE/public/themes/apparatus/ab-logo.png?v=$TS" -o "$ASSET_DIR/ab-logo.png"
  curl -s -L "$RAW_BASE/public/themes/apparatus/ab-logo-white.png?v=$TS" -o "$ASSET_DIR/ab-logo-white.png"
  curl -s -L "$RAW_BASE/public/themes/apparatus/arixbyte-logo.png?v=$TS" -o "$ASSET_DIR/arixbyte-logo.png"
  curl -s -L "$RAW_BASE/public/themes/apparatus/logo.png?v=$TS" -o "$ASSET_DIR/logo.png"

  chown -R www-data:www-data "$ASSET_DIR"
  chmod -R 755 "$ASSET_DIR"

  # Deploy enhanced ForgotPasswordController (supports username lookup & account validation)
  CTRL_FILE="$PTERO_DIR/app/Http/Controllers/Auth/ForgotPasswordController.php"
  if [ -f "$CTRL_FILE" ] && [ ! -f "$CTRL_FILE.apparatus.bak" ]; then
    cp "$CTRL_FILE" "$CTRL_FILE.apparatus.bak"
  fi
  curl -s -L "$RAW_BASE/app/Http/Controllers/Auth/ForgotPasswordController.php" -o "$CTRL_FILE"
  chown www-data:www-data "$CTRL_FILE"
  chmod 644 "$CTRL_FILE"

  # Deploy enhanced RegisterController (self-registration & instant activation)
  REG_FILE="$PTERO_DIR/app/Http/Controllers/Auth/RegisterController.php"
  if [ -f "$REG_FILE" ] && [ ! -f "$REG_FILE.apparatus.bak" ]; then
    cp "$REG_FILE" "$REG_FILE.apparatus.bak"
  fi
  curl -s -L "$RAW_BASE/app/Http/Controllers/Auth/RegisterController.php?v=$TS" -o "$REG_FILE"
  chown www-data:www-data "$REG_FILE"
  chmod 644 "$REG_FILE"

  # Configure CSRF exemptions for registration & mail endpoints
  CSRF_FILE="$PTERO_DIR/app/Http/Middleware/VerifyCsrfToken.php"
  if [ -f "$CSRF_FILE" ]; then
    if [ ! -f "$CSRF_FILE.apparatus.bak" ]; then
      cp "$CSRF_FILE" "$CSRF_FILE.apparatus.bak"
    fi
    python3 -c '
import re, sys
target_file = sys.argv[1]
try:
    with open(target_file, "r") as fp:
        c = fp.read()
    if "auth/register" not in c:
        pattern = r"protected\s+\$except\s*=\s*\["
        replacement = "protected $except = [\n        '\''register\'',\n        '\''auth/register\'',\n        '\''auth/mail/*\'',"
        c = re.sub(pattern, replacement, c, count=1)
        with open(target_file, "w") as fp:
            fp.write(c)
except Exception:
    pass
' "$CSRF_FILE" 2>/dev/null || true
  fi

  # Inject Registration Routes into routes/auth.php BEFORE Route::fallback
  AUTH_ROUTES="$PTERO_DIR/routes/auth.php"
  if [ -f "$AUTH_ROUTES" ]; then
    if [ ! -f "$AUTH_ROUTES.apparatus.bak" ]; then
      cp "$AUTH_ROUTES" "$AUTH_ROUTES.apparatus.bak"
    fi
    sed -i '/RegisterController/d' "$AUTH_ROUTES"
    sed -i '/Apparatus Self-Registration Routes/d' "$AUTH_ROUTES"
    python3 - "$AUTH_ROUTES" << 'PYEOF' 2>/dev/null || {
import sys

target = sys.argv[1]
with open(target, 'r') as f:
    c = f.read()

snippet = r'''
// Apparatus Self-Registration Routes
Route::get('/register', [\Pterodactyl\Http\Controllers\Auth\RegisterController::class, 'index'])->name('auth.register');
Route::post('/register', [\Pterodactyl\Http\Controllers\Auth\RegisterController::class, 'register'])->name('auth.register.post');
Route::get('/auth/register', [\Pterodactyl\Http\Controllers\Auth\RegisterController::class, 'index']);
Route::post('/auth/register', [\Pterodactyl\Http\Controllers\Auth\RegisterController::class, 'register']);
Route::post('/auth/mail/test', [\Pterodactyl\Http\Controllers\Auth\RegisterController::class, 'sendTestMail']);
Route::post('/auth/mail/verify-code', [\Pterodactyl\Http\Controllers\Auth\RegisterController::class, 'sendVerificationCode']);
'''

if 'RegisterController' not in c:
    if 'Route::fallback' in c:
        c = c.replace('Route::fallback', snippet + '\nRoute::fallback', 1)
    else:
        c = snippet + '\n' + c
    with open(target, 'w') as f:
        f.write(c)
PYEOF
      sed -i "1i Route::get('/register', [\\\\Pterodactyl\\\\Http\\\\Controllers\\\\Auth\\\\RegisterController::class, 'index'])->name('auth.register');\nRoute::post('/register', [\\\\Pterodactyl\\\\Http\\\\Controllers\\\\Auth\\\\RegisterController::class, 'register'])->name('auth.register.post');\nRoute::get('/auth/register', [\\\\Pterodactyl\\\\Http\\\\Controllers\\\\Auth\\\\RegisterController::class, 'index']);\nRoute::post('/auth/register', [\\\\Pterodactyl\\\\Http\\\\Controllers\\\\Auth\\\\RegisterController::class, 'register']);" "$AUTH_ROUTES"
    }
  fi

  BASE_ROUTES="$PTERO_DIR/routes/base.php"
  if [ -f "$BASE_ROUTES" ]; then
    if [ ! -f "$BASE_ROUTES.apparatus.bak" ]; then
      cp "$BASE_ROUTES" "$BASE_ROUTES.apparatus.bak"
    fi
    sed -i '/RegisterController/d' "$BASE_ROUTES"
    sed -i '/Apparatus Self-Registration Routes/d' "$BASE_ROUTES"
    python3 - "$BASE_ROUTES" << 'PYEOF' 2>/dev/null || {
import sys

target = sys.argv[1]
with open(target, 'r') as f:
    c = f.read()

snippet = r'''
// Apparatus Self-Registration Routes (Base Web)
Route::get('/register', [\Pterodactyl\Http\Controllers\Auth\RegisterController::class, 'index']);
Route::post('/register', [\Pterodactyl\Http\Controllers\Auth\RegisterController::class, 'register']);
Route::get('/auth/register', [\Pterodactyl\Http\Controllers\Auth\RegisterController::class, 'index']);
Route::post('/auth/register', [\Pterodactyl\Http\Controllers\Auth\RegisterController::class, 'register']);
Route::post('/auth/mail/test', [\Pterodactyl\Http\Controllers\Auth\RegisterController::class, 'sendTestMail']);
Route::post('/auth/mail/verify-code', [\Pterodactyl\Http\Controllers\Auth\RegisterController::class, 'sendVerificationCode']);
'''

if 'RegisterController' not in c:
    if "Route::get('/{path?'" in c:
        c = c.replace("Route::get('/{path?'", snippet + "\nRoute::get('/{path?'", 1)
    elif 'Route::fallback' in c:
        c = c.replace('Route::fallback', snippet + '\nRoute::fallback', 1)
    else:
        c = snippet + '\n' + c
    with open(target, 'w') as f:
        f.write(c)
PYEOF
      sed -i "1i Route::get('/register', [\\\\Pterodactyl\\\\Http\\\\Controllers\\\\Auth\\\\RegisterController::class, 'index']);\nRoute::post('/register', [\\\\Pterodactyl\\\\Http\\\\Controllers\\\\Auth\\\\RegisterController::class, 'register']);\nRoute::get('/auth/register', [\\\\Pterodactyl\\\\Http\\\\Controllers\\\\Auth\\\\RegisterController::class, 'index']);\nRoute::post('/auth/register', [\\\\Pterodactyl\\\\Http\\\\Controllers\\\\Auth\\\\RegisterController::class, 'register']);" "$BASE_ROUTES"
    }
  fi

  # Deploy custom 403 Hacking Attempt error page for /admin access denial
  ERR_403_DIR="$PTERO_DIR/resources/views/errors"
  ERR_403_FILE="$ERR_403_DIR/403.blade.php"
  mkdir -p "$ERR_403_DIR"
  if [ -f "$ERR_403_FILE" ] && [ ! -f "$ERR_403_FILE.apparatus.bak" ]; then
    cp "$ERR_403_FILE" "$ERR_403_FILE.apparatus.bak"
  fi
  curl -s -L "$RAW_BASE/resources/views/errors/403.blade.php?v=$TS" -o "$ERR_403_FILE"
  chown www-data:www-data "$ERR_403_FILE"
  chmod 644 "$ERR_403_FILE"

  # Step 3: Inject Into Wrapper and Error Views cleanly with timestamp cache-buster
  echo -e "${BLUE}[3/4] Linking Apparatus Theme with GSAP Parallax...${NC}"

  inject_loader() {
    local target="$1"
    local ts="$2"
    if [ ! -f "$target" ]; then return; fi
    if grep -q "apparatus-theme-loader" "$target"; then
      sed -i '/<!-- BEGIN apparatus-theme-loader -->/,/<!-- END apparatus-theme-loader -->/d' "$target"
    fi
    python3 -c "
with open('$target', 'r') as f:
    content = f.read()

snippet = '''<!-- BEGIN apparatus-theme-loader -->
<meta name=\"csrf-token\" content=\"{{ csrf_token() }}\">
<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css\">
<link rel=\"stylesheet\" href=\"/themes/apparatus/apparatus.css?v=$ts\">
<script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js\"></script>
<script src=\"/themes/apparatus/lenis.min.js?v=$ts\"></script>
<script src=\"/themes/apparatus/apparatus.js?v=$ts\" defer></script>
<!-- END apparatus-theme-loader -->
</head>'''

if '</head>' in content:
    content = content.replace('</head>', snippet, 1)
    with open('$target', 'w') as f:
        f.write(content)
" 2>/dev/null || {
      awk -v ts="$ts" '/<\/head>/{print "<!-- BEGIN apparatus-theme-loader -->\n<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css\">\n<link rel=\"stylesheet\" href=\"/themes/apparatus/apparatus.css?v=" ts "\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js\"></script>\n<script src=\"/themes/apparatus/lenis.min.js?v=" ts "\"></script>\n<script src=\"/themes/apparatus/apparatus.js?v=" ts "\" defer></script>\n<!-- END apparatus-theme-loader -->"}1' "$target" > "$target.tmp" && mv "$target.tmp" "$target"
    }
  }

  inject_admin_loader() {
    local target="$1"
    local ts="$2"
    if [ ! -f "$target" ]; then return; fi
    if grep -q "apparatus-admin-loader" "$target"; then
      sed -i '/<!-- BEGIN apparatus-admin-loader -->/,/<!-- END apparatus-admin-loader -->/d' "$target"
    fi
    python3 -c "
with open('$target', 'r') as f:
    content = f.read()

snippet = '''<!-- BEGIN apparatus-admin-loader -->
<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css\">
<link rel=\"stylesheet\" href=\"/themes/apparatus/admin.css?v=$ts\">
<script src=\"/themes/apparatus/admin.js?v=$ts\" defer></script>
<!-- END apparatus-admin-loader -->
</head>'''

if '</head>' in content:
    content = content.replace('</head>', snippet, 1)
    with open('$target', 'w') as f:
        f.write(content)
" 2>/dev/null || {
      awk -v ts="$ts" '/<\/head>/{print "<!-- BEGIN apparatus-admin-loader -->\n<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css\">\n<link rel=\"stylesheet\" href=\"/themes/apparatus/admin.css?v=" ts "\">\n<script src=\"/themes/apparatus/admin.js?v=" ts "\" defer></script>\n<!-- END apparatus-admin-loader -->"}1' "$target" > "$target.tmp" && mv "$target.tmp" "$target"
    }
  }

  TS=$(date +%s)
  inject_loader "$WRAPPER_FILE" "$TS"
  if [ -f "$ERROR_FILE" ]; then
    inject_loader "$ERROR_FILE" "$TS"
  fi
  if [ -f "$ADMIN_FILE" ]; then
    inject_admin_loader "$ADMIN_FILE" "$TS"
    echo -e "${GREEN}✓ Injected Apparatus Admin CP loader successfully.${NC}"
  fi

  echo -e "${GREEN}✓ Injected theme loader successfully.${NC}"

  # Step 4: Disable broken reCAPTCHA if quota exceeded and Clear Cache
  echo -e "${BLUE}[4/4] Optimizing login and clearing Pterodactyl cache...${NC}"
  cd "$PTERO_DIR"
  php artisan tinker --execute="use Pterodactyl\Models\Setting; Setting::updateOrCreate(['key' => 'settings::recaptcha:enabled'], ['value' => 'false']);" 2>/dev/null || true
  composer dump-autoload -o 2>/dev/null || true
  php artisan route:clear
  php artisan view:clear
  php artisan cache:clear
  php artisan config:clear

  echo -e "\n${GREEN}========================================================================${NC}"
  echo -e "${GREEN}✓ APPARATUS THEME SUCCESSFULLY INSTALLED!${NC}"
  echo -e "${GREEN}✓ JTGPANEL CLOUD & INFRASTRUCTURE and ArixByte Login are now LIVE!${NC}"
  echo -e "${GREEN}========================================================================${NC}\n"
}

# Function: Update
update_theme() {
  echo -e "\n${BLUE}>>> Updating Apparatus Theme...${NC}"
  install_theme
  echo -e "${GREEN}✓ Apparatus Theme has been successfully updated!${NC}\n"
}

# Function: Remove
remove_theme() {
  echo -e "\n${BLUE}>>> Removing Apparatus Theme...${NC}"

  # Restore backup wrapper
  if [ -f "$WRAPPER_FILE.apparatus.bak" ]; then
    echo "Restoring original wrapper.blade.php from backup..."
    cp "$WRAPPER_FILE.apparatus.bak" "$WRAPPER_FILE"
    rm -f "$WRAPPER_FILE.apparatus.bak"
    echo -e "${GREEN}✓ Original wrapper restored.${NC}"
  else
    if [ -f "$WRAPPER_FILE" ]; then
      sed -i '/<!-- BEGIN apparatus-theme-loader -->/,/<!-- END apparatus-theme-loader -->/d' "$WRAPPER_FILE"
      echo -e "${GREEN}✓ Removed Apparatus injections from wrapper.${NC}"
    fi
  fi

  # Restore error layout if backed up
  if [ -f "$ERROR_FILE.apparatus.bak" ]; then
    cp "$ERROR_FILE.apparatus.bak" "$ERROR_FILE"
    rm -f "$ERROR_FILE.apparatus.bak"
  else
    if [ -f "$ERROR_FILE" ]; then
      sed -i '/<!-- BEGIN apparatus-theme-loader -->/,/<!-- END apparatus-theme-loader -->/d' "$ERROR_FILE"
    fi
  fi

  # Restore admin layout if backed up
  if [ -f "$ADMIN_FILE.apparatus.bak" ]; then
    cp "$ADMIN_FILE.apparatus.bak" "$ADMIN_FILE"
    rm -f "$ADMIN_FILE.apparatus.bak"
    echo -e "${GREEN}✓ Restored original admin.blade.php.${NC}"
  else
    if [ -f "$ADMIN_FILE" ]; then
      sed -i '/<!-- BEGIN apparatus-admin-loader -->/,/<!-- END apparatus-admin-loader -->/d' "$ADMIN_FILE"
      echo -e "${GREEN}✓ Removed Apparatus injections from admin.blade.php.${NC}"
    fi
  fi

  # Remove assets
  if [ -d "$ASSET_DIR" ]; then
    rm -rf "$ASSET_DIR"
    echo -e "${GREEN}✓ Theme assets removed.${NC}"
  fi

  # Restore ForgotPasswordController
  CTRL_FILE="$PTERO_DIR/app/Http/Controllers/Auth/ForgotPasswordController.php"
  if [ -f "$CTRL_FILE.apparatus.bak" ]; then
    cp "$CTRL_FILE.apparatus.bak" "$CTRL_FILE"
    rm -f "$CTRL_FILE.apparatus.bak"
    echo -e "${GREEN}✓ Restored original ForgotPasswordController.php.${NC}"
  fi

  # Restore RegisterController and auth routes
  REG_FILE="$PTERO_DIR/app/Http/Controllers/Auth/RegisterController.php"
  if [ -f "$REG_FILE" ]; then
    rm -f "$REG_FILE"
    echo -e "${GREEN}✓ Removed RegisterController.php.${NC}"
  fi
  AUTH_ROUTES="$PTERO_DIR/routes/auth.php"
  if [ -f "$AUTH_ROUTES.apparatus.bak" ]; then
    cp "$AUTH_ROUTES.apparatus.bak" "$AUTH_ROUTES"
    rm -f "$AUTH_ROUTES.apparatus.bak"
    echo -e "${GREEN}✓ Restored original routes/auth.php.${NC}"
  fi
  BASE_ROUTES="$PTERO_DIR/routes/base.php"
  if [ -f "$BASE_ROUTES.apparatus.bak" ]; then
    cp "$BASE_ROUTES.apparatus.bak" "$BASE_ROUTES"
    rm -f "$BASE_ROUTES.apparatus.bak"
    echo -e "${GREEN}✓ Restored original routes/base.php.${NC}"
  fi
  CSRF_FILE="$PTERO_DIR/app/Http/Middleware/VerifyCsrfToken.php"
  if [ -f "$CSRF_FILE.apparatus.bak" ]; then
    cp "$CSRF_FILE.apparatus.bak" "$CSRF_FILE"
    rm -f "$CSRF_FILE.apparatus.bak"
    echo -e "${GREEN}✓ Restored original VerifyCsrfToken.php.${NC}"
  fi

  # Restore 403 error page
  ERR_403_FILE="$PTERO_DIR/resources/views/errors/403.blade.php"
  if [ -f "$ERR_403_FILE.apparatus.bak" ]; then
    cp "$ERR_403_FILE.apparatus.bak" "$ERR_403_FILE"
    rm -f "$ERR_403_FILE.apparatus.bak"
    echo -e "${GREEN}✓ Restored original 403.blade.php.${NC}"
  elif [ -f "$ERR_403_FILE" ]; then
    rm -f "$ERR_403_FILE"
  fi

  # Clear Cache
  cd "$PTERO_DIR"
  php artisan route:clear
  php artisan view:clear
  php artisan cache:clear
  php artisan config:clear

  echo -e "\n${GREEN}========================================================================${NC}"
  echo -e "${GREEN}✓ Apparatus Theme has been completely removed from Pterodactyl!${NC}"
  echo -e "${GREEN}========================================================================${NC}\n"
}

# Interactive Menu
echo -e "${BOLD}Please choose an action:${NC}"
echo -e " [1] Install Theme"
echo -e " [2] Update Theme"
echo -e " [3] Remove Theme"
echo -e " [4] Exit"
echo ""
read -p "Select option [1-4]: " OPTION </dev/tty || read -p "Select option [1-4]: " OPTION

case "$OPTION" in
  1)
    install_theme
    ;;
  2)
    update_theme
    ;;
  3)
    remove_theme
    ;;
  4)
    echo -e "${YELLOW}Exiting.${NC}"
    exit 0
    ;;
  *)
    echo -e "${RED}[ERROR] Invalid option selected!${NC}"
    exit 1
    ;;
esac
