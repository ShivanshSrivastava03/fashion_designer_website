/* ==========================================================================
   VRINDA SETHI — shared shell: header, nav, cart, toasts, card renderer
   No framework, no build step. State lives in localStorage.
   ========================================================================== */

/* ---------- Icon set (inline SVG, 1.4 stroke — matches reference weight) --- */
const I = {
  pin:  '<svg viewBox="0 0 24 24"><path d="M21 3 3 10.5l7.5 3L13.5 21 21 3Z"/></svg>',
  phone:'<svg viewBox="0 0 24 24"><path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3Z"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>',
  store:'<svg viewBox="0 0 24 24"><path d="M3 9h18l-1.2-4.2A1.5 1.5 0 0 0 18.4 4H5.6a1.5 1.5 0 0 0-1.4 1.1L3 9Z"/><path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/><path d="M9 20v-6h6v6"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.3 19a6.5 6.5 0 0 1 11.4 0"/></svg>',
  heart:'<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z"/></svg>',
  bag:  '<svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  x:    '<svg viewBox="0 0 24 24"><path d="m5 5 14 14M19 5 5 19"/></svg>',
  chevL:'<svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg>',
  chevR:'<svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>',
  chevD:'<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
  arrowR:'<svg viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>',
  truck:'<svg viewBox="0 0 24 24"><path d="M2 8h11v8H2zM13 11h4l3 3v2h-7z"/><circle cx="6" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
  share:'<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.4"/><circle cx="17" cy="6" r="2.4"/><circle cx="17" cy="18" r="2.4"/><path d="m8.2 10.8 6.6-3.6M8.2 13.2l6.6 3.6"/></svg>',
  hanger:'<svg viewBox="0 0 24 24"><path d="M12 7a2 2 0 1 1 2-2"/><path d="M12 7v2l8 5.5c1 .7.5 2.5-.8 2.5H4.8c-1.3 0-1.8-1.8-.8-2.5L12 9Z"/></svg>',
  ret:  '<svg viewBox="0 0 24 24"><path d="M4 8h13a4 4 0 0 1 0 8h-6"/><path d="m8 12-4 4 4 4"/></svg>',
  tag:  '<svg viewBox="0 0 24 24"><path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="7.5" cy="7.5" r="1.3"/></svg>',
  tick: '<svg viewBox="0 0 24 24"><path d="m4 12 5.5 5.5L20 7"/></svg>',
  shield:'<svg viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 5 3.4 8.2 8 9 4.6-.8 8-4 8-9V6l-8-3Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
  card: '<svg viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13"/><path d="M2.5 10h19"/></svg>',
  grid4:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  grid2:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="8"/><rect x="3" y="13" width="18" height="8"/></svg>'
};
const SOC = {
  ig:'<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.68.8.9 1.4.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2a3.8 3.8 0 0 1-.9 1.4c-.4.4-.8.68-1.4.9-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.6.5-1 .9-1.4.4-.4.8-.68 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm0 2.25a4.15 4.15 0 1 1 0 8.3 4.15 4.15 0 0 1 0-8.3Zm6.6-2.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/></svg>',
  fb:'<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg>',
  x:'<svg viewBox="0 0 24 24"><path d="M17.5 3h3.2l-7 8 8.3 10h-6.5l-5-6.2L4.6 21H1.4l7.5-8.6L1 3h6.7l4.6 5.7L17.5 3Zm-1.1 16h1.8L7.7 4.8H5.8L16.4 19Z"/></svg>',
  yt:'<svg viewBox="0 0 24 24"><path d="M22.5 7.2a2.7 2.7 0 0 0-1.9-1.9C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.6.5A2.7 2.7 0 0 0 1.5 7.2C1 8.9 1 12 1 12s0 3.1.5 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 0 0 1.9-1.9c.5-1.7.5-4.8.5-4.8s0-3.1-.5-4.8ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"/></svg>',
  pin:'<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.6 19.3c-.05-.8-.1-2 .1-2.9l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.6 1.3 1.4 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.5 1.9 1.9 0 3.2-2.4 3.2-5.2 0-2.1-1.4-3.7-4-3.7a4.6 4.6 0 0 0-4.8 4.6c0 .9.3 1.5.7 2 .2.2.2.3.1.5l-.2.8c-.05.3-.2.4-.5.2-1.3-.5-1.9-2-1.9-3.6 0-2.7 2.3-6 6.8-6 3.6 0 6 2.6 6 5.4 0 3.7-2 6.5-5 6.5-1 0-2-.5-2.3-1.2l-.6 2.4c-.2.8-.7 1.8-1.1 2.4A10 10 0 1 0 12 2Z"/></svg>'
};

