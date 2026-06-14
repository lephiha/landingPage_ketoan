/* ─────────────────────────────────────────
   KETOAN – components.js
   Injects shared navbar + footer into every page
   ───────────────────────────────────────── */
"use strict";

/* ── resolve relative paths based on depth ── */
const depth = (window.location.pathname.match(/\//g) || []).length - 1;
const root  = depth <= 1 ? "./" : "../";

/* ════════════════════════════════════════
   NAVBAR HTML
════════════════════════════════════════ */
function renderNavbar(activePage = "") {
  const nav = document.createElement("nav");
  nav.id = "navbar";
  nav.innerHTML = `
    <a href="${root}index.html" class="nav-logo">
      <div class="logo-icon">KT</div>
      <div>
        <div class="logo-text">Ke<span>Toan</span></div>
        <span class="logo-sub">Accounting Software</span>
      </div>
    </a>

    <div class="nav-links">
      <a href="${root}index.html" class="nav-link ${activePage==='home'?'active':''}">Trang chủ</a>

      <!-- Tính năng mega -->
      <div class="nav-group">
        <a href="${root}tinh-nang.html" class="nav-link has-dropdown ${activePage==='tinh-nang'?'active':''}">Tính năng</a>
        <div class="mega-wrap">
          <a href="${root}tinh-nang.html" class="mega-header">Xem tổng quan tất cả tính năng →</a>
          <div class="mega-cols">
            <a href="${root}tinh-nang/ke-toan-tong-hop.html"   class="mega-item">Kế toán tổng hợp</a>
            <a href="${root}tinh-nang/hoa-don-dien-tu.html"    class="mega-item">Hoá đơn điện tử</a>
            <a href="${root}tinh-nang/ket-noi-ngan-hang.html"  class="mega-item">Kết nối ngân hàng</a>
            <a href="${root}tinh-nang/quan-ly-thue.html"       class="mega-item">Quản lý thuế</a>
            <a href="${root}tinh-nang/quan-ly-kho.html"        class="mega-item">Quản lý kho</a>
            <a href="${root}tinh-nang/ke-toan-tien-luong.html" class="mega-item">Kế toán tiền lương</a>
            <a href="${root}tinh-nang/bao-cao-tai-chinh.html"  class="mega-item">Báo cáo tài chính</a>
            <a href="${root}tinh-nang/ke-toan-mua-hang.html"   class="mega-item">Kế toán mua hàng</a>
            <a href="${root}tinh-nang/tai-san-co-dinh.html"    class="mega-item">Tài sản cố định</a>
          </div>
        </div>
      </div>

      <a href="${root}index.html#bang-gia" class="nav-link ${activePage==='bang-gia'?'active':''}">Bảng giá</a>

      <!-- Hỗ trợ dropdown -->
      <div class="nav-group">
        <a href="#" class="nav-link has-dropdown">Hỗ trợ</a>
        <div class="drop-wrap">
          <a href="#" class="drop-item">📚 Tài liệu hướng dẫn</a>
          <a href="#" class="drop-item">🎬 Video hướng dẫn</a>
          <a href="#" class="drop-item">❓ FAQ</a>
          <a href="#" class="drop-item">💬 Liên hệ hỗ trợ</a>
        </div>
      </div>

      <!-- Tin tức dropdown -->
      <div class="nav-group">
        <a href="${root}tin-tuc.html" class="nav-link has-dropdown ${activePage==='tin-tuc'?'active':''}">Tin tức</a>
        <div class="drop-wrap">
          <a href="${root}tin-tuc.html?cat=thue"       class="drop-item">📋 Thuế & chính sách mới</a>
          <a href="${root}tin-tuc.html?cat=nghiep-vu"  class="drop-item">📊 Nghiệp vụ kế toán</a>
          <a href="${root}tin-tuc.html?cat=mau-bieu"   class="drop-item">📝 Mẫu biểu & công cụ</a>
          <a href="${root}tin-tuc.html?cat=khuyen-mai" class="drop-item">🎁 Tin KeToan & khuyến mại</a>
          <a href="${root}tin-tuc.html?cat=chung"      class="drop-item">📰 Tin tức chung</a>
        </div>
      </div>

      <a href="${root}index.html#dang-ky" class="nav-link">Liên hệ</a>
    </div>

    <div class="nav-actions">
      <a href="tel:0869425631" class="nav-hotline">📞 0392 405 600</a>
      <a href="https://webapp.letieu8.workers.dev/login" class="btn-outline" style="padding:9px 20px;font-size:13px;">Đăng nhập</a>
      <button onclick="openRegModal()" class="btn-brand" style="padding:9px 20px;font-size:13px;border:none;cursor:pointer;font-family:inherit;">Đăng ký</button>
    </div>
    <button class="nav-burger" id="burger">☰</button>
  `;

  document.body.insertBefore(nav, document.body.firstChild);

  /* mobile drawer */
  const drawer = document.createElement("div");
  drawer.className = "mobile-drawer";
  drawer.id = "drawer";
  drawer.innerHTML = `
    <a href="${root}index.html">Trang chủ</a>
    <a href="${root}tinh-nang.html">Tính năng</a>
    <a href="${root}bang-gia.html">Bảng giá</a>
    <a href="#">Hỗ trợ</a>
    <a href="${root}tin-tuc.html">Tin tức</a>
    <a href="#">Liên hệ</a>
    <a href="#" class="btn-brand" style="text-align:center;margin-top:8px;">Đăng ký ngay</a>
  `;
  document.body.insertBefore(drawer, nav.nextSibling);

  // Modal đăng ký
  const modal = document.createElement("div");
  modal.id = "regModal";
  modal.style.cssText = "display:none;position:fixed;inset:0;z-index:9999;background:rgba(20,5,40,.6);backdrop-filter:blur(4px);align-items:center;justify-content:center;padding:20px;";
  modal.innerHTML = `
    <div style="background:#fff;border-radius:20px;max-width:480px;width:100%;padding:36px 32px;position:relative;box-shadow:0 32px 80px rgba(0,0,0,.3);animation:modalIn .3s ease;">
      <button onclick="closeRegModal()" style="position:absolute;top:14px;right:16px;background:none;border:none;font-size:22px;cursor:pointer;color:#999;">✕</button>
      <h3 style="font-size:15px;font-weight:800;text-align:center;margin-bottom:6px;color:#1A0A2E;">ĐĂNG KÝ NHẬN TƯ VẤN VÀ DÙNG THỬ</h3>
      <div style="text-align:center;color:#C8396A;font-size:13.5px;font-weight:700;margin-bottom:22px;">🎁 Tặng 100 số hoá đơn đầu vào</div>
      <form id="modalRegForm" style="display:flex;flex-direction:column;gap:11px;">
        <input name="name"  type="text"  placeholder="Họ và tên *" required style="padding:12px 15px;border:1.5px solid #EDE5F0;border-radius:10px;font-size:14px;font-family:inherit;outline:none;"/>
        <input name="email" type="email" placeholder="Email *"      required style="padding:12px 15px;border:1.5px solid #EDE5F0;border-radius:10px;font-size:14px;font-family:inherit;outline:none;"/>
        <input name="phone" type="tel"   placeholder="Số điện thoại *" required style="padding:12px 15px;border:1.5px solid #EDE5F0;border-radius:10px;font-size:14px;font-family:inherit;outline:none;"/>
        <input name="tax"   type="text"  placeholder="Mã số thuế"  style="padding:12px 15px;border:1.5px solid #EDE5F0;border-radius:10px;font-size:14px;font-family:inherit;outline:none;"/>
        <select name="product" style="padding:12px 15px;border:1.5px solid #EDE5F0;border-radius:10px;font-size:14px;font-family:inherit;outline:none;color:#aaa;">
          <option value="" disabled selected>Chọn sản phẩm quan tâm</option>
          <option>Kế toán doanh nghiệp</option>
          <option>Kế toán hộ kinh doanh</option>
          <option>Dịch vụ kế toán</option>
          <option>Hóa đơn điện tử</option>
        </select>
        <button type="submit" style="padding:14px;background:linear-gradient(135deg,#C8396A,#7C3F8E);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;margin-top:4px;">NHẬN TƯ VẤN NGAY</button>
      </form>
      <div id="modalSuccess" style="display:none;text-align:center;padding:24px 0;">
        <div style="font-size:52px;margin-bottom:12px;">🎉</div>
        <h4 style="font-size:18px;font-weight:900;margin-bottom:8px;">Đăng ký thành công!</h4>
        <p style="color:#6B5B78;font-size:14px;line-height:1.7;">Cảm ơn bạn đã quan tâm đến KeToan.<br>Chúng tôi sẽ liên hệ trong vòng <strong>30 phút</strong>.</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Đóng khi click backdrop
  modal.addEventListener("click", e => { if(e.target === modal) closeRegModal(); });
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeRegModal(); });

  // Submit form → gửi mail qua mailto (hoặc formspree)
  document.getElementById("modalRegForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const btn = this.querySelector("button[type=submit]");
  const d   = Object.fromEntries(new FormData(this));

  btn.textContent = "Đang gửi...";
  btn.disabled    = true;

  emailjs.send(
    "service_6zzl60q",   
    "template_xh4goo3",   
    {
      to_email : "phihasky@gmail.com",
      from_name: d.name,
      email    : d.email,
      phone    : d.phone,
      tax      : d.tax    || "N/A",
      product  : d.product|| "N/A",
    }
  )
  .then(() => {
    this.style.display = "none";
    document.getElementById("modalSuccess").style.display = "block";
  })
  .catch(err => {
    btn.textContent = "NHẬN TƯ VẤN NGAY";
    btn.disabled    = false;
    alert("Gửi thất bại, vui lòng thử lại!\n" + JSON.stringify(err));
  });

  // Load EmailJS SDK động
  const ejsScript = document.createElement("script");
  ejsScript.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
  ejsScript.onload = () => emailjs.init("VxLy2TYylhklg9NR5"); 
  document.head.appendChild(ejsScript);
});

  /* burger toggle */
  document.getElementById("burger").addEventListener("click", () => {
    drawer.classList.toggle("open");
    document.getElementById("burger").textContent = drawer.classList.contains("open") ? "✕" : "☰";
  });

  /* scroll class */
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });
}

/* ════════════════════════════════════════
   SOCIAL FLOAT
════════════════════════════════════════ */
// function renderSocialFloat() {
//   const el = document.createElement("div");
//   el.className = "social-float";
//   el.innerHTML = `
//     <a class="sf-btn sf-zalo1" href="#" title="Zalo OA">Z</a>
//     <a class="sf-btn sf-zalo2" href="#" title="Zalo Chat">Z</a>
//     <a class="sf-btn sf-fb"   href="#" title="Facebook">f</a>
//     <a class="sf-btn sf-ph"   href="#" title="Hotline">📞</a>
//   `;
//   document.body.appendChild(el);
// }

/* ════════════════════════════════════════
   FOOTER HTML
════════════════════════════════════════ */
function renderFooter() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${root}index.html" class="nav-logo" style="text-decoration:none;display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div class="logo-icon">KT</div>
          <div>
            <div class="logo-text" style="color:#fff">Ke<span>Toan</span></div>
            <span class="logo-sub">Accounting Software</span>
          </div>
        </a>
        <p>Phần mềm kế toán online đáp ứng đầy đủ nghiệp vụ doanh nghiệp. Tự động hóa quy trình, tiết kiệm thời gian và chi phí.</p>
      </div>
      <div>
        <h4>Tính năng</h4>
        <ul>
          <li><a href="${root}tinh-nang/ke-toan-tong-hop.html">Kế toán tổng hợp</a></li>
          <li><a href="${root}tinh-nang/hoa-don-dien-tu.html">Hoá đơn điện tử</a></li>
          <li><a href="${root}tinh-nang/ket-noi-ngan-hang.html">Kết nối ngân hàng</a></li>
          <li><a href="${root}tinh-nang/quan-ly-thue.html">Quản lý thuế</a></li>
          <li><a href="${root}tinh-nang/quan-ly-kho.html">Quản lý kho</a></li>
        </ul>
      </div>
      <div>
        <h4>Hỗ trợ</h4>
        <ul>
          <li><a href="#">Tài liệu hướng dẫn</a></li>
          <li><a href="#">Video hướng dẫn</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Liên hệ hỗ trợ</a></li>
        </ul>
      </div>
      <div>
        <h4>Công ty</h4>
        <ul>
          <li><a href="#">Giới thiệu</a></li>
          <li><a href="${root}tin-tuc.html">Tin tức</a></li>
          <li><a href="#">Đối tác</a></li>
          <li><a href="#">Tuyển dụng</a></li>
        </ul>
      </div>
    </div>
    <hr class="footer-divider"/>
    <div class="footer-bottom">
      <div>© 2024 <span class="brand-color">KeToan</span> – Phần mềm kế toán online</div>
      <div>Hotline: <span class="brand-color">0392 405 600</span> &nbsp;|&nbsp; <a href="#">Chính sách bảo mật</a> &nbsp;|&nbsp; <a href="#">Điều khoản</a></div>
    </div>
  `;
  document.body.appendChild(footer);
}

/* ════════════════════════════════════════
   MARQUEE  (for index only)
════════════════════════════════════════ */
function renderMarquee() {
  const el = document.createElement("div");
  el.className = "marquee-band";
  el.innerHTML = `
    <div class="marquee-track">
      <span>🏆 500+ Doanh nghiệp</span>
      <span>⚡ Tự động hóa 90%</span>
      <span>🔒 Bảo mật chuẩn ngân hàng</span>
      <span>📱 Dùng trên mọi thiết bị</span>
      <span>🎁 Dùng thử miễn phí 30 ngày</span>
      <span>✅ Cập nhật pháp luật liên tục</span>
      <span>🏆 500+ Doanh nghiệp</span>
      <span>⚡ Tự động hóa 90%</span>
      <span>🔒 Bảo mật chuẩn ngân hàng</span>
      <span>📱 Dùng trên mọi thiết bị</span>
      <span>🎁 Dùng thử miễn phí 30 ngày</span>
      <span>✅ Cập nhật pháp luật liên tục</span>
    </div>
  `;
  return el;
}

/* ════════════════════════════════════════
   CTA BAND  (reusable)
════════════════════════════════════════ */
function renderCTABand() {
  const el = document.createElement("div");
  el.className = "cta-band";
  el.setAttribute("data-gsap", "fade-up");
  el.innerHTML = `
    <div>
      <h2>Bắt đầu dùng KeToan miễn phí ngay hôm nay</h2>
      <p>Không cần cài đặt, không cần thẻ tín dụng. Chỉ 2 phút để tạo tài khoản.</p>
    </div>
    <button class="btn-white">DÙNG THỬ MIỄN PHÍ →</button>
  `;
  return el;
}

function openRegModal() {
  const m = document.getElementById("regModal");
  m.style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeRegModal() {
  const m = document.getElementById("regModal");
  m.style.display = "none";
  document.body.style.overflow = "";
}
