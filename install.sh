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

  # Step 2: Download Assets
  echo -e "${BLUE}[2/4] Deploying theme assets (Desert Parallax SVGs, CSS, JS)...${NC}"
  mkdir -p "$ASSET_DIR/desert"
  TS=$(date +%s)

  for file in img-bg.svg img-1.svg img-2.svg img-3.svg img-4.svg img-5.svg img-6.svg img-7.svg favicon.png; do
    echo -e "  -> Downloading $file..."
    curl -s -L "$RAW_BASE/public/desert/$file?v=$TS" -o "$ASSET_DIR/desert/$file"
  done

  echo -e "  -> Downloading apparatus.css..."
  curl -s -L "$RAW_BASE/public/themes/apparatus/apparatus.css?v=$TS" -o "$ASSET_DIR/apparatus.css"

  echo -e "  -> Downloading apparatus.js..."
  curl -s -L "$RAW_BASE/public/themes/apparatus/apparatus.js?v=$TS" -o "$ASSET_DIR/apparatus.js"

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
<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css\">
<link rel=\"stylesheet\" href=\"/themes/apparatus/apparatus.css?v=$ts\">
<script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js\"></script>
<script src=\"/themes/apparatus/apparatus.js?v=$ts\" defer></script>
<!-- END apparatus-theme-loader -->
</head>'''

if '</head>' in content:
    content = content.replace('</head>', snippet, 1)
    with open('$target', 'w') as f:
        f.write(content)
" 2>/dev/null || {
      awk -v ts="$ts" '/<\/head>/{print "<!-- BEGIN apparatus-theme-loader -->\n<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css\">\n<link rel=\"stylesheet\" href=\"/themes/apparatus/apparatus.css?v=" ts "\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js\"></script>\n<script src=\"/themes/apparatus/apparatus.js?v=" ts "\" defer></script>\n<!-- END apparatus-theme-loader -->"}1' "$target" > "$target.tmp" && mv "$target.tmp" "$target"
    }
  }

  TS=$(date +%s)
  inject_loader "$WRAPPER_FILE" "$TS"
  if [ -f "$ERROR_FILE" ]; then
    inject_loader "$ERROR_FILE" "$TS"
  fi

  echo -e "${GREEN}✓ Injected theme loader successfully.${NC}"

  # Step 4: Disable broken reCAPTCHA if quota exceeded and Clear Cache
  echo -e "${BLUE}[4/4] Optimizing login and clearing Pterodactyl cache...${NC}"
  cd "$PTERO_DIR"
  php artisan tinker --execute="use Pterodactyl\Models\Setting; Setting::updateOrCreate(['key' => 'settings::recaptcha:enabled'], ['value' => 'false']);" 2>/dev/null || true
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
