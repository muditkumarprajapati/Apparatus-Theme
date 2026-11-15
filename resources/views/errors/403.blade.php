<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hacking Attempt - Access Denied</title>
    <link rel="icon" type="image/png" href="/themes/apparatus/favicon.png">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css">
    <link rel="stylesheet" href="/themes/apparatus/apparatus.css?v={{ time() }}">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="/themes/apparatus/apparatus.js?v={{ time() }}" defer></script>
</head>
<body class="apparatus-auth apparatus-hacking-mode">
    <div class="desert-wrapper" id="apparatus-desert-wrapper" style="background-color: #F7ABAE;">
        <div class="parallax-container" id="apparatus-parallax">
            <img src="/themes/apparatus/desert/img-bg.svg" alt="" class="parallax-layer layer-bg" />
            <img src="/themes/apparatus/desert/img-1.svg" alt="" class="parallax-layer layer-1" />
            <img src="/themes/apparatus/desert/img-2.svg" alt="" class="parallax-layer layer-2" />
            <img src="/themes/apparatus/desert/img-3.svg" alt="" class="parallax-layer layer-3" />
            
            <div class="parallax-layer layer-text">
                <h1 class="background-title" id="apparatus-bg-title">HACKING ATTEMPT</h1>
                <p class="background-subtitle" id="apparatus-bg-subtitle">You Cannot Access is Page</p>
            </div>

            <img src="/themes/apparatus/desert/img-4.svg" alt="" class="parallax-layer layer-4" />
            <img src="/themes/apparatus/desert/img-5.svg" alt="" class="parallax-layer layer-5" />
            <img src="/themes/apparatus/desert/img-6.svg" alt="" class="parallax-layer layer-6" />
            <img src="/themes/apparatus/desert/img-7.svg" alt="" class="parallax-layer layer-7" />
        </div>

        <div class="login-card apparatus-card-hacking" id="apparatus-card-slot" style="display: block; opacity: 1; visibility: visible; text-align: center;">
            <div class="hacking-warning-icon">
                <i class="ri-alert-fill"></i>
            </div>
            <h2 class="login-title" style="color: #ef4444; font-size: 1.55rem; margin-bottom: 0.35rem; font-weight: 800; letter-spacing: 0.02em;">ACCESS DENIED</h2>
            <p class="login-subtitle" style="margin-bottom: 1.5rem; color: rgba(255, 255, 255, 0.78); font-size: 0.92rem; line-height: 1.5;">
                You do not have permission to access this page.
            </p>
            @auth
            <a href="/" class="login-button apparatus-hacking-back-btn" style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; box-sizing: border-box;">
                <i class="ri-arrow-left-line"></i> Return to Dashboard
            </a>
            @else
            <a href="/auth/login" class="login-button apparatus-hacking-back-btn" style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; box-sizing: border-box;">
                <i class="ri-login-box-line"></i> Go to Login Page
            </a>
            @endauth
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            if (typeof gsap === 'undefined') return;

            gsap.set(".desert-wrapper", { backgroundColor: "#F7ABAE" });
            gsap.set(".parallax-container", { scale: 1, opacity: 1, visibility: "visible" });
            gsap.fromTo(".login-card", 
                { autoAlpha: 0, y: 35, scale: 0.96 }, 
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.05 }
            );

            var layers = [1, 2, 3, 4, 5, 6, 7];
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

            window.addEventListener('mousemove', function (e) {
                var x = (e.clientX / window.innerWidth - 0.5) * 2;
                layers.forEach(function (layerNum) {
                    var depth = layerNum * 10;
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
        });
    </script>
</body>
</html>
