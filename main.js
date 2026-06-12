/* ─────────────────────────────────────────
   KETOAN – main.js   (shared animations)
   Requires: GSAP + ScrollTrigger + components.js
   ───────────────────────────────────────── */
"use strict";

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════
   1. SCROLL ANIMATIONS  (data-gsap attrs)
════════════════════════════════════════ */
const presets = {
  "fade-up":    { y: 50, opacity: 0 },
  "fade-down":  { y: -50, opacity: 0 },
  "zoom-in":    { scale: .75, opacity: 0 },
  "slide-left": { x: 70, opacity: 0 },
  "slide-right":{ x: -70, opacity: 0 },
};

function buildScrollAnimations() {
  document.querySelectorAll("[data-gsap]").forEach(el => {
    const from  = presets[el.dataset.gsap] || presets["fade-up"];
    const delay = parseFloat(el.dataset.delay || 0);
    gsap.fromTo(el, from, {
      y:0, x:0, scale:1, opacity:1,
      duration: .8, delay, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true }
    });
  });
}
buildScrollAnimations();

/* ════════════════════════════════════════
   2. STAGGER GROUPS
════════════════════════════════════════ */
function staggerGroup(selector, stagger = 0.1) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  gsap.fromTo(els, { y: 40, opacity: 0 }, {
    y:0, opacity:1, duration: .7, stagger,
    ease: "power3.out",
    scrollTrigger: { trigger: els[0].parentElement, start: "top 82%", once: true }
  });
}
staggerGroup(".about-card",   .1);
staggerGroup(".feat-card",    .08);
staggerGroup(".tn-card",      .08);
staggerGroup(".news-card",    .09);
staggerGroup(".price-card",   .1);
staggerGroup(".demo-list li", .12);
staggerGroup(".detail-benefits li", .1);
staggerGroup(".detail-steps li",    .1);

/* ════════════════════════════════════════
   3. COUNTER ANIMATION
════════════════════════════════════════ */
document.querySelectorAll(".stat-num[data-count]").forEach(el => {
  const target = parseInt(el.dataset.count, 10);
  ScrollTrigger.create({
    trigger: el, start: "top 85%", once: true,
    onEnter() {
      gsap.to({ val: 0 }, {
        val: target, duration: 1.8, ease: "power2.out",
        onUpdate() {
          const v = Math.round(this.targets()[0].val);
          el.textContent = target >= 1000 ? v.toLocaleString("vi-VN") : v;
        }
      });
    }
  });
});

/* ════════════════════════════════════════
   4. CARD TILT ON HOVER
════════════════════════════════════════ */
document.querySelectorAll(".about-card, .feat-card, .tn-card, .price-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r  = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width/2)  / (r.width/2);
    const dy = (e.clientY - r.top  - r.height/2) / (r.height/2);
    gsap.to(card, { rotateY: dx*5, rotateX: -dy*5, transformPerspective: 900, duration:.25, ease:"power2.out" });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: .5, ease: "power3.out" });
  });
});

/* ════════════════════════════════════════
   5. MAGNETIC BUTTONS
════════════════════════════════════════ */
document.querySelectorAll(".btn-brand, .btn-white, .btn-hero-primary").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const r  = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width/2);
    const dy = e.clientY - (r.top  + r.height/2);
    gsap.to(btn, { x: dx*.18, y: dy*.18, duration: .3, ease: "power2.out" });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { x: 0, y: 0, duration: .5, ease: "elastic.out(1,.4)" });
  });
});

/* ════════════════════════════════════════
   6. PHONE BAR CHART ANIMATION
════════════════════════════════════════ */
const bars = document.querySelectorAll(".phone-chart .bar");
if (bars.length) {
  setTimeout(() => bars.forEach(b => {
    b.style.height = b.style.getPropertyValue("--h") || "40px";
  }), 900 + Math.random()*300);
}

/* ════════════════════════════════════════
   7. HERO X10 ENTRANCE  (index only)
════════════════════════════════════════ */
if (document.querySelector(".x10-num")) {
  gsap.fromTo(".x10-num", { scale:2.2, opacity:0 }, { scale:1, opacity:1, duration:.9, delay:.45, ease:"elastic.out(1,.6)" });
  gsap.fromTo(".x10-x",  { x:36, opacity:0 }, { x:0, opacity:1, duration:.55, delay:.35, ease:"power3.out" });
}

/* ════════════════════════════════════════
   8. PARTICLE CANVAS  (hero, index)
════════════════════════════════════════ */
(function particles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = canvas.parentElement.offsetWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
  }
  function Dot() { this.reset(); }
  Dot.prototype.reset = function() {
    this.x = Math.random()*W; this.y = Math.random()*H;
    this.r = Math.random()*1.6+.3;
    this.vx = (Math.random()-.5)*.3; this.vy = (Math.random()-.5)*.3;
    this.a  = Math.random()*.45+.08;
  };
  Dot.prototype.update = function() {
    this.x+=this.vx; this.y+=this.vy;
    if(this.x<0||this.x>W||this.y<0||this.y>H) this.reset();
  };
  resize(); pts = Array.from({length:80}, ()=>new Dot());
  (function draw() {
    ctx.clearRect(0,0,W,H);
    pts.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${p.a})`; ctx.fill(); p.update();
    });
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
      if(d<75){ ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle=`rgba(255,200,220,${.06*(1-d/75)})`; ctx.lineWidth=.5; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  })();
  window.addEventListener("resize", ()=>{ resize(); pts=Array.from({length:80},()=>new Dot()); });
})();

/* ════════════════════════════════════════
   9. MARQUEE PAUSE ON HOVER
════════════════════════════════════════ */
const mt = document.querySelector(".marquee-track");
if(mt) {
  mt.addEventListener("mouseenter", ()=> mt.style.animationPlayState="paused");
  mt.addEventListener("mouseleave", ()=> mt.style.animationPlayState="running");
}

/* ════════════════════════════════════════
  10. NEWS FILTER  (tin-tuc page)
════════════════════════════════════════ */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.cat;
    document.querySelectorAll(".news-card").forEach(card => {
      const show = !cat || cat === "all" || card.dataset.cat === cat;
      gsap.to(card, { opacity: show?1:0.2, scale: show?1:.95, duration:.3 });
      card.style.pointerEvents = show ? "" : "none";
    });
  });
});

/* ════════════════════════════════════════
  11. FOOTER + ACTIVE NAV
════════════════════════════════════════ */
gsap.fromTo("footer", {opacity:0,y:28},{
  opacity:1, y:0, duration:.8, ease:"power3.out",
  scrollTrigger:{ trigger:"footer", start:"top 94%", once:true }
});

console.log("%cKeToan 💜 UI loaded", "color:#C8396A;font-weight:bold;font-size:14px");
