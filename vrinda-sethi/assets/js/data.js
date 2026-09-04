/* ==========================================================================
   VRINDA SETHI — catalogue + taxonomy
   ========================================================================== */

const BRAND = {
  name: "Vrinda Sethi",
  mark: "VRINDA SETHI",
  city: "New Delhi",
  phone: "1800-266-4488",
  founded: 2009
};

/* Every garment carries the house label; `line` is the sub-label. */
const LINES = { couture: "Vrinda Sethi Couture", pret: "Vrinda Sethi Prêt", bridal: "Vrinda Sethi Bridal" };

const TAXONOMY = {
  women: {
    label: "Women",
    groups: [
      { title: "Clothing", items: [
        ["Lehengas","lehengas"],["Sarees & Drapes","sarees"],["Anarkalis & Gowns","anarkalis"],
        ["Kurta Sets","kurta-sets"],["Bridal Couture","bridal"]
      ]},
      { title: "Shop By Occasion", items: [
        ["Wedding","occ-wedding"],["Mehendi & Haldi","occ-mehendi"],["Reception","occ-reception"],
        ["Festive","occ-festive"],["Everyday Luxe","occ-everyday"]
      ]},
      { title: "The House", items: [
        ["New Arrivals","new"],["Made To Measure","mtm"],["The Atelier","atelier"],["Archive Sale","sale"]
      ]}
    ],
    promo: { img: "assets/img/products/w-leh-02-a.jpg", title: "Noor", cta: "The Bridal Edit", href: "women.html?sub=bridal" }
  },
  men: {
    label: "Men",
    groups: [
      { title: "Clothing", items: [
        ["Sherwanis","sherwanis"],["Bandhgalas","bandhgalas"],["Kurta Sets","kurta-sets-m"],
        ["Nehru Jackets","nehru"]
      ]},
      { title: "Shop By Occasion", items: [
        ["Wedding","occ-wedding"],["Sangeet","occ-sangeet"],["Reception","occ-reception"],
        ["Festive","occ-festive"],["Black Tie","occ-blacktie"]
      ]},
      { title: "The House", items: [
        ["New Arrivals","new"],["Made To Measure","mtm"],["The Atelier","atelier"],["Archive Sale","sale"]
      ]}
    ],
    promo: { img: "assets/img/products/m-she-03-a.jpg", title: "Zarrin", cta: "Groom's Edit", href: "men.html?sub=sherwanis" }
  }
};

const SIZES_W = ["XS","S","M","L","XL"];
const SIZES_M = ["38","40","42","44","46"];

/* --------------------------------------------------------------------------
   PRODUCTS
   price / mrp in INR. `stock` maps size -> units left (0 = sold out).
   -------------------------------------------------------------------------- */