/* ---------- Cart ----------------------------------------------------------- */
const CART_KEY = "vs_bag_v1";
const WISH_KEY = "vs_wish_v1";
const ADDR_KEY = "vs_addr_v1";
const ORDER_KEY = "vs_order_v1";

function readJSON(k, fb){ try { return JSON.parse(localStorage.getItem(k)) ?? fb; } catch { return fb; } }
function writeJSON(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

const Cart = {
  all(){ return readJSON(CART_KEY, []); },
  count(){ return this.all().reduce((n, l) => n + l.qty, 0); },
  add(id, size, qty = 1){
    const lines = this.all();
    const hit = lines.find(l => l.id === id && l.size === size);
    if (hit) hit.qty = Math.min(5, hit.qty + qty); else lines.push({ id, size, qty });
    writeJSON(CART_KEY, lines); paintBagCount(); return lines;
  },
  setQty(i, qty){ const l = this.all(); if (l[i]) { l[i].qty = qty; writeJSON(CART_KEY, l); paintBagCount(); } },
  setSize(i, size){ const l = this.all(); if (l[i]) { l[i].size = size; writeJSON(CART_KEY, l); } },
  remove(i){ const l = this.all(); l.splice(i, 1); writeJSON(CART_KEY, l); paintBagCount(); },
  clear(){ writeJSON(CART_KEY, []); paintBagCount(); },
  totals(){
    let value = 0, mrp = 0;
    this.all().forEach(l => { const p = byId(l.id); if (!p) return; value += p.price * l.qty; mrp += p.mrp * l.qty; });
    // insured courier is free above the threshold, ₹450 below it
    const ship = value > 0 && value < 40000 ? 450 : 0;
    return { value, mrp, saved: mrp - value, ship, grand: value + ship };
  }
};

const Wish = {
  all(){ return readJSON(WISH_KEY, []); },
  has(id){ return this.all().includes(id); },
  toggle(id){
    const w = this.all(); const i = w.indexOf(id);
    if (i > -1) w.splice(i, 1); else w.push(id);
    writeJSON(WISH_KEY, w); return i === -1;
  }
};

function paintBagCount(){
  const n = Cart.count();
  document.querySelectorAll("[data-bag-count]").forEach(el => {
    el.textContent = n; el.setAttribute("data-count", n);
  });
}

/* ---------- Toast (white slab, matches "Product Added to Shopping Bag") ---- */
let toastT;
function toast(msg){
  let el = document.querySelector(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add("is-on"));
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove("is-on"), 2400);
}

/* ---------- Header --------------------------------------------------------- */
function megaHTML(key){
  const t = TAXONOMY[key]; if (!t) return "";
  const cols = t.groups.map(g => `
    <div class="mega__col">
      <h4>${g.title}</h4>
      <ul>${g.items.map(([label, sub]) =>
        `<li><a href="${sub === 'atelier' ? 'atelier.html' : key + '.html?sub=' + sub}">${label}</a></li>`
      ).join("")}</ul>
    </div>`).join("");
  return `<div class="mega"><div class="mega__inner">${cols}
    <a class="mega__promo" href="${t.promo.href}">
      <img src="${t.promo.img}" alt="${t.promo.title}">
      <figcaption><b>${t.promo.title}</b><span>${t.promo.cta}</span></figcaption>
    </a></div></div>`;
}

