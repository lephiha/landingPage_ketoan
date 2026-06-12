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

      <a href="${root}bang-gia.html" class="nav-link ${activePage==='bang-gia'?'active':''}">Bảng giá</a>

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

      <a href="#" class="nav-link">Liên hệ</a>
    </div>

    <div class="nav-actions">
      <a href="tel:0869425631" class="nav-hotline">📞 0869 425 631</a>
      <a href="#" class="btn-brand" style="padding:9px 20px;font-size:13px;">Đăng ký</a>
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
function renderSocialFloat() {
  const el = document.createElement("div");
  el.className = "social-float";
  el.innerHTML = `
    <a class="sf-btn sf-zalo1" href="#" title="Zalo OA">Z</a>
    <a class="sf-btn sf-zalo2" href="#" title="Zalo Chat">Z</a>
    <a class="sf-btn sf-fb"   href="#" title="Facebook">f</a>
    <a class="sf-btn sf-ph"   href="#" title="Hotline">📞</a>
  `;
  document.body.appendChild(el);
}

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
      <div>Hotline: <span class="brand-color">0869 425 631</span> &nbsp;|&nbsp; <a href="#">Chính sách bảo mật</a> &nbsp;|&nbsp; <a href="#">Điều khoản</a></div>
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
      <span>🏆 50,000+ Doanh nghiệp</span>
      <span>⚡ Tự động hóa 90%</span>
      <span>🔒 Bảo mật chuẩn ngân hàng</span>
      <span>📱 Dùng trên mọi thiết bị</span>
      <span>🎁 Dùng thử miễn phí 30 ngày</span>
      <span>✅ Cập nhật pháp luật liên tục</span>
      <span>🏆 50,000+ Doanh nghiệp</span>
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
