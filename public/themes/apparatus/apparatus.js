/**
 * APPARATUS THEME - JTG 1:1 REPLICA CONTROLLER
 * Full Desert Sunset Parallax, Glassmorphism Login Card & Forgot Password System
 */
(function () {
  'use strict';

  // Embedded Lenis 1.3.26 Smooth Scroll Engine (Matching https://moradosolution.in architecture)
  if (typeof globalThis.Lenis === 'undefined') {
    (function(){var e=`1.3.26`;function t(e,t,n){return Math.max(e,Math.min(t,n))}function n(e,t,n){return(1-n)*e+n*t}function r(e,t,r,i){return n(e,t,1-Math.exp(-r*i))}function i(e,t){return(e%t+t)%t}var a=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let n=!1;if(this.duration&&this.easing){this.currentTime+=e;let r=t(0,this.currentTime/this.duration,1);n=r>=1;let i=n?1:this.easing(r);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=r(this.value,this.to,this.lerp*60,e),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,n=!0)):(this.value=this.to,n=!0);n&&this.stop(),this.onUpdate?.(this.value,n)}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n,duration:r,easing:i,onStart:a,onUpdate:o}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=r,this.easing=i,this.currentTime=0,this.isRunning=!0,a?.(),this.onUpdate=o}};function o(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{n=void 0,e.apply(this,r)},t)}}var s=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(e,t,{autoResize:n=!0,debounce:r=250}={}){this.wrapper=e,this.content=t,n&&(this.debouncedResize=o(this.resize,r),this.wrapper instanceof Window?window.addEventListener(`resize`,this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener(`resize`,this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},c=class{events={};emit(e,...t){let n=this.events[e]||[];for(let e=0,r=n.length;e<r;e++)n[e]?.(...t)}on(e,t){return this.events[e]?this.events[e].push(t):this.events[e]=[t],()=>{this.events[e]=this.events[e]?.filter(e=>t!==e)}}off(e,t){this.events[e]=this.events[e]?.filter(e=>t!==e)}destroy(){this.events={}}};let l={passive:!1};function u(e,t){return e===1?16.666666666666668:e===2?t:1}var d=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new c;constructor(e,t={wheelMultiplier:1,touchMultiplier:1}){this.element=e,this.options=t,window.addEventListener(`resize`,this.onWindowResize),this.onWindowResize(),this.element.addEventListener(`wheel`,this.onWheel,l),this.element.addEventListener(`touchstart`,this.onTouchStart,l),this.element.addEventListener(`touchmove`,this.onTouchMove,l),this.element.addEventListener(`touchend`,this.onTouchEnd,l)}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener(`resize`,this.onWindowResize),this.element.removeEventListener(`wheel`,this.onWheel,l),this.element.removeEventListener(`touchstart`,this.onTouchStart,l),this.element.removeEventListener(`touchmove`,this.onTouchMove,l),this.element.removeEventListener(`touchend`,this.onTouchEnd,l)}onTouchStart=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit(`scroll`,{deltaX:0,deltaY:0,event:e})};onTouchMove=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(n-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:r,y:i},this.emitter.emit(`scroll`,{deltaX:r,deltaY:i,event:e})};onTouchEnd=e=>{this.emitter.emit(`scroll`,{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})};onWheel=e=>{let{deltaX:t,deltaY:n,deltaMode:r}=e,i=u(r,this.window.width),a=u(r,this.window.height);t*=i,n*=a,t*=this.options.wheelMultiplier,n*=this.options.wheelMultiplier,this.emitter.emit(`scroll`,{deltaX:t,deltaY:n,event:e})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};let f=e=>Math.min(1,1.001-2**(-10*e));var p=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;reducedMotionMediaQuery=window.matchMedia(`(prefers-reduced-motion: reduce)`);isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new a;emitter=new c;dimensions;virtualScroll;constructor({wrapper:t=window,content:n=document.documentElement,eventsTarget:r=t,smoothWheel:i=!0,syncTouch:a=!1,syncTouchLerp:o=.075,touchInertiaExponent:c=1.7,duration:l,easing:u,lerp:p=.1,infinite:m=!1,orientation:h=`vertical`,gestureOrientation:g=h===`horizontal`?`both`:`vertical`,touchMultiplier:_=1,wheelMultiplier:v=1,autoResize:y=!0,prevent:b,virtualScroll:x,overscroll:S=!0,autoRaf:C=!1,anchors:w=!1,autoToggle:T=!1,allowNestedScroll:E=!1,__experimental__naiveDimensions:D=!1,naiveDimensions:O=D,stopInertiaOnNavigate:k=!1,respectReducedMotion:A=!0}={}){window.lenisVersion=e,window.lenis||(window.lenis={}),window.lenis.version=e,h===`horizontal`&&(window.lenis.horizontal=!0),a===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!t||t===document.documentElement)&&(t=window),typeof l==`number`&&typeof u!=`function`?u=f:typeof u==`function`&&typeof l!=`number`&&(l=1),this.options={wrapper:t,content:n,eventsTarget:r,smoothWheel:i,syncTouch:a,syncTouchLerp:o,touchInertiaExponent:c,duration:l,easing:u,lerp:p,infinite:m,gestureOrientation:g,orientation:h,touchMultiplier:_,wheelMultiplier:v,autoResize:y,prevent:b,virtualScroll:x,overscroll:S,autoRaf:C,anchors:w,autoToggle:T,allowNestedScroll:E,naiveDimensions:O,stopInertiaOnNavigate:k,respectReducedMotion:A},this.dimensions=new s(t,n,{autoResize:y}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.addEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener(`click`,this.onClick),this.options.wrapper.addEventListener(`pointerdown`,this.onPointerDown),this.virtualScroll=new d(r,{touchMultiplier:_,wheelMultiplier:v}),this.virtualScroll.on(`scroll`,this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener(`transitionend`,this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.removeEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener(`pointerdown`,this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener(`click`,this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}onScrollEnd=e=>{e instanceof CustomEvent||(this.isScrolling===`smooth`||this.isScrolling===!1)&&e.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent(`scrollend`,{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){let e=this.isHorizontal?`overflow-x`:`overflow-y`;return getComputedStyle(this.rootElement)[e]}checkOverflow(){[`hidden`,`clip`].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=e=>{e.propertyName?.includes(`overflow`)&&e.target===this.rootElement&&this.checkOverflow()};setScroll(e){this.isHorizontal?this.options.wrapper.scrollTo({left:e,behavior:`instant`}):this.options.wrapper.scrollTo({top:e,behavior:`instant`})}onClick=e=>{let t=e.composedPath().filter(e=>e instanceof HTMLAnchorElement&&e.href).map(e=>new URL(e.href)),n=new URL(window.location.href);if(this.options.anchors){let e=t.find(e=>n.host===e.host&&n.pathname===e.pathname&&e.hash);if(e){let t=typeof this.options.anchors==`object`&&this.options.anchors?this.options.anchors:void 0,n=decodeURIComponent(e.hash);this.scrollTo(n,t);return}}if(this.options.stopInertiaOnNavigate&&t.some(e=>n.host===e.host&&n.pathname!==e.pathname)){this.reset();return}};onPointerDown=e=>{e.button===1&&this.reset()};isTouchOnSelectionHandle(e){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let n=e.targetTouches[0]??e.changedTouches[0];if(!n)return!1;let r=t.getRangeAt(0).getClientRects();if(r.length===0)return!1;let i=r[0],a=r[r.length-1],o=Math.hypot(n.clientX-i.left,n.clientY-i.top)<=40,s=Math.hypot(n.clientX-a.right,n.clientY-a.bottom)<=40;return o||s}onVirtualScroll=e=>{if(typeof this.options.virtualScroll==`function`&&this.options.virtualScroll(e)===!1)return;let{deltaX:t,deltaY:n,event:r}=e;if(this.emitter.emit(`virtual-scroll`,{deltaX:t,deltaY:n,event:r}),r.ctrlKey||r.lenisStopPropagation)return;let i=r.type.includes(`touch`),a=r.type.includes(`wheel`);if(i&&this.isIos&&(r.type===`touchstart`&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(r)),this._isDraggingSelection)){r.type===`touchend`&&(this._isDraggingSelection=!1);return}this.isTouching=r.type===`touchstart`||r.type===`touchmove`;let o=t===0&&n===0;if(this.options.syncTouch&&i&&r.type===`touchstart`&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let s=this.options.gestureOrientation===`vertical`&&n===0||this.options.gestureOrientation===`horizontal`&&t===0;if(o||s)return;let c=r.composedPath();c=c.slice(0,c.indexOf(this.rootElement));let l=this.options.prevent,u=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`;if(c.find(e=>e instanceof HTMLElement&&(typeof l==`function`&&l?.(e)||e.hasAttribute?.(`data-lenis-prevent`)||u===`vertical`&&e.hasAttribute?.(`data-lenis-prevent-vertical`)||u===`horizontal`&&e.hasAttribute?.(`data-lenis-prevent-horizontal`)||i&&e.hasAttribute?.(`data-lenis-prevent-touch`)||a&&e.hasAttribute?.(`data-lenis-prevent-wheel`)||this.options.allowNestedScroll&&this.hasNestedScroll(e,{deltaX:t,deltaY:n}))))return;if(this.isStopped||this.isLocked){r.cancelable&&r.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&a)){this.isScrolling=`native`,this.animate.stop(),r.lenisStopPropagation=!0;return}let d=n;this.options.gestureOrientation===`both`?d=Math.abs(n)>Math.abs(t)?n:t:this.options.gestureOrientation===`horizontal`&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&n>0||this.animatedScroll===this.limit&&n<0))&&(r.lenisStopPropagation=!0),r.cancelable&&r.preventDefault();let f=i&&this.options.syncTouch,p=i&&r.type===`touchend`;p&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...f?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit(`scroll`,this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling===`native`){let e=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-e,this.direction=Math.sign(this.animatedScroll-e),this.isStopped||(this.isScrolling=`native`),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty(`overflow`);return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty(`overflow`,`clip`);return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=e=>{let t=e-(this.time||e);this.time=e,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(e,{offset:n=0,immediate:r=!1,lock:i=!1,programmatic:a=!0,lerp:o=a?this.options.lerp:void 0,duration:s=a?this.options.duration:void 0,easing:c=a?this.options.easing:void 0,onStart:l,onComplete:u,force:d=!1,userData:p}={}){if(this.prefersReducedMotion&&(a?r=!0:(o=1,s=void 0,c=void 0)),(this.isStopped||this.isLocked)&&!d)return;let m=e,h=n;if(typeof m==`string`&&[`top`,`left`,`start`,`#`].includes(m))m=0;else if(typeof m==`string`&&[`bottom`,`right`,`end`].includes(m))m=this.limit;else{let e=null;if(typeof m==`string`?(e=m.startsWith(`#`)?document.getElementById(m.slice(1)):document.querySelector(m),e||(m===`#top`?m=0:console.warn(`Lenis: Target not found`,m))):m instanceof HTMLElement&&m?.nodeType&&(e=m),e){if(this.options.wrapper!==window){let e=this.rootElement.getBoundingClientRect();h-=this.isHorizontal?e.left:e.top}let t=e.getBoundingClientRect(),n=getComputedStyle(e),r=this.isHorizontal?Number.parseFloat(n.scrollMarginLeft):Number.parseFloat(n.scrollMarginTop),i=getComputedStyle(this.rootElement),a=this.isHorizontal?Number.parseFloat(i.scrollPaddingLeft):Number.parseFloat(i.scrollPaddingTop);m=(this.isHorizontal?t.left:t.top)+this.animatedScroll-(Number.isNaN(r)?0:r)-(Number.isNaN(a)?0:a)}}if(typeof m==`number`){if(m+=h,this.options.infinite){if(a){this.targetScroll=this.animatedScroll=this.scroll;let e=m-this.animatedScroll;e>this.limit/2?m-=this.limit:e<-this.limit/2&&(m+=this.limit)}}else m=t(0,m,this.limit);if(m===this.targetScroll){l?.(this),u?.(this);return}if(this.userData=p??{},r){this.animatedScroll=this.targetScroll=m,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}a||(this.targetScroll=m),typeof s==`number`&&typeof c!=`function`?c=f:typeof c==`function`&&typeof s!=`number`&&(s=1),this.animate.fromTo(this.animatedScroll,m,{duration:s,easing:c,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling=`smooth`,l?.(this)},onUpdate:(e,t)=>{this.isScrolling=`smooth`,this.lastVelocity=this.velocity,this.velocity=e-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=e,this.setScroll(this.scroll),a&&(this.targetScroll=e),t||this.emit(),t&&(this.reset(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(e,{deltaX:t,deltaY:n}){let r=Date.now();e._lenis||={};let i=e._lenis,a,o,s,c,l,u,d,f,p,m;if(r-(i.time??0)>2e3){i.time=Date.now();let t=window.getComputedStyle(e);if(i.computedStyle=t,a=[`auto`,`overlay`,`scroll`].includes(t.overflowX),o=[`auto`,`overlay`,`scroll`].includes(t.overflowY),l=[`auto`].includes(t.overscrollBehaviorX),u=[`auto`].includes(t.overscrollBehaviorY),i.hasOverflowX=a,i.hasOverflowY=o,!(a||o))return!1;d=e.scrollWidth,f=e.scrollHeight,p=e.clientWidth,m=e.clientHeight,s=d>p,c=f>m,i.isScrollableX=s,i.isScrollableY=c,i.scrollWidth=d,i.scrollHeight=f,i.clientWidth=p,i.clientHeight=m,i.hasOverscrollBehaviorX=l,i.hasOverscrollBehaviorY=u}else s=i.isScrollableX,c=i.isScrollableY,a=i.hasOverflowX,o=i.hasOverflowY,d=i.scrollWidth,f=i.scrollHeight,p=i.clientWidth,m=i.clientHeight,l=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(a&&s||o&&c))return!1;let h=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`,g,_,v,y,b,x;if(h===`horizontal`)g=Math.round(e.scrollLeft),_=d-p,v=t,y=a,b=s,x=l;else if(h===`vertical`)g=Math.round(e.scrollTop),_=f-m,v=n,y=o,b=c,x=u;else return!1;return!x&&(g>=_||g<=0)?!0:(v>0?g<_:g>0)&&y&&b}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?`x`:`y`]}get isHorizontal(){return this.options.orientation===`horizontal`}get actualScroll(){let e=this.options.wrapper;return this.isHorizontal?e.scrollX??e.scrollLeft:e.scrollY??e.scrollTop}get scroll(){return this.options.infinite?i(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(e){this._isScrolling!==e&&(this._isScrolling=e,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(e){this._isStopped!==e&&(this._isStopped=e,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(e){this._isLocked!==e&&(this._isLocked=e,this.updateClassName())}get isSmooth(){return this.isScrolling===`smooth`}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let e=`lenis`;return this.options.autoToggle&&(e+=` lenis-autoToggle`),this.isStopped&&(e+=` lenis-stopped`),this.isLocked&&(e+=` lenis-locked`),this.isScrolling&&(e+=` lenis-scrolling`),this.isScrolling===`smooth`&&(e+=` lenis-smooth`),e}updateClassName(){this.cleanUpClassName(),this.className.split(` `).forEach(e=>{this.rootElement.classList.add(e)})}cleanUpClassName(){for(let e of Array.from(this.rootElement.classList))(e===`lenis`||e.startsWith(`lenis-`))&&this.rootElement.classList.remove(e)}};globalThis.Lenis=p,globalThis.Lenis.prototype=p.prototype})();
//# sourceMappingURL=lenis.min.js.map
  }

  // Inject instant global CSS to permanently hide Pterodactyl progress bar / cyan glowing line
  (function injectInstantProgressBarKiller() {
    if (document.getElementById('apparatus-kill-progressbar')) return;
    const s = document.createElement('style');
    s.id = 'apparatus-kill-progressbar';
    s.textContent = `
      div[class*="ProgressBar"],
      div[class*="ProgressBar__BarFill"],
      div[class*="ProgressBar___StyledDiv"],
      .sc-14ayc3f-0,
      .sc-14ayc3f-1,
      [class*="sc-14ayc3f"],
      div[style*="hsl(178"],
      div[style*="211, 238"],
      div[style*="height: 2px"],
      div[style*="height:2px"] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        min-height: 0 !important;
        max-height: 0 !important;
        width: 0 !important;
        opacity: 0 !important;
        box-shadow: none !important;
        pointer-events: none !important;
        position: absolute !important;
        top: -99999px !important;
        left: -99999px !important;
      }
    `;
    (document.head || document.documentElement).appendChild(s);
  })();

  function isAuthPage() {
    return window.location.pathname.startsWith('/auth') ||
      window.location.pathname === '/login';
  }

  function isUnauthorizedAdminAttempt() {
    const rawPath = window.location.pathname || '';
    if (!rawPath.startsWith('/admin')) return false;

    // Check if this is the legitimate Pterodactyl Admin Panel
    if (document.querySelector('.main-sidebar') || document.querySelector('.content-wrapper') || document.body.classList.contains('skin-blue')) {
      return false;
    }

    const user = window.PterodactylUser;
    if (user && user.root_admin) {
      return false;
    }

    return true;
  }

  // Lightweight Web Audio API tactile feedback
  function playClickSound(force) {
    if (!force && localStorage.getItem('apparatus_sound') !== 'true') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) { }
  }

  // Toast / Popup Notification System
  function showToast(type, title, message) {
    if (localStorage.getItem('apparatus_toast_enabled') === 'false') return;
    const existing = document.getElementById('apparatus-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'apparatus-toast';
    toast.className = 'apparatus-toast apparatus-toast-' + type;

    let iconSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    if (type === 'success') {
      iconSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    }

    toast.innerHTML =
      '<div class="apparatus-toast-icon">' + iconSvg + '</div>' +
      '<div class="apparatus-toast-content">' +
      '<div class="apparatus-toast-title">' + title + '</div>' +
      '<div class="apparatus-toast-msg">' + message + '</div>' +
      '</div>';

    document.body.appendChild(toast);

    setTimeout(function () {
      toast.classList.add('apparatus-toast-show');
    }, 20);

    const dismissMs = type === 'success' ? 4000 : 5000;
    setTimeout(function () {
      toast.classList.remove('apparatus-toast-show');
      setTimeout(function () { toast.remove(); }, 400);
    }, dismissMs);
  }

  // React Synthetic Input Helper
  function setReactValue(input, val) {
    if (!input) return;
    const lastVal = input.value;
    input.value = val;
    const tracker = input._valueTracker;
    if (tracker) tracker.setValue(lastVal);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Fetch CSRF Token
  function getCsrfToken() {
    const metaCsrf = document.querySelector('meta[name="csrf-token"]');
    return metaCsrf ? metaCsrf.getAttribute('content') : '';
  }


  // Accurate Active Sidebar Route Highlighting
  function updateActiveSidebarLinks() {
    const rawPath = window.location.pathname || '/';
    // Normalize path by stripping trailing slash (unless root '/')
    const currentPath = (rawPath.length > 1 && rawPath.endsWith('/')) ? rawPath.slice(0, -1) : rawPath;

    const isResourceTab = window.location.hash === '#resource' || currentPath === '/billing/resource' || currentPath === '/resource';
    const isSettingsTab = !isResourceTab && (window.location.hash === '#panel-settings' || window.location.hash === '#settings' || currentPath === '/settings');
    const isVpsTab = !isResourceTab && !isSettingsTab && (currentPath === '/vps' || currentPath.startsWith('/vps/') || window.location.hash === '#vps');
    const isServerTab = !isResourceTab && !isSettingsTab && !isVpsTab && (currentPath === '/servers' || currentPath.startsWith('/servers/') || window.location.hash === '#servers');
    const isDashboardTab = !isResourceTab && !isSettingsTab && !isVpsTab && !isServerTab && (currentPath === '/' || currentPath === '/dashboard');

    const links = document.querySelectorAll('.apparatus-nav-link[data-path], .apparatus-nav-link[data-tab]');
    links.forEach(function (link) {
      const tab = link.getAttribute('data-tab');
      const pAttr = link.getAttribute('data-path');
      const p = pAttr ? ((pAttr.length > 1 && pAttr.endsWith('/')) ? pAttr.slice(0, -1) : pAttr) : '';

      let isActive = false;

      if (tab === 'resource' || p === '/billing/resource' || p === '/resource') {
        isActive = isResourceTab;
      } else if (tab === 'panel-settings' || tab === 'settings' || p === '/settings') {
        isActive = isSettingsTab;
      } else if (tab === 'dashboard' || p === '/') {
        isActive = isDashboardTab;
      } else if (tab === 'servers' || p === '/servers') {
        isActive = isServerTab;
      } else if (tab === 'vps' || p === '/vps') {
        isActive = isVpsTab;
      } else if (p === '/account') {
        // Account Credentials should ONLY be active on exact /account, NOT on /account/api, /account/ssh, etc.
        isActive = currentPath === '/account';
      } else if (p) {
        // Sub-routes such as /account/api, /account/ssh, /account/activity, /admin
        isActive = currentPath === p || currentPath.startsWith(p + '/');
      }

      if (isActive) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function applyViewMode() {
    if (isAuthPage() || isUnauthorizedAdminAttempt()) return;

    const rawPath = window.location.pathname || '/';
    const currentPath = (rawPath.length > 1 && rawPath.endsWith('/')) ? rawPath.slice(0, -1) : rawPath;

    const isResourceTab = window.location.hash === '#resource' || currentPath === '/billing/resource' || currentPath === '/resource';
    const isSettingsTab = !isResourceTab && (window.location.hash === '#panel-settings' || window.location.hash === '#settings' || currentPath === '/settings');
    const isVpsTab = !isResourceTab && !isSettingsTab && (currentPath === '/vps' || currentPath.startsWith('/vps/') || window.location.hash === '#vps');
    const isServerTab = !isResourceTab && !isSettingsTab && !isVpsTab && (currentPath === '/servers' || currentPath.startsWith('/servers/') || window.location.hash === '#servers');
    const isDashboardTab = !isResourceTab && !isSettingsTab && !isVpsTab && !isServerTab && (currentPath === '/' || currentPath === '/dashboard');
    const isHomeRoute = isDashboardTab || isServerTab || isVpsTab;

    const hero = document.getElementById('apparatus-dashboard-view');
    const resView = document.getElementById('apparatus-resource-view');
    const setView = document.getElementById('apparatus-settings-view');

    if (isResourceTab) {
      if (hero) hero.style.display = 'none';
      if (setView) setView.style.display = 'none';
      if (resView) {
        const wasHidden = resView.style.display === 'none';
        resView.style.display = 'block';
        if (wasHidden && typeof gsap !== 'undefined') {
          gsap.fromTo(resView, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' });
        }
        if (typeof renderResourcePage === 'function') renderResourcePage();
      }
      document.body.classList.add('apparatus-page-resource');
      document.body.classList.remove('apparatus-page-dashboard', 'apparatus-page-servers', 'apparatus-page-vps', 'apparatus-page-settings');

      // Hide all account containers and native server messages
      document.querySelectorAll('div[class*="AccountOverviewContainer"], div[class*="AccountApiContainer"], div[class*="AccountSSHContainer"], div[class*="ActivityLogContainer"], .sc-12to0iy-1, .sc-1c4s3nm-0, .sc-yksipt-0, p[class*="DashboardContainer"], .sc-1topkxf-3').forEach(function (el) {
        el.style.setProperty('display', 'none', 'important');
      });
    } else if (isSettingsTab) {
      if (hero) hero.style.display = 'none';
      if (resView) resView.style.display = 'none';
      if (setView) {
        const wasHidden = setView.style.display === 'none';
        setView.style.display = 'block';
        if (wasHidden && typeof gsap !== 'undefined') {
          gsap.fromTo(setView, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' });
        }
        if (typeof renderSettingsPage === 'function') renderSettingsPage();
      }
      document.body.classList.add('apparatus-page-settings');
      document.body.classList.remove('apparatus-page-dashboard', 'apparatus-page-servers', 'apparatus-page-vps', 'apparatus-page-resource');

      // Hide all account containers and native server messages
      document.querySelectorAll('div[class*="AccountOverviewContainer"], div[class*="AccountApiContainer"], div[class*="AccountSSHContainer"], div[class*="ActivityLogContainer"], .sc-12to0iy-1, .sc-1c4s3nm-0, .sc-yksipt-0, p[class*="DashboardContainer"], .sc-1topkxf-3').forEach(function (el) {
        el.style.setProperty('display', 'none', 'important');
      });
    } else if (isHomeRoute) {
      if (resView) resView.style.display = 'none';
      if (setView) setView.style.display = 'none';
      if (hero) hero.style.display = 'block';
      document.body.classList.remove('apparatus-page-resource', 'apparatus-page-settings');

      const sPane = document.getElementById('apparatus-pane-servers');
      const vPane = document.getElementById('apparatus-pane-vps');
      const sBtn = document.getElementById('apparatus-tab-btn-servers');
      const vBtn = document.getElementById('apparatus-tab-btn-vps');
      const deployBtn = document.getElementById('apparatus-hub-deploy-btn');

      if (isServerTab) {
        document.body.classList.add('apparatus-page-servers');
        document.body.classList.remove('apparatus-page-dashboard', 'apparatus-page-vps');
        if (sPane) sPane.style.display = 'block';
        if (vPane) vPane.style.display = 'none';
        if (sBtn) sBtn.classList.add('active');
        if (vBtn) vBtn.classList.remove('active');
        if (deployBtn) {
          deployBtn.innerHTML = '<i class="ri-add-line"></i> Deploy Server';
        }
      } else if (isVpsTab) {
        document.body.classList.add('apparatus-page-vps');
        document.body.classList.remove('apparatus-page-dashboard', 'apparatus-page-servers');
        if (sPane) sPane.style.display = 'none';
        if (vPane) vPane.style.display = 'block';
        if (sBtn) sBtn.classList.remove('active');
        if (vBtn) vBtn.classList.add('active');
        if (deployBtn) {
          deployBtn.innerHTML = '<i class="ri-add-line"></i> Deploy Cloud VPS';
        }
      } else {
        document.body.classList.add('apparatus-page-dashboard');
        document.body.classList.remove('apparatus-page-servers', 'apparatus-page-vps');
      }

      // Hide all account containers and native server messages if user transitioned to home
      document.querySelectorAll('div[class*="AccountOverviewContainer"], div[class*="AccountApiContainer"], div[class*="AccountSSHContainer"], div[class*="ActivityLogContainer"], .sc-12to0iy-1, .sc-1c4s3nm-0, .sc-yksipt-0, p[class*="DashboardContainer"], .sc-1topkxf-3').forEach(function (el) {
        el.style.setProperty('display', 'none', 'important');
      });
    } else {
      if (resView) resView.style.display = 'none';
      if (setView) setView.style.display = 'none';
      if (hero) hero.style.display = 'none';
      document.body.classList.remove('apparatus-page-resource', 'apparatus-page-settings', 'apparatus-page-dashboard', 'apparatus-page-servers', 'apparatus-page-vps', 'apparatus-view-dashboard', 'apparatus-view-servers', 'apparatus-view-vps');

      // Restore display for account containers when on account routes
      document.querySelectorAll('div[class*="AccountOverviewContainer"], div[class*="AccountApiContainer"], div[class*="AccountSSHContainer"], div[class*="ActivityLogContainer"], .sc-12to0iy-1, .sc-1c4s3nm-0, .sc-yksipt-0, div.bg-gray-700, [class*="PageContentBlock"]').forEach(function (el) {
        el.style.removeProperty('display');
        el.style.removeProperty('visibility');
        el.style.removeProperty('height');
      });
    }

    updateActiveSidebarLinks();
    cleanPterodactylElements();
  }

  function cleanPterodactylElements() {
    if (isAuthPage() || isUnauthorizedAdminAttempt()) return;

    // 0. Completely remove native progress bar / cyan glowing line
    const progressSelectors = [
      'div[class*="ProgressBar"]',
      'div[class*="ProgressBar__BarFill"]',
      'div[class*="ProgressBar___StyledDiv"]',
      '.sc-14ayc3f-0',
      '.sc-14ayc3f-1',
      '[class*="sc-14ayc3f"]',
      'div[style*="hsl(178"]',
      'div[style*="211, 238"]',
      'div[style*="height: 2px"]',
      'div[style*="height:2px"]'
    ];
    document.querySelectorAll(progressSelectors.join(',')).forEach(function (el) {
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
      el.style.setProperty('height', '0', 'important');
      el.style.setProperty('min-height', '0', 'important');
      el.style.setProperty('max-height', '0', 'important');
      el.style.setProperty('box-shadow', 'none', 'important');
      el.style.setProperty('opacity', '0', 'important');
      el.style.setProperty('position', 'absolute', 'important');
      el.style.setProperty('top', '-99999px', 'important');
      el.style.setProperty('pointer-events', 'none', 'important');
    });

    // 1. Hide native top navigation bar & SubNavigation completely
    const navSelectors = [
      'nav',
      'header',
      '[role="navigation"]',
      '[class*="NavigationBar"]',
      'div[class*="NavigationBar___StyledDiv"]',
      '#SubNavigation',
      '[id="SubNavigation"]',
      'div#SubNavigation',
      'div[id*="SubNavigation"]',
      'nav#SubNavigation',
      'div[class*="SubNavigation"]',
      'nav[class*="SubNavigation"]',
      '[class*="SubNavigation"]'
    ];
    document.querySelectorAll(navSelectors.join(',')).forEach(function (el) {
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
      el.style.setProperty('height', '0', 'important');
      el.style.setProperty('min-height', '0', 'important');
      el.style.setProperty('max-height', '0', 'important');
      el.style.setProperty('margin', '0', 'important');
      el.style.setProperty('padding', '0', 'important');
      el.style.setProperty('border', 'none', 'important');
      if (el.id === 'SubNavigation' || el.matches('[class*="SubNavigation"]') || el.closest('[class*="SubNavigation"], #SubNavigation')) {
        try { el.remove(); } catch (e) { }
      }
    });

    // 2. Hide top bar inside #app if rendered without standard nav tag
    const app = document.getElementById('app');
    if (app) {
      const topDivs = app.querySelectorAll('& > div > div, & > div > header, & > div > nav');
      topDivs.forEach(function (el) {
        if (
          el.classList.contains('apparatus-sidebar') ||
          el.id === 'apparatus-dashboard-view' ||
          el.matches('[class*="DashboardContainer"], main') ||
          el.closest('[class*="DashboardContainer"]')
        ) {
          return;
        }
        if (
          el.querySelector('a[href="/admin"]') ||
          el.querySelector('button[aria-label="Search"]') ||
          el.matches('[class*="NavigationBar"]') ||
          el.querySelector('[class*="NavigationBar"]') ||
          el.matches('[class*="SubNavigation"]') ||
          el.querySelector('[class*="SubNavigation"]') ||
          el.id === 'SubNavigation' ||
          el.querySelector('#SubNavigation')
        ) {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
          el.style.setProperty('height', '0', 'important');
          el.style.setProperty('margin', '0', 'important');
          el.style.setProperty('padding', '0', 'important');
          el.style.setProperty('border', 'none', 'important');
          try { el.remove(); } catch (e) { }
        }
      });
    }

    // 3. Remove Pterodactyl and Blueprint footers & copyright completely
    document.querySelectorAll('a[href*="pterodactyl.io"], a[href*="blueprint.zip"]').forEach(function (a) {
      const container = a.closest('p, footer, div[class*="ContentContainer"], div');
      if (container && !container.classList.contains('apparatus-sidebar') && !container.closest('.apparatus-sidebar')) {
        container.style.setProperty('display', 'none', 'important');
        try { container.remove(); } catch (e) { }
      } else {
        try { a.remove(); } catch (e) { }
      }
    });

    document.querySelectorAll('footer, [class*="Blueprint"], [class*="Footer"], p, div[class*="ContentContainer"]').forEach(function (el) {
      if (el.classList.contains('apparatus-sidebar') || el.closest('.apparatus-sidebar')) return;
      const text = (el.textContent || '').trim();
      if (
        (text.includes('Blueprint') && text.includes('©')) ||
        (text.includes('Pterodactyl') && text.includes('©')) ||
        text.includes('Pterodactyl®') ||
        text.includes('2015 - 2026') ||
        text.includes('2023 - 2026') ||
        text.includes('blueprint.zip')
      ) {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
        el.style.setProperty('height', '0', 'important');
        try { el.remove(); } catch (e) { }
      }
    });

    // 4. Proper Transparency & Styling for ContentBox cards (.sc-mjlt6f-2) across /account, /account/api, /account/ssh
    const contentCards = document.querySelectorAll('.sc-mjlt6f-2, [class*="sc-mjlt6f-2"], div[class*="ContentBox___StyledDiv"]');
    contentCards.forEach(function (card) {
      card.style.setProperty('background', 'radial-gradient(ellipse at 88% 25%, rgba(236, 72, 153, 0.15), transparent 55%), rgba(255, 255, 255, 0.04)', 'important');
      card.style.setProperty('backdrop-filter', 'blur(20px) saturate(180%)', 'important');
      card.style.setProperty('-webkit-backdrop-filter', 'blur(20px) saturate(180%)', 'important');
      card.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.18)', 'important');
      card.style.setProperty('border-radius', '16px', 'important');
      card.style.setProperty('box-shadow', '0 16px 40px 0 rgba(0, 0, 0, 0.22), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)', 'important');
      if (card.parentElement && !card.parentElement.style.height) {
        card.parentElement.style.display = 'flex';
        card.parentElement.style.flexDirection = 'column';
        card.style.flex = '1 1 auto';
      }
    });

    // Strip borders, backgrounds and shadows from any transition/fade wrappers inside cards ONLY
    document.querySelectorAll('.sc-mjlt6f-2 [class*="Fade"], .sc-mjlt6f-2 [class*="sc-1p0gm8n"], .sc-mjlt6f-2 div[class*="Fade__Container"]').forEach(function (fade) {
      fade.style.setProperty('border', 'none', 'important');
      fade.style.setProperty('background', 'transparent', 'important');
      fade.style.setProperty('box-shadow', 'none', 'important');
      if (!fade.textContent || !fade.textContent.trim()) {
        fade.style.setProperty('display', 'none', 'important');
        fade.style.setProperty('height', '0', 'important');
        fade.style.setProperty('min-height', '0', 'important');
        fade.style.setProperty('margin', '0', 'important');
        fade.style.setProperty('padding', '0', 'important');
      }
    });

    // 4b. Hide native Pterodactyl empty server messages and dashboard leaks on Dashboard and Servers tabs
    const rawP = window.location.pathname || '/';
    const curP = (rawP.length > 1 && rawP.endsWith('/')) ? rawP.slice(0, -1) : rawP;
    const isSrv = curP === '/servers' || curP.startsWith('/servers/') || window.location.hash === '#servers';
    const isVps = curP === '/vps' || curP.startsWith('/vps/') || window.location.hash === '#vps';
    const isDash = (curP === '/' || curP === '/dashboard') && !isSrv && !isVps;
    if (isDash || isSrv || isVps) {
      document.querySelectorAll('p[class*="DashboardContainer"], .sc-1topkxf-3, div[class*="AccountOverviewContainer"], div[class*="AccountApiContainer"], div[class*="AccountSSHContainer"], div[class*="ActivityLogContainer"], .sc-12to0iy-1, .sc-1c4s3nm-0, .sc-yksipt-0').forEach(function (el) {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
        el.style.setProperty('height', '0', 'important');
      });
      document.querySelectorAll('p').forEach(function (p) {
        if (p.textContent && p.textContent.includes('There are no servers associated with your account')) {
          p.style.setProperty('display', 'none', 'important');
          p.style.setProperty('visibility', 'hidden', 'important');
          p.style.setProperty('height', '0', 'important');
        }
      });
    }

    // 5. Ensure inputs and textareas on account pages are properly translucent
    document.querySelectorAll('.sc-19rce1w-0, .sc-19rce1w-1, .sc-lcvdq4-0, .sc-plts88-0').forEach(function (inp) {
      inp.style.setProperty('background', 'rgba(255, 255, 255, 0.06)', 'important');
      inp.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.14)', 'important');
      inp.style.setProperty('backdrop-filter', 'blur(8px)', 'important');
      inp.style.setProperty('-webkit-backdrop-filter', 'blur(8px)', 'important');
      inp.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.16)', 'important');
      inp.style.setProperty('border-radius', '10px', 'important');
      inp.style.setProperty('color', '#ffffff', 'important');
    });

    // 6. Ensure action buttons on account cards have Apparatus pink gradient
    document.querySelectorAll('.sc-mjlt6f-2 button:not([class*="secondary"]):not([class*="danger"]):not([class*="ghost"])').forEach(function (btn) {
      btn.style.setProperty('background', 'linear-gradient(135deg, #ec4899, #db2777)', 'important');
      btn.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.2)', 'important');
      btn.style.setProperty('color', '#ffffff', 'important');
      btn.style.setProperty('border-radius', '10px', 'important');
      btn.style.setProperty('box-shadow', '0 4px 15px rgba(236, 72, 153, 0.35)', 'important');
    });

    // 7b. Mount User Profile Section on /account above Update Password / Email / 2FA cards
    if (window.location.pathname === '/account' || window.location.pathname === '/account/') {
      injectUserProfileSection();
    } else {
      const existingProf = document.getElementById('apparatus-user-profile-section');
      if (existingProf) existingProf.remove();
    }

    // 7. Ensure "Recent Activity" header text is present above the activity card on /account/activity
    const rawPathname = window.location.pathname || '';
    if (rawPathname.startsWith('/account/activity')) {
      const actCard = document.querySelector('.bg-gray-700');
      if (actCard && !document.getElementById('apparatus-activity-header')) {
        const header = document.createElement('h2');
        header.id = 'apparatus-activity-header';
        header.className = 'apparatus-section-title';
        header.innerHTML = '<i class="ri-history-line" style="color: #ffffff;"></i> Recent Activity';
        if (actCard.parentElement) {
          actCard.parentElement.insertBefore(header, actCard);
        }
      }

      // 8. Enhance Activity Log IP addresses with Flag, Blur, and Clickable Location Lookup
      enhanceActivityLogIps();
      enhanceActivityLogBadges();
    } else {
      const existingHeader = document.getElementById('apparatus-activity-header');
      if (existingHeader) existingHeader.remove();
    }
  }

  // Activity Log IP Country & Flag enhancement
  const ipCountryCache = new Map();

  function isPrivateIp(ip) {
    if (!ip) return true;
    ip = ip.trim();
    return ip === '127.0.0.1' || ip === 'localhost' || ip === '::1' ||
      /^10\./.test(ip) ||
      /^192\.168\./.test(ip) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip) ||
      /^fc00:/.test(ip) ||
      /^fe80:/.test(ip);
  }

  async function resolveIpCountry(ip, imgEl) {
    if (!ip || isPrivateIp(ip)) return;
    if (ipCountryCache.has(ip)) {
      const code = ipCountryCache.get(ip);
      if (code && imgEl) {
        imgEl.src = 'https://flagcdn.com/20x15/' + code + '.png';
        imgEl.style.display = 'inline-block';
        imgEl.title = code.toUpperCase();
      }
      return;
    }
    try {
      const cached = localStorage.getItem('apparatus_geo_' + ip);
      if (cached) {
        ipCountryCache.set(ip, cached);
        if (imgEl) {
          imgEl.src = 'https://flagcdn.com/20x15/' + cached + '.png';
          imgEl.style.display = 'inline-block';
          imgEl.title = cached.toUpperCase();
        }
        return;
      }
    } catch (e) { }

    try {
      const res = await fetch('https://api.country.is/' + ip);
      if (res.ok) {
        const data = await res.json();
        if (data && data.country) {
          const code = data.country.toLowerCase();
          ipCountryCache.set(ip, code);
          try { localStorage.setItem('apparatus_geo_' + ip, code); } catch (e) { }
          if (imgEl) {
            imgEl.src = 'https://flagcdn.com/20x15/' + code + '.png';
            imgEl.style.display = 'inline-block';
            imgEl.title = code.toUpperCase();
          }
        }
      }
    } catch (e) { }
  }

  // Activity Log IP Blur & Flag enhancement (Clean inline layout, no box badge, no globe icon)
  function enhanceActivityLogIps() {
    const card = document.querySelector('.bg-gray-700');
    if (!card) return;
    const rows = card.children;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.dataset.apparatusIpEnhanced) continue;
      const spans = row.querySelectorAll('span');
      for (let j = 0; j < spans.length; j++) {
        const s = spans[j];
        const text = s.textContent.trim();
        const match = text.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
        if (match && s.childNodes.length > 0) {
          const ip = match[1];
          row.dataset.apparatusIpEnhanced = 'true';

          const lookupUrl = 'https://www.iplocation.net/ip-lookup?query=' + encodeURIComponent(ip);

          const container = document.createElement('a');
          container.href = lookupUrl;
          container.target = '_blank';
          container.rel = 'noopener noreferrer';
          container.className = 'apparatus-ip-container apparatus-ip-link';
          container.title = 'Click to check IP location (' + ip + ')';

          const isLocal = isPrivateIp(ip);
          if (isLocal) {
            const localIcon = document.createElement('i');
            localIcon.className = 'ri-shield-keyhole-line apparatus-ip-local-icon';
            localIcon.title = 'Localhost / Private Network';
            container.appendChild(localIcon);
          } else {
            const flagImg = document.createElement('img');
            flagImg.className = 'apparatus-ip-flag';
            flagImg.alt = 'Country flag';
            flagImg.style.display = 'none';

            flagImg.onload = function () {
              flagImg.style.display = 'inline-block';
            };
            flagImg.onerror = function () {
              flagImg.style.display = 'none';
            };

            container.appendChild(flagImg);
            resolveIpCountry(ip, flagImg);
          }

          const ipSpan = document.createElement('span');
          ipSpan.className = 'apparatus-ip-blurred';
          ipSpan.textContent = ip;
          container.appendChild(ipSpan);

          // Click reveal support
          container.addEventListener('click', function () {
            ipSpan.classList.add('revealed');
          });

          s.innerHTML = '';
          s.appendChild(container);

          const divider = document.createElement('span');
          divider.className = 'apparatus-ip-divider';
          divider.innerHTML = '&bull;';
          s.appendChild(divider);
          break;
        }
      }
    }
  }

  // Activity Log Event Status Circle enhancement (Green circular tick for success, red circular cross for error, etc.)
  function enhanceActivityLogBadges() {
    const actContainer = document.querySelector('div[class*="ActivityLogContainer"]') || document.querySelector('.bg-gray-700');
    if (!actContainer) return;

    const links = actContainer.querySelectorAll('a:not([class*="apparatus-ip"])');
    for (let i = 0; i < links.length; i++) {
      const a = links[i];
      if (a.dataset.apparatusEventEnhanced) continue;

      const raw = (a.textContent || '').trim();
      if (!raw) continue;

      a.dataset.apparatusEventEnhanced = 'true';

      // Clean dash text node right before the badge if present ("mudit — " -> "mudit ")
      if (a.previousSibling && a.previousSibling.nodeType === Node.TEXT_NODE) {
        a.previousSibling.textContent = a.previousSibling.textContent.replace(/\s*[—–-]\s*/g, ' ');
      }

      let icon = 'ri-check-line';
      let title = 'Successful (' + raw + ')';
      let typeClass = 'apparatus-event-circle-success';

      const lower = raw.toLowerCase();
      if (lower.includes('fail') || lower.includes('error') || lower.includes('denied') || lower.includes('delete')) {
        // Red circular cross
        icon = 'ri-close-line';
        title = lower.includes('delete') ? 'Deleted (' + raw + ')' : 'Failed / Error (' + raw + ')';
        typeClass = 'apparatus-event-circle-error';
      } else if (lower.includes('warn') || lower.includes('checkpoint') || lower.includes('password') || lower.includes('recovery')) {
        // Amber circular alert
        icon = 'ri-alert-line';
        title = 'Security Alert (' + raw + ')';
        typeClass = 'apparatus-event-circle-warn';
      } else if (lower.startsWith('server:power') || lower.startsWith('server:console')) {
        // Cyan circular info/power
        icon = lower.includes('stop') ? 'ri-stop-line' : 'ri-play-line';
        title = 'Server Action (' + raw + ')';
        typeClass = 'apparatus-event-circle-info';
      } else {
        // Green circular tick (auth:success, login, verified, created, etc.)
        icon = 'ri-check-line';
        title = 'Success (' + raw + ')';
        typeClass = 'apparatus-event-circle-success';
      }

      a.className = 'apparatus-event-badge ' + typeClass;
      a.title = title;
      a.innerHTML = '<i class="' + icon + '"></i>';
    }
  }

  // Event formatters for Recent Activity
  function formatEventName(event) {
    if (!event) return 'Account Event';
    const map = {
      'auth:success': 'Account Logged In',
      'auth:login': 'Account Logged In',
      'auth:checkpoint': '2FA Verification Passed',
      'auth:password': 'Password Changed',
      'auth:recovery': 'Recovery Code Used',
      'server:console.command': 'Console Command Sent',
      'server:power.start': 'Server Started',
      'server:power.stop': 'Server Stopped',
      'server:power.restart': 'Server Restarted',
      'server:file.upload': 'File Uploaded',
      'server:file.delete': 'File Deleted',
      'server:backup.create': 'Backup Created',
      'server:backup.delete': 'Backup Deleted',
      'account:api-key.create': 'API Key Created',
      'account:api-key.delete': 'API Key Revoked',
      'account:ssh-key.create': 'SSH Key Added',
      'account:ssh-key.delete': 'SSH Key Removed'
    };
    if (map[event]) return map[event];
    return event.replace(/[:._]/g, ' ').replace(/\b\w/g, function (l) { return l.toUpperCase(); });
  }

  function getEventIcon(event) {
    if (!event) return 'ri-pulse-line';
    if (event.includes('login') || event.includes('auth')) return 'ri-login-box-line';
    if (event.includes('command')) return 'ri-terminal-box-line';
    if (event.includes('power')) return 'ri-shut-down-line';
    if (event.includes('file')) return 'ri-folder-line';
    if (event.includes('backup')) return 'ri-archive-line';
    if (event.includes('key')) return 'ri-key-2-line';
    return 'ri-pulse-line';
  }

  function timeAgo(dateString) {
    if (!dateString) return 'Just now';
    const now = new Date();
    const past = new Date(dateString);
    const diffSec = Math.floor((now - past) / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return diffMin + 'm ago';
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return diffHr + 'h ago';
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 30) return diffDay + 'd ago';
    return past.toLocaleDateString();
  }

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  function formatBytesToGB(mb) {
    if (!mb || mb <= 0) return '0.0 GB';
    return (mb / 1024).toFixed(1) + ' GB';
  }

  // Lenis Smooth Scroll Instance (Crisp, responsive, 60/120fps synchronized)
  let lenisInstance = null;

  function initSmoothScroll() {
    if (lenisInstance) return; // STRICT SINGLETON: Never duplicate instance or RAF loop
    const LenisClass = window.Lenis || globalThis.Lenis;
    if (typeof LenisClass === 'undefined') return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    try {
      lenisInstance = new LenisClass({
        lerp: 0.16, // Snappy & silky: zero sluggish lag, crisp response
        wheelMultiplier: 1.15,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        prevent: function (node) {
          if (!node || typeof node.closest !== 'function') return false;
          return !!node.closest(
            '#apparatus-sidebar, .apparatus-sidebar, .apparatus-sidebar-scroll, ' +
            '[data-lenis-prevent], [data-lenis-prevent-wheel], .apparatus-activity-list, ' +
            'aside, nav, #SubNavigation, [class*="SubNavigation"], [class*="NavigationBar"], ' +
            '[class*="Modal"], [class*="Terminal"], [class*="FileManager"], ' +
            '.overflow-y-auto, .overflow-y-scroll, pre, code'
          );
        }
      });

      // Synchronize with GSAP ticker loop for hardware v-sync matching
      if (typeof gsap !== 'undefined' && gsap.ticker) {
        gsap.ticker.add(function (time) {
          if (lenisInstance) lenisInstance.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        function lenisRaf(time) {
          if (lenisInstance) {
            lenisInstance.raf(time);
            requestAnimationFrame(lenisRaf);
          }
        }
        requestAnimationFrame(lenisRaf);
      }

      window.__apparatusLenis = lenisInstance;
    } catch (e) {
      console.warn('Apparatus Lenis initialization skipped:', e);
    }
  }

  function smoothScrollToTop() {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 0.8 });
    } else {
      window.scrollTo(0, 0);
    }
  }

  function smoothScrollToElement(el, highlight) {
    if (!el) return;
    if (lenisInstance) {
      lenisInstance.scrollTo(el, { offset: -24, duration: 0.8 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (highlight) {
      el.classList.remove('apparatus-target-highlight');
      void el.offsetWidth;
      el.classList.add('apparatus-target-highlight');
      setTimeout(function () {
        el.classList.remove('apparatus-target-highlight');
      }, 1500);
    }
  }

  function initInstanceTabs() {
    const tabServers = document.getElementById('apparatus-tab-btn-servers');
    const tabVps = document.getElementById('apparatus-tab-btn-vps');
    const paneServers = document.getElementById('apparatus-pane-servers');
    const paneVps = document.getElementById('apparatus-pane-vps');
    const deployBtn = document.getElementById('apparatus-hub-deploy-btn');
    const heroVpsBtn = document.getElementById('apparatus-hero-vps-btn');

    function selectTab(target) {
      if (target === 'vps') {
        if (tabVps) tabVps.classList.add('active');
        if (tabServers) tabServers.classList.remove('active');
        if (paneVps) {
          paneVps.style.display = 'block';
          if (typeof gsap !== 'undefined') gsap.fromTo(paneVps, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        }
        if (paneServers) paneServers.style.display = 'none';
        if (deployBtn) {
          deployBtn.innerHTML = '<i class="ri-add-line"></i> Deploy Cloud VPS';
          deployBtn.onclick = function () { window.open('https://arixbyte.com', '_blank'); };
        }
      } else {
        if (tabServers) tabServers.classList.add('active');
        if (tabVps) tabVps.classList.remove('active');
        if (paneServers) {
          paneServers.style.display = 'block';
          if (typeof gsap !== 'undefined') gsap.fromTo(paneServers, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        }
        if (paneVps) paneVps.style.display = 'none';
        if (deployBtn) {
          deployBtn.innerHTML = '<i class="ri-add-line"></i> Deploy Server';
          deployBtn.onclick = function () { window.open('https://arixbyte.com', '_blank'); };
        }
      }
    }

    if (tabServers) {
      tabServers.addEventListener('click', function () { selectTab('servers'); });
    }
    if (tabVps) {
      tabVps.addEventListener('click', function () { selectTab('vps'); });
    }
    if (heroVpsBtn) {
      heroVpsBtn.addEventListener('click', function () {
        selectTab('vps');
        const hub = document.getElementById('apparatus-area-4');
        if (hub) smoothScrollToElement(hub, true);
      });
    }

    const heroStoreBtn = document.getElementById('apparatus-hero-store-btn');
    if (heroStoreBtn) {
      heroStoreBtn.addEventListener('click', function () {
        const billing = document.getElementById('apparatus-area-billing');
        if (billing) {
          smoothScrollToElement(billing, true);
        } else {
          window.open('https://arixbyte.com', '_blank');
        }
      });
    }

    const vpsRefreshBtn = document.getElementById('apparatus-vps-refresh-btn');
    if (vpsRefreshBtn) {
      vpsRefreshBtn.addEventListener('click', function () {
        showToast('info', 'Cloud VPS Sync', 'Checking active KVM cloud instances...');
        setTimeout(function () {
          showToast('success', 'VPS Synced', '0 active KVM instances found. Deploy one to begin!');
        }, 1000);
      });
    }
  }

  function initDailyReward() {
    const dailyBtn = document.getElementById('apparatus-daily-reward-btn');
    const coinDisplay = document.getElementById('apparatus-coin-count');
    const metricCoins = document.getElementById('apparatus-metric-coins');

    let coins = parseInt(localStorage.getItem('apparatus_coins') || '100', 10);
    if (isNaN(coins) || coins < 0) coins = 100;

    function refreshCoinDisplays() {
      if (coinDisplay) coinDisplay.textContent = coins.toLocaleString();
      if (metricCoins) metricCoins.textContent = coins.toLocaleString();
      const rCoins = document.getElementById('res-coin-count');
      if (rCoins) rCoins.textContent = coins.toLocaleString();
    }
    refreshCoinDisplays();

    if (!dailyBtn) return;

    const ONE_DAY = 24 * 60 * 60 * 1000;
    const lastClaim = localStorage.getItem('apparatus_last_daily_claim');
    const now = Date.now();

    if (lastClaim && (now - parseInt(lastClaim, 10)) < ONE_DAY) {
      const hoursLeft = Math.ceil((ONE_DAY - (now - parseInt(lastClaim, 10))) / (60 * 60 * 1000));
      dailyBtn.disabled = true;
      dailyBtn.innerHTML = '<i class="ri-check-line"></i> Claimed (' + hoursLeft + 'h left)';
      dailyBtn.classList.add('apparatus-btn-disabled');
    }

    dailyBtn.addEventListener('click', function () {
      const curNow = Date.now();
      const curLast = localStorage.getItem('apparatus_last_daily_claim');
      if (curLast && (curNow - parseInt(curLast, 10)) < ONE_DAY) {
        showToast('info', 'Daily Reward', 'Already claimed today! Please check back tomorrow.');
        return;
      }

      coins += 2;
      localStorage.setItem('apparatus_coins', coins.toString());
      localStorage.setItem('apparatus_last_daily_claim', curNow.toString());
      refreshCoinDisplays();

      dailyBtn.disabled = true;
      dailyBtn.innerHTML = '<i class="ri-check-line"></i> Claimed (24h left)';
      dailyBtn.classList.add('apparatus-btn-disabled');
      showToast('success', 'Daily Reward Claimed!', '🎉 +2 Coins added! Your total is now ' + coins + ' 🪙');
    });
  }

  function initBillingActions() {
    const topupBtn = document.getElementById('apparatus-wallet-topup-btn');
    const ribbonTopup = document.getElementById('apparatus-ribbon-topup');

    function openTopupModal() {
      const billing = document.getElementById('apparatus-area-billing');
      if (billing) {
        billing.scrollIntoView({ behavior: 'smooth' });
        billing.style.transition = 'box-shadow 0.3s ease';
        billing.style.boxShadow = '0 0 25px rgba(236, 72, 153, 0.45)';
        setTimeout(function () { billing.style.boxShadow = ''; }, 1500);
      } else {
        showToast('info', 'INR Wallet Top-Up', 'Redirecting to Instant UPI / NetBanking Gateway...');
        setTimeout(function () {
          window.open('https://arixbyte.com', '_blank');
        }, 800);
      }
    }

    if (topupBtn) topupBtn.addEventListener('click', openTopupModal);
    if (ribbonTopup) ribbonTopup.addEventListener('click', openTopupModal);

    const upgradePills = document.querySelectorAll('.apparatus-upgrade-pill');
    upgradePills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        const item = pill.dataset.upgrade || 'Resource Addon';
        const price = pill.dataset.price || '₹99';
        showToast('success', 'Order Selected', 'Selected ' + item + ' for ' + price + '/mo. Redirecting to billing...');
        setTimeout(function () {
          window.open('https://arixbyte.com', '_blank');
        }, 1200);
      });
    });
  }

  function getReferralCode(user) {
    const saved = localStorage.getItem('apparatus_referral_code');
    const u = (user && user.username) ? user.username : ((window.PterodactylUser && window.PterodactylUser.username) || '');
    if (saved && (!u || saved.includes(u.toUpperCase().slice(0, 3)))) {
      return saved;
    }
    const cleanU = (u || 'ARIX').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const prefix = (cleanU.length >= 3 ? cleanU.slice(0, 4) : cleanU).padEnd(4, 'X');
    let hash = 5381;
    for (let i = 0; i < cleanU.length; i++) {
      hash = ((hash << 5) + hash) + cleanU.charCodeAt(i);
      hash |= 0;
    }
    const suffix = Math.abs(hash).toString(36).toUpperCase().padStart(4, '0').slice(-4);
    const code = 'AB-' + prefix + '-' + suffix;
    if (u) {
      localStorage.setItem('apparatus_referral_code', code);
    }
    return code;
  }

  function initReferralCode() {
    const codeEl = document.getElementById('apparatus-user-ref-code');
    const copyBtn = document.getElementById('apparatus-copy-ref-btn');
    if (!codeEl) return;

    const user = window.PterodactylUser || {};
    const code = getReferralCode(user);
    codeEl.textContent = code;

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        const textToCopy = codeEl.textContent.trim();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy);
        } else {
          const ta = document.createElement('textarea');
          ta.value = textToCopy;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }

        const icon = copyBtn.querySelector('i');
        const span = copyBtn.querySelector('span');
        if (icon) icon.className = 'ri-check-line';
        if (span) span.textContent = 'Copied!';
        copyBtn.classList.add('copied');

        showToast('success', 'Referral Code Copied!', 'Your code ' + textToCopy + ' was copied! Share it to earn 10 Coins per referral.');

        setTimeout(function () {
          if (icon) icon.className = 'ri-file-copy-line';
          if (span) span.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2500);
      });
    }
  }

  function updateResourceGauges(totalRamMB, totalCpuPercent, totalDiskMB) {
    const ramText = document.getElementById('apparatus-gauge-ram-text');
    const ramBar = document.getElementById('apparatus-gauge-ram-bar');
    const cpuText = document.getElementById('apparatus-gauge-cpu-text');
    const cpuBar = document.getElementById('apparatus-gauge-cpu-bar');
    const diskText = document.getElementById('apparatus-gauge-disk-text');
    const diskBar = document.getElementById('apparatus-gauge-disk-bar');

    const ramGB = (totalRamMB / 1024).toFixed(1);
    const diskGB = (totalDiskMB / 1024).toFixed(1);

    if (ramText) ramText.textContent = ramGB + ' GB Allocated';
    if (cpuText) cpuText.textContent = totalCpuPercent + '% Compute';
    if (diskText) diskText.textContent = diskGB + ' GB NVMe';

    // Width percentages for visually pleasing gauges
    const ramPct = Math.min(100, Math.max(8, (totalRamMB / 32768) * 100));
    const cpuPct = Math.min(100, Math.max(8, (totalCpuPercent / 800) * 100));
    const diskPct = Math.min(100, Math.max(8, (totalDiskMB / 102400) * 100));

    if (ramBar) ramBar.style.width = ramPct + '%';
    if (cpuBar) cpuBar.style.width = cpuPct + '%';
    if (diskBar) diskBar.style.width = diskPct + '%';
  }

  // ==============================================================================
  // RESOURCE ALLOCATION DATA STORE (Server & VPS Resources)
  // Default values are 0 / unallocated as requested
  // Admin page can update this structure via window.setApparatusResources(newData)
  // ==============================================================================
  function getApparatusResources() {
    const defaults = {
      server: {
        slots: 0,
        processor: '0',
        ram: '0 MB',
        cpu: '0%',
        disk: '0 GB',
        allocation: 0,
        ports: 0,
        database: 0,
        validity: '0 (after activation of server)'
      },
      vps: {
        slots: 0,
        node: '0',
        ram: '0 GB',
        cpu: '0 vCPU',
        disk: '0 GB'
      }
    };
    try {
      const saved = localStorage.getItem('apparatus_allocated_resources');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          server: Object.assign({}, defaults.server, parsed.server || {}),
          vps: Object.assign({}, defaults.vps, parsed.vps || {})
        };
      }
    } catch (e) { }
    return defaults;
  }
  window.getApparatusResources = getApparatusResources;
  window.setApparatusResources = function (data) {
    try {
      localStorage.setItem('apparatus_allocated_resources', JSON.stringify(data));
      renderResourcePage();
    } catch (e) { }
  };

  function renderResourcePage() {
    const res = getApparatusResources();

    // Overview Ribbon
    const sSlotsVal = document.getElementById('res-val-server-slots');
    if (sSlotsVal) sSlotsVal.textContent = res.server.slots + ' Slots';
    const vSlotsVal = document.getElementById('res-val-vps-slots');
    if (vSlotsVal) vSlotsVal.textContent = res.vps.slots + ' Slots';

    // Server Resources
    const sSlots = document.getElementById('res-server-slots');
    if (sSlots) sSlots.textContent = res.server.slots;
    const sProc = document.getElementById('res-server-processor');
    if (sProc) sProc.textContent = res.server.processor;
    const sRam = document.getElementById('res-server-ram');
    if (sRam) sRam.textContent = res.server.ram;
    const sCpu = document.getElementById('res-server-cpu');
    if (sCpu) sCpu.textContent = res.server.cpu;
    const sDisk = document.getElementById('res-server-disk');
    if (sDisk) sDisk.textContent = res.server.disk;
    const sAlloc = document.getElementById('res-server-allocation');
    if (sAlloc) sAlloc.textContent = res.server.allocation;
    const sPorts = document.getElementById('res-server-ports');
    if (sPorts) sPorts.textContent = res.server.ports;
    const sDb = document.getElementById('res-server-database');
    if (sDb) sDb.textContent = res.server.database;
    const sVal = document.getElementById('res-server-validity');
    if (sVal) sVal.textContent = res.server.validity;

    // VPS Resources
    const vSlots = document.getElementById('res-vps-slots');
    if (vSlots) vSlots.textContent = res.vps.slots;
    const vNode = document.getElementById('res-vps-node');
    if (vNode) vNode.textContent = res.vps.node;
    const vRam = document.getElementById('res-vps-ram');
    if (vRam) vRam.textContent = res.vps.ram;
    const vCpu = document.getElementById('res-vps-cpu');
    if (vCpu) vCpu.textContent = res.vps.cpu;
    const vDisk = document.getElementById('res-vps-disk');
    if (vDisk) vDisk.textContent = res.vps.disk;

    // Coins Balance
    const rCoins = document.getElementById('res-coin-count');
    if (rCoins) {
      const curCoins = parseInt(localStorage.getItem('apparatus_coins') || '100', 10);
      rCoins.textContent = (isNaN(curCoins) ? 100 : curCoins).toLocaleString();
    }

    // Live Gauges Text
    const gRam = document.getElementById('res-gauge-ram-text');
    if (gRam) gRam.textContent = `0 MB / ${res.server.ram} (0%)`;
    const gCpu = document.getElementById('res-gauge-cpu-text');
    if (gCpu) gCpu.textContent = `0% / ${res.server.cpu} In Use`;
    const gDisk = document.getElementById('res-gauge-disk-text');
    if (gDisk) gDisk.textContent = `0 GB / ${res.server.disk} Used`;
    const gPorts = document.getElementById('res-gauge-ports-text');
    if (gPorts) gPorts.textContent = `0 / ${res.server.ports} Assigned`;
  }

  // Load API Data for Dashboard (Servers, Activities, Account Details)
  async function loadDashboardApiData() {
    // 1. Fetch user data if not fully provided
    try {
      const accRes = await fetch('/api/client/account', { headers: { Accept: 'application/json' } });
      if (accRes.ok) {
        const accData = await accRes.json();
        const attr = accData.attributes || accData;
        if (attr.username) {
          const uEl = document.getElementById('apparatus-welcome-username');
          if (uEl) uEl.textContent = attr.username;
          const refEl = document.getElementById('apparatus-user-ref-code');
          if (refEl) refEl.textContent = getReferralCode(attr);
        }
        if (attr.email) {
          const eEl = document.getElementById('apparatus-email-val') || document.getElementById('apparatus-email-real');
          if (eEl) eEl.textContent = attr.email;
        }
        if (attr.admin !== undefined) {
          const isAdmin = !!attr.admin;
          const rEl = document.getElementById('apparatus-stat-role');
          const mRole = document.getElementById('apparatus-metric-role');
          if (rEl) rEl.textContent = isAdmin ? 'Administrator' : 'User';
          if (mRole) mRole.textContent = isAdmin ? 'Administrator' : 'User';

          if (isAdmin) {
            document.body.classList.add('apparatus-is-admin');
          } else {
            document.body.classList.remove('apparatus-is-admin');
            const adminItem = document.querySelector('.apparatus-admin-panel-item');
            if (adminItem) adminItem.remove();
          }
        }
      }
    } catch (e) { }

    // 2. Fetch Servers & aggregate capacity
    try {
      const srvRes = await fetch('/api/client', { headers: { Accept: 'application/json' } });
      const container = document.getElementById('apparatus-servers-list');
      const countBadge = document.getElementById('apparatus-server-badge');
      const ownedStat = document.getElementById('apparatus-stat-servers-owned');

      const mInstances = document.getElementById('apparatus-metric-instances');
      const mInstancesSub = document.getElementById('apparatus-metric-instances-sub');
      const mRam = document.getElementById('apparatus-metric-ram');
      const mCpu = document.getElementById('apparatus-metric-cpu');
      const mDisk = document.getElementById('apparatus-metric-disk');

      if (srvRes.ok) {
        const srvData = await srvRes.json();
        const servers = srvData.data || [];
        const total = (srvData.meta && srvData.meta.pagination && srvData.meta.pagination.total !== undefined)
          ? srvData.meta.pagination.total
          : servers.length;

        if (countBadge) countBadge.textContent = total;
        if (ownedStat) ownedStat.textContent = total;
        if (mInstances) mInstances.textContent = total;
        if (mInstancesSub) mInstancesSub.innerHTML = total + (total === 1 ? ' Server' : ' Servers') + ' &bull; 0 VPS';

        let totalRamMB = 0;
        let totalCpuPercent = 0;
        let totalDiskMB = 0;

        servers.forEach(function (s) {
          const limits = (s.attributes && s.attributes.limits) || {};
          if (typeof limits.memory === 'number') totalRamMB += limits.memory;
          if (typeof limits.cpu === 'number') totalCpuPercent += limits.cpu;
          if (typeof limits.disk === 'number') totalDiskMB += limits.disk;
        });

        if (mRam) mRam.textContent = (totalRamMB / 1024).toFixed(1) + ' GB';
        if (mCpu) mCpu.textContent = totalCpuPercent + '% CPU';
        if (mDisk) mDisk.textContent = (totalDiskMB / 1024).toFixed(1) + ' GB NVMe';

        updateResourceGauges(totalRamMB, totalCpuPercent, totalDiskMB);

        if (servers.length === 0) {
          if (container) {
            container.innerHTML = `
              <div class="apparatus-empty-servers">
                <div class="apparatus-empty-icon"><i class="ri-gamepad-line"></i></div>
                <h4 class="apparatus-empty-title">No Game Servers Active</h4>
                <p class="apparatus-empty-desc">
                  You do not have any active game servers yet. Deploy high-performance Minecraft, Rust, CS2, or bot instances with instant setup.
                </p>
                <div class="apparatus-empty-actions">
                  <a href="https://arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-primary">
                    <i class="ri-add-line"></i> Deploy Server
                  </a>
                  <a href="#resource" class="apparatus-btn apparatus-btn-glass" id="apparatus-empty-view-res-btn">
                    <i class="ri-cpu-line"></i> View Resources
                  </a>
                </div>
              </div>
            `;
          }
        } else {
          if (container) {
            let html = '<div class="apparatus-servers-grid">';
            servers.forEach(function (s) {
              const attr = s.attributes || {};
              const id = attr.identifier || attr.uuid || '';
              const name = attr.name || 'Server';
              const node = attr.node || 'ArixByte Node';
              const mem = attr.limits && attr.limits.memory !== undefined ? (attr.limits.memory === 0 ? 'Unlimited' : attr.limits.memory + ' MB') : 'Standard';
              const cpu = attr.limits && attr.limits.cpu !== undefined ? (attr.limits.cpu === 0 ? 'Unlimited' : attr.limits.cpu + '%') : 'Standard';
              const disk = attr.limits && attr.limits.disk !== undefined ? (attr.limits.disk === 0 ? 'Unlimited' : attr.limits.disk + ' MB') : 'Standard';

              html += `
                <div class="apparatus-server-item">
                  <div class="apparatus-server-main">
                    <div class="apparatus-server-top">
                      <div class="apparatus-server-badge-online">
                        <span class="apparatus-status-dot"></span> Active
                      </div>
                      <span class="apparatus-server-node"><i class="ri-router-line"></i> ${node}</span>
                    </div>
                    <h4 class="apparatus-server-name">${name}</h4>
                    <div class="apparatus-server-stats">
                      <span><i class="ri-cpu-line"></i> ${cpu}</span>
                      <span><i class="ri-database-2-line"></i> ${mem}</span>
                      <span><i class="ri-hard-drive-line"></i> ${disk}</span>
                    </div>
                  </div>
                  <div class="apparatus-server-action-wrap">
                    <a href="/server/${id}" class="apparatus-server-btn">
                      Manage <i class="ri-arrow-right-s-line"></i>
                    </a>
                  </div>
                </div>
              `;
            });
            html += '</div>';
            container.innerHTML = html;
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(container.querySelectorAll('.apparatus-server-card'),
                { autoAlpha: 0, y: 14 },
                { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' }
              );
            }
          }
        }
      } else {
        renderDefaultEmptyServers();
      }
    } catch (e) {
      renderDefaultEmptyServers();
    }

    // 3. Fetch Recent Activities
    try {
      const actRes = await fetch('/api/client/account/activity?page=1', { headers: { Accept: 'application/json' } });
      const actContainer = document.getElementById('apparatus-activity-list');
      if (actRes.ok) {
        const actData = await actRes.json();
        const activities = actData.data || [];
        if (activities.length === 0) {
          if (actContainer) actContainer.innerHTML = '<div class="apparatus-empty-msg">No recent activity.</div>';
        } else {
          let html = '';
          activities.slice(0, 5).forEach(function (item) {
            const attr = item.attributes || {};
            const event = attr.event || 'activity';
            const timestamp = attr.timestamp || '';
            const title = formatEventName(event);
            const time = timeAgo(timestamp);

            html += `
              <div class="apparatus-act-row">
                <span class="apparatus-act-name">${title}</span>
                <span class="apparatus-act-time">${time}</span>
              </div>
            `;
          });
          if (actContainer) {
            actContainer.innerHTML = html;
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(actContainer.querySelectorAll('.apparatus-act-row'),
                { autoAlpha: 0, x: -10 },
                { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
              );
            }
          }
        }
      } else {
        if (actContainer) actContainer.innerHTML = '<div class="apparatus-empty-msg">No recent activity.</div>';
      }
    } catch (e) {
      const actContainer = document.getElementById('apparatus-activity-list');
      if (actContainer) actContainer.innerHTML = '<div class="apparatus-empty-msg">No recent activity.</div>';
    }
  }

  function renderDefaultEmptyServers() {
    const container = document.getElementById('apparatus-servers-list');
    const countBadge = document.getElementById('apparatus-server-badge');
    const mInstances = document.getElementById('apparatus-metric-instances');
    const mInstancesSub = document.getElementById('apparatus-metric-instances-sub');
    if (countBadge) countBadge.textContent = '0';
    if (mInstances) mInstances.textContent = '0';
    if (mInstancesSub) mInstancesSub.innerHTML = '0 Servers &bull; 0 VPS';
    if (container) {
      container.innerHTML = `
        <div class="apparatus-empty-servers">
          <div class="apparatus-empty-icon"><i class="ri-gamepad-line"></i></div>
          <h4 class="apparatus-empty-title">No Game Servers Active</h4>
          <p class="apparatus-empty-desc">
            You do not have any active game servers yet. Deploy high-performance Minecraft, Rust, CS2, or bot instances with instant setup.
          </p>
          <div class="apparatus-empty-actions">
            <a href="https://arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-primary">
              <i class="ri-add-line"></i> Deploy Server
            </a>
            <a href="#resource" class="apparatus-btn apparatus-btn-glass" id="apparatus-empty-view-res-btn">
              <i class="ri-cpu-line"></i> View Resources
            </a>
          </div>
        </div>
      `;
    }
  }

  // Trigger Staggered Dashboard Opening Animation via GSAP & Fallbacks
  function triggerDashboardEntrance() {
    if (typeof gsap === 'undefined') return;
    try {
      gsap.fromTo('#apparatus-area-1', 
        { autoAlpha: 0, y: 24, scale: 0.985 }, 
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' }
      );
      gsap.fromTo('.apparatus-metric-tile', 
        { autoAlpha: 0, y: 20, scale: 0.96 }, 
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out', delay: 0.09 }
      );
      gsap.fromTo('.apparatus-dash-row-top .apparatus-card', 
        { autoAlpha: 0, y: 22, scale: 0.98 }, 
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.09, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo('.apparatus-dash-row-bottom .apparatus-card', 
        { autoAlpha: 0, y: 22, scale: 0.98 }, 
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.09, ease: 'power3.out', delay: 0.3 }
      );
      const ramBar = document.getElementById('apparatus-gauge-ram-bar');
      const cpuBar = document.getElementById('apparatus-gauge-cpu-bar');
      const diskBar = document.getElementById('apparatus-gauge-disk-bar');
      if (ramBar) gsap.fromTo(ramBar, { width: '0%' }, { width: ramBar.style.width || '20%', duration: 1.2, ease: 'power2.out', delay: 0.45 });
      if (cpuBar) gsap.fromTo(cpuBar, { width: '0%' }, { width: cpuBar.style.width || '15%', duration: 1.2, ease: 'power2.out', delay: 0.5 });
      if (diskBar) gsap.fromTo(diskBar, { width: '0%' }, { width: diskBar.style.width || '25%', duration: 1.2, ease: 'power2.out', delay: 0.55 });
    } catch (err) {}
  }

  // Initialize the Transparent Futuristic Dashboard
  function initDashboardView() {
    let dash = document.getElementById('apparatus-dashboard-view');
    if (dash) return;

    dash = document.createElement('div');
    dash.id = 'apparatus-dashboard-view';
    dash.className = 'apparatus-dashboard-view';

    const user = window.PterodactylUser || {};
    const username = user.username || 'User';
    const email = user.email || 'user@arixbyte.com';
    const isRootAdmin = !!user.root_admin;
    const useTotp = !!user.use_totp;
    const greeting = getGreeting();
    const referralCode = getReferralCode(user);

    dash.innerHTML = `
      <div class="apparatus-dashboard-container">
        
        <!-- Top Section: Dynamic Hero Banner -->
        <div class="apparatus-card apparatus-card-welcome" id="apparatus-area-1">
          <div class="apparatus-welcome-content">
            <h1 class="apparatus-welcome-title">${greeting}, <span class="apparatus-user-name" id="apparatus-welcome-username">${username}</span>!</h1>
            <p class="apparatus-welcome-desc">Deploy and manage your game servers, cloud VPS, and infrastructure.</p>
            <div class="apparatus-welcome-actions apparatus-welcome-socials">
              <a href="https://arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-glass apparatus-social-btn apparatus-social-web" title="ArixByte Official Website">
                <i class="ri-global-line"></i> <span>Website</span>
              </a>
              <a href="https://discord.arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-glass apparatus-social-btn apparatus-social-discord" title="Discord Community">
                <i class="ri-discord-fill"></i> <span>Discord</span>
              </a>
              <a href="https://instagram.arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-glass apparatus-social-btn apparatus-social-insta" title="Instagram">
                <i class="ri-instagram-line"></i> <span>Instagram</span>
              </a>
              <a href="https://wa.me/918218444633" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-glass apparatus-social-btn apparatus-social-wa" title="WhatsApp Support">
                <i class="ri-whatsapp-line"></i> <span>WhatsApp</span>
              </a>
            </div>
          </div>
          <div class="apparatus-welcome-decor apparatus-welcome-decor-ab" aria-hidden="true">
            <img src="/themes/apparatus/arixbyte-logo.png" class="apparatus-ab-watermark" alt="ArixByte" onerror="this.src='/themes/apparatus/ab-logo-white.png';">
          </div>
        </div>

        <!-- Top Metric Ribbon (4 Modern Glass Tiles) -->
        <div class="apparatus-metrics-ribbon" id="apparatus-metrics-ribbon">
          <!-- Metric 1: Active Instances -->
          <div class="apparatus-metric-tile">
            <div class="apparatus-metric-icon apparatus-icon-purple">
              <i class="ri-server-line"></i>
            </div>
            <div class="apparatus-metric-body">
              <span class="apparatus-metric-label">Active Instances</span>
              <div class="apparatus-metric-num">
                <span class="apparatus-metric-val" id="apparatus-metric-instances">0</span>
                <span class="apparatus-metric-unit">Active</span>
              </div>
              <span class="apparatus-metric-sub" id="apparatus-metric-instances-sub">0 Servers &bull; 0 VPS</span>
            </div>
          </div>

          <!-- Metric 2: INR Balance & Coins -->
          <div class="apparatus-metric-tile">
            <div class="apparatus-metric-icon apparatus-icon-emerald">
              <i class="ri-wallet-3-line"></i>
            </div>
            <div class="apparatus-metric-body">
              <span class="apparatus-metric-label">Cash Balance</span>
              <div class="apparatus-metric-num apparatus-blur-sensitive">
                <span class="apparatus-metric-val" id="apparatus-metric-balance">₹0.00</span>
                <span class="apparatus-metric-unit">INR</span>
              </div>
              <span class="apparatus-metric-sub">
                <span class="apparatus-blur-sensitive"><span id="apparatus-metric-coins">100</span> Referral Points</span> &bull; <a href="javascript:void(0)" class="apparatus-metric-sublink" id="apparatus-ribbon-topup">Top Up</a>
              </span>
            </div>
          </div>

          <!-- Metric 3: Resource Capacity -->
          <div class="apparatus-metric-tile">
            <div class="apparatus-metric-icon apparatus-icon-cyan">
              <i class="ri-cpu-line"></i>
            </div>
            <div class="apparatus-metric-body">
              <span class="apparatus-metric-label">Allocated Resources</span>
              <div class="apparatus-metric-num">
                <span class="apparatus-metric-val" id="apparatus-metric-ram">0.0 GB</span>
                <span class="apparatus-metric-unit">RAM</span>
              </div>
              <span class="apparatus-metric-sub" id="apparatus-metric-sub-res">
                <span id="apparatus-metric-cpu">0% CPU</span> &bull; <span id="apparatus-metric-disk">0.0 GB NVMe</span>
              </span>
            </div>
          </div>

          <!-- Metric 4: Security & Access -->
          <div class="apparatus-metric-tile">
            <div class="apparatus-metric-icon apparatus-icon-pink">
              <i class="ri-shield-check-line"></i>
            </div>
            <div class="apparatus-metric-body">
              <span class="apparatus-metric-label">Security &amp; Role</span>
              <div class="apparatus-metric-num">
                <span class="apparatus-metric-val" id="apparatus-metric-role">${isRootAdmin ? 'Administrator' : 'User'}</span>
              </div>
              <span class="apparatus-metric-sub">
                2FA: <span id="apparatus-metric-2fa" class="${useTotp ? 'status-on' : 'status-off'}">${useTotp ? 'Active &bull; Protected' : 'Disabled'}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Main Content Rows -->
        <div class="apparatus-dash-main-grid">
          <!-- Row 1: Dual Instances Hub & Billing -->
          <div class="apparatus-dash-row apparatus-dash-row-top">
            <!-- Card 1 (Row 1 Left): Dual Instances Hub (Area 4) -->
            <div class="apparatus-card apparatus-card-servers" id="apparatus-area-4">
              <div class="apparatus-card-header apparatus-hub-header">
                <div class="apparatus-tabs-nav">
                  <button type="button" class="apparatus-tab-btn active" data-tab="servers" id="apparatus-tab-btn-servers">
                    <i class="ri-gamepad-line"></i> Game Servers
                  </button>
                  <button type="button" class="apparatus-tab-btn" data-tab="vps" id="apparatus-tab-btn-vps">
                    <i class="ri-server-line"></i> Cloud VPS
                  </button>
                </div>
                <div class="apparatus-hub-actions">
                  <button type="button" class="apparatus-btn apparatus-btn-primary apparatus-btn-sm" id="apparatus-hub-deploy-btn">
                    <i class="ri-add-line"></i> Deploy Server
                  </button>
                </div>
              </div>

              <!-- Tab 1: Game Servers List -->
              <div class="apparatus-tab-pane active" id="apparatus-pane-servers">
                <div class="apparatus-servers-content" id="apparatus-servers-list">
                  <div class="apparatus-loading-state">
                    <div class="apparatus-loader-ring">
                      <div class="apparatus-loader-core"></div>
                    </div>
                    <span class="apparatus-loading-text">Connecting to server instances...</span>
                    <div class="apparatus-skeleton-grid">
                      <div class="apparatus-skeleton-card">
                        <div class="apparatus-skeleton apparatus-skeleton-icon"></div>
                        <div class="apparatus-skeleton-lines">
                          <div class="apparatus-skeleton apparatus-skel-line" style="width: 50%; height: 13px;"></div>
                          <div class="apparatus-skeleton apparatus-skel-line" style="width: 32%; height: 9px; margin-top: 6px;"></div>
                        </div>
                      </div>
                      <div class="apparatus-skeleton-card">
                        <div class="apparatus-skeleton apparatus-skeleton-icon"></div>
                        <div class="apparatus-skeleton-lines">
                          <div class="apparatus-skeleton apparatus-skel-line" style="width: 60%; height: 13px;"></div>
                          <div class="apparatus-skeleton apparatus-skel-line" style="width: 38%; height: 9px; margin-top: 6px;"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tab 2: Cloud VPS Hub -->
              <div class="apparatus-tab-pane" id="apparatus-pane-vps" style="display: none;">
                <div class="apparatus-vps-empty">
                  <div class="apparatus-vps-empty-icon">
                    <i class="ri-server-line"></i>
                  </div>
                  <h4 class="apparatus-vps-empty-title">No Cloud VPS Found</h4>
                  <p class="apparatus-vps-empty-desc">
                    You don't have any active Cloud VPS instances associated with your account.
                  </p>
                  <div class="apparatus-vps-empty-actions">
                    <a href="https://arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-btn apparatus-btn-primary">
                      <i class="ri-add-line"></i> Deploy Cloud VPS
                    </a>
                    <a href="#resource" class="apparatus-btn apparatus-btn-glass" id="apparatus-vps-view-res-btn">
                      <i class="ri-cpu-line"></i> View Resources
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 2 (Row 1 Right): Billing & INR Wallet -->
            <div class="apparatus-card apparatus-card-billing" id="apparatus-area-billing">
              <div class="apparatus-card-header">
                <h2 class="apparatus-card-title">
                  <i class="ri-wallet-3-line" style="color: #34d399;"></i> Billing &amp; Wallet
                </h2>
              </div>

              <div class="apparatus-billing-balances">
                <!-- Cash Wallet -->
                <div class="apparatus-balance-box apparatus-balance-cash">
                  <span class="apparatus-balance-label">Cash Balance</span>
                  <div class="apparatus-balance-value">₹0.00</div>
                  <span class="apparatus-balance-note">Instant UPI / NetBanking / Cards</span>
                </div>

                <!-- Referral Points Balance -->
                <div class="apparatus-balance-box apparatus-balance-coins">
                  <span class="apparatus-balance-label">Referral Points</span>
                  <div class="apparatus-balance-value">
                    <span id="apparatus-coin-count">100</span> <span class="apparatus-balance-unit">Points</span>
                  </div>
                  <span class="apparatus-balance-note">Redeem points for discounts &amp; upgrades</span>
                </div>
              </div>

              <div class="apparatus-billing-actions">
                <button type="button" class="apparatus-btn apparatus-btn-primary apparatus-btn-full" id="apparatus-wallet-topup-btn">
                  <i class="ri-add-circle-line"></i> Top Up Balance (INR ₹)
                </button>

                <!-- User Unique Referral Code Box -->
                <div class="apparatus-referral-card">
                  <div class="apparatus-referral-header">
                    <div class="apparatus-referral-header-left">
                      <div class="apparatus-referral-icon">
                        <i class="ri-gift-line"></i>
                      </div>
                      <div class="apparatus-referral-titles">
                        <span class="apparatus-referral-title">Referral Program</span>
                        <span class="apparatus-referral-subtitle">Earn 10 coins per friend invited</span>
                      </div>
                    </div>
                  </div>

                  <div class="apparatus-referral-box">
                    <div class="apparatus-referral-code-wrap">
                      <span class="apparatus-referral-code-tag">YOUR CODE</span>
                      <code class="apparatus-referral-code" id="apparatus-user-ref-code">${referralCode}</code>
                    </div>
                    <button type="button" class="apparatus-copy-ref-btn" id="apparatus-copy-ref-btn" title="Copy Referral Code">
                      <i class="ri-file-copy-line"></i> <span>Copy</span>
                    </button>
                  </div>

                  <div class="apparatus-referral-note">
                    <i class="ri-sparkling-fill" style="color: #fbbf24; font-size: 0.72rem; margin-right: 4px;"></i>
                    Earn <strong style="color: #fbbf24; margin: 0 3px;">10 Coins</strong> for each friend who joins using your code
                  </div>
                </div>
              </div>

              <!-- Quick Resource Upgrades -->
              <div class="apparatus-upgrades-section">
                <span class="apparatus-upgrades-title">
                  <i class="ri-flashlight-line"></i> Quick Server Upgrades
                </span>
                <div class="apparatus-upgrades-grid">
                  <button type="button" class="apparatus-upgrade-pill" data-upgrade="+2 GB DDR4 RAM" data-price="₹99">
                    <span class="upgrade-name">+2 GB RAM</span>
                    <span class="upgrade-price">₹99/mo</span>
                  </button>
                  <button type="button" class="apparatus-upgrade-pill" data-upgrade="+100% Dedicated CPU" data-price="₹79">
                    <span class="upgrade-name">+100% CPU</span>
                    <span class="upgrade-price">₹79/mo</span>
                  </button>
                  <button type="button" class="apparatus-upgrade-pill" data-upgrade="+20 GB NVMe Storage" data-price="₹49">
                    <span class="upgrade-name">+20 GB NVMe</span>
                    <span class="upgrade-price">₹49/mo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 2: Resource Capacity & Recent Activity (Equal Size 50% / 50%) -->
          <div class="apparatus-dash-row apparatus-dash-row-bottom">
            <!-- Card 3 (Row 2 Left): Resource Capacity -->
            <div class="apparatus-card apparatus-card-resources" id="apparatus-area-resources">
              <div class="apparatus-card-header">
                <h2 class="apparatus-card-title">
                  <i class="ri-dashboard-3-line" style="color: #38bdf8;"></i> Resource Capacity
                </h2>
                <a href="#resource" class="apparatus-link-btn" id="apparatus-dash-resource-link" style="text-decoration: none; font-size: 0.76rem; font-weight: 600; color: #38bdf8; display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 6px; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); transition: all 0.2s ease;">
                  <span>Allocated</span> <i class="ri-arrow-right-line"></i>
                </a>
              </div>

              <div class="apparatus-gauges-list">
                <!-- Memory Bar -->
                <div class="apparatus-gauge-row">
                  <div class="apparatus-gauge-header">
                    <span class="gauge-label"><i class="ri-database-2-line"></i> Memory (RAM)</span>
                    <span class="gauge-val" id="apparatus-gauge-ram-text">0.0 GB Allocated</span>
                  </div>
                  <div class="apparatus-progress-track">
                    <div class="apparatus-progress-bar apparatus-progress-ram" id="apparatus-gauge-ram-bar" style="width: 20%;"></div>
                  </div>
                </div>

                <!-- CPU Bar -->
                <div class="apparatus-gauge-row">
                  <div class="apparatus-gauge-header">
                    <span class="gauge-label"><i class="ri-cpu-line"></i> CPU Compute</span>
                    <span class="gauge-val" id="apparatus-gauge-cpu-text">0% Allocated</span>
                  </div>
                  <div class="apparatus-progress-track">
                    <div class="apparatus-progress-bar apparatus-progress-cpu" id="apparatus-gauge-cpu-bar" style="width: 15%;"></div>
                  </div>
                </div>

                <!-- Disk Bar -->
                <div class="apparatus-gauge-row">
                  <div class="apparatus-gauge-header">
                    <span class="gauge-label"><i class="ri-hard-drive-line"></i> NVMe Storage</span>
                    <span class="gauge-val" id="apparatus-gauge-disk-text">0.0 GB Allocated</span>
                  </div>
                  <div class="apparatus-progress-track">
                    <div class="apparatus-progress-bar apparatus-progress-disk" id="apparatus-gauge-disk-bar" style="width: 25%;"></div>
                  </div>
                </div>
              </div>

              <!-- Blurred Email Quick Row -->
              <div class="apparatus-account-quick-row">
                <span class="apparatus-row-label">Account Email</span>
                <span class="apparatus-email-blurred" id="apparatus-email-val" title="Click or hover to reveal">${email}</span>
              </div>
            </div>

            <!-- Card 4 (Row 2 Right): Recent Activity -->
            <div class="apparatus-card apparatus-card-activity" id="apparatus-area-2">
              <div class="apparatus-card-header">
                <h2 class="apparatus-card-title">
                  <i class="ri-history-line" style="color: #f472b6;"></i> Recent Activity
                </h2>
                <a href="/account/activity" class="apparatus-link">View All <i class="ri-arrow-right-s-line"></i></a>
              </div>
              <div class="apparatus-activity-list" id="apparatus-activity-list" data-lenis-prevent="true">
                <div class="apparatus-loading-state" style="padding: 1.5rem 0.5rem; min-height: 180px;">
                  <div class="apparatus-loader-ring" style="width: 36px; height: 36px;">
                    <div class="apparatus-loader-core" style="width: 10px; height: 10px;"></div>
                  </div>
                  <span class="apparatus-loading-text" style="font-size: 0.8rem;">Retrieving recent activity...</span>
                  <div class="apparatus-skeleton-act-list">
                    <div class="apparatus-skeleton-act-row">
                      <div class="apparatus-skeleton apparatus-skeleton-dot"></div>
                      <div class="apparatus-skeleton apparatus-skel-line" style="width: 55%; height: 11px;"></div>
                      <div class="apparatus-skeleton apparatus-skel-line" style="width: 18%; height: 9px; margin-left: auto;"></div>
                    </div>
                    <div class="apparatus-skeleton-act-row">
                      <div class="apparatus-skeleton apparatus-skeleton-dot"></div>
                      <div class="apparatus-skeleton apparatus-skel-line" style="width: 48%; height: 11px;"></div>
                      <div class="apparatus-skeleton apparatus-skel-line" style="width: 18%; height: 9px; margin-left: auto;"></div>
                    </div>
                    <div class="apparatus-skeleton-act-row">
                      <div class="apparatus-skeleton apparatus-skeleton-dot"></div>
                      <div class="apparatus-skeleton apparatus-skel-line" style="width: 62%; height: 11px;"></div>
                      <div class="apparatus-skeleton apparatus-skel-line" style="width: 18%; height: 9px; margin-left: auto;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const app = document.getElementById('app');
    if (app) {
      app.prepend(dash);
    } else {
      document.body.appendChild(dash);
    }
    triggerDashboardEntrance();

    const toServersBtn = document.getElementById('apparatus-btn-to-servers');
    if (toServersBtn) {
      toServersBtn.addEventListener('click', function (e) {
        const rawP = window.location.pathname || '/';
        const onHome = rawP === '/' || rawP === '/servers' || rawP === '/vps' || rawP === '/dashboard';
        if (!onHome) {
          window.location.href = '/servers';
          return;
        }
        e.preventDefault();
        const hub = document.getElementById('apparatus-area-4');
        if (hub) {
          const tabServers = document.getElementById('apparatus-tab-btn-servers');
          if (tabServers) tabServers.click();
          smoothScrollToElement(hub, true);
        } else {
          if (window.location.pathname !== '/servers') {
            history.pushState(null, '', '/servers');
          }
          applyViewMode();
          smoothScrollToTop();
        }
      });
    }

    const dashResLink = document.getElementById('apparatus-dash-resource-link');
    if (dashResLink) {
      dashResLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.hash = '#resource';
        applyViewMode();
        smoothScrollToTop();
      });
    }

    // Toggle reveal for mobile touch
    const emailEl = document.getElementById('apparatus-email-val');
    if (emailEl) {
      emailEl.addEventListener('click', function () {
        emailEl.classList.toggle('revealed');
      });
    }

    // Initialize interactive tabs, coins, referral code, and billing
    initInstanceTabs();
    initDailyReward();
    initReferralCode();
    initBillingActions();

    // Load dynamic data
    loadDashboardApiData();
  }

  // Initialize the Dedicated Resource Allocation View
  function initResourceView() {
    let resView = document.getElementById('apparatus-resource-view');
    if (resView) return;

    resView = document.createElement('div');
    resView.id = 'apparatus-resource-view';
    resView.className = 'apparatus-resource-view';
    resView.style.display = 'none';

    resView.innerHTML = `
      <div class="apparatus-dashboard-container">
        
        <!-- Top Resource Header -->
        <div class="apparatus-card apparatus-resource-header-card">
          <div class="apparatus-resource-header-left">
            <div class="apparatus-resource-breadcrumbs">
              <a href="/" class="apparatus-breadcrumb-link" id="apparatus-res-back-btn">
                <i class="ri-arrow-left-s-line"></i> Dashboard
              </a>
              <span class="apparatus-breadcrumb-sep">/</span>
              <span class="apparatus-breadcrumb-current">Resources</span>
            </div>
            <h1 class="apparatus-resource-main-title">
              <i class="ri-cpu-line" style="color: #f472b6;"></i> Allocated Resources
            </h1>
            <p class="apparatus-resource-subtitle">
              Overview of your dedicated Game Server and Cloud VPS computing limits.
            </p>
          </div>

          <div class="apparatus-resource-header-right">
            <a href="/" class="apparatus-btn apparatus-btn-glass" id="apparatus-res-back-btn-2">
              <i class="ri-dashboard-line"></i> Back to Dashboard
            </a>
          </div>
        </div>

        <!-- Quick Overview Stats Ribbon -->
        <div class="apparatus-resource-overview-ribbon">
          <div class="apparatus-resource-stat-tile">
            <div class="apparatus-res-stat-icon" style="background: rgba(244, 114, 182, 0.12); color: #f472b6;">
              <i class="ri-gamepad-line"></i>
            </div>
            <div class="apparatus-res-stat-body">
              <span class="apparatus-res-stat-label">Game Server Slots</span>
              <span class="apparatus-res-stat-val" id="res-val-server-slots">0 Slots</span>
            </div>
          </div>

          <div class="apparatus-resource-stat-tile">
            <div class="apparatus-res-stat-icon" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8;">
              <i class="ri-hard-drive-3-line"></i>
            </div>
            <div class="apparatus-res-stat-body">
              <span class="apparatus-res-stat-label">Cloud VPS Slots</span>
              <span class="apparatus-res-stat-val" id="res-val-vps-slots">0 Slots</span>
            </div>
          </div>

          <div class="apparatus-resource-stat-tile">
            <div class="apparatus-res-stat-icon" style="background: rgba(52, 211, 153, 0.12); color: #34d399;">
              <i class="ri-shield-check-line"></i>
            </div>
            <div class="apparatus-res-stat-body">
              <span class="apparatus-res-stat-label">Allocation Status</span>
              <span class="apparatus-res-stat-val" style="color: #34d399;">Active • Verified</span>
            </div>
          </div>
        </div>

        <!-- Live Resource Usage Gauges (Used vs Allocated) -->
        <div class="apparatus-card apparatus-resource-card apparatus-res-gauges-card">
          <div class="apparatus-card-header apparatus-res-card-header">
            <div class="apparatus-res-card-title-group">
              <div class="apparatus-res-badge-icon" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
                <i class="ri-pulse-line"></i>
              </div>
              <div>
                <h2 class="apparatus-card-title">Live Resource Utilization</h2>
                <span class="apparatus-res-card-sub">Real-time quota consumption across active instances</span>
              </div>
            </div>
          </div>

          <div class="apparatus-res-gauges-grid">
            <!-- Gauge 1: RAM -->
            <div class="apparatus-res-gauge-tile">
              <div class="apparatus-res-gauge-head">
                <span class="apparatus-res-gauge-title"><i class="ri-database-2-line" style="color: #f472b6;"></i> Memory (RAM)</span>
                <span class="apparatus-res-gauge-val" id="res-gauge-ram-text">0 MB / 0 MB (0%)</span>
              </div>
              <div class="apparatus-progress-track">
                <div class="apparatus-progress-bar apparatus-progress-ram" id="res-gauge-ram-bar" style="width: 0%;"></div>
              </div>
            </div>

            <!-- Gauge 2: CPU Compute -->
            <div class="apparatus-res-gauge-tile">
              <div class="apparatus-res-gauge-head">
                <span class="apparatus-res-gauge-title"><i class="ri-cpu-line" style="color: #38bdf8;"></i> CPU Compute</span>
                <span class="apparatus-res-gauge-val" id="res-gauge-cpu-text">0% / 0% In Use</span>
              </div>
              <div class="apparatus-progress-track">
                <div class="apparatus-progress-bar apparatus-progress-cpu" id="res-gauge-cpu-bar" style="width: 0%;"></div>
              </div>
            </div>

            <!-- Gauge 3: Disk Storage -->
            <div class="apparatus-res-gauge-tile">
              <div class="apparatus-res-gauge-head">
                <span class="apparatus-res-gauge-title"><i class="ri-hard-drive-2-line" style="color: #34d399;"></i> NVMe Storage</span>
                <span class="apparatus-res-gauge-val" id="res-gauge-disk-text">0 GB / 0 GB Used</span>
              </div>
              <div class="apparatus-progress-track">
                <div class="apparatus-progress-bar apparatus-progress-disk" id="res-gauge-disk-bar" style="width: 0%;"></div>
              </div>
            </div>

            <!-- Gauge 4: Ports & Allocations -->
            <div class="apparatus-res-gauge-tile">
              <div class="apparatus-res-gauge-head">
                <span class="apparatus-res-gauge-title"><i class="ri-share-network-line" style="color: #fbbf24;"></i> Allocations &amp; Ports</span>
                <span class="apparatus-res-gauge-val" id="res-gauge-ports-text">0 / 0 Assigned</span>
              </div>
              <div class="apparatus-progress-track">
                <div class="apparatus-progress-bar apparatus-progress-ports" id="res-gauge-ports-bar" style="width: 0%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Two-Column Main Resource Grid -->
        <div class="apparatus-resource-grid">

          <!-- Column 1: Server Resources -->
          <div class="apparatus-card apparatus-resource-card">
            <div class="apparatus-card-header apparatus-res-card-header">
              <div class="apparatus-res-card-title-group">
                <div class="apparatus-res-badge-icon" style="background: rgba(244, 114, 182, 0.15); color: #f472b6;">
                  <i class="ri-gamepad-line"></i>
                </div>
                <div>
                  <h2 class="apparatus-card-title">Server Resources</h2>
                  <span class="apparatus-res-card-sub">Pterodactyl Game Server Allocation</span>
                </div>
              </div>
            </div>

            <div class="apparatus-res-items-list">
              
              <!-- SERVER SLOTS -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-server-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">SERVER SLOTS</span>
                    <span class="apparatus-res-row-desc">Total deployable game servers</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-slots">0</span>
                </div>
              </div>

              <!-- ALLOCATED PROCESSOR -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-cpu-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">ALLOCATED PROCESSOR</span>
                    <span class="apparatus-res-row-desc">Compute architecture tier</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-processor">0</span>
                </div>
              </div>

              <!-- RAM -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-database-2-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">RAM</span>
                    <span class="apparatus-res-row-desc">Allocated memory capacity</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-ram">0 MB</span>
                </div>
              </div>

              <!-- CPU -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-dashboard-3-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">CPU</span>
                    <span class="apparatus-res-row-desc">Allocated processing limit</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-cpu">0%</span>
                </div>
              </div>

              <!-- DISK -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-hard-drive-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">DISK</span>
                    <span class="apparatus-res-row-desc">Fast NVMe SSD storage</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-disk">0 GB</span>
                </div>
              </div>

              <!-- ALLOCATION -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-node-tree"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">ALLOCATION</span>
                    <span class="apparatus-res-row-desc">Network IP allocation count</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-allocation">0</span>
                </div>
              </div>

              <!-- PORTS -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-router-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">PORTS</span>
                    <span class="apparatus-res-row-desc">Assigned server ports</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-ports">0</span>
                </div>
              </div>

              <!-- DATABASE -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-database-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">DATABASE</span>
                    <span class="apparatus-res-row-desc">MySQL database limit</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val" id="res-server-database">0</span>
                </div>
              </div>

              <!-- VALIDITY -->
              <div class="apparatus-res-row">
                <div class="apparatus-res-row-left">
                  <div class="apparatus-res-row-icon"><i class="ri-calendar-check-line"></i></div>
                  <div class="apparatus-res-row-info">
                    <span class="apparatus-res-row-title">VALIDITY</span>
                    <span class="apparatus-res-row-desc">Starts after activation of server</span>
                  </div>
                </div>
                <div class="apparatus-res-row-right">
                  <span class="apparatus-res-badge-val apparatus-res-badge-validity" id="res-server-validity">0 (after activation)</span>
                </div>
              </div>

            </div>

            <div class="apparatus-res-card-footer">
              <i class="ri-information-line"></i>
              <span>Game server resources are allocated and updated by administrators.</span>
            </div>
          </div>

          <!-- Column 2: Right Column (VPS Resources & Coins) -->
          <div class="apparatus-resource-col-right">

            <!-- Card 2: VPS Resources -->
            <div class="apparatus-card apparatus-resource-card">
              <div class="apparatus-card-header apparatus-res-card-header">
                <div class="apparatus-res-card-title-group">
                  <div class="apparatus-res-badge-icon" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
                    <i class="ri-hard-drive-3-line"></i>
                  </div>
                  <div>
                    <h2 class="apparatus-card-title">VPS Resources</h2>
                    <span class="apparatus-res-card-sub">Cloud KVM Virtual Private Server</span>
                  </div>
                </div>
              </div>

              <div class="apparatus-res-items-list">
                
                <!-- VPS SLOTS -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon"><i class="ri-server-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">VPS SLOTS</span>
                      <span class="apparatus-res-row-desc">Total deployable VPS instances</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" id="res-vps-slots">0</span>
                  </div>
                </div>

                <!-- ALLOCATED NODE -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon"><i class="ri-global-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">ALLOCATED NODE</span>
                      <span class="apparatus-res-row-desc">Assigned hypervisor node</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" id="res-vps-node">0</span>
                  </div>
                </div>

                <!-- RAM -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon"><i class="ri-database-2-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">RAM</span>
                      <span class="apparatus-res-row-desc">Dedicated physical memory</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" id="res-vps-ram">0 GB</span>
                  </div>
                </div>

                <!-- CPU -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon"><i class="ri-dashboard-3-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">CPU</span>
                      <span class="apparatus-res-row-desc">Dedicated virtual CPU cores</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" id="res-vps-cpu">0 vCPU</span>
                  </div>
                </div>

                <!-- DISK -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon"><i class="ri-hard-drive-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">DISK</span>
                      <span class="apparatus-res-row-desc">Dedicated NVMe block storage</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" id="res-vps-disk">0 GB</span>
                  </div>
                </div>

              </div>

              <div class="apparatus-res-card-footer">
                <i class="ri-information-line"></i>
                <span>Cloud VPS instances and node allocations are provisioned by administrators.</span>
              </div>
            </div>

            <!-- Card 3: Reward Coins -->
            <div class="apparatus-card apparatus-resource-card apparatus-res-coins-card">
              <div class="apparatus-card-header apparatus-res-card-header">
                <div class="apparatus-res-card-title-group">
                  <div class="apparatus-res-badge-icon" style="background: rgba(251, 191, 36, 0.15); color: #fbbf24;">
                    <i class="ri-copper-coin-line"></i>
                  </div>
                  <div>
                    <h2 class="apparatus-card-title">Reward Coins</h2>
                    <span class="apparatus-res-card-sub">Available Balance &amp; Earnings</span>
                  </div>
                </div>
              </div>

              <!-- Main Coin Balance Box -->
              <div class="apparatus-res-coins-box">
                <div class="apparatus-res-coins-meta">
                  <span class="apparatus-res-coins-lbl">AVAILABLE COINS</span>
                  <div class="apparatus-res-coins-num">
                    <span id="res-coin-count">0</span>
                  </div>
                </div>
              </div>

              <div class="apparatus-res-items-list">
                
                <!-- Referral Bonus -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon" style="color: #fbbf24;"><i class="ri-gift-2-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">REFERRAL BONUS</span>
                      <span class="apparatus-res-row-desc">Earn per friend who registers with your code</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" style="color: #fbbf24; border-color: rgba(251, 191, 36, 0.3);">+10 Coins</span>
                  </div>
                </div>

                <!-- Daily Bonus -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon" style="color: rgba(255, 255, 255, 0.4);"><i class="ri-calendar-check-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">DAILY BONUS</span>
                      <span class="apparatus-res-row-desc">Claim free bonus coins every 24 hours</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" style="color: rgba(255, 255, 255, 0.45); border-color: rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.04);">NA</span>
                  </div>
                </div>

                <!-- Coin Redemption -->
                <div class="apparatus-res-row">
                  <div class="apparatus-res-row-left">
                    <div class="apparatus-res-row-icon" style="color: #f472b6;"><i class="ri-exchange-funds-line"></i></div>
                    <div class="apparatus-res-row-info">
                      <span class="apparatus-res-row-title">REDEMPTION</span>
                      <span class="apparatus-res-row-desc">Redeem coins for RAM, CPU &amp; discounts</span>
                    </div>
                  </div>
                  <div class="apparatus-res-row-right">
                    <span class="apparatus-res-badge-val" style="color: #f472b6; border-color: rgba(244, 114, 182, 0.3);">Available</span>
                  </div>
                </div>

              </div>

              <div class="apparatus-res-card-footer">
                <i class="ri-information-line"></i>
                <span>Coins can be earned through daily logins and referrals to upgrade server limits.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    `;

    const app = document.getElementById('app') || document.body;
    const dash = document.getElementById('apparatus-dashboard-view');
    if (dash && dash.parentNode) {
      dash.parentNode.insertBefore(resView, dash.nextSibling);
    } else if (app) {
      app.appendChild(resView);
    }

    // Attach back buttons
    const backBtn1 = document.getElementById('apparatus-res-back-btn');
    const backBtn2 = document.getElementById('apparatus-res-back-btn-2');
    function goBackToDash(e) {
      e.preventDefault();
      window.location.hash = '';
      if (window.location.pathname !== '/') {
        history.pushState(null, '', '/');
      }
      applyViewMode();
      smoothScrollToTop();
    }
    if (backBtn1) backBtn1.addEventListener('click', goBackToDash);
    if (backBtn2) backBtn2.addEventListener('click', goBackToDash);

    renderResourcePage();
  }

  // Motion and Static Wallpaper Definitions
  const MOTION_THEMES = [
    'desert',
    'cyberpunk', 'motion-cyberpunk',
    'aurora', 'motion-aurora',
    'nebula', 'motion-nebula',
    'shogun', 'motion-shogun'
  ];

  const MOTION_THEME_CONFIG = {
    'desert': {
      folder: 'desert',
      bgColor: '#F7ABAE',
      titleStyle: 'color: #ffffff; text-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);',
      subStyle: 'color: #ffffff; opacity: 0.75; letter-spacing: 0.45em;'
    },
    'cyberpunk': {
      folder: 'cyberpunk',
      bgColor: '#070214',
      titleStyle: 'color: #ffffff; text-shadow: 0 0 35px #00f0ff, 0 0 70px rgba(0, 240, 255, 0.45);',
      subStyle: 'color: #ff007f; text-shadow: 0 0 20px rgba(255, 0, 127, 0.6); letter-spacing: 0.45em;'
    },
    'aurora': {
      folder: 'aurora',
      bgColor: '#021422',
      titleStyle: 'color: #ffffff; text-shadow: 0 0 35px #00ff88, 0 0 70px rgba(0, 255, 136, 0.45);',
      subStyle: 'color: #38bdf8; text-shadow: 0 0 20px rgba(56, 189, 248, 0.6); letter-spacing: 0.45em;'
    },
    'nebula': {
      folder: 'nebula',
      bgColor: '#04000e',
      titleStyle: 'color: #ffffff; text-shadow: 0 0 35px #c084fc, 0 0 70px rgba(192, 132, 252, 0.5);',
      subStyle: 'color: #38bdf8; text-shadow: 0 0 20px rgba(56, 189, 248, 0.6); letter-spacing: 0.45em;'
    },
    'shogun': {
      folder: 'shogun',
      bgColor: '#100107',
      titleStyle: 'color: #ffffff; text-shadow: 0 0 35px #ff5a22, 0 0 70px rgba(255, 90, 34, 0.5);',
      subStyle: 'color: #fbbf24; text-shadow: 0 0 20px rgba(251, 191, 36, 0.6); letter-spacing: 0.45em;'
    }
  };

  function normalizeMotionKey(key) {
    if (!key || key === 'desert') return 'desert';
    const k = String(key).toLowerCase();
    if (k.includes('cyber')) return 'cyberpunk';
    if (k.includes('aurora')) return 'aurora';
    if (k.includes('nebula')) return 'nebula';
    if (k.includes('shogun')) return 'shogun';
    return 'desert';
  }

  const STATIC_WALLPAPERS = {
    'static-obsidian': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2560&q=85',
    'static-neondusk': 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=2560&q=85',
    'static-electric': 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=2560&q=85',
    'static-cybersilk': 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=2560&q=85',
    'static-amethyst': 'https://images.unsplash.com/photo-1618005198920-f0cb6201c115?auto=format&fit=crop&w=2560&q=85',
    'dark': 'dark'
  };

  // Restarts GSAP floating wave animations on active parallax layers
  function restartParallaxAnimations() {
    if (typeof gsap === 'undefined') return;
    const layers = [1, 2, 3, 4, 5, 6, 7];
    layers.forEach(function (layerNum) {
      gsap.killTweensOf('.layer-' + layerNum);
      gsap.to('.layer-' + layerNum, {
        y: -10 - layerNum * 5,
        duration: 3 + layerNum * 0.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    });
    gsap.killTweensOf('.layer-text');
    gsap.to('.layer-text', {
      y: -20,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  const INLINE_MOTION_SCENES = {
    'cyberpunk': {
      back: `<svg class="parallax-layer layer-bg" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="cyberSky" x1="1024" y1="0" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#050212"/>
        <stop offset="0.45" stop-color="#140428"/>
        <stop offset="0.72" stop-color="#2d0847"/>
        <stop offset="0.9" stop-color="#550b64"/>
        <stop offset="1" stop-color="#7a0d78"/>
      </linearGradient>
      <radialGradient id="cyberHorizonGlow" cx="1024" cy="760" r="800" gradientUnits="userSpaceOnUse">
        <stop stop-color="#ff007f" stop-opacity="0.45"/>
        <stop offset="0.4" stop-color="#ff5500" stop-opacity="0.2"/>
        <stop offset="1" stop-color="#050212" stop-opacity="0"/>
      </radialGradient>
    