function buildHeader(active){
  const nav = [
    { label:"New Arrivals", href:"women.html?sub=new" },
    { label:"Women", href:"women.html", mega:"women", key:"women" },
    { label:"Men", href:"men.html", mega:"men", key:"men" },
    { label:"Bridal", href:"women.html?sub=bridal" },
    { label:"The Atelier", href:"atelier.html", key:"atelier" },
    { label:"Made To Measure", href:"atelier.html#mtm" },
    { label:"Sale", href:"women.html?sub=sale", sale:true }
  ];
  return `
  <header class="hdr" id="hdr">
    <div class="hdr__top">
      <div style="display:flex;align-items:center;gap:14px">
        <button class="hamburger" id="burger" aria-label="Menu">${I.menu}</button>
        <div class="hdr__util">
          <a href="atelier.html#visit">${I.pin}<span>Ateliers</span></a>
          <span class="divider">|</span>
          <a href="tel:${BRAND.phone}">${I.phone}<span>${BRAND.phone}</span></a>
        </div>
      </div>
      <a href="index.html" class="wordmark">${BRAND.mark}<small>${BRAND.city}</small></a>
      <div class="hdr__icons">
        <button class="icon-btn" id="searchBtn" aria-label="Search">${I.search}</button>
        <a class="icon-btn" href="atelier.html#visit" aria-label="Ateliers">${I.store}</a>
        <button class="icon-btn" id="acctBtn" aria-label="Account">${I.user}</button>
        <a class="icon-btn" href="women.html?sub=new" aria-label="Wishlist">${I.heart}</a>
        <a class="icon-btn" href="bag.html" aria-label="Shopping bag">${I.bag}
          <span class="bag-count" data-bag-count data-count="0">0</span></a>
      </div>
    </div>
    <nav class="hdr__nav">
      ${nav.map(n => `
        <div class="nav__item ${n.sale ? "nav__item--sale" : ""} ${n.key && n.key === active ? "is-active" : ""}">
          <a href="${n.href}">${n.label}</a>${n.mega ? megaHTML(n.mega) : ""}
        </div>`).join("")}
    </nav>
  </header>

  <div class="scrim" id="scrim"></div>
  <aside class="drawer" id="drawer">
    <button class="drawer__x" id="drawerX" aria-label="Close">${I.x}</button>
    <a href="index.html" class="wordmark" style="font-size:16px;padding:6px 24px 0;display:block">${BRAND.mark}</a>
    ${["women","men"].map(k => `<h4>${TAXONOMY[k].label}</h4>
      ${TAXONOMY[k].groups[0].items.map(([l, s]) => `<a href="${k}.html?sub=${s}">${l}</a>`).join("")}`).join("")}
    <h4>The House</h4>
    <a href="atelier.html">The Atelier</a>
    <a href="atelier.html#mtm">Made To Measure</a>
    <a href="atelier.html#visit">Ateliers &amp; Appointments</a>
    <a href="women.html?sub=sale">Archive Sale</a>
  </aside>`;
}

function buildFooter(){
  const col = (h, items) => `<div><h4>${h}</h4><ul>${items.map(([l, u]) => `<li><a href="${u}">${l}</a></li>`).join("")}</ul></div>`;
  return `
  <div class="trust"><div class="trust__inner">
    <span>${I.shield}100% Handcrafted In India</span>
    <span>${I.card}Secure Payment</span>
    <span>${I.ret}15-Day Returns &amp; Exchange</span>
  </div></div>
  <footer class="ftr">
    <div class="ftr__cols">
      <div>
        <h4 class="u">Client Care</h4>
        <p>Our atelier team is available<br>Monday to Saturday, 10–7 IST.</p>
        <a class="phone" href="tel:${BRAND.phone}">Call ${BRAND.phone}</a>
      </div>
      ${col("The House", [["Our Story","atelier.html"],["The Atelier","atelier.html#craft"],["Craft &amp; Karigars","atelier.html#craft"],["Press","atelier.html#press"],["Careers","atelier.html"]])}
      ${col("Shopping", [["Women","women.html"],["Men","men.html"],["Bridal Couture","women.html?sub=bridal"],["Made To Measure","atelier.html#mtm"],["Gift Cards","atelier.html"],["Size Guide","atelier.html"]])}
      ${col("Client Services", [["Shipping Policy","atelier.html"],["Returns &amp; Exchange","atelier.html"],["Alterations","atelier.html#mtm"],["Garment Care","atelier.html#craft"],["FAQs","atelier.html"],["Terms of Use","atelier.html"]])}
      ${col("Visit Us", [["Delhi Flagship","atelier.html#visit"],["Mumbai Atelier","atelier.html#visit"],["Book an Appointment","atelier.html#visit"],["Trunk Shows","atelier.html#press"]])}
      <div class="ftr__social">
        <a href="#" aria-label="Instagram">${SOC.ig}</a><a href="#" aria-label="Facebook">${SOC.fb}</a>
        <a href="#" aria-label="X">${SOC.x}</a><a href="#" aria-label="YouTube">${SOC.yt}</a>
        <a href="#" aria-label="Pinterest">${SOC.pin}</a>
      </div>
    </div>
    <div class="ftr__about">
      <div class="mark">VRINDA<br>SETHI</div>
      <div>
        <h5>Couture, Prêt and Bridal from New Delhi</h5>
        <p>Founded in ${BRAND.founded}, the house of Vrinda Sethi works with a standing atelier of 140 karigars across Delhi, Lucknow and Bhuj. Every garment is cut in-house and hand-finished; nothing is licensed and nothing is outsourced.</p>
        <p>This is a demonstration storefront built for design review. Products, prices and orders are fictional; no payment is taken and no data leaves your browser.</p>
      </div>
    </div>
    <div class="ftr__legal">© ${new Date().getFullYear()} Vrinda Sethi. Demo build — not a real store.</div>
  </footer>`;
}

