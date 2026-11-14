/**
 * Apparatus-Theme Parallax Engine
 * Custom built for Pterodactyl Panel (1.11.x - 1.15.x)
 */
(function() {
  function initApparatusLogin() {
    if (!window.location.pathname.startsWith('/auth')) return;
    if (document.getElementById('apparatus-desert-wrapper')) return;

    // Inject Desert Sunset Layers Behind Login
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

    // Adapt Header and Footer cleanly
    function adaptContent() {
      // Find the login container
      const container = document.querySelector('div[class*="LoginFormContainer"]');
      if (container && !document.getElementById('apparatus-header-title')) {
        const titleEl = document.createElement('div');
        titleEl.id = 'apparatus-header-title';
        titleEl.className = 'apparatus-card-header';
        titleEl.innerText = 'ArixByte Login';
        container.prepend(titleEl);
      }

      // Replace Blueprint Footer with Apparatus Theme v1.0 & link
      const links = document.querySelectorAll('a');
      links.forEach(a => {
        if (a.textContent && (a.textContent.includes('Blueprint') || a.textContent.includes('Apparatus'))) {
          a.href = "https://arixbyte.com/";
          a.textContent = "Apparatus Theme v1.0";
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
      });

      const footerNodes = document.querySelectorAll('p, span, div');
      footerNodes.forEach(el => {
        if (el.children.length <= 3 && el.textContent && el.textContent.includes('Blueprint')) {
          el.innerHTML = el.innerHTML
            .replace(/Blueprint\s*©?\s*[0-9\-–\s]*/gi, '<a href="https://arixbyte.com/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Apparatus Theme v1.0</a> © 2026')
            .replace(/©\s*2023\s*[-–]\s*2026/g, '© 2026');
        }
      });
    }

    adaptContent();
    const observer = new MutationObserver(adaptContent);
    observer.observe(document.body, { childList: true, subtree: true });

    // GSAP Wave Motion & Mouse Parallax
    function startAnimations() {
      if (typeof gsap === 'undefined') {
        setTimeout(startAnimations, 100);
        return;
      }

      // Wave floating animation on desert layers
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