</defs>

      <rect width="2048" height="1373" fill="url(#cyberSky)"/>
      <rect x="0" y="400" width="2048" height="973" fill="url(#cyberHorizonGlow)"/>
      <g>
        <line x1="1024" y1="760" x2="-500" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="-360" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="-220" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="-80" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="60" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="200" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="340" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="480" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="620" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="760" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="900" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="1040" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="1180" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="1320" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="1460" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="1600" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="1740" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="1880" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="2020" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="2160" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="2300" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="2440" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="1024" y1="760" x2="2580" y2="1373" stroke="#00f0ff" stroke-width="1.5" opacity="0.3"/><line x1="0" y1="770" x2="2048" y2="770" stroke="#ff007f" stroke-width="2" opacity="0.15"/><line x1="0" y1="785" x2="2048" y2="785" stroke="#ff007f" stroke-width="2" opacity="0.16"/><line x1="0" y1="805" x2="2048" y2="805" stroke="#ff007f" stroke-width="2" opacity="0.17"/><line x1="0" y1="835" x2="2048" y2="835" stroke="#ff007f" stroke-width="2" opacity="0.19"/><line x1="0" y1="875" x2="2048" y2="875" stroke="#ff007f" stroke-width="2" opacity="0.22"/><line x1="0" y1="930" x2="2048" y2="930" stroke="#ff007f" stroke-width="2" opacity="0.26"/><line x1="0" y1="1005" x2="2048" y2="1005" stroke="#ff007f" stroke-width="2" opacity="0.31"/><line x1="0" y1="1100" x2="2048" y2="1100" stroke="#ff007f" stroke-width="2" opacity="0.37"/><line x1="0" y1="1220" x2="2048" y2="1220" stroke="#ff007f" stroke-width="2" opacity="0.45"/><line x1="0" y1="1370" x2="2048" y2="1370" stroke="#ff007f" stroke-width="2" opacity="0.55"/>
      </g>
    