/* ---------- Product card --------------------------------------------------- */
function cardHTML(p, opts = {}){
  const d = discountPct(p);
  const two = p.images[1] || p.images[0];
  const sizeRow = p.sizes.map(s => `<span class="${p.stock[s] ? "" : "out"}">${s}</span>`).join("");
  return `
  <article class="card" data-id="${p.id}">
    <a class="card__media" href="product.html?id=${p.id}" aria-label="${p.name}">
      <img src="${img(p.images[0])}" alt="${p.name}" loading="lazy">
      <img class="alt" src="${img(two)}" alt="" loading="lazy">
    </a>
    ${p.tag ? `<span class="card__tag">${p.tag}</span>` : ""}
    <span class="card__ship" title="Express delivery available">${I.truck}</span>
    <button class="card__wish ${Wish.has(p.id) ? "is-on" : ""}" data-wish="${p.id}" aria-label="Save">${I.heart}</button>
    <div class="card__sizes">${sizeRow}</div>
    <a class="card__body" href="product.html?id=${p.id}">
      <div class="card__brand">${p.line.replace("Vrinda Sethi ", "")}</div>
      <div class="card__name">${p.name}</div>
      <div class="card__price">
        <span>${inr(p.price)}</span>
        ${d ? `<span class="was">${inr(p.mrp)}</span><span class="off">${d}% off</span>` : ""}
      </div>
    </a>
  </article>`;
}

/* ---------- Rails ---------------------------------------------------------- */
function railHTML(id, items){
  return `<div class="rail" data-rail="${id}">
    <button class="rail__arrow" data-dir="prev" aria-label="Previous">${I.chevL}</button>
    <div class="rail__track">${items}</div>
    <button class="rail__arrow" data-dir="next" aria-label="Next">${I.chevR}</button>
  </div>`;
}

function wireRails(root = document){
  root.querySelectorAll(".rail").forEach(rail => {
    const track = rail.querySelector(".rail__track");
    rail.querySelectorAll(".rail__arrow").forEach(btn => {
      btn.addEventListener("click", () => {
        const step = track.clientWidth * 0.8;
        track.scrollBy({ left: btn.dataset.dir === "next" ? step : -step, behavior: "smooth" });
      });
    });
  });
}

/* ---------- Wishlist + reveal + accordions -------------------------------- */
function wireWish(root = document){
  root.addEventListener("click", e => {
    const b = e.target.closest("[data-wish]"); if (!b) return;
    e.preventDefault();
    const on = Wish.toggle(b.dataset.wish);
    b.classList.toggle("is-on", on);
    toast(on ? "Saved to your wishlist" : "Removed from wishlist");
  });
}

/* Scroll-reveal was removed: it hid every homepage section until an
   IntersectionObserver fired, which meant a blank page anywhere the observer
   didn't report. Content now paints immediately. Kept as a no-op so callers
   don't need to change. */
function wireReveal(){}

function wireAccordions(root = document){
  root.querySelectorAll(".acc__btn, .facet__btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".acc__item, .facet");
      item.classList.toggle("is-open");
      const i = btn.querySelector("i");
      if (i) i.textContent = item.classList.contains("is-open") ? "−" : "+";
    });
  });
  // set initial glyphs to match state
  root.querySelectorAll(".acc__item, .facet").forEach(item => {
    const i = item.querySelector("i");
    if (i) i.textContent = item.classList.contains("is-open") ? "−" : "+";
  });
}

