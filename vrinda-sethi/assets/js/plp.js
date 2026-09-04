/* ==========================================================================
   PLP — breadcrumb, chips, facets, sort, grid density, progressive "view more"
   Shared by women.html and men.html; category comes from <body data-cat>.
   ========================================================================== */

const CAT = document.body.dataset.cat;               // "women" | "men"
const CAT_LABEL = TAXONOMY[CAT].label;
const PAGE = 9;                                       // products per "page"

const state = {
  sub: qs("sub") || "all",
  colours: new Set(),
  price: new Set(),
  occ: new Set(),
  discountOnly: false,
  sort: "popular",
  cols: 3,
  shown: PAGE
};

/* Base pool for this category (plus the cross-category virtual subs) */
function pool(){
  let list = PRODUCTS.filter(p => p.cat === CAT);
  if (state.sub === "new")    list = PRODUCTS.filter(p => p.cat === CAT && p.isNew);
  else if (state.sub === "sale")   list = PRODUCTS.filter(p => p.cat === CAT && discountPct(p) > 0);
  else if (state.sub === "bridal") list = PRODUCTS.filter(p => p.cat === CAT && (p.line.includes("Bridal") || p.occ.includes("occ-wedding")));
  else if (state.sub === "mtm")    list = PRODUCTS.filter(p => p.cat === CAT && p.line.includes("Couture"));
  else if (state.sub.startsWith("occ-")) list = list.filter(p => p.occ.includes(state.sub));
  else if (state.sub !== "all")    list = list.filter(p => p.sub === state.sub);
  return list;
}

function priceBand(p){
  if (p.price < 50000) return "u50";
  if (p.price < 100000) return "50-100";
  if (p.price < 200000) return "100-200";
  return "200p";
}
const BAND_LABEL = { "u50":"Under ₹50,000", "50-100":"₹50,000 – ₹1,00,000", "100-200":"₹1,00,000 – ₹2,00,000", "200p":"Above ₹2,00,000" };

function filtered(){
  let l = pool();
  if (state.colours.size) l = l.filter(p => state.colours.has(p.colour));
  if (state.price.size)   l = l.filter(p => state.price.has(priceBand(p)));
  if (state.occ.size)     l = l.filter(p => p.occ.some(o => state.occ.has(o)));
  if (state.discountOnly) l = l.filter(p => discountPct(p) > 0);

  const s = state.sort;
  if (s === "low")  l = [...l].sort((a, b) => a.price - b.price);
  if (s === "high") l = [...l].sort((a, b) => b.price - a.price);
  if (s === "new")  l = [...l].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  if (s === "disc") l = [...l].sort((a, b) => discountPct(b) - discountPct(a));
  return l;
}

/* ---------- Render pieces -------------------------------------------------- */
function renderCrumb(){
  const subName = state.sub === "all" ? "All" : (SUB_LABEL[state.sub] || "All");
  document.getElementById("crumb").innerHTML =
    `<a href="index.html">Home</a><span class="sep">|</span>
     <a href="${CAT}.html">${CAT_LABEL}</a><span class="sep">|</span>
     <span class="cur">${subName}</span>`;
}

function renderHead(n){
  const subName = state.sub === "all" ? `Everything for ${CAT_LABEL}` : `${SUB_LABEL[state.sub]} for ${CAT_LABEL}`;
  document.getElementById("plpHead").innerHTML =
    `<h1>${subName}</h1><span class="count">(${n} ${n === 1 ? "piece" : "pieces"})</span>`;
}

function renderChips(){
  const items = TAXONOMY[CAT].groups[0].items;
  document.getElementById("chips").innerHTML =
    [["All", "all"], ...items].map(([label, sub]) =>
      `<button class="chip ${state.sub === sub ? "is-on" : ""}" data-sub="${sub}">${label}</button>`).join("");
}

function facet(title, key, rows, kind){
  return `<div class="facet ${key === "brand" ? "is-open" : ""}" data-facet="${key}">
    <button class="facet__btn">${title}<i>+</i></button>
    <div class="facet__body"><ul>${rows.map(r => `
      <li><label>
        <input type="checkbox" data-kind="${kind}" value="${r.v}" ${r.on ? "checked" : ""}>
        <span>${r.l}</span><span class="n">${r.n}</span>
      </label></li>`).join("")}</ul></div>
  </div>`;
}

function renderFacets(){
  const base = pool();
  const count = (fn) => base.filter(fn).length;

  const colours = [...new Set(base.map(p => p.colour))].sort()
    .map(c => ({ l: c, v: c, n: count(p => p.colour === c), on: state.colours.has(c) }));
  const bands = ["u50","50-100","100-200","200p"]
    .map(b => ({ l: BAND_LABEL[b], v: b, n: count(p => priceBand(p) === b), on: state.price.has(b) }))
    .filter(r => r.n);
  const occs = [...new Set(base.flatMap(p => p.occ))]
    .map(o => ({ l: SUB_LABEL[o] || o, v: o, n: count(p => p.occ.includes(o)), on: state.occ.has(o) }))
    .filter(r => r.n).sort((a, b) => b.n - a.n);
  const subs = [...new Set(base.map(p => p.sub))]
    .map(s => ({ l: SUB_LABEL[s], v: s, n: count(p => p.sub === s), on: state.sub === s }));

  document.getElementById("facets").innerHTML = `
    <button class="btn btn--ghost btn--block" id="facetsClose" style="display:none;margin-bottom:18px">Done</button>
    ${facet("Category", "brand", subs, "sub")}
    ${facet("Colour", "colour", colours, "colour")}
    ${facet("Price", "price", bands, "price")}
    ${facet("Occasion", "occ", occs, "occ")}
    <div class="facet"><label style="display:flex;gap:10px;align-items:center;padding:18px 4px;font-family:LatoLight;font-size:14px;color:var(--muted);cursor:pointer">
      <input type="checkbox" id="discOnly" ${state.discountOnly ? "checked" : ""}><span>On offer only</span></label></div>`;

  wireAccordions(document.getElementById("facets"));
  document.getElementById("facetsClose").onclick = closeFacets;
}