</svg>
<svg class="parallax-layer layer-1" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="cyberSunGrad" x1="1024" y1="330" x2="1024" y2="910" gradientUnits="userSpaceOnUse">
        <stop stop-color="#ff007f"/>
        <stop offset="0.4" stop-color="#ff3366"/>
        <stop offset="0.75" stop-color="#ff7700"/>
        <stop offset="1" stop-color="#ffdd00"/>
      </linearGradient>
      <radialGradient id="sunAura" cx="1024" cy="620" r="450" gradientUnits="userSpaceOnUse">
        <stop stop-color="#ff007f" stop-opacity="0.35"/>
        <stop offset="0.5" stop-color="#ff5500" stop-opacity="0.15"/>
        <stop offset="1" stop-color="#050212" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="sunClip">
        <circle cx="1024" cy="620" r="290"/>
      </clipPath>
    
</defs>

      <circle cx="1024" cy="620" r="450" fill="url(#sunAura)"/>
      <g clip-path="url(#sunClip)">
        <rect x="650" y="300" width="750" height="240" fill="url(#cyberSunGrad)"/><rect x="650" y="540" width="750" height="24" fill="url(#cyberSunGrad)"/><rect x="650" y="568" width="750" height="22" fill="url(#cyberSunGrad)"/><rect x="650" y="597" width="750" height="20" fill="url(#cyberSunGrad)"/><rect x="650" y="627" width="750" height="18" fill="url(#cyberSunGrad)"/><rect x="650" y="658" width="750" height="16" fill="url(#cyberSunGrad)"/><rect x="650" y="690" width="750" height="14" fill="url(#cyberSunGrad)"/><rect x="650" y="723" width="750" height="12" fill="url(#cyberSunGrad)"/><rect x="650" y="757" width="750" height="10" fill="url(#cyberSunGrad)"/><rect x="650" y="792" width="750" height="8" fill="url(#cyberSunGrad)"/><rect x="650" y="828" width="750" height="8" fill="url(#cyberSunGrad)"/><rect x="650" y="867" width="750" height="8" fill="url(#cyberSunGrad)"/><rect x="650" y="909" width="750" height="8" fill="url(#cyberSunGrad)"/>
      </g>
      
      <!-- Flying aerocar 1 -->
      <path d="M420 410 L480 405 L490 412 L430 415 Z" fill="#00f0ff" opacity="0.8"/>
      <line x1="320" y1="413" x2="420" y2="410" stroke="#00f0ff" stroke-width="2" opacity="0.6"/>
      <!-- Flying aerocar 2 -->
      <path d="M1580 340 L1630 336 L1640 342 L1590 344 Z" fill="#ff007f" opacity="0.8"/>
      <line x1="1640" y1="340" x2="1760" y2="337" stroke="#ff007f" stroke-width="2" opacity="0.6"/>
      <!-- Flying aerocar 3 -->
      <path d="M820 280 L860 277 L868 282 L828 284 Z" fill="#00f0ff" opacity="0.6"/>
      <line x1="740" y1="282" x2="820" y2="280" stroke="#00f0ff" stroke-width="1.5" opacity="0.4"/>
    
    