/* ---------- Modal ---------------------------------------------------------- */
function openModal(html){
  let ov = document.getElementById("ov");
  if (!ov) { ov = document.createElement("div"); ov.id = "ov"; ov.className = "overlay"; document.body.appendChild(ov); }
  ov.innerHTML = `<div class="modal"><button class="modal__x" aria-label="Close">${I.x}</button>${html}</div>`;
  requestAnimationFrame(() => ov.classList.add("is-on"));
  document.body.classList.add("no-scroll");
  const close = () => { ov.classList.remove("is-on"); document.body.classList.remove("no-scroll"); };
  ov.querySelector(".modal__x").onclick = close;
  ov.onclick = e => { if (e.target === ov) close(); };
  return close;
}

const LOGIN_HTML = `
  <h3>Welcome to</h3>
  <div class="wordmark">${BRAND.mark}</div>
  <p class="lead">Sign in to track orders, save fittings and access private previews.</p>
  <div class="field"><label>Phone Number *</label><input type="tel" placeholder="Enter mobile number" maxlength="10" id="loginPhone"></div>
  <button class="btn btn--black btn--block is-disabled" id="loginGo">Send OTP</button>
  <p class="lead" style="margin:16px 0 0;font-size:12px">Demo only — no message is sent and nothing is stored.</p>`;

/* ---------- Boot ----------------------------------------------------------- */
function mountShell(active){
  const h = document.getElementById("site-header");
  if (h) h.outerHTML = buildHeader(active);
  const f = document.getElementById("site-footer");
  if (f) f.outerHTML = buildFooter();
  paintBagCount();

  // drawer
  const drawer = document.getElementById("drawer"), scrim = document.getElementById("scrim");
  const shut = () => { drawer?.classList.remove("is-open"); scrim?.classList.remove("is-on"); document.body.classList.remove("no-scroll"); };
  document.getElementById("burger")?.addEventListener("click", () => {
    drawer.classList.add("is-open"); scrim.classList.add("is-on"); document.body.classList.add("no-scroll");
  });
  document.getElementById("drawerX")?.addEventListener("click", shut);
  scrim?.addEventListener("click", shut);

  // header shadow on scroll
  const hdr = document.getElementById("hdr");
  const onScroll = () => hdr?.classList.toggle("is-stuck", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // account + search
  document.getElementById("acctBtn")?.addEventListener("click", () => {
    openModal(LOGIN_HTML);
    const inp = document.getElementById("loginPhone"), go = document.getElementById("loginGo");
    inp?.addEventListener("input", () => go.classList.toggle("is-disabled", inp.value.replace(/\D/g, "").length !== 10));
    go?.addEventListener("click", () => toast("OTP sent — demo build, any code works"));
  });
  document.getElementById("searchBtn")?.addEventListener("click", () => {
    const close = openModal(`<h3>Search the house</h3>
      <div class="field" style="margin-top:14px"><input id="q" placeholder="Try “ivory sherwani”, “organza saree”…" autofocus></div>
      <div id="qres"></div>`);
    const q = document.getElementById("q"), res = document.getElementById("qres");
    q.addEventListener("input", () => {
      const t = q.value.trim().toLowerCase();
      if (t.length < 2) { res.innerHTML = ""; return; }
      const hits = PRODUCTS.filter(p =>
        (p.name + " " + p.colour + " " + p.fabric + " " + SUB_LABEL[p.sub]).toLowerCase().includes(t)).slice(0, 6);
      res.innerHTML = hits.length
        ? hits.map(p => `<a href="product.html?id=${p.id}" style="display:flex;gap:14px;align-items:center;padding:11px 0;border-top:1px solid var(--line-hair)">
            <img src="${img(p.images[0])}" style="width:44px;height:58px;object-fit:cover" alt="">
            <span><b style="font-family:LatoRegular;font-weight:400;display:block">${p.name}</b>
            <small style="font-family:LatoLight;color:var(--muted-2)">${inr(p.price)}</small></span></a>`).join("")
        : `<p class="lead" style="padding-top:14px">Nothing matches “${q.value}”.</p>`;
    });
    q.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  });

  wireWish(document);
  wireRails(document);
  wireAccordions(document);
  wireReveal();
}

function qs(name){ return new URLSearchParams(location.search).get(name); }
