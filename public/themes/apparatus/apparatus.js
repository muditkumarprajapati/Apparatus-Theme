/**
 * Apparatus-Theme Parallax & Cinematic Animation Controller
 * Custom built for Pterodactyl v1.15.x / v1.11.x
 */
(function() {
  function initApparatusLogin() {
    // Only run on login / auth pages
    if (!window.location.pathname.startsWith('/auth')) return;

    // Check if container already injected
    if (document.getElementById('apparatus-desert-wrapper')) return;

    // Build the Desert Parallax Layers
    const wrapper = document.createElement('div');
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
    `;

    document.body.prepend(wrapper);

    // Style the actual Pterodactyl Login Container
    function adaptPteroLoginForm() {
      const loginFormContainer = document.querySelector('div[class*="LoginFormContainer"]') || 
                                 document.querySelector('form') ||
                                 document.querySelector('.pt-8');
      
      const card = loginFormContainer ? (loginFormContainer.closest('div[class*="rounded"]') || loginFormContainer) : null;

      if (card) {
        card.classList.add('apparatus-login-card');
        
        // Hide the white inner box background if nested
        const innerBox = card.querySelector('div[class*="bg-white"]') || card.querySelector('.bg-white');
        if (innerBox) {
          innerBox.style.background = 'transparent';
          innerBox.style.boxShadow = 'none';
        }

        // Update Title if present
        const titleEl = card.querySelector('h2') || card.querySelector('h1');
        if (titleEl && !titleEl.dataset.apparatusModified) {
          titleEl.innerHTML = '<span class="login-title">ArixByte Login</span>';
          titleEl.dataset.apparatusModified = "true";
        }

        // Replace Blueprint text with Apparatus Theme v1.0
        const footerLinks = document.querySelectorAll('p, span, div, a');
        footerLinks.forEach(el => {
          if (el.textContent && el.textContent.includes('Blueprint') && !el.dataset.apparatusFooterModified) {
            el.innerHTML = el.innerHTML.replace(/Blueprint\s*©?\s*[0-9\-–]*/gi, 'Apparatus Theme v1.0');
            el.dataset.apparatusFooterModified = "true";
          }
        });
      }
    }

    adaptPteroLoginForm();
    const observer = new MutationObserver(adaptPteroLoginForm);
    observer.observe(document.body, { childList: true, subtree: true });

    // GSAP Cinematic Entrance & Parallax Handling
    function startAnimations() {
      if (typeof gsap === 'undefined') {
        // Fallback if GSAP script is still loading
        setTimeout(startAnimations, 100);
        return;
      }

      let introDone = false;
      const tl = gsap.timeline({
        onComplete: () => { introDone = true; }
      });

      // Initial states
      gsap.set(".desert-wrapper", { backgroundColor: "#000" });
      gsap.set(".apparatus-login-card", { autoAlpha: 0, y: 50 });
      gsap.set(".parallax-container", { scale: 1.1, opacity: 0 });

      // Smooth Cinematic sequence without shaking
      tl.to(".parallax-container", { opacity: 1, duration: 2.2, ease: "power2.inOut" })
        .to(".desert-wrapper", { backgroundColor: "#F7ABAE", duration: 1.5 }, "-=1.5")
        .to(".parallax-container", { scale: 1.15, transformOrigin: "center 35%", duration: 2.2, ease: "power2.inOut" }, "-=1")
        .to(".parallax-container", { scale: 1, duration: 1.2, ease: "power3.out" })
        .to(".apparatus-login-card", { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" }, "-=0.4");

      // Floating wave animation for layers
      const layers = [1, 2, 3, 4, 5, 6, 7];
      layers.forEach((layerNum) => {
        gsap.to(`.layer-${layerNum}`, {
          y: -10 - layerNum * 5, 
          duration: 3 + layerNum * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      });

      gsap.to(".layer-text", {
         y: -20,
         duration: 4,
         ease: "sine.inOut",
         yoyo: true,
         repeat: -1
      });

      // Mouse Parallax
      window.addEventListener('mousemove', (e) => {
        if (!introDone) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        layers.forEach((layerNum) => {
          const depth = layerNum * 10;
          gsap.to(`.layer-${layerNum}`, {
            x: -x * depth,
            duration: 1,
            ease: "power2.out",
            overwrite: "auto"
          });
        });

        gsap.to(".layer-text", {
          x: -x * 30,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    }

    startAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApparatusLogin);
  } else {
    initApparatusLogin();
  }
})();