</svg>
<svg class="parallax-layer layer-2" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="cyberSkylineDistant" x1="1024" y1="500" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#140628" stop-opacity="0.9"/>
        <stop offset="1" stop-color="#220b3e"/>
      </linearGradient>
    
</defs>

      <path d="M0 1373 V820 L40 810 L45 680 L50 680 L55 810 L90 820 L120 780 L125 580 L130 580 L135 780 L180 790 L210 750 L213 520 L217 520 L220 750 L260 770 L300 740 L305 630 L310 630 L315 740 L380 770 L410 790 L450 730 L455 600 L460 600 L465 730 L520 780 L560 820 L600 790 L630 760 L633 550 L637 550 L640 760 L690 770 L720 750 L725 610 L730 610 L735 750 L780 780 L820 800 L1220 800 L1260 770 L1265 620 L1270 620 L1275 770 L1320 750 L1323 540 L1327 540 L1330 750 L1380 770 L1420 740 L1425 590 L1430 590 L1435 740 L1490 780 L1530 810 L1580 780 L1610 750 L1613 510 L1617 510 L1620 750 L1670 770 L1710 730 L1715 620 L1720 620 L1725 730 L1780 760 L1820 790 L1860 740 L1865 570 L1870 570 L1875 740 L1930 770 L1970 810 L2048 820 V1373 H0 Z" fill="url(#cyberSkylineDistant)"/>
      
      <circle cx="48" cy="678" r="3" fill="#ff0055"/>
      <circle cx="128" cy="578" r="3.5" fill="#00f0ff"/>
      <circle cx="215" cy="518" r="4" fill="#ff0055"/>
      <circle cx="308" cy="628" r="3" fill="#ffbf00"/>
      <circle cx="458" cy="598" r="3" fill="#00f0ff"/>
      <circle cx="635" cy="548" r="3.5" fill="#ff0055"/>
      <circle cx="728" cy="608" r="3" fill="#00f0ff"/>
      <circle cx="1268" cy="618" r="3" fill="#ff0055"/>
      <circle cx="1325" cy="538" r="4" fill="#00f0ff"/>
      <circle cx="1428" cy="588" r="3" fill="#ffbf00"/>
      <circle cx="1615" cy="508" r="4" fill="#ff0055"/>
      <circle cx="1718" cy="618" r="3" fill="#00f0ff"/>
      <circle cx="1868" cy="568" r="3.5" fill="#ff0055"/>
    
    
</svg>
<svg class="parallax-layer layer-3" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>
  <linearGradient id="cyberMidTowers" x1="1024" y1="650" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
    <stop stop-color="#1b0a33"/>
    <stop offset="0.6" stop-color="#280e46"/>
    <stop offset="1" stop-color="#3d1463"/>
  </linearGradient>
  <pattern id="cyberWindows" width="24" height="28" patternUnits="userSpaceOnUse">
    <rect x="3" y="3" width="7" height="9" rx="1" fill="#00f0ff" opacity="0.75"/>
    <rect x="13" y="3" width="7" height="9" rx="1" fill="#ffdd55" opacity="0.6"/>
    <rect x="3" y="15" width="7" height="9" rx="1" fill="#ff007f" opacity="0.6"/>
    <rect x="13" y="15" width="7" height="9" rx="1" fill="#00f0ff" opacity="0.8"/>
  </pattern>
</defs>
<!-- Tower blocks with stepbacks -->
<polygon points="20,1373 20,830 80,830 80,800 140,800 140,780 200,780 200,850 220,850 220,1373" fill="url(#cyberMidTowers)"/>
<polygon points="20,1373 20,830 80,830 80,800 140,800 140,780 200,780 200,850 220,850 220,1373" fill="url(#cyberWindows)" opacity="0.5"/>

<polygon points="230,1373 230,760 290,760 290,720 350,720 350,760 380,760 380,1373" fill="url(#cyberMidTowers)"/>
<polygon points="230,1373 230,760 290,760 290,720 350,720 350,760 380,760 380,1373" fill="url(#cyberWindows)" opacity="0.45"/>

<polygon points="400,1373 400,810 470,810 470,770 530,770 530,830 570,830 570,1373" fill="url(#cyberMidTowers)"/>
<polygon points="400,1373 400,810 470,810 470,770 530,770 530,830 570,830 570,1373" fill="url(#cyberWindows)" opacity="0.5"/>

<polygon points="590,1373 590,790 660,790 660,750 710,750 710,810 750,810 750,1373" fill="url(#cyberMidTowers)"/>
<polygon points="590,1373 590,790 660,790 660,750 710,750 710,810 750,810 750,1373" fill="url(#cyberWindows)" opacity="0.45"/>

<!-- Skybridge left -->
<rect x="180" y="820" width="120" height="12" fill="#00f0ff" opacity="0.6"/>
<rect x="360" y="780" width="70" height="10" fill="#ff007f" opacity="0.7"/>

<!-- Right cluster -->
<polygon points="1280,1373 1280,810 1340,810 1340,750 1410,750 1410,830 1450,830 1450,1373" fill="url(#cyberMidTowers)"/>
<polygon points="1280,1373 1280,810 1340,810 1340,750 1410,750 1410,830 1450,830 1450,1373" fill="url(#cyberWindows)" opacity="0.45"/>

<polygon points="1470,1373 1470,760 1530,760 1530,710 1600,710 1600,770 1650,770 1650,1373" fill="url(#cyberMidTowers)"/>
<polygon points="1470,1373 1470,760 1530,760 1530,710 1600,710 1600,770 1650,770 1650,1373" fill="url(#cyberWindows)" opacity="0.5"/>

<polygon points="1670,1373 1670,820 1740,820 1740,770 1810,770 1810,840 1860,840 1860,1373" fill="url(#cyberMidTowers)"/>
<polygon points="1670,1373 1670,820 1740,820 1740,770 1810,770 1810,840 1860,840 1860,1373" fill="url(#cyberWindows)" opacity="0.45"/>

<polygon points="1880,1373 1880,790 1950,790 1950,740 2020,740 2020,1373" fill="url(#cyberMidTowers)"/>
<polygon points="1880,1373 1880,790 1950,790 1950,740 2020,740 2020,1373" fill="url(#cyberWindows)" opacity="0.5"/>

<!-- Skybridge right -->
<rect x="1430" y="780" width="60" height="10" fill="#00f0ff" opacity="0.7"/>
<rect x="1620" y="790" width="80" height="12" fill="#ff007f" opacity="0.6"/>
</svg>`,
      front: `<svg class="parallax-layer layer-4" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="cyberLayer4Grad" x1="1024" y1="800" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#120524"/>
        <stop offset="0.7" stop-color="#1e0836"/>
        <stop offset="1" stop-color="#290b47"/>
      </linearGradient>
      <linearGradient id="maglevGlow" x1="0" y1="960" x2="2048" y2="960" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00f0ff"/>
        <stop offset="0.5" stop-color="#ff007f"/>
        <stop offset="1" stop-color="#00f0ff"/>
      </linearGradient>
    
</defs>

      <!-- Left massive tower -->
      <polygon points="0,1373 0,860 180,820 280,820 280,870 340,870 340,1373" fill="url(#cyberLayer4Grad)"/>
      <line x1="180" y1="820" x2="180" y2="1373" stroke="#00f0ff" stroke-width="2" opacity="0.6"/>

      <!-- Center-left tower -->
      <polygon points="460,1373 460,890 560,870 660,870 660,930 720,930 720,1373" fill="url(#cyberLayer4Grad)"/>
      <line x1="560" y1="870" x2="560" y2="1373" stroke="#ff007f" stroke-width="2" opacity="0.6"/>

      <!-- Center-right tower -->
      <polygon points="1320,1373 1320,910 1390,880 1480,880 1480,940 1560,940 1560,1373" fill="url(#cyberLayer4Grad)"/>
      <line x1="1390" y1="880" x2="1390" y2="1373" stroke="#00f0ff" stroke-width="2" opacity="0.6"/>

      <!-- Right massive tower -->
      <polygon points="1680,1373 1680,840 1780,800 1900,800 1900,860 2048,860 2048,1373" fill="url(#cyberLayer4Grad)"/>
      <line x1="1780" y1="800" x2="1780" y2="1373" stroke="#ff007f" stroke-width="2" opacity="0.6"/>
    

      <!-- Monorail support pillars -->
      <rect x="220" y="960" width="30" height="413" fill="#0d041a"/>
      <rect x="580" y="980" width="30" height="393" fill="#0d041a"/>
      <rect x="1000" y="995" width="32" height="378" fill="#0d041a"/>
      <rect x="1440" y="980" width="30" height="393" fill="#0d041a"/>
      <rect x="1820" y="960" width="30" height="413" fill="#0d041a"/>

      <!-- Track beam -->
      <path d="M-50 970 Q1024 1020 2098 970 L2098 995 Q1024 1045 -50 995 Z" fill="#140624"/>
      <!-- Glowing light rail top -->
      <path d="M-50 968 Q1024 1018 2098 968" stroke="url(#maglevGlow)" stroke-width="4" fill="none"/>
      <!-- Glowing light rail bottom -->
      <path d="M-50 995 Q1024 1045 2098 995" stroke="#00f0ff" stroke-width="2" fill="none" opacity="0.8"/>

      <!-- High-speed Maglev Train crossing track -->
      <g>
        <!-- Train body -->
        <path d="M850 975 Q960 985 1070 985 Q1180 985 1250 977 L1248 992 Q1180 1000 1070 1000 Q960 1000 852 990 Z" fill="#e0f7fa"/>
        <!-- Window strip -->
        <path d="M880 979 L1220 982 L1218 986 L880 983 Z" fill="#00f0ff"/>
        <!-- Motion blur trail -->
        <line x1="720" y1="980" x2="850" y2="980" stroke="#00f0ff" stroke-width="3" opacity="0.6"/>
        <line x1="680" y1="984" x2="850" y2="984" stroke="#ff007f" stroke-width="2" opacity="0.5"/>
      </g>
    
</svg>
<svg class="parallax-layer layer-5" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="cyberLayer5Grad" x1="1024" y1="920" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#0b0318"/>
        <stop offset="0.6" stop-color="#150628"/>
        <stop offset="1" stop-color="#1f0836"/>
      </linearGradient>
    
</defs>

      <!-- Left side complex -->
      <polygon points="0,1373 0,980 140,980 140,950 260,950 320,1020 320,1373" fill="url(#cyberLayer5Grad)"/>
      <!-- Rooftop water tank -->
      <rect x="60" y="930" width="50" height="50" rx="4" fill="#080212"/>
      <line x1="70" y1="980" x2="60" y2="1010" stroke="#00f0ff" stroke-width="2"/>
      <line x1="100" y1="980" x2="110" y2="1010" stroke="#00f0ff" stroke-width="2"/>
      <!-- AC ducts -->
      <rect x="160" y="920" width="70" height="30" fill="#0c0418"/>
      <circle cx="195" cy="935" r="10" stroke="#ff007f" stroke-width="2" fill="none"/>

      <!-- Large Neon Billboard Left: "ARIX" -->
      <g>
        <rect x="420" y="950" width="180" height="70" rx="6" fill="#05010d" stroke="#00f0ff" stroke-width="3"/>
        <text x="510" y="998" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="34" fill="#00f0ff" text-anchor="middle" letter-spacing="4">ARIX</text>
        <!-- Support scaffolding -->
        <line x1="440" y1="1020" x2="430" y2="1080" stroke="#00f0ff" stroke-width="2" opacity="0.6"/>
        <line x1="580" y1="1020" x2="590" y2="1080" stroke="#00f0ff" stroke-width="2" opacity="0.6"/>
        <line x1="440" y1="1020" x2="590" y2="1080" stroke="#00f0ff" stroke-width="1.5" opacity="0.4"/>
      </g>

      <!-- Center satellite dishes -->
      <path d="M960 1060 Q990 1020 1030 1030 L1000 1070 Z" fill="#080212" stroke="#00f0ff" stroke-width="1.5"/>
      <line x1="995" y1="1070" x2="995" y2="1110" stroke="#ff007f" stroke-width="2"/>

      <!-- Large Neon Sign Right: "CYBER" -->
      <g>
        <rect x="1460" y="960" width="200" height="75" rx="6" fill="#05010d" stroke="#ff007f" stroke-width="3"/>
        <text x="1560" y="1010" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="32" fill="#ff007f" text-anchor="middle" letter-spacing="5">CYBER</text>
        <line x1="1490" y1="1035" x2="1480" y2="1090" stroke="#ff007f" stroke-width="2" opacity="0.6"/>
        <line x1="1630" y1="1035" x2="1640" y2="1090" stroke="#ff007f" stroke-width="2" opacity="0.6"/>
      </g>

      <!-- Right side complex -->
      <polygon points="1740,1373 1740,1030 1820,970 1940,970 1940,1010 2048,1010 2048,1373" fill="url(#cyberLayer5Grad)"/>
    
</svg>
<svg class="parallax-layer layer-6" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="cyberLayer6Grad" x1="1024" y1="980" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#06020e"/>
        <stop offset="0.6" stop-color="#0f031c"/>
        <stop offset="1" stop-color="#18052a"/>
      </linearGradient>
    
</defs>

      <!-- Left foreground high-rise flank -->
      <polygon points="0,1373 0,1020 180,990 280,1040 380,1040 380,1373" fill="url(#cyberLayer6Grad)"/>

      <!-- Vertical Neon Signboard Left (Glowing Cyan & Pink) -->
      <g>
        <rect x="220" y="1030" width="36" height="220" rx="4" fill="#04010a" stroke="#00f0ff" stroke-width="2.5"/>
        <text x="238" y="1070" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="24" fill="#00f0ff" text-anchor="middle">ク</text>
        <text x="238" y="1115" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="24" fill="#00f0ff" text-anchor="middle">ラ</text>
        <text x="238" y="1160" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="24" fill="#00f0ff" text-anchor="middle">ウ</text>
        <text x="238" y="1205" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="24" fill="#00f0ff" text-anchor="middle">ド</text>
      </g>

      <!-- Right foreground high-rise flank -->
      <polygon points="1680,1373 1680,1050 1780,1010 1920,1010 2048,1040 2048,1373" fill="url(#cyberLayer6Grad)"/>

      <!-- Vertical Neon Signboard Right (Glowing Magenta & Yellow) -->
      <g>
        <rect x="1800" y="1020" width="36" height="240" rx="4" fill="#04010a" stroke="#ff007f" stroke-width="2.5"/>
        <text x="1818" y="1065" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="24" fill="#ff007f" text-anchor="middle">電</text>
        <text x="1818" y="1115" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="24" fill="#ff007f" text-anchor="middle">脳</text>
        <text x="1818" y="1165" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="24" fill="#ff007f" text-anchor="middle">都</text>
        <text x="1818" y="1215" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="24" fill="#ff007f" text-anchor="middle">市</text>
      </g>

      <!-- Crane Arm silhouette on top of building -->
      <path d="M1720 1050 L1720 940 L1600 890 L1840 890 L1720 940" stroke="#00f0ff" stroke-width="2" fill="none" opacity="0.7"/>
      <line x1="1650" y1="890" x2="1650" y2="950" stroke="#00f0ff" stroke-width="1.5" opacity="0.6"/>

      <!-- Catenary high-voltage power cables spanning across -->
      <path d="M0 1060 Q500 1140 1000 1110 Q1500 1080 2048 1070" stroke="#00f0ff" stroke-width="1.8" fill="none" opacity="0.4"/>
      <path d="M0 1090 Q500 1170 1000 1140 Q1500 1110 2048 1100" stroke="#ff007f" stroke-width="1.5" fill="none" opacity="0.35"/>
    
</svg>
<svg class="parallax-layer layer-7" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="cyberLayer7Grad" x1="1024" y1="1100" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#020006"/>
        <stop offset="1" stop-color="#080210"/>
      </linearGradient>
      <radialGradient id="droneGlow" cx="620" cy="1130" r="30" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00f0ff"/>
        <stop offset="0.5" stop-color="#00f0ff" stop-opacity="0.4"/>
        <stop offset="1" stop-color="#020006" stop-opacity="0"/>
      </radialGradient>
    
</defs>

      <!-- Foreground rooftop ledge with edge profile -->
      <polygon points="0,1373 0,1190 480,1190 540,1230 1520,1230 1580,1190 2048,1190 2048,1373" fill="url(#cyberLayer7Grad)"/>

      <!-- Industrial safety railing along the roof edge -->
      <g stroke="#1a0a2a" stroke-width="4">
        <line x1="0" y1="1150" x2="480" y2="1150"/>
        <line x1="0" y1="1170" x2="480" y2="1170"/>
        <line x1="80" y1="1150" x2="80" y2="1190"/>
        <line x1="200" y1="1150" x2="200" y2="1190"/>
        <line x1="320" y1="1150" x2="320" y2="1190"/>
        <line x1="440" y1="1150" x2="440" y2="1190"/>

        <line x1="1580" y1="1150" x2="2048" y2="1150"/>
        <line x1="1580" y1="1170" x2="2048" y2="1170"/>
        <line x1="1640" y1="1150" x2="1640" y2="1190"/>
        <line x1="1760" y1="1150" x2="1760" y2="1190"/>
        <line x1="1880" y1="1150" x2="1880" y2="1190"/>
        <line x1="2000" y1="1150" x2="2000" y2="1190"/>
      </g>

      <!-- Hovering Cyber Surveillance Drone -->
      <g>
        <!-- Drone chassis -->
        <rect x="580" y="1120" width="80" height="20" rx="5" fill="#04010a"/>
        <!-- Rotor arms -->
        <line x1="560" y1="1115" x2="600" y2="1125" stroke="#1f0a33" stroke-width="3"/>
        <line x1="680" y1="1115" x2="640" y2="1125" stroke="#1f0a33" stroke-width="3"/>
        <!-- Rotor discs -->
        <ellipse cx="550" cy="1115" rx="25" ry="3" fill="#00f0ff" opacity="0.6"/>
        <ellipse cx="690" cy="1115" rx="25" ry="3" fill="#00f0ff" opacity="0.6"/>
        <!-- Glowing sensor eye -->
        <circle cx="620" cy="1130" r="16" fill="url(#droneGlow)"/>
        <circle cx="620" cy="1130" r="5" fill="#00f0ff"/>
      </g>

      <!-- Foreground thick cables framing top-left and top-right -->
      <path d="M0 0 Q400 120 700 80" stroke="#04010a" stroke-width="5" fill="none"/>
      <path d="M0 30 Q450 160 720 110" stroke="#04010a" stroke-width="4" fill="none"/>
      <path d="M1400 70 Q1700 140 2048 20" stroke="#04010a" stroke-width="5" fill="none"/>
    
</svg>`
    },
    'aurora': {
      back: `<svg class="parallax-layer layer-bg" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="auroraSky" x1="1024" y1="0" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#01060f"/>
        <stop offset="0.45" stop-color="#021422"/>
        <stop offset="0.75" stop-color="#042638"/>
        <stop offset="1" stop-color="#073a4d"/>
      </linearGradient>
    
</defs>

      <rect width="2048" height="1373" fill="url(#auroraSky)"/>
      <g>
        <circle cx="53" cy="29" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="180" cy="112" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="307" cy="195" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="434" cy="278" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="561" cy="361" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="688" cy="444" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="815" cy="527" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="942" cy="610" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="1069" cy="693" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="1196" cy="76" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="1323" cy="159" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="1450" cy="242" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="1577" cy="325" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="1704" cy="408" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="1831" cy="491" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="1958" cy="574" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="37" cy="657" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="164" cy="40" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="291" cy="123" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="418" cy="206" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="545" cy="289" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="672" cy="372" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="799" cy="455" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="926" cy="538" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="1053" cy="621" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="1180" cy="4" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="1307" cy="87" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="1434" cy="170" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="1561" cy="253" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="1688" cy="336" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="1815" cy="419" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="1942" cy="502" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="21" cy="585" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="148" cy="668" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="275" cy="51" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="402" cy="134" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="529" cy="217" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="656" cy="300" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="783" cy="383" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="910" cy="466" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="1037" cy="549" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="1164" cy="632" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="1291" cy="15" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="1418" cy="98" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="1545" cy="181" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="1672" cy="264" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="1799" cy="347" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="1926" cy="430" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="5" cy="513" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="132" cy="596" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="259" cy="679" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="386" cy="62" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="513" cy="145" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="640" cy="228" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="767" cy="311" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="894" cy="394" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="1021" cy="477" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="1148" cy="560" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="1275" cy="643" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="1402" cy="26" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="1529" cy="109" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="1656" cy="192" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="1783" cy="275" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="1910" cy="358" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="2037" cy="441" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="116" cy="524" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="243" cy="607" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="370" cy="690" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="497" cy="73" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="624" cy="156" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="751" cy="239" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="878" cy="322" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="1005" cy="405" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="1132" cy="488" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="1259" cy="571" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="1386" cy="654" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="1513" cy="37" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="1640" cy="120" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="1767" cy="203" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="1894" cy="286" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="2021" cy="369" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="100" cy="452" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="227" cy="535" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="354" cy="618" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="481" cy="1" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="608" cy="84" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="735" cy="167" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="862" cy="250" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="989" cy="333" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="1116" cy="416" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="1243" cy="499" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="1370" cy="582" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="1497" cy="665" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="1624" cy="48" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="1751" cy="131" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="1878" cy="214" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="2005" cy="297" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="84" cy="380" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="211" cy="463" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="338" cy="546" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="465" cy="629" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="592" cy="12" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="719" cy="95" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="846" cy="178" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="973" cy="261" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="1100" cy="344" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="1227" cy="427" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="1354" cy="510" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="1481" cy="593" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="1608" cy="676" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="1735" cy="59" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="1862" cy="142" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="1989" cy="225" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="68" cy="308" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="195" cy="391" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="322" cy="474" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="449" cy="557" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="576" cy="640" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="703" cy="23" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="830" cy="106" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="957" cy="189" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="1084" cy="272" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="1211" cy="355" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="1338" cy="438" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="1465" cy="521" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="1592" cy="604" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="1719" cy="687" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="1846" cy="70" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="1973" cy="153" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="52" cy="236" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="179" cy="319" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="306" cy="402" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="433" cy="485" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="560" cy="568" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="687" cy="651" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="814" cy="34" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="941" cy="117" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="1068" cy="200" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="1195" cy="283" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="1322" cy="366" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="1449" cy="449" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="1576" cy="532" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="1703" cy="615" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="1830" cy="698" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="1957" cy="81" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="36" cy="164" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="163" cy="247" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="290" cy="330" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="417" cy="413" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="544" cy="496" r="1.0" fill="#e6f7ff" opacity="0.93"/><circle cx="671" cy="579" r="0.8" fill="#e6f7ff" opacity="0.30"/><circle cx="798" cy="662" r="2.4" fill="#e6f7ff" opacity="0.37"/><circle cx="925" cy="45" r="2.2" fill="#e6f7ff" opacity="0.44"/><circle cx="1052" cy="128" r="2.1" fill="#e6f7ff" opacity="0.51"/><circle cx="1179" cy="211" r="1.9" fill="#e6f7ff" opacity="0.58"/><circle cx="1306" cy="294" r="1.7" fill="#e6f7ff" opacity="0.65"/><circle cx="1433" cy="377" r="1.5" fill="#e6f7ff" opacity="0.72"/><circle cx="1560" cy="460" r="1.3" fill="#e6f7ff" opacity="0.79"/><circle cx="1687" cy="543" r="1.2" fill="#e6f7ff" opacity="0.86"/><circle cx="1814" cy="626" r="1.0" fill="#e6f7ff" opacity="0.93"/>
      </g>
    
</svg>
<svg class="parallax-layer layer-1" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="auroraCurtain1" x1="200" y1="150" x2="1800" y2="600" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00ff88" stop-opacity="0.85"/>
        <stop offset="0.4" stop-color="#00e5ff" stop-opacity="0.9"/>
        <stop offset="0.7" stop-color="#38bdf8" stop-opacity="0.6"/>
        <stop offset="1" stop-color="#a855f7" stop-opacity="0.3"/>
      </linearGradient>
      <linearGradient id="auroraCurtain2" x1="100" y1="250" x2="1900" y2="650" gradientUnits="userSpaceOnUse">
        <stop stop-color="#10b981" stop-opacity="0.75"/>
        <stop offset="0.5" stop-color="#06b6d4" stop-opacity="0.85"/>
        <stop offset="1" stop-color="#8b5cf6" stop-opacity="0.4"/>
      </linearGradient>
      <radialGradient id="moonGlow" cx="1720" cy="240" r="120" gradientUnits="userSpaceOnUse">
        <stop stop-color="#e0f2fe" stop-opacity="0.3"/>
        <stop offset="1" stop-color="#021422" stop-opacity="0"/>
      </radialGradient>
    