function renderGrid(){
  const list = filtered();
  const slice = list.slice(0, state.shown);
  const wrap = document.getElementById("grid");

  renderHead(list.length);

  if (!list.length) {
    wrap.innerHTML = `<p class="empty">No pieces match these filters.<br><br>
      <button class="btn btn--white" id="clearAll">Clear all filters</button></p>`;
    document.getElementById("clearAll").onclick = clearAll;
    document.getElementById("more").innerHTML = "";
    return;
  }

  wrap.className = state.cols === 2 ? "grid-2" : "grid-3";
  wrap.innerHTML = slice.map(p => cardHTML(p)).join("");

  const pct = Math.round(slice.length / list.length * 100);
  document.getElementById("more").innerHTML = slice.length < list.length ? `
    <div class="plp__bar"><span style="width:${pct}%"></span></div>
    <p>You've viewed ${slice.length} of ${list.length} pieces</p>
    <button class="btn btn--white" id="moreBtn">View More</button>` : `
    <div class="plp__bar"><span style="width:100%"></span></div>
    <p>You've viewed all ${list.length} pieces</p>`;

  const mb = document.getElementById("moreBtn");
  if (mb) mb.onclick = () => { state.shown += PAGE; renderGrid(); };
}

function renderSeo(){
  const subName = state.sub === "all" ? CAT_LABEL : SUB_LABEL[state.sub];
  document.getElementById("seo").innerHTML = `
    <h3>${subName} at Vrinda Sethi</h3>
    <p>Every piece in this edit is cut in the Okhla atelier and finished by hand. Embroidery is worked on wooden adda frames by karigars the house employs directly — zardozi and dabka in Delhi, chikankari in Lucknow, bandhani in Bhuj, and kadhwa weaving in Varanasi.</p>
    <p>Sizes run to the house block, which is cut slightly closer through the waist than the Indian standard. If you are between sizes, take the larger and let the atelier alter it — alterations on full-price pieces are complimentary for the first ninety days. Made-to-measure commissions are available on every couture and bridal style; allow eight to fourteen weeks from first fitting.</p>
    <p>This storefront is a demonstration build. Prices and stock are illustrative, and no order placed here is real.</p>`;
}

function renderAll(){
  renderCrumb(); renderChips(); renderFacets(); renderGrid(); renderSeo();
}

/* ---------- Interaction ---------------------------------------------------- */
function clearAll(){
  state.colours.clear(); state.price.clear(); state.occ.clear();
  state.discountOnly = false; state.shown = PAGE;
  renderAll();
}

function setSub(sub){
  state.sub = sub; state.shown = PAGE;
  state.colours.clear(); state.price.clear(); state.occ.clear();
  history.replaceState(null, "", sub === "all" ? `${CAT}.html` : `${CAT}.html?sub=${sub}`);
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const openFacets  = () => { document.getElementById("facets").classList.add("is-open"); document.getElementById("facetsClose").style.display = "block"; document.body.classList.add("no-scroll"); };
const closeFacets = () => { document.getElementById("facets").classList.remove("is-open"); document.body.classList.remove("no-scroll"); };

document.addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (chip) { setSub(chip.dataset.sub); return; }

  const view = e.target.closest("[data-cols]");
  if (view) {
    state.cols = +view.dataset.cols;
    document.querySelectorAll("[data-cols]").forEach(b => b.classList.toggle("is-on", b === view));
    renderGrid();
  }
});

document.addEventListener("change", e => {
  const cb = e.target.closest("[data-kind]");
  if (cb) {
    const { kind, value } = { kind: cb.dataset.kind, value: cb.value };
    if (kind === "sub") { setSub(cb.checked ? value : "all"); return; }
    const set = kind === "colour" ? state.colours : kind === "price" ? state.price : state.occ;
    cb.checked ? set.add(value) : set.delete(value);
    state.shown = PAGE; renderGrid();
    return;
  }
  if (e.target.id === "discOnly") { state.discountOnly = e.target.checked; state.shown = PAGE; renderGrid(); }
  if (e.target.id === "sortSel")  { state.sort = e.target.value; state.shown = PAGE; renderGrid(); }
});

/* ---------- Boot ----------------------------------------------------------- */
mountShell(CAT);
document.getElementById("filterToggle").addEventListener("click", () => {
  if (window.innerWidth <= 1024) openFacets();
});
renderAll();