const PRODUCTS = [
  /* ---------------- WOMEN — LEHENGAS ---------------- */
  { id:"VS-W-1101", slug:"meher-crimson-raw-silk-lehenga", cat:"women", sub:"lehengas",
    occ:["occ-wedding","occ-festive"], line:LINES.couture, name:"Meher Crimson Raw-Silk Lehenga Set",
    price:185000, mrp:185000, colour:"Crimson", fabric:"Raw silk, silk organza dupatta",
    craft:"Aari & zardozi", images:["w-leh-01-a","w-leh-01-b"], sizes:SIZES_W,
    stock:{XS:3,S:5,M:2,L:4,XL:0}, isNew:true, tag:"Couture",
    desc:"A deep crimson raw-silk lehenga hand-worked in aari and zardozi across the hem, paired with a fitted blouse and a silk-organza dupatta finished in scalloped gota. The panels are cut on the bias so the skirt falls in a slow, weighted flare — a silhouette the house has refined over four bridal seasons." },

  { id:"VS-W-1102", slug:"noor-ivory-zardozi-lehenga", cat:"women", sub:"lehengas",
    occ:["occ-wedding","occ-reception"], line:LINES.bridal, name:"Noor Ivory Zardozi Lehenga",
    price:245000, mrp:245000, colour:"Ivory", fabric:"Silk tissue, tulle",
    craft:"Dabka, sequin & pearl zardozi", images:["w-leh-02-a","w-leh-02-b"], sizes:SIZES_W,
    stock:{XS:1,S:2,M:3,L:2,XL:1}, isNew:true, tag:"Bridal",
    desc:"Ivory silk tissue carrying nine hundred hours of dabka, sequin and seed-pearl work. The blouse is boned and self-supporting; the dupatta is a single uncut width of tulle, edged by hand. Made to order in the Okhla atelier — allow eight weeks." },

  { id:"VS-W-1103", slug:"vann-emerald-gota-patti-lehenga", cat:"women", sub:"lehengas",
    occ:["occ-mehendi","occ-festive"], line:LINES.couture, name:"Vann Emerald Gota-Patti Lehenga",
    price:168000, mrp:210000, colour:"Emerald", fabric:"Chanderi silk",
    craft:"Gota-patti appliqué", images:["w-leh-03-a","w-leh-03-b"], sizes:SIZES_W,
    stock:{XS:2,S:0,M:4,L:3,XL:2}, isNew:false, tag:null,
    desc:"Emerald chanderi with hand-laid gota-patti birds migrating across the skirt — a motif drawn from a Jaipur fresco. Light enough to dance in, which is exactly what it was cut for." },

  { id:"VS-W-1104", slug:"gulaab-rose-sequin-lehenga", cat:"women", sub:"lehengas",
    occ:["occ-reception","occ-festive"], line:LINES.pret, name:"Gulaab Rose Sequin Lehenga",
    price:142000, mrp:142000, colour:"Rose", fabric:"Georgette, sequinned net",
    craft:"Micro-sequin & bead", images:["w-leh-04-a","w-leh-04-b"], sizes:SIZES_W,
    stock:{XS:4,S:6,M:5,L:2,XL:3}, isNew:true, tag:null,
    desc:"A rose-pink lehenga in matte micro-sequin over georgette, cut with a soft A-line and an unlined dupatta. The sequins are tonal rather than reflective, so the piece reads as texture in daylight and as light after dark." },

  { id:"VS-W-1105", slug:"amrit-marigold-bandhani-lehenga", cat:"women", sub:"lehengas",
    occ:["occ-mehendi","occ-festive"], line:LINES.pret, name:"Amrit Marigold Bandhani Lehenga",
    price:124000, mrp:155000, colour:"Marigold", fabric:"Bandhani silk",
    craft:"Kutch bandhani, mirror work", images:["w-leh-05-a","w-leh-05-b"], sizes:SIZES_W,
    stock:{XS:0,S:3,M:4,L:5,XL:2}, isNew:false, tag:null,
    desc:"Tied and dyed by a family of bandhani artisans in Bhuj across eleven days, then finished with abhla mirror work at the waist. Every skirt differs slightly — the knots are not a print." },

  /* ---------------- WOMEN — SAREES ---------------- */
  { id:"VS-W-2101", slug:"kanchan-gold-tissue-saree", cat:"women", sub:"sarees",
    occ:["occ-wedding","occ-reception"], line:LINES.couture, name:"Kanchan Gold Tissue Saree",
    price:96000, mrp:96000, colour:"Antique gold", fabric:"Kanjivaram tissue",
    craft:"Zari handloom", images:["w-sar-01-a","w-sar-01-b"], sizes:["One Size"],
    stock:{"One Size":6}, isNew:true, tag:null,
    desc:"Nine yards of tissue-weight Kanjivaram in antique gold zari, woven on a pit loom in Kanchipuram. Supplied with a stitched-to-measure blouse in matching tissue and a pre-set drape option." },

  { id:"VS-W-2102", slug:"neelambari-amethyst-organza-saree", cat:"women", sub:"sarees",
    occ:["occ-festive","occ-everyday"], line:LINES.pret, name:"Neelambari Amethyst Organza Saree",
    price:78000, mrp:98000, colour:"Amethyst", fabric:"Silk organza",
    craft:"Hand-painted border", images:["w-sar-02-a","w-sar-02-b"], sizes:["One Size"],
    stock:{"One Size":4}, isNew:false, tag:null,
    desc:"Sheer amethyst organza with a hand-painted temple border in dull silver. Featherweight and structured at once — it holds a pleat without a single stitch of interfacing." },

  { id:"VS-W-2103", slug:"alta-red-handwoven-saree", cat:"women", sub:"sarees",
    occ:["occ-wedding","occ-festive"], line:LINES.couture, name:"Alta Red Handwoven Saree",
    price:88000, mrp:88000, colour:"Alta red", fabric:"Mulberry silk",
    craft:"Banarasi kadhwa", images:["w-sar-03-a","w-sar-03-b"], sizes:["One Size"],
    stock:{"One Size":3}, isNew:false, tag:null,
    desc:"Kadhwa-woven in Varanasi, where each motif is built individually on the loom rather than floated across the back. Four months on the frame for a single saree." },

  { id:"VS-W-2104", slug:"raat-black-chanderi-saree", cat:"women", sub:"sarees",
    occ:["occ-reception","occ-everyday"], line:LINES.pret, name:"Raat Black Chanderi Saree",
    price:72000, mrp:72000, colour:"Black", fabric:"Chanderi silk-cotton",
    craft:"Gold buti", images:["w-sar-04-a","w-sar-04-b"], sizes:["One Size"],
    stock:{"One Size":7}, isNew:true, tag:null,
    desc:"Black chanderi scattered with small gold buti and finished with a plain gold border. The house's least decorated saree and, reliably, its best-selling one." },

  /* ---------------- WOMEN — ANARKALIS & GOWNS ---------------- */
  { id:"VS-W-3101", slug:"sirisha-blush-tulle-anarkali", cat:"women", sub:"anarkalis",
    occ:["occ-reception","occ-festive"], line:LINES.couture, name:"Sirisha Blush Tulle Anarkali",
    price:135000, mrp:135000, colour:"Blush", fabric:"Tulle over silk",
    craft:"Thread & crystal", images:["w-anr-01-a"], sizes:SIZES_W,
    stock:{XS:2,S:3,M:3,L:1,XL:0}, isNew:true, tag:"Couture",
    desc:"A floor-sweeping blush anarkali in seven layers of tulle, embroidered in tonal thread and colourless crystal so the surface catches light only in movement. Attached cape sleeve; concealed side zip." },

  { id:"VS-W-3102", slug:"kesari-saffron-silk-anarkali", cat:"women", sub:"anarkalis",
    occ:["occ-festive","occ-everyday"], line:LINES.pret, name:"Kesari Saffron Silk Anarkali",
    price:94000, mrp:118000, colour:"Saffron", fabric:"Dupion silk",
    craft:"Resham thread", images:["w-anr-02-a"], sizes:SIZES_W,
    stock:{XS:3,S:4,M:2,L:4,XL:2}, isNew:false, tag:null,
    desc:"Saffron dupion cut with a high yoke and a generous, unbroken flare. Resham thread work follows the neckline and cuffs only — the fabric is asked to do the rest." },

  { id:"VS-W-3103", slug:"shubh-rose-gold-cocktail-gown", cat:"women", sub:"anarkalis",
    occ:["occ-reception","occ-blacktie"], line:LINES.couture, name:"Shubh Rose-Gold Cocktail Gown",
    price:115000, mrp:115000, colour:"Rose gold", fabric:"Liquid satin",
    craft:"Draped, unembellished", images:["w-anr-03-a","w-anr-03-b"], sizes:SIZES_W,
    stock:{XS:1,S:2,M:3,L:2,XL:1}, isNew:true, tag:null,
    desc:"A bias-cut rose-gold satin gown with a cowl back, made without any embroidery at all. It is the piece the house shows when asked what Indian couture looks like with the surface work removed." },

  /* ---------------- WOMEN — KURTA SETS ---------------- */
  { id:"VS-W-4101", slug:"haldi-marigold-bandhani-kurta-set", cat:"women", sub:"kurta-sets",
    occ:["occ-mehendi","occ-festive","occ-everyday"], line:LINES.pret, name:"Haldi Marigold Bandhani Kurta Set",
    price:38000, mrp:47500, colour:"Marigold", fabric:"Bandhani cotton-silk",
    craft:"Kutch bandhani", images:["w-kur-01-a","w-kur-01-b"], sizes:SIZES_W,
    stock:{XS:4,S:7,M:8,L:5,XL:3}, isNew:true, tag:null,
    desc:"Marigold bandhani kurta with a matching palazzo and a leheriya-dyed dupatta. Tied in Bhuj, dyed twice, and finished with a plain gold-thread neckline. The house's most-worn festive piece and the one clients buy in pairs." },

  { id:"VS-W-4102", slug:"neel-indigo-block-print-kurta-set", cat:"women", sub:"kurta-sets",
    occ:["occ-everyday","occ-festive"], line:LINES.pret, name:"Neel Indigo Block-Print Kurta Set",
    price:29000, mrp:29000, colour:"Indigo", fabric:"Handwoven cotton",
    craft:"Bagru hand-block print", images:["w-kur-02-a","w-kur-02-b"], sizes:SIZES_W,
    stock:{XS:6,S:9,M:9,L:7,XL:5}, isNew:true, tag:null,
    desc:"Hand-block printed in natural indigo at Bagru, on handwoven cotton that softens with every wash. Straight-cut kurta, tapered trouser, no lining. Made to be worn on ordinary days, which is the hardest brief the house takes." },

  { id:"VS-W-4103", slug:"jamun-amethyst-chanderi-kurta-set", cat:"women", sub:"kurta-sets",
    occ:["occ-festive","occ-reception"], line:LINES.pret, name:"Jamun Amethyst Chanderi Kurta Set",
    price:54000, mrp:68000, colour:"Amethyst", fabric:"Chanderi silk-cotton",
    craft:"Silver zari buti", images:["w-kur-03-a","w-kur-03-b"], sizes:SIZES_W,
    stock:{XS:3,S:5,M:0,L:4,XL:2}, isNew:false, tag:null,
    desc:"Deep amethyst chanderi with fine silver zari buti and a matching organza dupatta. Cut long and narrow through the body with side slits from the hip, so it reads formal without any embroidery on the surface." },

  /* ---------------- MEN — SHERWANIS ---------------- */
  { id:"VS-M-1101", slug:"rajwada-ivory-chikankari-sherwani", cat:"men", sub:"sherwanis",
    occ:["occ-wedding"], line:LINES.couture, name:"Rajwada Ivory Chikankari Sherwani",
    price:210000, mrp:210000, colour:"Ivory", fabric:"Silk-cotton",
    craft:"Lucknowi chikankari", images:["m-she-01-a","m-she-01-b","m-she-01-c"], sizes:SIZES_M,
    stock:{"38":2,"40":4,"42":5,"44":3,"46":1}, isNew:true, tag:"Couture",
    desc:"Ivory silk-cotton worked in fine Lucknowi chikankari — murri, phanda and jaali stitches laid over a tonal ground. Supplied with churidar and a raw-silk stole. Canvassed chest, hand-set sleeve." },

  { id:"VS-M-1102", slug:"qila-cream-tissue-sherwani", cat:"men", sub:"sherwanis",
    occ:["occ-wedding","occ-reception"], line:LINES.couture, name:"Qila Cream Tissue Sherwani",
    price:188000, mrp:235000, colour:"Cream", fabric:"Silk tissue",
    craft:"Tone-on-tone zardozi", images:["m-she-02-a","m-she-02-b","m-she-02-c"], sizes:SIZES_M,
    stock:{"38":1,"40":3,"42":4,"44":2,"46":0}, isNew:false, tag:null,
    desc:"Cream silk tissue with tone-on-tone zardozi across the placket and cuffs, cut long and lean through the body. Photographed in the Qila courtyard the collection takes its name from." },

  { id:"VS-M-1103", slug:"zarrin-antique-gold-sherwani", cat:"men", sub:"sherwanis",
    occ:["occ-wedding","occ-reception"], line:LINES.bridal, name:"Zarrin Antique Gold Sherwani",
    price:265000, mrp:265000, colour:"Antique gold", fabric:"Brocade",
    craft:"Kimkhab brocade, hand-set buttons", images:["m-she-03-a","m-she-03-b"], sizes:SIZES_M,
    stock:{"38":1,"40":2,"42":3,"44":2,"46":1}, isNew:true, tag:"Bridal",
    desc:"The house's heaviest groom piece: a kimkhab brocade sherwani in antique gold with hand-set metal buttons and a contrast maroon inner. Structured shoulder, full canvas, working cuffs." },

  { id:"VS-M-1104", slug:"moti-pearl-ivory-sherwani", cat:"men", sub:"sherwanis",
    occ:["occ-wedding","occ-sangeet"], line:LINES.couture, name:"Moti Pearl-Ivory Sherwani",
    price:195000, mrp:195000, colour:"Pearl ivory", fabric:"Raw silk",
    craft:"Seed-pearl & dabka", images:["m-she-04-a","m-she-04-b"], sizes:SIZES_M,
    stock:{"38":2,"40":3,"42":4,"44":4,"46":2}, isNew:false, tag:null,
    desc:"Pearl-ivory raw silk with an all-over seed-pearl and dabka trellis. Shown with the house's layered moti mala; the mala is sold separately." },

  { id:"VS-M-1105", slug:"kohl-midnight-sherwani", cat:"men", sub:"sherwanis",
    occ:["occ-reception","occ-blacktie"], line:LINES.couture, name:"Kohl Midnight Sherwani",
    price:172000, mrp:172000, colour:"Midnight", fabric:"Wool-silk",
    craft:"Matte thread, tonal", images:["m-she-05-a","m-she-05-b"], sizes:SIZES_M,
    stock:{"38":3,"40":5,"42":3,"44":2,"46":1}, isNew:true, tag:null,
    desc:"A midnight wool-silk sherwani embroidered in matte black thread on black — visible only at close range. Built for receptions where the groom would rather not out-dress the room." },

  /* ---------------- MEN — BANDHGALAS ---------------- */
  { id:"VS-M-2101", slug:"darbar-maroon-silk-bandhgala", cat:"men", sub:"bandhgalas",
    occ:["occ-sangeet","occ-reception"], line:LINES.pret, name:"Darbar Maroon Silk Bandhgala",
    price:125000, mrp:125000, colour:"Maroon", fabric:"Silk-wool",
    craft:"Hand-finished, milanese buttonholes", images:["m-ban-01-a"], sizes:SIZES_M,
    stock:{"38":2,"40":4,"42":4,"44":3,"46":2}, isNew:false, tag:null,
    desc:"A maroon silk-wool bandhgala with a stand collar, six-button front and a quarter-lined back for movement. Cut from the house's standard bandhgala block, unchanged since 2014." },

  { id:"VS-M-2102", slug:"neel-indigo-pinstripe-bandhgala", cat:"men", sub:"bandhgalas",
    occ:["occ-blacktie","occ-reception"], line:LINES.pret, name:"Neel Indigo Pinstripe Bandhgala",
    price:108000, mrp:135000, colour:"Indigo", fabric:"Wool pinstripe",
    craft:"Half-canvas tailoring", images:["m-ban-02-a"], sizes:SIZES_M,
    stock:{"38":3,"40":4,"42":5,"44":2,"46":0}, isNew:false, tag:null,
    desc:"Indigo pinstripe wool, half-canvassed, with a bandhgala collar in place of a notch lapel. Worn with the matching trouser it is the house's answer to a dinner suit." },

  /* ---------------- MEN — KURTA SETS ---------------- */
  { id:"VS-M-3101", slug:"safed-white-cotton-silk-kurta-set", cat:"men", sub:"kurta-sets-m",
    occ:["occ-festive","occ-everyday"], line:LINES.pret, name:"Safed White Cotton-Silk Kurta Set",
    price:42000, mrp:42000, colour:"White", fabric:"Cotton-silk",
    craft:"Hand-rolled placket", images:["m-kur-01-a","m-kur-01-b"], sizes:SIZES_M,
    stock:{"38":5,"40":8,"42":9,"44":6,"46":3}, isNew:true, tag:null,
    desc:"The house's plainest and most-repeated piece: white cotton-silk, hand-rolled placket, mother-of-pearl buttons, matching churidar. Ordered most often in threes." },

  { id:"VS-M-3102", slug:"laal-crimson-silk-kurta", cat:"men", sub:"kurta-sets-m",
    occ:["occ-festive","occ-sangeet"], line:LINES.pret, name:"Laal Crimson Silk Kurta",
    price:38000, mrp:48000, colour:"Crimson", fabric:"Dupion silk",
    craft:"Resham placket", images:["m-kur-02-a","m-kur-02-b"], sizes:SIZES_M,
    stock:{"38":4,"40":6,"42":5,"44":4,"46":2}, isNew:false, tag:null,
    desc:"Crimson dupion with a resham-worked placket and side vents cut high for ease. Photographed on location in Kumaon for the Festive lookbook." },

  { id:"VS-M-3103", slug:"retu-sand-linen-kurta-set", cat:"men", sub:"kurta-sets-m",
    occ:["occ-everyday","occ-festive"], line:LINES.pret, name:"Retu Sand Linen Kurta Set",
    price:34000, mrp:34000, colour:"Sand", fabric:"Handwoven linen",
    craft:"Undyed, garment-washed", images:["m-kur-03-a","m-kur-03-b"], sizes:SIZES_M,
    stock:{"38":6,"40":7,"42":8,"44":5,"46":4}, isNew:true, tag:null,
    desc:"Undyed handwoven linen, garment-washed so it arrives already soft. No embroidery, no lining, no shoulder padding — the least constructed thing the house makes." },

  { id:"VS-M-3104", slug:"raat-black-bandhgala-kurta", cat:"men", sub:"kurta-sets-m",
    occ:["occ-blacktie","occ-reception"], line:LINES.couture, name:"Raat Black Bandhgala Kurta",
    price:56000, mrp:56000, colour:"Black", fabric:"Silk-cotton",
    craft:"Zardozi placket", images:["m-kur-04-a","m-kur-04-b"], sizes:SIZES_M,
    stock:{"38":2,"40":4,"42":3,"44":3,"46":1}, isNew:false, tag:null,
    desc:"Black silk-cotton with a heavily worked zardozi placket and a closed bandhgala collar. Reads as a kurta from a distance and as a jacket up close." },

  { id:"VS-M-3105", slug:"firoza-teal-silk-kurta", cat:"men", sub:"kurta-sets-m",
    occ:["occ-mehendi","occ-festive"], line:LINES.pret, name:"Firoza Teal Silk Kurta",
    price:46000, mrp:46000, colour:"Teal", fabric:"Matka silk",
    craft:"Contrast piping", images:["m-kur-05-a"], sizes:SIZES_M,
    stock:{"38":3,"40":5,"42":4,"44":3,"46":2}, isNew:true, tag:null,
    desc:"Teal matka silk with rust piping at the placket and cuff. Textured, slightly irregular yarn — the slubs are the point." },

  /* ---------------- MEN — NEHRU JACKETS ---------------- */
  { id:"VS-M-4101", slug:"chhattri-ikat-nehru-jacket-set", cat:"men", sub:"nehru",
    occ:["occ-festive","occ-sangeet"], line:LINES.pret, name:"Chhattri Ikat Nehru Jacket Set",
    price:52000, mrp:65000, colour:"Indigo / rust", fabric:"Pochampally ikat",
    craft:"Double ikat handloom", images:["m-neh-01-a"], sizes:SIZES_M,
    stock:{"38":3,"40":4,"42":4,"44":2,"46":1}, isNew:false, tag:null,
    desc:"A double-ikat Nehru jacket from Pochampally, cut over a saffron cotton kurta. The pattern is dyed into the yarn before weaving, so it is identical on both faces." }
];