</defs>

      <!-- Crescent moon with halo -->
      <circle cx="1720" cy="240" r="100" fill="url(#moonGlow)"/>
      <circle cx="1720" cy="240" r="32" fill="#f0f9ff"/>
      <circle cx="1732" cy="235" r="28" fill="#021422"/>

      <!-- Aurora Wave Ribbon 1 (Top Harmonic) -->
      <path d="M-100 360 Q380 140 850 310 Q1320 480 1780 260 Q1980 180 2150 280 L2150 580 Q1780 480 1320 620 Q850 490 -100 580 Z" fill="url(#auroraCurtain1)" opacity="0.8"/>

      <!-- Aurora Wave Ribbon 2 (Lower Harmonic) -->
      <path d="M-100 440 Q450 220 980 390 Q1510 560 2150 340 L2150 680 Q1510 680 980 540 Q450 720 -100 640 Z" fill="url(#auroraCurtain2)" opacity="0.65"/>
    
</svg>
<svg class="parallax-layer layer-2" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="auroraGlaciers" x1="1024" y1="480" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#0a2538"/>
        <stop offset="0.5" stop-color="#0f344c"/>
        <stop offset="1" stop-color="#154260"/>
      </linearGradient>
      <linearGradient id="snowGlow" x1="1024" y1="480" x2="1024" y2="850" gradientUnits="userSpaceOnUse">
        <stop stop-color="#a7f3d0" stop-opacity="0.8"/>
        <stop offset="1" stop-color="#0a2538" stop-opacity="0"/>
      </linearGradient>
    