/* ---------- Helpers -------------------------------------------------------- */
const SUB_LABEL = {
  "lehengas":"Lehengas","sarees":"Sarees & Drapes","anarkalis":"Anarkalis & Gowns",
  "kurta-sets":"Kurta Sets","separates":"Separates","bridal":"Bridal Couture",
  "sherwanis":"Sherwanis","bandhgalas":"Bandhgalas","kurta-sets-m":"Kurta Sets",
  "nehru":"Nehru Jackets","trousers":"Trousers & Churidars",
  "occ-wedding":"Wedding","occ-mehendi":"Mehendi & Haldi","occ-reception":"Reception",
  "occ-festive":"Festive","occ-everyday":"Everyday Luxe","occ-sangeet":"Sangeet",
  "occ-blacktie":"Black Tie","new":"New Arrivals","sale":"Archive Sale","mtm":"Made To Measure"
};

function img(name){ return "assets/img/products/" + name + ".jpg"; }
function inr(n){ return "₹" + n.toLocaleString("en-IN"); }
function discountPct(p){ return p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0; }
function totalStock(p){ return Object.values(p.stock).reduce((a, b) => a + b, 0); }
function byId(id){ return PRODUCTS.find(p => p.id === id); }
function bySlug(s){ return PRODUCTS.find(p => p.slug === s); }