</defs>

      <path d="
      M0 1373 
      V760 L90 710 L160 740 L260 660 L380 720 L510 590 L620 680 L760 520 L870 660 L990 560 
      L1120 690 L1260 530 L1380 670 L1520 570 L1650 710 L1780 610 L1910 730 L2048 640 
      V1373 H0 Z
    " fill="url(#auroraGlaciers)"/>
      
      <polygon points="510,590 480,680 510,700 550,670" fill="url(#snowGlow)"/>
      <polygon points="760,520 720,620 760,650 800,610" fill="url(#snowGlow)"/>
      <polygon points="990,560 950,650 990,670 1030,640" fill="url(#snowGlow)"/>
      <polygon points="1260,530 1220,630 1260,660 1300,620" fill="url(#snowGlow)"/>
      <polygon points="1520,570 1480,660 1520,680 1560,650" fill="url(#snowGlow)"/>
      <polygon points="1780,610 1740,690 1780,710 1820,680" fill="url(#snowGlow)"/>
    
    
</svg>
<svg class="parallax-layer layer-3" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="auroraMidCliffs" x1="1024" y1="680" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#081e2b"/>
        <stop offset="0.6" stop-color="#0d2b3c"/>
        <stop offset="1" stop-color="#12384e"/>
      </linearGradient>
    
</defs>
<path d="
      M0 1373 
      V840 L120 790 L240 850 L380 770 L520 840 L680 750 L840 830 L980 760 
      L1140 840 L1310 750 L1480 840 L1660 760 L1840 850 L2048 780 
      V1373 H0 Z
    " fill="url(#auroraMidCliffs)"/>
</svg>`,
      front: `<svg class="parallax-layer layer-4" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="fjordWater" x1="1024" y1="840" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#051824"/>
        <stop offset="0.5" stop-color="#092332"/>
        <stop offset="1" stop-color="#0f3448"/>
      </linearGradient>
      <linearGradient id="waterReflection" x1="0" y1="900" x2="2048" y2="900" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00ff88" stop-opacity="0.15"/>
        <stop offset="0.3" stop-color="#00e5ff" stop-opacity="0.3"/>
        <stop offset="0.7" stop-color="#00ff88" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#00e5ff" stop-opacity="0.15"/>
      </linearGradient>
    
</defs>

      <rect y="840" width="2048" height="533" fill="url(#fjordWater)"/>
      <g>
        <ellipse cx="1024" cy="860" rx="400" ry="2" fill="url(#waterReflection)"/><ellipse cx="450" cy="864" rx="160" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1600" cy="866" rx="160" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1024" cy="872" rx="496" ry="2" fill="url(#waterReflection)"/><ellipse cx="450" cy="876" rx="198" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1600" cy="878" rx="198" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1024" cy="884" rx="592" ry="2" fill="url(#waterReflection)"/><ellipse cx="450" cy="888" rx="237" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1600" cy="890" rx="237" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1024" cy="896" rx="688" ry="2" fill="url(#waterReflection)"/><ellipse cx="450" cy="900" rx="275" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1600" cy="902" rx="275" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1024" cy="908" rx="784" ry="2" fill="url(#waterReflection)"/><ellipse cx="450" cy="912" rx="314" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1600" cy="914" rx="314" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1024" cy="920" rx="880" ry="2" fill="url(#waterReflection)"/><ellipse cx="450" cy="924" rx="352" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1600" cy="926" rx="352" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1024" cy="932" rx="976" ry="2" fill="url(#waterReflection)"/><ellipse cx="450" cy="936" rx="390" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1600" cy="938" rx="390" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1024" cy="944" rx="1072" ry="2" fill="url(#waterReflection)"/><ellipse cx="450" cy="948" rx="429" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1600" cy="950" rx="429" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1024" cy="956" rx="1168" ry="2" fill="url(#waterReflection)"/><ellipse cx="450" cy="960" rx="467" ry="1.5" fill="url(#waterReflection)"/><ellipse cx="1600" cy="962" rx="467" ry="1.5" fill="url(#waterReflection)"/>
      </g>
    
</svg>
<svg class="parallax-layer layer-5" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="auroraPinesMid" x1="1024" y1="860" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#041520"/>
        <stop offset="0.5" stop-color="#07202e"/>
        <stop offset="1" stop-color="#0a2a3b"/>
      </linearGradient>
    
</defs>
<path d="M0 1373 V920 L-10 930 L0 904 L10 930 L20 930 L30 904 L40 930 L50 930 L60 908 L70 930 L80 930 L90 910 L100 930 L110 930 L120 908 L130 930 L140 930 L150 902 L160 930 L170 930 L180 896 L190 930 L200 930 L210 894 L220 930 L230 930 L240 900 L250 930 L260 930 L270 909 L280 930 L290 930 L300 917 L310 930 L320 930 L330 921 L340 930 L350 930 L360 918 L370 930 L380 930 L390 915 L400 930 L410 930 L420 914 L430 930 L440 930 L450 918 L460 930 L470 930 L480 926 L490 930 L500 930 L510 930 L520 930 L530 930 L540 928 L550 930 L560 930 L570 920 L580 930 L590 930 L600 911 L610 930 L620 930 L630 904 L640 930 L650 930 L660 904 L670 930 L680 930 L690 908 L700 930 L710 930 L720 910 L730 930 L740 930 L750 908 L760 930 L770 930 L780 902 L790 930 L800 930 L810 895 L820 930 L830 930 L840 894 L850 930 L860 930 L870 900 L880 930 L890 930 L900 910 L910 930 L920 930 L930 917 L940 930 L950 930 L960 921 L970 930 L980 930 L990 918 L1000 930 L1010 930 L1020 914 L1030 930 L1040 930 L1050 914 L1060 930 L1070 930 L1080 919 L1090 930 L1100 930 L1110 926 L1120 930 L1130 930 L1140 930 L1150 930 L1160 930 L1170 927 L1180 930 L1190 930 L1200 919 L1210 930 L1220 930 L1230 910 L1240 930 L1250 930 L1260 904 L1270 930 L1280 930 L1290 904 L1300 930 L1310 930 L1320 908 L1330 930 L1340 930 L1350 910 L1360 930 L1370 930 L1380 908 L1390 930 L1400 930 L1410 901 L1420 930 L1430 930 L1440 895 L1450 930 L1460 930 L1470 894 L1480 930 L1490 930 L1500 900 L1510 930 L1520 930 L1530 910 L1540 930 L1550 930 L1560 918 L1570 930 L1580 930 L1590 920 L1600 930 L1610 930 L1620 918 L1630 930 L1640 930 L1650 914 L1660 930 L1670 930 L1680 914 L1690 930 L1700 930 L1710 919 L1720 930 L1730 930 L1740 926 L1750 930 L1760 930 L1770 930 L1780 930 L1790 930 L1800 927 L1810 930 L1820 930 L1830 918 L1840 930 L1850 930 L1860 910 L1870 930 L1880 930 L1890 904 L1900 930 L1910 930 L1920 904 L1930 930 L1940 930 L1950 908 L1960 930 L1970 930 L1980 910 L1990 930 L2000 930 L2010 908 L2020 930 L2030 930 L2040 901 L2050 930 L2060 930 L2070 895 L2080 930 V1373 H0 Z" fill="url(#auroraPinesMid)"/>
</svg>
<svg class="parallax-layer layer-6" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="auroraCliffsClose" x1="1024" y1="960" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#030e16"/>
        <stop offset="0.5" stop-color="#051722"/>
        <stop offset="1" stop-color="#08202d"/>
      </linearGradient>
    
</defs>

      <!-- Left granite crag -->
      <path d="M0 1373 V940 Q180 960 320 1020 Q440 1080 540 1140 L500 1373 H0 Z" fill="url(#auroraCliffsClose)"/>
      <!-- Wind-swept pine on left rock -->
      <polygon points="280,1020 270,960 280,960 275,920 285,920 280,880 290,920 285,920 295,960 285,960 300,1020" fill="#02080d"/>

      <!-- Right granite crag -->
      <path d="M2048 1373 V950 Q1860 970 1720 1030 Q1600 1090 1500 1160 L1560 1373 H2048 Z" fill="url(#auroraCliffsClose)"/>
      <!-- Wind-swept pine on right rock -->
      <polygon points="1760,1020 1750,950 1760,950 1755,910 1765,910 1760,870 1770,910 1765,910 1775,950 1765,950 1780,1020" fill="#02080d"/>
    
</svg>
<svg class="parallax-layer layer-7" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="cabinWindowGlow" x1="1680" y1="1170" x2="1710" y2="1200" gradientUnits="userSpaceOnUse">
        <stop stop-color="#ffbf00"/>
        <stop offset="1" stop-color="#ff7700"/>
      </linearGradient>
      <radialGradient id="windowHalo" cx="1695" cy="1185" r="45" gradientUnits="userSpaceOnUse">
        <stop stop-color="#ffaa00" stop-opacity="0.4"/>
        <stop offset="1" stop-color="#02080c" stop-opacity="0"/>
      </radialGradient>
    
</defs>

      <!-- Tall ancient pine tree left -->
      <polygon points="120,1373 110,1100 60,1120 110,1040 70,1055 110,980 80,990 110,920 90,930 115,860 125,860 145,930 130,920 155,990 130,980 165,1055 130,1040 180,1120 130,1100 140,1373" fill="#01060a"/>
      <!-- Secondary pine left -->
      <polygon points="40,1373 30,1150 0,1165 30,1100 5,1115 30,1050 15,1060 35,990 45,990 60,1060 45,1050 70,1115 45,1100 80,1165 50,1150 60,1373" fill="#01060a"/>
    

      <!-- Foreground shore -->
      <path d="M0 1373 L0 1260 Q500 1240 1024 1250 Q1600 1260 2048 1220 L2048 1373 Z" fill="#01060a"/>

      <!-- Right foreground pine -->
      <polygon points="1920,1373 1910,1060 1860,1080 1910,1000 1870,1015 1910,940 1880,950 1910,880 1890,890 1915,820 1925,820 1945,890 1930,880 1955,950 1930,940 1965,1015 1930,1000 1980,1080 1930,1060 1940,1373" fill="#01060a"/>

      <!-- Cozy wooden cabin -->
      <g>
        <!-- Cabin roof -->
        <polygon points="1640,1160 1700,1110 1760,1160" fill="#01060a"/>
        <!-- Cabin body -->
        <rect x="1650" y="1160" width="100" height="70" fill="#01060a"/>
        <!-- Window halo and warm glowing window -->
        <circle cx="1695" cy="1185" r="45" fill="url(#windowHalo)"/>
        <rect x="1680" y="1170" width="30" height="30" rx="3" fill="url(#cabinWindowGlow)"/>
        <!-- Window cross pane -->
        <line x1="1695" y1="1170" x2="1695" y2="1200" stroke="#01060a" stroke-width="2"/>
        <line x1="1680" y1="1185" x2="1710" y2="1185" stroke="#01060a" stroke-width="2"/>
      </g>
    
</svg>`
    },
    'nebula': {
      back: `<svg class="parallax-layer layer-bg" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="spaceVoid" x1="1024" y1="0" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#020008"/>
        <stop offset="0.5" stop-color="#08021c"/>
        <stop offset="1" stop-color="#140532"/>
      </linearGradient>
    
</defs>

      <rect width="2048" height="1373" fill="url(#spaceVoid)"/>
      <g>
        <circle cx="31" cy="47" r="0.8" fill="#c084fc" opacity="0.35"/><circle cx="188" cy="156" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="345" cy="265" r="2.0" fill="#ffffff" opacity="0.59"/><circle cx="502" cy="374" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="659" cy="483" r="1.2" fill="#c084fc" opacity="0.83"/><circle cx="816" cy="592" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="973" cy="701" r="2.4" fill="#ffffff" opacity="0.47"/><circle cx="1130" cy="810" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="1287" cy="919" r="1.6" fill="#c084fc" opacity="0.71"/><circle cx="1444" cy="1028" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="1601" cy="1137" r="0.8" fill="#ffffff" opacity="0.35"/><circle cx="1758" cy="1246" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="1915" cy="1355" r="2.0" fill="#c084fc" opacity="0.59"/><circle cx="24" cy="91" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="181" cy="200" r="1.2" fill="#ffffff" opacity="0.83"/><circle cx="338" cy="309" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="495" cy="418" r="2.4" fill="#c084fc" opacity="0.47"/><circle cx="652" cy="527" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="809" cy="636" r="1.6" fill="#ffffff" opacity="0.71"/><circle cx="966" cy="745" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="1123" cy="854" r="0.8" fill="#c084fc" opacity="0.35"/><circle cx="1280" cy="963" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="1437" cy="1072" r="2.0" fill="#ffffff" opacity="0.59"/><circle cx="1594" cy="1181" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="1751" cy="1290" r="1.2" fill="#c084fc" opacity="0.83"/><circle cx="1908" cy="26" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="17" cy="135" r="2.4" fill="#ffffff" opacity="0.47"/><circle cx="174" cy="244" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="331" cy="353" r="1.6" fill="#c084fc" opacity="0.71"/><circle cx="488" cy="462" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="645" cy="571" r="0.8" fill="#ffffff" opacity="0.35"/><circle cx="802" cy="680" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="959" cy="789" r="2.0" fill="#c084fc" opacity="0.59"/><circle cx="1116" cy="898" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="1273" cy="1007" r="1.2" fill="#ffffff" opacity="0.83"/><circle cx="1430" cy="1116" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="1587" cy="1225" r="2.4" fill="#c084fc" opacity="0.47"/><circle cx="1744" cy="1334" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="1901" cy="70" r="1.6" fill="#ffffff" opacity="0.71"/><circle cx="10" cy="179" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="167" cy="288" r="0.8" fill="#c084fc" opacity="0.35"/><circle cx="324" cy="397" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="481" cy="506" r="2.0" fill="#ffffff" opacity="0.59"/><circle cx="638" cy="615" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="795" cy="724" r="1.2" fill="#c084fc" opacity="0.83"/><circle cx="952" cy="833" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="1109" cy="942" r="2.4" fill="#ffffff" opacity="0.47"/><circle cx="1266" cy="1051" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="1423" cy="1160" r="1.6" fill="#c084fc" opacity="0.71"/><circle cx="1580" cy="1269" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="1737" cy="5" r="0.8" fill="#ffffff" opacity="0.35"/><circle cx="1894" cy="114" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="3" cy="223" r="2.0" fill="#c084fc" opacity="0.59"/><circle cx="160" cy="332" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="317" cy="441" r="1.2" fill="#ffffff" opacity="0.83"/><circle cx="474" cy="550" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="631" cy="659" r="2.4" fill="#c084fc" opacity="0.47"/><circle cx="788" cy="768" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="945" cy="877" r="1.6" fill="#ffffff" opacity="0.71"/><circle cx="1102" cy="986" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="1259" cy="1095" r="0.8" fill="#c084fc" opacity="0.35"/><circle cx="1416" cy="1204" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="1573" cy="1313" r="2.0" fill="#ffffff" opacity="0.59"/><circle cx="1730" cy="49" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="1887" cy="158" r="1.2" fill="#c084fc" opacity="0.83"/><circle cx="2044" cy="267" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="153" cy="376" r="2.4" fill="#ffffff" opacity="0.47"/><circle cx="310" cy="485" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="467" cy="594" r="1.6" fill="#c084fc" opacity="0.71"/><circle cx="624" cy="703" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="781" cy="812" r="0.8" fill="#ffffff" opacity="0.35"/><circle cx="938" cy="921" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="1095" cy="1030" r="2.0" fill="#c084fc" opacity="0.59"/><circle cx="1252" cy="1139" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="1409" cy="1248" r="1.2" fill="#ffffff" opacity="0.83"/><circle cx="1566" cy="1357" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="1723" cy="93" r="2.4" fill="#c084fc" opacity="0.47"/><circle cx="1880" cy="202" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="2037" cy="311" r="1.6" fill="#ffffff" opacity="0.71"/><circle cx="146" cy="420" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="303" cy="529" r="0.8" fill="#c084fc" opacity="0.35"/><circle cx="460" cy="638" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="617" cy="747" r="2.0" fill="#ffffff" opacity="0.59"/><circle cx="774" cy="856" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="931" cy="965" r="1.2" fill="#c084fc" opacity="0.83"/><circle cx="1088" cy="1074" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="1245" cy="1183" r="2.4" fill="#ffffff" opacity="0.47"/><circle cx="1402" cy="1292" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="1559" cy="28" r="1.6" fill="#c084fc" opacity="0.71"/><circle cx="1716" cy="137" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="1873" cy="246" r="0.8" fill="#ffffff" opacity="0.35"/><circle cx="2030" cy="355" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="139" cy="464" r="2.0" fill="#c084fc" opacity="0.59"/><circle cx="296" cy="573" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="453" cy="682" r="1.2" fill="#ffffff" opacity="0.83"/><circle cx="610" cy="791" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="767" cy="900" r="2.4" fill="#c084fc" opacity="0.47"/><circle cx="924" cy="1009" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="1081" cy="1118" r="1.6" fill="#ffffff" opacity="0.71"/><circle cx="1238" cy="1227" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="1395" cy="1336" r="0.8" fill="#c084fc" opacity="0.35"/><circle cx="1552" cy="72" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="1709" cy="181" r="2.0" fill="#ffffff" opacity="0.59"/><circle cx="1866" cy="290" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="2023" cy="399" r="1.2" fill="#c084fc" opacity="0.83"/><circle cx="132" cy="508" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="289" cy="617" r="2.4" fill="#ffffff" opacity="0.47"/><circle cx="446" cy="726" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="603" cy="835" r="1.6" fill="#c084fc" opacity="0.71"/><circle cx="760" cy="944" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="917" cy="1053" r="0.8" fill="#ffffff" opacity="0.35"/><circle cx="1074" cy="1162" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="1231" cy="1271" r="2.0" fill="#c084fc" opacity="0.59"/><circle cx="1388" cy="7" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="1545" cy="116" r="1.2" fill="#ffffff" opacity="0.83"/><circle cx="1702" cy="225" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="1859" cy="334" r="2.4" fill="#c084fc" opacity="0.47"/><circle cx="2016" cy="443" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="125" cy="552" r="1.6" fill="#ffffff" opacity="0.71"/><circle cx="282" cy="661" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="439" cy="770" r="0.8" fill="#c084fc" opacity="0.35"/><circle cx="596" cy="879" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="753" cy="988" r="2.0" fill="#ffffff" opacity="0.59"/><circle cx="910" cy="1097" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="1067" cy="1206" r="1.2" fill="#c084fc" opacity="0.83"/><circle cx="1224" cy="1315" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="1381" cy="51" r="2.4" fill="#ffffff" opacity="0.47"/><circle cx="1538" cy="160" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="1695" cy="269" r="1.6" fill="#c084fc" opacity="0.71"/><circle cx="1852" cy="378" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="2009" cy="487" r="0.8" fill="#ffffff" opacity="0.35"/><circle cx="118" cy="596" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="275" cy="705" r="2.0" fill="#c084fc" opacity="0.59"/><circle cx="432" cy="814" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="589" cy="923" r="1.2" fill="#ffffff" opacity="0.83"/><circle cx="746" cy="1032" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="903" cy="1141" r="2.4" fill="#c084fc" opacity="0.47"/><circle cx="1060" cy="1250" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="1217" cy="1359" r="1.6" fill="#ffffff" opacity="0.71"/><circle cx="1374" cy="95" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="1531" cy="204" r="0.8" fill="#c084fc" opacity="0.35"/><circle cx="1688" cy="313" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="1845" cy="422" r="2.0" fill="#ffffff" opacity="0.59"/><circle cx="2002" cy="531" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="111" cy="640" r="1.2" fill="#c084fc" opacity="0.83"/><circle cx="268" cy="749" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="425" cy="858" r="2.4" fill="#ffffff" opacity="0.47"/><circle cx="582" cy="967" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="739" cy="1076" r="1.6" fill="#c084fc" opacity="0.71"/><circle cx="896" cy="1185" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="1053" cy="1294" r="0.8" fill="#ffffff" opacity="0.35"/><circle cx="1210" cy="30" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="1367" cy="139" r="2.0" fill="#c084fc" opacity="0.59"/><circle cx="1524" cy="248" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="1681" cy="357" r="1.2" fill="#ffffff" opacity="0.83"/><circle cx="1838" cy="466" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="1995" cy="575" r="2.4" fill="#c084fc" opacity="0.47"/><circle cx="104" cy="684" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="261" cy="793" r="1.6" fill="#ffffff" opacity="0.71"/><circle cx="418" cy="902" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="575" cy="1011" r="0.8" fill="#c084fc" opacity="0.35"/><circle cx="732" cy="1120" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="889" cy="1229" r="2.0" fill="#ffffff" opacity="0.59"/><circle cx="1046" cy="1338" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="1203" cy="74" r="1.2" fill="#c084fc" opacity="0.83"/><circle cx="1360" cy="183" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="1517" cy="292" r="2.4" fill="#ffffff" opacity="0.47"/><circle cx="1674" cy="401" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="1831" cy="510" r="1.6" fill="#c084fc" opacity="0.71"/><circle cx="1988" cy="619" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="97" cy="728" r="0.8" fill="#ffffff" opacity="0.35"/><circle cx="254" cy="837" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="411" cy="946" r="2.0" fill="#c084fc" opacity="0.59"/><circle cx="568" cy="1055" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="725" cy="1164" r="1.2" fill="#ffffff" opacity="0.83"/><circle cx="882" cy="1273" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="1039" cy="9" r="2.4" fill="#c084fc" opacity="0.47"/><circle cx="1196" cy="118" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="1353" cy="227" r="1.6" fill="#ffffff" opacity="0.71"/><circle cx="1510" cy="336" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="1667" cy="445" r="0.8" fill="#c084fc" opacity="0.35"/><circle cx="1824" cy="554" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="1981" cy="663" r="2.0" fill="#ffffff" opacity="0.59"/><circle cx="90" cy="772" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="247" cy="881" r="1.2" fill="#c084fc" opacity="0.83"/><circle cx="404" cy="990" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="561" cy="1099" r="2.4" fill="#ffffff" opacity="0.47"/><circle cx="718" cy="1208" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="875" cy="1317" r="1.6" fill="#c084fc" opacity="0.71"/><circle cx="1032" cy="53" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="1189" cy="162" r="0.8" fill="#ffffff" opacity="0.35"/><circle cx="1346" cy="271" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="1503" cy="380" r="2.0" fill="#c084fc" opacity="0.59"/><circle cx="1660" cy="489" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="1817" cy="598" r="1.2" fill="#ffffff" opacity="0.83"/><circle cx="1974" cy="707" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="83" cy="816" r="2.4" fill="#c084fc" opacity="0.47"/><circle cx="240" cy="925" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="397" cy="1034" r="1.6" fill="#ffffff" opacity="0.71"/><circle cx="554" cy="1143" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="711" cy="1252" r="0.8" fill="#c084fc" opacity="0.35"/><circle cx="868" cy="1361" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="1025" cy="97" r="2.0" fill="#ffffff" opacity="0.59"/><circle cx="1182" cy="206" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="1339" cy="315" r="1.2" fill="#c084fc" opacity="0.83"/><circle cx="1496" cy="424" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="1653" cy="533" r="2.4" fill="#ffffff" opacity="0.47"/><circle cx="1810" cy="642" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="1967" cy="751" r="1.6" fill="#c084fc" opacity="0.71"/><circle cx="76" cy="860" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="233" cy="969" r="0.8" fill="#ffffff" opacity="0.35"/><circle cx="390" cy="1078" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="547" cy="1187" r="2.0" fill="#c084fc" opacity="0.59"/><circle cx="704" cy="1296" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="861" cy="32" r="1.2" fill="#ffffff" opacity="0.83"/><circle cx="1018" cy="141" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="1175" cy="250" r="2.4" fill="#c084fc" opacity="0.47"/><circle cx="1332" cy="359" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="1489" cy="468" r="1.6" fill="#ffffff" opacity="0.71"/><circle cx="1646" cy="577" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="1803" cy="686" r="0.8" fill="#c084fc" opacity="0.35"/><circle cx="1960" cy="795" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="69" cy="904" r="2.0" fill="#ffffff" opacity="0.59"/><circle cx="226" cy="1013" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="383" cy="1122" r="1.2" fill="#c084fc" opacity="0.83"/><circle cx="540" cy="1231" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="697" cy="1340" r="2.4" fill="#ffffff" opacity="0.47"/><circle cx="854" cy="76" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="1011" cy="185" r="1.6" fill="#c084fc" opacity="0.71"/><circle cx="1168" cy="294" r="2.2" fill="#ffffff" opacity="0.53"/><circle cx="1325" cy="403" r="0.8" fill="#ffffff" opacity="0.35"/><circle cx="1482" cy="512" r="1.4" fill="#ffffff" opacity="0.77"/><circle cx="1639" cy="621" r="2.0" fill="#c084fc" opacity="0.59"/><circle cx="1796" cy="730" r="2.6" fill="#ffffff" opacity="0.41"/><circle cx="1953" cy="839" r="1.2" fill="#ffffff" opacity="0.83"/><circle cx="62" cy="948" r="1.8" fill="#ffffff" opacity="0.65"/><circle cx="219" cy="1057" r="2.4" fill="#c084fc" opacity="0.47"/><circle cx="376" cy="1166" r="1.0" fill="#ffffff" opacity="0.89"/><circle cx="533" cy="1275" r="1.6" fill="#ffffff" opacity="0.71"/><circle cx="690" cy="11" r="2.2" fill="#ffffff" opacity="0.53"/>
      </g>
    
</svg>
<svg class="parallax-layer layer-1" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <radialGradient id="nebulaCore" cx="700" cy="520" r="600" gradientUnits="userSpaceOnUse">
        <stop stop-color="#c084fc" stop-opacity="0.8"/>
        <stop offset="0.35" stop-color="#9333ea" stop-opacity="0.5"/>
        <stop offset="0.7" stop-color="#3b82f6" stop-opacity="0.25"/>
        <stop offset="1" stop-color="#08021c" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="nebulaCyan" cx="1300" cy="450" r="500" gradientUnits="userSpaceOnUse">
        <stop stop-color="#06b6d4" stop-opacity="0.7"/>
        <stop offset="0.4" stop-color="#3b82f6" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#08021c" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="galaxyNucleus" cx="420" cy="300" r="160" gradientUnits="userSpaceOnUse">
        <stop stop-color="#ffffff"/>
        <stop offset="0.2" stop-color="#fde047" stop-opacity="0.9"/>
        <stop offset="0.6" stop-color="#ec4899" stop-opacity="0.5"/>
        <stop offset="1" stop-color="#020008" stop-opacity="0"/>
      </radialGradient>
    
</defs>

      <!-- Main cosmic nebula clouds -->
      <ellipse cx="700" cy="520" rx="600" ry="380" fill="url(#nebulaCore)" transform="rotate(-15 700 520)"/>
      <ellipse cx="1300" cy="450" rx="520" ry="320" fill="url(#nebulaCyan)" transform="rotate(18 1300 450)"/>

      <!-- Distant tilted spiral galaxy -->
      <g transform="rotate(-28 420 300)">
        <ellipse cx="420" cy="300" rx="160" ry="45" fill="url(#galaxyNucleus)"/>
        <ellipse cx="420" cy="300" rx="220" ry="25" stroke="#ec4899" stroke-width="6" fill="none" opacity="0.6"/>
        <ellipse cx="420" cy="300" rx="280" ry="15" stroke="#38bdf8" stroke-width="4" fill="none" opacity="0.4"/>
      </g>
    
</svg>
<svg class="parallax-layer layer-2" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="planetSphere" x1="1400" y1="360" x2="1680" y2="680" gradientUnits="userSpaceOnUse">
        <stop stop-color="#e0e7ff"/>
        <stop offset="0.25" stop-color="#a5b4fc"/>
        <stop offset="0.55" stop-color="#6366f1"/>
        <stop offset="0.85" stop-color="#312e81"/>
        <stop offset="1" stop-color="#0f0e2b"/>
      </linearGradient>
      <linearGradient id="ringGrad" x1="1100" y1="520" x2="2000" y2="520" gradientUnits="userSpaceOnUse">
        <stop stop-color="#c084fc" stop-opacity="0.9"/>
        <stop offset="0.4" stop-color="#38bdf8" stop-opacity="0.8"/>
        <stop offset="0.7" stop-color="#818cf8" stop-opacity="0.85"/>
        <stop offset="1" stop-color="#c084fc" stop-opacity="0.9"/>
      </linearGradient>
    
</defs>

      <g transform="rotate(-16 1560 520)">
        <!-- Back half of rings -->
        <ellipse cx="1560" cy="520" rx="320" ry="58" stroke="url(#ringGrad)" stroke-width="26" fill="none" opacity="0.85"/>
        <ellipse cx="1560" cy="520" rx="360" ry="66" stroke="#38bdf8" stroke-width="12" fill="none" opacity="0.5"/>

        <!-- Gas giant planet sphere -->
        <circle cx="1560" cy="520" r="150" fill="url(#planetSphere)"/>
        
        <!-- Planet atmospheric shadow and cloud band lines -->
        <path d="M1410 520 Q1560 560 1710 520" stroke="#312e81" stroke-width="12" fill="none" opacity="0.6"/>
        <path d="M1410 470 Q1560 510 1710 470" stroke="#4338ca" stroke-width="8" fill="none" opacity="0.5"/>

        <!-- Front half of rings overlapping the planet -->
        <path d="M1240 520 A320 58 0 0 0 1880 520" stroke="url(#ringGrad)" stroke-width="26" fill="none" opacity="0.95"/>
        <path d="M1200 520 A360 66 0 0 0 1920 520" stroke="#38bdf8" stroke-width="12" fill="none" opacity="0.6"/>
      </g>

      <!-- Orbiting Moons -->
      <circle cx="1240" cy="460" r="18" fill="#e2e8f0"/>
      <circle cx="1244" cy="458" r="16" fill="#1e1b4b"/>
      <circle cx="1820" cy="680" r="10" fill="#cbd5e1"/>
    
</svg>
<svg class="parallax-layer layer-3" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="asteroidRock" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#475569"/>
        <stop offset="0.6" stop-color="#1e293b"/>
        <stop offset="1" stop-color="#0f172a"/>
      </linearGradient>
    
</defs>
<g><polygon points="320,658 342,673 335,702 307,698 298,680" fill="url(#asteroidRock)" stroke="#64748b" stroke-width="1.5"/><polygon points="380,706 394,716 390,734 372,731 366,720" fill="url(#asteroidRock)" stroke="#64748b" stroke-width="1.5"/><polygon points="460,642 478,655 473,678 449,674 442,660" fill="url(#asteroidRock)" stroke="#64748b" stroke-width="1.5"/><polygon points="540,698 552,706 548,722 533,720 528,710" fill="url(#asteroidRock)" stroke="#64748b" stroke-width="1.5"/><polygon points="680,614 706,632 698,666 664,661 654,640" fill="url(#asteroidRock)" stroke="#64748b" stroke-width="1.5"/><polygon points="780,674 796,685 791,706 770,703 764,690" fill="url(#asteroidRock)" stroke="#64748b" stroke-width="1.5"/><polygon points="920,610 940,624 934,650 908,646 900,630" fill="url(#asteroidRock)" stroke="#64748b" stroke-width="1.5"/><polygon points="1050,655 1065,666 1060,685 1041,682 1035,670" fill="url(#asteroidRock)" stroke="#64748b" stroke-width="1.5"/><polygon points="1180,616 1204,633 1197,664 1166,659 1156,640" fill="url(#asteroidRock)" stroke="#64748b" stroke-width="1.5"/><polygon points="1320,682 1338,695 1333,718 1309,714 1302,700" fill="url(#asteroidRock)" stroke="#64748b" stroke-width="1.5"/><polygon points="1450,636 1464,646 1460,664 1442,661 1436,650" fill="url(#asteroidRock)" stroke="#64748b" stroke-width="1.5"/><polygon points="1750,700 1770,714 1764,740 1738,736 1730,720" fill="url(#asteroidRock)" stroke="#64748b" stroke-width="1.5"/></g>
</svg>`,
      front: `<svg class="parallax-layer layer-4" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="crystalFacet1" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#c084fc"/>
        <stop offset="1" stop-color="#1e1b4b"/>
      </linearGradient>
      <linearGradient id="crystalFacet2" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#38bdf8"/>
        <stop offset="1" stop-color="#0f172a"/>
      </linearGradient>
    
</defs>

      <!-- Large floating crystalline asteroid left -->
      <g transform="translate(180, 780)">
        <polygon points="0,0 80,-40 140,20 60,80 -20,50" fill="url(#crystalFacet1)" stroke="#c084fc" stroke-width="2"/>
        <polygon points="0,0 60,80 -20,50" fill="#0f0728" opacity="0.6"/>
      </g>
      <!-- Large floating crystalline asteroid right -->
      <g transform="translate(1620, 800)">
        <polygon points="0,-20 90,-50 150,30 70,90 -10,40" fill="url(#crystalFacet2)" stroke="#38bdf8" stroke-width="2"/>
        <polygon points="0,-20 70,90 -10,40" fill="#030b1c" opacity="0.6"/>
      </g>
    
</svg>
<svg class="parallax-layer layer-5" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="lunarSurface" x1="1024" y1="840" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#0e0722"/>
        <stop offset="0.5" stop-color="#180c38"/>
        <stop offset="1" stop-color="#241250"/>
      </linearGradient>
    
</defs>
<path d="
      M0 1373 
      V960 Q180 920 380 950 Q560 980 740 920 Q920 860 1120 930 
      Q1340 1000 1560 910 Q1780 840 2048 930 
      V1373 H0 Z
    " fill="url(#lunarSurface)"/>
</svg>
<svg class="parallax-layer layer-6" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="stationGrad" x1="1024" y1="920" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#080214"/>
        <stop offset="1" stop-color="#14062a"/>
      </linearGradient>
    
</defs>

      <!-- Orbital space station silhouette -->
      <g transform="translate(860, 940)">
        <!-- Central hub -->
        <rect x="140" y="40" width="60" height="120" rx="8" fill="url(#stationGrad)" stroke="#38bdf8" stroke-width="2"/>
        <!-- Habitation ring -->
        <ellipse cx="170" cy="100" rx="140" ry="24" stroke="#c084fc" stroke-width="8" fill="none"/>
        <ellipse cx="170" cy="100" rx="140" ry="24" stroke="#38bdf8" stroke-width="2" fill="none"/>
        <!-- Solar panel wings -->
        <rect x="0" y="75" width="120" height="50" fill="#0f172a" stroke="#00f0ff" stroke-width="1.5"/>
        <line x1="40" y1="75" x2="40" y2="125" stroke="#00f0ff" stroke-width="1"/>
        <line x1="80" y1="75" x2="80" y2="125" stroke="#00f0ff" stroke-width="1"/>
        <rect x="220" y="75" width="120" height="50" fill="#0f172a" stroke="#00f0ff" stroke-width="1.5"/>
        <line x1="260" y1="75" x2="260" y2="125" stroke="#00f0ff" stroke-width="1"/>
        <line x1="300" y1="75" x2="300" y2="125" stroke="#00f0ff" stroke-width="1"/>
        <!-- Communications spire & beacon -->
        <line x1="170" y1="40" x2="170" y2="0" stroke="#c084fc" stroke-width="3"/>
        <circle cx="170" cy="0" r="4" fill="#00f0ff"/>
        <!-- Thruster glows -->
        <circle cx="160" cy="165" r="5" fill="#00f0ff"/>
        <circle cx="180" cy="165" r="5" fill="#00f0ff"/>
      </g>
    
</svg>
<svg class="parallax-layer layer-7" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="cockpitStrut" x1="1024" y1="1050" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#030008"/>
        <stop offset="1" stop-color="#0a0218"/>
      </linearGradient>
    
</defs>

      <!-- Cockpit bottom console rim -->
      <polygon points="0,1373 0,1180 340,1150 780,1220 1268,1220 1708,1150 2048,1180 2048,1373" fill="url(#cockpitStrut)"/>
      <!-- Diagonal windshield structural pillars -->
      <polygon points="0,0 80,0 420,1160 340,1160" fill="url(#cockpitStrut)"/>
      <polygon points="2048,0 1968,0 1628,1160 1708,1160" fill="url(#cockpitStrut)"/>
      <!-- Small instrument lights on console -->
      <circle cx="820" cy="1250" r="4" fill="#00f0ff"/>
      <circle cx="850" cy="1250" r="4" fill="#22c55e"/>
      <circle cx="880" cy="1250" r="4" fill="#ff007f"/>
      <circle cx="1180" cy="1250" r="4" fill="#ffbb00"/>
      <circle cx="1210" cy="1250" r="4" fill="#00f0ff"/>
    
</svg>`
    },
    'shogun': {
      back: `<svg class="parallax-layer layer-bg" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="shogunSky" x1="1024" y1="0" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#0f0106"/>
        <stop offset="0.35" stop-color="#2a0410"/>
        <stop offset="0.6" stop-color="#5c0a1f"/>
        <stop offset="0.82" stop-color="#a81a2f"/>
        <stop offset="0.94" stop-color="#ea580c"/>
        <stop offset="1" stop-color="#fbbf24"/>
      </linearGradient>
    
</defs>
<rect width="2048" height="1373" fill="url(#shogunSky)"/>
</svg>
<svg class="parallax-layer layer-1" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="shogunSun" x1="1024" y1="420" x2="1024" y2="1020" gradientUnits="userSpaceOnUse">
        <stop stop-color="#e11d48"/>
        <stop offset="0.6" stop-color="#f43f5e"/>
        <stop offset="1" stop-color="#fb7185"/>
      </linearGradient>
      <radialGradient id="sunGlowShogun" cx="1024" cy="700" r="420" gradientUnits="userSpaceOnUse">
        <stop stop-color="#e11d48" stop-opacity="0.45"/>
        <stop offset="0.6" stop-color="#ea580c" stop-opacity="0.2"/>
        <stop offset="1" stop-color="#0f0106" stop-opacity="0"/>
      </radialGradient>
    
</defs>

      <circle cx="1024" cy="700" r="420" fill="url(#sunGlowShogun)"/>
      <circle cx="1024" cy="700" r="280" fill="url(#shogunSun)"/>
      
      <!-- Flying crane 1 -->
      <path d="M840 460 Q860 445 880 460 Q910 420 930 460 L870 470 Z" fill="#0f0106"/>
      <!-- Flying crane 2 -->
      <path d="M960 410 Q975 398 990 410 Q1015 375 1030 410 L985 418 Z" fill="#0f0106"/>
      <!-- Flying crane 3 -->
      <path d="M1120 450 Q1135 438 1150 450 Q1175 415 1190 450 L1145 458 Z" fill="#0f0106"/>
    
    
</svg>
<svg class="parallax-layer layer-2" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="fujiMountain" x1="1024" y1="560" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#2d0614"/>
        <stop offset="0.6" stop-color="#450b20"/>
        <stop offset="1" stop-color="#621230"/>
      </linearGradient>
      <linearGradient id="fujiSnow" x1="1024" y1="560" x2="1024" y2="760" gradientUnits="userSpaceOnUse">
        <stop stop-color="#fff1f2"/>
        <stop offset="0.5" stop-color="#fecdd3"/>
        <stop offset="1" stop-color="#fda4af" stop-opacity="0.8"/>
      </linearGradient>
    
</defs>

      <path d="
      M0 1373 
      V920 L580 920 
      Q840 840 960 620 L1024 590 L1088 620 Q1208 840 1468 920 
      L2048 920 V1373 H0 Z
    " fill="url(#fujiMountain)"/>
      
      <path d="M960 620 L1024 590 L1088 620 Q1060 680 1050 710 L1030 670 L1018 730 L1000 680 L980 720 Z" fill="url(#fujiSnow)"/>
    
    
</svg>
<svg class="parallax-layer layer-3" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="hakoneHills" x1="1024" y1="780" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#22040e"/>
        <stop offset="0.5" stop-color="#380819"/>
        <stop offset="1" stop-color="#4f0d25"/>
      </linearGradient>
    
</defs>
<path d="
      M0 1373 
      V880 Q240 830 480 870 Q720 910 960 850 Q1200 790 1440 860 Q1680 920 2048 860 
      V1373 H0 Z
    " fill="url(#hakoneHills)"/>
</svg>`,
      front: `<svg class="parallax-layer layer-4" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="lakeAshi" x1="1024" y1="900" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#140209"/>
        <stop offset="0.5" stop-color="#250412"/>
        <stop offset="1" stop-color="#3a071d"/>
      </linearGradient>
      <linearGradient id="lakeGlow" x1="0" y1="960" x2="2048" y2="960" gradientUnits="userSpaceOnUse">
        <stop stop-color="#f43f5e" stop-opacity="0.1"/>
        <stop offset="0.4" stop-color="#fbbf24" stop-opacity="0.35"/>
        <stop offset="0.6" stop-color="#f43f5e" stop-opacity="0.4"/>
        <stop offset="1" stop-color="#fbbf24" stop-opacity="0.1"/>
      </linearGradient>
    
</defs>

      <rect y="900" width="2048" height="473" fill="url(#lakeAshi)"/>
      <g>
        <ellipse cx="1024" cy="920" rx="350" ry="2.5" fill="url(#lakeGlow)"/><ellipse cx="1024" cy="934" rx="462" ry="2.5" fill="url(#lakeGlow)"/><ellipse cx="1024" cy="948" rx="574" ry="2.5" fill="url(#lakeGlow)"/><ellipse cx="1024" cy="962" rx="686" ry="2.5" fill="url(#lakeGlow)"/><ellipse cx="1024" cy="976" rx="798" ry="2.5" fill="url(#lakeGlow)"/><ellipse cx="1024" cy="990" rx="910" ry="2.5" fill="url(#lakeGlow)"/><ellipse cx="1024" cy="1004" rx="1022" ry="2.5" fill="url(#lakeGlow)"/><ellipse cx="1024" cy="1018" rx="1134" ry="2.5" fill="url(#lakeGlow)"/>
      </g>
    
</svg>
<svg class="parallax-layer layer-5" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="pagodaRidge" x1="1024" y1="940" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#100107"/>
        <stop offset="0.6" stop-color="#1e030f"/>
        <stop offset="1" stop-color="#2e0618"/>
      </linearGradient>
    
</defs>

      <path d="
      M0 1373 V980 Q300 960 600 970 Q900 980 1200 960 Q1600 950 2048 980 V1373 H0 Z
    " fill="url(#pagodaRidge)"/>
      
      <g>
        <!-- Spire finial (sorin) -->
        <line x1="480" y1="800" x2="480" y2="840" stroke="#0a0104" stroke-width="3"/>
        <circle cx="480" cy="800" r="3" fill="#fbbf24"/>
        <!-- Tier 5 -->
        <polygon points="450,852 480,840 510,852" fill="#0a0104"/>
        <rect x="468" y="852" width="24" height="15" fill="#0a0104"/>
        <!-- Tier 4 -->
        <polygon points="442,875 480,864 518,875" fill="#0a0104"/>
        <rect x="464" y="875" width="32" height="16" fill="#0a0104"/>
        <!-- Tier 3 -->
        <polygon points="434,900 480,888 526,900" fill="#0a0104"/>
        <rect x="460" y="900" width="40" height="18" fill="#0a0104"/>
        <!-- Tier 2 -->
        <polygon points="426,928 480,915 534,928" fill="#0a0104"/>
        <rect x="456" y="928" width="48" height="20" fill="#0a0104"/>
        <!-- Tier 1 Base -->
        <polygon points="418,958 480,944 542,958" fill="#0a0104"/>
        <rect x="452" y="958" width="56" height="25" fill="#0a0104"/>
      </g>
    
    
</svg>
<svg class="parallax-layer layer-6" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="toriiGrad" x1="1024" y1="940" x2="1024" y2="1373" gradientUnits="userSpaceOnUse">
        <stop stop-color="#0a0104"/>
        <stop offset="1" stop-color="#18020a"/>
      </linearGradient>
    
</defs>

      <!-- Left shoreline rock outcrop with stone lantern (toro) -->
      <path d="M0 1373 V1040 Q160 1020 280 1090 Q400 1160 480 1373 H0 Z" fill="url(#toriiGrad)"/>
      <path d="M1200 1373 Q1320 1080 1620 1080 Q1880 1080 2048 1040 V1373 H1200 Z" fill="url(#toriiGrad)"/>
      
      <g>
        <!-- Top curved lintel (kasagi) -->
        <path d="M1350 928 Q1460 910 1570 928 L1565 942 Q1460 926 1355 942 Z" fill="#b91c1c"/>
        <!-- Sub-lintel (shimaki) -->
        <rect x="1365" y="940" width="190" height="10" fill="#b91c1c"/>
        <!-- Tie beam (nuki) -->
        <rect x="1375" y="970" width="170" height="12" fill="#b91c1c"/>
        <!-- Central strut (gakuzuka) with tablet -->
        <rect x="1452" y="946" width="16" height="28" fill="#0a0104"/>
        <!-- Main pillars (hashira) slightly leaning inward -->
        <polygon points="1395,948 1407,948 1412,1100 1392,1100" fill="#991b1b"/>
        <polygon points="1513,948 1525,948 1528,1100 1508,1100" fill="#991b1b"/>
        <!-- Torii water reflection -->
        <ellipse cx="1460" cy="1105" rx="70" ry="4" fill="#fbbf24" opacity="0.3"/>
      </g>
    
    
</svg>
<svg class="parallax-layer layer-7" viewBox="0 0 2048 1373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>

      <linearGradient id="sakuraPetal" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#fff1f2"/>
        <stop offset="0.6" stop-color="#fbcfe8"/>
        <stop offset="1" stop-color="#f43f5e"/>
      </linearGradient>
    
</defs>

      <path d="M2048 0 Q1800 60 1640 180 Q1480 300 1380 260 Q1300 230 1200 290 Q1120 340 1050 320" stroke="#080104" stroke-width="18" stroke-linecap="round" fill="none"/>
      <!-- Sub-branches -->
      <path d="M1640 180 Q1560 120 1480 140" stroke="#080104" stroke-width="9" stroke-linecap="round" fill="none"/>
      <path d="M1480 300 Q1420 380 1340 410" stroke="#080104" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M1200 290 Q1160 380 1100 420" stroke="#080104" stroke-width="7" stroke-linecap="round" fill="none"/>
    
<circle cx="1656.0" cy="180.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1644.9" cy="195.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1627.1" cy="189.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1627.1" cy="170.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1644.9" cy="164.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1640" cy="180" r="4" fill="#fbbf24"/><circle cx="1576.0" cy="120.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1564.9" cy="135.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1547.1" cy="129.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1547.1" cy="110.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1564.9" cy="104.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1560" cy="120" r="4" fill="#fbbf24"/><circle cx="1496.0" cy="140.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1484.9" cy="155.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1467.1" cy="149.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1467.1" cy="130.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1484.9" cy="124.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1480" cy="140" r="4" fill="#fbbf24"/><circle cx="1536.0" cy="220.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1524.9" cy="235.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1507.1" cy="229.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1507.1" cy="210.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1524.9" cy="204.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1520" cy="220" r="4" fill="#fbbf24"/><circle cx="1436.0" cy="380.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1424.9" cy="395.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1407.1" cy="389.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1407.1" cy="370.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1424.9" cy="364.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1420" cy="380" r="4" fill="#fbbf24"/><circle cx="1356.0" cy="410.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1344.9" cy="425.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1327.1" cy="419.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1327.1" cy="400.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1344.9" cy="394.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1340" cy="410" r="4" fill="#fbbf24"/><circle cx="1396.0" cy="260.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1384.9" cy="275.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1367.1" cy="269.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1367.1" cy="250.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1384.9" cy="244.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1380" cy="260" r="4" fill="#fbbf24"/><circle cx="1216.0" cy="290.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1204.9" cy="305.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1187.1" cy="299.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1187.1" cy="280.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1204.9" cy="274.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1200" cy="290" r="4" fill="#fbbf24"/><circle cx="1176.0" cy="380.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1164.9" cy="395.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1147.1" cy="389.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1147.1" cy="370.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1164.9" cy="364.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1160" cy="380" r="4" fill="#fbbf24"/><circle cx="1116.0" cy="420.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1104.9" cy="435.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1087.1" cy="429.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1087.1" cy="410.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1104.9" cy="404.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1100" cy="420" r="4" fill="#fbbf24"/><circle cx="1066.0" cy="320.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1054.9" cy="335.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1037.1" cy="329.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1037.1" cy="310.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1054.9" cy="304.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1050" cy="320" r="4" fill="#fbbf24"/><circle cx="1036.0" cy="360.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1024.9" cy="375.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1007.1" cy="369.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1007.1" cy="350.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1024.9" cy="344.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1020" cy="360" r="4" fill="#fbbf24"/><circle cx="1296.0" cy="240.0" r="9" fill="url(#sakuraPetal)"/><circle cx="1284.9" cy="255.2" r="9" fill="url(#sakuraPetal)"/><circle cx="1267.1" cy="249.4" r="9" fill="url(#sakuraPetal)"/><circle cx="1267.1" cy="230.6" r="9" fill="url(#sakuraPetal)"/><circle cx="1284.9" cy="224.8" r="9" fill="url(#sakuraPetal)"/><circle cx="1280" cy="240" r="4" fill="#fbbf24"/>
<ellipse cx="920" cy="480" rx="10" ry="5" fill="url(#sakuraPetal)" transform="rotate(-25 920 480)" opacity="0.85"/><ellipse cx="840" cy="560" rx="10" ry="5" fill="url(#sakuraPetal)" transform="rotate(15 840 560)" opacity="0.85"/><ellipse cx="760" cy="680" rx="10" ry="5" fill="url(#sakuraPetal)" transform="rotate(-40 760 680)" opacity="0.85"/><ellipse cx="680" cy="790" rx="10" ry="5" fill="url(#sakuraPetal)" transform="rotate(30 680 790)" opacity="0.85"/><ellipse cx="560" cy="920" rx="10" ry="5" fill="url(#sakuraPetal)" transform="rotate(-15 560 920)" opacity="0.85"/><ellipse cx="1280" cy="520" rx="10" ry="5" fill="url(#sakuraPetal)" transform="rotate(35 1280 520)" opacity="0.85"/><ellipse cx="1380" cy="640" rx="10" ry="5" fill="url(#sakuraPetal)" transform="rotate(-20 1380 640)" opacity="0.85"/><ellipse cx="1480" cy="760" rx="10" ry="5" fill="url(#sakuraPetal)" transform="rotate(45 1480 760)" opacity="0.85"/>
<path d="M0 1373 V1260 Q600 1240 1024 1250 Q1500 1260 2048 1230 V1373 H0 Z" fill="#060103"/>
</svg>`
    },
  };

  // Renders dynamic multi-layered vector SVG scenes for motion themes (all 7+ layers)
  function renderMotionTheme(theme) {
    const parallaxEl = document.getElementById('apparatus-parallax');
    const wrapper = document.getElementById('apparatus-desert-wrapper');
    if (!parallaxEl) return;

    const normKey = normalizeMotionKey(theme);
    const cfg = MOTION_THEME_CONFIG[normKey] || MOTION_THEME_CONFIG['desert'];

    let bgTitle = document.getElementById('apparatus-bg-title');
    let bgSubtitle = document.getElementById('apparatus-bg-subtitle');
    const titleText = (bgTitle && bgTitle.textContent) || 'ARIXBYTE';
    const subText = (bgSubtitle && bgSubtitle.textContent) || 'CLOUD & INFRASTRUCTURES';

    if (wrapper) {
      wrapper.style.backgroundColor = cfg.bgColor;
      document.documentElement.style.setProperty('--apparatus-bg-color', cfg.bgColor);
    }

    const scene = INLINE_MOTION_SCENES[normKey];
    if (scene) {
      parallaxEl.innerHTML = `
        ${scene.back}
        <div class="parallax-layer layer-text">
          <h1 class="background-title" id="apparatus-bg-title" style="${cfg.titleStyle}">${titleText}</h1>
          <p class="background-subtitle" id="apparatus-bg-subtitle" style="${cfg.subStyle}">${subText}</p>
        </div>
        ${scene.front}
      `;
    } else {
      // Default: Desert Sunset
      const folder = 'desert';
      parallaxEl.innerHTML = `
        <img src="/themes/apparatus/${folder}/img-bg.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/${folder}/img-bg.svg';}" alt="" class="parallax-layer layer-bg" />
        <img src="/themes/apparatus/${folder}/img-1.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/${folder}/img-1.svg';}" alt="" class="parallax-layer layer-1" />
        <img src="/themes/apparatus/${folder}/img-2.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/${folder}/img-2.svg';}" alt="" class="parallax-layer layer-2" />
        <img src="/themes/apparatus/${folder}/img-3.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/${folder}/img-3.svg';}" alt="" class="parallax-layer layer-3" />
        
        <div class="parallax-layer layer-text">
          <h1 class="background-title" id="apparatus-bg-title" style="${cfg.titleStyle}">${titleText}</h1>
          <p class="background-subtitle" id="apparatus-bg-subtitle" style="${cfg.subStyle}">${subText}</p>
        </div>

        <img src="/themes/apparatus/${folder}/img-4.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/${folder}/img-4.svg';}" alt="" class="parallax-layer layer-4" />
        <img src="/themes/apparatus/${folder}/img-5.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/${folder}/img-5.svg';}" alt="" class="parallax-layer layer-5" />
        <img src="/themes/apparatus/${folder}/img-6.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/${folder}/img-6.svg';}" alt="" class="parallax-layer layer-6" />
        <img src="/themes/apparatus/${folder}/img-7.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/${folder}/img-7.svg';}" alt="" class="parallax-layer layer-7" />
      `;
    }

    restartParallaxAnimations();
  }

  // Wallpaper Engine Switcher (Motion Parallax vs Static HD)
  function applyWallpaper(wp) {
    const customBg = document.getElementById('apparatus-custom-bg');
    const parallaxEl = document.getElementById('apparatus-parallax');
    const isMotion = !wp || MOTION_THEMES.includes(wp) || ['desert', 'cyberpunk', 'aurora', 'nebula', 'shogun'].some(k => String(wp).includes(k));

    if (isMotion) {
      const motionKey = (!wp || wp === 'desert') ? 'desert' : normalizeMotionKey(wp);
      document.body.classList.remove('apparatus-has-custom-wallpaper');
      document.body.classList.add('apparatus-has-motion-wallpaper');
      if (customBg) {
        customBg.style.display = 'none';
        customBg.style.backgroundImage = 'none';
      }
      if (parallaxEl) {
        parallaxEl.style.display = 'block';
        parallaxEl.style.opacity = '1';
        parallaxEl.style.visibility = 'visible';
      }
      renderMotionTheme(motionKey);
    } else {
      document.body.classList.remove('apparatus-has-motion-wallpaper');
      document.body.classList.add('apparatus-has-custom-wallpaper');
      if (parallaxEl) {
        parallaxEl.style.display = 'none';
        parallaxEl.style.opacity = '0';
      }
      if (customBg) {
        customBg.style.display = 'block';
        if (wp === 'dark') {
          customBg.style.background = 'radial-gradient(circle at 50% 20%, #1e1933 0%, #0d0b14 100%)';
          customBg.style.backgroundImage = '';
        } else {
          const imgUrl = STATIC_WALLPAPERS[wp] || wp;
          customBg.style.background = '#0a0a10';
          customBg.style.backgroundImage = 'url("' + imgUrl + '")';
        }
      }
    }
  }

  // Global Settings Application
  function applyGlobalStoredSettings() {
    // 1. Privacy Mode: DEFAULT IS TRUE (BLURRED)
    const isPrivacy = localStorage.getItem('apparatus_privacy') !== 'false';
    if (isPrivacy) {
      document.body.classList.add('apparatus-privacy-active');
    } else {
      document.body.classList.remove('apparatus-privacy-active');
    }

    // 2. Wallpaper
    const wp = localStorage.getItem('apparatus_wallpaper') || 'desert';
    applyWallpaper(wp);

    // 3. Frosted Glass Blur
    const blur = localStorage.getItem('apparatus_glass_blur') || '16px';
    document.documentElement.style.setProperty('--apparatus-glass-blur', blur);

    // 4. Low-Spec Mode
    const isLowSpec = localStorage.getItem('apparatus_low_spec') === 'true';
    if (isLowSpec) {
      document.body.classList.add('apparatus-low-spec');
    } else {
      document.body.classList.remove('apparatus-low-spec');
    }

    // 5. Reduce Motion
    const isReduceMotion = localStorage.getItem('apparatus_reduce_motion') === 'true';
    if (isReduceMotion) {
      document.body.classList.add('apparatus-reduce-motion');
    } else {
      document.body.classList.remove('apparatus-reduce-motion');
    }

    // 6. Parallax Motion
    const isParallax = localStorage.getItem('apparatus_parallax') !== 'false';
    if (!isParallax) {
      document.body.classList.add('apparatus-no-parallax');
    } else {
      document.body.classList.remove('apparatus-no-parallax');
    }
  }

  // Synchronize Settings Page UI elements with storage
  function renderSettingsPage() {
    const isPrivacy = localStorage.getItem('apparatus_privacy') !== 'false';
    const privToggle = document.getElementById('apparatus-setting-privacy-toggle');
    const privBadge = document.getElementById('apparatus-privacy-status-badge');
    if (privToggle) privToggle.checked = isPrivacy;
    if (privBadge) {
      privBadge.textContent = isPrivacy ? 'Blurred (Active)' : 'Visible (Disabled)';
      privBadge.className = 'apparatus-setting-badge apparatus-badge-privacy ' + (isPrivacy ? 'active' : 'inactive');
    }

    const currentWp = localStorage.getItem('apparatus_wallpaper') || 'desert';
    const wpCards = document.querySelectorAll('.apparatus-wp-preset-card');
    let matchedPreset = false;
    wpCards.forEach(function (c) {
      const cardWp = c.getAttribute('data-wp');
      const isCardMotion = MOTION_THEMES.includes(cardWp);
      const isCurMotion = MOTION_THEMES.includes(currentWp);
      if (cardWp === currentWp || (isCardMotion && isCurMotion && normalizeMotionKey(cardWp) === normalizeMotionKey(currentWp))) {
        c.classList.add('active');
        matchedPreset = true;
      } else {
        c.classList.remove('active');
      }
    });

    const customWpInput = document.getElementById('apparatus-custom-wp-input');
    if (customWpInput) {
      if (!matchedPreset && !MOTION_THEMES.includes(currentWp) && !STATIC_WALLPAPERS[currentWp]) {
        customWpInput.value = currentWp;
      } else {
        customWpInput.value = '';
      }
    }

    const currentBlur = localStorage.getItem('apparatus_glass_blur') || '16px';
    const blurBtns = document.querySelectorAll('.apparatus-blur-opt-btn');
    blurBtns.forEach(function (b) {
      if (b.getAttribute('data-blur') === currentBlur) b.classList.add('active');
      else b.classList.remove('active');
    });

    const parallaxToggle = document.getElementById('apparatus-setting-parallax-toggle');
    if (parallaxToggle) parallaxToggle.checked = localStorage.getItem('apparatus_parallax') !== 'false';

    const lowSpecToggle = document.getElementById('apparatus-setting-lowspec-toggle');
    if (lowSpecToggle) lowSpecToggle.checked = localStorage.getItem('apparatus_low_spec') === 'true';

    const redMotionToggle = document.getElementById('apparatus-setting-reducemotion-toggle');
    if (redMotionToggle) redMotionToggle.checked = localStorage.getItem('apparatus_reduce_motion') === 'true';

    const soundToggle = document.getElementById('apparatus-setting-sound-toggle');
    if (soundToggle) soundToggle.checked = localStorage.getItem('apparatus_sound') === 'true';

    const toastToggle = document.getElementById('apparatus-setting-toasts-toggle');
    if (toastToggle) toastToggle.checked = localStorage.getItem('apparatus_toast_enabled') !== 'false';
  }

  // Initialize the Dedicated Panel Settings View
  function initSettingsView() {
    let setView = document.getElementById('apparatus-settings-view');
    if (setView) return;

    setView = document.createElement('div');
    setView.id = 'apparatus-settings-view';
    setView.className = 'apparatus-settings-view';
    setView.style.display = 'none';

    setView.innerHTML = `
      <div class="apparatus-dashboard-container">
        
        <!-- Top Settings Header -->
        <div class="apparatus-card apparatus-resource-header-card apparatus-settings-header-card">
          <div class="apparatus-resource-header-left">
            <div class="apparatus-resource-breadcrumbs">
              <a href="/" class="apparatus-breadcrumb-link" id="apparatus-set-back-btn">
                <i class="ri-arrow-left-s-line"></i> Dashboard
              </a>
              <span class="apparatus-breadcrumb-sep">/</span>
              <span class="apparatus-breadcrumb-current">Panel Settings</span>
            </div>
            <h1 class="apparatus-resource-main-title">
              <i class="ri-settings-3-line" style="color: #a78bfa;"></i> Panel Settings
            </h1>
            <p class="apparatus-resource-subtitle">
              Configure client privacy, visual appearance, themes, and personal interface preferences.
            </p>
          </div>

          <div class="apparatus-resource-header-right">
            <a href="/" class="apparatus-btn apparatus-btn-glass" id="apparatus-set-back-btn-2">
              <i class="ri-dashboard-line"></i> Back to Dashboard
            </a>
          </div>
        </div>

        <!-- Settings Cards Grid -->
        <div class="apparatus-settings-grid">
          
          <!-- CARD 1: PRIVACY PROTECTION (HIGHLIGHTED) -->
          <div class="apparatus-card apparatus-setting-card apparatus-setting-card-privacy">
            <div class="apparatus-setting-card-head">
              <div class="apparatus-setting-icon-box" style="background: rgba(167, 139, 250, 0.15); color: #c4b5fd;">
                <i class="ri-eye-off-line"></i>
              </div>
              <div class="apparatus-setting-title-meta">
                <div class="apparatus-setting-title-row">
                  <h2 class="apparatus-setting-title">Privacy</h2>
                  <span class="apparatus-setting-badge apparatus-badge-privacy active" id="apparatus-privacy-status-badge">Blurred (Active)</span>
                </div>
                <p class="apparatus-setting-desc">Configure privacy settings for sensitive information across the panel.</p>
              </div>
              <div class="apparatus-setting-toggle-wrap">
                <label class="apparatus-switch">
                  <input type="checkbox" id="apparatus-setting-privacy-toggle" checked>
                  <span class="apparatus-slider"></span>
                </label>
              </div>
            </div>

            <div class="apparatus-setting-body">
              <p class="apparatus-setting-explanation">
                Automatically obscures sensitive metrics including IP addresses, ports, account email, currency balances, and referral codes across all pages.
                <strong>Hover your cursor over any blurred element to temporarily reveal it.</strong>
              </p>
            </div>
          </div>

          <!-- CARD 2: APPEARANCE & WALLPAPERS -->
          <div class="apparatus-card apparatus-setting-card">
            <div class="apparatus-setting-card-head">
              <div class="apparatus-setting-icon-box" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
                <i class="ri-palette-line"></i>
              </div>
              <div class="apparatus-setting-title-meta">
                <h2 class="apparatus-setting-title">Appearance &amp; Theme Wallpapers</h2>
                <p class="apparatus-setting-desc">Choose from animated multi-layer motion scenes or curated ultra-HD static backgrounds.</p>
              </div>
            </div>

            <div class="apparatus-setting-body">
              
              <!-- CATEGORY 1: MOTION BACKGROUNDS -->
              <div class="apparatus-wp-section">
                <div class="apparatus-wp-section-head">
                  <div class="apparatus-wp-section-title-wrap">
                    <span class="apparatus-setting-sublabel" style="margin-bottom: 0;">Motion Backgrounds</span>
                    <span class="apparatus-wp-section-badge badge-motion"><i class="ri-movie-line"></i> Animated • 3D Depth</span>
                  </div>
                  <span class="apparatus-wp-section-hint">Multi-layered vector scenes with continuous floating waves and 3D mouse parallax tracking.</span>
                </div>

                <div class="apparatus-wallpaper-presets-grid" id="apparatus-motion-presets">
                  
                  <!-- Motion 1: Desert Sunset (Default) -->
                  <div class="apparatus-wp-preset-card active" data-wp="desert">
                    <div class="apparatus-wp-preview apparatus-wp-preview-desert">
                      <span class="apparatus-wp-badge">Default</span>
                      <span class="apparatus-motion-chip"><i class="ri-sparkling-fill"></i> 7 Layers</span>
                    </div>
                    <div class="apparatus-wp-meta">
                      <span class="apparatus-wp-name">Desert Sunset</span>
                      <span class="apparatus-wp-type">Warm Dunes &amp; Solar Rings</span>
                    </div>
                  </div>

                  <!-- Motion 2: Cyberpunk Metropolis -->
                  <div class="apparatus-wp-preset-card" data-wp="cyberpunk">
                    <div class="apparatus-wp-preview apparatus-wp-preview-cyberpunk">
                      <span class="apparatus-motion-chip"><i class="ri-sparkling-fill"></i> 7 Layers</span>
                    </div>
                    <div class="apparatus-wp-meta">
                      <span class="apparatus-wp-name">Cyberpunk Metropolis</span>
                      <span class="apparatus-wp-type">Neo-Tokyo Synthwave &amp; Maglev</span>
                    </div>
                  </div>

                  <!-- Motion 3: Mystic Nordic Aurora -->
                  <div class="apparatus-wp-preset-card" data-wp="aurora">
                    <div class="apparatus-wp-preview apparatus-wp-preview-aurora">
                      <span class="apparatus-motion-chip"><i class="ri-sparkling-fill"></i> 7 Layers</span>
                    </div>
                    <div class="apparatus-wp-meta">
                      <span class="apparatus-wp-name">Mystic Nordic Aurora</span>
                      <span class="apparatus-wp-type">Borealis Fjord &amp; Glacial Peaks</span>
                    </div>
                  </div>

                  <!-- Motion 4: Cosmic Space Odyssey -->
                  <div class="apparatus-wp-preset-card" data-wp="nebula">
                    <div class="apparatus-wp-preview apparatus-wp-preview-nebula">
                      <span class="apparatus-motion-chip"><i class="ri-sparkling-fill"></i> 7 Layers</span>
                    </div>
                    <div class="apparatus-wp-meta">
                      <span class="apparatus-wp-name">Cosmic Space Odyssey</span>
                      <span class="apparatus-wp-type">Ringed Exoplanet &amp; Galaxy</span>
                    </div>
                  </div>

                  <!-- Motion 5: Crimson Shogun -->
                  <div class="apparatus-wp-preset-card" data-wp="shogun">
                    <div class="apparatus-wp-preview apparatus-wp-preview-shogun">
                      <span class="apparatus-motion-chip"><i class="ri-sparkling-fill"></i> 7 Layers</span>
                    </div>
                    <div class="apparatus-wp-meta">
                      <span class="apparatus-wp-name">Crimson Shogun</span>
                      <span class="apparatus-wp-type">Mount Fuji, Torii &amp; Sakura</span>
                    </div>
                  </div>

                </div>
              </div>

              <!-- CATEGORY 2: STATIC BACKGROUNDS -->
              <div class="apparatus-wp-section" style="margin-top: 1.75rem;">
                <div class="apparatus-wp-section-head">
                  <div class="apparatus-wp-section-title-wrap">
                    <span class="apparatus-setting-sublabel" style="margin-bottom: 0;">Static Backgrounds</span>
                    <span class="apparatus-wp-section-badge badge-static"><i class="ri-image-2-line"></i> High Definition 4K</span>
                  </div>
                  <span class="apparatus-wp-section-hint">High-resolution photographic &amp; render backdrops optimized for frosted glass readability.</span>
                </div>

                <div class="apparatus-wallpaper-presets-grid" id="apparatus-static-presets">
                  
                  <!-- Static 1: Obsidian Glass (User favorite) -->
                  <div class="apparatus-wp-preset-card" data-wp="static-obsidian">
                    <div class="apparatus-wp-preview" style="background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=350&q=70');"></div>
                    <div class="apparatus-wp-meta">
                      <span class="apparatus-wp-name">Obsidian Glass</span>
                      <span class="apparatus-wp-type">Dark Fluid Minimalist</span>
                    </div>
                  </div>

                  <!-- Static 2: Neon Dusk Waves -->
                  <div class="apparatus-wp-preset-card" data-wp="static-neondusk">
                    <div class="apparatus-wp-preview" style="background-image: url('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=350&q=70');"></div>
                    <div class="apparatus-wp-meta">
                      <span class="apparatus-wp-name">Neon Dusk</span>
                      <span class="apparatus-wp-type">Sunset Fluid Ribbon</span>
                    </div>
                  </div>

                  <!-- Static 3: Electric Horizon -->
                  <div class="apparatus-wp-preset-card" data-wp="static-electric">
                    <div class="apparatus-wp-preview" style="background-image: url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=350&q=70');"></div>
                    <div class="apparatus-wp-meta">
                      <span class="apparatus-wp-name">Electric Horizon</span>
                      <span class="apparatus-wp-type">Cyan &amp; Violet 3D Flow</span>
                    </div>
                  </div>

                  <!-- Static 4: Cyber Silk -->
                  <div class="apparatus-wp-preset-card" data-wp="static-cybersilk">
                    <div class="apparatus-wp-preview" style="background-image: url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=350&q=70');"></div>
                    <div class="apparatus-wp-meta">
                      <span class="apparatus-wp-name">Cyber Silk</span>
                      <span class="apparatus-wp-type">Vibrant Satin Curves</span>
                    </div>
                  </div>

                  <!-- Static 5: Amethyst Liquid -->
                  <div class="apparatus-wp-preset-card" data-wp="static-amethyst">
                    <div class="apparatus-wp-preview" style="background-image: url('https://images.unsplash.com/photo-1618005198920-f0cb6201c115?auto=format&fit=crop&w=350&q=70');"></div>
                    <div class="apparatus-wp-meta">
                      <span class="apparatus-wp-name">Amethyst Liquid</span>
                      <span class="apparatus-wp-type">Deep Purple Waves</span>
                    </div>
                  </div>

                  <!-- Static 6: Pure Dark Glass -->
                  <div class="apparatus-wp-preset-card" data-wp="dark">
                    <div class="apparatus-wp-preview apparatus-wp-preview-dark"></div>
                    <div class="apparatus-wp-meta">
                      <span class="apparatus-wp-name">Pure Dark Glass</span>
                      <span class="apparatus-wp-type">Minimal Stealth Radial</span>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Custom Wallpaper URL Input -->
              <div class="apparatus-setting-sublabel" style="margin-top: 1.5rem;">Custom Wallpaper Image URL</div>
              <div class="apparatus-custom-wp-bar">
                <input type="url" id="apparatus-custom-wp-input" class="apparatus-input" placeholder="https://images.unsplash.com/... or direct image link (.png, .jpg, .webp)">
                <button type="button" class="apparatus-btn apparatus-btn-primary" id="apparatus-apply-custom-wp-btn">
                  <i class="ri-check-line"></i> Apply
                </button>
                <button type="button" class="apparatus-btn apparatus-btn-glass" id="apparatus-reset-wp-btn" title="Reset to Desert Sunset">
                  <i class="ri-refresh-line"></i> Reset
                </button>
              </div>

              <!-- Frosted Glass Blur Presets & Parallax -->
              <div class="apparatus-setting-sub-grid" style="margin-top: 1.5rem;">
                <div class="apparatus-setting-sub-item">
                  <div class="apparatus-setting-sublabel">Frosted Glass Blur Density</div>
                  <div class="apparatus-blur-btn-group" id="apparatus-blur-btn-group">
                    <button type="button" class="apparatus-blur-opt-btn" data-blur="8px">Soft (8px)</button>
                    <button type="button" class="apparatus-blur-opt-btn active" data-blur="16px">Standard (16px)</button>
                    <button type="button" class="apparatus-blur-opt-btn" data-blur="28px">Deep Frost (28px)</button>
                  </div>
                </div>

                <div class="apparatus-setting-sub-item">
                  <div class="apparatus-setting-sublabel">Interactive Parallax Motion</div>
                  <div class="apparatus-setting-row-inline">
                    <div>
                      <span class="apparatus-setting-sub-title">3D Mouse Tilt &amp; Waves</span>
                      <p class="apparatus-setting-sub-desc">Responsive multi-depth parallax animation when moving the mouse.</p>
                    </div>
                    <label class="apparatus-switch">
                      <input type="checkbox" id="apparatus-setting-parallax-toggle" checked>
                      <span class="apparatus-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- CARD 3: PERFORMANCE & GRAPHICS -->
          <div class="apparatus-card apparatus-setting-card">
            <div class="apparatus-setting-card-head">
              <div class="apparatus-setting-icon-box" style="background: rgba(52, 211, 153, 0.15); color: #34d399;">
                <i class="ri-speed-up-line"></i>
              </div>
              <div class="apparatus-setting-title-meta">
                <h2 class="apparatus-setting-title">Performance &amp; Accessibility</h2>
                <p class="apparatus-setting-desc">Optimize rendering pipeline, reduce GPU overhead, and configure motion preferences.</p>
              </div>
            </div>

            <div class="apparatus-setting-body">
              <div class="apparatus-setting-list">
                
                <div class="apparatus-setting-row">
                  <div class="apparatus-setting-info">
                    <div class="apparatus-setting-row-title">
                      <i class="ri-battery-charge-line" style="color: #34d399;"></i> Low-Spec / Battery Saver Mode
                    </div>
                    <div class="apparatus-setting-row-desc">
                      Disables backdrop blur filters and heavy GPU compositing to maximize battery life and framerate on low-end hardware.
                    </div>
                  </div>
                  <div class="apparatus-setting-ctrl">
                    <label class="apparatus-switch">
                      <input type="checkbox" id="apparatus-setting-lowspec-toggle">
                      <span class="apparatus-slider"></span>
                    </label>
                  </div>
                </div>

                <div class="apparatus-setting-row">
                  <div class="apparatus-setting-info">
                    <div class="apparatus-setting-row-title">
                      <i class="ri-stop-circle-line" style="color: #fbbf24;"></i> Reduce Motion
                    </div>
                    <div class="apparatus-setting-row-desc">
                      Minimizes card transitions and floating wave animations for users sensitive to motion.
                    </div>
                  </div>
                  <div class="apparatus-setting-ctrl">
                    <label class="apparatus-switch">
                      <input type="checkbox" id="apparatus-setting-reducemotion-toggle">
                      <span class="apparatus-slider"></span>
                    </label>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- CARD 4: NOTIFICATIONS & AUDIO FEEDBACK -->
          <div class="apparatus-card apparatus-setting-card">
            <div class="apparatus-setting-card-head">
              <div class="apparatus-setting-icon-box" style="background: rgba(251, 191, 36, 0.15); color: #fbbf24;">
                <i class="ri-volume-up-line"></i>
              </div>
              <div class="apparatus-setting-title-meta">
                <h2 class="apparatus-setting-title">Audio &amp; Notification Preferences</h2>
                <p class="apparatus-setting-desc">Configure tactile audio feedback and popup toast behavior.</p>
              </div>
            </div>

            <div class="apparatus-setting-body">
              <div class="apparatus-setting-list">
                
                <div class="apparatus-setting-row">
                  <div class="apparatus-setting-info">
                    <div class="apparatus-setting-row-title">
                      <i class="ri-music-2-line" style="color: #fbbf24;"></i> Tactile Interface Click Sound
                    </div>
                    <div class="apparatus-setting-row-desc">
                      Plays a subtle, ultra-low latency acoustic click via Web Audio API on button and navigation clicks.
                    </div>
                  </div>
                  <div class="apparatus-setting-ctrl" style="display: flex; align-items: center; gap: 0.75rem;">
                    <button type="button" class="apparatus-btn apparatus-btn-glass apparatus-btn-sm" id="apparatus-test-sound-btn">
                      <i class="ri-play-line"></i> Test Click
                    </button>
                    <label class="apparatus-switch">
                      <input type="checkbox" id="apparatus-setting-sound-toggle">
                      <span class="apparatus-slider"></span>
                    </label>
                  </div>
                </div>

                <div class="apparatus-setting-row">
                  <div class="apparatus-setting-info">
                    <div class="apparatus-setting-row-title">
                      <i class="ri-notification-3-line" style="color: #38bdf8;"></i> System Toast Alerts
                    </div>
                    <div class="apparatus-setting-row-desc">
                      Show status toasts for actions such as copied text, settings saved, and daily rewards.
                    </div>
                  </div>
                  <div class="apparatus-setting-ctrl">
                    <label class="apparatus-switch">
                      <input type="checkbox" id="apparatus-setting-toasts-toggle" checked>
                      <span class="apparatus-slider"></span>
                    </label>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    const app = document.getElementById('app') || document.body;
    const resView = document.getElementById('apparatus-resource-view');
    const dash = document.getElementById('apparatus-dashboard-view');
    if (resView && resView.parentNode) {
      resView.parentNode.insertBefore(setView, resView.nextSibling);
    } else if (dash && dash.parentNode) {
      dash.parentNode.insertBefore(setView, dash.nextSibling);
    } else if (app) {
      app.appendChild(setView);
    }

    // Attach back buttons
    const backBtn1 = document.getElementById('apparatus-set-back-btn');
    const backBtn2 = document.getElementById('apparatus-set-back-btn-2');
    function goBackFromSettings(e) {
      e.preventDefault();
      window.location.hash = '';
      if (window.location.pathname !== '/') {
        history.pushState(null, '', '/');
      }
      applyViewMode();
      smoothScrollToTop();
    }
    if (backBtn1) backBtn1.addEventListener('click', goBackFromSettings);
    if (backBtn2) backBtn2.addEventListener('click', goBackFromSettings);

    // 1. Privacy Toggle Event
    const privToggle = document.getElementById('apparatus-setting-privacy-toggle');
    const privBadge = document.getElementById('apparatus-privacy-status-badge');
    if (privToggle) {
      privToggle.checked = localStorage.getItem('apparatus_privacy') !== 'false';
      privToggle.addEventListener('change', function () {
        const isBlurred = privToggle.checked;
        localStorage.setItem('apparatus_privacy', isBlurred ? 'true' : 'false');
        if (isBlurred) {
          document.body.classList.add('apparatus-privacy-active');
          if (privBadge) {
            privBadge.textContent = 'Blurred (Active)';
            privBadge.className = 'apparatus-setting-badge apparatus-badge-privacy active';
          }
          showToast('success', 'Privacy Filter Enabled', 'Sensitive info like IP addresses and balances are now obscured.');
        } else {
          document.body.classList.remove('apparatus-privacy-active');
          if (privBadge) {
            privBadge.textContent = 'Visible (Disabled)';
            privBadge.className = 'apparatus-setting-badge apparatus-badge-privacy inactive';
          }
          showToast('info', 'Privacy Filter Disabled', 'Sensitive information is now visible.');
        }
      });
    }

    // 2. Wallpaper Presets Events
    const wpCards = setView.querySelectorAll('.apparatus-wp-preset-card');
    const customWpInput = setView.querySelector('#apparatus-custom-wp-input');
    wpCards.forEach(function (card) {
      card.addEventListener('click', function () {
        const wpVal = card.getAttribute('data-wp');
        wpCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        if (customWpInput && !MOTION_THEMES.includes(wpVal) && !STATIC_WALLPAPERS[wpVal]) {
          customWpInput.value = wpVal;
        } else if (customWpInput) {
          customWpInput.value = '';
        }
        localStorage.setItem('apparatus_wallpaper', wpVal);
        applyWallpaper(wpVal);
        const name = card.querySelector('.apparatus-wp-name') ? card.querySelector('.apparatus-wp-name').textContent : 'Wallpaper';
        showToast('success', 'Theme Updated', 'Applied ' + name + '.');
      });
    });

    // Custom Wallpaper Apply & Reset
    const applyWpBtn = setView.querySelector('#apparatus-apply-custom-wp-btn');
    if (applyWpBtn && customWpInput) {
      applyWpBtn.addEventListener('click', function () {
        const url = customWpInput.value.trim();
        if (!url) {
          showToast('error', 'Invalid URL', 'Please enter a valid image URL.');
          return;
        }
        localStorage.setItem('apparatus_wallpaper', url);
        applyWallpaper(url);
        wpCards.forEach(c => c.classList.remove('active'));
        showToast('success', 'Custom Wallpaper Applied', 'Custom background loaded successfully.');
      });
    }

    const resetWpBtn = setView.querySelector('#apparatus-reset-wp-btn');
    if (resetWpBtn) {
      resetWpBtn.addEventListener('click', function () {
        localStorage.setItem('apparatus_wallpaper', 'desert');
        applyWallpaper('desert');
        if (customWpInput) customWpInput.value = '';
        wpCards.forEach(function (c) {
          if (c.getAttribute('data-wp') === 'desert') c.classList.add('active');
          else c.classList.remove('active');
        });
        showToast('info', 'Wallpaper Reset', 'Restored Desert Sunset Parallax.');
      });
    }

    // 3. Frosted Glass Blur Density Buttons
    const blurBtns = setView.querySelectorAll('.apparatus-blur-opt-btn');
    blurBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        blurBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const bVal = btn.getAttribute('data-blur');
        localStorage.setItem('apparatus_glass_blur', bVal);
        document.documentElement.style.setProperty('--apparatus-glass-blur', bVal);
        showToast('success', 'Glass Blur Updated', 'Frosted glass blur set to ' + bVal + '.');
      });
    });

    // 4. Parallax Toggle
    const parallaxToggle = setView.querySelector('#apparatus-setting-parallax-toggle');
    if (parallaxToggle) {
      parallaxToggle.checked = localStorage.getItem('apparatus_parallax') !== 'false';
      parallaxToggle.addEventListener('change', function () {
        const isEnabled = parallaxToggle.checked;
        localStorage.setItem('apparatus_parallax', isEnabled ? 'true' : 'false');
        if (isEnabled) {
          document.body.classList.remove('apparatus-no-parallax');
          showToast('success', 'Parallax Active', 'Interactive 3D mouse parallax is enabled.');
        } else {
          document.body.classList.add('apparatus-no-parallax');
          showToast('info', 'Parallax Paused', 'Interactive parallax motion is paused.');
        }
      });
    }

    // 5. Low-Spec Mode Toggle
    const lowSpecToggle = setView.querySelector('#apparatus-setting-lowspec-toggle');
    if (lowSpecToggle) {
      lowSpecToggle.checked = localStorage.getItem('apparatus_low_spec') === 'true';
      lowSpecToggle.addEventListener('change', function () {
        const isLow = lowSpecToggle.checked;
        localStorage.setItem('apparatus_low_spec', isLow ? 'true' : 'false');
        if (isLow) {
          document.body.classList.add('apparatus-low-spec');
          showToast('success', 'Battery Saver Enabled', 'Backdrop blur disabled for maximum performance.');
        } else {
          document.body.classList.remove('apparatus-low-spec');
          showToast('info', 'Normal Graphics Restored', 'Backdrop glass blur re-enabled.');
        }
      });
    }

    // 6. Reduce Motion Toggle
    const redMotionToggle = setView.querySelector('#apparatus-setting-reducemotion-toggle');
    if (redMotionToggle) {
      redMotionToggle.checked = localStorage.getItem('apparatus_reduce_motion') === 'true';
      redMotionToggle.addEventListener('change', function () {
        const isRed = redMotionToggle.checked;
        localStorage.setItem('apparatus_reduce_motion', isRed ? 'true' : 'false');
        if (isRed) {
          document.body.classList.add('apparatus-reduce-motion');
          showToast('info', 'Reduced Motion Active', 'Animations minimized for accessibility.');
        } else {
          document.body.classList.remove('apparatus-reduce-motion');
          showToast('info', 'Animations Restored', 'Standard smooth transitions active.');
        }
      });
    }

    // 7. Tactile Sound Toggle & Test
    const soundToggle = setView.querySelector('#apparatus-setting-sound-toggle');
    if (soundToggle) {
      soundToggle.checked = localStorage.getItem('apparatus_sound') === 'true';
      soundToggle.addEventListener('change', function () {
        const isSnd = soundToggle.checked;
        localStorage.setItem('apparatus_sound', isSnd ? 'true' : 'false');
        if (isSnd) {
          playClickSound(true);
          showToast('success', 'Interface Audio Enabled', 'Click audio feedback is now active.');
        } else {
          showToast('info', 'Interface Audio Muted', 'Click audio feedback disabled.');
        }
      });
    }

    const testSndBtn = setView.querySelector('#apparatus-test-sound-btn');
    if (testSndBtn) {
      testSndBtn.addEventListener('click', function (e) {
        e.preventDefault();
        playClickSound(true);
      });
    }

    // 8. Toast Alerts Toggle
    const toastToggle = setView.querySelector('#apparatus-setting-toasts-toggle');
    if (toastToggle) {
      toastToggle.checked = localStorage.getItem('apparatus_toast_enabled') !== 'false';
      toastToggle.addEventListener('change', function () {
        const isToast = toastToggle.checked;
        localStorage.setItem('apparatus_toast_enabled', isToast ? 'true' : 'false');
        if (isToast) {
          showToast('success', 'Toast Alerts Active', 'System alerts will pop up normally.');
        }
      });
    }

    renderSettingsPage();
  }

  // ==============================================================================
  // User Profile Studio: Personal Identity, Avatar Studio, Badges & Preferences
  // Mounted directly above Update Password, Update Email, and Two-Step Verification
  // ==============================================================================
  function injectUserProfileSection() {
    const rawPath = window.location.pathname || '';
    if (rawPath !== '/account' && rawPath !== '/account/') {
      const existing = document.getElementById('apparatus-user-profile-section');
      if (existing) existing.remove();
      return;
    }

    if (document.getElementById('apparatus-user-profile-section')) return;

    // Locate the native account cards row or container
    const contentBox = document.querySelector('.sc-mjlt6f-2') || document.querySelector('[class*="ContentBox"]');
    const cardsRow = contentBox ? contentBox.parentElement : null;
    const mainContainer = document.querySelector('div[class*="AccountOverviewContainer"]') || 
                          (cardsRow ? cardsRow.parentElement : null) || 
                          document.querySelector('div[class*="PageContentBlock"] > div');

    if (!mainContainer && !cardsRow) return;

    const user = window.PterodactylUser || {};
    const username = localStorage.getItem('apparatus_profile_username') || user.username || 'mudit';
    const email = user.email || 'muditkumar.me@gmail.com';
    const firstName = localStorage.getItem('apparatus_profile_firstname') || user.first_name || user.name_first || 'Mudit';
    const lastName = localStorage.getItem('apparatus_profile_lastname') || user.last_name || user.name_last || 'Kumar';
    const bio = localStorage.getItem('apparatus_profile_bio') || 'ArixByte Cloud Administrator';
    const defaultAvatar = 'https://api.dicebear.com/7.x/bottts/svg?seed=' + encodeURIComponent(username);
    const avatar = localStorage.getItem('apparatus_profile_avatar') || defaultAvatar;
    const timezone = localStorage.getItem('apparatus_profile_timezone') || 'Asia/Kolkata';
    const isAdmin = !!user.root_admin;
    const is2fa = !!user.use_totp;
    const memberYear = user.created_at ? new Date(user.created_at).getFullYear() : '2026';

    const section = document.createElement('div');
    section.id = 'apparatus-user-profile-section';
    section.className = 'apparatus-user-profile-section';

    section.innerHTML = `
      <div class="apparatus-card apparatus-user-profile-card">
        <!-- Top Profile Banner & Meta (No capsules, clean minimal typography) -->
        <div class="apparatus-prof-top-bar">
          <div class="apparatus-prof-identity-group">
            <div class="apparatus-prof-avatar-ring">
              <img src="${avatar}" id="apparatus-prof-avatar-img" class="apparatus-prof-avatar-img" alt="Avatar" onerror="this.src='https://api.dicebear.com/7.x/bottts/svg?seed=mudit';">
              <span class="apparatus-prof-online-dot" title="Account Status: Online"></span>
            </div>
            <div class="apparatus-prof-identity-text">
              <div class="apparatus-prof-name-row">
                <h2 class="apparatus-prof-display-name" id="apparatus-prof-preview-name">${firstName} ${lastName}</h2>
                <span class="apparatus-prof-handle" id="apparatus-prof-preview-handle">@${username}</span>
              </div>
              <p class="apparatus-prof-meta-line">
                <span class="apparatus-prof-role-label ${isAdmin ? 'admin' : ''}">${isAdmin ? 'Administrator' : 'Standard Member'}</span>
                <span class="apparatus-prof-sep">•</span>
                <span>Member since ${memberYear}</span>
                <span class="apparatus-prof-sep">•</span>
                <span class="${is2fa ? 'apparatus-prof-2fa-on' : 'apparatus-prof-2fa-off'}">${is2fa ? '2FA Enabled' : '2FA Inactive'}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Form Body: Clean 3-Column / 2-Column Grid with Title Case Labels -->
        <div class="apparatus-prof-form-body">
          <div class="apparatus-prof-row-3col">
            <div class="apparatus-prof-field">
              <label class="apparatus-prof-label" for="apparatus-prof-username">Username <span class="apparatus-prof-req">*</span></label>
              <div class="apparatus-prof-input-wrap">
                <i class="ri-at-line apparatus-prof-input-icon"></i>
                <input type="text" id="apparatus-prof-username" class="apparatus-prof-input with-icon" value="${username}" placeholder="Username">
              </div>
            </div>

            <div class="apparatus-prof-field">
              <label class="apparatus-prof-label" for="apparatus-prof-firstname">First Name</label>
              <div class="apparatus-prof-input-wrap">
                <i class="ri-user-line apparatus-prof-input-icon"></i>
                <input type="text" id="apparatus-prof-firstname" class="apparatus-prof-input with-icon" value="${firstName}" placeholder="First Name">
              </div>
            </div>

            <div class="apparatus-prof-field">
              <label class="apparatus-prof-label" for="apparatus-prof-lastname">Last Name</label>
              <div class="apparatus-prof-input-wrap">
                <i class="ri-user-line apparatus-prof-input-icon"></i>
                <input type="text" id="apparatus-prof-lastname" class="apparatus-prof-input with-icon" value="${lastName}" placeholder="Last Name">
              </div>
            </div>
          </div>

          <div class="apparatus-prof-row-2col">
            <div class="apparatus-prof-field">
              <label class="apparatus-prof-label" for="apparatus-prof-bio">Status / Bio Tagline</label>
              <div class="apparatus-prof-input-wrap">
                <i class="ri-chat-smile-2-line apparatus-prof-input-icon"></i>
                <input type="text" id="apparatus-prof-bio" class="apparatus-prof-input with-icon" value="${bio}" placeholder="e.g. Infrastructure Engineer & Gamer">
              </div>
            </div>

            <div class="apparatus-prof-field">
              <label class="apparatus-prof-label" for="apparatus-prof-timezone">Account Timezone</label>
              <div class="apparatus-prof-input-wrap">
                <i class="ri-time-line apparatus-prof-input-icon"></i>
                <select id="apparatus-prof-timezone" class="apparatus-prof-input with-icon apparatus-prof-select">
                  <option value="Asia/Kolkata" ${timezone === 'Asia/Kolkata' ? 'selected' : ''}>Asia/Kolkata (IST +5:30)</option>
                  <option value="UTC" ${timezone === 'UTC' ? 'selected' : ''}>UTC (Universal Time)</option>
                  <option value="America/New_York" ${timezone === 'America/New_York' ? 'selected' : ''}>America/New_York (EST)</option>
                  <option value="America/Los_Angeles" ${timezone === 'America/Los_Angeles' ? 'selected' : ''}>America/Los_Angeles (PST)</option>
                  <option value="Europe/London" ${timezone === 'Europe/London' ? 'selected' : ''}>Europe/London (GMT)</option>
                  <option value="Europe/Berlin" ${timezone === 'Europe/Berlin' ? 'selected' : ''}>Europe/Berlin (CET)</option>
                  <option value="Asia/Singapore" ${timezone === 'Asia/Singapore' ? 'selected' : ''}>Asia/Singapore (SGT)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Avatar & Customization Row -->
          <div class="apparatus-prof-row-2col">
            <div class="apparatus-prof-field">
              <label class="apparatus-prof-label">Quick Avatar Presets</label>
              <div class="apparatus-prof-preset-row">
                <button type="button" class="apparatus-prof-preset-btn" data-avatar="https://api.dicebear.com/7.x/bottts/svg?seed=ArixGamer" title="Cyber Bot">
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=ArixGamer" alt="Bot">
                </button>
                <button type="button" class="apparatus-prof-preset-btn" data-avatar="https://api.dicebear.com/7.x/shapes/svg?seed=CyberCore" title="Geometric Shapes">
                  <img src="https://api.dicebear.com/7.x/shapes/svg?seed=CyberCore" alt="Shapes">
                </button>
                <button type="button" class="apparatus-prof-preset-btn" data-avatar="https://api.dicebear.com/7.x/pixel-art/svg?seed=ArixByte" title="Pixel Retro">
                  <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=ArixByte" alt="Pixel">
                </button>
                <button type="button" class="apparatus-prof-preset-btn" data-avatar="https://api.dicebear.com/7.x/identicon/svg?seed=CloudOps" title="Security Matrix">
                  <img src="https://api.dicebear.com/7.x/identicon/svg?seed=CloudOps" alt="Identicon">
                </button>
                <button type="button" class="apparatus-prof-preset-btn" data-avatar="https://api.dicebear.com/7.x/thumbs/svg?seed=ServerRoot" title="Neon Operator">
                  <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=ServerRoot" alt="Thumbs">
                </button>
              </div>
            </div>

            <div class="apparatus-prof-field">
              <label class="apparatus-prof-label" for="apparatus-prof-avatar-url">Custom Image URL</label>
              <div class="apparatus-prof-url-input-wrap">
                <input type="text" id="apparatus-prof-avatar-url" class="apparatus-prof-input" placeholder="https://example.com/avatar.png" value="${avatar}">
                <button type="button" class="apparatus-btn apparatus-btn-glass apparatus-btn-sm" id="apparatus-prof-apply-url-btn">Apply</button>
              </div>
            </div>
          </div>

          <!-- Bottom Actions & Privacy Row -->
          <div class="apparatus-prof-footer-bar">
            <div class="apparatus-prof-privacy-group">
              <label class="apparatus-switch">
                <input type="checkbox" id="apparatus-prof-privacy-toggle" ${localStorage.getItem('apparatus_privacy') !== 'false' ? 'checked' : ''}>
                <span class="apparatus-slider"></span>
              </label>
              <div class="apparatus-prof-privacy-text">
                <span class="apparatus-prof-privacy-title">Privacy Blur Mode</span>
                <span class="apparatus-prof-privacy-desc">Blur sensitive credentials & financial balances</span>
              </div>
            </div>

            <div class="apparatus-prof-actions">
              <button type="button" class="apparatus-btn apparatus-btn-glass" id="apparatus-prof-reset-btn">
                <i class="ri-refresh-line"></i> <span>Reset</span>
              </button>
              <button type="button" class="apparatus-btn apparatus-btn-primary" id="apparatus-prof-save-btn">
                <i class="ri-check-line"></i> <span>Save Profile Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Insert section BEFORE the cards row so the cards row sits cleanly underneath it
    if (cardsRow && cardsRow.parentElement) {
      cardsRow.parentElement.insertBefore(section, cardsRow);
    } else if (mainContainer) {
      mainContainer.prepend(section);
    }

    // Wire up Avatar Preview from URL input
    const avatarImg = section.querySelector('#apparatus-prof-avatar-img');
    const avatarUrlInput = section.querySelector('#apparatus-prof-avatar-url');
    const applyUrlBtn = section.querySelector('#apparatus-prof-apply-url-btn');

    if (applyUrlBtn && avatarUrlInput && avatarImg) {
      applyUrlBtn.addEventListener('click', function () {
        const val = avatarUrlInput.value.trim();
        if (val) {
          avatarImg.src = val;
          showToast('info', 'Avatar Preview', 'Previewing custom avatar image.');
        }
      });
    }

    // Wire up Avatar Preset Buttons
    section.querySelectorAll('.apparatus-prof-preset-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const pUrl = this.getAttribute('data-avatar');
        if (pUrl && avatarImg && avatarUrlInput) {
          avatarImg.src = pUrl;
          avatarUrlInput.value = pUrl;
          showToast('info', 'Avatar Selected', 'Click "Save Profile Changes" to confirm.');
        }
      });
    });

    // Wire up Real-Time Display Name and Handle previews
    const uInput = section.querySelector('#apparatus-prof-username');
    const fInput = section.querySelector('#apparatus-prof-firstname');
    const lInput = section.querySelector('#apparatus-prof-lastname');
    const pName = section.querySelector('#apparatus-prof-preview-name');
    const pHandle = section.querySelector('#apparatus-prof-preview-handle');

    function updatePreviewName() {
      if (pName && fInput && lInput) {
        const f = fInput.value.trim() || 'Mudit';
        const l = lInput.value.trim() || 'Kumar';
        pName.textContent = f + ' ' + l;
      }
      if (pHandle && uInput) {
        pHandle.textContent = '@' + (uInput.value.trim() || 'mudit');
      }
    }
    if (uInput) uInput.addEventListener('input', updatePreviewName);
    if (fInput) fInput.addEventListener('input', updatePreviewName);
    if (lInput) lInput.addEventListener('input', updatePreviewName);

    // Privacy toggle in profile
    const profPrivToggle = section.querySelector('#apparatus-prof-privacy-toggle');
    if (profPrivToggle) {
      profPrivToggle.addEventListener('change', function () {
        const isPriv = profPrivToggle.checked;
        localStorage.setItem('apparatus_privacy', isPriv ? 'true' : 'false');
        if (isPriv) {
          document.body.classList.add('apparatus-privacy-active');
        } else {
          document.body.classList.remove('apparatus-privacy-active');
        }
      });
    }

    // Save Profile Changes
    const saveBtn = section.querySelector('#apparatus-prof-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        const newU = uInput ? uInput.value.trim() : username;
        const newF = fInput ? fInput.value.trim() : firstName;
        const newL = lInput ? lInput.value.trim() : lastName;
        const newBio = section.querySelector('#apparatus-prof-bio') ? section.querySelector('#apparatus-prof-bio').value.trim() : bio;
        const newTz = section.querySelector('#apparatus-prof-timezone') ? section.querySelector('#apparatus-prof-timezone').value : timezone;
        const newAv = avatarUrlInput ? avatarUrlInput.value.trim() : avatar;

        if (!newU) {
          showToast('error', 'Validation Error', 'Username cannot be left blank.');
          return;
        }

        localStorage.setItem('apparatus_profile_username', newU);
        localStorage.setItem('apparatus_profile_firstname', newF);
        localStorage.setItem('apparatus_profile_lastname', newL);
        localStorage.setItem('apparatus_profile_bio', newBio);
        localStorage.setItem('apparatus_profile_timezone', newTz);
        if (newAv) localStorage.setItem('apparatus_profile_avatar', newAv);

        if (window.PterodactylUser) {
          window.PterodactylUser.username = newU;
          window.PterodactylUser.first_name = newF;
          window.PterodactylUser.last_name = newL;
        }

        const heroU = document.getElementById('apparatus-welcome-username');
        if (heroU) heroU.textContent = newU;

        showToast('success', 'Profile Updated', 'Your profile details and avatar have been saved successfully!');
      });
    }

    // Reset Default
    const resetBtn = section.querySelector('#apparatus-prof-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        localStorage.removeItem('apparatus_profile_username');
        localStorage.removeItem('apparatus_profile_firstname');
        localStorage.removeItem('apparatus_profile_lastname');
        localStorage.removeItem('apparatus_profile_bio');
        localStorage.removeItem('apparatus_profile_avatar');
        localStorage.removeItem('apparatus_profile_timezone');
        showToast('info', 'Profile Reset', 'Reloading default account details...');
        setTimeout(function () {
          window.location.reload();
        }, 600);
      });
    }
  }

  function initSidebar() {
    if (isAuthPage() || isUnauthorizedAdminAttempt()) {
      const existing = document.getElementById('apparatus-sidebar');
      if (existing) existing.style.display = 'none';
      const toggle = document.getElementById('apparatus-mobile-toggle');
      if (toggle) toggle.style.display = 'none';
      const hero = document.getElementById('apparatus-dashboard-view');
      if (hero) hero.style.display = 'none';
      return;
    }

    const user = window.PterodactylUser || {};
    const isRootAdmin = !!user.root_admin;
    if (isRootAdmin) {
      document.body.classList.add('apparatus-is-admin');
    } else {
      document.body.classList.remove('apparatus-is-admin');
    }

    // Initialize 4-card transparent dashboard, resource view, and settings view
    initDashboardView();
    initResourceView();
    initSettingsView();

    let sidebar = document.getElementById('apparatus-sidebar');
    if (!sidebar) {
      sidebar = document.createElement('aside');
      sidebar.id = 'apparatus-sidebar';
      sidebar.className = 'apparatus-sidebar';
      sidebar.setAttribute('data-lenis-prevent', 'true');
      sidebar.setAttribute('data-lenis-prevent-wheel', 'true');

      sidebar.innerHTML = `
        <div class="apparatus-sidebar-header">
          <div class="apparatus-sidebar-brand">
            <span class="brand-text">ARIXBYTE CLOUD</span>
          </div>
        </div>

        <div class="apparatus-sidebar-scroll" data-lenis-prevent="true" data-lenis-prevent-wheel="true">
          <!-- Home -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Home</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="/" class="apparatus-nav-link" data-tab="dashboard" data-path="/">
                  <i class="ri-dashboard-3-line apparatus-nav-icon"></i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/servers" class="apparatus-nav-link" data-tab="servers" data-path="/servers">
                  <i class="ri-gamepad-line apparatus-nav-icon"></i>
                  <span>Servers</span>
                </a>
              </li>
              <li>
                <a href="/vps" class="apparatus-nav-link apparatus-vps-link" data-tab="vps" data-path="/vps">
                  <i class="ri-server-line apparatus-nav-icon"></i>
                  <span>VPS</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Billing -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Billing</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="#resource" class="apparatus-nav-link apparatus-resource-link" data-tab="resource">
                  <i class="ri-cpu-line apparatus-nav-icon"></i>
                  <span>Resource</span>
                </a>
              </li>
              <li>
                <a href="#store" class="apparatus-nav-link apparatus-store-link" data-path="/billing/store">
                  <i class="ri-shopping-cart-2-line apparatus-nav-icon"></i>
                  <span>Store</span>
                  <span class="apparatus-tag-soon">Soon</span>
                </a>
              </li>
              <li>
                <a href="#earn" class="apparatus-nav-link apparatus-earn-link" data-path="/billing/earn">
                  <i class="ri-copper-coin-line apparatus-nav-icon"></i>
                  <span>Earn</span>
                  <span class="apparatus-tag-soon">Soon</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Account -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Account</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="/account" class="apparatus-nav-link" data-path="/account">
                  <i class="ri-user-settings-line apparatus-nav-icon"></i>
                  <span>Account</span>
                </a>
              </li>
              <li>
                <a href="/account/api" class="apparatus-nav-link" data-path="/account/api">
                  <i class="ri-key-2-line apparatus-nav-icon"></i>
                  <span>API Credentials</span>
                </a>
              </li>
              <li>
                <a href="/account/ssh" class="apparatus-nav-link" data-path="/account/ssh">
                  <i class="ri-terminal-window-line apparatus-nav-icon"></i>
                  <span>SSH Keys</span>
                </a>
              </li>
              <li>
                <a href="/account/activity" class="apparatus-nav-link" data-path="/account/activity">
                  <i class="ri-history-line apparatus-nav-icon"></i>
                  <span>Recent Activity</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Ticket -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Ticket</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="#ticket" class="apparatus-nav-link apparatus-ticket-link">
                  <i class="ri-customer-service-2-line apparatus-nav-icon"></i>
                  <span>Ticket</span>
                  <span class="apparatus-tag-soon">Soon</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Panel Settings -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Panel Settings</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="#panel-settings" class="apparatus-nav-link apparatus-panel-settings-link" data-tab="panel-settings">
                  <i class="ri-settings-3-line apparatus-nav-icon"></i>
                  <span>Panel Settings</span>
                </a>
              </li>
              ${isRootAdmin ? `
              <li>
                <a href="#panel-editor" class="apparatus-nav-link apparatus-panel-editor-link" data-tab="panel-editor">
                  <i class="ri-sparkling-2-line apparatus-nav-icon"></i>
                  <span>Panel Editor</span>
                </a>
              </li>
              <li>
                <a href="#apparatus-settings" class="apparatus-nav-link apparatus-settings-link" data-tab="apparatus-settings">
                  <i class="ri-settings-4-line apparatus-nav-icon"></i>
                  <span>Apparatus Settings</span>
                </a>
              </li>
              <li>
                <a href="#addon-settings" class="apparatus-nav-link apparatus-addon-settings-link" data-tab="addon-settings">
                  <i class="ri-stack-line apparatus-nav-icon"></i>
                  <span>Addon Settings</span>
                </a>
              </li>
              ` : ''}
            </ul>
          </div>

          <!-- Socials -->
          <div class="apparatus-nav-category">
            <div class="apparatus-category-title">Socials</div>
            <ul class="apparatus-nav-list">
              <li>
                <a href="https://arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-nav-link">
                  <i class="ri-global-line apparatus-nav-icon"></i>
                  <span>Website</span>
                  <i class="ri-external-link-line apparatus-external-icon"></i>
                </a>
              </li>
              <li>
                <a href="https://discord.arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-nav-link">
                  <i class="ri-discord-fill apparatus-nav-icon" style="color: #5865F2;"></i>
                  <span>Discord</span>
                  <i class="ri-external-link-line apparatus-external-icon"></i>
                </a>
              </li>
              <li>
                <a href="https://instagram.arixbyte.com" target="_blank" rel="noopener noreferrer" class="apparatus-nav-link">
                  <i class="ri-instagram-line apparatus-nav-icon" style="color: #E1306C;"></i>
                  <span>Instagram</span>
                  <i class="ri-external-link-line apparatus-external-icon"></i>
                </a>
              </li>
              <li>
                <a href="https://wa.me/918218444633" target="_blank" rel="noopener noreferrer" class="apparatus-nav-link">
                  <i class="ri-whatsapp-line apparatus-nav-icon" style="color: #25D366;"></i>
                  <span>Whatsapp</span>
                  <i class="ri-external-link-line apparatus-external-icon"></i>
                </a>
              </li>
            </ul>
          </div>

          <!-- Empty space after socials -->
          <div class="apparatus-downside-spacer"></div>

          <!-- Downside Options (Admin Panel & Sign Out) -->
          <div class="apparatus-nav-category apparatus-downside-options">
            <ul class="apparatus-nav-list">
              ${isRootAdmin ? `
              <li class="apparatus-admin-panel-item">
                <a href="/admin" class="apparatus-nav-link" data-path="/admin">
                  <i class="ri-settings-4-line apparatus-nav-icon"></i>
                  <span>Admin Panel</span>
                  <span class="apparatus-tag-admin">Admin</span>
                </a>
              </li>
              ` : ''}
              <li>
                <a href="#logout" class="apparatus-nav-link apparatus-logout-link">
                  <i class="ri-logout-box-r-line apparatus-nav-icon"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      `;

      document.body.appendChild(sidebar);

      sidebar.addEventListener('wheel', function (e) {
        e.stopPropagation();
      }, { passive: true });

      // Billing click handlers
      const resourceBtn = sidebar.querySelector('.apparatus-resource-link');
      if (resourceBtn) {
        resourceBtn.addEventListener('click', function (e) {
          e.preventDefault();
          window.location.hash = '#resource';
          applyViewMode();
          smoothScrollToTop();
        });
      }

      const storeBtn = sidebar.querySelector('.apparatus-store-link');
      if (storeBtn) {
        storeBtn.addEventListener('click', function (e) {
          e.preventDefault();
          const billCard = document.getElementById('apparatus-area-billing');
          if (billCard) {
            billCard.scrollIntoView({ behavior: 'smooth' });
            billCard.style.transition = 'box-shadow 0.3s ease';
            billCard.style.boxShadow = '0 0 25px rgba(236, 72, 153, 0.45)';
            setTimeout(function () { billCard.style.boxShadow = ''; }, 1500);
          } else {
            showToast('info', 'Cloud Store (INR)', 'Opening ArixByte Store...');
            setTimeout(function () { window.open('https://arixbyte.com', '_blank'); }, 800);
          }
        });
      }

      const earnBtn = sidebar.querySelector('.apparatus-earn-link');
      if (earnBtn) {
        earnBtn.addEventListener('click', function (e) {
          e.preventDefault();
          const dailyBtn = document.getElementById('apparatus-daily-reward-btn');
          if (dailyBtn) {
            dailyBtn.scrollIntoView({ behavior: 'smooth' });
            dailyBtn.click();
          } else {
            showToast('info', 'Referral & Earn', 'Claim daily referral points and redeem for server discounts!');
          }
        });
      }

      // Ticket placeholder click handler
      const ticketBtn = sidebar.querySelector('.apparatus-ticket-link');
      if (ticketBtn) {
        ticketBtn.addEventListener('click', function (e) {
          e.preventDefault();
          showToast('success', 'Tickets', 'Ticket support system is coming soon!');
        });
      }

      // Dedicated Panel Settings navigation (for all users)
      const panelSettingsBtn = sidebar.querySelector('.apparatus-panel-settings-link');
      if (panelSettingsBtn) {
        panelSettingsBtn.addEventListener('click', function (e) {
          e.preventDefault();
          const rawP = window.location.pathname || '/';
          const onHome = rawP === '/' || rawP === '/servers' || rawP === '/vps' || rawP === '/dashboard';
          if (!onHome) {
            window.location.href = '/#panel-settings';
          } else {
            window.location.hash = '#panel-settings';
            applyViewMode();
            smoothScrollToTop();
          }
        });
      }

      // Admin-only placeholder settings links
      const adminPanelSettingsLinks = [
        { selector: '.apparatus-panel-editor-link', title: 'Panel Editor', msg: 'Opening Panel Editor customization module...' },
        { selector: '.apparatus-settings-link', title: 'Apparatus Settings', msg: 'Opening Apparatus Theme configuration...' },
        { selector: '.apparatus-addon-settings-link', title: 'Addon Settings', msg: 'Opening Addon Settings configuration...' }
      ];

      adminPanelSettingsLinks.forEach(function (item) {
        const btn = sidebar.querySelector(item.selector);
        if (btn) {
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            showToast('info', item.title, item.msg);
          });
        }
      });

      // Logout handler
      const logoutBtn = sidebar.querySelector('.apparatus-logout-link');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', async function (e) {
          e.preventDefault();
          showToast('info', 'Signing Out', 'Logging out of your account...');
          try {
            const csrf = getCsrfToken();
            await fetch('/auth/logout', {
              method: 'POST',
              headers: {
                'X-CSRF-TOKEN': csrf,
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
              }
            });
          } catch (err) { }
          window.location.href = '/auth/login';
        });
      }

      // Tab switcher handlers for Dashboard vs Servers vs VPS
      sidebar.querySelectorAll('a[data-tab]').forEach(function (tabLink) {
        tabLink.addEventListener('click', function (e) {
          const tab = this.getAttribute('data-tab');
          if (!tab || (tab !== 'dashboard' && tab !== 'servers' && tab !== 'vps')) return;

          e.preventDefault();
          window.location.hash = '';

          const rawP = window.location.pathname || '/';
          const onHome = rawP === '/' || rawP === '/servers' || rawP === '/vps' || rawP === '/dashboard';

          if (!onHome) {
            // If navigating from an account subpage, navigate cleanly so React Router unmounts the account page!
            if (tab === 'servers') {
              window.location.href = '/servers';
            } else if (tab === 'vps') {
              window.location.href = '/vps';
            } else {
              window.location.href = '/';
            }
            return;
          }

          // If already on home (between /, /servers, /vps), switch smoothly and clear hash
          if (tab === 'servers') {
            if (window.location.pathname !== '/servers') {
              history.pushState(null, '', '/servers');
            } else {
              history.replaceState(null, '', '/servers');
            }
          } else if (tab === 'vps') {
            if (window.location.pathname !== '/vps') {
              history.pushState(null, '', '/vps');
            } else {
              history.replaceState(null, '', '/vps');
            }
          } else if (tab === 'dashboard') {
            if (window.location.pathname !== '/') {
              history.pushState(null, '', '/');
            } else {
              history.replaceState(null, '', '/');
            }
          }
          applyViewMode();
          smoothScrollToTop();
        });
      });

      // Sidebar brand click to navigate to dashboard
      const brand = sidebar.querySelector('.apparatus-sidebar-brand');
      if (brand) {
        brand.style.cursor = 'pointer';
        brand.addEventListener('click', function (e) {
          e.preventDefault();
          window.location.hash = '';
          if (window.location.pathname !== '/') {
            history.pushState(null, '', '/');
          } else {
            history.replaceState(null, '', '/');
          }
          applyViewMode();
          smoothScrollToTop();
        });
      }

      // Mobile toggle button
      let toggle = document.getElementById('apparatus-mobile-toggle');
      if (!toggle) {
        toggle = document.createElement('button');
        toggle.id = 'apparatus-mobile-toggle';
        toggle.className = 'apparatus-mobile-toggle';
        toggle.setAttribute('aria-label', 'Toggle Navigation');
        toggle.innerHTML = '<i class="ri-menu-2-line"></i>';
        toggle.addEventListener('click', function () {
          sidebar.classList.toggle('open');
        });
        document.body.appendChild(toggle);
      }
    } else {
      sidebar.style.display = 'flex';
      const toggle = document.getElementById('apparatus-mobile-toggle');
      if (toggle) toggle.style.display = '';
    }

    applyViewMode();
  }

  function initApparatus() {
    initSmoothScroll();
    const isAuth = isAuthPage();
    const isHacking = isUnauthorizedAdminAttempt();

    if (isAuth || isHacking) {
      document.body.classList.add('apparatus-auth');
      if (isHacking) {
        document.body.classList.add('apparatus-hacking-mode');
      } else {
        document.body.classList.remove('apparatus-hacking-mode');
      }
    } else {
      document.body.classList.remove('apparatus-auth', 'apparatus-hacking-mode');
    }

    let wrapper = document.getElementById('apparatus-desert-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'apparatus-desert-wrapper';
      wrapper.className = 'desert-wrapper';

      wrapper.innerHTML = `
        <div class="parallax-container" id="apparatus-parallax">
          <img src="/themes/apparatus/desert/img-bg.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/desert/img-bg.svg';}" alt="" class="parallax-layer layer-bg" />
          <img src="/themes/apparatus/desert/img-1.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/desert/img-1.svg';}" alt="" class="parallax-layer layer-1" />
          <img src="/themes/apparatus/desert/img-2.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/desert/img-2.svg';}" alt="" class="parallax-layer layer-2" />
          <img src="/themes/apparatus/desert/img-3.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/desert/img-3.svg';}" alt="" class="parallax-layer layer-3" />
          
          <div class="parallax-layer layer-text">
            <h1 class="background-title" id="apparatus-bg-title">ARIXBYTE</h1>
            <p class="background-subtitle" id="apparatus-bg-subtitle">CLOUD &amp; INFRASTRUCTURES</p>
          </div>

          <img src="/themes/apparatus/desert/img-4.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/desert/img-4.svg';}" alt="" class="parallax-layer layer-4" />
          <img src="/themes/apparatus/desert/img-5.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/desert/img-5.svg';}" alt="" class="parallax-layer layer-5" />
          <img src="/themes/apparatus/desert/img-6.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/desert/img-6.svg';}" alt="" class="parallax-layer layer-6" />
          <img src="/themes/apparatus/desert/img-7.svg" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/desert/img-7.svg';}" alt="" class="parallax-layer layer-7" />
        </div>

        <div id="apparatus-custom-bg" class="apparatus-custom-bg"></div>

        <div class="login-card" id="apparatus-card-slot"></div>
      `;

      document.body.prepend(wrapper);
    }
    setupParallax();
    applyGlobalStoredSettings();

    const bgTitle = document.getElementById('apparatus-bg-title');
    const bgSubtitle = document.getElementById('apparatus-bg-subtitle');
    const cardSlot = document.getElementById('apparatus-card-slot');

    if (isHacking) {
      if (bgTitle) bgTitle.textContent = 'HACKING ATTEMPT';
      if (bgSubtitle) bgSubtitle.textContent = 'You Cannot Access is Page';
      renderHackingMode();
      return;
    } else {
      if (bgTitle) bgTitle.textContent = 'ARIXBYTE';
      if (bgSubtitle) bgSubtitle.textContent = 'CLOUD & INFRASTRUCTURES';
    }

    if (isAuth) {
      if (cardSlot) cardSlot.style.display = 'block';
      const path = window.location.pathname;
      if (path.startsWith('/auth/password/reset')) {
        renderResetMode();
      } else if (path.startsWith('/auth/password')) {
        renderForgotMode();
      } else {
        renderLoginMode();
      }
    } else {
      if (cardSlot) cardSlot.style.display = 'none';
      if (typeof gsap !== 'undefined') {
        gsap.set(".desert-wrapper", { backgroundColor: "#F7ABAE" });
        gsap.set(".parallax-container", { scale: 1, opacity: 1 });
      }
    }

    initSidebar();
  }

  function renderHackingMode() {
    document.body.classList.add('apparatus-auth', 'apparatus-hacking-mode');

    const sidebar = document.getElementById('apparatus-sidebar');
    if (sidebar) sidebar.style.display = 'none';
    const toggle = document.getElementById('apparatus-mobile-toggle');
    if (toggle) toggle.style.display = 'none';
    const hero = document.getElementById('apparatus-dashboard-view');
    if (hero) hero.style.display = 'none';

    document.querySelectorAll('div[class*="AccountOverviewContainer"], div[class*="AccountApiContainer"], div[class*="AccountSSHContainer"], div[class*="ActivityLogContainer"], .sc-12to0iy-1, .sc-1c4s3nm-0, .sc-yksipt-0, p[class*="DashboardContainer"], .sc-1topkxf-3, div.bg-gray-700, [class*="PageContentBlock"], main, #app > div > div').forEach(function (el) {
      if (!el.classList.contains('desert-wrapper') && !el.closest('#apparatus-desert-wrapper')) {
        el.style.setProperty('display', 'none', 'important');
      }
    });

    const bgTitle = document.getElementById('apparatus-bg-title');
    if (bgTitle) bgTitle.textContent = 'HACKING ATTEMPT';

    const bgSubtitle = document.getElementById('apparatus-bg-subtitle');
    if (bgSubtitle) bgSubtitle.textContent = 'You Cannot Access is Page';

    const card = document.getElementById('apparatus-card-slot');
    if (!card) return;

    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.visibility = 'visible';

    const user = window.PterodactylUser;
    const isLoggedIn = !!(user && (user.uuid || user.username || user.email));
    const btnHref = isLoggedIn ? '/' : '/auth/login';
    const btnText = isLoggedIn ? 'Return to Dashboard' : 'Go to Login Page';
    const btnIcon = isLoggedIn ? 'ri-arrow-left-line' : 'ri-login-box-line';

    card.innerHTML = `
      <div class="hacking-warning-icon">
        <i class="ri-alert-fill"></i>
      </div>
      <h2 class="login-title" style="color: #ef4444; font-size: 1.55rem; margin-bottom: 0.35rem; font-weight: 800; letter-spacing: 0.02em;">ACCESS DENIED</h2>
      <p class="login-subtitle" style="margin-bottom: 1.5rem; color: rgba(255, 255, 255, 0.78); font-size: 0.92rem; line-height: 1.5;">
        You do not have permission to access this page.
      </p>
      <a href="${btnHref}" class="login-button apparatus-hacking-back-btn" style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; box-sizing: border-box;">
        <i class="${btnIcon}"></i> ${btnText}
      </a>
    `;

    const backBtn = card.querySelector('.apparatus-hacking-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', function (e) {
        if (isLoggedIn) {
          e.preventDefault();
          window.history.pushState({}, '', '/');
          document.body.classList.remove('apparatus-auth', 'apparatus-hacking-mode');
          if (bgTitle) bgTitle.textContent = 'ARIXBYTE';
          if (bgSubtitle) bgSubtitle.textContent = 'CLOUD & INFRASTRUCTURES';
          initApparatus();
          applyViewMode();
        }
      });
    }

    if (typeof gsap !== 'undefined') {
      gsap.set(".desert-wrapper", { backgroundColor: "#F7ABAE", display: "block" });
      gsap.set(".parallax-container", { scale: 1, opacity: 1, visibility: "visible" });
    }
    setupParallax();
  }

  // Icons
  const userSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
  const lockSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
  const mailSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';

  // ----------------------------------------------------------------------------
  // VIEW 1: LOGIN MODE
  // ----------------------------------------------------------------------------
  function renderLoginMode() {
    const card = document.getElementById('apparatus-card-slot');
    if (!card) return;

    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.visibility = 'visible';

    card.innerHTML = `
      <h2 class="login-title">ArixByte Login</h2>
      <p class="login-subtitle">Welcome to ArixByte Panel</p>
      
      <form class="login-form" id="apparatus-login-form" autocomplete="on">
        <div id="apparatus-login-error" class="login-error" style="display: none;"></div>

        <div class="input-group">
          <span class="input-icon"><i class="ri-user-line"></i></span>
          <input 
            type="text" 
            id="apparatus-user-field"
            required 
            placeholder="Username or Email" 
            class="login-input" 
            autocomplete="username"
          />
        </div>

        <div class="input-group">
          <span class="input-icon"><i class="ri-lock-line"></i></span>
          <input 
            type="password" 
            id="apparatus-pass-field"
            required 
            placeholder="Password" 
            class="login-input" 
            autocomplete="current-password"
          />
        </div>

        <button type="submit" id="apparatus-submit-btn" class="login-button">
          Sign In
        </button>
      </form>

      <div class="apparatus-footer-links">
        <p>Don’t have an account? <a href="/auth/register">Register</a></p>
        <p>Forgot Password? <a href="/auth/password" id="apparatus-to-forgot">Click Here</a></p>
      </div>
    `;

    // Fallback SVG icons
    const icons = card.querySelectorAll('.input-icon');
    if (icons[0]) icons[0].innerHTML = userSvg;
    if (icons[1]) icons[1].innerHTML = lockSvg;

    // Handle Forgot Password link click smoothly
    const forgotLink = document.getElementById('apparatus-to-forgot');
    if (forgotLink) {
      forgotLink.addEventListener('click', function (e) {
        e.preventDefault();
        history.pushState(null, '', '/auth/password');
        renderForgotMode();
      });
    }

    // Handle Login Submit
    const form = document.getElementById('apparatus-login-form');
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const userVal = document.getElementById('apparatus-user-field').value.trim();
        const passVal = document.getElementById('apparatus-pass-field').value;
        const errorBox = document.getElementById('apparatus-login-error');
        const submitBtn = document.getElementById('apparatus-submit-btn');

        if (!userVal || !passVal) {
          showToast('error', 'Missing Information', 'Please enter your username and password.');
          return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Authenticating...';
        if (errorBox) {
          errorBox.style.display = 'none';
          errorBox.textContent = '';
        }

        // Bridge to native Formik in #app
        const pteroForm = document.querySelector('#app form');
        const pteroUser = pteroForm ? (pteroForm.querySelector('input[name="username"]') || pteroForm.querySelector('input[type="text"]')) : null;
        const pteroPass = pteroForm ? (pteroForm.querySelector('input[name="password"]') || pteroForm.querySelector('input[type="password"]')) : null;
        const pteroSubmit = pteroForm ? pteroForm.querySelector('button[type="submit"]') : null;

        if (pteroUser && pteroPass && pteroSubmit) {
          setReactValue(pteroUser, userVal);
          setReactValue(pteroPass, passVal);
          pteroSubmit.click();
        }

        // Direct API Request
        try {
          const token = getCsrfToken();
          const resp = await fetch('/auth/login', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': token,
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ user: userVal, password: passVal })
          });

          const data = await resp.json();

          if (resp.ok) {
            showToast('success', 'Login Successful!', 'Welcome back! Redirecting to panel...');
            setTimeout(function () {
              if (data.data && data.data.complete) {
                window.location.href = data.data.intended || '/';
              } else if (data.data && data.data.confirmation_token) {
                window.location.href = '/auth/login/checkpoint';
              } else {
                window.location.href = '/';
              }
            }, 800);
          } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign In';

            let errorDetail = 'Invalid username or password.';
            if (data.errors && data.errors[0] && data.errors[0].detail) {
              errorDetail = data.errors[0].detail;
            } else if (data.message) {
              errorDetail = data.message;
            }

            if (resp.status === 429) {
              errorDetail = 'Too many login attempts. Please wait a few moments.';
            } else if (resp.status === 500) {
              errorDetail = 'Panel error: reCAPTCHA quota exceeded or server error.';
            }

            showToast('error', 'Login Failed', errorDetail);
            if (errorBox) {
              errorBox.textContent = errorDetail;
              errorBox.style.display = 'block';
            }
          }
        } catch (err) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sign In';
          const netMsg = 'Network error communicating with panel.';
          showToast('error', 'Error', netMsg);
          if (errorBox) {
            errorBox.textContent = netMsg;
            errorBox.style.display = 'block';
          }
        }
      });
    }
  }

  // ----------------------------------------------------------------------------
  // VIEW 2: FORGOT PASSWORD MODE
  // ----------------------------------------------------------------------------
  function renderForgotMode() {
    const card = document.getElementById('apparatus-card-slot');
    if (!card) return;

    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.visibility = 'visible';

    card.innerHTML = `
      <h2 class="login-title">ArixByte Login</h2>
      <p class="login-subtitle">Request Password Reset</p>
      
      <form class="login-form" id="apparatus-forgot-form" autocomplete="on">
        <div id="apparatus-forgot-msg" style="display: none;"></div>

        <p style="margin: 0 0 0.5rem 0; font-size: 0.95rem; color: rgba(255, 255, 255, 0.85); line-height: 1.4;">
          Enter your account username or email to receive instructions on resetting your password.
        </p>

        <div class="input-group">
          <span class="input-icon"><i class="ri-user-line"></i></span>
          <input 
            type="text" 
            id="apparatus-email-field"
            required 
            placeholder="Username or Email Address" 
            class="login-input" 
            autocomplete="username"
          />
        </div>

        <button type="submit" id="apparatus-send-email-btn" class="login-button">
          Send Email
        </button>
      </form>

      <div class="apparatus-footer-links">
        <p>Remember your password? <a href="/auth/login" id="apparatus-to-login">Sign In</a></p>
      </div>
    `;

    // Fallback SVG icon
    const icons = card.querySelectorAll('.input-icon');
    if (icons[0]) icons[0].innerHTML = userSvg;

    // Handle Back to Login click
    const loginLink = document.getElementById('apparatus-to-login');
    if (loginLink) {
      loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        history.pushState(null, '', '/auth/login');
        renderLoginMode();
      });
    }

    // Handle Forgot Password Submit
    const form = document.getElementById('apparatus-forgot-form');
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const emailVal = document.getElementById('apparatus-email-field').value.trim();
        const msgBox = document.getElementById('apparatus-forgot-msg');
        const sendBtn = document.getElementById('apparatus-send-email-btn');

        if (!emailVal) {
          showToast('error', 'Missing Information', 'Please enter your account username or email.');
          return;
        }

        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending Email...';
        if (msgBox) {
          msgBox.style.display = 'none';
          msgBox.className = '';
          msgBox.textContent = '';
        }

        // Bridge to native Pterodactyl Forgot Password Form in #app if present
        const pteroForm = document.querySelector('#app form');
        const pteroEmail = pteroForm ? pteroForm.querySelector('input[name="email"], input[type="email"], input[type="text"]') : null;
        const pteroSubmit = pteroForm ? pteroForm.querySelector('button[type="submit"]') : null;

        if (pteroEmail && pteroSubmit) {
          setReactValue(pteroEmail, emailVal);
          pteroSubmit.click();
        }

        // Direct API Request to /auth/password
        try {
          const token = getCsrfToken();
          const resp = await fetch('/auth/password', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': token,
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ email: emailVal })
          });

          const data = await resp.json();

          if (resp.ok) {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send Email';

            const successText = data.status || 'We have emailed your password reset link!';
            showToast('success', 'Email Sent!', successText);

            if (msgBox) {
              msgBox.className = 'login-success';
              msgBox.textContent = successText;
              msgBox.style.display = 'block';
            }
          } else {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send Email';

            let errorDetail = 'We cannot find an account with that email or username.';
            let errorTitle = 'Account Not Found';

            if (resp.status === 404 || resp.status === 422) {
              errorTitle = 'Account Not Found';
              errorDetail = 'We cannot find an account with that email or username.';
            } else if (resp.status === 429) {
              errorTitle = 'Too Many Attempts';
              errorDetail = 'Too many password reset attempts. Please wait a few moments.';
            } else if (data.errors && data.errors[0] && data.errors[0].detail) {
              errorDetail = data.errors[0].detail;
            } else if (data.status) {
              errorDetail = data.status;
            }

            showToast('error', errorTitle, errorDetail);

            if (msgBox) {
              msgBox.className = 'login-error';
              msgBox.textContent = errorDetail;
              msgBox.style.display = 'block';
            }
          }
        } catch (err) {
          sendBtn.disabled = false;
          sendBtn.textContent = 'Send Email';
          const netMsg = 'Network error communicating with panel.';
          showToast('error', 'Error', netMsg);
          if (msgBox) {
            msgBox.className = 'login-error';
            msgBox.textContent = netMsg;
            msgBox.style.display = 'block';
          }
        }
      });
    }
  }

  // ----------------------------------------------------------------------------
  // VIEW 3: SET NEW PASSWORD MODE (/auth/password/reset/{token})
  // ----------------------------------------------------------------------------
  function renderResetMode() {
    const card = document.getElementById('apparatus-card-slot');
    if (!card) return;

    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.visibility = 'visible';

    card.innerHTML = `
      <h2 class="login-title">ArixByte Login</h2>
      <p class="login-subtitle">Set New Password</p>
      
      <form class="login-form" id="apparatus-reset-form" autocomplete="on">
        <div id="apparatus-reset-msg" style="display: none;"></div>

        <div class="input-group">
          <span class="input-icon"><i class="ri-mail-line"></i></span>
          <input 
            type="email" 
            id="apparatus-reset-email"
            required 
            placeholder="Account Email Address" 
            class="login-input" 
            autocomplete="email"
          />
        </div>

        <div class="input-group">
          <span class="input-icon"><i class="ri-lock-line"></i></span>
          <input 
            type="password" 
            id="apparatus-new-password"
            required 
            placeholder="New Password" 
            class="login-input" 
            autocomplete="new-password"
          />
        </div>

        <div class="input-group">
          <span class="input-icon"><i class="ri-lock-line"></i></span>
          <input 
            type="password" 
            id="apparatus-confirm-password"
            required 
            placeholder="Confirm New Password" 
            class="login-input" 
            autocomplete="new-password"
          />
        </div>

        <button type="submit" id="apparatus-reset-submit-btn" class="login-button">
          Reset Password
        </button>
      </form>

      <div class="apparatus-footer-links">
        <p>Return to <a href="/auth/login" id="apparatus-to-login-from-reset">Sign In</a></p>
      </div>
    `;

    // Fallback SVG icons
    const icons = card.querySelectorAll('.input-icon');
    if (icons[0]) icons[0].innerHTML = mailSvg;
    if (icons[1]) icons[1].innerHTML = lockSvg;
    if (icons[2]) icons[2].innerHTML = lockSvg;

    const loginLink = document.getElementById('apparatus-to-login-from-reset');
    if (loginLink) {
      loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        history.pushState(null, '', '/auth/login');
        renderLoginMode();
      });
    }

    const form = document.getElementById('apparatus-reset-form');
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('apparatus-reset-email').value.trim();
        const password = document.getElementById('apparatus-new-password').value;
        const confirmPassword = document.getElementById('apparatus-confirm-password').value;
        const msgBox = document.getElementById('apparatus-reset-msg');
        const submitBtn = document.getElementById('apparatus-reset-submit-btn');

        if (password !== confirmPassword) {
          showToast('error', 'Passwords Do Not Match', 'Please make sure both passwords match.');
          return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Updating Password...';

        // Extract token from path: /auth/password/reset/{token}
        const pathParts = window.location.pathname.split('/');
        const token = pathParts[pathParts.length - 1] || '';

        try {
          const csrf = getCsrfToken();
          const resp = await fetch('/auth/password/reset', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': csrf,
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({
              email: email,
              password: password,
              password_confirmation: confirmPassword,
              token: token
            })
          });

          const data = await resp.json();

          if (resp.ok) {
            showToast('success', 'Password Reset!', 'Your password has been reset. Redirecting to login...');
            setTimeout(function () {
              window.location.href = '/auth/login';
            }, 1200);
          } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Reset Password';
            const detail = (data.errors && data.errors[0] && data.errors[0].detail) || data.status || 'Failed to reset password.';
            showToast('error', 'Reset Failed', detail);
            if (msgBox) {
              msgBox.className = 'login-error';
              msgBox.textContent = detail;
              msgBox.style.display = 'block';
            }
          }
        } catch (err) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Reset Password';
          const netMsg = 'Network error updating password.';
          showToast('error', 'Error', netMsg);
          if (msgBox) {
            msgBox.className = 'login-error';
            msgBox.textContent = netMsg;
            msgBox.style.display = 'block';
          }
        }
      });
    }
  }

  // ----------------------------------------------------------------------------
  // GSAP PARALLAX & CINEMATIC INTRO ANIMATION
  // ----------------------------------------------------------------------------
  let parallaxInitialized = false;
  function setupParallax() {
    if (typeof gsap === 'undefined') {
      setTimeout(setupParallax, 50);
      return;
    }

    gsap.set(".desert-wrapper", { backgroundColor: "#F7ABAE" });
    gsap.set(".parallax-container", { scale: 1, opacity: 1, visibility: "visible" });

    const slot = document.getElementById('apparatus-card-slot');
    if (slot) {
      const shouldShow = isAuthPage() || isUnauthorizedAdminAttempt();
      slot.style.display = shouldShow ? 'block' : 'none';
      if (shouldShow) {
        slot.style.opacity = '1';
        slot.style.visibility = 'visible';
      }
    }

    if (parallaxInitialized) return;
    parallaxInitialized = true;

    gsap.fromTo(".login-card",
      { autoAlpha: 0, y: 35, scale: 0.96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out", delay: 0.05 }
    );

    // Continuous floating wave motion on layers
    const layers = [1, 2, 3, 4, 5, 6, 7];
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

    // Mouse parallax tracking (Throttled with requestAnimationFrame for 60/120fps performance)
    let mouseRafId = null;
    window.addEventListener('mousemove', function (e) {
      if (document.body.classList.contains('apparatus-no-parallax') || document.body.classList.contains('apparatus-reduce-motion')) return;
      if (mouseRafId) return;
      const clientX = e.clientX;
      mouseRafId = requestAnimationFrame(function () {
        mouseRafId = null;
        const x = (clientX / window.innerWidth - 0.5) * 2;
        layers.forEach(function (layerNum) {
          const depth = layerNum * 8;
          gsap.to('.layer-' + layerNum, {
            x: -x * depth,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });

        gsap.to('.layer-text', {
          x: -x * 24,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    }, { passive: true });
  }

  // Global tactile feedback click interceptor
  document.addEventListener('click', function (e) {
    if (e.target.closest('button, a, input[type="checkbox"], input[type="radio"], .apparatus-blur-opt-btn, .apparatus-wp-preset-card')) {
      playClickSound();
    }
  }, true);

  // Initialize and Handle Navigation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApparatus);
  } else {
    initApparatus();
  }


  // Global click interception: block non-admins attempting to access /admin
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href*="/admin"], a[data-path="/admin"]');
    if (!a) return;
    const user = window.PterodactylUser;
    const isRootAdmin = !!(user && user.root_admin);
    if (!isRootAdmin) {
      e.preventDefault();
      e.stopPropagation();
      window.history.pushState({}, '', '/admin');
      initApparatus();
    }
  }, true);

  // Global tactile feedback: Glass Ripple on click/tap for interactive controls

  document.addEventListener('pointerdown', function (e) {

    const target = e.target.closest('.apparatus-btn, .apparatus-tab-btn, .apparatus-upgrade-pill, .apparatus-copy-ref-btn, .apparatus-metric-tile, .apparatus-nav-link, .apparatus-link, .apparatus-server-card');

    if (!target) return;

    const rect = target.getBoundingClientRect();

    const ripple = document.createElement('span');

    ripple.className = 'apparatus-click-ripple';

    const size = Math.max(rect.width, rect.height) * 1.6;

    ripple.style.width = size + 'px';

    ripple.style.height = size + 'px';

    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';

    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

    target.appendChild(ripple);

    setTimeout(function () {

      try { ripple.remove(); } catch (err) {}

    }, 600);

  });



  // Dynamic cleanup and route sync observer for Pterodactyl SPA updates (RAF Debounced)
  let lastObservedPath = window.location.pathname;
  let observerRafId = null;
  const apparatusObserver = new MutationObserver(function () {
    if (observerRafId) return;
    observerRafId = requestAnimationFrame(function () {
      observerRafId = null;
      if (!isAuthPage() && !isUnauthorizedAdminAttempt()) {
        cleanPterodactylElements();
        if (window.location.pathname !== lastObservedPath) {
          lastObservedPath = window.location.pathname;
          applyViewMode();
        }
      }
    });
  });
  apparatusObserver.observe(document.body || document.documentElement, { childList: true, subtree: true });

  window.addEventListener('popstate', function () {
    initApparatus();
    applyViewMode();
  });
  window.addEventListener('hashchange', applyViewMode);

  const origPushState = history.pushState;
  if (origPushState) {
    history.pushState = function () {
      origPushState.apply(this, arguments);
      setTimeout(function () {
        initApparatus();
        applyViewMode();
      }, 20);
    };
  }

  const origReplaceState = history.replaceState;
  if (origReplaceState) {
    history.replaceState = function () {
      origReplaceState.apply(this, arguments);
      setTimeout(function () {
        applyViewMode();
      }, 20);
    };
  }
})();
